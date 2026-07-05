import { cn } from "@/lib/utils";

export type FeatureStatus = "live" | "dev" | "planned";

/**
 * Honesty badge for feature bullets: what ships today (`live`), what is
 * being built (`dev`), what is on the public roadmap (`planned`).
 * `tone` follows the surface: "dark" on navy sections, "light" on the
 * cream pricing matrix.
 */
const LABELS: Record<FeatureStatus, string> = {
  live: "Live",
  dev: "In development",
  planned: "Planned",
};

const DARK: Record<FeatureStatus, string> = {
  live: "border-[#2F8F5A]/45 bg-[#2F8F5A]/[0.12] text-[#86C9A4]",
  dev: "border-[#B8975A]/45 bg-[#B8975A]/[0.10] text-[#D8BC85]",
  planned: "border-[#F4EFE6]/20 bg-[#F4EFE6]/[0.04] text-[#F4EFE6]/55",
};

const LIGHT: Record<FeatureStatus, string> = {
  live: "border-[#1F7A52]/40 bg-[#1F7A52]/[0.08] text-[#1F7A52]",
  dev: "border-[#7A6134]/40 bg-[#B8975A]/[0.12] text-[#7A6134]",
  planned: "border-[#0F1A2E]/25 bg-[#0F1A2E]/[0.04] text-[#0F1A2E]/55",
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
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-1.5 py-[1.5px] align-middle font-[family-name:var(--font-mono)] text-[9px] font-semibold uppercase tracking-[0.14em]",
        (tone === "dark" ? DARK : LIGHT)[status],
        className
      )}
    >
      {LABELS[status]}
    </span>
  );
}
