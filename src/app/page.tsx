import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  FileSpreadsheet,
  Gauge,
  Globe2,
  LineChart,
  Mail,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ProblemSection />
      <SolutionSection />
      <DashboardSection />
      <StatsSection />
      <PricingSection />
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
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-40" />
      <GradientOrb color="violet" size={620} className="-left-40 -top-20" />
      <GradientOrb color="blue" size={560} className="-right-40 top-40" />
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Badge icon={<Sparkles size={13} />}>
              New · Match-day computer vision is live
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 font-[family-name:var(--font-display)] text-balance text-[44px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[72px]">
              Sponsor intelligence,{" "}
              <span className="text-gradient-brand">automated.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-pretty text-lg text-white/60 sm:text-xl">
              The all-in-one platform clubs, leagues and brands use to measure, prove
              and grow sponsorship value. Every post, every match, every logo —
              tracked in real time.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                Start free trial
              </Button>
              <Button href="/demo" size="lg" variant="secondary">
                Explore live demo
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/45">
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                14-day free trial
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                Cancel anytime
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
    <section className="py-14">
      <Container>
        <Reveal>
          <p className="mb-8 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-white/40">
            Built for the teams behind the biggest leagues in the world
          </p>
        </Reveal>
        <LogoMarquee />
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Problem                                                                    */
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
    body: "Sponsors ask the same question every quarter: “what did I actually get?”. Without real-time data, renewals become a negotiation you lose.",
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
              Managing sponsorships shouldn’t require{" "}
              <span className="text-white/40">spreadsheets.</span>
            </>
          }
          description="The modern sports business runs on dozens of platforms, thousands of posts, and partners who demand real-time answers. The tools didn’t catch up."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <Card className="h-full p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80">
                  {p.icon}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">
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
/* Solution                                                                   */
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
    body: "Our model watches the broadcast feed and measures the exact screen time of every sponsor logo, jersey, LED board and interview backdrop.",
    points: ["Live logo tracking", "Broadcast quality scoring", "GDPR-safe processing"],
  },
  {
    icon: <LineChart size={22} />,
    title: "ROI that renews contracts",
    body: "Auto-generated reports in the sponsor’s brand, sent every Monday. They see their investment compound. You close larger renewals faster.",
    points: ["White-label PDFs", "Benchmarks vs market", "Contract alerts"],
  },
];

function SolutionSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <Container>
        <SectionHeader
          eyebrow="The platform"
          eyebrowIcon={<Zap size={13} />}
          title={
            <>
              One platform.{" "}
              <span className="text-gradient-brand">Complete visibility.</span>
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
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED]/30 to-[#3B82F6]/20 text-white ring-1 ring-white/10">
                  {f.icon}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                  {f.body}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {f.points.map((pt) => (
                    <li
                      key={pt}
                      className="inline-flex items-center gap-2 text-[13px] text-white/65"
                    >
                      <Check size={14} className="text-[#A78BFA]" />
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
/* Dashboard preview (second illustration block)                              */
/* -------------------------------------------------------------------------- */
function DashboardSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Badge icon={<Sparkles size={13} />}>Purpose-built for sport</Badge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
              A dashboard your CMO and your sponsors can actually use.
            </h2>
            <p className="mt-5 text-pretty text-lg text-white/60">
              Every sponsor gets their own workspace with custom KPIs, branded
              reports, and a live feed of the matches, posts and broadcasts that
              moved the needle — no training required.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {[
                {
                  icon: <Users size={16} />,
                  title: "Per-sponsor workspaces",
                  body: "Invite sponsors directly. They see only their data, in their brand colors.",
                },
                {
                  icon: <Globe2 size={16} />,
                  title: "Multi-platform, multi-language",
                  body: "We normalise currencies, time zones and engagement rates automatically.",
                },
                {
                  icon: <Shield size={16} />,
                  title: "Enterprise-grade security",
                  body: "SSO, SOC 2 Type II in progress, EU data residency, GDPR compliant.",
                },
              ].map((it) => (
                <li key={it.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/10 text-white/80">
                    {it.icon}
                  </span>
                  <div>
                    <div className="font-medium text-white">{it.title}</div>
                    <div className="text-sm text-white/55">{it.body}</div>
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
            <MiniPreview />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function MiniPreview() {
  const rows = [
    { label: "Instagram reach", value: "148.2M", share: 78, color: "#A78BFA" },
    { label: "TikTok views", value: "92.7M", share: 62, color: "#3B82F6" },
    { label: "X impressions", value: "41.3M", share: 34, color: "#22D3EE" },
    { label: "YouTube watch-time", value: "5.8M h", share: 48, color: "#10B981" },
    { label: "Facebook reach", value: "12.9M", share: 22, color: "#F59E0B" },
  ];
  return (
    <div className="relative">
      <GradientOrb color="violet" size={420} className="-right-20 top-10 opacity-70" />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A12] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
              Sponsor · Santander
            </div>
            <div className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              Reach breakdown
            </div>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
            Live
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="mb-1.5 flex items-center justify-between text-[12px]">
                <span className="text-white/70">{r.label}</span>
                <span className="tabular-nums text-white/80">{r.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${r.share}%`,
                    background: `linear-gradient(90deg, ${r.color}, ${r.color}88)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
          <MiniStat label="EMV" value="€3.2M" delta="+18%" />
          <MiniStat label="Engagements" value="842k" delta="+26%" />
          <MiniStat label="Followers +" value="+128k" delta="+9%" />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">{label}</div>
      <div className="mt-1 font-[family-name:var(--font-display)] text-base font-semibold tabular-nums text-white">
        {value}
      </div>
      <div className="text-[11px] text-emerald-400">{delta}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */
const stats = [
  { value: "€2.4B", label: "Media value analysed in 2025" },
  { value: "48", label: "Leagues & federations live" },
  { value: "94%", label: "Renewal rate for our clients’ sponsors" },
  { value: "11×", label: "Faster than a spreadsheet workflow" },
];

function StatsSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0C0C15] via-[#0A0A12] to-[#0C0C15] p-10 lg:p-14">
          <div className="grid gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm text-white/55">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Pricing                                                                    */
/* -------------------------------------------------------------------------- */
const tiers = [
  {
    name: "Starter",
    price: "€1,500",
    suffix: "/mo",
    description: "For ambitious clubs that want to stop managing sponsors in spreadsheets.",
    features: [
      "Up to 10 active sponsors",
      "Cross-platform social analytics",
      "Weekly auto-reports (PDF + email)",
      "1 admin seat, 5 viewer seats",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/contact",
    featured: false,
  },
  {
    name: "Pro",
    price: "€3,500",
    suffix: "/mo",
    description: "For leagues, federations and top-tier clubs running full partner portfolios.",
    features: [
      "Unlimited sponsors",
      "Match-day computer vision",
      "White-label sponsor portals",
      "Prospection engine (CRM-ready)",
      "SSO · Priority support · SLA",
    ],
    cta: "Start free trial",
    href: "/contact",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    description: "For multi-club groups, agencies and federations with bespoke needs.",
    features: [
      "Dedicated success manager",
      "Custom data pipelines & API",
      "On-prem / EU data residency",
      "Custom computer-vision models",
      "Contract & rights-management",
    ],
    cta: "Book a demo",
    href: "/contact",
    featured: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <GradientOrb color="violet" size={520} className="-left-32 top-0 opacity-50" />
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          eyebrowIcon={<Sparkles size={13} />}
          title={
            <>
              Transparent pricing.{" "}
              <span className="text-white/40">No surprises.</span>
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
                    ? "border-white/20 bg-gradient-to-b from-[#1a0f2e]/80 to-[#0A0A12] ring-1 ring-[#7C3AED]/30"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white">
                    {t.name}
                  </h3>
                  {t.featured && (
                    <span className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-3 py-0.5 text-[11px] font-medium text-white">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.02em] text-white">
                    {t.price}
                  </span>
                  <span className="text-sm text-white/55">{t.suffix}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
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
                <ul className="mt-7 flex flex-col gap-3 border-t border-white/[0.06] pt-6">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="inline-flex items-start gap-2.5 text-[14px] text-white/75"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-[#A78BFA]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-white/45">
            Looking for a side-by-side comparison?{" "}
            <Link
              href="/pricing"
              className="text-white/80 underline underline-offset-4 hover:text-white"
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
    role: "Head of Commercial, Nordic FC",
  },
  {
    quote:
      "The match-day vision product is a different league. Our LED rotation is now priced like inventory — not guesswork.",
    name: "Pablo Reyes",
    role: "CMO, Club Deportivo Valencia",
  },
  {
    quote:
      "Our sponsors get a Monday morning email with their numbers. We closed two renewals before the quarter even ended.",
    name: "Aisha N'Dour",
    role: "Partnerships Director, Paris Métropole",
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
              <span className="text-gradient-brand">already moved on</span> from spreadsheets.
            </>
          }
          description="Names and quotes are illustrative composites of our design partners while we finalise public case studies — real ones drop in Q3."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <Card className="h-full p-8">
                <div
                  aria-hidden
                  className="font-[family-name:var(--font-display)] text-5xl leading-none text-[#A78BFA]/70"
                >
                  &ldquo;
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#7C3AED]/50 to-[#3B82F6]/40 text-[13px] font-semibold text-white">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">{t.name}</div>
                    <div className="truncate text-[12px] text-white/50">{t.role}</div>
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
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#1a0b33] via-[#07070B] to-[#0b1a33] p-12 text-center lg:p-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-dot mask-fade-radial opacity-40"
          />
          <GradientOrb color="violet" size={420} className="-left-10 -top-10 opacity-80" />
          <GradientOrb color="blue" size={420} className="-right-10 -bottom-10 opacity-70" />
          <Reveal>
            <Badge icon={<Mail size={13} />}>14-day free trial · no credit card</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Ready to transform your{" "}
              <span className="text-gradient-brand">sponsorship management?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-white/60">
              Join the clubs, leagues and federations turning every match into
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
