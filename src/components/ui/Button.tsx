"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

/* Rectangular, chyron-like CTAs. Primary is the one volt moment per
 * viewport; everything else stays quiet cream-on-navy. */
const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium " +
  "transition-colors duration-150 ease-out active:translate-y-px disabled:opacity-50 disabled:pointer-events-none " +
  "rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8FF3E]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#D8FF3E] text-[#0A1628] font-semibold hover:bg-[#E9FF80] " +
    "shadow-[0_0_0_1px_rgba(216,255,62,0.35),0_8px_28px_-12px_rgba(216,255,62,0.45)]",
  secondary:
    "text-[#F4EFE6] bg-[#F4EFE6]/[0.06] border border-[#F4EFE6]/15 " +
    "hover:bg-[#F4EFE6]/[0.10] hover:border-[#F4EFE6]/25",
  ghost: "text-[#F4EFE6]/85 hover:text-[#F4EFE6] hover:bg-[#F4EFE6]/[0.06]",
  outline:
    "text-[#F4EFE6] border border-[#F4EFE6]/25 bg-transparent " +
    "hover:border-[#D8FF3E]/60 hover:text-[#F4EFE6] hover:bg-[#D8FF3E]/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    href,
    external,
    leftIcon,
    rightIcon,
    children,
    ...props
  },
  ref
) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {content}
    </button>
  );
});
