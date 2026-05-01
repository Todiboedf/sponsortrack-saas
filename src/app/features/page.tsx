import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Camera,
  Check,
  Cpu,
  Database,
  FileBadge,
  Globe2,
  LineChart,
  Mail,
  Radar,
  Shield,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "Features — The sponsor intelligence stack",
  description:
    "Social analytics, match-day computer vision, ROI reporting and a prospection engine — all in one sponsor intelligence platform.",
};

const pillars = [
  {
    icon: <BarChart3 size={22} />,
    tag: "Analytics",
    title: "Social analytics, unified",
    body: "Every post, every story, every reel — across Instagram, TikTok, X, YouTube, Facebook and LinkedIn. Automatically attributed to the sponsors who appear in it.",
    bullets: [
      "Automatic sponsor detection from captions, hashtags and visuals",
      "Deduplicated cross-platform reach with confidence scores",
      "Organic vs paid vs owned vs earned — properly split",
      "Time-zone aware daily, weekly and season aggregations",
    ],
    plan: ["Starter", "Pro", "Enterprise"],
  },
  {
    icon: <Users size={22} />,
    tag: "Sponsor Portal",
    title: "Branded sponsor dashboards",
    body: "Give each sponsor a workspace that looks like their own product. White-labelled, real-time, and the only place they’ll ever need to ask for their numbers again.",
    bullets: [
      "Per-sponsor logos, palette, typography and vocabulary",
      "Invite limited external users with read-only permissions",
      "In-app PDF export and scheduled email reports",
      "Benchmark widgets vs comparable sponsors (anonymised)",
    ],
    plan: ["Pro", "Enterprise"],
  },
  {
    icon: <LineChart size={22} />,
    tag: "ROI",
    title: "ROI calculator that holds up in a boardroom",
    body: "EMV (Earned Media Value), Media Value Equivalency, CPM benchmarks, and sponsor-specific formulas your CFO can trust — not vendor-flavoured magic numbers.",
    bullets: [
      "Configurable EMV model (MVE / QMVE / custom)",
      "Third-party rate cards for 60+ markets",
      "Scenario modelling for renewals and upsells",
      "Exportable methodology appendix for audits",
    ],
    plan: ["Starter", "Pro", "Enterprise"],
  },
  {
    icon: <Camera size={22} />,
    tag: "Match day",
    title: "Computer vision for match-day assets",
    body: "Our in-house model watches the broadcast feed — live or recorded — and measures the exact seconds of visibility for every jersey, LED rotation, interview backdrop and pitch-side board.",
    bullets: [
      "Live logo detection with broadcast quality scoring",
      "LED rotation optimisation and inventory pricing",
      "Per-camera angle and per-broadcaster breakdown",
      "GDPR-safe: no face identification, ever",
    ],
    plan: ["Pro", "Enterprise"],
  },
  {
    icon: <Radar size={22} />,
    tag: "Prospection",
    title: "Prospection engine",
    body: "Find the brands most likely to sponsor you — based on what they already sponsor, who their audience is, and where your club fits their media mix.",
    bullets: [
      "10M+ company database with sponsorship signals",
      "Fit score per brand × property × region",
      "AI-drafted outreach in your commercial team's voice",
      "CRM-ready — HubSpot, Salesforce, Pipedrive, Notion",
    ],
    plan: ["Pro", "Enterprise"],
  },
  {
    icon: <Workflow size={22} />,
    tag: "Workflow",
    title: "Alerts, automations, API",
    body: "Don’t open the dashboard to know what happened — let the platform tell you. Every trigger you’d want, in the tool you already use.",
    bullets: [
      "Slack, Teams and email alerts on spikes and dips",
      "Webhooks on every event, signed payloads",
      "Read & write REST API + typed SDKs",
      "Zapier, n8n and Make integrations",
    ],
    plan: ["Pro", "Enterprise"],
  },
];

const perks = [
  {
    icon: <Shield size={18} />,
    title: "Enterprise-grade security",
    body: "SSO via SAML / OIDC, SCIM, fine-grained RBAC. SOC 2 Type II in progress, EU data residency.",
  },
  {
    icon: <Globe2 size={18} />,
    title: "Global out of the box",
    body: "Multi-currency, multi-language UI (EN/FR/ES/PT/DE/IT), 180+ market rate cards.",
  },
  {
    icon: <Cpu size={18} />,
    title: "Built for scale",
    body: "Handles multi-club groups with 10k+ sponsors, 50k+ assets and 100M+ rows of engagement.",
  },
  {
    icon: <Database size={18} />,
    title: "Your data stays yours",
    body: "Export everything, anytime. Raw CSV, Parquet, warehouse sync. No lock-in clauses.",
  },
  {
    icon: <Bell size={18} />,
    title: "Humans on-call",
    body: "Dedicated customer success, priority response SLAs and an on-staff sports analyst team.",
  },
  {
    icon: <FileBadge size={18} />,
    title: "Rights & contracts",
    body: "Track deliverables, expiry, renewal windows and compliance in a single calendar view.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <PillarsSection />
      <ComparisonSection />
      <PerksSection />
      <CtaSection />
    </>
  );
}

function FeaturesHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
      <GradientOrb color="red" size={560} className="-left-40 -top-10" />
      <GradientOrb color="gold" size={520} className="-right-32 top-40" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Badge icon={<Sparkles size={13} />}>Features</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[72px]">
              The entire sponsor stack.{" "}
              <span className="text-gradient-brand">One platform.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-white/60 sm:text-xl">
              From a viral TikTok to a 90-minute broadcast, every sponsor exposure
              is captured, priced, and turned into actionable intelligence.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                Start free trial
              </Button>
              <Button href="/demo" size="lg" variant="secondary">
                Open live demo
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.05}>
              <Card className="p-0">
                <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="flex flex-col justify-between gap-8 p-8 lg:p-10 border-b border-white/[0.06] lg:border-b-0 lg:border-r">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED]/30 to-[#3B82F6]/20 text-white ring-1 ring-white/10">
                          {p.icon}
                        </span>
                        <Badge className="text-[11px] uppercase tracking-[0.18em]">
                          {p.tag}
                        </Badge>
                      </div>
                      <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                        {p.body}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                        Available on
                      </span>
                      {p.plan.map((pl) => (
                        <span
                          key={pl}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/75"
                        >
                          {pl}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 lg:p-10">
                    <ul className="grid gap-3">
                      {p.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-[15px] text-white/75"
                        >
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 ring-1 ring-[#7C3AED]/40">
                            <Check size={13} className="text-[#C4B5FD]" />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {i === 0 && (
                      <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-[13px] text-white/55">
                        <span className="text-white/80">Pro tip — </span>
                        enable sponsor-weighted EMV to reflect contract value in your
                        aggregated reach charts.
                      </div>
                    )}
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

const comparison = [
  ["Cross-platform social analytics", true, true, true, true],
  ["Branded sponsor portals", false, true, true, true],
  ["Match-day computer vision", false, false, true, true],
  ["Prospection engine with AI outreach", false, false, true, true],
  ["Custom data pipelines & warehouse sync", false, false, false, true],
  ["Dedicated success manager", false, false, true, true],
  ["SSO / SAML / SCIM", false, false, true, true],
];

function ComparisonSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="How we compare"
          eyebrowIcon={<Target size={13} />}
          title={
            <>
              A product-led alternative to{" "}
              <span className="text-gradient-brand">legacy vendors.</span>
            </>
          }
          description="The entries below reflect our own assessment as of this quarter and are provided as a comparative reference."
        />
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08]">
            <table className="w-full border-collapse text-left">
              <thead className="bg-white/[0.02]">
                <tr>
                  <th className="px-5 py-4 text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">
                    Capability
                  </th>
                  <th className="px-4 py-4 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">
                    Spreadsheet
                  </th>
                  <th className="px-4 py-4 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">
                    Legacy A
                  </th>
                  <th className="px-4 py-4 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">
                    Legacy B
                  </th>
                  <th className="bg-gradient-to-b from-[#7C3AED]/20 to-[#3B82F6]/10 px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
                    SponsorTrack
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, ...cells], idx) => (
                  <tr
                    key={label as string}
                    className={`border-t border-white/[0.05] ${
                      idx % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
                    }`}
                  >
                    <td className="px-5 py-4 text-[14px] text-white/80">
                      {label as string}
                    </td>
                    {(cells as boolean[]).map((ok, i) => (
                      <td
                        key={i}
                        className={`px-4 py-4 text-center ${
                          i === 3 ? "bg-white/[0.02]" : ""
                        }`}
                      >
                        {ok ? (
                          <Check size={18} className="mx-auto text-emerald-400" />
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PerksSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Everything else you’d expect"
          eyebrowIcon={<Zap size={13} />}
          title="Built for serious operations."
          description="Security, scale, performance, and a team that answers the phone. The un-sexy parts — done properly."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <Card className="h-full p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] text-white/80 ring-1 ring-white/10">
                  {p.icon}
                </div>
                <h4 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-white">
                  {p.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
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

function CtaSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#120822] via-[#07070B] to-[#081226] p-12 text-center lg:p-16">
          <GradientOrb color="red" size={380} className="-left-10 -top-10 opacity-70" />
          <GradientOrb color="gold" size={380} className="-right-10 -bottom-10 opacity-60" />
          <Badge icon={<Mail size={13} />}>Ready when you are</Badge>
          <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
            See every feature live in under 30 minutes.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-white/60">
            Our team will walk you through the platform, map it to your current
            workflow, and hand you a 14-day trial on the spot.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
              Book a demo
            </Button>
            <Button href="/pricing" size="lg" variant="outline">
              View pricing
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

