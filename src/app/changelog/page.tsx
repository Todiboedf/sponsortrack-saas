import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chyron } from "@/components/ui/Chyron";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Changelog, what we shipped, when",
  description:
    "Public changelog for Sponsorlens. Every meaningful release, every week, in chronological order.",
  alternates: { canonical: "https://sponsorlens.io/changelog" },
};

type EntryTag = "launch" | "feature" | "improvement" | "pilot" | "design";

type Entry = {
  date: string;
  tag: EntryTag;
  title: string;
  body: string;
  href?: { label: string; url: string; external?: boolean };
};

const entries: Entry[] = [
  {
    date: "2026-05-01",
    tag: "design",
    title: "Sport-branded redesign V2",
    body: "Site refresh with a navy / red / cream / gold identity, Playfair Display headlines, and a real Recharts dashboard mockup. New /demo and /changelog pages, Enterprise pricing now public at €7,000/mo.",
  },
  {
    date: "2026-05-01",
    tag: "feature",
    title: "Match-day computer vision (in development)",
    body: "Building the computer-vision pipeline: detect sponsor logos, jerseys and LED rotations on recorded broadcast footage and compute exact screen-time. In active development, not yet in production.",
  },
  {
    date: "2026-04-30",
    tag: "pilot",
    title: "Pitched to a LaLiga club",
    body: "Presented Sponsorlens to a LaLiga club's commercial team through my Real Madrid Graduate School TFM. Genuine interest in the social / API analytics; a full pilot and broadcast CV still to land.",
  },
  {
    date: "2026-04-25",
    tag: "feature",
    title: "Per-sponsor dashboards",
    body: "Workspace UI now scopes to the logged-in sponsor: live KPIs, EMV trend and platform breakdown, all white-labelled and behind RLS.",
  },
  {
    date: "2026-04-25",
    tag: "feature",
    title: "Live Supabase + Instagram fetcher",
    body: "Daily cron pulls public Instagram metrics, normalises them, and writes per-sponsor KPI rows. Dashboard switches from synthetic to live data automatically when rows exist.",
  },
  {
    date: "2026-04-24",
    tag: "improvement",
    title: "Security headers, SEO plumbing, real contact endpoint",
    body: "HSTS, X-Content-Type-Options, Referrer-Policy and Permissions-Policy on every response. Legal pages, sitemap, robots and structured data shipped. Contact form now hits a real API endpoint with rate limiting.",
  },
  {
    date: "2026-04-24",
    tag: "launch",
    title: "Public site v1",
    body: "Initial commit of the Sponsorlens marketing site, homepage, features, pricing, demo, about, contact, privacy, terms.",
  },
];

const tagStyles: Record<EntryTag, string> = {
  launch: "border-[#D8FF3E]/50 text-[#D8FF3E]",
  feature: "border-[#F4EFE6]/30 text-[#F4EFE6]/85",
  improvement: "border-[#8B98A9]/40 text-[#8B98A9]",
  pilot: "border-[#E8A33D]/50 text-[#E8A33D]",
  design: "border-[#F4EFE6]/30 text-[#F4EFE6]/85",
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
      <section className="relative overflow-hidden border-b border-[#F4EFE6]/[0.06] bg-[#050B14] pt-28 pb-12 lg:pt-36 lg:pb-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <Container className="relative">
          <div className="flex max-w-3xl flex-col items-start gap-5">
            <Chyron>Changelog · shipped in the open</Chyron>
            <h1 className="font-[family-name:var(--font-archivo)] text-balance text-[44px] font-bold leading-[1.02] tracking-[-0.025em] text-[#F4EFE6] sm:text-6xl">
              What shipped, when.
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
              Every meaningful release, in chronological order. We ship small,
              often, and in the open, including the boring infrastructure
              parts.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[#F4EFE6]/55">
              <span>RSS feed coming soon ·</span>
              <a
                href="mailto:guillaume.haas.nice@gmail.com?subject=Changelog%20RSS%20notify"
                className="text-[#D8FF3E] underline underline-offset-4 hover:text-[#E9FF80]"
              >
                ping us to be notified
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Entries */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <ol className="flex flex-col gap-6">
              {entries.map((e, i) => (
                <Reveal key={`${e.date}-${e.title}`} delay={i * 0.03} as="li">
                  <Card className="p-6 lg:p-7">
                    <div className="flex flex-wrap items-center gap-3 font-[family-name:var(--font-mono)]">
                      <span className="text-[12px] uppercase tracking-[0.2em] text-[#D8FF3E] tabular-nums">
                        {e.date}
                      </span>
                      <span
                        className={`inline-flex items-center border px-1.5 py-[1.5px] text-[9px] font-semibold uppercase tracking-[0.14em] ${tagStyles[e.tag]}`}
                      >
                        {tagLabels[e.tag]}
                      </span>
                    </div>
                    <h2 className="mt-3 font-[family-name:var(--font-archivo)] text-xl font-semibold tracking-tight text-[#F4EFE6] sm:text-2xl">
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
                            className="inline-flex items-center gap-1.5 text-[13px] text-[#D8FF3E] hover:text-[#E9FF80]"
                          >
                            {e.href.label}
                            <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <Link
                            href={e.href.url}
                            className="inline-flex items-center gap-1.5 text-[13px] text-[#D8FF3E] hover:text-[#E9FF80]"
                          >
                            {e.href.label}
                            <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    )}
                  </Card>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl rounded-lg border border-[#F4EFE6]/[0.10] bg-[#0E1D33]/70 p-8 text-center lg:p-10">
            <h3 className="font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#F4EFE6] sm:text-3xl">
              Want a feature on this list?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[14px] text-[#F4EFE6]/65">
              Our roadmap is shaped by design partners. Tell us what would move
              the needle for your sponsorship workflow, we ship most requests
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
