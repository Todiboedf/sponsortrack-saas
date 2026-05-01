"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle, Minus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { GradientOrb } from "@/components/GradientOrb";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

type Tier = {
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  featured?: boolean;
  cta: string;
  href: string;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: "Starter",
    description: "For ambitious clubs moving off spreadsheets.",
    monthly: 1500,
    yearly: 14400,
    cta: "Start free trial",
    href: "/contact",
    features: [
      "Up to 10 active sponsors",
      "Cross-platform social analytics",
      "Weekly auto-reports",
      "1 admin + 5 viewer seats",
      "Email support",
      "EU data residency",
    ],
  },
  {
    name: "Pro",
    description: "For leagues and top-tier clubs running full portfolios.",
    monthly: 3500,
    yearly: 33600,
    featured: true,
    cta: "Start free trial",
    href: "/contact",
    features: [
      "Unlimited sponsors",
      "Match-day computer vision",
      "Branded sponsor portals",
      "Prospection engine + AI outreach",
      "SSO · SCIM · RBAC",
      "Priority support + SLA",
    ],
  },
  {
    name: "Enterprise",
    description: "For multi-club groups, agencies and federations.",
    monthly: null,
    yearly: null,
    cta: "Book a demo",
    href: "/contact",
    features: [
      "Dedicated success manager",
      "Custom data pipelines & API",
      "On-prem / private cloud option",
      "Custom computer-vision models",
      "Rights & contract management",
      "99.95% uptime SLA",
    ],
  },
];

const matrix: {
  section: string;
  rows: { label: string; tooltip?: string; starter: string | boolean; pro: string | boolean; ent: string | boolean }[];
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
    section: "Analytics",
    rows: [
      { label: "Social platforms", starter: "6 platforms", pro: "10 platforms", ent: "All + custom" },
      { label: "EMV model", starter: "Standard", pro: "Configurable", ent: "Fully custom" },
      { label: "Historical backfill", starter: "6 months", pro: "24 months", ent: "Unlimited" },
      { label: "Live data refresh", starter: "Hourly", pro: "5 min", ent: "Streaming" },
      { label: "Benchmarks", starter: false, pro: true, ent: true },
    ],
  },
  {
    section: "Match-day computer vision",
    rows: [
      { label: "Live logo detection", starter: false, pro: true, ent: true },
      { label: "LED rotation pricing", starter: false, pro: true, ent: true },
      { label: "Broadcast quality scoring", starter: false, pro: true, ent: true },
      { label: "Custom detection models", starter: false, pro: false, ent: true },
    ],
  },
  {
    section: "Sponsor portal",
    rows: [
      { label: "Branded dashboards", starter: false, pro: true, ent: true },
      { label: "Scheduled reports", starter: "Weekly", pro: "Any cadence", ent: "Any cadence" },
      { label: "White-label PDFs", starter: false, pro: true, ent: true },
      { label: "External user access", starter: "3 / sponsor", pro: "Unlimited", ent: "Unlimited" },
    ],
  },
  {
    section: "Platform & security",
    rows: [
      { label: "SSO (SAML / OIDC)", starter: false, pro: true, ent: true },
      { label: "SCIM provisioning", starter: false, pro: true, ent: true },
      { label: "Audit logs", starter: "90 days", pro: "2 years", ent: "Unlimited" },
      { label: "Data residency", starter: "EU", pro: "EU / US", ent: "Custom region" },
      { label: "Uptime SLA", starter: "—", pro: "99.9%", ent: "99.95%" },
    ],
  },
];

