import { cn } from "@/lib/utils";

/**
 * Broadcast lower-third section label — the site's replacement for pill
 * kickers. A volt tick, an expanded-caps mono-spaced label, and a thin
 * rule running off to the right, like a chyron bar on match coverage.
 */
export function Chyron({
  children,
  className,
  tone = "volt",
  rule = true,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "volt" | "ink";
  rule?: boolean;
}) {
  const isInk = tone === "ink";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn("h-3.5 w-1", isInk ? "bg-[#0F1A2E]" : "bg-[#D8FF3E]")}
      />
      <span
        className={cn(
          "font-expanded text-[11px] font-semibold",
          isInk ? "text-[#0F1A2E]/70" : "text-[#F4EFE6]/75"
        )}
      >
        {children}
      </span>
      {rule && (
        <span
          aria-hidden
          className={cn(
            "h-px flex-1 max-w-24",
            isInk ? "bg-[#0F1A2E]/20" : "bg-[#F4EFE6]/15"
          )}
        />
      )}
    </div>
  );
}
