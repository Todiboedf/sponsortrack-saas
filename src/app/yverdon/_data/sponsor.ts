// Assemble, pour une marque, tout ce que la page affiche. Chaque chiffre sort des JSON
// (sources.ts) ou de la formule de valeur.py (valeur.ts) ; les composants ne font que le mettre en forme.

import { dateCh } from "./format";
import { ETIQUETTE_CHRONOLOGIE, ETIQUETTE_HORS_CHAMP, libelle } from "./marques";
import { VIDEOS, type Video } from "./media";
import { LEVIER_FACTEUR_LISIBILITE, LEVIER_PASSAGES_CIBLE, PAGE_PARTENAIRES_VERIFIEE_LE } from "./regles";
import {
  chronologie,
  classementJeu,
  entreeReferentiel,
  hauteurs,
  hypotheses,
  hypothesesFiche,
  mesure,
  passages,
  reseaux,
  resumesEgoKiefer,
  roseyres,
} from "./sources";
import type {
  Bornes,
  EgoKieferResumes,
  FichierHauteurs,
  Hypotheses,
  ParPlan,
  PassageDetailBrut,
  ReseauxSociaux,
} from "./types";
import { gainPct, valeur, valeurLevier, type ResultatValeur } from "./valeur";

export type CleSponsor = "roseyres" | "egokiefer";

export type Statut = "mesure" | "verifie" | "hypothese";

export type LibellePlan = "plan large" | "plan moyen" | "gros plan";

export interface PlanPassage {
  libelle: LibellePlan;
  hauteurPx: number | null;
  /** Aucune detection sur l'extrait : compte en plan large, l'hypothese la plus basse. */
  aucuneDetection: boolean;
}

export interface PassageVue {
  id: string;
  /** Numero du passage compte ; null pour une apparition de moins de 8 s. */
  numero: number | null;
  miTemps: 1 | 2;
  chronoDebut: string;
  chronoFin: string;
  /** Secondes depuis le debut de la mi-temps, debut inclus, fin incluse. */
  debutS: number;
  finS: number;
  secondesVisibles: number;
  compte: boolean;
  plan: PlanPassage | null;
}

export type TypeSegment = "marque" | "autre" | "hors_champ";

export interface Segment {
  /** Debut inclus et fin exclue, en secondes depuis le debut de la mi-temps. */
  debutS: number;
  finS: number;
  type: TypeSegment;
}

export interface MiTempsVue {
  numero: 1 | 2;
  dureeS: number;
  /** Chrono du tableau d'affichage au coup d'envoi de la mi-temps. */
  chronoDepartS: number;
  segments: Segment[];
  secondesMarque: number;
  passagesComptes: number;
}

export interface LigneClassement {
  cle: string;
  nom: string;
  precision?: string;
  aConfirmer: boolean;
  panneauFixe: boolean;
  secondes: number;
  rang: number;
  estMarque: boolean;
}

export interface Levier {
  titre: string;
  description: string;
  valeur: number;
  gainPct: number;
  /** Ce que le levier ajoute a la valeur du match, en francs. */
  gainChf: number;
}

export interface Exposition {
  brutS: number;
  equivS: number;
  /** Secondes par plan ; null tant que les hauteurs ne sont pas mesurees. */
  parPlan: ParPlan | null;
  parPlanSource: "fiche" | "mesure_hauteurs" | null;
  horsJeuS: number;
  /** La marque est connue du detecteur hors jeu : le 0 est une mesure (plancher). */
  horsJeuMesure: boolean;
}

