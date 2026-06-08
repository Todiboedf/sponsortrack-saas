import type { ReactNode } from "react";

/**
 * Wraps the pricing + final CTA tail of the home in a warm "golden
 * hour over the stadium" backdrop. Pure CSS, a layered gradient that
 * suggests evening light spilling onto a pitch silhouette without
 * pinning a 3D Canvas to this section.
 *
 * Two layers:
 * 1. Warm radial bloom (gold + soft red) at the top centre of the wrap.
 * 2. A faint pitch-line silhouette near the bottom, drawn with a
 *    horizon gradient + a centred ellipse hint, so the pricing block
 *    feels grounded against a field rather than floating on navy.
 */
export function GoldenHourBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% 0%, rgba(255, 167, 38, 0.18) 0%, rgba(255, 167, 38, 0.04) 35%, transparent 60%), radial-gradient(ellipse 60% 35% at 50% 100%, rgba(139, 0, 40, 0.18) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(31, 122, 82, 0.10) 40%, rgba(31, 122, 82, 0.16) 75%, rgba(31, 122, 82, 0.20) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[18%] -z-10 h-1 w-[60%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(244,239,230,0.30), transparent)",
          filter: "blur(2px)",
        }}
      />
      {children}
    </div>
  );
}
