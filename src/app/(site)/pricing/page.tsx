"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chyron } from "@/components/ui/Chyron";
import { Card } from "@/components/ui/Card";
import { FeatureBadge, type FeatureStatus } from "@/components/ui/FeatureBadge";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

type TierFeature = { text: string; status?: FeatureStatus };

type Tier = {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  featured?: boolean;
  priceFrom?: boolean;
  setupNote?: string;
  trialNote?: boolean;
  cta: string;
  href: string;
  features: TierFeature[];
};

const tiers: Tier[] = [
  {
    name: "Starter",
    description: "For ambitious clubs moving off spreadsheets.",
    monthly: 1500,
    yearly: 14400,
    trialNote: true,
    cta: "Start free trial",
    href: "/contact",
    features: [
      { text: "Up to 10 active sponsors" },
      { text: "Instagram + TikTok analytics", status: "live" },
      { text: "X, YouTube, Facebook analytics", status: "dev" },
      { text: "Weekly auto-reports (branded PDF)", status: "live" },
      { text: "1 admin · 5 viewer seats" },
      { text: "On-demand PDF export", status: "planned" },
      { text: "AI weekly digest", status: "planned" },
      { text: "Slack / Teams alerts", status: "planned" },
      { text: "League-average benchmarking", status: "planned" },
    ],
  },
  {
    name: "Pro",
    description: "For leagues and top-tier clubs running full portfolios.",
    monthly: 3500,
    yearly: 33600,
    featured: true,
    trialNote: true,
    cta: "Start free trial",
    href: "/contact",
    features: [
      { text: "Unlimited sponsors" },
      { text: "Branded per-sponsor self-service portals", status: "planned" },
      { text: "Prospection engine + AI outreach", status: "planned" },
      { text: "AI sponsor brief generator", status: "planned" },
      { text: "Multi-language sponsor portals (ES / FR / DE / IT / PT)", status: "planned" },
      { text: "Match-day social alerts", status: "planned" },
      { text: "Read-only API access", status: "planned" },
    ],
  },
  {
    name: "Enterprise",
    description: "For multi-club groups, agencies and federations.",
    monthly: 7000,
    yearly: 67200,
    priceFrom: true,
    setupNote: "+ €8,000 one-shot setup fee (includes 90-day onboarding)",
    cta: "Book a discovery call",
    href: "/contact",
    features: [
      { text: "Match-day computer vision (broadcast logo detection, LED rotation, interview backdrop)", status: "dev" },
      { text: "Dedicated success manager" },
      { text: "Custom data pipelines & API", status: "planned" },
      { text: "EU data residency by default", status: "live" },
      { text: "White-glove onboarding (90 days)" },
    ],
  },
];

