import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in · SponsorTrack",
  description: "Sign in to your SponsorTrack sponsor workspace.",
  alternates: { canonical: "https://sponsortrack.io/login" },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
