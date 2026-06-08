"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Atmospheric broadcast-FX layered over the hero canvas:
 *  - A faint horizontal scan-line sweep that traverses the hero every
 *    ~7 seconds (subtle CRT / capture-card cue).
 *  - A bottom crawl ticker with cycled detection / status messages
 *    scrolling right-to-left, the way a live sports broadcast would
 *    crawl its lower banner.
 *
 * Both honour prefers-reduced-motion and disappear entirely under it.
 */
export function BroadcastFX() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <>
      <ScanLine />
      <CrawlTicker />
    </>
  );
}

function ScanLine() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-[2] hidden h-px lg:block"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(184, 151, 90,0.55) 30%, rgba(184, 151, 90,0.85) 50%, rgba(184, 151, 90,0.55) 70%, transparent 100%)",
        boxShadow: "0 0 16px rgba(184, 151, 90,0.35)",
        mixBlendMode: "screen",
      }}
      initial={{ top: "-2%", opacity: 0 }}
      animate={{
        top: ["-2%", "102%", "102%"],
        opacity: [0, 0.55, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.85, 1],
        repeatDelay: 4,
      }}
    />
  );
}

const TICKER_ITEMS: { kind: "tag" | "data" | "alert"; text: string }[] = [
  { kind: "tag", text: "LIVE FEED" },
  { kind: "data", text: "CA OSASUNA  vs  ATHLETIC CLUB" },
  { kind: "data", text: "MIN 24 · EL SADAR STADIUM" },
  { kind: "alert", text: "BBVA · armband detected" },
  { kind: "data", text: "MACRON · LED rotation confirmed" },
  { kind: "data", text: "Caja Rural · jersey · +0.4s" },
  { kind: "tag", text: "EMV +€412K" },
  { kind: "data", text: "73 detections so far" },
  { kind: "alert", text: "Cervezas El Águila · backdrop · 25:02" },
  { kind: "data", text: "Digi · sideline LED · 24:08" },
  { kind: "tag", text: "Sponsorlens" },
  { kind: "data", text: "feed integrity 99.6% · 30 fps" },
];

function CrawlTicker() {
  // Two identical rows side by side, animated together by 50% of their
  // combined width, so the marquee loops seamlessly.
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden h-7 overflow-hidden border-t border-white/[0.04] bg-[rgba(7,15,30,0.55)] backdrop-blur-md lg:block"
    >
      <motion.div
        className="absolute top-0 flex h-full items-center whitespace-nowrap will-change-transform"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((row) => (
          <div key={row} className="flex items-center">
            {TICKER_ITEMS.map((item, i) => (
              <span
                key={`${row}-${i}`}
                className="mx-5 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.18em]"
              >
                {item.kind === "tag" ? (
                  <span className="inline-flex items-center gap-1 rounded-[3px] bg-[#B8975A]/15 px-1.5 py-0.5 text-[#B8975A]">
                    {item.text}
                  </span>
                ) : item.kind === "alert" ? (
                  <span className="text-white/85">
                    <span className="text-[#ef4444]">▶</span> {item.text}
                  </span>
                ) : (
                  <span className="text-white/65">{item.text}</span>
                )}
                <span className="text-white/15">·</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
