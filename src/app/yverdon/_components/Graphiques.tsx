import { chf, duree, secondes as fmtSecondes } from "../_data/format";
import { Statut } from "./Statut";
import type { LigneClassement } from "../_data/sponsor";
import type { ParPlan } from "../_data/types";
import type { ValeurMatch } from "../_data/valeur";

/** Classement des marques pendant le jeu : barres horizontales, la marque de la page en couleur. */
export function Classement({ lignes }: { lignes: LigneClassement[] }) {
  const max = Math.max(...lignes.map((l) => l.secondes));
  return (
    <ol className="space-y-1.5" aria-label="Temps d'écran pendant le jeu, par marque">
      {lignes.map((l) => (
        <li
          key={l.cle}
          className="grid grid-cols-[1.25rem_minmax(0,8.5rem)_minmax(0,1fr)_3.75rem] items-center gap-x-2 text-sm sm:grid-cols-[1.5rem_13rem_minmax(0,1fr)_4.5rem] sm:gap-x-3"
        >
          <span className="text-right font-mono text-xs tabular-nums text-yv-muted">{l.rang}</span>
          <span className={`min-w-0 leading-tight ${l.estMarque ? "font-semibold text-yv-ink" : "text-yv-body"}`}>
            <span className="block break-words">{l.nom}</span>
            {(l.precision || l.aConfirmer) && (
              <span className="block break-words text-[0.6875rem] leading-tight text-yv-muted">
                {[l.precision, l.aConfirmer ? "à confirmer" : null].filter(Boolean).join(", ")}
              </span>
            )}
          </span>
          <span className="h-3 rounded-sm bg-yv-surface" aria-hidden>
            <span
              className={`block h-full rounded-sm ${l.estMarque ? "bg-yv-accent" : "bg-yv-rule-2"}`}
              style={{ width: `${(l.secondes / max) * 100}%` }}
            />
          </span>
          <span
            className={`text-right tabular-nums ${l.estMarque ? "font-semibold text-yv-ink" : "text-yv-body"}`}
          >
            {duree(l.secondes)}
          </span>
        </li>
      ))}
    </ol>
  );
}

const SERIES = [
  { cle: "tv", nom: "TV et streaming", couleur: "bg-yv-data-deep" },
  { cle: "stade", nom: "Stade", couleur: "bg-yv-data-2" },
  { cle: "socialOrganique", nom: "Réseaux sociaux, organique", couleur: "bg-yv-data-3" },
] as const;

/** Decomposition de la valeur d'un match : barres empilees TV, stade, social, sur une echelle commune. */
export function BarresValeur({
  scenarios,
}: {
  scenarios: { nom: string; valeur: ValeurMatch }[];
}) {
  const max = Math.max(...scenarios.map((s) => s.valeur.tv + s.valeur.stade + s.valeur.socialOrganique));
  return (
    <div className="space-y-4">
      {scenarios.map((s) => (
        <div key={s.nom}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium text-yv-ink">{s.nom}</span>
            <span className="font-semibold tabular-nums text-yv-ink">{chf(s.valeur.totalMesure)}</span>
          </div>
          <div className="flex h-5 overflow-hidden rounded-sm bg-yv-surface" aria-hidden>
            {SERIES.map((serie) => (
              <span
                key={serie.cle}
                className={`${serie.couleur} h-full border-r border-white last:border-r-0`}
                style={{ width: `${(s.valeur[serie.cle] / max) * 100}%` }}
              />
            ))}
          </div>
        </div>
      ))}
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-yv-muted">
        {SERIES.map((serie) => (
          <li key={serie.cle} className="inline-flex items-center gap-1.5">
            <span aria-hidden className={`size-2.5 rounded-sm ${serie.couleur}`} />
            {serie.nom}
          </li>
        ))}
      </ul>
    </div>
  );
}

const PLANS = [
  { cle: "large", nom: "plan large", couleur: "bg-yv-data-3" },
  { cle: "moyen", nom: "plan moyen", couleur: "bg-yv-data" },
  { cle: "gros", nom: "gros plan", couleur: "bg-yv-data-deep" },
] as const;

/** Secondes a l'ecran par plan (hauteur du bandeau a l'image). */
export function BarrePlans({ parPlan }: { parPlan: ParPlan }) {
  const total = parPlan.large + parPlan.moyen + parPlan.gros;
  return (
    <div>
      <div className="flex h-5 overflow-hidden rounded-sm bg-yv-surface" aria-hidden>
        {PLANS.map((p) => (
          <span
            key={p.cle}
            className={`${p.couleur} h-full border-r border-white last:border-r-0`}
            style={{ width: `${(parPlan[p.cle] / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-3">
        {PLANS.map((p) => (
          <li key={p.cle} className="flex items-center gap-2">
            <span aria-hidden className={`size-2.5 shrink-0 rounded-sm ${p.couleur}`} />
            <span className="text-yv-body">{p.nom}</span>
            <span className="ml-auto font-semibold tabular-nums text-yv-ink sm:ml-0">
              {parPlan[p.cle] >= 60 ? duree(parPlan[p.cle]) : fmtSecondes(parPlan[p.cle])}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Deux barres sur la meme echelle : secondes brutes et secondes equivalentes. */
export function BrutEquivalent({ brut, equiv, borneBasse }: { brut: number; equiv: number; borneBasse: boolean }) {
  const lignes = [
    { nom: "à l'écran, brut", s: brut, couleur: "bg-yv-rule-2", statut: <Statut s="mesure" /> },
    {
      nom: "équivalent pleine visibilité",
      s: equiv,
      couleur: "bg-yv-data",
      statut: <Statut s="hypothese" borneBasse={borneBasse} />,
    },
  ];
  return (
    <div className="space-y-2">
      {lignes.map((l) => (
        <div key={l.nom}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="flex flex-wrap items-center gap-2 text-yv-body">
              {l.nom}
              {l.statut}
            </span>
            <span className="font-semibold tabular-nums text-yv-ink">{fmtSecondes(l.s)}</span>
          </div>
          <div className="h-3 rounded-sm bg-yv-surface" aria-hidden>
            <span className={`block h-full rounded-sm ${l.couleur}`} style={{ width: `${(l.s / brut) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
