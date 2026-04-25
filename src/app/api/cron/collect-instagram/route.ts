import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchInstagramProfile, computeKpis } from "@/lib/instagram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(req: Request): boolean {
  // Vercel cron sends the CRON_SECRET as a Bearer token in Authorization
  // (https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs)
  const auth = req.headers.get("authorization") ?? "";
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: sponsors, error: listErr } = await supabase
    .from("sponsors")
    .select("id, slug, instagram_handle")
    .not("instagram_handle", "is", null);

  if (listErr) {
    return NextResponse.json({ error: listErr.message }, { status: 500 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const results: Array<{ slug: string; ok: boolean; error?: string }> = [];

  for (const s of sponsors ?? []) {
    if (!s.instagram_handle) continue;
    try {
      const profile = await fetchInstagramProfile(s.instagram_handle);
      const kpis = computeKpis(profile);

      const { error: upErr } = await supabase.from("sponsor_kpis_daily").upsert(
        {
          sponsor_id: s.id,
          platform: "instagram",
          date: today,
          ...kpis,
          raw: profile.recent_posts,
        },
        { onConflict: "sponsor_id,platform,date" }
      );

      if (upErr) throw new Error(upErr.message);
      results.push({ slug: s.slug, ok: true });
    } catch (err) {
      results.push({
        slug: s.slug,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
    // Stagger requests so we don't hammer Instagram
    await new Promise((r) => setTimeout(r, 1500));
  }

  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;
  return NextResponse.json({ date: today, ok, failed, results });
}
