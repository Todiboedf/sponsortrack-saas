import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  color?: "red" | "gold" | "navy" | "cream";
  size?: number;
  intensity?: "soft" | "default" | "strong";
};

const palettes: Record<NonNullable<Props["color"]>, string> = {
  red: "rgba(139, 0, 40, 0.45)",
  gold: "rgba(184, 151, 90, 0.32)",
  navy: "rgba(20, 34, 56, 0.65)",
  cream: "rgba(244, 239, 230, 0.10)",
};

const blurs: Record<NonNullable<Props["intensity"]>, string> = {
  soft: "blur-[140px] opacity-60",
  default: "blur-[110px] opacity-80",
  strong: "blur-[90px] opacity-100",
};

export function GradientOrb({
  className,
  color = "red",
  size = 520,
  intensity = "default",
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10",
        blurs[intensity],
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${palettes[color]} 0%, transparent 70%)`,
      }}
    />
  );
}
