import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Sponsorlens wordmark + reticle mark.
 *
 * Mark: four corner brackets locking onto a center dot — the detection
 * bounding box that is the site's signature motif. Brackets stroke in
 * `currentColor` so the mark tints with surrounding text; the dot is
 * always detection volt.
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
      <ReticleMark size={size} />
      {withText && (
        <span className="font-[family-name:var(--font-archivo)] text-[18px] font-semibold leading-none tracking-[-0.02em]">
          Sponsorlens
        </span>
      )}
    </>
  );

  const sharedClass = cn(
    "group inline-flex items-center gap-2.5",
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

export function ReticleMark({
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
      className={cn("shrink-0", className)}
    >
      {/* corner brackets */}
      <path d="M3 8V3H8" stroke="currentColor" strokeWidth="2.4" />
      <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2.4" />
      <path d="M21 16V21H16" stroke="currentColor" strokeWidth="2.4" />
      <path d="M8 21H3V16" stroke="currentColor" strokeWidth="2.4" />
      {/* detection dot */}
      <circle cx="12" cy="12" r="3" fill="#D8FF3E" />
    </svg>
  );
}
