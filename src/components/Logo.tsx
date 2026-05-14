import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Sponsorlens wordmark + lens mark.
 *
 * Mark: outer dashed ring, inner solid ring, center dot — all stroked in
 * `currentColor` so the mark tints with whatever text color surrounds it.
 * On hover the outer ring sweeps 360° via CSS keyframes (no JS / motion
 * dependency) and `prefers-reduced-motion: reduce` halts the animation.
 */
export function Logo({
  className,
  withText = true,
  size = 22,
  variant = "dark",
  href = "/",
  ariaLabel = "Sponsorlens home",
}: {
  className?: string;
  withText?: boolean;
  size?: number;
  variant?: "dark" | "cream";
  href?: string | null;
  ariaLabel?: string;
}) {
  const text = variant === "cream" ? "text-[#0F1A2E]" : "text-[#F4EFE6]";
  const inner = (
    <>
      <LensMark size={size} />
      {withText && (
        <span className="text-[18px] leading-none">Sponsorlens</span>
      )}
    </>
  );

  const sharedClass = cn(
    "group inline-flex items-center gap-2.5 font-[family-name:var(--font-inter)] font-semibold tracking-[-0.02em]",
    text,
    className
  );

  if (!href) {
    return (
      <span className={sharedClass} aria-label={ariaLabel}>
        {inner}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={sharedClass}>
      {inner}
    </Link>
  );
}

export function LensMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("lens-mark shrink-0", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2 1.5"
        opacity="0.6"
        className="lens-mark-outer origin-center"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
