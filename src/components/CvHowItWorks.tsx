import Image from "next/image";

/**
 * "How it works" strip for the computer-vision POC on /demo.
 * Purely presentational: a 4-step pipeline summary + the same broadcast
 * frame shown raw vs. annotated by the model. Sits under CvExposurePanel.
 */

const STEPS = [
  { n: "01", title: "Record", desc: "Public broadcast footage, sampled at 2 fps." },
  { n: "02", title: "Detect", desc: "A YOLOv11 model fine-tuned on the club's sponsor logos." },
  { n: "03", title: "Measure", desc: "Per-sponsor screen time, share of voice, on-screen area." },
  { n: "04", title: "Report", desc: "Structured exposure data, ready for valuation." },
];

export function CvHowItWorks() {
  return (
    <div className="rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/70 p-6">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#D8FF3E]">
        How it works
      </div>
      <div className="mt-1 text-sm text-[#F4EFE6]/55">
        From raw broadcast to sponsor exposure data
      </div>

      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-xl border border-[#F4EFE6]/[0.06] bg-[#F4EFE6]/[0.02] p-4"
          >
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-[#D8FF3E]">
              {s.n}
            </div>
            <div className="mt-1 text-sm font-medium text-[#F4EFE6]">{s.title}</div>
            <div className="mt-1 text-[12px] leading-relaxed text-[#F4EFE6]/50">{s.desc}</div>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <figure>
          <Image
            src="/demo/cv-raw.jpg"
            alt="Raw broadcast frame, Osasuna vs Alavés"
            width={1280}
            height={720}
            className="w-full rounded-xl border border-[#F4EFE6]/[0.08]"
          />
          <figcaption className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#F4EFE6]/40">
            Broadcast frame
          </figcaption>
        </figure>
        <figure>
          <video
            src="/demo/detection-loop.mp4"
            poster="/demo/detection-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Looped clip of the model detecting sponsor logos on broadcast footage"
            className="w-full rounded-xl border border-[#D8FF3E]/30"
            ref={(el) => {
              // React can omit the muted attribute in SSR markup; set it
              // explicitly so mobile autoplay policies are satisfied.
              if (el) {
                el.muted = true;
                el.play().catch(() => {});
              }
            }}
          />
          <figcaption className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#D8FF3E]">
            Same footage, live model output (22s loop)
          </figcaption>
        </figure>
      </div>

      <p className="mt-5 text-[11px] text-[#F4EFE6]/40">
        Each detection feeds the per-sponsor screen-time aggregation shown above.
      </p>
    </div>
  );
}
