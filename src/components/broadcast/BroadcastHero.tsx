"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { DetectionOverlay } from "./DetectionOverlay";
import { LiveHUD } from "./LiveHUD";
import { AnimatedHeadline } from "./AnimatedHeadline";

const PitchCanvas = dynamic(() => import("./PitchCanvas"), {
  ssr: false,
  loading: () => <PosterFrame />,
});

/**
 * Static fallback shown while the 3D scene is loading, on viewports
 * below the mobile breakpoint, and for users who prefer reduced
 * motion. Pure CSS so it carries no JS cost.
 */
function PosterFrame() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 70%, rgba(31,122,82,0.45) 0%, rgba(10,22,40,0.85) 65%, #060D18 100%)",
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10, 22, 40, 0.55) 60%, rgba(10, 22, 40, 0.85) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[60%] h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(244,239,230,0.45), transparent)",
        }}
      />
    </div>
  );
}

export function BroadcastHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* 3D layer */}
      <div className="absolute inset-0 -z-10">
        {reduced ? (
          <PosterFrame />
        ) : (
          <Suspense fallback={<PosterFrame />}>
            <PitchCanvas />
          </Suspense>
        )}
      </div>

      {/* CSS broadcast-camera tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(10,22,40,0) 0%, rgba(10,22,40,0.35) 50%, rgba(6,13,24,0.85) 100%)",
        }}
      />

      {/* Live logo detection bounding boxes (HTML overlay above the Canvas) */}
      <DetectionOverlay />

      {/* Live HUD pill pinned to the bottom-left of the hero */}
      <div className="pointer-events-none absolute bottom-6 left-4 right-4 z-10 flex justify-start sm:bottom-8 sm:left-8">
        <div className="pointer-events-auto">
          <LiveHUD />
        </div>
      </div>

      {/* Headline + CTAs */}
      <Container className="relative flex h-full max-w-5xl flex-col items-start justify-center pt-32 pb-24">
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
