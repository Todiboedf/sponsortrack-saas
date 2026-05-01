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
  PlugZap,
  ScanSearch,
  ScrollText,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";
import { LogoMarquee } from "@/components/LogoMarquee";
import { DashboardMockup } from "@/components/DashboardMockup";
import { CountUp } from "@/components/CountUp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ProblemSection />
      <PlatformSection />
      <HowItWorks />
      <PerSponsorSection />
      <StatsSection />
      <PricingTeaser />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-12 lg:pt-44 lg:pb-16">
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
      <GradientOrb color="red" size={620} className="-left-40 -top-20" />
      <GradientOrb color="gold" size={520} className="-right-40 top-40" intensity="soft" />
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Badge tone="red" icon={<Sparkles size={12} />}>
              New · Match-day computer vision is live
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 font-[family-name:var(--font-display)] text-balance text-[44px] font-medium leading-[1.04] tracking-[-0.01em] text-[#F4EFE6] sm:text-6xl lg:text-[80px]">
              Sponsor intelligence,
              <br />
              <em className="italic font-medium text-gradient-brand">lived in real time.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-pretty text-lg text-[#F4EFE6]/70 sm:text-xl">
              Built for the clubs, leagues and brands who measure what matters.
              Cross-platform analytics, match-day computer vision, and the
              reports that actually renew contracts.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                Start free trial
              </Button>
              <Button href="/demo" size="lg" variant="outline">
                Watch live demo
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[#F4EFE6]/55">
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-[#B8975A]" />
                14-day free trial
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-[#B8975A]" />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-[#B8975A]" />
                EU data residency
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-20 lg:mt-24">
          <Reveal delay={0.1} y={36}>
            <DashboardMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Trusted by                                                                 */
/* -------------------------------------------------------------------------- */
function TrustedBy() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B8975A]">
            Built for the teams behind leagues like these
          </p>
        </Reveal>
        <LogoMarquee />
      </Container>
    </section>
  );
}

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
    body: "You miss the spikes that matter — a viral post, a breakout match — because tracking is manual, slow, and usually after the fact.",
  },
];

