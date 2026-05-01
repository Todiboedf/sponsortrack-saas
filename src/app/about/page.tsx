import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Flag,
  HeartHandshake,
  LineChart,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "About — Building the sponsor intelligence layer for sport",
  description:
    "SponsorTrack is a solo-founded, public-build sports sponsorship platform measuring every match, post and impression — currently piloting with CA Osasuna.",
};

const values = [
  {
    icon: <Target size={18} />,
    title: "Transparent by default",
    body: "Public pricing. Public roadmap. Publicly shared methodology. If we can’t explain a number, we shouldn’t be shipping it.",
  },
  {
    icon: <LineChart size={18} />,
    title: "Measurement is a craft",
    body: "We build models we would bet on — not ones that happen to make customers feel good. Integrity over vanity.",
  },
  {
    icon: <Users size={18} />,
    title: "Customer-first, truly",
    body: "Support goes straight to the founder. You won’t hear ‘I’ll escalate it’ — you’ll hear ‘I’m shipping it.’",
  },
  {
    icon: <Shield size={18} />,
    title: "Data you’d trust with your kids",
    body: "EU-hosted by default, never used to train shared models, and deletable with one click. Your sponsors deserve that.",
  },
];

const founder = {
  name: "Guillaume Haas",
  role: "Founder",
  bio: "Entrepreneur with a product engineering background, building SponsorTrack solo — from the data model to the first board pitch. Based in Madrid, currently piloting with CA Osasuna.",
};

