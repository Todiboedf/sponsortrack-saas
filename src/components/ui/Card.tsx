import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-[#F4EFE6]/[0.09] bg-[#0E1D33]/80 p-6",
        "transition-colors duration-200 ease-out hover:border-[#F4EFE6]/[0.18]",
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
        "relative rounded-lg border border-[#0F1A2E]/10 bg-[#FBF7EF] p-6",
        "transition-colors duration-200 hover:border-[#0F1A2E]/25",
        className
      )}
      {...props}
    />
  );
}
