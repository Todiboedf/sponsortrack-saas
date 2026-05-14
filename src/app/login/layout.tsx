import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Sponsorlens",
  description: "Sign in to your Sponsorlens sponsor workspace.",
  alternates: { canonical: "https://sponsorlens.io/login" },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
