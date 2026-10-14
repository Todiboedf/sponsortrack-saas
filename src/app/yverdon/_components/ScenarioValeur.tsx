"use client";

import { useState } from "react";

/** Les chiffres d'un scénario, déjà mis en forme au serveur depuis valeur.ts. */
export interface ChiffresScenario {
  libelle: string;
  total: string;
  alt: string;
  tv: string;
  stade: string;
  social: string;
  /** Largeurs de la barre empilée TV, stade, réseaux, en % du total. */
  parts: [number, number, number];
  saison: string;
  saisonAlt: string;
  contactsTv: string;
  contactsStade: string;
}

/**
 * Commutateur Base / Optimiste de l'onglet Valeur média : met à jour la grande valeur, la barre empilée,
 * les lignes par canal et la projection saison. Le texte fixe arrive rendu au serveur.
 */
export function ScenarioValeur({
  entete,
  base,
  optimiste,
  sousTotal,
  etiquetteTotal,
  teteCanal,
  legende,
  lignes,
  calcul,
  projection,
  aCote,
}: {
  entete: React.ReactNode;
  base: ChiffresScenario;
  optimiste: ChiffresScenario;
  sousTotal: React.ReactNode;
  etiquetteTotal: React.ReactNode;
  teteCanal: React.ReactNode;
  legende: React.ReactNode;
  lignes: { tv: React.ReactNode; stade: React.ReactNode; social: React.ReactNode };
  calcul: React.ReactNode;
  projection: {
    eyebrow: React.ReactNode;
    ecran: React.ReactNode;
    passages: React.ReactNode;
    pied: React.ReactNode;
  };
  /** Carte à droite de la projection : la part de l'écran dans le contrat. */
  aCote: React.ReactNode;
}) {
  const [sc, setSc] = useState<"base" | "optimiste">("base");
  const x = sc === "base" ? base : optimiste;

  return (
    <>
      <div className="panel-head">
        {entete}
        <div className="seg-ctl" role="group" aria-label="Scénario">
          <button type="button" aria-pressed={sc === "base"} onClick={() => setSc("base")}>
            Base
          </button>
          <button type="button" aria-pressed={sc === "optimiste"} onClick={() => setSc("optimiste")}>
            Optimiste
          </button>
        </div>
      </div>
      <div className="grid g-5-7">
        <div className="card">
          <div className="eyebrow">
            {"Valeur média équivalente du match · "}
            <span>{x.libelle}</span>
          </div>
          <div className="money" style={{ marginTop: 14 }} aria-live="polite">
            <span>{x.total}</span>
            <small>{sousTotal}</small>
          </div>
          <div className="alt">{x.alt}</div>
          <div style={{ marginTop: 14 }}>{etiquetteTotal}</div>
        </div>
        <div className="card">
          <div className="card-head">{teteCanal}</div>
          <div className="stack" aria-hidden>
            <span className="v1" style={{ width: `${x.parts[0].toFixed(2)}%` }} />
            <span className="v2" style={{ width: `${x.parts[1].toFixed(2)}%` }} />
            <span className="v3" style={{ width: `${x.parts[2].toFixed(2)}%` }} />
          </div>
          <div className="legend" style={{ marginTop: 10 }}>
            {legende}
          </div>
          <div className="kv" style={{ marginTop: 14 }}>
            <div>
              {lignes.tv}
              <span className="v nowrap">{x.tv}</span>
            </div>
            <div>
              {lignes.stade}
              <span className="v nowrap">{x.stade}</span>
            </div>
            <div>
              {lignes.social}
              <span className="v nowrap">{x.social}</span>
            </div>
          </div>
          {calcul}
        </div>
      </div>
      <div className="grid g-5-7">
        <div className="card">
          <div className="eyebrow">{projection.eyebrow}</div>
          <div className="money" style={{ marginTop: 14, fontSize: "clamp(32px,4.4vw,48px)" }}>
            <span>{x.saison}</span>
            <small>{x.saisonAlt}</small>
          </div>
          <div className="kv" style={{ marginTop: 14 }}>
            <div>{projection.ecran}</div>
            <div>{projection.passages}</div>
            <div>
              <span className="k">Contacts TV</span>
              <span className="v">{x.contactsTv}</span>
            </div>
            <div>
              <span className="k">Contacts au stade</span>
              <span className="v">{x.contactsStade}</span>
            </div>
          </div>
          {projection.pied}
        </div>
        {aCote}
      </div>
    </>
  );
}
