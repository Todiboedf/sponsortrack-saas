"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Filter,
  Heart,
  Image as ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Play,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatCompact, formatCurrency } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Data shapes                                                                */
/* -------------------------------------------------------------------------- */

export type LiveData = {
  sponsors: Array<{ id: string; label: string; color: string }>;
  trend: Array<{ d: string; ig: number; tt: number; x: number; yt: number }>;
  emv: Array<{ name: string; value: number; color: string }>;
  engagement: Array<{ sponsor: string; reach: number; engagement: number }>;
  topPosts: Array<{
    platform: string;
    caption: string;
    sponsor: string;
    views: number;
    likes: number;
    comments: number;
    emv: number;
  }>;
};

const FALLBACK_SPONSORS = [
  { id: "all", label: "All sponsors", color: "#B8975A" },
  { id: "santander", label: "Santander", color: "#EC1C23" },
  { id: "adidas", label: "Adidas", color: "#6B7280" },
  { id: "emirates", label: "Emirates", color: "#D71920" },
  { id: "hublot", label: "Hublot", color: "#2B2B2B" },
];

const ranges = [
  { id: "7d", label: "Last 7 days", multiplier: 0.22 },
  { id: "30d", label: "Last 30 days", multiplier: 1 },
  { id: "90d", label: "Last 90 days", multiplier: 2.7 },
  { id: "season", label: "Full season", multiplier: 6.4 },
];

const platforms = [
  { id: "all", label: "All platforms" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "x", label: "X/Twitter" },
  { id: "youtube", label: "YouTube" },
];

const FALLBACK_TREND = [
  { d: "Apr 01", ig: 12.1, tt: 7.8, x: 4.1, yt: 2.2 },
  { d: "Apr 03", ig: 14.3, tt: 10.1, x: 4.8, yt: 2.6 },
  { d: "Apr 05", ig: 18.7, tt: 12.4, x: 5.9, yt: 3.4 },
  { d: "Apr 07", ig: 16.2, tt: 11.8, x: 5.4, yt: 3.1 },
  { d: "Apr 09", ig: 22.4, tt: 15.3, x: 6.8, yt: 4.2 },
  { d: "Apr 11", ig: 28.1, tt: 18.9, x: 7.7, yt: 5.1 },
  { d: "Apr 13", ig: 24.3, tt: 16.2, x: 7.0, yt: 4.6 },
  { d: "Apr 15", ig: 31.8, tt: 22.4, x: 8.3, yt: 5.7 },
  { d: "Apr 17", ig: 29.4, tt: 20.6, x: 7.9, yt: 5.4 },
  { d: "Apr 19", ig: 35.2, tt: 26.3, x: 8.9, yt: 6.2 },
  { d: "Apr 21", ig: 33.1, tt: 24.7, x: 8.5, yt: 5.9 },
  { d: "Apr 23", ig: 41.7, tt: 30.5, x: 10.1, yt: 7.3 },
];

const FALLBACK_EMV = [
  { name: "Instagram", value: 3.2, color: "#B8975A" },
  { name: "TikTok", value: 2.1, color: "#A00030" },
  { name: "X/Twitter", value: 1.3, color: "#F4EFE6" },
  { name: "YouTube", value: 0.9, color: "#10B981" },
  { name: "Facebook", value: 0.4, color: "#F59E0B" },
];

const FALLBACK_ENGAGEMENT = [
  { sponsor: "Santander", reach: 148, engagement: 4.2 },
  { sponsor: "Adidas", reach: 122, engagement: 5.1 },
  { sponsor: "Emirates", reach: 91, engagement: 3.6 },
  { sponsor: "Hublot", reach: 42, engagement: 2.9 },
  { sponsor: "Visit Rwanda", reach: 58, engagement: 3.1 },
];

const FALLBACK_TOP_POSTS = [
  {
    platform: "Instagram",
    caption: "Vinícius Jr. hat-trick celebration · new away kit",
    sponsor: "Adidas",
    views: 28_400_000,
    likes: 3_120_000,
    comments: 48_200,
    emv: 412_000,
  },
  {
    platform: "TikTok",
    caption: "Locker room FIFA tournament ft. Jude Bellingham",
    sponsor: "Santander",
    views: 22_800_000,
    likes: 2_740_000,
    comments: 36_100,
    emv: 298_000,
  },
  {
    platform: "Instagram",
    caption: "Pre-match arrival · suit by Hublot ambassadors",
    sponsor: "Hublot",
    views: 9_100_000,
    likes: 842_000,
    comments: 12_400,
    emv: 138_000,
  },
  {
    platform: "YouTube",
    caption: "Champions League inside edit · Emirates backdrop",
    sponsor: "Emirates",
    views: 6_400_000,
    likes: 512_000,
    comments: 24_800,
    emv: 112_000,
  },
];

