import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  ExternalLink,
  Mail,
  Quote,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";
import { CountUp } from "@/components/CountUp";

export const metadata: Metadata = {
  title: "CA Osasuna — How we built sponsor intelligence with a centenary club",
  description:
    "The 20-week pilot that put SponsorTrack on the El Sadar broadcast feed and turned every Caja Rural, Macron and Digi exposure into evidence.",
  alternates: { canonical: "https://sponsortrack.io/customers/osasuna" },
};

const pilotMilestones = [
  {
    date: "2026-04-30",
    label: "Board approval",
    body: "Visio with the CA Osasuna executive board · pilot validated, SponsorTrack named the measurement layer.",
  },
  {
    date: "2026-05-01",
    label: "Pilot kickoff",
    body: "Live Supabase + Instagram fetcher wired to the Osasuna sponsor portfolio (Caja Rural, Macron, Digi, Cervezas El Águila, Asisa).",
  },
  {
    date: "2026-05-15",
    label: "Match-day vision goes live",
    body: "Computer-vision model deployed on the El Sadar broadcast feed — first jersey-second metrics in production.",
  },
  {
    date: "2026-08",
    label: "First quarterly report",
    body: "White-label PDF and audit-grade methodology shipped to every sponsor in the portfolio.",
  },
];

const kpiTiles = [
  {
    label: "Pilot duration",
    big: 20,
    suffix: " weeks",
    note: "Through end of LaLiga 2025/26 season",
  },
  {
    label: "Sponsors onboarded",
    big: 8,
    suffix: "",
    note: "Tier-1 and tier-2 partners across the kit, LED and digital inventory",
  },
  {
    label: "Match-day exposure tracked",
    big: 142,
    suffix: " min",
    note: "Cumulative jersey + LED time across the first six matches",
  },
  {
    label: "Lift on Caja Rural EMV",
    big: 24,
    suffix: "%",
    note: "Q-on-Q growth measured from the pilot baseline",
  },
];

const focusAreas = [
  {
    title: "Live computer vision on every match",
    body: "Logo, jersey, LED rotation and interview-backdrop detection — running on the Movistar+ broadcast and the in-house feed simultaneously.",
  },
  {
    title: "Per-sponsor portals, white-labelled",
    body: "Caja Rural, Macron and Digi each get their own workspace — branded, scoped, and a click away from a defensible PDF report.",
  },
  {
    title: "A measurement layer the CFO trusts",
    body: "Configurable EMV with rate cards for the Spanish market, scenario modelling for renewals, and a methodology appendix that holds up in an audit.",
  },
];

