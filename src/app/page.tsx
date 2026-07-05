import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  FileSpreadsheet,
  Gauge,
  LineChart,
  Mail,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DetectionBox } from "@/components/ui/DetectionBox";
import { FeatureBadge, type FeatureStatus } from "@/components/ui/FeatureBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";
import { AnimatedMesh } from "@/components/AnimatedMesh";
import { HowItWorksScene } from "@/components/HowItWorksScene";
import { SectionDivider } from "@/components/SectionDivider";
import { OsasunaProof } from "@/components/home/OsasunaProof";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { BroadcastHero } from "@/components/broadcast/BroadcastHero";
import { ChaosBackground } from "@/components/scenes/ChaosBackground";
import { PlatformConvergence } from "@/components/scenes/PlatformConvergence";
import { TwoViewsConvergence } from "@/components/scenes/TwoViewsConvergence";
import { GoldenHourBackdrop } from "@/components/scenes/GoldenHourBackdrop";
import { CountUp } from "@/components/CountUp";

export default function HomePage() {
  return (
    <>
      <BroadcastHero />
      <OsasunaProof />
      <ProblemSection />
      <PlatformSection />
      <HowItWorks />
      <SectionDivider className="my-2" />
      <PerSponsorSection />
      <StatsSection />
      <GoldenHourBackdrop>
        <PricingTeaser />
        <SectionDivider className="my-2" />
        <FinalCta />
      </GoldenHourBackdrop>
    </>
  );
}

/* Hero lives in components/broadcast/BroadcastHero.tsx (real detection
 * footage). The proof section right under it (home/OsasunaProof.tsx) holds
 * the three measured numbers from the public study. */

/* -------------------------------------------------------------------------- */
/* The problem                                                                */
/* -------------------------------------------------------------------------- */
const problems = [
  {
    icon: <FileSpreadsheet size={22} />,
    title: "Spreadsheets eat your week",
    body: "Marketing teams waste 8–14 hours every week copy-pasting social stats, building pivot tables, and chasing screenshots for sponsors.",
  },
  {
    icon: <Target size={22} />,
    title: "No proof of ROI",
    body: "Sponsors ask the same question every quarter: ‘what did I actually get?’. Without real-time data, renewals become a negotiation you lose.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Growth goes untracked",
    body: "You miss the spikes that matter, a viral post, a breakout match, because tracking is manual, slow, and usually after the fact.",
  },
];

