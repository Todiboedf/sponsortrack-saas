"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const START_MINUTE = 24;
const START_SECOND = 31;
const START_DETECTIONS = 73;
const START_EMV_K = 412;

/**
 * Live HUD pill, pinned at the bottom-left of the hero. Communicates
 * the "match is happening right now" feel by ticking the detections
 * count and EMV at the same cadence as the bounding-box overlay
 * (every 4 seconds) and advancing the minute clock once a real second.
 *
 * The "LIVE" pulse runs on a 1.5s loop (scale 1 → 1.3 → 1 + opacity
 * 1 → 0 → 0 wave from the outer ring) per brief spec.
 *
 * Under prefers-reduced-motion: shows the same data frozen at the
 * start values, so the HUD remains an informative anchor rather than
 * a moving target.
 */
export function LiveHUD() {
  const reduced = useReducedMotion();
  const [minute, setMinute] = useState(START_MINUTE);
  const [second, setSecond] = useState(START_SECOND);
  const [detections, setDetections] = useState(START_DETECTIONS);
  const [emv, setEmv] = useState(START_EMV_K);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setSecond((s) => {
        if (s >= 59) {
          setMinute((m) => m + 1);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setDetections((n) => n + 1);
      setEmv((e) => e + 2 + Math.floor(Math.random() * 4));
    }, 4000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-[rgba(7,15,30,0.72)] px-4 py-2 text-[12px] font-medium text-white/90 backdrop-blur-md shadow-[0_18px_40px_-20px_rgba(184, 151, 90,0.35)] sm:gap-4 sm:px-5 sm:py-2.5 sm:text-[13px]"
    >
      <span className="inline-flex items-center gap-2 uppercase tracking-[0.22em] text-white">
        <span className="relative inline-flex h-2 w-2 items-center justify-center">
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute inline-flex h-2 w-2 rounded-full bg-[#ef4444]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.8, 1],
              }}
            />
          )}
          <motion.span
            aria-hidden
            className="relative inline-flex h-2 w-2 rounded-full bg-[#ef4444]"
            animate={
              reduced
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.06, 1],
                  }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        </span>
        Live
      </span>
      <span className="text-slate-500">·</span>
      <span className="font-[family-name:var(--font-mono)] tabular-nums text-white">
        {minute.toString().padStart(2, "0")}:{second.toString().padStart(2, "0")}
      </span>
      <span className="text-slate-500">·</span>
      <span className="hidden sm:inline">El Sadar Stadium</span>
      <span className="hidden text-slate-500 sm:inline">·</span>
      <span className="font-[family-name:var(--font-mono)] tabular-nums text-white">
        {detections}
      </span>
      <span className="text-white/55">detections</span>
      <span className="text-slate-500">·</span>
      <span className="text-[#B8975A]">EMV</span>
      <span className="font-[family-name:var(--font-mono)] tabular-nums text-white">
        +€{emv}k
      </span>
    </div>
  );
}
