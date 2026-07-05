"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DetectionBox } from "@/components/ui/DetectionBox";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedHeadline } from "./AnimatedHeadline";

/**
 * Hero built around the one thing nobody else can show: our model's real
 * output on a recorded CA Osasuna – Alavés highlight. No mock dashboard,
 * no fabricated numbers — the detection loop (public/demo/detection-loop.mp4)
 * is the visual, framed by the DetectionBox identity motif with a discreet
 * scan-line sweep (the motion signature for broadcast visuals).
 */
export function BroadcastHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-radial opacity-25"
      />

      <Container className="flex w-full flex-col items-center text-center">
        <div className="max-w-4xl">
          <AnimatedHeadline />
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-[17px] text-slate-300 sm:text-lg">
          Sponsor exposure, measured daily. Reported Mondays 07:00.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            href="/demo"
            size="lg"
            variant="primary"
            rightIcon={<ArrowRight size={16} />}
          >
            See it live
          </Button>
          <Button href="/contact" size="lg" variant="ghost">
            Start free trial
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[#F4EFE6]/55">
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

        <div className="mt-14 w-full max-w-5xl">
          <DetectionBox
            label="Real detections · CA Osasuna – Alavés"
            tone="red"
            delay={0.2}
            className="bg-[#060D18] shadow-[0_40px_90px_-40px_rgba(139,0,40,0.45)]"
          >
            <div className="relative overflow-hidden">
              <video
                src="/demo/detection-loop.mp4"
                poster="/demo/detection-poster.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Looped clip of the model detecting sponsor logos on a recorded Osasuna match highlight"
                className="block w-full"
                ref={(el) => {
                  // React can omit the muted attribute in SSR markup; set it
                  // explicitly so mobile autoplay policies are satisfied.
                  // Under prefers-reduced-motion the poster frame stands in.
                  if (el) {
                    el.muted = true;
                    if (!reduced) el.play().catch(() => {});
                  }
                }}
              />
              {!reduced && <ScanSweep />}
            </div>
          </DetectionBox>
          <div className="mt-4 flex flex-col items-center justify-between gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#F4EFE6]/45 sm:flex-row sm:text-left">
            <span>
              Real footage. Real detections. CA Osasuna, measured as a public
              study.
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[#B8975A]/80">
              22s loop · recorded broadcast
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Discreet scan-line sweeping the broadcast visual — the only ambient
 * motion in the hero. Removed entirely under prefers-reduced-motion. */
function ScanSweep() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-10 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(184,151,90,0.55) 35%, rgba(184,151,90,0.8) 50%, rgba(184,151,90,0.55) 65%, transparent 100%)",
        boxShadow: "0 0 14px rgba(184,151,90,0.3)",
        mixBlendMode: "screen",
      }}
      initial={{ top: "-2%", opacity: 0 }}
      animate={{ top: ["-2%", "102%"], opacity: [0, 0.5, 0.5, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 5,
        times: [0, 0.08, 0.92, 1],
      }}
    />
  );
}
