"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { DetectionOverlay } from "./DetectionOverlay";
import { LiveHUD } from "./LiveHUD";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { BroadcastFX } from "./BroadcastFX";

export function BroadcastHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background — 3D pitch was here, now replaced by a soft radial
          gradient. The full split-screen + dashboard mockup lands in a
          follow-up commit. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 70%, rgba(31,122,82,0.35) 0%, rgba(10,22,40,0.85) 65%, #060D18 100%)",
        }}
      />

      {/* CSS broadcast vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(10,22,40,0) 0%, rgba(10,22,40,0.18) 45%, rgba(10,22,40,0.55) 70%, rgba(6,13,24,0.92) 100%)",
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

      <BroadcastFX />

      <div className="pointer-events-none absolute right-5 top-5 z-10 hidden lg:block">
        <RecBadge reduced={!!reduced} />
      </div>

      <DetectionOverlay />

      <div className="pointer-events-none absolute bottom-12 left-4 right-4 z-10 flex justify-start sm:bottom-14 sm:left-8">
        <div className="pointer-events-auto">
          <LiveHUD />
        </div>
      </div>

      <Container className="relative flex h-full max-w-5xl flex-col items-start justify-center pt-32 pb-32">
        <Badge tone="red" icon={<Sparkles size={12} />}>
          Live · Inside the Broadcast
        </Badge>
        <div className="mt-6 max-w-3xl">
          <AnimatedHeadline />
        </div>
        <p className="mt-6 max-w-xl text-pretty text-[17px] text-slate-300 sm:text-lg">
          Built for the clubs, leagues and brands who measure what matters.
        </p>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
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
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#F4EFE6]/55">
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
