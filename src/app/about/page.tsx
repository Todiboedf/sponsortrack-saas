import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Camera,
  Layers,
  Mail,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "About · Built by one person, for clubs tired of spreadsheets",
  description:
    "I’m Guillaume Haas. SponsorTrack is a solo-built sponsor intelligence platform for clubs and leagues, currently piloting with CA Osasuna.",
  alternates: { canonical: "https://sponsortrack.io/about" },
};

const whatItDoes = [
  {
    icon: <BarChart3 size={18} />,
    title: "Cross-platform analytics.",
    body: "Instagram, TikTok, X, YouTube, Facebook. One dashboard. One number per sponsor, per match, per week.",
  },
  {
    icon: <Camera size={18} />,
    title: "Match-day computer vision.",
    body: "A model watches the broadcast feed and prices every logo, jersey, and LED rotation in seconds of screen time.",
  },
  {
    icon: <Layers size={18} />,
    title: "Branded sponsor portals.",
    body: "Each sponsor logs in to their own white-labelled view. Same data, their colors, their language, their CFO.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-12 lg:pt-44 lg:pb-20">
        <GradientOrb color="red" size={560} className="-left-40 -top-10" />
        <GradientOrb color="gold" size={520} className="-right-40 top-40" intensity="soft" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
        <Container>
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <Badge tone="gold" icon={<Sparkles size={12} />}>
                About
              </Badge>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-medium leading-[1.04] tracking-[-0.01em] text-[#F4EFE6] sm:text-6xl lg:text-[68px]">
                Built by one person, for{" "}
                <em className="italic font-medium text-gradient-brand">
                  clubs tired of spreadsheets.
                </em>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg text-[#F4EFE6]/70 sm:text-xl">
                I’m Guillaume Haas. SponsorTrack started as a side project I
                wished existed when I was watching a club’s commercial team
                copy logos into Excel at 2am the night before a board meeting.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                  Talk to me
                </Button>
                <Button href="/customers/osasuna" size="lg" variant="outline">
                  Read the Osasuna case study
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <FounderPortrait />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why this exists */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Badge tone="red" icon={<Sparkles size={12} />}>
                Why this exists
              </Badge>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-3xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-4xl lg:text-5xl">
                Sport runs on{" "}
                <em className="italic text-gradient-brand">ten-figure budgets</em>{" "}
                and twenty-tab spreadsheets.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[#F4EFE6]/70">
                Every commercial team I’ve talked to spends more time
                consolidating data than negotiating renewals. I built
                SponsorTrack to flip that ratio.
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-[#F4EFE6]/70">
                The board sees one number per sponsor, per match. The sponsor
                sees their own portal, branded, on Monday morning. The
                spreadsheet stays closed. That’s the whole pitch.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What it does */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Badge tone="gold" icon={<ScrollText size={12} />}>
                What it does
              </Badge>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-3xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-4xl">
                Three things,{" "}
                <em className="italic text-gradient-brand">one platform.</em>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {whatItDoes.map((it, i) => (
                <Reveal key={it.title} delay={i * 0.06}>
                  <Card className="h-full p-7 transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A]">
                      {it.icon}
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[#F4EFE6]">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#F4EFE6]/65">
                      {it.body}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Who uses it */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Badge tone="red" icon={<Sparkles size={12} />}>
                Who uses it
              </Badge>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-3xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-4xl lg:text-5xl">
                One pilot live.{" "}
                <em className="italic text-gradient-brand">More on the way.</em>
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[#F4EFE6]/70">
                {/* Customer count is illustrative until public references land. */}
                CA Osasuna is the first club running SponsorTrack end-to-end. A
                handful of other European clubs and leagues are in active
                conversation. The roadmap is to onboard one new design partner
                per month and shape V1 around real sponsorship workflows.
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-[#F4EFE6]/70">
                If you run sponsorship at a top-tier club, league, or
                federation, and you want a measurement layer you can publish
                and defend:{" "}
                <a
                  href="mailto:guillaume@sponsortrack.io?subject=Design%20partner"
                  className="text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
                >
                  drop me a line
                </a>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How I work */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Badge tone="gold" icon={<Sparkles size={12} />}>
                How I work
              </Badge>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-3xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-4xl lg:text-5xl">
                Solo, in public,{" "}
                <em className="italic text-gradient-brand">on the phone.</em>
              </h2>
              <ul className="mt-8 flex flex-col gap-4 text-[17px] leading-relaxed text-[#F4EFE6]/75">
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8975A]" />
                  <span>I ship fast. The changelog is public.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8975A]" />
                  <span>I read every support email myself.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8975A]" />
                  <span>I demo the platform on a Zoom call, no sales engineer in the middle.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8975A]" />
                  <span>If you find a bug on a Friday at 6pm, I’ll know about it before kick-off.</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Links */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <Card className="mx-auto max-w-3xl p-8 lg:p-10">
              <div className="grid gap-6 sm:grid-cols-3">
                <LinkTile
                  label="Email"
                  value="guillaume@sponsortrack.io"
                  href="mailto:guillaume@sponsortrack.io"
                  icon={<Mail size={16} />}
                />
                <LinkTile
                  label="LinkedIn"
                  value="/in/guillaumehaas"
                  href="https://www.linkedin.com/in/guillaumehaas"
                  icon={<ArrowUpRight size={16} />}
                  external
                />
                <LinkTile
                  label="Changelog"
                  value="See what shipped this month"
                  href="/changelog"
                  icon={<ScrollText size={16} />}
                />
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-[#B8975A]/30 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-12 text-center lg:p-16">
            <GradientOrb color="red" size={380} className="-left-10 -top-10" intensity="soft" />
            <GradientOrb color="gold" size={380} className="-right-10 -bottom-10" intensity="soft" />
            <Badge tone="gold" icon={<Sparkles size={12} />}>
              Want to try it?
            </Badge>
            <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
              See the platform on{" "}
              <em className="italic text-gradient-brand">your sponsors.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#F4EFE6]/65">
              Pick a tier, start a 14-day trial, or book a discovery call. I
              run the demo myself.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/pricing" size="lg" rightIcon={<ArrowRight size={16} />}>
                Try it on your league
              </Button>
              <Link
                href="/customers/osasuna"
                className="text-sm text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
              >
                See how Osasuna does it →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function FounderPortrait() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-b from-[#B8975A]/20 via-transparent to-transparent blur-3xl"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[#F4EFE6]/[0.08] bg-gradient-to-br from-[#1A2B45] via-[#0F1A2E] to-[#0A1628] shadow-[0_40px_120px_-40px_rgba(139,0,40,0.55)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-[0.05]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-[#8B0028] to-[#B8975A] text-2xl font-semibold text-[#F4EFE6] ring-2 ring-[#B8975A]/40 shadow-2xl">
            GH
          </div>
          <div>
            <div className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#F4EFE6]">
              Guillaume Haas
            </div>
            <div className="mt-1 text-sm text-[#F4EFE6]/60">
              Solo founder · Madrid
            </div>
          </div>
          <div className="rounded-full border border-[#B8975A]/30 bg-[#B8975A]/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
            Photo coming · pilot week 4
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkTile({
  label,
  value,
  href,
  icon,
  external,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  const isMail = href.startsWith("mailto:");
  const isInternal = href.startsWith("/");
  const className =
    "group flex items-center justify-between gap-3 rounded-xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/60 p-4 transition-colors hover:border-[#B8975A]/45";
  const inner = (
    <>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8975A]">
          {label}
        </div>
        <div className="mt-1 truncate text-sm text-[#F4EFE6]/85">{value}</div>
      </div>
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A] transition-transform group-hover:translate-x-0.5">
        {icon}
      </span>
    </>
  );
  if (external || (!isMail && !isInternal)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {inner}
      </a>
    );
  }
  if (isMail) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
