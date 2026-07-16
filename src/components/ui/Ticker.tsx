import { Fragment } from "react";

/**
 * Broadcast-style ticker strip. CSS-only transform marquee (compositor
 * work only); content is rendered twice so the track can loop seamlessly
 * at -50%. Under prefers-reduced-motion the track is static and the
 * items simply wrap (overflow hidden shows the first screenful).
 */
export function Ticker({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((it, i) => (
        <Fragment key={`${hidden ? "b" : "a"}-${i}`}>
          <span className="whitespace-nowrap px-6 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[#F4EFE6]/70 tabular-nums">
            {it}
          </span>
          <span aria-hidden className="h-1 w-1 shrink-0 bg-[#D8FF3E]" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="ticker relative overflow-hidden border-y border-[#F4EFE6]/10 bg-[#050B14] py-2.5">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
