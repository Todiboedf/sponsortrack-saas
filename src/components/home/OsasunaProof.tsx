import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Chyron } from "@/components/ui/Chyron";
import { Button } from "@/components/ui/Button";
import { HudFrame } from "@/components/ui/HudFrame";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The proof section: three measured numbers from the public CA Osasuna
 * study, framed as detections, plus page 1 of the real weekly report.
 * Every figure here is measured, none is invented — that is the pitch.
 */
const measures: Array<{
  tag: string;
  value: { to: number; prefix?: string; suffix?: string };
  body: string;
}> = [
  {
    tag: "Social · TikTok vs IG",
    value: { to: 14, suffix: "×" },
    body: "The club's TikTok audience vs Instagram — 5.8M vs 415k followers. Most sponsorship decks still only count Instagram.",
  },
  {
    tag: "Owned media · 90 days",
    value: { to: 41, prefix: "−", suffix: "%" },
    body: "Sponsor posts underperform organic content across 283 posts in 90 days — a gap you can only work on once it is measured.",
  },
  {
    tag: "Broadcast · CV model",
    value: { to: 62, suffix: "%" },
    body: "Kosner visible for 62% of a 3-minute match highlight — 120.5 seconds of screen time, measured frame by frame.",
  },
];

export function OsasunaProof() {
  return (
    <section className="relative py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <Chyron>Public study · not a client</Chyron>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-[#F4EFE6] sm:text-[42px]">
                Osasuna, our study ground.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-pretty text-lg text-[#F4EFE6]/65">
                We measure CA Osasuna&apos;s sponsor exposure from public data,
                the club&apos;s social accounts and a recorded broadcast
                highlight, and publish what we find.{" "}
                <span className="text-[#F4EFE6]">
                  Not a client — a public-data study.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <Button
                  href="/demo"
                  variant="outline"
                  rightIcon={<ArrowRight size={15} />}
                >
                  Explore the live data
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure>
              <HudFrame
                label="Weekly report · Mondays 07:00"
                tone="dim"
                className="bg-[#0E1D33] p-2.5"
              >
                <div className="relative aspect-[7/6] overflow-hidden">
                  <Image
                    src="/proof/weekly-report-p1.png"
                    alt="Page 1 of the real Sponsorlens weekly sponsor report on CA Osasuna"
                    fill
                    sizes="(min-width: 1024px) 42vw, 92vw"
                    className="object-cover object-top"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0E1D33] to-transparent"
                  />
                </div>
              </HudFrame>
              <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#F4EFE6]/45">
                Page 1 of the real weekly report, generated from this study.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {measures.map((m, i) => (
            <Reveal key={m.tag} delay={i * 0.08}>
              <HudFrame label={m.tag} className="h-full bg-[#0E1D33]/60">
                <div className="p-6 pt-7">
                  <div className="font-[family-name:var(--font-mono)] text-[42px] font-semibold leading-none tracking-tight text-[#F4EFE6] tabular-nums">
                    <CountUp
                      to={m.value.to}
                      prefix={m.value.prefix}
                      suffix={m.value.suffix}
                      duration={0.8}
                      delay={0.15 + i * 0.08}
                    />
                  </div>
                  <p className="mt-3.5 text-[14px] leading-relaxed text-[#F4EFE6]/65">
                    {m.body}
                  </p>
                </div>
              </HudFrame>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
