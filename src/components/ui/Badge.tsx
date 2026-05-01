import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Badge({
  className,
  children,
  icon,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  tone?: "default" | "gold" | "red" | "cream";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur",
        tone === "default" &&
          "border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.04] text-[#F4EFE6]/85",
        tone === "gold" &&
          "border border-[#B8975A]/40 bg-[#B8975A]/[0.10] text-[#D8BC85]",
        tone === "red" &&
          "border border-[#8B0028]/45 bg-[#8B0028]/[0.12] text-[#F4EFE6]",
        tone === "cream" &&
          "border border-[#0F1A2E]/12 bg-[#0F1A2E]/[0.04] text-[#0F1A2E]",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            tone === "cream" ? "text-[#8B0028]" : "text-[#B8975A]"
          )}
        >
          {icon}
        </span>
      )}
      {children}
    </div>
  );
}
