// Vue club (/yverdon/club) : tout le bandeau du match, toutes marques nommees, depuis
// J09-SLO-mesure-complete-donnees.json (v4.1). Pas de valeur media sur cette page.
// Les controles font echouer le build si un total ne se reproduit pas.

import { dateCh } from "./format";
import { libelle, libelleLigue } from "./marques";
import { CONTROLES_CLUB } from "./regles";
import { entreeReferentielOuNull, mesure, reseaux, roseyres } from "./sources";

export interface PartJeu {
  cle: "sponsors" | "ligue" | "club" | "vide" | "hors_image";
  libelle: string;
  detail: string;
  secondes: number;
}

export interface LigneMarqueClub {
  cle: string;
  nom: string;
  precision?: string;
  aConfirmer: boolean;
  jeuS: number;
  /** null : la creation n'est pas connue du detecteur hors jeu, donc non mesuree. */
  horsJeuS: number | null;
  passages: number;
  type: "LED" | "panneau fixe";
}

export interface LigneLigue {
  cle: string;
  nom: string;
  groupe: "ligue" | "club";
  jeuS: number;
  passages: number | null;
}

export interface VueClub {
  match: typeof roseyres.match;
  misAJourLe: string;
  versionMesure: number;
  jeuS: number;
  bandeauVisibleS: number;
  partage: PartJeu[];
  marques: LigneMarqueClub[];
  nbMarquesJeu: number;
  aZero: LigneMarqueClub[];
  ligue: LigneLigue[];
  cleanCo: { jeuS: number; horsJeuS: number; sequences: number };
  passages: { cle: string; nom: string; passages: number; groupe: "marque" | "ligue" | "club" }[];
}

function controler(condition: boolean, message: string): void {
  if (!condition) throw new Error(`[yverdon] vue club, controle echoue : ${message}`);
}

export function construireVueClub(): VueClub {
  const m = mesure;
  const att = CONTROLES_CLUB.valeur;

  // 1. Partage du temps de jeu.
  const somme = (cles: string[]) => cles.reduce((t, k) => t + (m.ligue_jeu_s[k] ?? 0), 0);
  const clesLigue = Object.keys(m.ligue_jeu_s).filter((k) => libelleLigue(k).groupe === "ligue");
  const sponsorsS = Object.values(m.sponsors_jeu_s).reduce((t, s) => t + s, 0);
  const ligueS = somme(clesLigue);
  const clubS = somme(["ys"]);
  const videS = somme(["none"]);
  const bandeauS = sponsorsS + ligueS + clubS + videS;
  const horsImageS = m.jeu_s - m.bandeau_visible_s;
  controler(sponsorsS === m.total_sponsor_jeu_s && sponsorsS === att.sponsorsS, `sponsors ${sponsorsS}`);
  controler(ligueS === att.ligueS, `ligue ${ligueS}`);
  controler(clubS === att.clubS, `club ${clubS}`);
  controler(videS === att.videS, `bandeau vide ${videS}`);
  controler(bandeauS === m.bandeau_visible_s && bandeauS === att.bandeauS, `${sponsorsS} + ${ligueS} + ${clubS} + ${videS} = ${bandeauS}`);
  controler(bandeauS + horsImageS === m.jeu_s && m.jeu_s === att.jeuS && horsImageS === att.horsImageS, `${bandeauS} + ${horsImageS} = ${m.jeu_s}`);

  const partage: PartJeu[] = [
    { cle: "sponsors", libelle: "Sponsors et annonceurs", detail: `${Object.values(m.sponsors_jeu_s).filter((s) => s > 0).length} marques`, secondes: sponsorsS },
    { cle: "ligue", libelle: "Ligue", detail: clesLigue.map((k) => libelleLigue(k).nom).join(", "), secondes: ligueS },
    { cle: "club", libelle: "Club", detail: "Yverdon Sport FC, auto-promotion", secondes: clubS },
    { cle: "vide", libelle: "Bandeau vide", detail: "transition, illisible", secondes: videS },
    { cle: "hors_image", libelle: "Bandeau pas à l'image", detail: "gros plans, ralentis, tribunes", secondes: horsImageS },
  ];

  // 2. Les marques vues dans le stade, pendant le jeu ou hors jeu.
  const cles = [...new Set([...Object.keys(m.sponsors_jeu_s), ...Object.keys(m.sponsors_hors_jeu_s)])];
  const marques: LigneMarqueClub[] = cles
    .map((cle) => {
      const l = libelle(cle);
      const ref = entreeReferentielOuNull(cle);
      const horsJeu = m.sponsors_hors_jeu_s[cle];
      return {
        cle,
        nom: l.nom,
        precision: l.precision,
        aConfirmer: l.aConfirmer,
        jeuS: m.sponsors_jeu_s[cle] ?? 0,
        // Absente des mesures hors jeu : 0 s si le detecteur connait la creation, sinon non mesuree.
        // Une classe suspendue (fusionnee avec une autre) ne compte pas comme connue.
        horsJeuS: horsJeu !== undefined ? horsJeu : ref?.trained && !/suspendue/i.test(ref.note ?? "") ? 0 : null,
        passages: m.passages_jeu[cle] ?? 0,
        type: l.panneauFixe ? ("panneau fixe" as const) : ("LED" as const),
      };
    })
    .sort((a, b) => b.jeuS - a.jeuS || (b.horsJeuS ?? 0) - (a.horsJeuS ?? 0));
  controler(marques.length === att.marques, `${marques.length} marques, attendu ${att.marques}`);

  // 3. Les creations a zero seconde pendant le jeu.
  const aZero = marques.filter((x) => x.jeuS === 0);
  controler(aZero.length === att.aZero, `${aZero.length} creations a zero, attendu ${att.aZero}`);

  // Ligue et club, a part.
  const ligue: LigneLigue[] = Object.entries(m.ligue_jeu_s)
    .filter(([k]) => libelleLigue(k).groupe !== "vide")
    .map(([k, s]) => {
      const l = libelleLigue(k);
      return { cle: k, nom: l.nom, groupe: l.groupe === "club" ? ("club" as const) : ("ligue" as const), jeuS: s, passages: m.passages_jeu[k] ?? null };
    })
    .sort((a, b) => (a.groupe === b.groupe ? b.jeuS - a.jeuS : a.groupe === "ligue" ? -1 : 1));

  // 5. Passages par marque, ligue et club compris.
  const passages = Object.entries(m.passages_jeu)
    .map(([cle, n]) => {
      const lig = cle in m.ligue_jeu_s ? libelleLigue(cle) : null;
      return {
        cle,
        nom: lig ? lig.nom : libelle(cle).nom,
        passages: n,
        groupe: lig ? (lig.groupe === "club" ? ("club" as const) : ("ligue" as const)) : ("marque" as const),
      };
    })
    .sort((a, b) => b.passages - a.passages);
  controler(passages[0]?.cle === att.premierePassages, `en tete des passages : ${passages[0]?.cle}`);

  const cc = m.panneaux_fixes_s.clean_co;
  return {
    match: roseyres.match,
    misAJourLe: dateCh(reseaux.releve_le),
    versionMesure: m.version,
    jeuS: m.jeu_s,
    bandeauVisibleS: m.bandeau_visible_s,
    partage,
    marques,
    nbMarquesJeu: marques.filter((x) => x.jeuS > 0).length,
    aZero,
    ligue,
    cleanCo: { jeuS: cc.jeu, horsJeuS: cc.hors_jeu, sequences: cc.sequences_8s },
    passages,
  };
}
