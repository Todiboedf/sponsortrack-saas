import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Badge({
  className,
  children,
  icon,
  ...props
}: HTMLAttributes<HTMLDivElement> & { icon?: ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/80 backdrop-blur",
        className
      )}
      {...props}
    >
      {icon && <span className="text-[#A78BFA]">{icon}</span>}
      {children}
    </div>
  );
}