export interface VueSponsor {
  cle: CleSponsor;
  nom: string;
  match: typeof roseyres.match & { diffusionS: number };
  bornes: Bornes;
  versionMesure: number;
  jeu: {
    jeuS: number;
    bandeauVisibleS: number;
    totalSponsorJeuS: number;
    nbMarquesJeu: number;
    nbMarquesStade: number;
    cleanCoJeuS: number;
  };
  marque: {
    secondes: number;
    passages: number;
    rang: number;
    passageMinS: number;
    passageMaxS: number;
  };
  /** Valeurs calculees sans hauteurs de bandeau mesurees : tout en plan large. */
  borneBasse: boolean;
  video: Video;
  miTemps: [MiTempsVue, MiTempsVue];
  passages: PassageVue[];
  exposition: Exposition;
  classement: LigneClassement[];
  valeur: ResultatValeur;
  hypotheses: Hypotheses;
  /** Affluence supposee par la fiche Roseyres du 10.10.2026, remplacee par l'affluence verifiee. */
  affluenceFiche: Hypotheses["affluence"];
  /** Valeur du match avec les hypotheses de la fiche (Roseyres seulement : c'est sa fiche). */
  valeurFiche: { base: number; optimiste: number } | null;
  reseaux: ReseauxSociaux;
  saison: { matchs: number; expositionS: number; passages: number };
  leviers: Levier[];
  resumes: EgoKieferResumes | null;
  /** Fichiers de donnees reellement utilises par cette page. */
  sources: string[];
  /** Hauteurs du bandeau mesurees (fiche Roseyres ou mesure_hauteurs.py). */
  plansMesures: boolean;
}

// ---------------------------------------------------------------- plans

function libellePlan(texte: string): LibellePlan {
  if (texte.includes("gros")) return "gros plan";
  if (texte.includes("moyen")) return "plan moyen";
  if (texte.includes("large")) return "plan large";
  throw new Error(`[yverdon] plan inconnu : ${texte}`);
}

function planRoseyres(p: PassageDetailBrut): PlanPassage | null {
  const fiche = roseyres.exposition.passages.find((f) => f.debut === p.chrono_debut);
  if (!fiche) return null;
  return { libelle: libellePlan(fiche.plan), hauteurPx: fiche.hauteur_px, aucuneDetection: false };
}

function planHauteurs(h: FichierHauteurs, p: PassageDetailBrut): PlanPassage | null {
  const m = h.passages.find((x) => x.chrono === `${p.chrono_debut}-${p.chrono_fin}`);
  if (!m) return null;
  return {
    libelle: libellePlan(m.plan),
    hauteurPx: m.hauteur_mediane_px,
    aucuneDetection: m.hauteur_mediane_px === null,
  };
}

// ---------------------------------------------------------------- frise

function segmentsMiTemps(etiquette: string, debutDiffusion: number, finDiffusion: number): Segment[] {
  const secondes = chronologie().secondes;
  const out: Segment[] = [];
  for (let s = debutDiffusion; s < finDiffusion; s++) {
    const sec = secondes[String(s)];
    if (!sec || typeof sec.bandeau !== "string") throw new Error(`[yverdon] chronologie : seconde ${s} absente`);
    const type: TypeSegment =
      sec.bandeau === etiquette ? "marque" : sec.bandeau === ETIQUETTE_HORS_CHAMP ? "hors_champ" : "autre";
    const rel = s - debutDiffusion;
    const dernier = out[out.length - 1];
    if (dernier && dernier.type === type && dernier.finS === rel) dernier.finS = rel + 1;
    else out.push({ debutS: rel, finS: rel + 1, type });
  }
  return out;
}

// ---------------------------------------------------------------- vue

