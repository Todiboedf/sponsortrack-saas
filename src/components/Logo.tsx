import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  withText = true,
  size = 26,
}: {
  className?: string;
  withText?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="SponsorTrack home"
      className={cn(
        "inline-flex items-center gap-2.5 font-[family-name:var(--font-display)] font-semibold tracking-tight text-white",
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
            <stop offset="0" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#st-logo)" />
        <path
          d="M9 20 L13.5 15.5 L17 19 L23 11"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="11" r="1.8" fill="white" />
      </svg>
      {withText && (
        <span className="text-[17px] leading-none">
          Sponsor<span className="text-white/70">Track</span>
        </span>
      )}
    </Link>
  );
}
