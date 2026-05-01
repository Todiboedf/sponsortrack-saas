import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://sponsortrack.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SponsorTrack — Sponsor intelligence, lived in real time.",
    template: "%s · SponsorTrack",
  },
  description:
    "The sponsor intelligence platform built for clubs, leagues and brands. Cross-platform analytics, match-day computer vision, and the reports that renew contracts.",
  keywords: [
    "sponsor tracking",
    "sports sponsorship ROI",
    "sponsorship analytics",
    "Blinkfire alternative",
    "SponsorUnited alternative",
    "media value measurement",
    "sports marketing platform",
  ],
  authors: [{ name: "SponsorTrack" }],
  creator: "SponsorTrack",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SponsorTrack",
    title: "SponsorTrack — Sponsor intelligence, lived in real time.",
    description:
      "Measure, prove and grow sponsorship value. Transparent pricing from €1,500/mo. 14-day free trial.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "SponsorTrack — Sponsor Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SponsorTrack — Sponsor intelligence for modern sports",
    description:
      "The all-in-one sponsor intelligence platform for clubs, leagues and brands.",
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SponsorTrack",
  legalName: "SponsorTrack Labs S.A.S.",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Sponsor intelligence platform for clubs, leagues and brands — social analytics, match-day computer vision, ROI reporting.",
  sameAs: [
    "https://x.com/sponsortrack",
    "https://www.linkedin.com/company/sponsortrack",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@sponsortrack.io",
      availableLanguage: ["English", "French", "Spanish"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A1628] text-[#F4EFE6]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#8B0028] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#F4EFE6]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
