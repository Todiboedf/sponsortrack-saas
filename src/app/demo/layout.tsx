import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live demo · Explore the sponsor dashboard",
  description:
    "Filter sponsors, platforms and periods on synthetic data to see exactly how SponsorTrack surfaces sponsorship value in real time.",
  alternates: { canonical: "https://sponsortrack.io/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
