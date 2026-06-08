import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

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

const SITE_URL = "https://sponsorlens.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sponsorlens: Sponsor intelligence, lived in real time.",
    template: "%s · Sponsorlens",
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
  authors: [{ name: "Sponsorlens" }],
  creator: "Sponsorlens",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sponsorlens",
    title: "Sponsorlens: Sponsor intelligence, lived in real time.",
    description:
      "Cross-platform analytics, match-day computer vision, and the reports that renew contracts. Built for clubs, leagues and brands.",
    locale: "en_US",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Sponsorlens: Sponsor Intelligence Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sponsorlens",
    creator: "@sponsorlens",
    title: "Sponsorlens: Sponsor intelligence for modern sports",
    description:
      "Sponsor intelligence platform for clubs, leagues and brands. Cross-platform analytics, match-day computer vision, ROI that renews.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
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
  name: "Sponsorlens",
  legalName: "Sponsorlens Labs S.A.S.",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Sponsor intelligence platform for clubs, leagues and brands, social analytics, match-day computer vision, ROI reporting.",
  sameAs: [
    "https://x.com/sponsorlens",
    "https://www.linkedin.com/company/sponsorlens",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@sponsorlens.io",
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
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
