"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

type Options = {
  duration?: number;
  delay?: number;
  decimals?: number;
  start?: boolean;
};

/**
 * Animate a number from 0 (or a starting value supplied via `from`) to
 * `target` over `duration` seconds. Returns the live formatted string so
 * consumers can drop it straight into JSX.
 *
 * Respects `prefers-reduced-motion` by jumping to the target instantly.
 */
export function useAnimatedCounter(
  target: number,
  { duration = 1.5, delay = 0, decimals = 0, start = true }: Options = {}
) {
  const reduced = useReducedMotion();
  const value = useMotionValue(0);
  const [display, setDisplay] = useState<number>(reduced ? target : 0);

  useEffect(() => {
    const unsub = value.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [value]);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      value.set(target);
      setDisplay(target);
      return;
    }
    const controls = animate(value, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [target, duration, delay, reduced, value, start]);

  return {
    value: display,
    formatted: display.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  };
}
