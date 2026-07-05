import Image from "next/image";
import { ArrowRight, ScanSearch } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DetectionBox } from "@/components/ui/DetectionBox";
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
    <section className="relative py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <Badge tone="gold" icon={<ScanSearch size={12} />}>
                Public study
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl">
                Osasuna,{" "}
                <em className="italic text-gradient-brand">
                  our study ground.
                </em>
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
              <DetectionBox
                label="Weekly report · Mondays 07:00"
                tone="gold"
                className="bg-[#0F1A2E] p-2.5"
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
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0F1A2E] to-transparent"
                  />
                </div>
              </DetectionBox>
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#F4EFE6]/45">
                Page 1 of the real weekly report, generated from this study.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {measures.map((m, i) => (
            <DetectionBox
              key={m.tag}
              label={m.tag}
              tone={i === 2 ? "red" : "gold"}
              delay={i * 0.12}
              className="bg-[#0F1A2E]/60"
            >
              <div className="p-6 pt-7">
                <div className="font-[family-name:var(--font-mono)] text-[42px] font-semibold leading-none tracking-tight text-[#F4EFE6] tabular-nums">
                  <CountUp
                    to={m.value.to}
                    prefix={m.value.prefix}
                    suffix={m.value.suffix}
                    duration={1.2}
                    delay={0.35 + i * 0.12}
                  />
                </div>
                <p className="mt-3.5 text-[14px] leading-relaxed text-[#F4EFE6]/65">
                  {m.body}
                </p>
              </div>
            </DetectionBox>
          ))}
        </div>
      </Container>
    </section>
  );
}
