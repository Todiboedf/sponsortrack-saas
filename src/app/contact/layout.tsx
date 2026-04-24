import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Talk to the team",
  description:
    "Book a demo, start a trial, or reach sales, press and support directly. We usually reply same-day, 9:00–19:00 CET, Monday to Friday.",
  alternates: { canonical: "https://sponsortrack.io/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