const milestones = [
  {
    year: "2026",
    title: "An idea, then a prototype",
    body: "SponsorTrack starts as a solo side-project — a hunch that sponsorship measurement deserves a real data layer, not a PDF recap.",
  },
  {
    year: "2026",
    title: "Public build",
    body: "The site goes live. The product roadmap is public from day one — features ship small, often, and in the open.",
  },
  {
    year: "2026",
    title: "CA Osasuna pilot",
    body: "First design partner: a centenary LaLiga club. Twenty-week pilot, eight sponsors, live broadcast computer vision in production.",
  },
  {
    year: "Next",
    title: "More clubs, more leagues",
    body: "We onboard one new design partner per month while we shape the V1 product around real sponsorship workflows.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
        <GradientOrb color="red" size={560} className="-left-40 -top-10" />
        <GradientOrb color="gold" size={520} className="-right-40 top-40" intensity="soft" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal>
              <Badge tone="gold" icon={<Sparkles size={12} />}>
                About
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-medium leading-[1.04] tracking-[-0.01em] text-[#F4EFE6] sm:text-6xl lg:text-[76px]">
                We build the{" "}
                <em className="italic font-medium text-gradient-brand">
                  data layer
                </em>{" "}
                sport has been missing.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-pretty text-lg text-[#F4EFE6]/65 sm:text-xl">
                Sponsorship is a $100B industry running on gut feel and PDF
                recaps. We think it deserves better — specifically, a modern
                platform that turns every match, post and impression into
                evidence.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <Reveal>
              <div>
                <Badge tone="red" icon={<Flag size={12} />}>
                  Our mission
                </Badge>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
                  Make every euro of sponsorship measurable —{" "}
                  <em className="italic text-gradient-brand">and defensible.</em>
                </h2>
                <div className="prose-dark mt-6 max-w-xl">
                  <p>
                    Sport is the last giant industry where ten-figure budgets
                    move on the strength of a slide deck. Brands can&apos;t
                    prove their ROI, clubs can&apos;t prove their value, and
                    both sides leave money on the table every single season.
                  </p>
                  <p>
                    We&apos;re changing that by building a measurement layer
                    that understands sport the way the people inside it do —
                    contracts, matchdays, jersey deals, LED rotations, viral
                    posts — and turns them into numbers a CFO can sign off on.
                  </p>
                  <p>
                    If you care about sport and you care about craft, you&apos;ll
                    probably like what we&apos;re building.
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
              <div className="relative">
                <GradientOrb color="red" size={380} className="-left-10 -top-10" intensity="soft" />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "€2.4B", label: "Media value analysed" },
                    { stat: "48", label: "Leagues / federations targeted" },
                    { stat: "5,200", label: "Matches observed live" },
                    { stat: "94%", label: "Sponsor renewal rate" },
                    { stat: "11×", label: "Faster than a spreadsheet" },
                    { stat: "EU-first", label: "Data residency policy" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/70 p-5"
                    >
                      <div className="font-[family-name:var(--font-mono)] text-2xl font-semibold tracking-tight text-[#F4EFE6] tabular-nums sm:text-3xl">
                        {s.stat}
                      </div>
                      <div className="mt-1 text-[12px] text-[#F4EFE6]/55">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Case study highlight (Osasuna) */}
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <Card className="overflow-hidden p-0">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-8 lg:p-10">
                  <Badge tone="gold" icon={<Trophy size={12} />}>
                    Our case study
                  </Badge>
                  <h2 className="mt-5 font-[family-name:var(--font-display)] text-balance text-3xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-4xl">
                    CA Osasuna —{" "}
                    <em className="italic text-gradient-brand">
                      twenty weeks to prove the model.
                    </em>
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#F4EFE6]/65">
                    A centenary LaLiga club piloting SponsorTrack end-to-end:
                    social analytics, match-day computer vision, and per-sponsor
                    portals all wired against a real season schedule.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button
                      href="/customers/osasuna"
                      rightIcon={<ArrowRight size={15} />}
                    >
                      Read the case study
                    </Button>
                    <Button
                      href="https://osasuna-project.vercel.app/clients/osasuna"
                      external
                      variant="outline"
                      rightIcon={<ExternalLink size={14} />}
                    >
                      View public pitch
                    </Button>
                  </div>
                </div>
                <div className="relative flex items-center justify-center bg-gradient-to-br from-[#1A2B45] to-[#0A1628] p-8 lg:p-10">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-grid opacity-[0.05]"
                  />
                  <div className="relative grid w-full max-w-sm grid-cols-2 gap-3">
                    {[
                      { label: "Pilot weeks", value: "20" },
                      { label: "Sponsors", value: "8" },
                      { label: "Detections / s", value: "18" },
                      { label: "EMV lift", value: "+24%" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-[#B8975A]/30 bg-[#0F1A2E]/85 p-4"
                      >
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
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
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="How we work"
            eyebrowIcon={<HeartHandshake size={13} />}
            title={
              <>
                Four values,{" "}
                <em className="italic text-gradient-brand">non-negotiable.</em>
              </>
            }
            description="We write them here because it’s easier to hold ourselves accountable in public."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <Card className="h-full p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A]">
                    {v.icon}
                  </div>
                  <h4 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[#F4EFE6]">
                    {v.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#F4EFE6]/60">
                    {v.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="Founded by"
            eyebrowIcon={<Users size={13} />}
            title={
              <>
                A solo founder,{" "}
                <em className="italic text-gradient-brand">shipping in public.</em>
              </>
            }
            description="SponsorTrack is an independent project — built from scratch, without a pre-existing team or external funding."
          />
          <div className="mt-14 flex justify-center">
            <Reveal>
              <Card className="w-full max-w-xl p-8">
                <div className="flex items-center gap-5">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#8B0028]/30 text-base font-semibold text-[#F4EFE6] ring-1 ring-[#B8975A]/40">
                    {founder.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[#F4EFE6]">
                      {founder.name}
                    </div>
                    <div className="text-[12px] text-[#F4EFE6]/55">
                      {founder.role}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-[#F4EFE6]/70">
                  {founder.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-[13px]">
                  <a
                    href="https://www.linkedin.com/in/guillaumehaas"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
                  >
                    LinkedIn
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href="mailto:guillaume@sponsortrack.io"
                    className="inline-flex items-center gap-1.5 text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
                  >
                    guillaume@sponsortrack.io
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="Our story"
            eyebrowIcon={<Trophy size={13} />}
            title={
              <>
                A roadmap built{" "}
                <em className="italic text-gradient-brand">in the open.</em>
              </>
            }
          />
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div
              aria-hidden
              className="absolute left-4 top-1 bottom-1 w-px bg-gradient-to-b from-[#B8975A]/55 via-[#F4EFE6]/10 to-transparent lg:left-1/2"
            />
            <ul className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <Reveal key={`${m.year}-${m.title}`} delay={i * 0.05}>
                  <li
                    className={`relative grid gap-4 lg:grid-cols-2 lg:gap-10 ${
                      i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute left-4 top-3 block h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#0A1628] bg-gradient-to-br from-[#8B0028] to-[#B8975A] shadow-[0_0_0_4px_rgba(184,151,90,0.18)] lg:left-1/2"
                    />
                    <div
                      className={`pl-12 lg:pl-0 ${i % 2 === 0 ? "lg:text-right" : ""}`}
                    >
                      <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#B8975A]">
                        {m.year}
                      </div>
                      <h4 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[#F4EFE6]">
                        {m.title}
                      </h4>
                    </div>
                    <div className="pl-12 lg:pl-0">
                      <p className="text-[15px] leading-relaxed text-[#F4EFE6]/65">
                        {m.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-[#B8975A]/30 bg-gradient-to-br from-[#0F1A2E] via-[#0A1628] to-[#0F1A2E] p-12 text-center lg:p-16">
            <GradientOrb color="red" size={380} className="-left-10 -top-10" intensity="soft" />
            <GradientOrb color="gold" size={380} className="-right-10 -bottom-10" intensity="soft" />
            <Badge tone="gold" icon={<Sparkles size={12} />}>
              Want to help?
            </Badge>
            <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
              Shape the future of{" "}
              <em className="italic text-gradient-brand">sport sponsorship.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#F4EFE6]/65">
              We&apos;re looking for engineers, sport analysts, ML researchers
              and commercial operators who love sport and love craft.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                Get in touch
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
