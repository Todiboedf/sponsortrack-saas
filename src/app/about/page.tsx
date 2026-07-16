import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Chyron } from "@/components/ui/Chyron";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HudFrame } from "@/components/ui/HudFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About: one founder, building measurement in public",
  description:
    "Sponsorlens is a solo-founded, public-build sponsorship measurement platform. One public study live (CA Osasuna), social analytics running daily, broadcast computer vision in development. Pre-launch.",
};

const values = [
  {
    n: "01",
    title: "Transparent by default",
    body: "Public pricing. Public roadmap. A public study. If I can't explain a number, I don't ship it.",
  },
  {
    n: "02",
    title: "Measurement is a craft",
    body: "I build models I would bet on, not ones that happen to make customers feel good. Integrity over vanity.",
  },
  {
    n: "03",
    title: "Customer-first, truly",
    body: "Support goes straight to the founder. You won't hear 'I'll escalate it', you'll hear 'I'm shipping it.'",
  },
  {
    n: "04",
    title: "Data you'd trust with your kids",
    body: "EU-hosted by default, never used to train shared models, deleted on request. Your sponsors deserve that.",
  },
];

const founder = {
  name: "Guillaume Haas",
  role: "Founder",
  bio: "Entrepreneur with a product engineering background, building Sponsorlens solo, from the data model to the first board pitch. Based in Nice, France, pre-launch and looking for the first design partners.",
};

