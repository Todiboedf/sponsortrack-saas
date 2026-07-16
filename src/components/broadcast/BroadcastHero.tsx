"use client";

import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HudFrame } from "@/components/ui/HudFrame";

/**
 * Hero built around the one thing nobody else can show: the model's real
 * output on a recorded CA Osasuna – Alavés highlight. The headline renders
 * instantly (no animation gates text); the only motion is the signature
 * HUD bracket drawing around "Measured," ~300ms after paint, pure CSS.
 * The detection video sits beside the headline, on the fold.
 */
export function BroadcastHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#050B14] pt-28 pb-14 lg:pt-36 lg:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-60"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Copy column — renders instantly */}
          <div>
            <p className="font-expanded text-[11px] font-semibold text-[#F4EFE6]/55">
              Sponsor intelligence · social live · broadcast CV in development
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-archivo)] text-[52px] font-bold leading-[1.0] tracking-[-0.025em] text-[#F4EFE6] sm:text-[68px] lg:text-[72px] xl:text-[80px]">
              <span className="relative inline-block px-3 py-1 -mx-3">
                {/* HUD brackets lock onto the brand word ~300ms after paint
                    (CSS-only; reduced-motion renders them static). */}
                <span aria-hidden className="hud-lock absolute inset-0 block">
                  <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[#D8FF3E]" />
                  <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[#D8FF3E]" />
                  <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[#D8FF3E]" />
                  <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[#D8FF3E]" />
                </span>
                <span
                  aria-hidden
                  className="hud-tag absolute -top-[13px] left-3 z-10 inline-flex items-center bg-[#D8FF3E] px-1.5 py-[2px] font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0A1628]"
                >
                  measured · 0.98
                </span>
                Measured,
              </span>
              <span className="block text-[#F4EFE6]/60">not estimated.</span>
            </h1>
            <p className="mt-6 max-w-md text-pretty text-[17px] text-[#F4EFE6]/70 sm:text-lg">
              Sponsor exposure for clubs, leagues and brands — measured daily,
              reported every Monday at 07:00.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/demo" size="lg" rightIcon={<ArrowRight size={16} />}>
                Open the live demo
              </Button>
              <Button href="/contact" size="lg" variant="outline">
                Start free trial
              </Button>
            </div>

            <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#F4EFE6]/45">
              14-day trial · no credit card · EU data residency
            </p>
          </div>

          {/* The real thing: model output on recorded broadcast */}
          <div>
            <HudFrame
              label="Real detections · Osasuna – Alavés"
              detail="22s loop · recorded"
              className="bg-[#050B14]"
            >
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
            </HudFrame>
            <div className="mt-3 flex items-center justify-between gap-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#F4EFE6]/45">
              <span>Real footage · real detections · public study</span>
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span aria-hidden className="h-1.5 w-1.5 bg-[#D8FF3E]" />
                logo detection POC
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
