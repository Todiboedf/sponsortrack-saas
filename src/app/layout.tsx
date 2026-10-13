import type { Metadata, Viewport } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display face: Archivo variable with the width axis — condensed-to-expanded
// range gives the scoreboard/broadcast register (expanded caps for kickers
// and stat labels, tight regular width for headlines).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
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
    default: "Sponsorlens: Measured, not estimated.",
    template: "%s · Sponsorlens",
  },
  description:
    "Sponsor exposure, measured daily. Social analytics for clubs, leagues and brands, with broadcast computer vision in development. Reported Mondays 07:00.",
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
    title: "Sponsorlens: Measured, not estimated.",
    description:
      "Sponsor exposure, measured daily. Social analytics live today, broadcast computer vision in development. Built for clubs, leagues and brands.",
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
    title: "Sponsorlens: Measured, not estimated.",
    description:
      "Sponsor exposure, measured daily. Social analytics live today, broadcast computer vision in development. Reported Mondays 07:00.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A1628] text-[#F4EFE6]">
        {children}
      </body>
    </html>
  );
}
