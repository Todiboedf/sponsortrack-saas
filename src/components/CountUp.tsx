"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
  delay?: number;
};

function format(n: number, decimals: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const value = useMotionValue(from);
  // Server HTML carries the final value (no "0" flash pre-hydration, and
  // crawlers / no-JS readers see real numbers). The count-up is a purely
  // client-side enhancement that starts once the stat scrolls into view.
  const [display, setDisplay] = useState(format(to, decimals, locale));

  useEffect(() => {
    const unsub = value.on("change", (v) => setDisplay(format(v, decimals, locale)));
    return () => unsub();
  }, [value, decimals, locale]);

  useEffect(() => {
    if (!inView || reduced) return;
    value.set(from);
    const controls = animate(value, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
