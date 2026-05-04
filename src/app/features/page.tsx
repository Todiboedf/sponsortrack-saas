import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  FileBadge,
  Lock,
  Mail,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "Features · The sponsor intelligence stack",
  description:
    "Cross-platform analytics, match-day computer vision, branded sponsor portals, an AI-powered prospection engine, white-label reporting, and production-grade security. One platform.",
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */
function FeaturesHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
      <GradientOrb color="red" size={560} className="-left-40 -top-10" />
      <GradientOrb color="gold" size={520} className="-right-32 top-40" intensity="soft" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Badge tone="gold" icon={<Sparkles size={12} />}>
              Features
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-medium leading-[1.04] tracking-[-0.01em] text-[#F4EFE6] sm:text-6xl lg:text-[76px]">
              The entire sponsor stack.{" "}
              <em className="italic font-medium text-gradient-brand">
                One platform.
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
              From a viral TikTok to a 90-minute broadcast, every sponsor
              exposure is captured, priced, and turned into actionable
              intelligence.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                Start free trial
              </Button>
              <Button href="/demo" size="lg" variant="outline">
                Open live demo
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Six pillars                                                                */
/* -------------------------------------------------------------------------- */
type Pillar = {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  plan: string[];
  icon: React.ReactNode;
  Mockup: () => React.ReactNode;
};

const pillars: Pillar[] = [
  {
    tag: "Analytics",
    title: "Cross-platform analytics",
    body: "Every post, every story, every reel. Instagram, TikTok, X, YouTube, Facebook and LinkedIn. Automatically attributed to the sponsors who appear in it.",
    bullets: [
      "Automatic sponsor detection from captions, hashtags and visuals",
      "Deduplicated cross-platform reach with confidence scores",
      "Organic vs paid vs owned vs earned, properly split",
      "Time-zone aware daily, weekly and season aggregations",
    ],
    plan: ["Starter", "Pro", "Enterprise"],
    icon: <BarChart3 size={20} />,
    Mockup: AnalyticsMockup,
  },
  {
    tag: "Match day",
    title: "Match-day computer vision",
    body: "An in-house model watches the broadcast feed (live or recorded) and measures the exact seconds of visibility for every jersey, LED rotation, interview backdrop and pitch-side board.",
    bullets: [
      "Live logo detection with broadcast-quality scoring",
      "LED rotation optimisation and inventory pricing",
      "Per-camera angle and per-broadcaster breakdown",
      "GDPR-safe: no face identification, ever",
    ],
    plan: ["Pro", "Enterprise"],
    icon: <Camera size={20} />,
    Mockup: BroadcastMockup,
  },
  {
    tag: "Sponsor Portal",
    title: "Branded sponsor portals",
    body: "Give each sponsor a workspace that looks like their own product. White-labelled, real-time, and the only place they’ll ever need to ask for their numbers again.",
    bullets: [
      "Per-sponsor logos, palette, typography and vocabulary",
      "Invite limited external users with read-only permissions",
      "In-app PDF export and scheduled email reports",
      "Benchmark widgets vs comparable sponsors (anonymised)",
    ],
    plan: ["Pro", "Enterprise"],
    icon: <Users size={20} />,
    Mockup: PortalMockup,
  },
  {
    tag: "Prospection",
    title: "Prospection engine + AI outreach",
    body: "Find the brands most likely to sponsor you, based on what they already sponsor, who their audience is, and where your club fits their media mix.",
    bullets: [
      "10M+ company database with sponsorship signals",
      "Fit score per brand × property × region",
      "AI-drafted outreach in your commercial team's voice",
      "CRM-ready: HubSpot, Salesforce, Pipedrive, Notion",
    ],
    plan: ["Pro", "Enterprise"],
    icon: <Radar size={20} />,
    Mockup: ProspectionMockup,
  },
  {
    tag: "Reporting",
    title: "White-label reporting",
    body: "Beautiful, defensible PDFs in your sponsor’s brand, generated automatically every Monday. The same engine powers in-app reports, email digests and CSV exports.",
    bullets: [
      "Branded templates with logo, palette and typography",
      "Methodology appendix that satisfies finance teams",
      "Auto-scheduled email + PDF + Slack delivery",
      "Versioned exports: every monthly recap is auditable",
    ],
    plan: ["Pro", "Enterprise"],
    icon: <FileBadge size={20} />,
    Mockup: ReportingMockup,
  },
  {
    tag: "Security",
    title: "Security & compliance",
    body: "The boring parts done properly. SSO, SCIM, fine-grained RBAC, EU data residency by default, and a SOC 2 Type II audit in progress, so procurement isn’t the slow lane.",
    bullets: [
      "SAML / OIDC SSO and SCIM provisioning",
      "Role-based access at workspace, sponsor and report level",
      "EU-hosted by default · custom region on Enterprise",
      "DPA, MSA and security questionnaire on request",
    ],
    plan: ["Pro", "Enterprise"],
    icon: <ShieldCheck size={20} />,
    Mockup: SecurityMockup,
  },
];

function PillarsSection() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.05}>
              <Card className="p-0">
                <div
                  className={`grid gap-0 lg:grid-cols-[0.95fr_1.05fr] ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Copy */}
                  <div className="flex flex-col justify-between gap-8 p-8 lg:p-10 border-b border-[#F4EFE6]/[0.06] lg:border-b-0 lg:border-r">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#B8975A]/35 bg-[#B8975A]/[0.08] text-[#B8975A]">
                          {p.icon}
                        </span>
                        <Badge tone="default" className="text-[11px]">
                          {p.tag}
                        </Badge>
                      </div>
                      <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#F4EFE6] sm:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                        {p.body}
                      </p>
                    </div>
                    <ul className="grid gap-2.5">
                      {p.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-[14px] text-[#F4EFE6]/80"
                        >
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B8975A]/15 ring-1 ring-[#B8975A]/40">
                            <Check size={11} className="text-[#B8975A]" />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/40">
                        Available on
                      </span>
                      {p.plan.map((pl) => (
                        <span
                          key={pl}
                          className="rounded-full border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.03] px-2.5 py-1 text-[11px] text-[#F4EFE6]/75"
                        >
                          {pl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mockup */}
                  <div className="relative flex items-center justify-center bg-[#0A1628]/85 p-6 lg:p-10">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]"
                    />
                    <p.Mockup />
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
/* Comparison vs legacy / spreadsheet (cream)                                 */
/* -------------------------------------------------------------------------- */
const comparison: [string, boolean, boolean, boolean, boolean][] = [
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
    <section className="bg-[#F4EFE6] py-20 text-[#0F1A2E] lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="cream" icon={<Target size={12} />}>
            How it compares
          </Badge>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] sm:text-5xl">
            A product-led alternative to{" "}
            <em className="italic text-[#8B0028]">legacy vendors.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#0F1A2E]/65">
            Self-assessed and honestly opinionated. Happy to revisit any line
            with anyone who knows the space.
          </p>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0F1A2E]/12 bg-[#FBF7EF]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-[#0F1A2E]/[0.04]">
                  <tr>
                    <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                      Capability
                    </th>
                    <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                      Spreadsheet
                    </th>
                    <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                      Legacy A
                    </th>
                    <th className="px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                      Legacy B
                    </th>
                    <th className="bg-[#8B0028]/[0.06] px-4 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F1A2E]">
                      SponsorTrack
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([label, ...cells], idx) => (
                    <tr
                      key={label}
                      className={`border-t border-[#0F1A2E]/[0.07] ${
                        idx % 2 === 0 ? "bg-[#0F1A2E]/[0.02]" : "bg-transparent"
                      }`}
                    >
                      <td className="px-5 py-4 text-[14px] text-[#0F1A2E]/85">
                        {label}
                      </td>
                      {cells.map((ok, i) => (
                        <td
                          key={i}
                          className={`px-4 py-4 text-center ${
                            i === 3 ? "bg-[#8B0028]/[0.04]" : ""
                          }`}
                        >
                          {ok ? (
                            <Check size={18} className="mx-auto text-[#8B0028]" />
                          ) : (
                            <span className="text-[#0F1A2E]/30">–</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
/* -------------------------------------------------------------------------- */
function CtaSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-[#B8975A]/30 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-12 text-center lg:p-16">
          <GradientOrb color="red" size={380} className="-left-10 -top-10" intensity="soft" />
          <GradientOrb color="gold" size={380} className="-right-10 -bottom-10" intensity="soft" />
          <Badge tone="gold" icon={<Mail size={12} />}>
            Ready when you are
          </Badge>
          <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
            See every feature live in{" "}
            <em className="italic text-gradient-brand">under 30 minutes.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[#F4EFE6]/65">
            I’ll walk you through the platform, map it to your current
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

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <PillarsSection />
      <ComparisonSection />
      <CtaSection />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Mockups                                                                    */
/* -------------------------------------------------------------------------- */

function AnalyticsMockup() {
  const platforms = [
    { name: "Instagram", value: "148.2M", color: "#B8975A", w: "92%" },
    { name: "TikTok", value: "92.7M", color: "#8B0028", w: "78%" },
    { name: "YouTube", value: "5.8M h", color: "#2F8F5A", w: "62%" },
    { name: "X / Twitter", value: "41.3M", color: "#F4EFE6", w: "44%" },
    { name: "Facebook", value: "12.9M", color: "#6B7480", w: "26%" },
  ];
  return (
    <div className="w-full max-w-md rounded-xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E] p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
            Sponsor · Caja Rural
          </div>
          <div className="font-[family-name:var(--font-display)] text-base font-semibold text-[#F4EFE6]">
            Cross-platform reach
          </div>
        </div>
        <span className="rounded-full border border-[#2F8F5A]/30 bg-[#2F8F5A]/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#86C9A4]">
          Live
        </span>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {platforms.map((p) => (
          <li key={p.name}>
            <div className="mb-1 flex items-center justify-between text-[12px]">
              <span className="text-[#F4EFE6]/75">{p.name}</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]/85">
                {p.value}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#F4EFE6]/[0.06]">
              <div
                style={{
                  width: p.w,
                  background: `linear-gradient(90deg, ${p.color}, ${p.color}66)`,
                }}
                className="h-full rounded-full"
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#F4EFE6]/[0.06] pt-4">
        <Mini label="EMV" value="€3.2M" delta="+18%" />
        <Mini label="Engage." value="842k" delta="+26%" />
        <Mini label="Followers" value="+128k" delta="+9%" />
      </div>
    </div>
  );
}

function BroadcastMockup() {
  return (
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-xl border border-[#F4EFE6]/[0.08] bg-gradient-to-b from-[#0F1A2E] to-[#060D18] aspect-[16/9]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(31,122,82,0.45)_0%,transparent_60%)]" />
        <svg
          viewBox="0 0 320 180"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <line x1="0" y1="120" x2="320" y2="120" stroke="rgba(244,239,230,0.15)" />
          <ellipse cx="160" cy="120" rx="40" ry="14" stroke="rgba(244,239,230,0.18)" fill="none" />
          <rect
            x="40"
            y="98"
            width="240"
            height="14"
            fill="rgba(184,151,90,0.18)"
            stroke="rgba(184,151,90,0.55)"
          />
          <text
            x="160"
            y="108"
            fontSize="8"
            fill="#F4EFE6"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontStyle="italic"
          >
            Caja Rural · Macron · Digi
          </text>
        </svg>
        <div className="absolute left-[14%] top-[54%] h-[8%] w-[18%] border-2 border-[#8B0028] shadow-[0_0_0_1px_rgba(244,239,230,0.4)]">
          <span className="absolute -top-5 left-0 rounded bg-[#8B0028] px-1 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#F4EFE6]">
            Caja Rural · 0.96
          </span>
        </div>
        <div className="absolute left-[44%] top-[54%] h-[8%] w-[14%] border-2 border-[#8B0028]">
          <span className="absolute -top-5 left-0 rounded bg-[#8B0028] px-1 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#F4EFE6]">
            Macron · 0.92
          </span>
        </div>
        <div className="absolute right-[14%] top-[54%] h-[8%] w-[12%] border-2 border-[#B8975A]">
          <span className="absolute -top-5 right-0 rounded bg-[#B8975A] px-1 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#0A1628]">
            Digi · 0.74
          </span>
        </div>
        <div className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#F4EFE6]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B0028] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8B0028]" />
          </span>
          Live · El Sadar
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-md bg-[#0A1628]/80 px-2 py-1 text-[10px] text-[#F4EFE6]">
          <ScanLine size={11} className="text-[#B8975A]" />
          <span className="font-[family-name:var(--font-mono)] tabular-nums">
            32 fps · 18 logos / s
          </span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        {[
          ["Caja Rural", "26:14"],
          ["Macron", "18:42"],
          ["Digi", "11:08"],
        ].map(([n, t]) => (
          <div
            key={n}
            className="rounded-md border border-[#F4EFE6]/[0.08] bg-[#0F1A2E] px-2 py-2"
          >
            <div className="text-[#F4EFE6]/60">{n}</div>
            <div className="font-[family-name:var(--font-mono)] tabular-nums text-[#B8975A]">
              {t}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalMockup() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 overflow-hidden rounded-xl border border-[#F4EFE6]/[0.08]">
      <div className="bg-[#0F1A2E] p-4">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
          Club view
        </div>
        <div className="mt-2 font-[family-name:var(--font-display)] text-sm font-semibold text-[#F4EFE6]">
          CA Osasuna · all sponsors
        </div>
        <ul className="mt-3 space-y-1.5 text-[11px]">
          {[
            ["Caja Rural", "92%"],
            ["Macron", "78%"],
            ["Digi", "64%"],
          ].map(([n, v]) => (
            <li key={n} className="flex items-center justify-between">
              <span className="text-[#F4EFE6]/75">{n}</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]/85">
                {v}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#FBF7EF] p-4 text-[#0F1A2E]">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[#8B0028]">
          Sponsor view
        </div>
        <div className="mt-2 font-[family-name:var(--font-display)] text-sm font-semibold">
          Caja Rural · Q2
        </div>
        <div className="mt-3 rounded-md border border-[#0F1A2E]/10 bg-white p-2.5 text-[11px]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#0F1A2E]/55">
            EMV · 30d
          </div>
          <div className="font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
            €1.84M
          </div>
          <div className="text-[#1F7A52]">+24%</div>
        </div>
        <div className="mt-2 rounded-md border border-[#0F1A2E]/10 bg-white p-2.5 text-[11px]">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#0F1A2E]/55">
            Logo seconds
          </div>
          <div className="font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
            26:14
          </div>
        </div>
      </div>
    </div>
  );
}

function ProspectionMockup() {
  const rows = [
    { brand: "Iberia", region: "ES", fit: 94 },
    { brand: "Banco BPI", region: "PT", fit: 88 },
    { brand: "BBVA", region: "ES", fit: 82 },
    { brand: "Vueling", region: "ES / IT", fit: 76 },
  ];
  return (
    <div className="w-full max-w-md rounded-xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E] p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
            Prospects · top fit
          </div>
          <div className="font-[family-name:var(--font-display)] text-base font-semibold text-[#F4EFE6]">
            For CA Osasuna · LaLiga
          </div>
        </div>
        <Radar size={14} className="text-[#B8975A]" />
      </div>
      <ul className="mt-5 flex flex-col gap-2.5">
        {rows.map((r) => (
          <li
            key={r.brand}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg border border-[#F4EFE6]/[0.06] bg-[#0A1628]/60 p-2.5 text-[12px]"
          >
            <div>
              <div className="font-medium text-[#F4EFE6]">{r.brand}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/45">
                {r.region}
              </div>
            </div>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#F4EFE6]/[0.06]">
              <div
                style={{ width: `${r.fit}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#8B0028] to-[#B8975A]"
              />
            </div>
            <div className="font-[family-name:var(--font-mono)] tabular-nums text-[#B8975A]">
              {r.fit}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-lg border border-[#B8975A]/30 bg-[#B8975A]/[0.08] p-3 text-[11px] leading-relaxed text-[#F4EFE6]/75">
        <span className="font-semibold text-[#F4EFE6]">AI draft:</span>{" "}
        “Hola Iberia team, we noticed your Madrid–Iruña route lands 14 minutes
        from El Sadar; here’s the audience overlap…”
      </div>
    </div>
  );
}

