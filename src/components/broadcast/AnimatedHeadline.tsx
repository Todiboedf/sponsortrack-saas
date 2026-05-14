"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Hero headline with letter-by-letter reveal. Two lines: a plain white
 * "Sponsor intelligence," and an italic cyan "lived in real time." that
 * sets the broadcast-data tone.
 *
 * Under prefers-reduced-motion the letters render immediately at their
 * final position — no staircase.
 */
export function AnimatedHeadline() {
  const reduced = useReducedMotion();
  const line1 = "Sponsor intelligence,";
  const line2 = "lived in real time.";

  const charVariants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03, delayChildren: 0.1 },
        },
      }}
      className="font-[family-name:var(--font-inter)] text-balance text-[44px] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[80px]"
      aria-label={`${line1} ${line2}`}
    >
      <span className="block">
        {line1.split("").map((char, i) => (
          <motion.span
            key={`l1-${i}`}
            variants={charVariants}
            style={{ display: "inline-block" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </span>
      <span className="mt-1 block italic text-[#7dd3fc]">
        {line2.split("").map((char, i) => (
          <motion.span
            key={`l2-${i}`}
            variants={charVariants}
            style={{ display: "inline-block" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}
