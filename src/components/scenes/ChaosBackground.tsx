"use client";

import { motion, useReducedMotion } from "motion/react";
import { FileSpreadsheet, FileText, Hash, Image as ImageIcon, Mail } from "lucide-react";

type Tab = {
  id: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  /** CSS transform on the floating tab (translate3d + rotation). */
  initial: { x: string; y: string; rot: number; scale: number };
  drift: { x: string[]; y: string[]; rot: number[] };
  duration: number;
  delay: number;
};

const TABS: Tab[] = [
  {
    id: "sheet-a",
    title: "Q2_sponsors_v17.xlsx",
    body: "EMV by quarter · 32 rows · last edit 3 days ago",
    Icon: FileSpreadsheet,
    initial: { x: "-22%", y: "8%", rot: -8, scale: 0.95 },
    drift: { x: ["-22%", "-18%", "-22%"], y: ["8%", "11%", "8%"], rot: [-8, -6, -8] },
    duration: 12,
    delay: 0,
  },
  {
    id: "ig",
    title: "Instagram · Caja Rural",
    body: "Reels 14d · 124k impressions",
    Icon: ImageIcon,
    initial: { x: "60%", y: "12%", rot: 6, scale: 0.92 },
    drift: { x: ["60%", "62%", "60%"], y: ["12%", "9%", "12%"], rot: [6, 8, 6] },
    duration: 14,
    delay: 1,
  },
  {
    id: "pdf",
    title: "macron_q1_recap.pdf",
    body: "12 pages · 4.2 MB",
    Icon: FileText,
    initial: { x: "70%", y: "60%", rot: -5, scale: 0.9 },
    drift: { x: ["70%", "67%", "70%"], y: ["60%", "63%", "60%"], rot: [-5, -3, -5] },
    duration: 13,
    delay: 2,
  },
  {
    id: "tweet",
    title: "X · Digi mentions · 24h",
    body: "Eng. 0.42 · sentiment +0.21",
    Icon: Hash,
    initial: { x: "-20%", y: "62%", rot: 4, scale: 0.94 },
    drift: { x: ["-20%", "-17%", "-20%"], y: ["62%", "65%", "62%"], rot: [4, 6, 4] },
    duration: 11,
    delay: 1.5,
  },
  {
    id: "email",
    title: "Re: Renewal — Asisa",
    body: "Sent · awaiting reply since Tue",
    Icon: Mail,
    initial: { x: "40%", y: "-5%", rot: -3, scale: 0.93 },
    drift: { x: ["40%", "42%", "40%"], y: ["-5%", "-2%", "-5%"], rot: [-3, -1, -3] },
    duration: 15,
    delay: 0.5,
  },
];

/**
 * Decorative chaos backdrop for the "Sport runs on spreadsheets"
 * section. Renders 5 stylised tabs (spreadsheet, Instagram, PDF, X,
 * email recap) drifting subtly behind the problem cards.
 *
 * Reduced motion: static layout with no drift.
 */
export function ChaosBackground() {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1] hidden overflow-hidden md:block"
      style={{ perspective: "1200px" }}
    >
      {TABS.map((t) => (
        <motion.div
          key={t.id}
          initial={{
            x: t.initial.x,
            y: t.initial.y,
            rotate: t.initial.rot,
            scale: t.initial.scale,
            opacity: 0,
          }}
          whileInView={{
            x: reduced ? t.initial.x : t.drift.x,
            y: reduced ? t.initial.y : t.drift.y,
            rotate: reduced ? t.initial.rot : t.drift.rot,
            scale: t.initial.scale,
            opacity: 0.55,
          }}
          viewport={{ once: false, margin: "-20%" }}
          transition={
            reduced
              ? { duration: 0.4 }
              : {
                  x: { duration: t.duration, repeat: Infinity, ease: "easeInOut", delay: t.delay },
                  y: { duration: t.duration, repeat: Infinity, ease: "easeInOut", delay: t.delay },
                  rotate: { duration: t.duration, repeat: Infinity, ease: "easeInOut", delay: t.delay },
                  opacity: { duration: 1.2, delay: t.delay * 0.3 },
                }
          }
          className="absolute w-[260px] rounded-xl border border-white/10 bg-[#0F1A2E]/85 p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
            <t.Icon size={13} />
            Source
          </div>
          <div className="mt-2 truncate text-[13px] font-medium text-white">
            {t.title}
          </div>
          <div className="mt-1 truncate text-[11px] text-white/55">{t.body}</div>
          <div className="mt-3 flex gap-1">
            <span className="h-1 flex-1 rounded-full bg-white/[0.08]" />
            <span className="h-1 flex-1 rounded-full bg-white/[0.08]" />
            <span className="h-1 flex-1 rounded-full bg-white/[0.08]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
