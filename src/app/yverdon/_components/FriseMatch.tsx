"use client";

import { useState } from "react";

/** Une piste de la frise, calculée au build depuis la chronologie seconde par seconde (sponsor.ts). */
export interface PisteFrise {
  nom: string;
  resume: string;
  dureeS: number;
  /** Segments en secondes depuis le début de la mi-temps, fin exclue ; le vide n'est pas dessiné. */
  segments: SegmentFrise[];
  graduations: { pos: number; texte: string; mineure: boolean }[];
}

export type SegmentFrise =
  | { debut: number; fin: number; type: "autre" }
  | { debut: number; fin: number; type: "marque"; tip: string; aria: string };

interface Bulle {
  texte: string;
  x: number;
  y: number;
}

export function FriseMatch({ pistes }: { pistes: PisteFrise[] }) {
  const [bulle, setBulle] = useState<Bulle | null>(null);
  const montrer = (b: HTMLElement, texte: string) => {
    const r = b.getBoundingClientRect();
    setBulle({ texte, x: r.left + r.width / 2 + window.scrollX, y: r.top + window.scrollY });
  };
  const cacher = () => setBulle(null);

  return (
    <>
      <div className="frise">
        {pistes.map((p) => (
            <div key={p.nom}>
              <div className="track-head">
                <b>{p.nom}</b>
                <span className="num" style={{ color: "var(--fg-2)", fontSize: 13 }}>
                  {p.resume}
                </span>
              </div>
              <div className="track">
                {p.segments.map((s) => {
                  const style = {
                    left: `${((s.debut / p.dureeS) * 100).toFixed(3)}%`,
                    width: `${Math.max(((s.fin - s.debut) / p.dureeS) * 100, 0.1).toFixed(3)}%`,
                  };
                  if (s.type === "autre") return <span key={s.debut} className="seg a" style={style} />;
                  return (
                    <button
                      key={s.debut}
                      type="button"
                      className="seg b"
                      style={style}
                      aria-label={s.aria}
                      onMouseEnter={(e) => montrer(e.currentTarget, s.tip)}
                      onMouseLeave={cacher}
                      onFocus={(e) => montrer(e.currentTarget, s.tip)}
                      onBlur={cacher}
                      onClick={(e) => montrer(e.currentTarget, s.tip)}
                    />
                  );
                })}
              </div>
              <div className="ticks" aria-hidden>
                {p.graduations.map((g) => (
                  <span key={g.pos} className={`tick${g.mineure ? " minor" : ""}`} style={{ left: `${g.pos.toFixed(2)}%` }}>
                    {g.texte}
                  </span>
                ))}
              </div>
            </div>
        ))}
      </div>
      <div className="tip" role="status" aria-live="polite" hidden={bulle === null} style={bulle ? { left: bulle.x, top: bulle.y } : undefined}>
        {bulle?.texte}
      </div>
    </>
  );
}
