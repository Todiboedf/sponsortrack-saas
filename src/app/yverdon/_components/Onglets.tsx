"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// Ilot client du tableau de bord : les onglets (role=tablist, fleches clavier, hash de l'URL).
// Le contenu des panneaux est rendu au serveur et passe ici tel quel.

export const ONGLETS = ["apercu", "image", "reseaux", "valeur", "methode", "club"] as const;
export type IdOnglet = (typeof ONGLETS)[number];

export interface Onglet {
  id: IdOnglet;
  libelle: string;
  icone: React.ReactNode;
  contenu: React.ReactNode;
}


const Aller = createContext<(id: IdOnglet, focus?: boolean) => void>(() => {});

export function Onglets({
  barre,
  onglets,
  pied,
}: {
  barre: React.ReactNode;
  onglets: Onglet[];
  pied: React.ReactNode;
}) {
  const ids = onglets.map((o) => o.id);
  const [actif, setActif] = useState<IdOnglet>(ids[0]);
  const boutons = useRef<Partial<Record<IdOnglet, HTMLButtonElement | null>>>({});

  const montrer = useCallback((id: IdOnglet, focus = false) => {
    setActif(id);
    if (window.location.hash !== `#${id}`) {
      try {
        window.history.replaceState(window.history.state, "", `#${id}`);
      } catch {
        // l'URL ne suit pas, l'onglet s'ouvre quand meme
      }
    }
    if (focus) boutons.current[id]?.focus();
  }, []);

  // Apres chaque activation (et au chargement), le defilement revient en haut : sinon le navigateur
  // descend jusqu'au panneau vise par le hash et son titre passe sous l'en-tete collant.
  useEffect(() => {
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, [actif]);

  useEffect(() => {
    // Le navigateur peut encore viser l'ancre a la fin du chargement.
    if (document.readyState === "complete") return;
    const enHaut = () => window.scrollTo(0, 0);
    window.addEventListener("load", enHaut, { once: true });
    return () => window.removeEventListener("load", enHaut);
  }, []);

  // Hauteur de l'en-tete collant, reprise par scroll-margin-top des panneaux (tableau.css).
  const tete = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tete.current;
    if (!el) return;
    const racine = el.closest<HTMLElement>(".yvd") ?? document.documentElement;
    const maj = () => racine.style.setProperty("--head-h", `${el.offsetHeight}px`);
    maj();
    const ro = new ResizeObserver(maj);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const lire = () => {
      const h = window.location.hash.replace("#", "");
      const id = ids.find((x) => x === h);
      if (id) setActif(id);
    };
    lire();
    window.addEventListener("hashchange", lire);
    return () => window.removeEventListener("hashchange", lire);
    // ids ne change pas pendant la vie de la page
  }, []);

  const clavier = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = ids.indexOf(actif);
    let j: number | null = null;
    if (e.key === "ArrowRight") j = (i + 1) % ids.length;
    if (e.key === "ArrowLeft") j = (i - 1 + ids.length) % ids.length;
    if (e.key === "Home") j = 0;
    if (e.key === "End") j = ids.length - 1;
    if (j !== null) {
      e.preventDefault();
      montrer(ids[j], true);
    }
  };

  return (
    <Aller.Provider value={montrer}>
      <div className="head" ref={tete}>
        <div className="wrap">
          {barre}
          <div className="tabs-wrap">
            <div className="tabs" role="tablist" aria-label="Sections du tableau de bord" onKeyDown={clavier}>
              {onglets.map((o) => (
                <button
                  key={o.id}
                  ref={(b) => {
                    boutons.current[o.id] = b;
                  }}
                  type="button"
                  className="tab"
                  role="tab"
                  id={`tab-${o.id}`}
                  aria-controls={o.id}
                  aria-selected={o.id === actif}
                  tabIndex={o.id === actif ? 0 : -1}
                  onClick={() => montrer(o.id)}
                >
                  {o.icone}
                  {o.libelle}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main id="contenu" className="wrap">
        {onglets.map((o) => (
          <section key={o.id} id={o.id} role="tabpanel" aria-labelledby={`tab-${o.id}`} hidden={o.id !== actif}>
            {o.contenu}
          </section>
        ))}
      </main>
      <footer>
        <div className="wrap">{pied}</div>
      </footer>
    </Aller.Provider>
  );
}

/** Carte de la vue d'ensemble qui ouvre un autre onglet. */
export function CarteAcces({ vers, children }: { vers: IdOnglet; children: React.ReactNode }) {
  const aller = useContext(Aller);
  return (
    <button type="button" className="goto" onClick={() => aller(vers, true)}>
      {children}
    </button>
  );
}
