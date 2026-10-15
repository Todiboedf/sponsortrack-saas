// Chargement des donnees au build. Les petits JSON sont importes et types a la compilation ;
// la chronologie (611 Ko) et le fichier optionnel des hauteurs EgoKiefer sont lus sur disque
// pendant le rendu statique et ne partent jamais vers le navigateur.
// Les controles en bas de fichier font echouer le build si un chiffre ne se reproduit pas.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import mesureJson from "../../../../docs/handoff-yverdon/data/J09-SLO-mesure-complete-donnees.json";
import passagesJson from "../../../../docs/handoff-yverdon/data/J09-passages-detail.json";
import roseyresJson from "../../../../docs/handoff-yverdon/data/Roseyres-J09-donnees-et-hypotheses.json";
import resumesJson from "../../../../docs/handoff-yverdon/data/EgoKiefer-resumes-septembre.json";
import referentielJson from "../../../../docs/handoff-yverdon/data/referentiel-partenaires-v2.json";
import reseauxJson from "../../../../docs/handoff-yverdon/data/reseaux-sociaux-J09.json";

import type {
  Chronologie,
  EgoKieferResumes,
  EntreeReferentiel,
  FichierHauteurs,
  HauteurPassage,
  Hypotheses,
  MesureMatch,
  ParPlan,
  PassagesDetail,
  ReseauxSociaux,
  RoseyresDonnees,
  SecondeChronologie,
} from "./types";
import { LEVIER_FACTEUR_LISIBILITE, LEVIER_PASSAGES_CIBLE } from "./regles";
import { valeur, valeurLevier, type ResultatValeur } from "./valeur";

const DOSSIER_DATA = path.join(process.cwd(), "docs", "handoff-yverdon", "data");

export const mesure: MesureMatch = mesureJson;
export const passages: PassagesDetail = passagesJson;
export const roseyres: RoseyresDonnees = roseyresJson;
export const resumesEgoKiefer: EgoKieferResumes = resumesJson;
/** Hypotheses de la fiche Roseyres du 10.10.2026 (affluence supposee) : servent au test de non-regression. */
export const hypothesesFiche = roseyres.hypotheses;
export const reseaux: ReseauxSociaux = reseauxJson;

/**
 * Hypotheses du match : celles de la fiche, sauf l'affluence, remplacee dans les deux scenarios par
 * l'affluence verifiee du match (SFL match center), et les abonnes Instagram par ceux du releve du 13.10.2026. Les tarifs stade restent par scenario.
 * La projection saison reprend cette affluence a chaque match, en hypothese.
 */
export const hypotheses: Hypotheses = {
  ...hypothesesFiche,
  instagram_abonnes: reseaux.comptes_club.instagram.abonnes ?? erreur("abonnes Instagram absents du releve"),
  instagram_verifie_le: dateReleve(reseaux.releve_le),
  affluence: {
    bas: reseaux.affluence_j09.valeur,
    base: reseaux.affluence_j09.valeur,
    haut: reseaux.affluence_j09.valeur,
  },
};

/** "2026-10-13" -> "13.10.2026" */
function dateReleve(iso: string): string {
  const [a, m, j] = iso.split("-");
  return `${j}.${m}.${a}`;
}

function erreur(message: string): never {
  throw new Error(`[yverdon] ${message}`);
}

// ---------------------------------------------------------------- referentiel