const faqs = [
  {
    q: "How does the 14-day free trial work?",
    a: "You get full access to the Pro plan for 14 days. No credit card required. If you decide to continue, pick the plan that fits — otherwise your workspace is archived and you lose nothing.",
  },
  {
    q: "Can I change plan later?",
    a: "Yes — up or down, at any time. Pro-rated credits are applied automatically on your next invoice.",
  },
  {
    q: "What does ‘per property’ mean?",
    a: "A property is a club, team, league, athlete or venue that you analyse inside your workspace. You can mix and match — 1 club + 3 academy teams counts as 4 properties.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Data is encrypted in transit and at rest, hosted in the EU by default, and never used to train shared models. Our SOC 2 Type II audit is in progress; EU-US and UK DPAs are available on request.",
  },
  {
    q: "Do you offer non-profit / federation pricing?",
    a: "We do. Recognised federations, national teams and non-profit sports organisations get a tailored discount — just mention it when you book a demo.",
  },
  {
    q: "Can I see my contract before I sign?",
    a: "Of course. We share the full MSA and DPA up-front. Annual plans get a standard order form — we won’t send you 30 pages of legalese for a €1,500 monthly contract.",
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
    sub: `€${amount.toLocaleString("en-US")} billed annually · save 20%`,
  };
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12 lg:pt-44 lg:pb-16">
        <GradientOrb color="red" size={560} className="-left-40 -top-10" />
        <GradientOrb color="gold" size={520} className="-right-40 top-40" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge icon={<Sparkles size={13} />}>Pricing</Badge>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[68px]">
              Simple pricing.{" "}
              <span className="text-gradient-brand">Seriously.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-white/60 sm:text-xl">
              Most vendors hide their prices behind a demo. We show them. Pick a plan,
              start in minutes, switch whenever.
            </p>

            <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
              {(["monthly", "yearly"] as Billing[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                    billing === b
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  )}
                >
                  {billing === b && (
                    <motion.span
                      layoutId="price-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7C3AED]/40 to-[#3B82F6]/40 ring-1 ring-white/20"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {b === "monthly" ? "Monthly" : "Yearly"}
                    {b === "yearly" && (
                      <span className="ml-2 rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
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

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => {
              const price =
                t.monthly !== null && t.yearly !== null
                  ? formatPrice(billing === "monthly" ? t.monthly : t.yearly, billing)
                  : null;
              return (
                <Card
                  key={t.name}
                  className={cn(
                    "flex h-full flex-col p-8",
                    t.featured &&
                      "border-white/20 bg-gradient-to-b from-[#1a0f2e]/80 to-[#0A0A12] ring-1 ring-[#7C3AED]/30 shadow-[0_40px_120px_-40px_rgba(124,58,237,0.55)]"
                  )}
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
                  <p className="mt-2 text-sm text-white/55">{t.description}</p>
                  <div className="mt-6 min-h-[72px]">
                    {price ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.02em] text-white">
                            {price.big}
                          </span>
                          <span className="text-sm text-white/55">{price.small}</span>
                        </div>
                        <div className="mt-1 text-[12px] text-white/45">{price.sub}</div>
                      </>
                    ) : (
                      <>
                        <div className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.02em] text-white">
                          Custom
                        </div>
                        <div className="mt-1 text-[12px] text-white/45">
                          Tailored to your organisation
                        </div>
                      </>
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* Comparison matrix */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge icon={<Sparkles size={13} />}>Compare every feature</Badge>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
              Full plan comparison
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-white/[0.03]">
                  <tr>
                    <th className="sticky left-0 z-10 bg-[#0A0A12] px-5 py-4 text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">
                      Feature
                    </th>
                    <th className="px-4 py-4 text-center text-[13px] font-semibold text-white">
                      Starter
                    </th>
                    <th className="bg-gradient-to-b from-[#7C3AED]/20 to-[#3B82F6]/10 px-4 py-4 text-center text-[13px] font-semibold text-white">
                      Pro
                    </th>
                    <th className="px-4 py-4 text-center text-[13px] font-semibold text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((sec) => (
                    <Fragment key={sec.section}>
                      <tr className="bg-white/[0.02]">
                        <td
                          colSpan={4}
                          className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45"
                        >
                          {sec.section}
                        </td>
                      </tr>
                      {sec.rows.map((row) => (
                        <tr
                          key={`${sec.section}-${row.label}`}
                          className="border-t border-white/[0.05]"
                        >
                          <td className="sticky left-0 z-10 bg-[#0A0A12] px-5 py-3.5 text-[14px] text-white/80">
                            {row.label}
                          </td>
                          <Cell value={row.starter} />
                          <Cell value={row.pro} highlight />
                          <Cell value={row.ent} />
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge icon={<HelpCircle size={13} />}>FAQ</Badge>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
                Answers before you ask.
              </h2>
              <p className="mt-4 text-white/60">
                Still curious?{" "}
                <Link
                  href="/contact"
                  className="text-white/85 underline underline-offset-4 hover:text-white"
                >
                  Talk to a human
                </Link>{" "}
                — usually same-day.
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
                      "group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left transition-colors hover:border-white/15 hover:bg-white/[0.03]",
                      open && "border-white/15 bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[15px] font-medium text-white">{f.q}</span>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-transform",
                          open && "rotate-45 border-[#A78BFA]/50 text-[#C4B5FD]"
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
                          <p className="pt-3 text-[14px] leading-relaxed text-white/60">
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

function Cell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  return (
    <td
      className={cn(
        "px-4 py-3.5 text-center text-[14px] text-white/80",
        highlight && "bg-white/[0.025]"
      )}
    >
      {typeof value === "boolean" ? (
        value ? (
          <Check size={17} className="mx-auto text-emerald-400" />
        ) : (
          <Minus size={15} className="mx-auto text-white/25" />
        )
      ) : (
        value
      )}
    </td>
  );
}
