import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ClipboardList,
  Database,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "Changelog · what I shipped, when",
  description:
    "Public changelog for SponsorTrack. Every meaningful release, every week, in chronological order.",
  alternates: { canonical: "https://sponsortrack.io/changelog" },
};

type EntryTag = "launch" | "feature" | "improvement" | "pilot" | "design";

type Entry = {
  date: string;
  tag: EntryTag;
  title: string;
  body: string;
  icon: React.ReactNode;
  href?: { label: string; url: string; external?: boolean };
};

const entries: Entry[] = [
  {
    date: "2026-05-01",
    tag: "design",
    title: "Sport-branded redesign V2",
    body: "Site refresh with a navy / red / cream / gold identity, Playfair Display headlines, and a real Recharts dashboard mockup. New /customers/osasuna and /changelog pages, Enterprise pricing now public at €7,000/mo.",
    icon: <Palette size={18} />,
  },
  {
    date: "2026-05-01",
    tag: "feature",
    title: "Match-day computer vision (preview)",
    body: "First production deployment of the in-house broadcast-feed model: live logo, jersey and LED detection running on Movistar+ and the in-house feed during CA Osasuna fixtures.",
    icon: <Camera size={18} />,
  },
  {
    date: "2026-04-30",
    tag: "pilot",
    title: "CA Osasuna pilot validated by board",
    body: "20-week pilot signed off in board video conference. SponsorTrack named the measurement layer for the Caja Rural / Macron / Digi / Cervezas El Águila / Asisa portfolio.",
    icon: <Sparkles size={18} />,
    href: {
      label: "Read the case study",
      url: "/customers/osasuna",
    },
  },
  {
    date: "2026-04-25",
    tag: "feature",
    title: "Per-sponsor dashboards",
    body: "Workspace UI now scopes to the logged-in sponsor: live KPIs, EMV trend and platform breakdown, all white-labelled and behind RLS.",
    icon: <Layers size={18} />,
  },
  {
    date: "2026-04-25",
    tag: "feature",
    title: "Live Supabase + Instagram fetcher",
    body: "Daily cron pulls public Instagram metrics, normalises them, and writes per-sponsor KPI rows. Dashboard switches from synthetic to live data automatically when rows exist.",
    icon: <Database size={18} />,
  },
  {
    date: "2026-04-24",
    tag: "improvement",
    title: "Security headers, SEO plumbing, real contact endpoint",
    body: "HSTS, X-Content-Type-Options, Referrer-Policy and Permissions-Policy on every response. Legal pages, sitemap, robots and structured data shipped. Contact form now hits a real API endpoint with rate limiting.",
    icon: <ShieldCheck size={18} />,
  },
  {
    date: "2026-04-24",
    tag: "launch",
    title: "Public site v1",
    body: "Initial commit of the SponsorTrack marketing site: homepage, features, pricing, demo, about, contact, privacy, terms.",
    icon: <ClipboardList size={18} />,
  },
];

const tagStyles: Record<EntryTag, string> = {
  launch:
    "border-[#8B0028]/45 bg-[#8B0028]/15 text-[#F4EFE6]",
  feature:
    "border-[#B8975A]/45 bg-[#B8975A]/[0.10] text-[#D8BC85]",
  improvement:
    "border-[#F4EFE6]/15 bg-[#F4EFE6]/[0.04] text-[#F4EFE6]/80",
  pilot:
    "border-[#2F8F5A]/40 bg-[#2F8F5A]/15 text-[#86C9A4]",
  design:
    "border-[#B8975A]/45 bg-[#B8975A]/[0.14] text-[#D8BC85]",
};

const tagLabels: Record<EntryTag, string> = {
  launch: "Launch",
  feature: "Feature",
  improvement: "Improvement",
  pilot: "Pilot",
  design: "Design",
};

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-12 lg:pt-44 lg:pb-16">
        <GradientOrb color="red" size={520} className="-left-40 -top-10" />
        <GradientOrb color="gold" size={420} className="-right-40 top-40" intensity="soft" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-5">
            <Badge tone="gold" icon={<Sparkles size={12} />}>
              Changelog
            </Badge>
            <h1 className="font-[family-name:var(--font-display)] text-balance text-5xl font-medium leading-[1.05] tracking-[-0.01em] text-[#F4EFE6] sm:text-6xl lg:text-[68px]">
              What shipped,{" "}
              <em className="italic font-medium text-gradient-brand">when.</em>
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
              Every meaningful release, in chronological order. I ship small,
              often, and in the open. Including the boring infrastructure
              parts.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[#F4EFE6]/55">
              <span>RSS feed coming soon ·</span>
              <a
                href="mailto:hello@sponsortrack.io?subject=Changelog%20RSS%20notify"
                className="text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
              >
                ping us to be notified
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Entries */}
      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="relative mx-auto max-w-4xl">
            <div
              aria-hidden
              className="absolute left-3 top-2 bottom-2 hidden w-px bg-gradient-to-b from-[#B8975A]/55 via-[#F4EFE6]/10 to-transparent sm:block"
            />
            <ol className="flex flex-col gap-6">
              {entries.map((e, i) => (
                <Reveal key={`${e.date}-${e.title}`} delay={i * 0.04}>
                  <li className="relative sm:pl-12">
                    <span
                      aria-hidden
                      className="absolute left-0 top-6 hidden h-6 w-6 -translate-x-[calc(50%-12px)] items-center justify-center rounded-full border border-[#B8975A]/40 bg-[#0A1628] text-[#B8975A] sm:inline-flex"
                    >
                      {e.icon}
                    </span>
                    <Card className="p-6 lg:p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.2em] text-[#B8975A]">
                          {e.date}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${tagStyles[e.tag]}`}
                        >
                          {tagLabels[e.tag]}
                        </span>
                      </div>
                      <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#F4EFE6] sm:text-2xl">
                        {e.title}
                      </h2>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                        {e.body}
                      </p>
                      {e.href && (
                        <div className="mt-4">
                          {e.href.external ? (
                            <a
                              href={e.href.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 text-[13px] text-[#B8975A] hover:text-[#D8BC85]"
                            >
                              {e.href.label}
                              <ArrowUpRight size={14} />
                            </a>
                          ) : (
                            <Link
                              href={e.href.url}
                              className="inline-flex items-center gap-1.5 text-[13px] text-[#B8975A] hover:text-[#D8BC85]"
                            >
                              {e.href.label}
                              <ArrowRight size={14} />
                            </Link>
                          )}
                        </div>
                      )}
                    </Card>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#B8975A]/30 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-8 text-center lg:p-10">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#F4EFE6] sm:text-3xl">
              Want a feature on this list?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[14px] text-[#F4EFE6]/65">
              The roadmap is shaped by design partners. Tell me what would move
              the needle for your sponsorship workflow. I ship most requests
              within a sprint.
            </p>
            <div className="mt-6">
              <Button href="/contact" rightIcon={<ArrowRight size={15} />}>
                Send a request
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
