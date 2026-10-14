"use client";

import { ExternalLink } from "lucide-react";
import { useId, useState } from "react";

import { chf, couverture } from "../_data/format";
import { ETUDE_ZHAW, PALIERS_INVESTISSEMENT_CHF } from "../_data/regles";
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

const NBSP = " ";

/**
 * Part du contrat couverte par la valeur media projetee sur la saison : une grille par palier
 * d'investissement, puis le montant du sponsor. Rien n'est envoye ni enregistre.
 */
export function PartEcran({
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
  const valide = montant !== null && montant >= MONTANT_MIN_CHF;
  const aVerifier = saisie.trim() !== "" && !valide;
  const z = ETUDE_ZHAW.valeur;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[17rem] text-sm">
              <caption className="pb-2 text-left text-sm font-semibold text-yv-ink">
                Couverture du contrat par l&apos;écran, selon l&apos;investissement
              </caption>
              <thead>
                <tr className="border-b border-yv-ink/80 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-yv-muted">
                  <th scope="col" className="py-2 pr-2">Investissement, saison</th>
                  <th scope="col" className="py-2 pr-2 text-right">Base</th>
                  <th scope="col" className="py-2 text-right">Optimiste</th>
                </tr>
              </thead>
              <tbody>
                {PALIERS_INVESTISSEMENT_CHF.valeur.map((palier) => (
                  <tr key={palier} className="border-b border-yv-rule">
                    <th scope="row" className="py-1.5 pr-2 text-left font-normal tabular-nums">{chf(palier)}</th>
                    <td className="py-1.5 pr-2 text-right font-semibold tabular-nums text-yv-ink">
                      {couverture(saisonBase, palier)}
                    </td>
                    <td className="py-1.5 text-right tabular-nums">{couverture(saisonOptimiste, palier)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-yv-muted">
            <Statut s="hypothese" borneBasse={borneBasse} />
            <span>
              {`valeur média projetée sur ${matchs}${NBSP}matchs à domicile : ${chf(saisonBase)} en base, ${chf(saisonOptimiste)} en optimiste`}
            </span>
          </div>
          <p className="mt-3 text-sm text-yv-body">
            {`Au-delà de 1${NBSP}×, l'écran seul rembourse le contrat\u00a0; le réseau, l'hospitalité et l'image viennent en plus. L'audience TV reste une hypothèse.`}
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
              ? "Montant à vérifier : écrivez le montant de la saison en francs, par exemple 25'000."
              : "Rien n'est envoyé ni enregistré : le calcul se fait dans votre navigateur."}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
            <div className="rounded-sm bg-yv-surface p-3">
              <dt className="text-xs text-yv-muted">Couverture par l&apos;écran, base</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-yv-ink">
                {valide ? couverture(saisonBase, montant) : "à calculer"}
                {valide && saisonBase > montant && (
                  <span className="block text-sm font-normal text-yv-body">votre investissement</span>
                )}
              </dd>
              {valide && (
                <dd className="mt-2">
                  <Statut s="hypothese" borneBasse={borneBasse} />
                </dd>
              )}
            </div>
            <div className="rounded-sm bg-yv-surface p-3">
              <dt className="text-xs text-yv-muted">Couverture par l&apos;écran, optimiste</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-yv-ink">
                {valide ? couverture(saisonOptimiste, montant) : "à calculer"}
                {valide && saisonOptimiste > montant && (
                  <span className="block text-sm font-normal text-yv-body">votre investissement</span>
                )}
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

      <p className="max-w-3xl text-sm leading-relaxed text-yv-body">
        {`Étude ZHAW ${z.titre} ${z.annee} (n=${z.repondants}) : l'image (${z.imagePct}${NBSP}%) et la notoriété (${z.notorietePct}${NBSP}%) sont les deux premiers objectifs des sponsors en Suisse, devant les ventes (${z.ventesPct}${NBSP}%). L'exposition sert ces deux objectifs. `}
        <span className="inline-flex flex-wrap items-center gap-2 align-middle">
          <Statut s="verifie" />
          <a
            href={ETUDE_ZHAW.source}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-xs text-yv-data underline underline-offset-2 outline-none hover:text-yv-ink focus-visible:ring-2 focus-visible:ring-yv-data"
          >
            étude ZHAW (PDF)
            <ExternalLink aria-hidden className="ml-1 inline-block size-3 align-[-0.0625rem]" />
          </a>
        </span>
      </p>
    </div>
  );
}