function platformIcon(name: string) {
  if (/tiktok|youtube|video/i.test(name)) return <Play size={13} />;
  return <ImageIcon size={13} />;
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function DemoClient({ live }: { live?: LiveData | null }) {
  const isLive = !!(live && live.sponsors.length > 0);
  const sponsors = isLive ? live!.sponsors : FALLBACK_SPONSORS;
  const baseTrend = isLive && live!.trend.length > 0 ? live!.trend : FALLBACK_TREND;
  const baseEmv = isLive && live!.emv.length > 0 ? live!.emv : FALLBACK_EMV;
  const baseEngagement =
    isLive && live!.engagement.length > 0 ? live!.engagement : FALLBACK_ENGAGEMENT;
  const topPostsRaw = isLive && live!.topPosts.length > 0 ? live!.topPosts : FALLBACK_TOP_POSTS;
  const topPosts = topPostsRaw.map((p) => ({ ...p, icon: platformIcon(p.platform) }));

  const [sponsor, setSponsor] = useState("all");
  const [range, setRange] = useState("30d");
  const [platform, setPlatform] = useState("all");

  const multiplier = ranges.find((r) => r.id === range)?.multiplier ?? 1;
  const sponsorMod =
    sponsor === "all" ? 1 : isLive ? 1 / Math.max(1, sponsors.length - 1) : 0.3;
  const platformVisible = (id: "ig" | "tt" | "x" | "yt") =>
    platform === "all" ||
    (platform === "instagram" && id === "ig") ||
    (platform === "tiktok" && id === "tt") ||
    (platform === "x" && id === "x") ||
    (platform === "youtube" && id === "yt");

  const trendData = useMemo(
    () =>
      baseTrend.map((d) => ({
        d: d.d,
        Instagram: +(d.ig * multiplier * sponsorMod).toFixed(1),
        TikTok: +(d.tt * multiplier * sponsorMod).toFixed(1),
        "X/Twitter": +(d.x * multiplier * sponsorMod).toFixed(1),
        YouTube: +(d.yt * multiplier * sponsorMod).toFixed(1),
      })),
    [multiplier, sponsorMod, baseTrend]
  );

  const emvData = useMemo(
    () =>
      baseEmv
        .filter((e) => {
          if (platform === "all") return true;
          if (platform === "instagram") return e.name === "Instagram";
          if (platform === "tiktok") return e.name === "TikTok";
          if (platform === "x") return e.name === "X/Twitter";
          if (platform === "youtube") return e.name === "YouTube";
          return true;
        })
        .map((e) => ({ ...e, value: +(e.value * multiplier * sponsorMod).toFixed(2) })),
    [multiplier, sponsorMod, platform, baseEmv]
  );

  const engagementData = useMemo(
    () =>
      baseEngagement
        .filter((e) => sponsor === "all" || sponsors.find((s) => s.id === sponsor)?.label === e.sponsor)
        .map((e) => ({
          sponsor: e.sponsor,
          reach: Math.round(e.reach * (isLive ? 1 : multiplier)),
          engagement: +(e.engagement * (isLive ? 1 : sponsorMod * 2 + 0.3)).toFixed(1),
        })),
    [multiplier, sponsor, sponsorMod, baseEngagement, sponsors, isLive]
  );

  const totalReach = trendData.reduce(
    (sum, r) =>
      sum +
      (platformVisible("ig") ? r.Instagram : 0) +
      (platformVisible("tt") ? r.TikTok : 0) +
      (platformVisible("x") ? r["X/Twitter"] : 0) +
      (platformVisible("yt") ? r.YouTube : 0),
    0
  );
  const totalEmv = emvData.reduce((s, e) => s + e.value, 0);

  const kpis = [
    {
      label: "Total reach",
      value: `${formatCompact(totalReach * 1_000_000)}`,
      delta: "+18.4%",
      positive: true,
      icon: <Users size={16} />,
    },
    {
      label: "Engagement rate",
      value: `${(3.8 * (sponsorMod * 2 + 0.3)).toFixed(1)}%`,
      delta: "+0.6pt",
      positive: true,
      icon: <Heart size={16} />,
    },
    {
      label: "Media value (EMV)",
      value: formatCurrency(totalEmv * 1_000_000),
      delta: "+22.1%",
      positive: true,
      icon: <TrendingUp size={16} />,
    },
    {
      label: "Active sponsors",
      value:
        sponsor === "all"
          ? "12"
          : "1",
      delta: sponsor === "all" ? "+2 vs prev" : "watching",
      positive: true,
      icon: <Sparkles size={16} />,
    },
  ];

  return (
    <>
      <section className="pt-32 pb-10 lg:pt-40">
        <Container>
          <div className="flex flex-col items-start gap-5">
            <Badge icon={<LayoutDashboard size={13} />}>Interactive demo</Badge>
            <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]">
                  The SponsorTrack dashboard.{" "}
                  <span className="text-gradient-brand">Live, in your browser.</span>
                </h1>
                <p className="mt-4 max-w-xl text-[15px] text-white/60">
                  {isLive
                    ? "Live Instagram data, refreshed daily. Filter by sponsor, platform or period: the whole dashboard re-computes in real time."
                    : "All figures below are synthetic data for illustration. Filter by sponsor, platform or period: the whole dashboard re-computes in real time."}
                </p>
              </div>
              <Button href="/contact" size="md" rightIcon={<ArrowUpRight size={15} />}>
                Get your own workspace
              </Button>
            </div>
          </div>

          {/* Filter bar */}
          <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 md:flex-row md:items-center md:gap-2">
            <div className="flex items-center gap-2 pl-2 text-[12px] uppercase tracking-[0.18em] text-white/40">
              <Filter size={13} />
              Filters
            </div>
            <Select
              label="Sponsor"
              options={sponsors.map((s) => ({ value: s.id, label: s.label }))}
              value={sponsor}
              onChange={setSponsor}
            />
            <Select
              label="Period"
              options={ranges.map((r) => ({ value: r.id, label: r.label }))}
              value={range}
              onChange={setRange}
            />
            <Select
              label="Platform"
              options={platforms.map((p) => ({ value: p.id, label: p.label }))}
              value={platform}
              onChange={setPlatform}
            />
            <div className="flex-1" />
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[12px] text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {isLive ? "Live · refreshed today" : "Demo · synthetic data"}
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                    {k.label}
                  </div>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-white/70 ring-1 ring-white/10">
                    {k.icon}
                  </span>
                </div>
                <div className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-white tabular-nums">
                  {k.value}
                </div>
                <div
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 text-[12px]",
                    k.positive ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {k.positive ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}
                  {k.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Trend chart */}
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                    Social reach · millions
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                    Reach over time
                  </div>
                </div>
              </div>
              <div className="mt-4 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g-ig" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B8975A" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#B8975A" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-tt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A00030" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#A00030" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-x" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F4EFE6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#F4EFE6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-yt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="d"
                      tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={44}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ paddingTop: 12, fontSize: 12, color: "rgba(255,255,255,0.6)" }}
                    />
                    {platformVisible("ig") && (
                      <Area
                        type="monotone"
                        dataKey="Instagram"
                        stroke="#B8975A"
                        strokeWidth={2}
                        fill="url(#g-ig)"
                      />
                    )}
                    {platformVisible("tt") && (
                      <Area
                        type="monotone"
                        dataKey="TikTok"
                        stroke="#A00030"
                        strokeWidth={2}
                        fill="url(#g-tt)"
                      />
                    )}
                    {platformVisible("x") && (
                      <Area
                        type="monotone"
                        dataKey="X/Twitter"
                        stroke="#F4EFE6"
                        strokeWidth={2}
                        fill="url(#g-x)"
                      />
                    )}
                    {platformVisible("yt") && (
                      <Area
                        type="monotone"
                        dataKey="YouTube"
                        stroke="#10B981"
                        strokeWidth={2}
                        fill="url(#g-yt)"
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-5 lg:p-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                  EMV · € millions
                </div>
                <div className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Value per platform
                </div>
              </div>
              <div className="mt-2 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emvData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {emvData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip suffix="M €" />} />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ paddingTop: 8, fontSize: 11, color: "rgba(255,255,255,0.6)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Engagement per sponsor */}
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-5 lg:p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                  Per sponsor · reach (M) & engagement rate (%)
                </div>
                <div className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Engagement performance
                </div>
              </div>
              <Badge className="text-[11px]">{isLive ? "Live data" : "Synthetic data"}</Badge>
            </div>
            <div className="mt-4 h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={engagementData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                  barSize={22}
                >
                  <defs>
                    <linearGradient id="bar-reach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B0028" />
                      <stop offset="100%" stopColor="#A00030" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="sponsor"
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="reach" fill="url(#bar-reach)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="engagement" fill="#F4EFE6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top posts */}
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                    Top posts · sorted by EMV
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                    Best performing content
                  </div>
                </div>
              </div>
              <ul className="mt-4 divide-y divide-white/[0.05]">
                {topPosts.map((p, i) => (
                  <li key={p.caption} className="grid grid-cols-[auto_1fr_auto] gap-4 py-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#8B0028] to-[#B8975A] ring-1 ring-white/10">
                      <div className="absolute inset-0 grid place-items-center text-white/80">
                        {p.icon}
                      </div>
                      <div className="absolute top-1 left-1 rounded bg-black/60 px-1 text-[9px] uppercase tracking-wider text-white/80">
                        #{i + 1}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-white">
                        {p.caption}
                      </div>
                      <div className="mt-0.5 text-[12px] text-white/45">
                        {p.sponsor} · {p.platform}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-white/65">
                        <span className="inline-flex items-center gap-1">
                          <Play size={12} /> {formatCompact(p.views)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Heart size={12} /> {formatCompact(p.likes)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle size={12} /> {formatCompact(p.comments)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                        EMV
                      </div>
                      <div className="font-[family-name:var(--font-display)] text-lg font-semibold tabular-nums text-white">
                        {formatCurrency(p.emv)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                    This week’s alerts
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                    Moments that matter
                  </div>
                </div>
                <Badge className="text-[11px] text-emerald-300 border-emerald-400/30 bg-emerald-400/10">
                  4 new
                </Badge>
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  {
                    label: "Santander post virality",
                    detail: "IG reel crossed 20M views in 18h. Renewal window opens Jul 2026.",
                    tone: "emerald",
                  },
                  {
                    label: "LED rotation under-priced",
                    detail: "Pro-tip: Adidas got 4.2× more screen time than contract cap.",
                    tone: "gold",
                  },
                  {
                    label: "Emirates sentiment dip",
                    detail: "−0.4pt after away fixture, worth a narrative response.",
                    tone: "amber",
                  },
                  {
                    label: "Visit Rwanda growth",
                    detail: "+38% reach MoM, candidate for tier upgrade.",
                    tone: "blue",
                  },
                ].map((a) => (
                  <li
                    key={a.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-1 inline-block h-2 w-2 rounded-full",
                          a.tone === "emerald" && "bg-emerald-400",
                          a.tone === "gold" && "bg-[#B8975A]",
                          a.tone === "amber" && "bg-amber-400",
                          a.tone === "blue" && "bg-[#B8975A]"
                        )}
                      />
                      <div>
                        <div className="text-[13px] font-medium text-white">{a.label}</div>
                        <div className="mt-0.5 text-[12px] text-white/55">{a.detail}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#120822] via-[#0A0A12] to-[#081226] p-8 text-center lg:p-10">
            <div className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
              Like what you see?
            </div>
            <p className="mx-auto mt-3 max-w-xl text-white/60">
              Get your own workspace in under 10 minutes. Connect your channels, import
              your sponsor list, and start tracking today.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="md" rightIcon={<ArrowUpRight size={15} />}>
                Start free trial
              </Button>
              <Button href="/pricing" size="md" variant="outline">
                Compare plans
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* UI helpers                                                                 */
/* -------------------------------------------------------------------------- */

function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="group relative inline-flex flex-1 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 hover:border-white/15">
      <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 appearance-none bg-transparent pr-5 text-[13px] text-white outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0A0A12] text-white">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 text-white/45" />
    </label>
  );
}

type TooltipPayload = { name: string; value: number; color: string };
function ChartTooltip({
  active,
  payload,
  label,
  suffix,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  suffix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0C0C14]/95 px-3 py-2 text-[12px] shadow-2xl backdrop-blur">
      {label !== undefined && (
        <div className="mb-1 text-[11px] uppercase tracking-[0.14em] text-white/45">
          {label}
        </div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-white/60">{p.name}</span>
            <span className="ml-auto tabular-nums text-white">
              {typeof p.value === "number" ? p.value.toLocaleString("en-US") : p.value}
              {suffix ? ` ${suffix}` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
