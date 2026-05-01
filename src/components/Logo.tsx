import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  withText = true,
  size = 28,
  variant = "dark",
}: {
  className?: string;
  withText?: boolean;
  size?: number;
  variant?: "dark" | "cream";
}) {
  const text = variant === "cream" ? "text-[#0F1A2E]" : "text-[#F4EFE6]";
  const muted = variant === "cream" ? "text-[#0F1A2E]/55" : "text-[#F4EFE6]/60";
  return (
    <Link
      href="/"
      aria-label="SponsorTrack home"
      className={cn(
        "inline-flex items-center gap-2.5 font-[family-name:var(--font-display)] font-semibold tracking-tight",
        text,
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="st-logo" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8B0028" />
            <stop offset="1" stopColor="#B8975A" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="7" fill="url(#st-logo)" />
        <path
          d="M9 20 L13.5 15.5 L17 19 L23 11"
          stroke="#F4EFE6"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="11" r="1.8" fill="#F4EFE6" />
      </svg>
      {withText && (
        <span className="text-[18px] leading-none italic">
          Sponsor<span className={muted}>Track</span>
        </span>
      )}
    </Link>
  );
}
