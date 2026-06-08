import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/70 p-6",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:border-[#B8975A]/35 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01]",
        "hover:shadow-[0_22px_70px_-30px_rgba(139,0,40,0.55),0_0_40px_-12px_rgba(184, 151, 90,0.30)]",
        className
      )}
      {...props}
    />
  );
}

export function CardCream({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#0F1A2E]/10 bg-[#FBF7EF] p-6",
        "transition-colors duration-300 hover:border-[#0F1A2E]/25",
        className
      )}
      {...props}
    />
  );
}

export function CardGlow({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B8975A]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        className
      )}
      {...props}
    />
  );
}
