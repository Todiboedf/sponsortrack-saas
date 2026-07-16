import { cn } from "@/lib/utils";

export type FeatureStatus = "live" | "dev" | "planned";

/**
 * Honesty badge for feature bullets: what ships today (`live`), what is
 * being built (`dev`), what is on the public roadmap (`planned`).
 * Semantics are non-negotiable; the styling is the quiet mono status
 * system — volt / amber / slate, square, outline only.
 * `tone` follows the surface: "dark" on navy, "light" on cream paper.
 */
const LABELS: Record<FeatureStatus, string> = {
  live: "Live",
  dev: "In development",
  planned: "Planned",
};

const DARK: Record<FeatureStatus, string> = {
  live: "border-[#D8FF3E]/50 text-[#D8FF3E]",
  dev: "border-[#E8A33D]/50 text-[#E8A33D]",
  planned: "border-[#8B98A9]/40 text-[#8B98A9]",
};

const LIGHT: Record<FeatureStatus, string> = {
  live: "border-[#4A6600]/50 text-[#3F5800]",
  dev: "border-[#8A5A14]/45 text-[#8A5A14]",
  planned: "border-[#0F1A2E]/30 text-[#0F1A2E]/60",
};

export function FeatureBadge({
  status,
  tone = "dark",
  className,
}: {
  status: FeatureStatus;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap border px-1.5 py-[1.5px] align-middle font-[family-name:var(--font-mono)] text-[9px] font-semibold uppercase tracking-[0.14em]",
        (tone === "dark" ? DARK : LIGHT)[status],
        className
      )}
    >
      {LABELS[status]}
    </span>
  );
}
