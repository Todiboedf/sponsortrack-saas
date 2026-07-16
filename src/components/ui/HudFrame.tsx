import { cn } from "@/lib/utils";

type Tone = "volt" | "dim";

const TONE: Record<Tone, { corner: string; label: string; edge: string }> = {
  volt: {
    corner: "border-[#D8FF3E]",
    label: "bg-[#D8FF3E] text-[#0A1628]",
    edge: "border-[#D8FF3E]/25",
  },
  dim: {
    corner: "border-[#F4EFE6]/60",
    label: "bg-[#F4EFE6] text-[#0A1628]",
    edge: "border-[#F4EFE6]/15",
  },
};

const CORNERS = [
  "left-[-2px] top-[-2px] border-l-2 border-t-2",
  "right-[-2px] top-[-2px] border-r-2 border-t-2",
  "left-[-2px] bottom-[-2px] border-l-2 border-b-2",
  "right-[-2px] bottom-[-2px] border-r-2 border-b-2",
] as const;

/**
 * The signature motif: a computer-vision bounding box. Square edges, bold
 * corner marks, and a mono tag — exactly how the model annotates a sponsor
 * on broadcast footage. Server component; no animation (the hero draws its
 * own via the .hud-lock CSS class).
 */
export function HudFrame({
  children,
  label,
  detail,
  tone = "volt",
  className,
  labelClassName,
}: {
  children: React.ReactNode;
  /** Mono uppercase tag rendered like a detection label, top-left. */
  label?: string;
  /** Optional right-aligned mono detail on the label row (e.g. a confidence). */
  detail?: string;
  tone?: Tone;
  className?: string;
  labelClassName?: string;
}) {
  const t = TONE[tone];
  return (
    <div className={cn("relative border", t.edge, className)}>
      {CORNERS.map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn("absolute h-[16px] w-[16px]", pos, t.corner)}
        />
      ))}
      {label && (
        <span
          className={cn(
            "absolute -top-[11px] left-4 z-10 inline-flex items-center gap-2 px-1.5 py-[2px] font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.14em]",
            t.label,
            labelClassName
          )}
        >
          {label}
        </span>
      )}
      {detail && (
        <span className="absolute -top-[10px] right-4 z-10 inline-flex items-center bg-[#0A1628] px-1.5 py-[2px] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#F4EFE6]/60 ring-1 ring-[#F4EFE6]/15">
          {detail}
        </span>
      )}
      {children}
    </div>
  );
}
