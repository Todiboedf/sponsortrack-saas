"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Hero headline with letter-by-letter reveal. Two lines: a plain white
 * "Sponsor intelligence," and an italic cyan "lived in real time." that
 * sets the broadcast-data tone.
 *
 * Words are wrapped in `inline-block whitespace-nowrap` shells so the
 * per-character `inline-block` motion spans inside can stagger without
 * the browser breaking a word mid-letter (the "Sponsor in / telligence"
 * regression we kept seeing on narrow viewports).
 *
 * Under prefers-reduced-motion the characters render immediately at
 * their final position, no staircase.
 */
export function AnimatedHeadline() {
  const reduced = useReducedMotion();
  const line1 = "Sponsor intelligence,";
  const line2 = "lived in real time.";

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
      style={{ wordBreak: "keep-all" }}
    >
      <span className="block">
        <Line text={line1} reduced={!!reduced} />
      </span>
      <span className="mt-1 block italic text-[#B8975A]">
        <Line text={line2} reduced={!!reduced} prefix="l2" />
      </span>
    </motion.h1>
  );
}

function Line({
  text,
  reduced,
  prefix = "l1",
}: {
  text: string;
  reduced: boolean;
  prefix?: string;
}) {
  const charVariants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const words = text.split(" ");

  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={`${prefix}-w-${wi}`}>
          <span
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              verticalAlign: "top",
            }}
          >
            {word.split("").map((char, ci) => (
              <motion.span
                key={`${prefix}-w-${wi}-c-${ci}`}
                variants={charVariants}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
