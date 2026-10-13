// Chiffres qui ne sont pas dans les JSON mais dans les documents de reference de docs/handoff-yverdon/.
// Chacun porte sa source. Aucun composant ne code de chiffre en dur : tout passe par ici ou par sources.ts.

export interface ChiffreSource<T> {
  valeur: T;
  source: string;
}

const RAPPORT = "Rapport de mesure v4.1, rencontre complète";
const FICHE = "Fiche Roseyres J09";
const SCRIPT_HAUTEURS = "scripts/mesure_hauteurs.py";
const DETAIL = "J09-passages-detail.json, règle des passages";

/** Regle des passages (J09-passages-detail.json, cle « regle »). */
export const PASSAGE_MIN_S: ChiffreSource<number> = { valeur: 8, source: DETAIL };
export const TOLERANCE_HORS_CHAMP_S: ChiffreSource<number> = { valeur: 8, source: DETAIL };

/** Seuils de plan sur une image 1280 x 720 (hauteur de la boite du bandeau). */
export const SEUIL_PLAN_MOYEN_PX: ChiffreSource<number> = { valeur: 24, source: SCRIPT_HAUTEURS };
export const SEUIL_GROS_PLAN_PX: ChiffreSource<number> = { valeur: 60, source: SCRIPT_HAUTEURS };
export const IMAGE_REFERENCE: ChiffreSource<string> = { valeur: "1280 × 720", source: SCRIPT_HAUTEURS };

/** Methode de lecture pendant le jeu. */
export const CRENEAU_LECTURE_S: ChiffreSource<number> = { valeur: 30, source: RAPPORT };
export const IMAGES_LUES_A_L_OEIL: ChiffreSource<number> = { valeur: 468, source: RAPPORT };
export const CONTROLE_SECONDES: ChiffreSource<number> = { valeur: 82, source: RAPPORT };
export const CONTROLE_ACCORD_PCT: ChiffreSource<number> = { valeur: 91, source: RAPPORT };
export const PRECISION_DUREES_PCT: ChiffreSource<number> = { valeur: 10, source: RAPPORT };
export const LECTURE_HORS_JEU_AVANT_COUP_ENVOI_S: ChiffreSource<number> = { valeur: 100, source: RAPPORT };

/** Cadres de l'extrait video Roseyres : detecteur reentraine sur ce nombre d'images du match (fiche, methode). */
export const DETECTEUR_REENTRAINE_IMAGES: ChiffreSource<number> = { valeur: 99, source: FICHE };

/** Clip EgoKiefer : detecteur v3 (modele/best_v3.pt, 25 classes) sur un extrait de 7 s (Guillaume Haas, 13.10.2026). */
export const DETECTEUR_VERSION: ChiffreSource<number> = { valeur: 3, source: "00-LIS-MOI-D-ABORD.md, modele/best_v3.pt" };
export const DETECTEUR_MARQUES: ChiffreSource<number> = { valeur: 25, source: "00-LIS-MOI-D-ABORD.md, modele/best_v3.pt" };
export const CLIP_EGOKIEFER_EXTRAIT_S: ChiffreSource<number> = { valeur: 7, source: "Guillaume Haas, 13.10.2026" };

/** Leviers de la fiche Roseyres (page 4). */
export const LEVIER_PASSAGES_CIBLE: ChiffreSource<number> = { valeur: 12, source: FICHE };
export const LEVIER_FACTEUR_LISIBILITE: ChiffreSource<number> = { valeur: 1.6, source: FICHE };

/** Fichier de diffusion complet (brief, section 1) : 2 h 27. La fenetre lue seconde par seconde est plus courte. */
export const DUREE_FICHIER_DIFFUSION_S: ChiffreSource<number> = { valeur: 8836, source: "00-LIS-MOI-D-ABORD.md, section 1" };

/** Debut de la periode a relever sur les reseaux sociaux (brief, section 5). */
export const DEBUT_RELEVE_SOCIAL: ChiffreSource<string> = { valeur: "juillet 2026", source: "00-LIS-MOI-D-ABORD.md, section 5" };

/** Dates de verification. */
export const PAGE_PARTENAIRES_VERIFIEE_LE: ChiffreSource<string> = {
  valeur: "09.10.2026",
  source: "referentiel-partenaires-v2.json",
};

/** Match mesure. */
export const DIFFUSEUR: ChiffreSource<string> = { valeur: "blue Sport", source: RAPPORT };

/** Date de la fiche Roseyres dont viennent les hypotheses de valeur (affluence supposee remplacee depuis). */
export const FICHE_HYPOTHESES_DATE: ChiffreSource<string> = { valeur: "10.10.2026", source: "Guillaume Haas, 13.10.2026" };
