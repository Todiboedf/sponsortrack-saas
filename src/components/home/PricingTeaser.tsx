"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

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
  features: string[];
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
      "Up to 10 active sponsors",
      "Cross-platform social analytics (Instagram, TikTok, X, YouTube, Facebook)",
      "Weekly auto-reports",
      "1 admin · 5 viewer seats",
      "On-demand PDF export",
      "AI weekly digest",
      "Slack / Teams alerts",
      "League-average benchmarking",
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
      "Unlimited sponsors",
      "Branded per-sponsor self-service portals",
      "Prospection engine + AI outreach",
      "AI sponsor brief generator",
      "Multi-language sponsor portals (ES / FR / DE / IT / PT)",
      "Real-time match alerts (social-based)",
      "Read-only API access",
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
      "Match-day computer vision (broadcast logo detection, LED rotation, interview backdrop)",
      "Dedicated success manager",
      "Custom data pipelines & API",
      "On-prem / EU data residency",
      "White-glove onboarding (90 days)",
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
    sub: `€${amount.toLocaleString("en-US")} billed annually · save 20%`,
  };
}

export function PricingTeaser() {
  const [billing, setBilling] = useState<Billing>("yearly");
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
