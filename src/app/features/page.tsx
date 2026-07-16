import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chyron } from "@/components/ui/Chyron";
import { HudFrame } from "@/components/ui/HudFrame";
import { FeatureBadge, type FeatureStatus } from "@/components/ui/FeatureBadge";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Features: the sponsor stack, labelled honestly",
  description:
    "Instagram + TikTok analytics live today. Broadcast computer vision in development. Portals, prospection and enterprise security on the roadmap. Every feature carries its label.",
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */
function FeaturesHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#F4EFE6]/[0.06] bg-[#050B14] pt-28 pb-14 lg:pt-36 lg:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-50" />
      <Container className="relative">
        <div className="max-w-3xl">
          <Chyron>Features · every bullet carries its label</Chyron>
          <h1 className="mt-6 font-[family-name:var(--font-archivo)] text-balance text-[44px] font-bold leading-[1.02] tracking-[-0.025em] text-[#F4EFE6] sm:text-6xl lg:text-[64px]">
            The sponsor stack, labelled honestly.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
            Instagram and TikTok run today — 283 posts measured in our public
            study. Broadcast computer vision reads recorded footage, in
            development. Every bullet below says which is which.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/demo" size="lg" rightIcon={<ArrowRight size={16} />}>
              Open the live demo
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Start free trial
            </Button>
          </div>
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
  bullets: Array<{ text: string; status?: FeatureStatus }>;
  plan: string[];
  Mockup: () => React.ReactNode;
};

const pillars: Pillar[] = [
  {
    tag: "Analytics",
    title: "Cross-platform analytics",
    body: "Every post, every story, every reel, Instagram, TikTok, X, YouTube, Facebook and LinkedIn. Automatically attributed to the sponsors who appear in it.",
    bullets: [
      { text: "Automatic sponsor detection from captions and hashtags", status: "live" },
      { text: "Sponsored vs organic performance split", status: "live" },
      { text: "Daily and weekly aggregations, time-zone aware", status: "live" },
      { text: "Deduplicated cross-platform reach with confidence scores", status: "planned" },
    ],
    plan: ["Starter", "Pro", "Enterprise"],
    Mockup: AnalyticsMockup,
  },
  {
    tag: "Match day",
    title: "Match-day computer vision",
    body: "An in-house model that measures the exact seconds of visibility for every jersey, LED rotation, interview backdrop and pitch-side board, on recorded footage first and broadcast next. In active development.",
    bullets: [
      { text: "Logo detection with broadcast-quality scoring", status: "dev" },
      { text: "LED rotation optimisation and inventory pricing", status: "dev" },
      { text: "Per-camera angle and per-broadcaster breakdown", status: "dev" },
      { text: "GDPR-safe: no face identification, ever", status: "dev" },
    ],
    plan: ["Enterprise"],
    Mockup: BroadcastMockup,
  },
  {
    tag: "Sponsor portal",
    title: "Branded sponsor portals",
    body: "Give each sponsor a workspace that looks like their own product. White-labelled, refreshed daily, and the only place they'll ever need to ask for their numbers again.",
    bullets: [
      { text: "Per-sponsor logos, palette, typography and vocabulary", status: "planned" },
      { text: "Invite limited external users with read-only permissions", status: "planned" },
      { text: "In-app PDF export and scheduled email reports", status: "planned" },
      { text: "Benchmark widgets vs comparable sponsors (anonymised)", status: "planned" },
    ],
    plan: ["Pro", "Enterprise"],
    Mockup: PortalMockup,
  },
  {
    tag: "Prospection",
    title: "Prospection engine + AI outreach",
    body: "Find the brands most likely to sponsor you, based on what they already sponsor, who their audience is, and where your club fits their media mix.",
    bullets: [
      { text: "Company database with sponsorship signals", status: "planned" },
      { text: "Fit score per brand × property × region", status: "planned" },
      { text: "AI-drafted outreach in your commercial team's voice", status: "planned" },
      { text: "CRM-ready, HubSpot, Salesforce, Pipedrive, Notion", status: "planned" },
    ],
    plan: ["Pro", "Enterprise"],
    Mockup: ProspectionMockup,
  },
  {
    tag: "Reporting",
    title: "White-label reporting",
    body: "Beautiful, defensible PDFs in your sponsor's brand, generated automatically every Monday. The same engine powers in-app reports, email digests and CSV exports.",
    bullets: [
      { text: "Branded templates with logo, palette and typography", status: "live" },
      { text: "Methodology appendix that satisfies finance teams", status: "planned" },
      { text: "Auto-scheduled email + PDF + Slack delivery", status: "planned" },
      { text: "Versioned exports, every monthly recap is auditable", status: "planned" },
    ],
    plan: ["Pro", "Enterprise"],
    Mockup: ReportingMockup,
  },
  {
    tag: "Security",
    title: "Security & compliance",
    body: "The boring parts done properly. SSO, SCIM, fine-grained RBAC, EU data residency by default, and a SOC 2 Type II audit planned, so procurement isn't the slow lane.",
    bullets: [
      { text: "EU-hosted by default", status: "live" },
      { text: "SAML / OIDC SSO and SCIM provisioning", status: "planned" },
      { text: "Role-based access at workspace, sponsor and report level", status: "planned" },
      { text: "DPA, MSA and security questionnaire on request" },
    ],
    plan: ["Pro", "Enterprise"],
    Mockup: SecurityMockup,
  },
];

