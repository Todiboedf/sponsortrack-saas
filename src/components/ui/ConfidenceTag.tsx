import { cn } from "@/lib/utils";

/**
 * Mono detection chip, exactly like the model output in the demo footage:
 * volt background, dark text, `LABEL · 0.91`. Used wherever a real number
 * gets annotated with the detection language.
 */
export function ConfidenceTag({
  label,
  value,
  className,
}: {
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 bg-[#D8FF3E] px-1.5 py-[2px] font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0A1628]",
        className
      )}
    >
      {label}
      {value && <span className="font-medium">· {value}</span>}
    </span>
  );
}
