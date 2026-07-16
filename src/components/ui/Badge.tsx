import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Quiet mono chip for inline metadata (plan names, small counts). Section
 * kickers use Chyron instead — this stays for the few inline spots where
 * a bordered chip is genuinely the right shape.
 */
export function Badge({
  className,
  children,
  icon,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  tone?: "default" | "volt" | "cream";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[4px] border px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em]",
        tone === "default" &&
          "border-[#F4EFE6]/15 bg-[#F4EFE6]/[0.04] text-[#F4EFE6]/80",
        tone === "volt" && "border-[#D8FF3E]/40 bg-[#D8FF3E]/[0.08] text-[#D8FF3E]",
        tone === "cream" && "border-[#0F1A2E]/15 bg-[#0F1A2E]/[0.04] text-[#0F1A2E]/80",
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn(tone === "cream" ? "text-[#0F1A2E]/60" : "text-[#D8FF3E]")}>
          {icon}
        </span>
      )}
      {children}
    </div>
  );
}