function ProblemSection() {
  return (
    <section className="relative py-24 lg:py-32">
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
const features = [
  {
    icon: <BarChart3 size={22} />,
    title: "Unified social analytics",
    body: "Instagram, TikTok, X, YouTube, Facebook — aggregated, deduplicated, normalised. One number per sponsor, per match, per week.",
    points: ["Cross-platform reach", "Post-level attribution", "Organic vs paid"],
  },
  {
    icon: <Camera size={22} />,
    title: "Match-day computer vision",
    body: "Our model watches the broadcast feed and measures the exact screen time of every sponsor logo, jersey, LED rotation and interview backdrop.",
    points: ["Live logo tracking", "Broadcast quality scoring", "GDPR-safe processing"],
  },
  {
    icon: <LineChart size={22} />,
    title: "ROI that renews contracts",
    body: "Auto-generated reports in the sponsor’s brand, sent every Monday. They see their investment compound. You close larger renewals faster.",
    points: ["White-label PDFs", "Benchmarks vs market", "Contract alerts"],
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
          description="Everything your commercial team needs to measure a sponsorship, prove the value, and sell the renewal — in a single source of truth."
        />
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
                      key={pt}
                      className="inline-flex items-center gap-2 text-[13px] text-[#F4EFE6]/75"
                    >
                      <Check size={14} className="text-[#B8975A]" />
                      {pt}
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
/* How it works                                                               */
/* -------------------------------------------------------------------------- */
const steps = [
  {
    n: "01",
    icon: <PlugZap size={20} />,
    title: "Connect",
    body: "Plug your social channels, broadcast feed and CRM. One-click via OAuth, dedicated SDK for everything else.",
  },
  {
    n: "02",
    icon: <ScanSearch size={20} />,
    title: "Detect",
    body: "Our models watch every post and every broadcast frame, attribute exposures to the right sponsor, normalise the numbers.",
  },
  {
    n: "03",
    icon: <ScrollText size={20} />,
    title: "Report",
    body: "White-label dashboards refresh in real time. Branded PDF + email recap goes out every Monday at 07:00 local.",
  },
  {
    n: "04",
    icon: <Workflow size={20} />,
    title: "Renew",
    body: "Renewal alerts, benchmark scenarios and a contract calendar — so commercial conversations start with evidence.",
  },
];

function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          eyebrowIcon={<Workflow size={13} />}
          title={
            <>
              Four steps from{" "}
              <em className="italic text-gradient-brand">channel chaos</em> to renewed contract.
            </>
          }
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/70 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[#B8975A]">
                    {s.n}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A]">
                    {s.icon}
                  </span>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[#F4EFE6]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#F4EFE6]/65">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
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
              what&apos;s theirs — branded, in their currency, in their language.
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
                  body: "SSO, SOC 2 Type II in progress, EU data residency, GDPR compliant.",
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

          <Reveal delay={0.1}>
            <SplitWorkspace />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function SplitWorkspace() {
  return (
    <div className="relative">
      <GradientOrb color="red" size={420} className="-right-20 top-10" intensity="soft" />
      <div className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E] shadow-2xl">
        {/* Club view */}
        <div className="border-r border-[#F4EFE6]/[0.06] p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B8975A]">
            Club view · CA Osasuna
          </div>
          <div className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold text-[#F4EFE6]">
            Portfolio
          </div>
          <ul className="mt-4 flex flex-col gap-2.5 text-[12px]">
            {[
              ["Caja Rural", "92%"],
              ["Macron", "78%"],
              ["Digi", "64%"],
              ["Cervezas El Águila", "48%"],
              ["Asisa", "32%"],
            ].map(([n, v]) => (
              <li key={n} className="flex items-center gap-3">
                <span className="flex-1 truncate text-[#F4EFE6]/80">{n}</span>
                <div className="h-1 w-16 overflow-hidden rounded-full bg-[#F4EFE6]/[0.06]">
                  <div
                    style={{ width: v }}
                    className="h-full rounded-full bg-gradient-to-r from-[#8B0028] to-[#B8975A]"
                  />
                </div>
                <span className="w-9 text-right font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]/85">
                  {v}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sponsor view (white-labelled) */}
        <div className="bg-[#FBF7EF] p-5 text-[#0F1A2E]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B0028]">
            Sponsor view · Caja Rural
          </div>
          <div className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold">
            Brand exposure
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[#0F1A2E]/10 bg-white p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                EMV · 30d
              </div>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
                €1.84M
              </div>
              <div className="text-[10px] text-[#1F7A52]">+24%</div>
            </div>
            <div className="rounded-lg border border-[#0F1A2E]/10 bg-white p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                Logo seconds
              </div>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
                26:14
              </div>
              <div className="text-[10px] text-[#1F7A52]">+18%</div>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-[#0F1A2E]/10 bg-white p-3 text-[11px] leading-relaxed text-[#0F1A2E]/65">
            Your jersey crest appeared on{" "}
            <span className="font-semibold text-[#0F1A2E]">14 broadcasts</span>{" "}
            this month — €0.62 CPM, below market by 38%.
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */
type StatKey = "media" | "leagues" | "renewal" | "speed";

const stats: Array<{
  key: StatKey;
  label: string;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}> = [
  {
    key: "media",
    label: "Media value analysed in 2025",
    to: 2.4,
    prefix: "€",
    suffix: "B",
    decimals: 1,
  },
  {
    key: "leagues",
    label: "Leagues & federations live",
    to: 48,
  },
  {
    key: "renewal",
    label: "Renewal rate for our clients’ sponsors",
    to: 94,
    suffix: "%",
  },
  {
    key: "speed",
    label: "Faster than a spreadsheet workflow",
    to: 11,
    suffix: "×",
  },
];

function StatsSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-[#B8975A]/25 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-10 lg:p-14">
          <div className="grid gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.05}>
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-4xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums sm:text-5xl">
                    <CountUp
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                      duration={1.6}
                    />
                  </div>
                  <div className="mt-2 text-sm text-[#F4EFE6]/60">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-[#F4EFE6]/40">
            Illustrative · pre-launch.{" "}
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

/* -------------------------------------------------------------------------- */
/* Pricing teaser                                                             */
/* -------------------------------------------------------------------------- */
const tiers = [
  {
    name: "Starter",
    price: "€1,500",
    suffix: "/mo",
    description:
      "For ambitious clubs that want to stop managing sponsors in spreadsheets.",
    features: [
      "Up to 10 active sponsors",
      "Cross-platform social analytics",
      "Weekly auto-reports",
      "1 admin · 5 viewer seats",
    ],
    cta: "Start free trial",
    href: "/contact",
    featured: false,
  },
  {
    name: "Pro",
    price: "€3,500",
    suffix: "/mo",
    description:
      "For leagues, federations and top-tier clubs running full partner portfolios.",
    features: [
      "Unlimited sponsors",
      "Match-day computer vision",
      "Branded sponsor portals",
      "Prospection engine + AI outreach",
    ],
    cta: "Start free trial",
    href: "/contact",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "€7,000",
    suffix: "/mo",
    description:
      "For multi-club groups, agencies and federations with bespoke needs.",
    features: [
      "Dedicated success manager",
      "Custom data pipelines & API",
      "On-prem / EU data residency",
      "White-glove onboarding (90 days)",
    ],
    cta: "Book a discovery call",
    href: "/contact",
    featured: false,
  },
];

function PricingTeaser() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <GradientOrb color="red" size={520} className="-left-32 top-0" intensity="soft" />
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          eyebrowIcon={<Sparkles size={13} />}
          title={
            <>
              Transparent pricing.{" "}
              <em className="italic text-gradient-brand">No surprises.</em>
            </>
          }
          description="Most of our competitors hide pricing behind a demo. We don’t. Pick a plan, start a 14-day trial, switch at any time."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <Card
                className={`h-full p-8 ${
                  t.featured
                    ? "border-[#B8975A]/40 bg-gradient-to-b from-[#1A2B45] to-[#0A1628] glow-brand"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                    {t.name}
                  </h3>
                  {t.featured && (
                    <span className="rounded-full bg-[#B8975A] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0A1628]">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-mono)] text-5xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums">
                    {t.price}
                  </span>
                  <span className="text-sm text-[#F4EFE6]/55">{t.suffix}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#F4EFE6]/60">
                  {t.description}
                </p>
                <div className="mt-6">
                  <Button
                    href={t.href}
                    variant={t.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {t.cta}
                  </Button>
                </div>
                <ul className="mt-7 flex flex-col gap-3 border-t border-[#F4EFE6]/[0.06] pt-6">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="inline-flex items-start gap-2.5 text-[14px] text-[#F4EFE6]/80"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-[#B8975A]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-[#F4EFE6]/55">
            Looking for a side-by-side comparison?{" "}
            <Link
              href="/pricing"
              className="text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
            >
              See the full pricing page →
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */
const testimonials = [
  {
    quote:
      "We replaced three tools and two agencies with SponsorTrack. Our sponsor retention went from 68% to 91% in one season.",
    name: "Marta Lindgren",
    role: "Head of Commercial · Nordic FC",
  },
  {
    quote:
      "The match-day vision product is a different league. Our LED rotation is now priced like inventory — not guesswork.",
    name: "Pablo Reyes",
    role: "CMO · Club Deportivo Valencia",
  },
  {
    quote:
      "Our sponsors get a Monday morning email with their numbers. We closed two renewals before the quarter even ended.",
    name: "Aisha N’Dour",
    role: "Partnerships Director · Paris Métropole",
  },
];

function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow="What our customers say"
          eyebrowIcon={<Users size={13} />}
          title={
            <>
              Trusted by the teams who{" "}
              <em className="italic text-gradient-brand">already moved on</em>{" "}
              from spreadsheets.
            </>
          }
          description="Names and quotes are illustrative composites of our design partners while we finalise public case studies — real ones from CA Osasuna and others land in Q3."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <Card className="h-full p-8">
                <div
                  aria-hidden
                  className="font-[family-name:var(--font-display)] text-6xl italic leading-none text-[#B8975A]/70"
                >
                  &ldquo;
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-[#F4EFE6]/85">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-[#F4EFE6]/[0.06] pt-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#8B0028]/30 text-[13px] font-semibold text-[#F4EFE6] ring-1 ring-[#B8975A]/30">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-[#F4EFE6]">
                      {t.name}
                    </div>
                    <div className="truncate text-[12px] text-[#F4EFE6]/55">
                      {t.role}
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
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
              measurable value — from the first post to the final whistle.
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
