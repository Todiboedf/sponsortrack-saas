"use client";

import {
  Component,
  Suspense,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { DetectionOverlay } from "./DetectionOverlay";
import { LiveHUD } from "./LiveHUD";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { BroadcastFX } from "./BroadcastFX";

const PitchCanvas = dynamic(() => import("./PitchCanvas"), {
  ssr: false,
  loading: () => <PosterFrame />,
});

/**
 * True once the browser is past first paint and reports >=768px width.
 * Drives whether we mount the R3F Canvas — under that breakpoint, or
 * before idle, we keep the poster frame in place.
 */
function useShouldLoad3D() {
  const reduced = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    let scheduled = false;
    let cancelIdle: number | undefined;
    const tryLoad = () => {
      if (mq.matches && !scheduled) {
        scheduled = true;
        const ric = (
          window as unknown as {
            requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          }
        ).requestIdleCallback;
        if (ric) {
          cancelIdle = ric(() => setShouldLoad(true), { timeout: 1500 });
        } else {
          setTimeout(() => setShouldLoad(true), 250);
        }
      }
      if (!mq.matches) setShouldLoad(false);
    };
    tryLoad();
    mq.addEventListener("change", tryLoad);
    return () => {
      mq.removeEventListener("change", tryLoad);
      if (cancelIdle !== undefined) {
        const cic = (
          window as unknown as {
            cancelIdleCallback?: (id: number) => void;
          }
        ).cancelIdleCallback;
        cic?.(cancelIdle);
      }
    };
  }, [reduced]);

  return shouldLoad;
}

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
  const shouldLoad3D = useShouldLoad3D();

  /* DEBUG instrumentation — chore(hero/debug). Logs canvas-element counts
   * and visibility metrics from the host DOM at three checkpoints so we
   * can tell whether the canvas ever lands in the document, what size
   * it ends up at, and whether anything else is competing for the same
   * mount point. Filter the console with the prefix "[SL/" to see only
   * our diagnostic traces. Remove once the root cause is identified. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log("[SL/hero] BroadcastHero mounted", {
      reduced: !!reduced,
      shouldLoad3D,
      userAgent: navigator.userAgent,
      innerSize: { w: window.innerWidth, h: window.innerHeight },
      dpr: window.devicePixelRatio,
    });

    const sampleCanvases = (label: string) => {
      const all = document.querySelectorAll("canvas");
      const info = Array.from(all).map((c, i) => ({
        i,
        attrWH: [c.width, c.height],
        clientWH: [c.clientWidth, c.clientHeight],
        visible: c.offsetParent !== null,
        parent: c.parentElement?.tagName ?? null,
        gl2: !!c.getContext("webgl2"),
      }));
      console.log(`[SL/hero] canvases @${label}`, all.length, info);
    };

    sampleCanvases("t=0");
    const t1 = setTimeout(() => sampleCanvases("t=1s"), 1000);
    const t2 = setTimeout(() => sampleCanvases("t=3s"), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced, shouldLoad3D]);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* 3D layer — gated by viewport (>=md) and reduced-motion */}
      <div className="absolute inset-0 -z-10">
        {!reduced && shouldLoad3D ? (
          <Suspense fallback={<PosterFrame />}>
            <PitchErrorBoundary>
              <PitchCanvas />
            </PitchErrorBoundary>
          </Suspense>
        ) : (
          <PosterFrame />
        )}
      </div>

      {/* CSS broadcast vignette — DoF + vignette are faked here so we
          can keep the GPU bill on Bloom alone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(10,22,40,0) 0%, rgba(10,22,40,0.18) 45%, rgba(10,22,40,0.55) 70%, rgba(6,13,24,0.92) 100%)",
        }}
      />
      {/* Soft top-edge focus pull (DoF cue) */}
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

      {/* Atmospheric broadcast FX: subtle scan-line + bottom crawl ticker */}
      <BroadcastFX />

      {/* REC badge — top-right, broadcast camera cue */}
      <div className="pointer-events-none absolute right-5 top-5 z-10 hidden lg:block">
        <RecBadge reduced={!!reduced} />
      </div>

      {/* Live logo detection bounding boxes (HTML overlay above the Canvas) */}
      <DetectionOverlay />

      {/* Live HUD pill pinned to the bottom-left of the hero */}
      <div className="pointer-events-none absolute bottom-12 left-4 right-4 z-10 flex justify-start sm:bottom-14 sm:left-8">
        <div className="pointer-events-auto">
          <LiveHUD />
        </div>
      </div>

      {/* Headline + CTAs */}
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

/* -------------------------------------------------------------------------- */
/* DEBUG error boundary — chore(hero/debug)                                   */
/* Surfaces any error thrown inside <Canvas> so we can see in DevTools        */
/* whether the blank canvas is the result of an exception in R3F / Three /    */
/* postprocessing / Pitch tree.                                               */
/* -------------------------------------------------------------------------- */

class PitchErrorBoundary extends Component<
  { children: ReactNode },
  { err: Error | null }
> {
  state: { err: Error | null } = { err: null };

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error("[SL/error] PitchCanvas threw", {
      message: err.message,
      name: err.name,
      stack: err.stack,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.err) {
      return (
        <div
          role="alert"
          className="absolute inset-0 flex items-center justify-center p-6 text-center"
          style={{
            background: "rgba(7, 15, 30, 0.92)",
            color: "#ef4444",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 12,
          }}
        >
          [SL/error] PitchCanvas threw — {this.state.err.message}
        </div>
      );
    }
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/* REC badge — broadcast camera "recording" cue at top-right                  */
/* -------------------------------------------------------------------------- */

function RecBadge({ reduced }: { reduced: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-[3px] border border-white/[0.06] bg-[rgba(7,15,30,0.7)] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
      <motion.span
        aria-hidden
        className="inline-flex h-1.5 w-1.5 rounded-full bg-[#ef4444]"
        animate={
          reduced
            ? { opacity: 1 }
            : { opacity: [1, 0.25, 1] }
        }
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
