"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeatureBadge, type FeatureStatus } from "@/components/ui/FeatureBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";
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
    description:
      "For ambitious clubs that want to stop managing sponsors in spreadsheets.",
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
    description:
      "For leagues, federations and top-tier clubs running full partner portfolios.",
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
    description:
      "For multi-club groups, agencies and federations with bespoke needs.",
    monthly: 7000,
    yearly: 67200,
    priceFrom: true,
    setupNote: "+ €8,000 one-shot setup fee",
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

function formatPrice(amount: number, billing: Billing) {
  if (billing === "monthly") {
    return { big: `€${amount.toLocaleString("en-US")}`, sub: "billed monthly" };
  }
  const monthly = Math.round(amount / 12);
  return {
    big: `€${monthly.toLocaleString("en-US")}`,
    sub: `when billed annually (−20%) · €${amount.toLocaleString("en-US")}/yr`,
  };
}

export function PricingTeaser() {
  const [billing, setBilling] = useState<Billing>("monthly");
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

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.04] p-1 backdrop-blur">
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  billing === b ? "text-[#F4EFE6]" : "text-[#F4EFE6]/55 hover:text-[#F4EFE6]"
                )}
              >
                {billing === b && (
                  <motion.span
                    layoutId="home-price-pill"
                    className="absolute inset-0 rounded-full bg-[#8B0028] ring-1 ring-[#B8975A]/35"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {b === "monthly" ? "Monthly" : "Yearly"}
                  {b === "yearly" && (
                    <span className="ml-2 rounded-full bg-[#B8975A]/25 px-1.5 py-0.5 text-[10px] font-semibold text-[#D8BC85]">
                      −20%
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => {
            const price = formatPrice(
              billing === "monthly" ? t.monthly : t.yearly,
              billing
            );
            return (
              <Reveal key={t.name} delay={i * 0.07}>
                <Card
                  className={cn(
                    "flex h-full flex-col p-8",
                    t.featured &&
                      "border-[#B8975A]/40 bg-gradient-to-b from-[#1A2B45] to-[#0A1628] glow-brand"
                  )}
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
                  <div className="mt-5 min-h-[90px]">
                    <div className="flex items-baseline gap-1">
                      {t.priceFrom && (
                        <span className="mr-1 text-sm font-medium uppercase tracking-[0.18em] text-[#B8975A]">
                          from
                        </span>
                      )}
                      <span className="font-[family-name:var(--font-mono)] text-5xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums">
                        {price.big}
                      </span>
                      <span className="text-sm text-[#F4EFE6]/55">/mo</span>
                    </div>
                    <div className="mt-1 text-[12px] text-[#F4EFE6]/50">{price.sub}</div>
                    {t.setupNote && (
                      <div className="mt-1 text-[12px] font-medium text-[#B8975A]">
                        {t.setupNote}
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#F4EFE6]/60">
                    {t.description}
                  </p>
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
                  <ul className="mt-7 flex flex-col gap-3 border-t border-[#F4EFE6]/[0.06] pt-6">
                    {t.features.map((f) => (
                      <li
                        key={f.text}
                        className="inline-flex items-start gap-2.5 text-[14px] text-[#F4EFE6]/80"
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-[#B8975A]" />
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
              </Reveal>
            );
          })}
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
