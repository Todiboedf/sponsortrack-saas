import { redirect } from "next/navigation";
import { ArrowUpRight, Heart, MessageCircle, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { formatCompact, formatCurrency } from "@/lib/utils";
import { SignOutButton } from "./SignOutButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Workspace — SponsorTrack",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: link } = await supabase
    .from("sponsor_users")
    .select("sponsor_id, role, sponsors(id, name, slug, instagram_handle)")
    .eq("user_id", user.id)
    .maybeSingle();

  const sponsor = link?.sponsors as
    | { id: string; name: string; slug: string; instagram_handle: string | null }
    | null
    | undefined;

  if (!sponsor) {
    return (
      <section className="pt-32 pb-20 lg:pt-40">
        <Container className="max-w-2xl">
          <Badge>Workspace</Badge>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
            Welcome, {user.email}
          </h1>
          <p className="mt-4 text-white/60">
            Your account isn't linked to a sponsor yet. We attach sponsors during onboarding —
            reach out to your account manager or contact us and we'll connect you to the right
            workspace.
          </p>
          <div className="mt-6 flex gap-3">
            <Button href="/contact" size="md" rightIcon={<ArrowUpRight size={15} />}>
              Contact us
            </Button>
            <SignOutButton />
          </div>
        </Container>
      </section>
    );
  }

  const { data: kpis } = await supabase
    .from("sponsor_kpis_daily")
    .select("date, platform, followers, posts, likes, comments, engagement_rate, emv")
    .eq("sponsor_id", sponsor.id)
    .order("date", { ascending: false })
    .limit(30);

  const latest = kpis?.[0];
  const prev = kpis?.[1];
  const totalEmv = (kpis ?? []).reduce((s, r) => s + (r.emv ?? 0), 0);

  function delta(a?: number | null, b?: number | null) {
    if (!a || !b || b === 0) return null;
    return +(((a - b) / b) * 100).toFixed(1);
  }

  const followersDelta = delta(latest?.followers, prev?.followers);

  return (
    <section className="pt-32 pb-20 lg:pt-40">
      <Container>
        <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge>Live workspace</Badge>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
              {sponsor.name}{" "}
              <span className="text-gradient-brand">live metrics</span>
            </h1>
            <p className="mt-3 text-white/60">
              Logged in as {user.email}
              {sponsor.instagram_handle ? ` · @${sponsor.instagram_handle} on Instagram` : null}
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="/demo" size="md" variant="outline">
              Public demo
            </Button>
            <SignOutButton />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Followers"
            value={formatCompact(latest?.followers ?? 0)}
            delta={followersDelta !== null ? `${followersDelta > 0 ? "+" : ""}${followersDelta}%` : undefined}
            positive={(followersDelta ?? 0) >= 0}
            icon={<Users size={16} />}
          />
          <KpiCard
            label="Engagement rate"
            value={`${(latest?.engagement_rate ?? 0).toFixed(2)}%`}
            icon={<Heart size={16} />}
          />
          <KpiCard
            label="EMV (30d)"
            value={formatCurrency(totalEmv, "USD")}
            icon={<TrendingUp size={16} />}
          />
          <KpiCard
            label="Posts tracked"
            value={String(latest?.posts ?? 0)}
            icon={<MessageCircle size={16} />}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 lg:p-6">
          <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
            Daily history
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-white/40">
                  <th className="py-2 text-left font-normal">Date</th>
                  <th className="py-2 text-left font-normal">Platform</th>
                  <th className="py-2 text-right font-normal">Followers</th>
                  <th className="py-2 text-right font-normal">Likes</th>
                  <th className="py-2 text-right font-normal">Comments</th>
                  <th className="py-2 text-right font-normal">ER</th>
                  <th className="py-2 text-right font-normal">EMV</th>
                </tr>
              </thead>
              <tbody>
                {(kpis ?? []).length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-white/40">
                      No data collected yet — first sync runs at 06:00 UTC daily.
                    </td>
                  </tr>
                )}
                {(kpis ?? []).map((r) => (
                  <tr key={`${r.date}-${r.platform}`} className="border-t border-white/[0.05]">
                    <td className="py-2 text-white/80">{r.date}</td>
                    <td className="py-2 text-white/60 capitalize">{r.platform}</td>
                    <td className="py-2 text-right tabular-nums text-white">
                      {formatCompact(r.followers ?? 0)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-white/80">
                      {formatCompact(r.likes ?? 0)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-white/80">
                      {formatCompact(r.comments ?? 0)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-white/80">
                      {(r.engagement_rate ?? 0).toFixed(2)}%
                    </td>
                    <td className="py-2 text-right tabular-nums text-white">
                      {formatCurrency(r.emv ?? 0, "USD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

function KpiCard({
  label,
  value,
  delta,
  positive,
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">{label}</div>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-white/70 ring-1 ring-white/10">
          {icon}
        </span>
      </div>
      <div className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-white tabular-nums">
        {value}
      </div>
      {delta && (
        <div
          className={`mt-1 text-[12px] ${
            positive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {delta}
        </div>
      )}
    </div>
  );
}
