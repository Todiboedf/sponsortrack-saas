const logos = [
  "LA LIGA",
  "SERIE A",
  "LIGUE 1",
  "BUNDESLIGA",
  "PREMIER LEAGUE",
  "EREDIVISIE",
  "LIGA PORTUGAL",
  "MLS",
  "EUROLEAGUE",
  "WTA",
];

export function LogoMarquee() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0A1628] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0A1628] to-transparent"
      />
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="flex h-10 shrink-0 items-center gap-2 font-[family-name:var(--font-display)] text-[16px] font-semibold tracking-[0.22em] text-[#F4EFE6]/40 transition-colors hover:text-[#B8975A]"
            >
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full bg-[#B8975A]/60"
              />
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
