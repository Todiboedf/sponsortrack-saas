// Libelles des marques vues pendant le jeu, cles de J09-SLO-mesure-complete-donnees.json.
// Sources : rapport de mesure v4.1 (refs/Yverdon-J09-SLO-Mesure-match-complete.pdf) et
// referentiel-partenaires-v2.json. Les creations non identifiees portent « a confirmer ».
// asa et Jolly Voyages sont des panneaux fixes (rapport v4.1) : comptes seulement quand ils occupent
// la zone du bandeau, mesure propre au prochain match.

export interface LibelleMarque {
  nom: string;
  /** Precision affichee en petit apres le nom. */
  precision?: string;
  /** Nom ou identite a faire confirmer par le club. */
  aConfirmer: boolean;
  /** Panneau fixe compte quand il occupe la zone du bandeau (rapport v4.1). */
  panneauFixe?: boolean;
}

const G = "« ";
const D = " »";

export const LIBELLES: Record<string, LibelleMarque> = {
  egokiefer: { nom: "EgoKiefer", aConfirmer: false },
  multitel: { nom: "Multitel", aConfirmer: false },
  piller: { nom: "Désinfection Piller", aConfirmer: false },
  rouge: { nom: `${G}rouge${D}`, precision: "Rouge FM\u00a0?", aConfirmer: true },
  garage_plaine: { nom: "Garage de la Plaine", aConfirmer: false },
  sante_champagne: { nom: "La Santé à Champagne", aConfirmer: false },
  roseyres: { nom: "Roseyres.ch", aConfirmer: false },
  ab_serrurerie: { nom: "AB Serrurerie", aConfirmer: false },
  jubin: { nom: `${G}Jubin${D}`, aConfirmer: true },
  asa: { nom: `${G}asa${D}`, precision: "panneaux fixes", aConfirmer: true, panneauFixe: true },
  aon: { nom: "AON", aConfirmer: false },
  jolly_voyages: { nom: "Jolly Voyages", precision: "panneaux fixes", aConfirmer: false, panneauFixe: true },
  kiki_pneus: { nom: "Kiki Pneus", aConfirmer: false },
  // Vues seulement hors jeu (rapport v4.1, tableau « Présence par marque », lignes 13 à 20).
  carrosserie_maisto: { nom: "Carrosserie Maisto", aConfirmer: false },
  vin_bonne_humeur: { nom: `${G}Le vin des créateurs de bonne humeur${D}`, precision: "slogan", aConfirmer: true },
  hotel_source: { nom: "Hôtel de la Source", aConfirmer: false },
  chris_medical: { nom: "Chris Medical", aConfirmer: false },
  swica: { nom: "SWICA", aConfirmer: false },
  swisstems: { nom: "Swisstems", aConfirmer: false },
  pause_recharge: { nom: "Pause & Recharge", aConfirmer: false },
  nordvent: { nom: "Nordvent", aConfirmer: false },
};

/** Habillage de la ligue, auto-promotion du club et bandeau vide (cles de ligue_jeu_s, rapport v4.1). */
export const LIBELLES_LIGUE: Record<string, { nom: string; groupe: "ligue" | "club" | "vide" }> = {
  dieci: { nom: "dieci", groupe: "ligue" },
  macron: { nom: "Macron", groupe: "ligue" },
  league: { nom: "Challenge League", groupe: "ligue" },
  bluesport: { nom: "blue Sport", groupe: "ligue" },
  ys: { nom: "Yverdon Sport FC", groupe: "club" },
  none: { nom: "bandeau vide", groupe: "vide" },
};

export function libelleLigue(cle: string): { nom: string; groupe: "ligue" | "club" | "vide" } {
  const l = LIBELLES_LIGUE[cle];
  if (!l) throw new Error(`Cle de ligue sans libelle : ${cle}`);
  return l;
}

const VOYELLE = /^[aeiouyàâéèêëîïôûùAEIOUYÉÈÊ]/;

/** « de Roseyres.ch », « d'EgoKiefer ». */
export function de(nom: string): string {
  return VOYELLE.test(nom) ? `d'${nom}` : `de ${nom}`;
}

/** « que Roseyres.ch », « qu'EgoKiefer ». */
export function que(nom: string): string {
  return VOYELLE.test(nom) ? `qu'${nom}` : `que ${nom}`;
}

/** Adversaires tels qu'on les ecrit : les donnees sont sans accents. */
const ADVERSAIRES: Record<string, string> = { "Etoile Carouge": "Étoile Carouge" };

export function adversaire(nom: string): string {
  return ADVERSAIRES[nom] ?? nom;
}

export function libelle(cle: string): LibelleMarque {
  const l = LIBELLES[cle];
  if (!l) throw new Error(`Marque sans libelle : ${cle}`);
  return l;
}

/** Etiquettes courtes de la chronologie seconde par seconde (voir le brief, section 3). */
export const ETIQUETTE_CHRONOLOGIE: Record<string, string> = {
  egokiefer: "ego",
  garage_plaine: "garage",
  sante_champagne: "sante",
  ab_serrurerie: "ab",
  jolly_voyages: "jolly",
  roseyres: "roseyres",
};

export const ETIQUETTE_HORS_CHAMP = "hors_champ";
