import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Transparent plans from €1,500/mo",
  description:
    "Three public plans, full feature comparison and a 14-day free trial on Pro. Pick a tier, start in minutes, switch whenever.",
  alternates: { canonical: "https://sponsortrack.io/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
