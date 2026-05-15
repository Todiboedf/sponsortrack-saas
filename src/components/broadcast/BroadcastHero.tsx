"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { LiveHUD } from "./LiveHUD";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { BroadcastFX } from "./BroadcastFX";
import { HeroDashboard } from "./HeroDashboard";
import { AuroraBackground } from "./AuroraBackground";

export function BroadcastHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Aurora — 4 drifting blurred orbs (cyan / violet / gold / red) on
          pure CSS keyframes; replaces the flat navy background. */}
      <AuroraBackground />

      {/* CSS broadcast vignette + top blur cue, layered above aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(10,22,40,0) 0%, rgba(10,22,40,0.18) 50%, rgba(10,22,40,0.45) 75%, rgba(6,13,24,0.85) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-[4] h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,13,24,0.7) 0%, rgba(6,13,24,0) 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />

      {/* Atmospheric scan-line + bottom crawl ticker */}
      <BroadcastFX />

      {/* REC badge — top-right, broadcast camera cue */}
      <div className="pointer-events-none absolute right-5 top-5 z-10 hidden lg:block">
        <RecBadge reduced={!!reduced} />
      </div>

      <Container className="relative grid max-w-7xl grid-cols-1 items-center gap-10 pt-28 pb-24 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-12 lg:pt-32">
        {/* LEFT — headline / CTAs / trust line / LiveHUD */}
        <div className="flex flex-col items-start justify-center md:col-span-1 lg:col-span-7">
          <Badge tone="red" icon={<Sparkles size={12} />}>
            Live · Inside the Broadcast
          </Badge>
          <div className="mt-6 max-w-3xl">
            <AnimatedHeadline />
          </div>
          <p className="mt-6 max-w-xl text-pretty text-[17px] text-slate-300 sm:text-lg">
            Built for the clubs, leagues and brands who measure what matters.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Button
              href="/contact"
              size="lg"
              variant="cyan"
              rightIcon={<ArrowRight size={16} />}
            >
              Start free trial
            </Button>
            <Button href="/demo" size="lg" variant="ghost">
              Watch live demo
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#F4EFE6]/55">
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="text-[#B8975A]" />
              14-day free trial
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="text-[#B8975A]" />
              No credit card required
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="text-[#B8975A]" />
              EU data residency
            </span>
          </div>
          <div className="mt-8">
            <LiveHUD />
          </div>
        </div>

        {/* RIGHT — interactive dashboard mockup
            Mobile: stacked under the headline, capped at max-w-md so it
            stays readable. Tablet: takes its column with no cap. Desktop:
            5 of 12 cols + a 1° counter-clockwise tilt to suggest a screen
            posed on the desk, with a cyan drop-shadow glow projected
            behind. */}
        <div className="relative mx-auto w-full max-w-md md:col-span-1 md:max-w-none md:mx-0 lg:col-span-5 lg:pl-2">
          <div
            className="relative lg:[transform:rotate(-1deg)]"
            style={{
              filter:
                "drop-shadow(0 24px 60px rgba(125,211,252,0.22)) drop-shadow(0 30px 80px rgba(139,0,40,0.18))",
            }}
          >
            <HeroDashboard />
          </div>
        </div>
      </Container>
    </section>
  );
}

function RecBadge({ reduced }: { reduced: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-[3px] border border-white/[0.06] bg-[rgba(7,15,30,0.7)] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
      <motion.span
        aria-hidden
        className="inline-flex h-1.5 w-1.5 rounded-full bg-[#ef4444]"
        animate={reduced ? { opacity: 1 } : { opacity: [1, 0.25, 1] }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        }
      />
      Rec · cam 04
    </div>
  );
}
