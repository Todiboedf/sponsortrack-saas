"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium " +
  "transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none " +
  "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]";

const variants: Record<Variant, string> = {
  primary:
    "text-[#F4EFE6] bg-[#8B0028] " +
    "shadow-[0_10px_36px_-12px_rgba(139,0,40,0.65),inset_0_1px_0_rgba(244,239,230,0.18)] " +
    "hover:bg-[#A00030] hover:shadow-[0_14px_46px_-10px_rgba(139,0,40,0.85),inset_0_1px_0_rgba(244,239,230,0.22)]",
  secondary:
    "text-[#F4EFE6] bg-[#F4EFE6]/[0.06] border border-[#F4EFE6]/12 backdrop-blur " +
    "hover:bg-[#F4EFE6]/[0.10] hover:border-[#F4EFE6]/22",
  ghost:
    "text-[#F4EFE6]/85 hover:text-[#F4EFE6] hover:bg-[#F4EFE6]/[0.06]",
  outline:
    "text-[#F4EFE6] border border-[#B8975A]/40 bg-transparent hover:bg-[#B8975A]/[0.08] hover:border-[#B8975A]/70",
  gold:
    "text-[#0A1628] bg-[#B8975A] hover:bg-[#D8BC85] " +
    "shadow-[0_10px_30px_-12px_rgba(184,151,90,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]",
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
