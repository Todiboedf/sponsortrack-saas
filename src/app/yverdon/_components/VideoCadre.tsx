"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo dans un cadre à coins lime, avec le chyron « Détections encadrées ».
 * Si la source ne charge pas, un cadre « Extrait vidéo » prend sa place.
 */
export function VideoCadre({
  src,
  poster,
  chyron,
  etiquette,
  legende,
}: {
  src: string;
  poster: string;
  chyron: string;
  etiquette: string;
  legende: React.ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [absente, setAbsente] = useState(false);

  // L'erreur a pu survenir avant l'hydratation : on relit l'etat de l'element.
  useEffect(() => {
    const v = ref.current;
    if (v && (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) setAbsente(true);
  }, []);

  return (
    <div>
      <div className="hud">
        {absente ? (
          <div className="hud-absent">
            <span className="mono" style={{ color: "var(--fg-2)" }}>
              Extrait vidéo
            </span>
            <span style={{ color: "var(--fg-3)", fontSize: 13 }}>disponible sur la page en ligne</span>
          </div>
        ) : (
          <video
            ref={ref}
            controls
            muted
            playsInline
            preload="metadata"
            poster={poster}
            src={src}
            onError={() => setAbsente(true)}
          />
        )}
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        <div className="chyron">
          <span className="lime">Détections encadrées</span>
          <span>{chyron}</span>
        </div>
      </div>
      <div className="video-cap">
        <p>
          <b style={{ color: "var(--fg)" }}>{etiquette}.</b> {legende}
        </p>
      </div>
    </div>
  );
}
