"use client";

import { motion, useReducedMotion } from "motion/react";
import { FileSpreadsheet, FileText, Hash, ImageIcon, Mail } from "lucide-react";

const SOURCES = [
  { Icon: FileSpreadsheet, label: "Spreadsheet" },
  { Icon: ImageIcon, label: "Instagram" },
  { Icon: FileText, label: "PDF recap" },
  { Icon: Hash, label: "X mentions" },
  { Icon: Mail, label: "Email" },
];

/**
 * Continues the chaos scene narrative: five source tabs converge from
 * the outer ring positions into a central Sponsorlens dashboard tile.
 * Plays once when the section enters the viewport.
 */
export function PlatformConvergence() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative mx-auto mb-12 hidden h-44 w-full max-w-3xl md:block"
    >
      {SOURCES.map((s, i) => {
        const angle = (i / SOURCES.length) * Math.PI * 2 - Math.PI / 2;
        const r = 160;
        const startX = Math.cos(angle) * r;
        const startY = Math.sin(angle) * (r * 0.45);
        return (
          <motion.div
            key={s.label}
            initial={reduced ? false : { x: startX, y: startY, opacity: 0, scale: 0.7 }}
            whileInView={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
            viewport={{ once: true, margin: "-25%" }}
            transition={{
              duration: 1.2,
              delay: 0.15 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0F1A2E]/85 px-3 py-2 text-[11px] font-medium text-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <s.Icon size={13} className="text-[#7dd3fc]" />
            {s.label}
          </motion.div>
        );
      })}

      <motion.div
        initial={reduced ? false : { scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-25%" }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-2xl border border-[#7dd3fc]/40 bg-gradient-to-br from-[#0F1A2E] to-[#0A1628] p-5 shadow-[0_30px_80px_-25px_rgba(125,211,252,0.45)] backdrop-blur"
      >
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#7dd3fc]">
          <span>Sponsorlens · unified</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-[#2F8F5A]" />
        </div>
        <div className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
          One source of truth.
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {[
            ["Total reach", "284M"],
            ["Logo seconds", "26:14"],
            ["EMV · 30d", "€5.84M"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between text-[11px]"
            >
              <span className="text-white/55">{k}</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-white">
                {v}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
