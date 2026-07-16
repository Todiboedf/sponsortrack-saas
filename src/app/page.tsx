import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chyron } from "@/components/ui/Chyron";
import { HudFrame } from "@/components/ui/HudFrame";
import { ConfidenceTag } from "@/components/ui/ConfidenceTag";
import { FeatureBadge, type FeatureStatus } from "@/components/ui/FeatureBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { OsasunaProof } from "@/components/home/OsasunaProof";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { StudyTicker } from "@/components/home/StudyTicker";
import { BroadcastHero } from "@/components/broadcast/BroadcastHero";

export default function HomePage() {
  return (
    <>
      <BroadcastHero />
      <StudyTicker />
      <OsasunaProof />
      <ProblemSection />
      <PlatformSection />
      <HowItWorks />
      <PerSponsorSection />
      <PrelaunchStrip />
      <PricingTeaser />
      <FinalCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* The problem — numbered editorial rows + the manual-Monday artifact         */
/* -------------------------------------------------------------------------- */
const problems = [
  {
    n: "01",
    title: "Spreadsheets eat your week",
    body: "Social stats copy-pasted by hand. Pivot tables rebuilt every Monday. Screenshots chased before every sponsor call.",
  },
  {
    n: "02",
    title: "No proof of ROI",
    body: "Sponsors ask the same question every quarter: 'what did we actually get?'. Without measured exposure, the renewal is negotiated on gut feel.",
  },
  {
    n: "03",
    title: "Growth goes untracked",
    body: "A viral post. A breakout match. If nobody measured it, it never happened, and it never gets invoiced.",
  },
];

function ProblemSection() {
  return (
    <section className="relative border-t border-[#F4EFE6]/[0.06] py-16 lg:py-20">
      <Container>
        <SectionHeader
          eyebrow="The problem"
          title="Sport runs on ten-figure budgets and twenty-tab spreadsheets."
          description="Sponsorship now lives across platforms, posts and broadcasts. Most clubs still count it by hand, after the fact."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <ol className="flex flex-col divide-y divide-[#F4EFE6]/[0.08]">
            {problems.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06} as="li">
                <div className="flex gap-6 py-7 first:pt-0 last:pb-0">
                  <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[#D8FF3E] tabular-nums">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-archivo)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#F4EFE6]/65">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Artifact: how the study replaced the manual Monday */}
          <Reveal delay={0.1}>
            <HudFrame label="Monday, before / after" className="bg-[#0E1D33]/70">
              <div className="divide-y divide-[#F4EFE6]/[0.08] font-[family-name:var(--font-mono)] text-[12px] leading-relaxed">
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#8B98A9]">
                    Counted by hand
                  </div>
                  <ul className="mt-3 flex flex-col gap-1.5 text-[#F4EFE6]/55">
                    <li>9 accounts opened one by one</li>
                    <li>screenshots pasted into a deck</li>
                    <li>numbers stitched across 20 tabs</li>
                    <li>broadcast exposure: nobody counts it</li>
                  </ul>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#D8FF3E]">
                    Measured, in our public study
                  </div>
                  <ul className="mt-3 flex flex-col gap-1.5 text-[#F4EFE6]/80 tabular-nums">
                    <li>283 posts attributed automatically</li>
                    <li>9 accounts refreshed daily</li>
                    <li>1 highlight read frame by frame (CV, in dev)</li>
                    <li>1 branded PDF, Mondays 07:00</li>
                  </ul>
                </div>
              </div>
            </HudFrame>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* The platform — asymmetric bento, one real artifact per panel               */
/* -------------------------------------------------------------------------- */

const socialPoints: Array<{ text: string; status: FeatureStatus }> = [
  { text: "Instagram + TikTok analytics", status: "live" },
  { text: "Sponsored vs organic post split", status: "live" },
  { text: "X, YouTube, Facebook", status: "dev" },
];

const cvPoints: Array<{ text: string; status: FeatureStatus }> = [
  { text: "Logo & screen-time detection", status: "dev" },
  { text: "Proven on a recorded match highlight", status: "dev" },
  { text: "GDPR-safe processing", status: "dev" },
];

const reportPoints: Array<{ text: string; status: FeatureStatus }> = [
  { text: "Branded weekly PDF reports", status: "live" },
  { text: "Benchmarks vs market", status: "planned" },
  { text: "Contract alerts", status: "planned" },
];

function PointList({ points }: { points: Array<{ text: string; status: FeatureStatus }> }) {
  return (
    <ul className="mt-5 flex flex-col gap-2">
      {points.map((pt) => (
        <li
          key={pt.text}
          className="inline-flex flex-wrap items-center gap-2 text-[13px] text-[#F4EFE6]/75"
        >
          <Check size={14} className="shrink-0 text-[#D8FF3E]" />
          {pt.text}
          <FeatureBadge status={pt.status} />
        </li>
      ))}
    </ul>
  );
}

function PlatformSection() {
  return (
    <section className="relative border-t border-[#F4EFE6]/[0.06] bg-[#050B14] py-16 lg:py-20">
      <Container>
        <SectionHeader
          eyebrow="The platform"
          title="What we measure, and what we don't yet."
          description="Social analytics run live today — 283 posts and nine accounts in our public study. Broadcast computer vision works on recorded footage, in development. Every bullet below carries its label."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {/* Social analytics — live, the widest panel */}
          <Reveal className="lg:col-span-3">
            <div className="lock-on h-full rounded-lg border border-[#F4EFE6]/[0.09] bg-[#0E1D33]/80 p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-[family-name:var(--font-archivo)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                  Unified social analytics
                </h3>
                <ConfidenceTag label="Live" value="IG + TT" />
              </div>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#F4EFE6]/65">
                Instagram and TikTok today, deduplicated and normalised. One
                number per sponsor, per week. X, YouTube and Facebook are in
                development.
              </p>
              {/* Real artifact: the study's audience split */}
              <div className="mt-6 border border-[#F4EFE6]/[0.08] bg-[#0A1628] p-5 font-[family-name:var(--font-mono)]">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/45">
                  CA Osasuna study · followers by platform
                </div>
                <div className="mt-4 flex flex-col gap-3 text-[12px] tabular-nums">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[#F4EFE6]/75">TikTok</span>
                      <span className="text-[#F4EFE6]">5.8M</span>
                    </div>
                    <div className="h-1.5 bg-[#F4EFE6]/[0.06]">
                      <div className="h-full w-[93%] bg-[#D8FF3E]" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[#F4EFE6]/75">Instagram</span>
                      <span className="text-[#F4EFE6]">415k</span>
                    </div>
                    <div className="h-1.5 bg-[#F4EFE6]/[0.06]">
                      <div className="h-full w-[7%] bg-[#F4EFE6]/60" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-[11px] text-[#F4EFE6]/45">
                  283 posts · 90 days · sponsored vs organic split included
                </div>
              </div>
              <PointList points={socialPoints} />
            </div>
          </Reveal>

          {/* CV — in development, honest framing over a real annotated frame */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <div className="lock-on flex h-full flex-col rounded-lg border border-[#F4EFE6]/[0.09] bg-[#0E1D33]/80 p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-[family-name:var(--font-archivo)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                  Match-day computer vision
                </h3>
                <FeatureBadge status="dev" />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                Logo-level screen time on recorded broadcast and owned footage.
                The model already read a real match: 10 sponsors, one
                highlight, frame by frame.
              </p>
              <div className="relative mt-6 overflow-hidden border border-[#F4EFE6]/[0.08]">
                <Image
                  src="/demo/cv-annotated.jpg"
                  alt="A real frame from the Osasuna highlight annotated by the detection model"
                  width={640}
                  height={360}
                  sizes="(min-width: 1024px) 36vw, 92vw"
                  className="block w-full"
                />
                <span className="absolute bottom-2 left-2 bg-[#050B14]/85 px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#F4EFE6]/80">
                  real model output · recorded POC
                </span>
              </div>
              <PointList points={cvPoints} />
            </div>
          </Reveal>

          {/* Reporting — live artifact */}
          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="lock-on flex h-full flex-col rounded-lg border border-[#F4EFE6]/[0.09] bg-[#0E1D33]/80 p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-[family-name:var(--font-archivo)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                  ROI that renews contracts
                </h3>
                <ConfidenceTag label="Live" value="Mon 07:00" />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                A branded PDF generated from the data, every Monday at 07:00.
                The renewal conversation starts from numbers, not memories.
              </p>
              <div className="mt-6 border border-[#F4EFE6]/[0.08] bg-[#0A1628] p-5 font-[family-name:var(--font-mono)] text-[12px]">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/45">
                  From the study's weekly report
                </div>
                <ul className="mt-3 flex flex-col gap-2 tabular-nums text-[#F4EFE6]/80">
                  <li className="flex items-center justify-between">
                    <span>Kosner</span><span>120.5s screen time</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Nissan</span><span>97.5s</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Macron</span><span>80.0s</span>
                  </li>
                </ul>
              </div>
              <PointList points={reportPoints} />
            </div>
          </Reveal>

          {/* Honesty note panel completes the bento row */}
          <Reveal delay={0.16} className="lg:col-span-3">
            <div className="flex h-full flex-col justify-between rounded-lg border border-[#D8FF3E]/25 bg-[#0A1628] p-7">
              <div>
                <Chyron>Why the labels</Chyron>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#F4EFE6]/70">
                  Every capability on this site is tagged{" "}
                  <FeatureBadge status="live" className="mx-1" />
                  <FeatureBadge status="dev" className="mx-1" /> or{" "}
                  <FeatureBadge status="planned" className="mx-1" /> — because
                  the audience for a measurement product can tell the
                  difference. What runs today is measured; what doesn&apos;t
                  is labelled.
                </p>
              </div>
              <div className="mt-6">
                <Button href="/features" variant="outline" rightIcon={<ArrowRight size={16} />}>
                  See all features
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* How it works — a broadcast timecode bar, no scroll-jacking                 */
/* -------------------------------------------------------------------------- */
const STEPS = [
  {
    tc: "T+00",
    title: "Connect",
    body: "Point us at the club's accounts and recorded footage. No integration needed to start; OAuth self-serve is planned.",
  },
  {
    tc: "T+01",
    title: "Detect",
    body: "The model reads recorded broadcast and owned footage frame by frame, and tags every sponsor mention in every post. No live feed, no sampling.",
  },
  {
    tc: "T+02",
    title: "Report",
    body: "Data refreshes daily. The branded PDF goes out every Monday at 07:00, the same report our public study publishes.",
  },
  {
    tc: "T+03",
    title: "Renew",
    body: "The renewal case builds itself: screen time, share of voice, trend lines. Every claim in the deck has a source.",
  },
];

function HowItWorks() {
  return (
    <section className="relative border-t border-[#F4EFE6]/[0.06] py-16 lg:py-20">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="From posts and footage to a renewal case."
        />

        <div className="mt-12">
          {/* Timecode rail */}
          <div aria-hidden className="relative mb-8 hidden h-6 lg:block">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#F4EFE6]/15" />
            <div className="absolute inset-0 grid grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.tc} className="relative">
                  <span className="absolute left-0 top-1/2 h-3 w-[2px] -translate-y-1/2 bg-[#D8FF3E]" />
                </div>
              ))}
            </div>
          </div>

          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.tc} delay={i * 0.06} as="li">
                <div className="h-full">
                  <div className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#D8FF3E] tabular-nums">
                      {s.tc}
                    </span>
                    <h3 className="font-[family-name:var(--font-archivo)] text-lg font-semibold tracking-tight text-[#F4EFE6]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#F4EFE6]/65 lg:pr-4">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Two views, one source of truth — real study numbers on both sides         */
/* -------------------------------------------------------------------------- */

/* Real numbers from the public study: share of a recorded 3-minute
 * Osasuna–Alavés highlight each sponsor was visible for (CV model). */
const PORTFOLIO: [string, string][] = [
  ["Kosner", "62%"],
  ["Nissan", "50%"],
  ["Macron", "41%"],
];

function PerSponsorSection() {
  return (
    <section className="relative border-t border-[#F4EFE6]/[0.06] py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Chyron>Workspaces</Chyron>
            <h2 className="mt-6 font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-[#F4EFE6] sm:text-[42px]">
              Two views. One source of truth.
            </h2>
            <p className="mt-5 text-pretty text-lg text-[#F4EFE6]/65">
              The club sees the whole portfolio. Each sponsor sees only
              what&apos;s theirs, in their own brand. Same data, zero
              spreadsheets.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {(
                [
                  {
                    title: "Per-sponsor portals",
                    body: "Each sponsor gets a branded, read-only view of their own numbers.",
                    status: "planned" as FeatureStatus,
                  },
                  {
                    title: "Normalised engagement",
                    body: "One comparable rate across Instagram and TikTok, weighted by audience.",
                    status: "live" as FeatureStatus,
                  },
                  {
                    title: "EU data residency by default",
                    body: "GDPR-native hosting; your data never trains shared models.",
                    status: "live" as FeatureStatus,
                  },
                ]
              ).map((it) => (
                <li key={it.title} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-[#D8FF3E]/40 text-[#D8FF3E]">
                    <Check size={12} />
                  </span>
                  <div>
                    <div className="font-medium text-[#F4EFE6]">
                      {it.title}
                      <FeatureBadge status={it.status} className="ml-2" />
                    </div>
                    <div className="text-sm text-[#F4EFE6]/60">{it.body}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/demo" rightIcon={<ArrowRight size={16} />}>
                Open live demo
              </Button>
            </div>
          </div>

          <Reveal delay={0.08}>
            <HudFrame label="Same data · two views" tone="dim" className="bg-[#0E1D33]">
              <div className="grid sm:grid-cols-2">
                {/* Club view */}
                <div className="border-b border-[#F4EFE6]/[0.08] p-5 sm:border-b-0 sm:border-r">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8FF3E]">
                    Club view · CA Osasuna (study)
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-archivo)] text-base font-semibold text-[#F4EFE6]">
                    % of broadcast · one highlight
                  </div>
                  <ul className="mt-4 flex flex-col gap-2.5 text-[12px]">
                    {PORTFOLIO.map(([n, v]) => (
                      <li key={n} className="flex items-center gap-3">
                        <span className="flex-1 truncate text-[#F4EFE6]/80">{n}</span>
                        <div className="h-1 w-16 overflow-hidden bg-[#F4EFE6]/[0.08]">
                          <div
                            style={{ width: v }}
                            className="h-full bg-[#D8FF3E]"
                          />
                        </div>
                        <span className="w-9 text-right font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]/85">
                          {v}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sponsor view (report paper) */}
                <div className="bg-[#F7F3EA] p-5 text-[#0F1A2E]">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F1A2E]/60">
                    Sponsor view · Kosner
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-archivo)] text-base font-semibold">
                    Brand exposure
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="border border-[#0F1A2E]/10 bg-white p-3">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#0F1A2E]/55">
                        Screen time
                      </div>
                      <div className="mt-1 font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
                        120.5s
                      </div>
                      <div className="text-[10px] text-[#0F1A2E]/45">one highlight</div>
                    </div>
                    <div className="border border-[#0F1A2E]/10 bg-white p-3">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-[#0F1A2E]/55">
                        Share of voice
                      </div>
                      <div className="mt-1 font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
                        61.9%
                      </div>
                      <div className="text-[10px] text-[#0F1A2E]/45">of 10 sponsors</div>
                    </div>
                  </div>
                  <div className="mt-3 border border-[#0F1A2E]/10 bg-white p-3 text-[11px] leading-relaxed text-[#0F1A2E]/65">
                    The Kosner crest was on screen for{" "}
                    <span className="font-semibold text-[#0F1A2E]">120.5 seconds</span>{" "}
                    of a 3-minute highlight, measured frame by frame.
                  </div>
                </div>
              </div>
            </HudFrame>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Pre-launch strip — the honest numbers, one quiet mono band                 */
/* -------------------------------------------------------------------------- */
function PrelaunchStrip() {
  return (
    <section className="border-y border-[#F4EFE6]/[0.08] bg-[#050B14] py-6">
      <Container>
        <div className="flex flex-col items-start justify-between gap-3 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[#F4EFE6]/60 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 tabular-nums">
            <span className="text-[#D8FF3E]">Pre-launch</span>
            <span>1 founder, in public</span>
            <span>8 sponsors in the live demo</span>
            <span>283 posts analysed · 90 days</span>
            <span>100% EU data residency</span>
          </div>
          <Link
            href="/about"
            className="shrink-0 text-[#F4EFE6]/80 underline underline-offset-4 hover:text-[#D8FF3E]"
          >
            Read the story
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */
function FinalCta() {
  return (
    <section className="relative bg-[#050B14] py-16 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid mask-fade-radial opacity-50"
      />
      <Container>
        <Reveal>
          <HudFrame
            label="Live demo · public study"
            detail="No sample screenshots"
            className="mx-auto max-w-4xl bg-[#0A1628]"
          >
            <div className="px-8 py-14 text-center lg:px-16 lg:py-20">
              <h2 className="mx-auto max-w-3xl font-[family-name:var(--font-archivo)] text-balance text-[38px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F4EFE6] sm:text-5xl">
                See a real match, measured.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-[#F4EFE6]/65">
                The live demo runs on our CA Osasuna public study — nine
                accounts, 283 posts, one broadcast highlight, measured frame
                by frame.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/demo" size="lg" rightIcon={<ArrowRight size={16} />}>
                  Open the live demo
                </Button>
                <Button href="/contact" size="lg" variant="outline">
                  Start free trial
                </Button>
              </div>
            </div>
          </HudFrame>
        </Reveal>
      </Container>
    </section>
  );
}
