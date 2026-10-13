"use client";

import { useState } from "react";

import { duree, secondes as fmtSecondes } from "../_data/format";
import { de } from "../_data/marques";
import type { Exposition, MiTempsVue, PassageVue } from "../_data/sponsor";
import { Statut } from "./Statut";

const COULEUR = {
  marque: "#008300",
  autre: "#CFD5DC",
  hors_champ: "#FFFFFF",
} as const;

function libelleMiTemps(n: 1 | 2): string {
  return n === 1 ? "1re mi-temps" : "2e mi-temps";
}

function graduations(m: MiTempsVue): number[] {
  const pas = 5 * 60;
  const out: number[] = [];
  for (let t = Math.ceil(m.chronoDepartS / pas) * pas; t <= m.chronoDepartS + m.dureeS; t += pas) out.push(t);
  return out;
}

function Piste({
  m,
  passages,
  largeurMax,
  choisi,
  choisir,
  seuilS,
}: {
  m: MiTempsVue;
  seuilS: number;
  passages: PassageVue[];
  largeurMax: number;
  choisi: string;
  choisir: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-sm">
        <span className="font-medium text-yv-ink">{libelleMiTemps(m.numero)}</span>
        <span className="text-xs text-yv-muted">
          {m.passagesComptes} passage{m.passagesComptes > 1 ? "s" : ""} · {duree(m.secondesMarque)}
        </span>
      </div>
      <div style={{ width: `${(m.dureeS / largeurMax) * 100}%` }}>
        <div className="relative h-8 rounded-sm border border-yv-rule bg-white">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${m.dureeS} 1`}
            preserveAspectRatio="none"
            aria-hidden
          >
            {m.segments
              .filter((s) => s.type !== "hors_champ")
              .map((s) => (
                <rect
                  key={s.debutS}
                  x={s.debutS}
                  y={0}
                  width={s.finS - s.debutS}
                  height={1}
                  fill={COULEUR[s.type]}
                />
              ))}
          </svg>
          {passages.map((p) => {
            const gauche = (p.debutS / m.dureeS) * 100;
            const largeur = ((p.finS - p.debutS + 1) / m.dureeS) * 100;
            const actif = p.id === choisi;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => choisir(p.id)}
                aria-pressed={actif}
                aria-label={`${p.numero ? `Passage ${p.numero}` : `Apparition de moins de ${seuilS}\u00a0secondes`}, ${p.chronoDebut} à ${p.chronoFin}, ${p.secondesVisibles}\u00a0secondes`}
                className={`absolute -top-1 -bottom-1 min-w-3 -translate-x-[3px] rounded-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-yv-data ${
                  p.compte ? "z-20" : "z-10"
                } ${actif ? "ring-2 ring-yv-ink" : "hover:ring-1 hover:ring-yv-ink-2"}`}
                style={{ left: `${gauche}%`, width: `calc(${largeur}% + 6px)` }}
              />
            );
          })}
        </div>
        <div className="relative mt-1 h-4 text-[0.6875rem] text-yv-muted" aria-hidden>
          {graduations(m).map((t) => (
            <span
              key={t}
              className="absolute -translate-x-1/2 tabular-nums"
              style={{ left: `${((t - m.chronoDepartS) / m.dureeS) * 100}%` }}
            >
              {t / 60}&apos;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Frise({
  nom,
  miTemps,
  passages,
  seuilS,
  sourcePlans,
}: {
  nom: string;
  miTemps: [MiTempsVue, MiTempsVue];
  passages: PassageVue[];
  seuilS: number;
  sourcePlans: Exposition["parPlanSource"];
}) {
  const premier = passages.find((p) => p.compte) ?? passages[0];
  const [choisi, setChoisi] = useState(premier.id);
  const p = passages.find((x) => x.id === choisi) ?? premier;
  const largeurMax = Math.max(miTemps[0].dureeS, miTemps[1].dureeS);
  const comptes = passages.filter((x) => x.compte);
  const courts = passages.filter((x) => !x.compte);
  const somme = (xs: PassageVue[]) => xs.reduce((t, x) => t + x.secondesVisibles, 0);
  const libellePlan = sourcePlans === "fiche" ? "plan dominant" : "plan";
  const lecture = `Le chrono va du début à la fin du passage\u00a0; la colonne «\u00a0Visible\u00a0» ne compte que les secondes où la création est à l'image.`;
  const noteTableau =
    sourcePlans === "fiche"
      ? `${lecture} Le plan dominant est celui de la plupart des secondes du passage\u00a0: il sert à l'affichage, la valeur utilise le classement seconde par seconde de la section suivante.`
      : sourcePlans === "mesure_hauteurs"
        ? `${lecture} Le plan d'un passage se lit sur la hauteur médiane du bandeau dans son extrait\u00a0; toutes ses secondes visibles prennent ce plan pour la valeur.`
        : `${lecture} Le plan n'est pas encore mesuré\u00a0: la valeur compte toutes les secondes en plan large, c'est la borne basse.`;
  const decompte =
    courts.length > 0
      ? `${comptes.length} passages comptés\u00a0: ${fmtSecondes(somme(comptes))} visibles. ${courts.length} apparition${courts.length > 1 ? "s" : ""} de moins de ${seuilS}\u00a0s\u00a0: ${fmtSecondes(somme(courts))}, qui ne compte${courts.length > 1 ? "nt" : ""} pas comme passage${courts.length > 1 ? "s" : ""} mais reste${courts.length > 1 ? "nt" : ""} dans le temps à l'écran. Total\u00a0: ${fmtSecondes(somme(passages))}.`
      : `${comptes.length} passages comptés\u00a0: ${fmtSecondes(somme(comptes))} visibles.`;

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {miTemps.map((m) => (
          <Piste
            key={m.numero}
            m={m}
            passages={passages.filter((x) => x.miTemps === m.numero)}
            largeurMax={largeurMax}
            choisi={choisi}
            choisir={setChoisi}
            seuilS={seuilS}
          />
        ))}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-yv-muted">
          <li className="inline-flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-sm bg-yv-accent" />
            {`${nom} sur le bandeau et à l'image`}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-sm bg-yv-rule-2" />
            autre marque, ligue, club ou bandeau vide
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-sm border border-yv-rule bg-white" />
            bandeau pas à l&apos;image
          </li>
        </ul>
      </div>

      <div className="rounded-sm border-l-2 border-yv-accent bg-yv-surface px-4 py-3" aria-live="polite">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-sm font-semibold text-yv-ink">
            {`${p.numero ? `Passage ${p.numero}` : `Apparition de moins de ${seuilS}\u00a0s`} · ${libelleMiTemps(p.miTemps)}`}
          </p>
          <Statut s="mesure" />
        </div>
        <p className="mt-1 text-sm text-yv-body">
          <span className="font-mono tabular-nums">{`${p.chronoDebut} à ${p.chronoFin}`}</span>
          {`, ${fmtSecondes(p.secondesVisibles)} visibles`}
          {p.plan
            ? `, ${libellePlan}\u00a0: ${p.plan.libelle}${p.plan.hauteurPx !== null ? `, bandeau de ${p.plan.hauteurPx}\u00a0px` : ", aucune détection, compté en plan large"}`
            : p.compte && sourcePlans === null
              ? ", plan pas encore mesuré"
              : ""}
          .
        </p>
        {!p.compte && (
          <p className="mt-1 text-xs text-yv-muted">
            {`Moins de ${seuilS}\u00a0secondes à l'image\u00a0: ne compte pas comme passage. Ses secondes restent dans le total.`}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] text-sm">
          <caption className="sr-only">{`Passages ${de(nom)} pendant le jeu`}</caption>
          <thead>
            <tr className="border-b border-yv-ink/80 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-yv-muted">
              <th scope="col" className="py-2 pr-2">N°</th>
              <th scope="col" className="py-2 pr-2">Chrono</th>
              <th scope="col" className="py-2 pr-2 text-right">Visible</th>
              <th scope="col" className="py-2">{sourcePlans === "fiche" ? "Plan dominant" : "Plan"}</th>
            </tr>
          </thead>
          <tbody>
            {passages.map((x) => {
              const actif = x.id === choisi;
              return (
                <tr
                  key={x.id}
                  className={`border-b border-yv-rule ${actif ? "bg-yv-surface" : ""} ${x.compte ? "" : "text-yv-muted"}`}
                >
                  <td className="py-1.5 pr-2 tabular-nums">
                    <button
                      type="button"
                      onClick={() => setChoisi(x.id)}
                      aria-pressed={actif}
                      className="min-h-8 min-w-8 rounded-sm px-1 text-left font-medium underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-yv-data"
                    >
                      {x.numero ?? "·"}
                      <span className="sr-only">, voir sur la frise</span>
                    </button>
                  </td>
                  <td className="py-1.5 pr-2">
                    <span className="block text-[0.6875rem] text-yv-muted">
                      {x.miTemps === 1 ? "1re mi-temps" : "2e mi-temps"}
                    </span>
                    <span className="whitespace-nowrap font-mono text-[0.8125rem] tabular-nums">
                      {`${x.chronoDebut} à ${x.chronoFin}`}
                    </span>
                  </td>
                  <td className="py-1.5 pr-2 text-right tabular-nums">{fmtSecondes(x.secondesVisibles)}</td>
                  <td className="py-1.5">
                    {!x.compte
                      ? `moins de ${seuilS}\u00a0s, ne compte pas`
                      : x.plan
                        ? `${x.plan.libelle}${x.plan.hauteurPx !== null ? `, ${x.plan.hauteurPx}\u00a0px` : ""}`
                        : "pas encore mesuré"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="space-y-1 text-xs leading-relaxed text-yv-muted">
        <p>{decompte}</p>
        <p>{noteTableau}</p>
        <Statut s="mesure" />
      </div>
    </div>
  );
}
