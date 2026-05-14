"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Detection = {
  id: string;
  brand: string;
  asset: string;
  timestamp: string;
  /** Position as percentages of the hero box, top-left corner. */
  left: string;
  top: string;
  width: string;
  height: string;
};

const DETECTIONS: Detection[] = [
  {
    id: "jersey",
    brand: "Caja Rural",
    asset: "jersey",
    timestamp: "23:14",
    left: "44%",
    top: "55%",
    width: "120px",
    height: "32px",
  },
  {
    id: "led-left",
    brand: "Macron",
    asset: "LED",
    timestamp: "23:42",
    left: "12%",
    top: "62%",
    width: "180px",
    height: "28px",
  },
  {
    id: "led-right",
    brand: "Digi",
    asset: "LED",
    timestamp: "24:08",
    left: "70%",
    top: "62%",
    width: "150px",
    height: "28px",
  },
  {
    id: "led-back",
    brand: "Asisa",
    asset: "LED",
    timestamp: "24:31",
    left: "36%",
    top: "70%",
    width: "200px",
    height: "26px",
  },
  {
    id: "backdrop",
    brand: "Cervezas El Águila",
    asset: "backdrop",
    timestamp: "25:02",
    left: "62%",
    top: "30%",
    width: "180px",
    height: "44px",
  },
  {
    id: "armband",
    brand: "BBVA",
    asset: "armband",
    timestamp: "25:24",
    left: "40%",
    top: "50%",
    width: "80px",
    height: "30px",
  },
];

const STAGGER_MS = 3500;
const HOLD_MS = 4000;
const FADE_IN_MS = 200;
const FADE_OUT_MS = 500;

/**
 * HTML overlay that simulates live logo detections appearing on the
 * broadcast feed. Each detection apparates one after the other with a
 * 3.5s offset, holds for 4s, then fades out. After all six have come
 * and gone the sequence reboots.
 *
 * Honours `prefers-reduced-motion`: shows all six boxes statically and
 * skips the timing loop entirely.
 */
export function DetectionOverlay({ paused = false }: { paused?: boolean }) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  const cycle = DETECTIONS.length * STAGGER_MS + FADE_OUT_MS;

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
          return <Box key={`${d.id}-${Math.floor(tick / cycle)}`} detection={d} />;
        })}
      </AnimatePresence>
    </div>
  );
}

function Box({ detection: d }: { detection: Detection }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: FADE_IN_MS / 1000, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: FADE_IN_MS / 1000, ease: [0.16, 1, 0.3, 1] },
      }}
      className="absolute rounded-md"
      style={{
        left: d.left,
        top: d.top,
        width: d.width,
        height: d.height,
        border: "2px dashed #7dd3fc",
      }}
    >
      <Label detection={d} />
    </motion.div>
  );
}

function BoxStatic({ detection: d }: { detection: Detection }) {
  return (
    <div
      className="absolute rounded-md"
      style={{
        left: d.left,
        top: d.top,
        width: d.width,
        height: d.height,
        border: "2px dashed rgba(125,211,252,0.65)",
      }}
    >
      <Label detection={d} />
    </div>
  );
}

function Label({ detection: d }: { detection: Detection }) {
  return (
    <span
      className="absolute -top-7 left-0 inline-flex whitespace-nowrap items-center rounded bg-[rgba(15,23,42,0.85)] px-2 py-1 text-[11px] font-medium text-white backdrop-blur-md"
      style={{ letterSpacing: "0.01em" }}
    >
      <span>{d.brand}</span>
      <span className="mx-1 text-[#7dd3fc]">·</span>
      <span className="text-[#7dd3fc]">{d.asset}</span>
      <span className="mx-1 text-white/50">·</span>
      <span className="text-white/70 font-mono tabular-nums">{d.timestamp}</span>
    </span>
  );
}