const matrix: {
  section: string;
  status?: FeatureStatus;
  rows: {
    label: string;
    status?: FeatureStatus;
    starter: string | boolean;
    pro: string | boolean;
    ent: string | boolean;
  }[];
}[] = [
  {
    section: "Usage",
    rows: [
      { label: "Active sponsors", starter: "10", pro: "Unlimited", ent: "Unlimited" },
      { label: "Admin seats", starter: "1", pro: "10", ent: "Unlimited" },
      { label: "Viewer seats", starter: "5", pro: "Unlimited", ent: "Unlimited" },
      { label: "Properties (clubs, teams, athletes)", starter: "1", pro: "10", ent: "Unlimited" },
      { label: "Data retention", starter: "2 years", pro: "5 years", ent: "Unlimited" },
    ],
  },
  {
    section: "Onboarding & setup",
    rows: [
      { label: "Setup fee", starter: "€0", pro: "€0", ent: "€8,000 one-shot" },
      {
        label: "Onboarding included",
        starter: "2h kick-off call",
        pro: "8h call + dedicated CSM (30 days)",
        ent: "Full white-glove onboarding (90 days)",
      },
      { label: "Migration assistance", starter: false, pro: true, ent: true },
      {
        label: "Custom training sessions",
        starter: false,
        pro: "2 / quarter",
        ent: "Unlimited",
      },
    ],
  },
  {
    section: "Analytics",
    rows: [
      { label: "Instagram + TikTok analytics", status: "live", starter: true, pro: true, ent: true },
      { label: "X, YouTube, Facebook analytics", status: "dev", starter: true, pro: true, ent: true },
      { label: "EMV model", status: "live", starter: "Standard", pro: "Standard", ent: "Custom (planned)" },
      { label: "Historical backfill", status: "planned", starter: "6 months", pro: "24 months", ent: "Unlimited" },
      { label: "Data refresh", starter: "Daily · hourly in dev", pro: "Daily · hourly in dev", ent: "Daily · hourly in dev" },
      { label: "Benchmarks", status: "planned", starter: false, pro: true, ent: true },
    ],
  },
  {
    section: "Match-day computer vision",
    status: "dev",
    rows: [
      { label: "Logo detection (recorded footage first)", starter: false, pro: true, ent: true },
      { label: "LED rotation pricing", starter: false, pro: true, ent: true },
      { label: "Broadcast quality scoring", starter: false, pro: true, ent: true },
      { label: "Custom detection models", starter: false, pro: false, ent: true },
    ],
  },
  {
    section: "Sponsor portal",
    status: "planned",
    rows: [
      { label: "Branded dashboards", starter: false, pro: true, ent: true },
      { label: "Scheduled reports (email PDF)", status: "live", starter: "Weekly", pro: "Any cadence", ent: "Any cadence" },
      { label: "White-label PDFs", starter: false, pro: true, ent: true },
      { label: "External user access", starter: "3 / sponsor", pro: "Unlimited", ent: "Unlimited" },
    ],
  },
  {
    section: "Platform & security",
    rows: [
      { label: "SSO (SAML / OIDC)", status: "planned", starter: false, pro: true, ent: true },
      { label: "SCIM provisioning", status: "planned", starter: false, pro: true, ent: true },
      { label: "Audit logs", status: "planned", starter: "90 days", pro: "2 years", ent: "Unlimited" },
      { label: "Data residency", status: "live", starter: "EU", pro: "EU", ent: "EU · custom planned" },
      { label: "Uptime SLA", status: "planned", starter: "-", pro: "99.9%", ent: "99.95%" },
    ],
  },
];

const faqs = [
  {
    q: "How does the 14-day free trial work?",
    a: "You get full access to the Pro plan for 14 days. No credit card required. If you decide to continue, pick the plan that fits, otherwise your workspace is archived and you lose nothing.",
  },
  {
    q: "Can I change plan later?",
    a: "Yes, up or down, at any time. Pro-rated credits are applied automatically on your next invoice.",
  },
  {
    q: "Why is there a setup fee on Enterprise?",
    a: "Enterprise rollouts mean custom data pipelines, security reviews, and a 90-day white-glove onboarding. The €8,000 one-shot setup fee covers the dedicated team for that 90-day window, and is adjustable on multi-club groups and federation engagements.",
  },
  {
    q: "What does 'per property' mean?",
    a: "A property is a club, team, league, athlete or venue that you analyse inside your workspace. You can mix and match, 1 club + 3 academy teams counts as 4 properties.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Data is encrypted in transit and at rest, hosted in the EU by default, and never used to train shared models. A SOC 2 Type II audit is planned; EU-US and UK DPAs are available on request.",
  },
  {
    q: "Do you offer non-profit / federation pricing?",
    a: "We do. Recognised federations, national teams and non-profit sports organisations get a tailored discount, just mention it when you book a discovery call.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Monthly subscriptions can be cancelled at any time and stop at the end of the period. Annual subscriptions can be cancelled at the end of the term, no auto-renewal lock-in.",
  },
  {
    q: "Can I see the contract before I sign?",
    a: "Of course. We share the full MSA and DPA up-front. Annual plans get a standard order form, we won't send you 30 pages of legalese for a €1,500 monthly contract.",
  },
];

