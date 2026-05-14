"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Detection = {
  id: string;
  serial: string;
  brand: string;
  asset: string;
  timestamp: string;
  /** Position as percentages of the hero box, top-left corner. */
  left: string;
  top: string;
  width: string;
  height: string;
};

/**
 * Positions are calibrated for the right half of the hero viewport —
 * the left half is reserved for the headline + CTAs. All `left` values
 * stay >= 50% so the boxes never overlap the type column on common
 * desktop widths (1280–1920px). Array order matches the chronological
 * sequence of timestamps so the appearance loop ticks the minute clock
 * forward from 23:14 to 25:24.
 */
const DETECTIONS: Detection[] = [
  {
    id: "jersey",
    serial: "DT-0237",
    brand: "Caja Rural",
    asset: "jersey",
    timestamp: "23:14",
    left: "58%",
    top: "56%",
    width: "132px",
    height: "36px",
  },
  {
    id: "led-left",
    serial: "DT-0238",
    brand: "Macron",
    asset: "LED",
    timestamp: "23:42",
    left: "51%",
    top: "68%",
    width: "168px",
    height: "30px",
  },
  {
    id: "led-right",
    serial: "DT-0239",
    brand: "Digi",
    asset: "LED",
    timestamp: "24:08",
    left: "80%",
    top: "68%",
    width: "150px",
    height: "30px",
  },
  {
    id: "led-back",
    serial: "DT-0240",
    brand: "Asisa",
    asset: "LED",
    timestamp: "24:31",
    left: "60%",
    top: "80%",
    width: "200px",
    height: "28px",
  },
  {
    id: "backdrop",
    serial: "DT-0241",
    brand: "Cervezas El Águila",
    asset: "backdrop",
    timestamp: "25:02",
    left: "72%",
    top: "27%",
    width: "195px",
    height: "48px",
  },
  {
    id: "armband",
    serial: "DT-0242",
    brand: "BBVA",
    asset: "armband",
    timestamp: "25:24",
    left: "66%",
    top: "48%",
    width: "76px",
    height: "28px",
  },
];

const STAGGER_MS = 3500;
const HOLD_MS = 4000;
const FADE_IN_MS = 220;

/**
 * HTML overlay simulating live logo detections appearing on the
 * broadcast feed. Each detection scans in with broadcast-style corner
 * brackets every 3.5s and holds for 4s. After all six have come and
 * gone, the sequence reboots.
 *
 * Honours `prefers-reduced-motion`: shows all six boxes statically
 * with no scan-in animation.
 */
export function DetectionOverlay({ paused = false }: { paused?: boolean }) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  const cycle = DETECTIONS.length * STAGGER_MS + 500;

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setTick((t) => (t + 1) % cycle);
    }, 250);
    return () => clearInterval(id);
  }, [reduced, paused, cycle]);

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {DETECTIONS.map((d) => (
          <BoxStatic key={d.id} detection={d} />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <AnimatePresence>
        {DETECTIONS.map((d, i) => {
          const enter = i * STAGGER_MS;
          const exit = enter + HOLD_MS;
          const visible = tick >= enter && tick < exit;
          if (!visible) return null;
          return <BoxAnimated key={`${d.id}-${Math.floor(tick / cycle)}`} detection={d} />;
        })}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Animated detection — broadcast lock-on with corner brackets                */
/* -------------------------------------------------------------------------- */

function BoxAnimated({ detection: d }: { detection: Detection }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: FADE_IN_MS / 1000, ease: [0.16, 1, 0.3, 1] },
      }}
      className="absolute"
      style={{
        left: d.left,
        top: d.top,
        width: d.width,
        height: d.height,
      }}
    >
      <Brackets animated />
      <Label detection={d} animated />
    </motion.div>
  );
}

function BoxStatic({ detection: d }: { detection: Detection }) {
  return (
    <div
      className="absolute"
      style={{
        left: d.left,
        top: d.top,
        width: d.width,
        height: d.height,
      }}
    >
      <Brackets />
      <Label detection={d} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Brackets — four L-shape corner markers (broadcast TV style)                */
/* -------------------------------------------------------------------------- */

const CORNER_LEN = 14;
const CORNER_THICK = 2;
const CORNER_COLOR = "#7dd3fc";

function Brackets({ animated = false }: { animated?: boolean }) {
  const corners = [
    { key: "tl", x: -1, y: -1, h: false, v: false }, // top-left
    { key: "tr", x: 1, y: -1, h: true, v: false }, // top-right
    { key: "bl", x: -1, y: 1, h: false, v: true }, // bottom-left
    { key: "br", x: 1, y: 1, h: true, v: true }, // bottom-right
  ];
  return (
    <>
      {/* Outer halo (light cyan glow) */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[3px]"
        style={{
          boxShadow: "0 0 18px -2px rgba(125,211,252,0.35)",
        }}
      />
      {corners.map((c, i) => (
        <motion.div
          key={c.key}
          initial={
            animated
              ? { opacity: 0, x: c.x * 10, y: c.y * 10 }
              : false
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.32,
            delay: 0.04 + i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute"
          style={{
            left: c.x === -1 ? "-1px" : "auto",
            right: c.x === 1 ? "-1px" : "auto",
            top: c.y === -1 ? "-1px" : "auto",
            bottom: c.y === 1 ? "-1px" : "auto",
            width: CORNER_LEN,
            height: CORNER_LEN,
          }}
        >
          {/* Horizontal stroke */}
          <span
            aria-hidden
            className="absolute"
            style={{
              [c.h ? "right" : "left"]: 0,
              [c.v ? "bottom" : "top"]: 0,
              width: CORNER_LEN,
              height: CORNER_THICK,
              background: CORNER_COLOR,
              boxShadow: "0 0 6px rgba(125,211,252,0.55)",
            } as React.CSSProperties}
          />
          {/* Vertical stroke */}
          <span
            aria-hidden
            className="absolute"
            style={{
              [c.h ? "right" : "left"]: 0,
              [c.v ? "bottom" : "top"]: 0,
              width: CORNER_THICK,
              height: CORNER_LEN,
              background: CORNER_COLOR,
              boxShadow: "0 0 6px rgba(125,211,252,0.55)",
            } as React.CSSProperties}
          />
        </motion.div>
      ))}
      {/* Center crosshair tick — appears with a beat after the corners */}
      <motion.span
        aria-hidden
        initial={animated ? { opacity: 0, scale: 0 } : false}
        animate={{ opacity: 0.65, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: "transparent",
          border: `1px solid ${CORNER_COLOR}`,
        }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Label                                                                       */
/* -------------------------------------------------------------------------- */

function Label({
  detection: d,
  animated = false,
}: {
  detection: Detection;
  animated?: boolean;
}) {
  return (
    <motion.span
      initial={animated ? { opacity: 0, y: -4 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute -top-[26px] left-0 inline-flex items-center gap-1 whitespace-nowrap rounded bg-[rgba(7,15,30,0.86)] px-2 py-[3px] text-[10.5px] font-medium text-white/95 backdrop-blur-md ring-1 ring-[#7dd3fc]/20"
      style={{ letterSpacing: "0.01em" }}
    >
      <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#7dd3fc]/90">
        {d.serial}
      </span>
      <span className="text-white/30">|</span>
      <span className="text-white">{d.brand}</span>
      <span className="text-[#7dd3fc]/70">·</span>
      <span className="text-white/80">{d.asset}</span>
      <span className="text-white/30">·</span>
      <span className="font-[family-name:var(--font-mono)] tabular-nums text-white/70">
        {d.timestamp}
      </span>
    </motion.span>
  );
}
