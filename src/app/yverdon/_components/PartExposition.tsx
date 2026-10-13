"use client";

import { useId, useState } from "react";

import { chf, pourcent } from "../_data/format";
import { Statut } from "./Statut";

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
 * Part du partenariat couverte par la valeur media projetee. Le sponsor saisit son investissement ;
 * rien n'est envoye ni enregistre, le calcul se fait dans le navigateur.
 */
export function PartExposition({
  saisonBase,
  saisonOptimiste,
  matchs,
  borneBasse,
}: {
  saisonBase: number;
  saisonOptimiste: number;
  matchs: number;
  borneBasse: boolean;
}) {
  const id = useId();
  const [saisie, setSaisie] = useState("");
  const montant = lireMontant(saisie);
  const investissement = montant ?? 0;
  const valide = montant !== null && montant >= MONTANT_MIN_CHF;
  const aVerifier = saisie.trim() !== "" && !valide;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 border-b border-yv-rule pb-2 text-sm">
          <span className="text-yv-body">Valeur média projetée sur la saison à domicile, base</span>
          <span className="text-right">
            <span className="block font-semibold tabular-nums text-yv-ink">{chf(saisonBase)}</span>
            <Statut s="hypothese" borneBasse={borneBasse} />
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3 border-b border-yv-rule pb-2 text-sm">
          <span className="text-yv-body">Valeur média projetée sur la saison à domicile, optimiste</span>
          <span className="text-right">
            <span className="block font-semibold tabular-nums text-yv-ink">{chf(saisonOptimiste)}</span>
            <Statut s="hypothese" borneBasse={borneBasse} />
          </span>
        </div>
        <p className="text-xs text-yv-muted">
          Projection sur {matchs}{" "}matchs à domicile au rythme mesuré sur ce match&nbsp;: écran, stade et réseaux sociaux
          organiques, sans publication dédiée.
        </p>
      </div>

      <div className="rounded-sm border border-yv-rule p-4">
        <label htmlFor={id} className="block text-sm font-medium text-yv-ink">
          Votre investissement pour la saison
        </label>
        <div className="mt-2 flex items-center rounded-sm border border-yv-rule-2 bg-white focus-within:border-yv-data focus-within:ring-1 focus-within:ring-yv-data">
          <span className="pl-3 text-sm text-yv-muted">CHF</span>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="à renseigner"
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            className="w-full min-w-0 bg-transparent px-2 py-2 text-base tabular-nums text-yv-ink outline-none placeholder:text-yv-muted"
          />
        </div>
        <p className="mt-2 text-xs text-yv-muted">
          {aVerifier
            ? "Montant à vérifier\u00a0: écrivez le montant de la saison en francs, par exemple 25'000."
            : "Rien n'est envoyé ni enregistré\u00a0: le calcul se fait dans votre navigateur."}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
          <div className="rounded-sm bg-yv-surface p-3">
            <dt className="text-xs text-yv-muted">Part couverte par l&apos;écran, base</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums text-yv-ink">
              {valide ? pourcent(saisonBase, investissement, 0) : "à calculer"}
            </dd>
            {valide && (
              <dd className="mt-2">
                <Statut s="hypothese" borneBasse={borneBasse} />
              </dd>
            )}
          </div>
          <div className="rounded-sm bg-yv-surface p-3">
            <dt className="text-xs text-yv-muted">Part couverte par l&apos;écran, optimiste</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums text-yv-ink">
              {valide ? pourcent(saisonOptimiste, investissement, 0) : "à calculer"}
            </dd>
            {valide && (
              <dd className="mt-2">
                <Statut s="hypothese" borneBasse={borneBasse} />
              </dd>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