function formatPrice(amount: number, billing: Billing) {
  if (billing === "monthly") {
    return {
      big: `€${amount.toLocaleString("en-US")}`,
      small: "/mo",
      sub: "billed monthly",
    };
  }
  const monthly = Math.round(amount / 12);
  return {
    big: `€${monthly.toLocaleString("en-US")}`,
    small: "/mo",
    sub: `when billed annually (−20%) · €${amount.toLocaleString("en-US")}/yr`,
  };
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-[#F4EFE6]/[0.06] bg-[#050B14] pt-28 pb-10 lg:pt-36 lg:pb-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Chyron>Pricing · public, like everything else</Chyron>
            <h1 className="mt-6 font-[family-name:var(--font-archivo)] text-balance text-[44px] font-bold leading-[1.02] tracking-[-0.025em] text-[#F4EFE6] sm:text-6xl">
              Simple pricing. Seriously.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
              Most vendors hide their prices behind a demo. We show them. Pick a
              plan, start in minutes, switch whenever.
            </p>

            <div className="mt-9 inline-flex items-center gap-1 rounded-[8px] border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.04] p-1">
              {(["monthly", "yearly"] as Billing[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={cn(
                    "relative rounded-[6px] px-5 py-2 text-sm font-medium transition-colors",
                    billing === b
                      ? "text-[#0A1628]"
                      : "text-[#F4EFE6]/55 hover:text-[#F4EFE6]"
                  )}
                >
                  {billing === b && (
                    <motion.span
                      layoutId="price-pill"
                      className="absolute inset-0 rounded-[6px] bg-[#D8FF3E]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {b === "monthly" ? "Monthly" : "Yearly"}
                    {b === "yearly" && (
                      <span className="ml-2 font-[family-name:var(--font-mono)] text-[10px] font-semibold">
                        −20%
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Tier cards ---------- */}
      <section className="py-14 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => {
              const price = formatPrice(
                billing === "monthly" ? t.monthly : t.yearly,
                billing
              );
              return (
                <Card
                  key={t.name}
                  className={cn(
                    "lock-on flex h-full flex-col p-8",
                    t.featured && "border-[#D8FF3E]/40 bg-[#0E1D33]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-[family-name:var(--font-archivo)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                      {t.name}
                    </h2>
                    {t.featured && (
                      <span className="bg-[#D8FF3E] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0A1628]">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-[#F4EFE6]/60">{t.description}</p>
                  <div className="mt-6 min-h-[88px]">
                    <div className="flex items-baseline gap-1">
                      {t.priceFrom && (
                        <span className="mr-1 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#F4EFE6]/55">
                          from
                        </span>
                      )}
                      <span className="font-[family-name:var(--font-mono)] text-5xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums">
                        {price.big}
                      </span>
                      <span className="text-sm text-[#F4EFE6]/55">{price.small}</span>
                    </div>
                    <div className="mt-1 text-[12px] text-[#F4EFE6]/50">{price.sub}</div>
                    {t.setupNote && (
                      <div className="mt-1 font-[family-name:var(--font-mono)] text-[12px] font-medium text-[#E8A33D]">
                        {t.setupNote}
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <Button
                      href={t.href}
                      variant={t.featured ? "primary" : "secondary"}
                      className="w-full"
                      rightIcon={<ArrowRight size={15} />}
                    >
                      {t.cta}
                    </Button>
                  </div>
                  {t.trialNote && (
                    <p className="mt-3 text-center text-[11px] text-[#F4EFE6]/50">
                      14-day free trial · no credit card · EU data residency
                    </p>
                  )}
                  <ul className="mt-7 flex flex-col gap-3 border-t border-[#F4EFE6]/[0.08] pt-6">
                    {t.features.map((f) => (
                      <li
                        key={f.text}
                        className="inline-flex items-start gap-2.5 text-[14px] text-[#F4EFE6]/80"
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-[#D8FF3E]" />
                        <span>
                          {f.text}
                          {f.status && (
                            <FeatureBadge status={f.status} className="ml-2" />
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
          <p className="mt-8 text-center text-[12px] text-[#F4EFE6]/45">
            Prices in EUR. VAT applied where relevant. Annual plans billed up
            front; monthly plans billed at the start of each cycle.
          </p>
        </Container>
      </section>

      {/* ---------- Comparison matrix (report paper) ---------- */}
      <section className="surface-paper py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <Chyron tone="ink">Compare every feature</Chyron>
            <h2 className="mt-5 font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-[42px]">
              The full plan comparison.
            </h2>
            <p className="mt-4 max-w-xl text-[#0F1A2E]/65">
              Everything is on the table, including the boring bits like setup
              fees and onboarding hours.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-[#0F1A2E]/12 bg-[#FBF7EF]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-[#0F1A2E]/[0.04]">
                  <tr>
                    <th className="sticky left-0 z-10 bg-[#FBF7EF] px-5 py-4 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F1A2E]/55">
                      Feature
                    </th>
                    <th className="px-4 py-4 text-center text-[13px] font-semibold text-[#0F1A2E]">
                      Starter
                    </th>
                    <th className="bg-[#0F1A2E]/[0.06] px-4 py-4 text-center text-[13px] font-semibold text-[#0F1A2E]">
                      Pro
                    </th>
                    <th className="px-4 py-4 text-center text-[13px] font-semibold text-[#0F1A2E]">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((sec) => (
                    <Fragment key={sec.section}>
                      <tr className="bg-[#0F1A2E]/[0.03]">
                        <td
                          colSpan={4}
                          className="px-5 py-3 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F1A2E]"
                        >
                          {sec.section}
                          {sec.status && (
                            <FeatureBadge
                              status={sec.status}
                              tone="light"
                              className="ml-2.5"
                            />
                          )}
                        </td>
                      </tr>
                      {sec.rows.map((row) => (
                        <tr
                          key={`${sec.section}-${row.label}`}
                          className="border-t border-[#0F1A2E]/[0.07]"
                        >
                          <td className="sticky left-0 z-10 bg-[#FBF7EF] px-5 py-3.5 text-[14px] text-[#0F1A2E]/85">
                            {row.label}
                            {row.status && (
                              <FeatureBadge
                                status={row.status}
                                tone="light"
                                className="ml-2"
                              />
                            )}
                          </td>
                          <CellLight value={row.starter} />
                          <CellLight value={row.pro} highlight />
                          <CellLight value={row.ent} />
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-[#0F1A2E]/12 bg-[#FBF7EF] p-5 text-[13px] leading-relaxed text-[#0F1A2E]/75">
            <span className="font-semibold text-[#0F1A2E]">A note on the setup fee.</span>{" "}
            Enterprise is the only plan with a one-shot setup component
            (€8,000). It funds the 90-day white-glove onboarding, security
            review and custom data pipeline work, adjustable on multi-club
            groups and federation engagements.
          </div>
        </Container>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="surface-paper pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Chyron tone="ink">FAQ</Chyron>
              <h2 className="mt-5 font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-[42px]">
                Answers before you ask.
              </h2>
              <p className="mt-4 text-[#0F1A2E]/70">
                Still curious?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[#0F1A2E] underline underline-offset-4"
                >
                  Talk to a human
                </Link>
                , usually same-day.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <button
                    key={f.q}
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className={cn(
                      "group rounded-lg border border-[#0F1A2E]/10 bg-[#FBF7EF] p-5 text-left transition-colors hover:border-[#0F1A2E]/30 hover:bg-white",
                      open && "border-[#0F1A2E]/40 bg-white"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[15px] font-medium text-[#0F1A2E]">
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-[#0F1A2E]/20 text-[#0F1A2E]/65 transition-transform",
                          open && "rotate-45 border-[#0F1A2E]/55 text-[#0F1A2E]"
                        )}
                        aria-hidden
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 1V9M1 5H9"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-[14px] leading-relaxed text-[#0F1A2E]/70">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function CellLight({
  value,
  highlight,
}: {
  value: string | boolean;
  highlight?: boolean;
}) {
  return (
    <td
      className={cn(
        "px-4 py-3.5 text-center text-[14px] text-[#0F1A2E]/85",
        highlight && "bg-[#0F1A2E]/[0.04]"
      )}
    >
      {typeof value === "boolean" ? (
        value ? (
          <Check size={17} className="mx-auto text-[#0F1A2E]" />
        ) : (
          <Minus size={15} className="mx-auto text-[#0F1A2E]/30" />
        )
      ) : (
        value
      )}
    </td>
  );
}
