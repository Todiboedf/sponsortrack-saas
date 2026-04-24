import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  className,
  align = "center",
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Badge icon={eyebrowIcon}>{eyebrow}</Badge>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[54px] lg:leading-[1.05]",
            align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "text-pretty text-base text-white/60 sm:text-lg",
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
