"use client";

import { useId, useState } from "react";

import { couverture } from "../_data/format";
import { Tag } from "./Etiquette";

/** Sous ce montant, la saisie est presque toujours incomplete (« 1,5 » pour 1,5 million) : on demande de verifier. */
const MONTANT_MIN_CHF = 1_000;

/**
 * Montant saisi -> francs. Accepte 15000, 15'000, 15 000, 15.000, 15'000.00, 15 000,50, 15'000.-,
 * CHF 15'000, 15'000 CHF, Fr. 15'000. Renvoie null si la saisie ne se lit pas sans ambiguite.
 */
export function lireMontant(saisie: string): number | null {
  const t = saisie
    .trim()
    .replace(/^(?:CHF|Fr\.?)\s*/i, "")
    .replace(/\s*(?:CHF|Fr\.?)$/i, "")
    .replace(/[.,]\s*[-\u2013\u2014]+$/, "")
    .trim();
  const centimes = (c: string | undefined) => (c ? Number(`0.${c}`) : 0);
  // Milliers groupes par apostrophe ou espace, par trois chiffres : 15'000, 1 250 000.
  let m = /^(\d{1,3}(?:['\u2019 \u00a0\u202f]\d{3})+)(?:[.,](\d{1,2}))?$/.exec(t);
  if (m) return Number(m[1].replace(/\D/g, "")) + centimes(m[2]);
  // Sans separateur : 15000, 15000.50.
  m = /^(\d+)(?:[.,](\d{1,2}))?$/.exec(t);
  if (m) return Number(m[1]) + centimes(m[2]);
  // Milliers groupes par point ou virgule : 15.000, 1.250.000, 15,000.50.
  m = /^(\d{1,3}(?:([.,])\d{3})(?:\2\d{3})*)(?:[.,](\d{1,2}))?$/.exec(t);
  if (m) return Number(m[1].replace(/\D/g, "")) + centimes(m[3]);
  return null;
}

/**
 * Couverture du contrat par la valeur média projetée sur la saison, pour le montant du sponsor.
 * Rien n'est envoyé ni enregistré : le calcul se fait dans le navigateur.
 */
export function CalculCouverture({ saisonBase, saisonOptimiste }: { saisonBase: number; saisonOptimiste: number }) {
  const id = useId();
  const [saisie, setSaisie] = useState("");
  const montant = lireMontant(saisie);
  const valide = montant !== null && montant >= MONTANT_MIN_CHF;
  const aVerifier = saisie.trim() !== "" && !valide;

  const sortie = (titre: string, saison: number) => (
    <div>
      <span className="eyebrow">{titre}</span>
      <span className="c">
        {valide ? couverture(saison, montant) : "à calculer"}
        {valide && saison > montant && <small>votre investissement</small>}
      </span>
      {valide && <Tag e="hypothese" />}
    </div>
  );

  return (
    <div className="calc" style={{ marginTop: 16 }}>
      <label htmlFor={id}>Votre investissement pour la saison</label>
      <div className="field">
        <span>CHF</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="à renseigner"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
        />
      </div>
      <div className="calc-out" aria-live="polite">
        {sortie("Couverture par l'écran, base", saisonBase)}
        {sortie("Couverture par l'écran, optimiste", saisonOptimiste)}
      </div>
      <p className="note" style={{ margin: 0 }}>
        {aVerifier
          ? "Montant à vérifier : écrivez le montant de la saison en francs, par exemple 25'000."
          : "Rien n'est envoyé ni enregistré : le calcul se fait dans votre navigateur."}
      </p>
    </div>
  );
}
