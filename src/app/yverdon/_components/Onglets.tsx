"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// Ilot client du tableau de bord : les onglets (role=tablist, fleches clavier, hash de l'URL).
// Le contenu des panneaux est rendu au serveur et passe ici tel quel.

export const ONGLETS = ["apercu", "image", "reseaux", "valeur", "methode"] as const;
export type IdOnglet = (typeof ONGLETS)[number];

export interface Onglet {
  id: IdOnglet;
  libelle: string;
  icone: React.ReactNode;
  contenu: React.ReactNode;
}

function estOnglet(x: string): x is IdOnglet {
  return (ONGLETS as readonly string[]).includes(x);
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
  const [actif, setActif] = useState<IdOnglet>("apercu");
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
    window.scrollTo({ top: 0, behavior: "auto" });
    if (focus) boutons.current[id]?.focus();
  }, []);

  useEffect(() => {
    const lire = () => {
      const h = window.location.hash.replace("#", "");
      if (estOnglet(h)) setActif(h);
    };
    lire();
    window.addEventListener("hashchange", lire);
    return () => window.removeEventListener("hashchange", lire);
  }, []);

  const clavier = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = ONGLETS.indexOf(actif);
    let j: number | null = null;
    if (e.key === "ArrowRight") j = (i + 1) % ONGLETS.length;
    if (e.key === "ArrowLeft") j = (i - 1 + ONGLETS.length) % ONGLETS.length;
    if (e.key === "Home") j = 0;
    if (e.key === "End") j = ONGLETS.length - 1;
    if (j !== null) {
      e.preventDefault();
      montrer(ONGLETS[j], true);
    }
  };

  return (
    <Aller.Provider value={montrer}>
      <div className="head">
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
