"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileSpreadsheet, LineChart, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { DashboardMockup } from "@/components/DashboardMockup";
import { cn } from "@/lib/utils";

type Mode = "before" | "after";

export function BeforeAfterDemo() {
  const [mode, setMode] = useState<Mode>("before");
  const reduced = useReducedMotion();

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        setMode((m) => (m === "before" ? "after" : "before"));
      }
    },
    []
  );

  return (
    <section className="relative py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Before / After"
          eyebrowIcon={<ArrowRight size={13} />}
          title={
            <>
              The same data,{" "}
              <em className="italic text-gradient-brand">
                two very different Mondays.
              </em>
            </>
          }
          description="On the left, what most commercial teams use today. On the right, the platform I shipped to replace it."
        />

        <Reveal delay={0.08}>
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="mb-6 flex justify-center">
              <div
                role="tablist"
                aria-label="Toggle between before and after"
                onKeyDown={onKeyDown}
                className="inline-flex items-center gap-1 rounded-full border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.04] p-1 backdrop-blur"
              >
                {(["before", "after"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    aria-pressed={mode === m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]",
                      mode === m
                        ? "text-[#F4EFE6]"
                        : "text-[#F4EFE6]/55 hover:text-[#F4EFE6]/85"
                    )}
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="ba-pill"
                        className="absolute inset-0 rounded-full bg-[#8B0028] ring-1 ring-[#B8975A]/35"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative inline-flex items-center gap-2">
                      {m === "before" ? (
                        <FileSpreadsheet size={14} />
                      ) : (
                        <LineChart size={14} />
                      )}
                      {m === "before" ? "Before" : "After"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/60 p-3 sm:p-5 lg:p-6">
              <AnimatePresence mode="wait" initial={false}>
                {mode === "before" ? (
                  <motion.div
                    key="before"
                    initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ExcelMock />
                  </motion.div>
                ) : (
                  <motion.div
                    key="after"
                    initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="origin-top sm:scale-95 lg:scale-100">
                      <DashboardMockup />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[12px] text-[#F4EFE6]/55">
              <Badge tone="default" icon={<Sparkles size={11} />}>
                {mode === "before" ? "12 hours every Monday" : "Open. Read. Act."}
              </Badge>
              <span>
                Use{" "}
                <kbd className="rounded border border-[#F4EFE6]/15 bg-[#F4EFE6]/[0.04] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#F4EFE6]/65">
                  ←
                </kbd>{" "}
                <kbd className="rounded border border-[#F4EFE6]/15 bg-[#F4EFE6]/[0.04] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#F4EFE6]/65">
                  →
                </kbd>{" "}
                to toggle.
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ExcelMock() {
  const cols = ["Date", "Platform", "Sponsor", "Reach", "Eng.", "Notes"];
  const rows: string[][] = [
    ["12/10", "IG", "Caja Rural", "284k", "12.4%", "viral?"],
    ["12/10", "IG", "Macron", "92k", "5.1%", "ok"],
    ["12/10", "TikTok", "Caja Rural", "?", "?", "missing"],
    ["12/10", "X", "Macron", "18.2k", "2.8%", "ok"],
    ["13/10", "IG", "Caja Rural", "?", "?", "fix tomorrow"],
    ["13/10", "IG", "Digi", "44k", "3.2%", ""],
    ["13/10", "IG", "Asisa", "12k", "1.8%", "low"],
    ["14/10", "?", "?", "?", "?", "to fill"],
  ];

  return (
    <div className="rounded-xl bg-[#FBF7EF] text-[#0F1A2E] shadow-inner overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[#0F1A2E]/12 bg-[#F4EFE6] px-3 py-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1A7C3F]">
          <FileSpreadsheet size={12} />
          sponsors-Q3-final-FINAL-v3.xlsx
        </span>
        <span className="ml-auto text-[10px] text-[#0F1A2E]/55">
          21 sheets · last edited &ldquo;yesterday&rdquo;
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[12px] tabular-nums">
          <thead className="bg-[#0F1A2E]/[0.04] text-[10px] uppercase tracking-wider text-[#0F1A2E]/65">
            <tr>
              <th className="w-8 px-3 py-2 text-left">#</th>
              {cols.map((c) => (
                <th key={c} className="px-3 py-2 text-left">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-[#0F1A2E]/[0.06]">
                <td className="px-3 py-1.5 text-[#0F1A2E]/45">{i + 1}</td>
                {r.map((cell, j) => {
                  const isQ = cell === "?";
                  const isMissing = cell === "missing";
                  const isTodo = cell === "to fill" || cell === "fix tomorrow";
                  return (
                    <td
                      key={j}
                      className={cn(
                        "px-3 py-1.5",
                        isQ && "bg-[#FFE08A]/55 font-semibold text-[#9A6B00]",
                        isMissing && "text-[#9A0028]",
                        isTodo && "bg-[#FFE08A]/45 italic text-[#9A6B00]"
                      )}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 border-t border-[#0F1A2E]/12 bg-[#F4EFE6] px-3 py-2 text-[10px] text-[#0F1A2E]/55">
        <span className="rounded bg-white px-1.5 py-0.5 font-semibold ring-1 ring-[#0F1A2E]/12">
          Sheet1
        </span>
        <span className="truncate">
          · Sheet2 · Sheet3 · vlookup-help · old-pivots · DO_NOT_TOUCH ·
          report-final · report-final-2
        </span>
        <span className="ml-auto whitespace-nowrap">Saved · 02:14</span>
      </div>
    </div>
  );
}
