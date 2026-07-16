import type { ReactNode } from "react";

/**
 * Per-sponsor match-day exposure, as produced by the cv/ pipeline
 * (cv_sponsor_exposure rows). Standalone + presentational: no data fetching,
 * no client hooks. Mount it wherever, e.g. on /demo or a future dashboard
 * match view, passing rows from Supabase — or use the built-in sample.
 */

export type CvExposureRow = {
  sponsor: string;
  placement?: "jersey" | "led" | "backdrop" | "pitch" | "other";
  visibleSeconds: number;
  detections: number;
  avgAreaPct: number;
  estMediaValue?: number;
};

const SAMPLE: CvExposureRow[] = [
  { sponsor: "Northwind", placement: "jersey", visibleSeconds: 3110.5, detections: 7421, avgAreaPct: 0.92, estMediaValue: 27994 },
  { sponsor: "Vertex", placement: "jersey", visibleSeconds: 2480, detections: 5980, avgAreaPct: 0.61, estMediaValue: 22320 },
  { sponsor: "Lumina", placement: "led", visibleSeconds: 1290.5, detections: 3120, avgAreaPct: 1.8, estMediaValue: 11614 },
  { sponsor: "Meridian", placement: "backdrop", visibleSeconds: 188, detections: 410, avgAreaPct: 4.1, estMediaValue: 1692 },
];

const PLACEMENT_LABEL: Record<NonNullable<CvExposureRow["placement"]>, string> = {
  jersey: "Jersey",
  led: "LED",
  backdrop: "Backdrop",
  pitch: "Pitch-side",
  other: "Other",
};

function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CvExposurePanel({
  rows = SAMPLE,
  title = "Match-day exposure",
  subtitle = "Computer-vision screen-time per sponsor",
  footnote = "Illustrative figures. Computer vision is in active development.",
}: {
  rows?: CvExposureRow[];
  title?: string;
  subtitle?: ReactNode;
  footnote?: ReactNode;
}) {
  const max = Math.max(1, ...rows.map((r) => r.visibleSeconds));
  return (
    <div className="rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/70 p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#D8FF3E]">
            {title}
          </div>
          <div className="mt-1 text-sm text-[#F4EFE6]/55">{subtitle}</div>
        </div>
        <span className="shrink-0 rounded-full border border-[#D8FF3E]/30 bg-[#D8FF3E]/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#D8FF3E]">
          In development
        </span>
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {rows.map((r) => (
          <li key={`${r.sponsor}-${r.placement ?? "x"}`}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium text-[#F4EFE6]">
                {r.sponsor}
                {r.placement && (
                  <span className="rounded border border-[#F4EFE6]/15 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#F4EFE6]/55">
                    {PLACEMENT_LABEL[r.placement]}
                  </span>
                )}
              </span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]">
                {fmtTime(r.visibleSeconds)}
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#F4EFE6]/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8B0028] via-[#A00030] to-[#D8FF3E]"
                style={{ width: `${(r.visibleSeconds / max) * 100}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-[#F4EFE6]/45">
              <span>
                {r.detections.toLocaleString("en-US")} detections · {r.avgAreaPct}% avg area
              </span>
              {r.estMediaValue != null && (
                <span className="text-[#D8FF3E]">
                  €{r.estMediaValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[11px] text-[#F4EFE6]/40">{footnote}</p>
    </div>
  );
}