function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <ChaosBackground />
      <Container>
        <SectionHeader
          eyebrow="The problem"
          eyebrowIcon={<Gauge size={13} />}
          title={
            <>
              Sport runs on{" "}
              <em className="italic text-gradient-brand">ten-figure budgets</em>{" "}
              and twenty-tab spreadsheets.
            </>
          }
          description="Modern sponsorship moves through dozens of platforms, thousands of posts, and partners who demand real-time answers. The tools didn’t catch up."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <Card className="h-full p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A]">
                  {p.icon}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                  {p.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* The platform                                                               */
/* -------------------------------------------------------------------------- */
const features: Array<{
  icon: React.ReactNode;
  title: string;
  body: string;
  points: Array<{ text: string; status: FeatureStatus }>;
}> = [
  {
    icon: <BarChart3 size={22} />,
    title: "Unified social analytics",
    body: "Instagram, TikTok, X, YouTube, Facebook, aggregated, deduplicated, normalised. One number per sponsor, per match, per week.",
    points: [
      { text: "Instagram + TikTok analytics", status: "live" },
      { text: "Sponsored vs organic post split", status: "live" },
      { text: "X, YouTube, Facebook", status: "dev" },
    ],
  },
  {
    icon: <Camera size={22} />,
    title: "Match-day computer vision",
    body: "Logo-level exposure on match footage, jersey, LED and on-screen time. In active development; starting on owned and in-venue content, broadcast next.",
    points: [
      { text: "Logo & screen-time detection", status: "dev" },
      { text: "Proven on a recorded match highlight", status: "dev" },
      { text: "GDPR-safe processing", status: "dev" },
    ],
  },
  {
    icon: <LineChart size={22} />,
    title: "ROI that renews contracts",
    body: "Auto-generated reports in the sponsor’s brand, sent every Monday. They see their investment compound. You close larger renewals faster.",
    points: [
      { text: "Branded weekly PDF reports", status: "live" },
      { text: "Benchmarks vs market", status: "planned" },
      { text: "Contract alerts", status: "planned" },
    ],
  },
];

function PlatformSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B8975A]/45 to-transparent" />
      </div>
      <Container>
        <SectionHeader
          eyebrow="The platform"
          eyebrowIcon={<Sparkles size={13} />}
          title={
            <>
              One platform.{" "}
              <em className="italic text-gradient-brand">Complete visibility.</em>
            </>
          }
          description="Everything your commercial team needs to measure a sponsorship, prove the value, and sell the renewal, in a single source of truth."
        />
        <PlatformConvergence />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <Card className="group relative h-full p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#B8975A]/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B0028]/15 text-[#F4EFE6] ring-1 ring-[#8B0028]/45">
                  {f.icon}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                  {f.body}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {f.points.map((pt) => (
                    <li
                      key={pt.text}
                      className="inline-flex flex-wrap items-center gap-2 text-[13px] text-[#F4EFE6]/75"
                    >
                      <Check size={14} className="shrink-0 text-[#B8975A]" />
                      {pt.text}
                      <FeatureBadge status={pt.status} />
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Button href="/features" variant="outline" rightIcon={<ArrowRight size={16} />}>
              See all features
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* How it works, scroll-pinned scene lives in HowItWorksScene.tsx            */
/* -------------------------------------------------------------------------- */

function HowItWorks() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AnimatedMesh variant="soft" />
      </div>
      <HowItWorksScene />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Per-sponsor workspaces (split-screen)                                      */
/* -------------------------------------------------------------------------- */
function PerSponsorSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Badge tone="gold" icon={<Sparkles size={12} />}>
              Workspaces
            </Badge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
              Two views.{" "}
              <em className="italic text-gradient-brand">One source of truth.</em>
            </h2>
            <p className="mt-5 text-pretty text-lg text-[#F4EFE6]/65">
              The club watches the whole portfolio. Each sponsor sees only
              what&apos;s theirs, branded, in their currency, in their language.
              Same data, two narratives, zero spreadsheets.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {[
                {
                  title: "Per-sponsor portals",
                  body: "Invite sponsors directly. They see only their data, in their brand colors.",
                },
                {
                  title: "Multi-platform, multi-language",
                  body: "We normalise currencies, time zones and engagement rates automatically.",
                },
                {
                  title: "Enterprise-grade security",
                  body: "SSO-ready, EU data residency by default, GDPR compliant. SOC 2 Type II planned.",
                },
              ].map((it) => (
                <li key={it.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A]">
                    <Check size={14} />
                  </span>
                  <div>
                    <div className="font-medium text-[#F4EFE6]">{it.title}</div>
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

          <TwoViewsConvergence />
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */
type StatKey = "media" | "leagues" | "renewal" | "posts";

const stats: Array<{
  key: StatKey;
  tag: string;
  label: string;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}> = [
  {
    key: "media",
    tag: "Founder",
    label: "Solo founder, in public",
    to: 1,
  },
  {
    key: "leagues",
    tag: "Live demo",
    label: "Sponsors in the live demo",
    to: 8,
  },
  {
    key: "renewal",
    tag: "EU data",
    label: "EU data residency · GDPR-native",
    to: 100,
    suffix: "%",
  },
  {
    key: "posts",
    tag: "90-day study",
    label: "Posts analysed in a 90-day study",
    to: 283,
  },
];

function StatsSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-visible rounded-3xl border border-[#B8975A]/25 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-10 lg:p-14">
          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {stats.map((s, i) => (
              <DetectionBox
                key={s.key}
                label={s.tag}
                delay={i * 0.1}
                className="bg-[#0A1628]/50"
              >
                <div className="p-5 pt-6">
                  <div className="font-[family-name:var(--font-mono)] text-4xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums sm:text-[40px]">
                    <CountUp
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                      duration={1.6}
                      delay={0.3 + i * 0.1}
                    />
                  </div>
                  <div className="mt-2 text-sm text-[#F4EFE6]/60">{s.label}</div>
                </div>
              </DetectionBox>
            ))}
          </div>
          <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-[#F4EFE6]/40">
            Pre-launch · real numbers from a public-data study · no clients yet.{" "}
            <Link
              href="/about"
              className="text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
            >
              Read the story
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

/* Pricing teaser lives in components/home/PricingTeaser.tsx (client component
 * with billing toggle + full canonical feature lists). */

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */
function FinalCta() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-[#B8975A]/30 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-12 text-center lg:p-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-dot mask-fade-radial opacity-40"
          />
          <GradientOrb color="red" size={420} className="-left-10 -top-10" />
          <GradientOrb color="gold" size={420} className="-right-10 -bottom-10" intensity="soft" />
          <Reveal>
            <Badge tone="gold" icon={<Mail size={12} />}>
              14-day free trial · no credit card
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl lg:text-6xl">
              Ready to{" "}
              <em className="italic text-gradient-brand">prove every euro</em> of your sponsorship?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-[#F4EFE6]/65">
              Join the clubs, leagues and brands turning every match into
              measurable value, from the first post to the final whistle.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                Start free trial
              </Button>
              <Button href="/demo" size="lg" variant="outline">
                Book a demo
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
