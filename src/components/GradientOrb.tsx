import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  color?: "violet" | "blue" | "cyan";
  size?: number;
};

const palettes: Record<NonNullable<Props["color"]>, string> = {
  violet: "rgba(124, 58, 237, 0.55)",
  blue: "rgba(59, 130, 246, 0.45)",
  cyan: "rgba(34, 211, 238, 0.35)",
};

export function GradientOrb({ className, color = "violet", size = 520 }: Props) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 blur-[110px]", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${palettes[color]} 0%, transparent 70%)`,
      }}
    />
  );
}