export function construireVue(cle: CleSponsor): VueSponsor {
  const detail = passages.marques[cle];
  const b = mesure.bornes_diffusion_s;
  const mesureHauteurs = cle === "egokiefer" ? hauteurs(cle) : null;

  // Passages, numerotes dans l'ordre des passages qui comptent.
  let numero = 0;
  if (mesureHauteurs) {
    for (const p of detail.detail.filter((x) => x.compte)) {
      if (!planHauteurs(mesureHauteurs, p)) {
        throw new Error(`[yverdon] hauteurs_${cle}.json : pas de plan pour ${p.chrono_debut}-${p.chrono_fin}`);
      }
    }
  }
  const vuesPassages: PassageVue[] = detail.detail.map((p, i) => {
    const miTemps: 1 | 2 = p.mi_temps === 1 ? 1 : 2;
    const depart = miTemps === 1 ? b.coup_envoi : b.reprise;
    if (p.compte) numero += 1;
    const plan = cle === "roseyres" ? planRoseyres(p) : mesureHauteurs ? planHauteurs(mesureHauteurs, p) : null;
    return {
      id: `${cle}-${i}`,
      numero: p.compte ? numero : null,
      miTemps,
      chronoDebut: p.chrono_debut,
      chronoFin: p.chrono_fin,
      debutS: p.diffusion_debut_s - depart,
      finS: p.diffusion_fin_s - depart,
      secondesVisibles: p.secondes_visibles,
      compte: p.compte,
      plan: p.compte ? plan : null,
    };
  });

  const etiquette = ETIQUETTE_CHRONOLOGIE[cle];
  const miTemps = ([1, 2] as const).map((n): MiTempsVue => {
    const debut = n === 1 ? b.coup_envoi : b.reprise;
    const fin = n === 1 ? b.fin_1re_mi_temps : b.fin_match;
    const segments = segmentsMiTemps(etiquette, debut, fin);
    const ps = vuesPassages.filter((p) => p.miTemps === n);
    return {
      numero: n,
      dureeS: fin - debut,
      // La 2e mi-temps repart a 45:00 au tableau d'affichage (regle de J09-passages-detail.json).
      chronoDepartS: n === 1 ? 0 : 45 * 60,
      segments,
      secondesMarque: ps.reduce((t, p) => t + p.secondesVisibles, 0),
      passagesComptes: ps.filter((p) => p.compte).length,
    };
  }) as [MiTempsVue, MiTempsVue];

  // Controle : la frise (chronologie) et le detail des passages donnent les memes secondes.
  const secondesFrise = miTemps.reduce(
    (t, m) => t + m.segments.filter((s) => s.type === "marque").reduce((u, s) => u + s.finS - s.debutS, 0),
    0,
  );
  if (secondesFrise !== detail.secondes_jeu) {
    throw new Error(`[yverdon] ${cle} : chronologie ${secondesFrise} s != detail ${detail.secondes_jeu} s`);
  }

  // Exposition et valeur.
  let parPlan: ParPlan | null = null;
  let parPlanSource: Exposition["parPlanSource"] = null;
  if (cle === "roseyres") {
    parPlan = roseyres.exposition.par_plan;
    parPlanSource = "fiche";
  } else if (mesureHauteurs) {
    parPlan = mesureHauteurs.secondes_par_plan;
    parPlanSource = "mesure_hauteurs";
    const somme = parPlan.large + parPlan.moyen + parPlan.gros;
    if (somme !== detail.secondes_jeu) {
      throw new Error(
        `[yverdon] hauteurs_${cle}.json : secondes_par_plan = ${somme} s, attendu ${detail.secondes_jeu} s (toutes les apparitions, comptees ou non)`,
      );
    }
  }
  const borneBasse = parPlan === null;
  const planCalcul: ParPlan = parPlan ?? { large: detail.secondes_jeu, moyen: 0, gros: 0 };
  const v = valeur(hypotheses, detail.secondes_jeu, detail.passages, planCalcul);

  const ref = entreeReferentiel(cle);
  const exposition: Exposition = {
    brutS: detail.secondes_jeu,
    equivS: v.equivAffiche,
    parPlan,
    parPlanSource,
    horsJeuS: mesure.sponsors_hors_jeu_s[cle] ?? 0,
    horsJeuMesure: ref.trained,
  };

  const classement: LigneClassement[] = classementJeu().map((c, i) => {
    const l = libelle(c.cle);
    return {
      cle: c.cle,
      nom: l.nom,
      precision: l.precision,
      aConfirmer: l.aConfirmer,
      panneauFixe: l.panneauFixe === true,
      secondes: c.secondes,
      rang: i + 1,
      estMarque: c.cle === cle,
    };
  });
  const rangMarque = classement.find((c) => c.estMarque)?.rang;
  if (rangMarque === undefined) throw new Error(`[yverdon] ${cle} absent du classement`);

  // Leviers, scenario base.
  const reference = v.base.match.totalMesure;
  const leviers: Levier[] = [];
  const facteur = LEVIER_FACTEUR_LISIBILITE.valeur;
  const leviersPlans = parPlan !== null;
  if (cle === "roseyres") {
    const cible = LEVIER_PASSAGES_CIBLE.valeur;
    const premiere = classement[0];
    const premierePassages = mesure.passages_jeu[premiere.cle];
    const lPassages = valeurLevier(hypotheses, v.secondesBrutes, cible, (v.equiv * cible) / v.passages);
    leviers.push({
      titre: `${cible} passages au lieu de ${v.passages}`,
      description: `Obtenir du club une part de rotation proche de celle des premières marques (${premiere.nom}\u00a0: ${premierePassages} passages). Même création, même lisibilité.`,
      valeur: lPassages,
      gainPct: gainPct(lPassages, reference),
      gainChf: lPassages - reference,
    });
  }
  if (leviersPlans) {
    // Ne se chiffre que si les plans sont mesures : sur la borne basse, il ne voudrait rien dire.
    const lLisible = valeurLevier(hypotheses, v.secondesBrutes, v.passages, v.equiv * facteur);
    leviers.push({
      titre: cle === "roseyres" ? "Une création plus contrastée" : "Une création plus lisible",
      description: `${cle === "roseyres" ? "Logo plus grand, fond plus sombre" : "Logo plus grand, plus contrasté"}\u00a0: lisible dès le plan large. Indice de visibilité multiplié par ${String(facteur).replace(".", ",")} sur le même temps d'écran.`,
      valeur: lLisible,
      gainPct: gainPct(lLisible, reference),
      gainChf: lLisible - reference,
    });
  }
  leviers.push({
    titre: `${hypotheses.posts_partenaire_par_match} publications par match`,
    description: `Annonce «\u00a0partenaire du match\u00a0» et extrait vidéo avec le bandeau, sur les comptes du club.`,
    valeur: v.base.match.totalAvecPackage,
    gainPct: gainPct(v.base.match.totalAvecPackage, reference),
    gainChf: v.base.match.socialPackage,
  });

  const visibles = detail.detail.filter((p) => p.compte).map((p) => p.secondes_visibles);
  const n = hypotheses.matchs_domicile;

  return {
    cle,
    nom: libelle(cle).nom,
    match: { ...roseyres.match, diffusionS: Object.keys(chronologie().secondes).length },
    bornes: b,
    versionMesure: mesure.version,
    jeu: {
      jeuS: mesure.jeu_s,
      bandeauVisibleS: mesure.bandeau_visible_s,
      totalSponsorJeuS: mesure.total_sponsor_jeu_s,
      nbMarquesJeu: classement.length,
      nbMarquesStade: new Set([
        ...classement.map((c) => c.cle),
        ...Object.keys(mesure.sponsors_hors_jeu_s).filter((k) => mesure.sponsors_hors_jeu_s[k] > 0),
      ]).size,
      cleanCoJeuS: mesure.panneaux_fixes_s.clean_co.jeu,
    },
    marque: {
      secondes: detail.secondes_jeu,
      passages: detail.passages,
      rang: rangMarque,
      passageMinS: Math.min(...visibles),
      passageMaxS: Math.max(...visibles),
    },
    borneBasse,
    video: VIDEOS[cle],
    miTemps,
    passages: vuesPassages,
    exposition,
    classement,
    valeur: v,
    hypotheses,
    affluenceFiche: hypothesesFiche.affluence,
    valeurFiche:
      cle === "roseyres"
        ? (() => {
            const f = valeur(hypothesesFiche, detail.secondes_jeu, detail.passages, planCalcul);
            return { base: f.base.match.totalMesure, optimiste: f.optimiste.match.totalMesure };
          })()
        : null,
    reseaux,
    saison: { matchs: n, expositionS: detail.secondes_jeu * n, passages: detail.passages * n },
    leviers,
    resumes: cle === "egokiefer" ? resumesEgoKiefer : null,
    sources: [
      `mesure du match version ${mesure.version}`,
      "détail des passages",
      "chronologie du bandeau seconde par seconde",
      cle === "roseyres" ? "fiche Roseyres (plans et hauteurs, hypothèses de valeur)" : "hypothèses de valeur de la fiche Roseyres",
      ...(cle === "egokiefer" ? ["résumés de septembre"] : []),
      ...(mesureHauteurs ? ["hauteurs du bandeau mesurées par apparition"] : []),
      `affluence du SFL match center lue le ${dateCh(reseaux.releve_le)}`,
      `relevé des réseaux sociaux du ${dateCh(reseaux.releve_le)}`,
      `page partenaires du club relevée le ${PAGE_PARTENAIRES_VERIFIEE_LE.valeur}`,
    ],
    plansMesures: parPlan !== null,
  };
}