function ReportingMockup() {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative rounded-lg border border-[#0F1A2E]/15 bg-[#FBF7EF] p-5 text-[#0F1A2E] shadow-[0_30px_70px_-30px_rgba(184,151,90,0.45)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#8B0028]">
              Caja Rural · Q2 2026
            </div>
            <div className="font-[family-name:var(--font-display)] text-lg font-semibold">
              Sponsorship report
            </div>
          </div>
          <div className="font-[family-name:var(--font-display)] italic text-[11px] text-[#0F1A2E]/55">
            CA Osasuna
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <ReportCell label="EMV" value="€5.84M" />
          <ReportCell label="Logo / match" value="94k" />
          <ReportCell label="Reach" value="284M" />
        </div>
        <div className="mt-4 h-2 rounded-full bg-[#0F1A2E]/10">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#8B0028] to-[#B8975A]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#0F1A2E]/55">
          <span>Goal · €8M</span>
          <span className="font-[family-name:var(--font-mono)] tabular-nums">72%</span>
        </div>
        <div className="mt-4 rounded-md border border-[#0F1A2E]/10 bg-white p-3 text-[11px] leading-relaxed text-[#0F1A2E]/65">
          The Caja Rural jersey crest hit{" "}
          <span className="font-semibold text-[#0F1A2E]">14 broadcasts</span>{" "}
          this quarter at €0.62 CPM, 38% below market.
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/45">
          <span>Methodology · MVE 3.1</span>
          <span>Page 1 / 12</span>
        </div>
      </div>
    </div>
  );
}

function ReportCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#0F1A2E]/10 bg-white p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/55">
        {label}
      </div>
      <div className="mt-1 font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
        {value}
      </div>
    </div>
  );
}

function SecurityMockup() {
  const certs = [
    { label: "SOC 2 Type II", sub: "Audit in progress", icon: <ShieldCheck size={16} /> },
    { label: "GDPR + DPA", sub: "EU data residency", icon: <FileBadge size={16} /> },
    { label: "SSO · SAML / OIDC", sub: "Workspace-wide", icon: <Lock size={16} /> },
    { label: "RBAC + audit logs", sub: "Per-sponsor scope", icon: <Zap size={16} /> },
  ];
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3">
      {certs.map((c) => (
        <div
          key={c.label}
          className="rounded-lg border border-[#F4EFE6]/[0.08] bg-[#0F1A2E] p-4"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A]">
            {c.icon}
          </span>
          <div className="mt-3 font-[family-name:var(--font-display)] text-sm font-semibold text-[#F4EFE6]">
            {c.label}
          </div>
          <div className="mt-1 text-[11px] text-[#F4EFE6]/55">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

function Mini({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/40">
        {label}
      </div>
      <div className="mt-1 font-[family-name:var(--font-mono)] text-sm font-semibold tabular-nums text-[#F4EFE6]">
        {value}
      </div>
      <div className="text-[10px] text-[#86C9A4]">{delta}</div>
    </div>
  );
}
