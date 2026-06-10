import DemoClient, { type CvLiveData, type LiveData } from "./DemoClient";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SponsorKpiDaily } from "@/lib/supabase/types";
import type { CvExposureRow } from "@/components/CvExposurePanel";

export const revalidate = 300;

const SPONSOR_PALETTE = [
  "#B8975A",
  "#A00030",
  "#F4EFE6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

const PLATFORM_COLOR: Record<string, string> = {
  instagram: "#B8975A",
  tiktok: "#A00030",
  twitter: "#F4EFE6",
  youtube: "#10B981",
  facebook: "#F59E0B",
};

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  twitter: "X/Twitter",
  youtube: "YouTube",
  facebook: "Facebook",
};

function fmtDate(d: string) {
  const [, m, day] = d.split("-");
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1];
  return `${month} ${day}`;
}

async function loadLive(): Promise<LiveData | null> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;

  let supabase;
  try {
    supabase = createAdminClient();
  } catch {
    return null;
  }

  const { data: sponsors, error: sErr } = await supabase
    .from("sponsors")
    .select("id, name, slug")
    .order("name");

  if (sErr || !sponsors || sponsors.length === 0) return null;

  const sponsorIds = sponsors.map((s) => s.id);
  const { data: kpis } = await supabase
    .from("sponsor_kpis_daily")
    .select("sponsor_id, platform, date, followers, posts, likes, comments, engagement_rate, emv, raw")
    .in("sponsor_id", sponsorIds)
    .order("date", { ascending: true });

  if (!kpis || kpis.length === 0) return null;

  type Row = SponsorKpiDaily & { raw: Array<{ shortcode: string; likes: number; comments: number; caption: string; is_video: boolean }> | null };
  const rows = kpis as Row[];

  // Sponsors list (with stable colors)
  const liveSponsors = [
    { id: "all", label: "All sponsors", color: "#B8975A" },
    ...sponsors.map((s, i) => ({
      id: s.slug,
      label: s.name,
      color: SPONSOR_PALETTE[i % SPONSOR_PALETTE.length],
    })),
  ];

  // Trend: aggregate followers/1000 per platform per date
  // We use followers (in thousands) as a "reach proxy" so the chart looks meaningful with 1 platform.
  const dateMap = new Map<string, { ig: number; tt: number; x: number; yt: number }>();
  for (const r of rows) {
    const slot = dateMap.get(r.date) ?? { ig: 0, tt: 0, x: 0, yt: 0 };
    const valM = (r.followers ?? 0) / 1_000_000;
    if (r.platform === "instagram") slot.ig += valM;
    else if (r.platform === "tiktok") slot.tt += valM;
    else if (r.platform === "twitter") slot.x += valM;
    else if (r.platform === "youtube") slot.yt += valM;
    dateMap.set(r.date, slot);
  }
  const trend = Array.from(dateMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, v]) => ({ d: fmtDate(date), ...v, ig: +v.ig.toFixed(1), tt: +v.tt.toFixed(1), x: +v.x.toFixed(1), yt: +v.yt.toFixed(1) }));

  // EMV pie: latest row per sponsor/platform, sum by platform (in millions)
  const latestKey = new Map<string, Row>();
  for (const r of rows) {
    const k = `${r.sponsor_id}|${r.platform}`;
    const prev = latestKey.get(k);
    if (!prev || r.date > prev.date) latestKey.set(k, r);
  }
  const emvByPlatform = new Map<string, number>();
  for (const r of latestKey.values()) {
    emvByPlatform.set(r.platform, (emvByPlatform.get(r.platform) ?? 0) + (r.emv ?? 0));
  }
  const emv = Array.from(emvByPlatform.entries()).map(([k, v]) => ({
    name: PLATFORM_LABEL[k] ?? k,
    value: +(v / 1_000_000).toFixed(3),
    color: PLATFORM_COLOR[k] ?? "#B8975A",
  }));

  // Engagement per sponsor: latest IG row, reach=followers (M), engagement=engagement_rate
  const sponsorById = new Map(sponsors.map((s) => [s.id, s]));
  const engagement = sponsors
    .map((s) => {
      const row = latestKey.get(`${s.id}|instagram`);
      if (!row) return null;
      return {
        sponsor: s.name,
        reach: Math.round((row.followers ?? 0) / 1_000_000),
        engagement: row.engagement_rate ?? 0,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Top posts: extract from raw jsonb of latest IG rows
  const topPosts: LiveData["topPosts"] = [];
  for (const r of latestKey.values()) {
    if (r.platform !== "instagram" || !r.raw || !Array.isArray(r.raw)) continue;
    const sp = sponsorById.get(r.sponsor_id);
    if (!sp) continue;
    for (const post of r.raw) {
      const engagements = (post.likes ?? 0) + (post.comments ?? 0);
      topPosts.push({
        platform: post.is_video ? "Instagram (Reel)" : "Instagram",
        caption: post.caption?.slice(0, 80) || `${sp.name} post`,
        sponsor: sp.name,
        views: post.likes * 8, // rough proxy: views ≈ 8× likes
        likes: post.likes,
        comments: post.comments,
        emv: Math.round(engagements * 0.07),
      });
    }
  }
  topPosts.sort((a, b) => b.likes - a.likes);
  const topPostsTrimmed = topPosts.slice(0, 4);

  return {
    sponsors: liveSponsors,
    trend,
    emv,
    engagement,
    topPosts: topPostsTrimmed,
  };
}

async function loadCvExposure(): Promise<CvLiveData | null> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;

  let supabase;
  try {
    supabase = createAdminClient();
  } catch {
    return null;
  }

  // Both queries fail soft (error -> null data) while the cv_* tables
  // are not created yet; the panel then falls back to its sample rows.
  const { data: match } = await supabase
    .from("cv_matches")
    .select("id, property, opponent")
    .order("processed_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!match) return null;

  type CvExposureDbRow = {
    sponsor: string;
    placement: string | null;
    visible_seconds: number | null;
    detections: number | null;
    avg_area_pct: number | null;
    est_media_value: number | null;
  };

  const { data: rows } = await supabase
    .from("cv_sponsor_exposure")
    .select("sponsor, placement, visible_seconds, detections, avg_area_pct, est_media_value")
    .eq("match_id", match.id)
    .order("visible_seconds", { ascending: false });
  if (!rows || rows.length === 0) return null;

  return {
    matchLabel: match.opponent ? `${match.property} vs ${match.opponent}` : match.property,
    rows: (rows as CvExposureDbRow[]).map((r) => ({
      sponsor: r.sponsor,
      placement: (r.placement ?? "other") as CvExposureRow["placement"],
      visibleSeconds: Number(r.visible_seconds ?? 0),
      detections: Number(r.detections ?? 0),
      avgAreaPct: Math.round(Number(r.avg_area_pct ?? 0) * 100) / 100,
      estMediaValue:
        Number(r.est_media_value ?? 0) > 0 ? Number(r.est_media_value) : undefined,
    })),
  };
}

export default async function DemoPage() {
  const [live, cv] = await Promise.all([loadLive(), loadCvExposure()]);
  return <DemoClient live={live} cv={cv} />;
}