function estObjet(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function estEntreeReferentiel(x: unknown): x is EntreeReferentiel {
  return (
    estObjet(x) &&
    typeof x.label === "string" &&
    typeof x.statut === "string" &&
    typeof x.support === "string" &&
    typeof x.trained === "boolean" &&
    (x.note === undefined || typeof x.note === "string")
  );
}

const referentiel: Record<string, unknown> = referentielJson;

export const sourceReferentiel: { site_club: string } = referentielJson._sources;

/** Entree du referentiel, ou null si la marque n'y figure pas (creations non identifiees). */
export function entreeReferentielOuNull(cle: string): EntreeReferentiel | null {
  const e = referentiel[cle];
  if (e === undefined) return null;
  if (!estEntreeReferentiel(e)) erreur(`referentiel : entree ${cle} mal formee`);
  return e;
}

export function entreeReferentiel(cle: string): EntreeReferentiel {
  const e = referentiel[cle];
  if (!estEntreeReferentiel(e)) erreur(`referentiel : entree ${cle} absente ou mal formee`);
  return e;
}

// ---------------------------------------------------------------- classement

/** Classement des marques pendant le jeu (v4.1), marques a 0 s exclues. */
export function classementJeu(): { cle: string; secondes: number }[] {
  return Object.entries(mesure.sponsors_jeu_s)
    .filter(([, s]) => s > 0)
    .map(([cle, secondes]) => ({ cle, secondes }))
    .sort((a, b) => b.secondes - a.secondes);
}

// ---------------------------------------------------------------- chronologie

function estSeconde(x: unknown): x is SecondeChronologie {
  return (
    estObjet(x) &&
    typeof x.phase === "string" &&
    typeof x.source === "string" &&
    (typeof x.bandeau === "string" || (Array.isArray(x.bandeau) && x.bandeau.every((b) => typeof b === "string")))
  );
}

let chronologieCache: Chronologie | null = null;

export function chronologie(): Chronologie {
  if (chronologieCache) return chronologieCache;
  const brut: unknown = JSON.parse(
    readFileSync(path.join(DOSSIER_DATA, "J09-SLO-chronologie-bandeau-seconde-par-seconde.json"), "utf8"),
  );
  if (!estObjet(brut) || !estObjet(brut.secondes) || !estObjet(brut.bornes_diffusion_s)) {
    erreur("chronologie mal formee");
  }
  const secondes: Record<string, SecondeChronologie> = {};
  for (const [k, v] of Object.entries(brut.secondes)) {
    if (!estSeconde(v)) erreur(`chronologie : seconde ${k} mal formee`);
    secondes[k] = v;
  }
  chronologieCache = { bornes_diffusion_s: mesure.bornes_diffusion_s, secondes };
  return chronologieCache;
}

// ---------------------------------------------------------------- hauteurs (optionnel)

function estHauteurPassage(x: unknown): x is HauteurPassage {
  const nombreOuNull = (v: unknown) => v === null || typeof v === "number";
  return (
    estObjet(x) &&
    typeof x.clip === "string" &&
    typeof x.chrono === "string" &&
    nombreOuNull(x.secondes_visibles) &&
    (x.compte === null || typeof x.compte === "boolean") &&
    typeof x.n_detections === "number" &&
    nombreOuNull(x.hauteur_mediane_px) &&
    typeof x.plan === "string" &&
    nombreOuNull(x.conf_moyenne)
  );
}

function estParPlan(x: unknown): x is ParPlan {
  return estObjet(x) && typeof x.large === "number" && typeof x.moyen === "number" && typeof x.gros === "number";
}

/**
 * hauteurs_<marque>.json produit par scripts/mesure_hauteurs.py, a deposer dans
 * docs/handoff-yverdon/data/. Absent : null, et la page affiche la borne basse.
 */
export function hauteurs(marque: string): FichierHauteurs | null {
  const fichier = path.join(DOSSIER_DATA, `hauteurs_${marque}.json`);
  if (!existsSync(fichier)) return null;
  const brut: unknown = JSON.parse(readFileSync(fichier, "utf8"));
  if (
    !estObjet(brut) ||
    brut.marque !== marque ||
    !Array.isArray(brut.passages) ||
    !brut.passages.every(estHauteurPassage) ||
    !estParPlan(brut.secondes_par_plan)
  ) {
    erreur(`${fichier} mal forme`);
  }
  return { marque, passages: brut.passages, secondes_par_plan: brut.secondes_par_plan };
}

// ---------------------------------------------------------------- controles au build

function controler(condition: boolean, message: string): void {
  if (!condition) erreur(`controle echoue : ${message}`);
}

function controlerDonnees(): void {
  // Le detail des passages reproduit la v4.1 pour les deux marques des pages.
  for (const cle of ["roseyres", "egokiefer"]) {
    const m = passages.marques[cle];
    controler(m !== undefined, `${cle} absent de J09-passages-detail.json`);
    controler(m.secondes_jeu === mesure.sponsors_jeu_s[cle], `${cle} : secondes detail != v4.1`);
    controler(m.passages === mesure.passages_jeu[cle], `${cle} : passages detail != v4.1`);
    controler(m.detail.filter((p) => p.compte).length === m.passages, `${cle} : passages comptes`);
    controler(
      m.detail.reduce((t, p) => t + p.secondes_visibles, 0) === m.secondes_jeu,
      `${cle} : somme des secondes visibles`,
    );
  }
  const somme = Object.values(mesure.sponsors_jeu_s).reduce((t, s) => t + s, 0);
  controler(somme === mesure.total_sponsor_jeu_s, "somme des marques != total sponsor");
  const b = mesure.bornes_diffusion_s;
  controler(b.fin_1re_mi_temps - b.coup_envoi + (b.fin_match - b.reprise) === mesure.jeu_s, "bornes != jeu_s");

  // TEST ROSEYRES de valeur.py : la formule portee redonne la fiche, champ par champ.
  const e = roseyres.exposition;
  const r = valeur(hypothesesFiche, passages.marques.roseyres.secondes_jeu, passages.marques.roseyres.passages, e.par_plan);
  const paires: [string, typeof r.base.match, typeof roseyres.valeur_match.base][] = [
    ["base", r.base.match, roseyres.valeur_match.base],
    ["optimiste", r.optimiste.match, roseyres.valeur_match.haut],
  ];
  for (const [nom, calc, fiche] of paires) {
    controler(calc.tv === fiche.tv, `${nom} tv`);
    controler(calc.tvBrut === fiche.tv_brut, `${nom} tv_brut`);
    controler(calc.stade === fiche.stade, `${nom} stade`);
    controler(calc.socialOrganique === fiche.social_organique, `${nom} social organique`);
    controler(calc.socialPackage === fiche.social_package, `${nom} social package`);
    controler(calc.totalMesure === fiche.total_mesure, `${nom} total`);
    controler(calc.totalAvecPackage === fiche.total_avec_package, `${nom} total avec package`);
    controler(calc.contactsTv === fiche.contacts_tv, `${nom} contacts tv`);
    controler(calc.contactsStade === fiche.contacts_stade, `${nom} contacts stade`);
    controler(calc.impressionsSocialOrg === fiche.impressions_social_org, `${nom} impressions org`);
    controler(calc.impressionsSocialPackage === fiche.impressions_social_pack, `${nom} impressions package`);
  }
  controler(r.base.saison.totalMesure === roseyres.valeur_saison.base.total_mesure, "saison base");
  controler(r.optimiste.saison.totalMesure === roseyres.valeur_saison.haut.total_mesure, "saison optimiste");
  controler(r.base.saison.totalAvecPackage === roseyres.valeur_saison.base.total_avec_package, "saison base package");
  controler(
    r.optimiste.saison.totalAvecPackage === roseyres.valeur_saison.haut.total_avec_package,
    "saison optimiste package",
  );
  controler(r.equivAffiche === e.equiv_s, "secondes equivalentes");

  // Leviers de la fiche (scenario base).
  const brut = passages.marques.roseyres.secondes_jeu;
  const n = passages.marques.roseyres.passages;
  const cible = roseyres.leviers;
  const cibleP = LEVIER_PASSAGES_CIBLE.valeur;
  const plusDePassages = valeurLevier(hypothesesFiche, brut, cibleP, (r.equiv * cibleP) / n);
  controler(plusDePassages === cible.passages_12, `levier passages : ${plusDePassages} != ${cible.passages_12}`);
  const lisible = valeurLevier(hypothesesFiche, brut, n, r.equiv * LEVIER_FACTEUR_LISIBILITE.valeur);
  controler(lisible === cible.creation_lisible, `levier creation : ${lisible} != ${cible.creation_lisible}`);
  controler(r.base.match.totalAvecPackage === cible.package_social, "levier package social");

  // Valeurs avec l'affluence verifiee (1'435), attendues par Guillaume Haas le 13.10.2026.
  const hm = hauteurs("egokiefer");
  controler(hm !== null, "hauteurs_egokiefer.json absent");
  const attendus: [string, ResultatValeur, number[]][] = [
    ["roseyres", valeur(hypotheses, brut, n, e.par_plan), [824, 2411, 14832, 43398]],
    [
      "egokiefer",
      valeur(
        hypotheses,
        passages.marques.egokiefer.secondes_jeu,
        passages.marques.egokiefer.passages,
        hm?.secondes_par_plan ?? { large: 0, moyen: 0, gros: 0 },
      ),
      [2372, 7060, 42696, 127080],
    ],
  ];
  for (const [cle, x, [base, opt, saisonBase, saisonOpt]] of attendus) {
    controler(x.base.match.totalMesure === base, `${cle} base ${x.base.match.totalMesure} != ${base}`);
    controler(x.optimiste.match.totalMesure === opt, `${cle} optimiste ${x.optimiste.match.totalMesure} != ${opt}`);
    controler(x.base.saison.totalMesure === saisonBase, `${cle} saison base`);
    controler(x.optimiste.saison.totalMesure === saisonOpt, `${cle} saison optimiste`);
  }
  const ego = attendus[1][1].base.match;
  controler(ego.tv === 2174 && ego.stade === 195 && ego.socialOrganique === 3, "egokiefer base par canal");
  controler(attendus[1][1].equivAffiche === 241.5, "egokiefer secondes equivalentes");
}

controlerDonnees();