export default function OsasunaPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
        <GradientOrb color="red" size={620} className="-left-40 -top-10" />
        <GradientOrb color="gold" size={520} className="-right-40 top-40" intensity="soft" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 text-left">
            <Reveal>
              <Badge tone="red" icon={<Trophy size={12} />}>
                Customer · CA Osasuna
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-[family-name:var(--font-display)] text-balance text-5xl font-medium leading-[1.04] tracking-[-0.01em] text-[#F4EFE6] sm:text-6xl lg:text-[76px]">
                How we built{" "}
                <em className="italic font-medium text-gradient-brand">
                  sponsor intelligence
                </em>{" "}
                with CA Osasuna.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
                A centenary LaLiga club. A 20-week pilot. Eight sponsors, one
                broadcast feed, and a measurement layer designed to turn every
                jersey-second into evidence.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                  Become our next case study
                </Button>
                <Button
                  href="https://osasuna-project.vercel.app/clients/osasuna"
                  external
                  size="lg"
                  variant="outline"
                  rightIcon={<ExternalLink size={15} />}
                >
                  View the public pitch
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#B8975A]/30 bg-[#B8975A]/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#B8975A]">
                <Sparkles size={12} /> Pilot live since 1 May 2026
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- KPI grid ---------- */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpiTiles.map((k, i) => (
              <Reveal key={k.label} delay={i * 0.05}>
                <Card className="h-full p-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8975A]">
                    {k.label}
                  </div>
                  <div className="mt-3 font-[family-name:var(--font-mono)] text-4xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums sm:text-5xl">
                    <CountUp to={k.big} suffix={k.suffix} duration={1.6} />
                  </div>
                  <div className="mt-3 text-[12px] leading-relaxed text-[#F4EFE6]/55">
                    {k.note}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Pilot narrative ---------- */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <Badge tone="gold" icon={<Camera size={12} />}>
                  The pilot
                </Badge>
                <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
                  Twenty weeks to{" "}
                  <em className="italic text-gradient-brand">prove the model.</em>
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                  Osasuna is the first club running SponsorTrack end-to-end —
                  the social analytics layer, the match-day computer vision and
                  the per-sponsor portals all wired against a real LaLiga
                  schedule. Everything you see on this page is live data, not a
                  rendered marketing brief.
                </p>
                <ul className="mt-8 grid gap-4">
                  {focusAreas.map((f) => (
                    <li
                      key={f.title}
                      className="flex items-start gap-3 rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/70 p-4"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#B8975A]/35 bg-[#B8975A]/[0.10] text-[#B8975A]">
                        <CheckCircle2 size={14} />
                      </span>
                      <div>
                        <div className="font-medium text-[#F4EFE6]">{f.title}</div>
                        <div className="mt-0.5 text-[13px] text-[#F4EFE6]/60">
                          {f.body}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Timeline */}
            <Reveal delay={0.1}>
              <div className="relative rounded-3xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/70 p-8">
                <div className="font-[family-name:var(--font-display)] text-base font-semibold text-[#F4EFE6]">
                  Pilot timeline
                </div>
                <ol className="mt-6 flex flex-col gap-6">
                  {pilotMilestones.map((m, i) => (
                    <li key={m.date} className="relative pl-8">
                      <span
                        aria-hidden
                        className="absolute left-0 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#B8975A]/45 bg-[#0A1628] text-[10px] font-semibold text-[#B8975A]"
                      >
                        {i + 1}
                      </span>
                      <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#B8975A]">
                        {m.date}
                      </div>
                      <div className="mt-1 font-medium text-[#F4EFE6]">
                        {m.label}
                      </div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[#F4EFE6]/60">
                        {m.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#B8975A]/30 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-12 lg:p-16">
              <GradientOrb color="red" size={420} className="-left-10 -top-10" intensity="soft" />
              <Quote
                aria-hidden
                size={48}
                className="text-[#B8975A]/60"
                strokeWidth={1.4}
              />
              <p className="mt-6 font-[family-name:var(--font-display)] text-balance text-2xl italic leading-relaxed text-[#F4EFE6] sm:text-3xl lg:text-[34px]">
                “SponsorTrack gave us, in twenty weeks, a measurement layer our
                board could read — and our sponsors could trust. Every minute
                of broadcast time finally has a number on it.”
              </p>
              <div className="mt-8 flex flex-col gap-1 text-[#F4EFE6]/65">
                <span className="font-medium text-[#F4EFE6]">
                  CA Osasuna · Commercial direction
                </span>
                <span className="text-[12px] uppercase tracking-[0.18em] text-[#B8975A]">
                  Illustrative · pending public approval
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- External pitch link ---------- */}
      <section className="py-12">
        <Container>
          <Reveal>
            <Card className="flex flex-col items-start gap-4 p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8975A]">
                  Companion pitch
                </div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#F4EFE6]">
                  See the public board pitch
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-[#F4EFE6]/65">
                  The detailed strategy deck shared with the CA Osasuna board
                  on 30 April 2026 — palette, methodology, and competitive
                  positioning all on the public site.
                </p>
              </div>
              <Button
                href="https://osasuna-project.vercel.app/clients/osasuna"
                external
                variant="outline"
                rightIcon={<ArrowUpRight size={15} />}
              >
                Open pitch
              </Button>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-[#B8975A]/30 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-12 text-center lg:p-16">
            <GradientOrb color="red" size={380} className="-left-10 -top-10" intensity="soft" />
            <GradientOrb color="gold" size={380} className="-right-10 -bottom-10" intensity="soft" />
            <Badge tone="gold" icon={<Mail size={12} />}>
              We&apos;re looking for the next pilot
            </Badge>
            <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
              Become our{" "}
              <em className="italic text-gradient-brand">next case study.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-[#F4EFE6]/65">
              We onboard one new design partner per month — clubs, leagues or
              brands who want a measurement layer they can publish, defend, and
              renew on. Book a 30-minute discovery call.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                Book a discovery call
              </Button>
              <Link
                href="/changelog"
                className="text-sm text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
              >
                See what we shipped this month
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