const milestones = [
  {
    year: "2026",
    title: "An idea, then a prototype",
    body: "Sponsorlens starts as a solo side-project, a hunch that sponsorship measurement deserves a real data layer, not a PDF recap.",
  },
  {
    year: "2026",
    title: "Public build",
    body: "The site goes live. The product roadmap is public from day one, features ship small, often, and in the open.",
  },
  {
    year: "2026",
    title: "The public study",
    body: "CA Osasuna measured from public data: 283 posts in 90 days, one broadcast highlight read frame by frame, a weekly report every Monday.",
  },
  {
    year: "Next",
    title: "The first design partners",
    body: "Now looking for the first club to run a real pilot. One partner at a time, shaped around real sponsorship workflows.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#F4EFE6]/[0.06] bg-[#050B14] pt-28 pb-14 lg:pt-36 lg:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Chyron>About · solo build, in public</Chyron>
            <h1 className="mt-6 font-[family-name:var(--font-archivo)] text-balance text-[44px] font-bold leading-[1.02] tracking-[-0.025em] text-[#F4EFE6] sm:text-6xl lg:text-[64px]">
              A $100B industry, still counted by hand.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
              Sponsorlens is one founder building the measurement layer for
              sponsorship. Social analytics run today. Broadcast computer
              vision is in development. Everything ships in public.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <Reveal>
              <div>
                <Chyron>Our mission</Chyron>
                <h2 className="mt-6 font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-[#F4EFE6] sm:text-[42px]">
                  Make every euro of sponsorship measurable — and defensible.
                </h2>
                <div className="prose-dark mt-6 max-w-xl">
                  <p>
                    Sport is the last giant industry where ten-figure budgets
                    move on the strength of a slide deck. Brands can&apos;t
                    prove their ROI. Clubs can&apos;t prove their value. Both
                    sides leave money on the table, every season.
                  </p>
                  <p>
                    I&apos;m building the measurement layer: contracts,
                    matchdays, jersey deals, LED rotations, viral posts, turned
                    into numbers a CFO can sign off on.
                  </p>
                  <p>
                    If you care about sport and you care about craft,
                    you&apos;ll probably like what I&apos;m building.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/contact" rightIcon={<ArrowRight size={15} />}>
                    Become a design partner
                  </Button>
                  <Button href="/features" variant="outline">
                    What we build
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <HudFrame label="Pre-launch · real numbers" className="bg-[#0A1628]">
                <div className="grid grid-cols-2 divide-x divide-y divide-[#F4EFE6]/[0.08] sm:grid-cols-3">
                  {[
                    { stat: "$100B", label: "Global sponsorship market" },
                    { stat: "1", label: "Solo founder, in public" },
                    { stat: "8", label: "Sponsors in the live demo" },
                    { stat: "283", label: "Posts analysed in a 90-day study" },
                    { stat: "EU", label: "Data residency, by default" },
                    { stat: "2026", label: "Building in the open" },
                  ].map((s) => (
                    <div key={s.label} className="p-5">
                      <div className="font-[family-name:var(--font-mono)] text-2xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums sm:text-3xl">
                        {s.stat}
                      </div>
                      <div className="mt-1 text-[12px] text-[#F4EFE6]/55">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </HudFrame>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Illustrative pilot scenario (targets, not client results) */}
      <section className="border-t border-[#F4EFE6]/[0.06] py-16 lg:py-20">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-[#F4EFE6]/[0.09] bg-[#0E1D33]/70">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-8 lg:p-10">
                  <Chyron rule={false}>
                    Illustrative scenario · not a client result
                  </Chyron>
                  <h2 className="mt-5 font-[family-name:var(--font-archivo)] text-balance text-3xl font-bold tracking-[-0.02em] text-[#F4EFE6] sm:text-4xl">
                    What a 20-week pilot could look like.
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                    An illustrative pilot: social analytics and per-sponsor
                    reporting wired against a real season schedule, with
                    match-day computer vision in active development. Every
                    number below is a target we would commit to, not a
                    result — Sponsorlens has no clients yet.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button href="/demo" rightIcon={<ArrowRight size={15} />}>
                      See the live demo
                    </Button>
                  </div>
                </div>
                <div className="relative flex items-center justify-center bg-[#0A1628]/85 p-8 lg:p-10">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-grid opacity-[0.5]"
                  />
                  <div className="relative grid w-full max-w-sm grid-cols-2 gap-3">
                    {[
                      { label: "Pilot weeks", value: "20" },
                      { label: "Sponsors", value: "8" },
                      { label: "Platforms wired", value: "5" },
                      { label: "EMV lift · target", value: "+24%" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="border border-[#F4EFE6]/[0.12] bg-[#0E1D33]/85 p-4"
                      >
                        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#F4EFE6]/50">
                          {m.label}
                        </div>
                        <div className="mt-2 font-[family-name:var(--font-mono)] text-2xl font-semibold tabular-nums text-[#F4EFE6]">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values — numbered editorial list, no icon cards */}
      <section className="border-t border-[#F4EFE6]/[0.06] py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title="Four values, non-negotiable."
            description="Written here because it's easier to stay accountable in public."
          />
          <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="flex gap-6 border-t border-[#F4EFE6]/[0.10] pt-6">
                  <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[#D8FF3E] tabular-nums">
                    {v.n}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-archivo)] text-lg font-semibold tracking-tight text-[#F4EFE6]">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#F4EFE6]/60">
                      {v.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="border-t border-[#F4EFE6]/[0.06] py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              eyebrow="Founded by"
              title="A solo founder, shipping in public."
              description="Sponsorlens is an independent project, built from scratch, without a pre-existing team or external funding."
            />
            <Reveal delay={0.08}>
              <Card className="p-8">
                <div className="flex items-center gap-5">
                  <div className="grid h-16 w-16 place-items-center border border-[#D8FF3E]/40 bg-[#0A1628] font-[family-name:var(--font-mono)] text-base font-semibold text-[#D8FF3E]">
                    {founder.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-archivo)] text-lg font-semibold tracking-tight text-[#F4EFE6]">
                      {founder.name}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#F4EFE6]/55">
                      {founder.role}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-[#F4EFE6]/70">
                  {founder.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-[13px]">
                  <a
                    href="https://www.linkedin.com/in/guillaumehaas"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-[#D8FF3E] underline underline-offset-4 hover:text-[#E9FF80]"
                  >
                    LinkedIn
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href="mailto:guillaume.haas.nice@gmail.com"
                    className="inline-flex items-center gap-1.5 text-[#D8FF3E] underline underline-offset-4 hover:text-[#E9FF80]"
                  >
                    guillaume.haas.nice@gmail.com
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="border-t border-[#F4EFE6]/[0.06] py-16 lg:py-20">
        <Container>
          <SectionHeader eyebrow="Our story" title="A roadmap built in the open." />
          <div className="mx-auto mt-12 max-w-3xl">
            <ul className="flex flex-col">
              {milestones.map((m, i) => (
                <Reveal key={`${m.year}-${m.title}`} delay={i * 0.05} as="li">
                  <div className="relative grid gap-2 border-l-2 border-[#F4EFE6]/[0.10] pb-10 pl-8 last:pb-0 sm:grid-cols-[140px_1fr] sm:gap-8">
                    <span
                      aria-hidden
                      className="absolute -left-[5px] top-1.5 block h-2 w-2 bg-[#D8FF3E]"
                    />
                    <div className="font-[family-name:var(--font-mono)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#D8FF3E]">
                      {m.year}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-archivo)] text-xl font-semibold text-[#F4EFE6]">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                        {m.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#050B14] py-16 lg:py-20">
        <Container>
          <Reveal>
            <HudFrame label="Design partners" className="mx-auto max-w-4xl bg-[#0A1628]">
              <div className="px-8 py-12 text-center lg:px-16 lg:py-14">
                <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-[#F4EFE6] sm:text-[42px]">
                  Want your sponsorship measured, not estimated?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[#F4EFE6]/65">
                  I&apos;m looking for the first design partners: clubs, leagues
                  and brands who want their exposure measured. You get the
                  founder, the public roadmap, and a report every Monday.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                    Get in touch
                  </Button>
                  <Link
                    href="/demo"
                    className="text-sm text-[#D8FF3E] underline underline-offset-4 hover:text-[#E9FF80]"
                  >
                    See the live demo →
                  </Link>
                </div>
              </div>
            </HudFrame>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
