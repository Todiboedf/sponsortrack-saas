"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium " +
  "transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none " +
  "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070B]";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#3B82F6] " +
    "shadow-[0_10px_40px_-12px_rgba(124,58,237,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] " +
    "hover:shadow-[0_16px_50px_-10px_rgba(124,58,237,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] " +
    "hover:brightness-110",
  secondary:
    "text-white bg-white/[0.06] border border-white/10 backdrop-blur " +
    "hover:bg-white/[0.1] hover:border-white/20",
  ghost:
    "text-white/80 hover:text-white hover:bg-white/[0.06]",
  outline:
    "text-white border border-white/15 bg-transparent hover:bg-white/[0.04] hover:border-white/25",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-[15px]",
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
