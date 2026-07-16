import { cn } from "@/lib/utils";
import { Chyron } from "./Chyron";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  /** Transitional no-op while pages migrate to the chyron kicker. */
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

/**
 * Section heading: chyron kicker + Archivo headline + one supporting
 * paragraph. Left-aligned by default — the broadcast grid reads as an
 * editorial column, not centered slides.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
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
          <Chyron rule={align === "left"}>{eyebrow}</Chyron>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-[family-name:var(--font-archivo)] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-[#F4EFE6] sm:text-[42px]",
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
              "text-pretty text-base text-[#F4EFE6]/65 sm:text-lg",
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
