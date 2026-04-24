import type { Metadata } from "next";
import {
  ArrowRight,
  Flag,
  Globe2,
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
    "SponsorTrack is building the data layer modern sports sponsorships need — one that measures every post, match, and impression.",
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
    body: "Every single engineer handles support for two hours a week. You won’t hear ‘I’ll escalate it’ — you’ll hear ‘I’m shipping it.’",
  },
  {
    icon: <Shield size={18} />,
    title: "Data you’d trust with your kids",
    body: "EU-hosted by default, never used to train shared models, and deletable with one click. Your sponsors deserve that.",
  },
];

const team = [
  {
    name: "Lena Moreau",
    role: "Co-founder & CEO",
    bio: "Ex-partnerships at UEFA and Ligue 1. Built the first in-house media value model at a French top-flight club.",
  },
  {
    name: "Rohan Desai",
    role: "Co-founder & CTO",
    bio: "Previously ML lead on Meta Reality Labs. Wrote the computer-vision core of SponsorTrack in a Lisbon co-working space.",
  },
  {
    name: "Camille Tran",
    role: "VP Product",
    bio: "Product at Figma and Stripe. Believes good software should disappear behind the work — especially in sport.",
  },
  {
    name: "Ahmed Saleh",
    role: "VP Sports",
    bio: "Former Head of Commercial at a top-3 MENA club. Closes contracts, breaks down strategies, plays five-a-side.",
  },
  {
    name: "Ingrid Olafsson",
    role: "Head of ML",
    bio: "PhD in sports analytics, Chalmers. Leads our broadcast-vision team and publishes an incomprehensible amount.",
  },
  {
    name: "Theo Santini",
    role: "Head of Design",
    bio: "Designed apps used by 60M+ users. Thinks dark mode is the only acceptable mode in a football analytics tool.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "A prototype in a backpack",
    body: "Lena and Rohan meet at a partnership summit. A weekend hack turns into a working logo-detection demo two months later.",
  },
  {
    year: "2025",
    title: "First ten design partners",
    body: "Clubs from four countries sign on as design partners — the prototype starts tracking real matches every weekend.",
  },
  {
    year: "2025",
    title: "Seed round closed",
    body: "€6.5M led by a European sports-tech fund, with angels from Ligue 1, La Liga, and two Bundesliga CMOs.",
  },
  {
    year: "2026",
    title: "SponsorTrack v1 public launch",
    body: "The platform opens to all clubs and brands. Match-day computer vision hits general availability.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
        <GradientOrb color="violet" size={560} className="-left-40 -top-10" />
        <GradientOrb color="blue" size={520} className="-right-40 top-40" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal>
              <Badge icon={<Sparkles size={13} />}>About</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[72px]">
                We build the{" "}
                <span className="text-gradient-brand">data layer</span> sport has been missing.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-pretty text-lg text-white/60 sm:text-xl">
                Sponsorship is a $100B industry running on gut feel and PDF recaps.
                We think it deserves better — specifically, a modern platform that turns
                every match, post and impression into evidence.
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
                <Badge icon={<Flag size={13} />}>Our mission</Badge>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
                  Make every euro of sponsorship measurable —{" "}
                  <span className="text-gradient-brand">and defensible.</span>
                </h2>
                <div className="prose-dark mt-6 max-w-xl">
                  <p>
                    Sport is the last giant industry where ten-figure budgets move
                    on the strength of a slide deck. Brands can’t prove their ROI,
                    clubs can’t prove their value, and both sides leave money on
                    the table every single season.
                  </p>
                  <p>
                    We’re changing that by building a measurement layer that
                    understands sport the way the people inside it do — contracts,
                    matchdays, jersey deals, LED rotations, and viral posts — and
                    turns them into numbers a CFO can sign off on.
                  </p>
                  <p>
                    If you care about sport and you care about craft, you’ll
                    probably like what we’re building.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/contact" rightIcon={<ArrowRight size={15} />}>
                    Join us
                  </Button>
                  <Button href="/features" variant="outline">
                    What we build
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <GradientOrb color="violet" size={380} className="-left-10 -top-10 opacity-60" />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "€2.4B", label: "Media value analysed" },
                    { stat: "48", label: "Leagues / federations" },
                    { stat: "5,200", label: "Matches observed live" },
                    { stat: "94%", label: "Sponsor renewal rate" },
                    { stat: "11 ×", label: "Faster than a spreadsheet" },
                    { stat: "EU-first", label: "Data residency policy" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-5"
                    >
                      <div className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                        {s.stat}
                      </div>
                      <div className="mt-1 text-[12px] text-white/55">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
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
                <span className="text-gradient-brand">non-negotiable.</span>
              </>
            }
            description="We write them here because it’s easier to hold ourselves (and us to hold each other) accountable in public."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <Card className="h-full p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] text-white/80 ring-1 ring-white/10">
                    {v.icon}
                  </div>
                  <h4 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-white">
                    {v.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {v.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="The team"
            eyebrowIcon={<Users size={13} />}
            title={
              <>
                Builders, operators,{" "}
                <span className="text-gradient-brand">sports obsessives.</span>
              </>
            }
            description="A distributed team across Paris, Lisbon, Madrid and Reykjavik. Founding team with 40+ combined years in sport, ML and product."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.04}>
                <Card className="h-full p-6">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#7C3AED]/50 to-[#3B82F6]/40 text-sm font-semibold text-white ring-1 ring-white/10">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-white">
                        {t.name}
                      </div>
                      <div className="text-[12px] text-white/50">{t.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {t.bio}
                  </p>
                </Card>
              </Reveal>
            ))}
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
                From Lisbon co-working to{" "}
                <span className="text-gradient-brand">48 leagues.</span>
              </>
            }
          />
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div
              aria-hidden
              className="absolute left-4 top-1 bottom-1 w-px bg-gradient-to-b from-[#7C3AED]/60 via-white/10 to-transparent lg:left-1/2"
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
                      className="absolute left-4 top-3 block h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#0A0A12] bg-gradient-to-br from-[#A78BFA] to-[#3B82F6] shadow-[0_0_0_4px_rgba(124,58,237,0.15)] lg:left-1/2"
                    />
                    <div className={`pl-12 lg:pl-0 ${i % 2 === 0 ? "lg:text-right" : ""}`}>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#A78BFA]">
                        {m.year}
                      </div>
                      <h4 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                        {m.title}
                      </h4>
                    </div>
                    <div className="pl-12 lg:pl-0">
                      <p className="text-[15px] leading-relaxed text-white/60">{m.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#120822] via-[#07070B] to-[#081226] p-12 text-center lg:p-16">
            <GradientOrb color="violet" size={380} className="-left-10 -top-10 opacity-70" />
            <GradientOrb color="blue" size={380} className="-right-10 -bottom-10 opacity-60" />
            <Badge icon={<Globe2 size={13} />}>We’re hiring</Badge>
            <h2 className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
              Want to help shape the future of sports sponsorship?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              We’re looking for engineers, sports analysts, ML researchers and
              commercial operators who love sport and love craft.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" rightIcon={<ArrowRight size={16} />}>
                See open roles
              </Button>
              <Button href="/contact" size="lg" variant="outline">
                Say hi
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