function PillarsSection() {
  return (
    <section className="py-14 lg:py-20">
      <Container>
        <div className="flex flex-col gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.04}>
              <div className="lock-on rounded-lg border border-[#F4EFE6]/[0.09] bg-[#0E1D33]/70">
                <div
                  className={`grid gap-0 lg:grid-cols-[0.95fr_1.05fr] ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Copy */}
                  <div className="flex flex-col justify-between gap-8 border-b border-[#F4EFE6]/[0.06] p-8 lg:border-b-0 lg:border-r lg:p-10">
                    <div>
                      <Chyron rule={false}>{p.tag}</Chyron>
                      <h2 className="mt-5 font-[family-name:var(--font-archivo)] text-2xl font-bold tracking-tight text-[#F4EFE6] sm:text-3xl">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                        {p.body}
                      </p>
                    </div>
                    <ul className="grid gap-2.5">
                      {p.bullets.map((b) => (
                        <li
                          key={b.text}
                          className="flex items-start gap-2.5 text-[14px] text-[#F4EFE6]/80"
                        >
                          <Check size={14} className="mt-0.5 shrink-0 text-[#D8FF3E]" />
                          <span>
                            {b.text}
                            {b.status && (
                              <FeatureBadge status={b.status} className="ml-2" />
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)]">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/40">
                        Available on
                      </span>
                      {p.plan.map((pl) => (
                        <span
                          key={pl}
                          className="border border-[#F4EFE6]/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-[#F4EFE6]/70"
                        >
                          {pl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Artifact */}
                  <div className="relative flex items-center justify-center bg-[#0A1628]/85 p-6 lg:p-10">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-grid opacity-[0.5]"
                    />
                    <div className="relative w-full max-w-md">
                      <p.Mockup />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Comparison vs legacy / spreadsheet (report paper)                          */
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
    <section className="surface-paper py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <Chyron tone="ink">How we compare</Chyron>
          <h2 className="mt-5 font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-[42px]">
            A product-led alternative to legacy vendors.
          </h2>
          <p className="mt-4 max-w-xl text-[#0F1A2E]/65">
            Self-assessed and honestly opinionated, happy to revisit any line
            with anyone who knows the space.
          </p>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-lg border border-[#0F1A2E]/12 bg-[#FBF7EF]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-[#0F1A2E]/[0.04]">
                  <tr>
                    <th className="px-5 py-4 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F1A2E]/55">
                      Capability
                    </th>
                    <th className="px-4 py-4 text-center font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F1A2E]/55">
                      Spreadsheet
                    </th>
                    <th className="px-4 py-4 text-center font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F1A2E]/55">
                      Legacy A
                    </th>
                    <th className="px-4 py-4 text-center font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F1A2E]/55">
                      Legacy B
                    </th>
                    <th className="bg-[#0F1A2E] px-4 py-4 text-center font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F4EFE6]">
                      Sponsorlens
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
                            i === 3 ? "bg-[#0F1A2E]/[0.04]" : ""
                          }`}
                        >
                          {ok ? (
                            <Check size={18} className="mx-auto text-[#0F1A2E]" />
                          ) : (
                            <span className="text-[#0F1A2E]/30">-</span>
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
    <section className="bg-[#050B14] py-16 lg:py-20">
      <Container>
        <Reveal>
          <HudFrame
            label="Ready when you are"
            className="mx-auto max-w-4xl bg-[#0A1628]"
          >
            <div className="px-8 py-12 text-center lg:px-16 lg:py-14">
              <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-[#F4EFE6] sm:text-[42px]">
                See the live data, then decide.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[#F4EFE6]/65">
                The demo is public and runs on the Osasuna study. Want a
                walkthrough? You talk to the founder. The 14-day trial starts
                whenever you&apos;re ready.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/demo" size="lg" rightIcon={<ArrowRight size={16} />}>
                  Open the live demo
                </Button>
                <Button href="/contact" size="lg" variant="outline">
                  Talk to the founder
                </Button>
              </div>
            </div>
          </HudFrame>
        </Reveal>
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
/* Artifacts — real study data wherever a number appears                      */
/* -------------------------------------------------------------------------- */

function MonoPanelHeader({ kicker, title, chip }: { kicker: string; title: string; chip?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/45">
          {kicker}
        </div>
        <div className="mt-1 font-[family-name:var(--font-archivo)] text-base font-semibold text-[#F4EFE6]">
          {title}
        </div>
      </div>
      {chip}
    </div>
  );
}

function AnalyticsMockup() {
  // Real numbers from the public CA Osasuna study (June 2026).
  const platforms = [
    { name: "TikTok", value: "5.8M", w: "93%", volt: true },
    { name: "Instagram", value: "415k", w: "7%", volt: false },
  ];
  const inDev = ["X / Twitter", "YouTube", "Facebook"];
  return (
    <HudFrame label="Live · club accounts" className="bg-[#0E1D33] p-5">
      <MonoPanelHeader
        kicker="CA Osasuna · study"
        title="Followers by platform"
      />
      <ul className="mt-5 flex flex-col gap-3">
        {platforms.map((p) => (
          <li key={p.name}>
            <div className="mb-1 flex items-center justify-between text-[12px]">
              <span className="text-[#F4EFE6]/75">{p.name}</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]/85">
                {p.value}
              </span>
            </div>
            <div className="h-1.5 bg-[#F4EFE6]/[0.06]">
              <div
                style={{ width: p.w }}
                className={`h-full ${p.volt ? "bg-[#D8FF3E]" : "bg-[#F4EFE6]/60"}`}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {inDev.map((n) => (
          <li key={n} className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[#F4EFE6]/40">
            {n} · in dev
          </li>
        ))}
      </ul>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#F4EFE6]/[0.06] pt-4">
        <Mini label="EMV · 7d" value="€3,910" delta="club accounts" />
        <Mini label="Posts · 90d" value="283" delta="22 / week" />
        <Mini label="Audience" value="6.2M" delta="IG + TikTok" />
      </div>
    </HudFrame>
  );
}

function BroadcastMockup() {
  return (
    <div className="w-full">
      <HudFrame label="Real model output" detail="recorded POC" className="bg-[#050B14]">
        <Image
          src="/demo/cv-annotated.jpg"
          alt="A real frame from the Osasuna–Alavés highlight annotated by the detection model"
          width={640}
          height={360}
          sizes="(min-width: 1024px) 40vw, 92vw"
          className="block w-full"
        />
      </HudFrame>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        {[
          ["Kosner", "120.5s"],
          ["Nissan", "97.5s"],
          ["Macron", "80.0s"],
        ].map(([n, t]) => (
          <div
            key={n}
            className="border border-[#F4EFE6]/[0.08] bg-[#0E1D33] px-2 py-2"
          >
            <div className="text-[#F4EFE6]/60">{n}</div>
            <div className="font-[family-name:var(--font-mono)] tabular-nums text-[#D8FF3E]">
              {t}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[#F4EFE6]/40">
        screen time · one 3-minute highlight · frame by frame
      </p>
    </div>
  );
}

function PortalMockup() {
  return (
    <HudFrame label="Two views · same data" tone="dim" className="bg-[#0E1D33]">
      <div className="grid grid-cols-2">
        <div className="border-r border-[#F4EFE6]/[0.06] p-4">
          <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#D8FF3E]">
            Club view
          </div>
          <div className="mt-2 font-[family-name:var(--font-archivo)] text-sm font-semibold text-[#F4EFE6]">
            CA Osasuna (study) · % of broadcast
          </div>
          <ul className="mt-3 space-y-1.5 text-[11px]">
            {[
              ["Kosner", "62%"],
              ["Nissan", "50%"],
              ["Macron", "41%"],
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
        <div className="bg-[#F7F3EA] p-4 text-[#0F1A2E]">
          <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/60">
            Sponsor view
          </div>
          <div className="mt-2 font-[family-name:var(--font-archivo)] text-sm font-semibold">
            Kosner · one highlight
          </div>
          <div className="mt-3 border border-[#0F1A2E]/10 bg-white p-2.5 text-[11px]">
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#0F1A2E]/55">
              Screen time
            </div>
            <div className="font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
              120.5s
            </div>
            <div className="text-[#0F1A2E]/45">measured frame by frame</div>
          </div>
          <div className="mt-2 border border-[#0F1A2E]/10 bg-white p-2.5 text-[11px]">
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#0F1A2E]/55">
              Share of voice
            </div>
            <div className="font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
              61.9%
            </div>
          </div>
        </div>
      </div>
    </HudFrame>
  );
}

function ProspectionMockup() {
  // Concept preview of a planned feature — categories, not real brands,
  // so no invented score is attached to a real company.
  const rows = [
    { brand: "Airline", region: "ES", fit: 94 },
    { brand: "Retail bank", region: "PT", fit: 88 },
    { brand: "Energy drink", region: "EU", fit: 82 },
    { brand: "Telecom", region: "ES / IT", fit: 76 },
  ];
  return (
    <HudFrame label="Concept preview · planned" tone="dim" className="bg-[#0E1D33] p-5">
      <MonoPanelHeader kicker="Prospects · top fit" title="Concept preview" />
      <ul className="mt-5 flex flex-col gap-2.5">
        {rows.map((r) => (
          <li
            key={r.brand}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border border-[#F4EFE6]/[0.06] bg-[#0A1628]/60 p-2.5 text-[12px]"
          >
            <div>
              <div className="font-medium text-[#F4EFE6]">{r.brand}</div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[#F4EFE6]/45">
                {r.region}
              </div>
            </div>
            <div className="h-1.5 w-20 overflow-hidden bg-[#F4EFE6]/[0.06]">
              <div
                style={{ width: `${r.fit}%` }}
                className="h-full bg-[#D8FF3E]/80"
              />
            </div>
            <div className="font-[family-name:var(--font-mono)] tabular-nums text-[#D8FF3E]">
              {r.fit}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 border border-[#F4EFE6]/15 bg-[#0A1628] p-3 text-[11px] leading-relaxed text-[#F4EFE6]/75">
        <span className="font-semibold text-[#F4EFE6]">AI draft —</span>{" "}
        &ldquo;Hola — your routes overlap with the club&apos;s away fixtures;
        here&apos;s the audience fit, sourced line by line…&rdquo;
      </div>
    </HudFrame>
  );
}

function ReportingMockup() {
  return (
    <HudFrame label="Live · Mondays 07:00" className="bg-[#F7F3EA] text-[#0F1A2E]">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#0F1A2E]/60">
              CA Osasuna · public study
            </div>
            <div className="mt-1 font-[family-name:var(--font-archivo)] text-lg font-bold">
              Sponsor exposure report
            </div>
          </div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[#0F1A2E]/55">
            Week of June 10, 2026
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <ReportCell label="EMV · 7d" value="€3,910" />
          <ReportCell label="Audience" value="6.2M" />
          <ReportCell label="Posts · 7d" value="17" />
        </div>
        <div className="mt-4 h-2 bg-[#0F1A2E]/10">
          <div className="h-full w-[93%] bg-[#0F1A2E]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#0F1A2E]/55">
          <span>TikTok share of audience · 5.8M of 6.2M</span>
          <span className="font-[family-name:var(--font-mono)] tabular-nums">93%</span>
        </div>
        <div className="mt-4 border border-[#0F1A2E]/10 bg-white p-3 text-[11px] leading-relaxed text-[#0F1A2E]/65">
          The Kosner crest was visible{" "}
          <span className="font-semibold text-[#0F1A2E]">120.5 seconds</span>{" "}
          of a 3-minute highlight, 61.9% share of voice across 10 sponsors.
        </div>
        <div className="mt-3 flex items-center justify-between font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.16em] text-[#0F1A2E]/45">
          <span>Methodology · screen-time based</span>
          <span>Page 1 / 3</span>
        </div>
      </div>
    </HudFrame>
  );
}

function ReportCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#0F1A2E]/10 bg-white p-3">
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
    { label: "SOC 2 Type II", sub: "Planned", status: "planned" as FeatureStatus },
    { label: "GDPR + DPA", sub: "EU data residency", status: "live" as FeatureStatus },
    { label: "SSO · SAML / OIDC", sub: "Workspace-wide", status: "planned" as FeatureStatus },
    { label: "RBAC + audit logs", sub: "Per-sponsor scope", status: "planned" as FeatureStatus },
  ];
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {certs.map((c) => (
        <div
          key={c.label}
          className="border border-[#F4EFE6]/[0.08] bg-[#0E1D33] p-4"
        >
          <FeatureBadge status={c.status} />
          <div className="mt-3 font-[family-name:var(--font-archivo)] text-sm font-semibold text-[#F4EFE6]">
            {c.label}
          </div>
          <div className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[#F4EFE6]/55">
            {c.sub}
          </div>
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
      <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/40">
        {label}
      </div>
      <div className="mt-1 font-[family-name:var(--font-mono)] text-sm font-semibold tabular-nums text-[#F4EFE6]">
        {value}
      </div>
      <div className="text-[10px] text-[#F4EFE6]/45">{delta}</div>
    </div>
  );
}
