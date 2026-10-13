// Types stricts des fichiers de docs/handoff-yverdon/data/.
// Les JSON importes sont assignes a ces types : toute derive de structure casse la compilation.

export interface Bornes {
  coup_envoi: number;
  fin_1re_mi_temps: number;
  reprise: number;
  fin_match: number;
}

/** J09-SLO-mesure-complete-donnees.json, version 4.1 : fait foi pour les totaux. */
export interface MesureMatch {
  match: string;
  date: string;
  jeu_s: number;
  bandeau_visible_s: number;
  sponsors_jeu_s: Record<string, number>;
  sponsors_hors_jeu_s: Record<string, number>;
  ligue_jeu_s: Record<string, number>;
  total_sponsor_jeu_s: number;
  total_sponsor_hors_jeu_s: number;
  passages_jeu: Record<string, number>;
  bornes_diffusion_s: Bornes;
  version: number;
  panneaux_fixes_s: {
    clean_co: {
      jeu: number;
      hors_jeu: number;
      sequences_8s: number;
      largeur_mediane_px: number;
    };
  };
}

export interface PassageDetailBrut {
  mi_temps: number;
  diffusion_debut_s: number;
  diffusion_fin_s: number;
  secondes_visibles: number;
  chrono_debut: string;
  chrono_fin: string;
  compte: boolean;
}

export interface MarquePassages {
  secondes_jeu: number;
  passages: number;
  detail: PassageDetailBrut[];
}

/** J09-passages-detail.json : chaque passage de chaque marque pendant le jeu. */
export interface PassagesDetail {
  match: string;
  bornes_diffusion_s: Bornes;
  regle: string;
  marques: Record<string, MarquePassages>;
}

export interface Fourchette {
  bas: number;
  base: number;
  haut: number;
}

export interface ParPlan {
  large: number;
  moyen: number;
  gros: number;
}

export interface Hypotheses {
  audience_tv: Fourchette;
  cpm_tv_30s: Fourchette;
  qi: ParPlan;
  affluence: Fourchette;
  cpm_stade: Fourchette;
  qi_stade: number;
  duree_passage_s: number;
  instagram_abonnes: number;
  instagram_verifie_le: string;
  portee_post: Fourchette;
  cpm_social: Fourchette;
  posts_partenaire_par_match: number;
  part_bandeau_contenus: number;
  vues_resume_video: number;
  matchs_domicile: number;
  variation_saison: number;
}

export interface ValeurScenarioJson {
  tv: number;
  tv_brut: number;
  stade: number;
  social_organique: number;
  social_package: number;
  total_mesure: number;
  total_avec_package: number;
  contacts_tv: number;
  contacts_stade: number;
  impressions_social_org: number;
  impressions_social_pack: number;
}

export interface PassageRoseyresJson {
  debut: string;
  fin: string;
  mi_temps: number;
  secondes: number;
  hauteur_px: number;
  plan: string;
  diffusion_s: number;
}

/** Roseyres-J09-donnees-et-hypotheses.json : la fiche Roseyres et la formule de reference. */
export interface RoseyresDonnees {
  match: {
    nom: string;
    journee: number;
    date: string;
    heure: string;
    score: string;
    competition: string;
    stade: string;
    arbitre: string;
    jeu_s: number;
    bandeau_visible_s: number;
    total_sponsor_jeu_s: number;
  };
  exposition: {
    brut_s: number;
    equiv_s: number;
    par_plan: ParPlan;
    passages: PassageRoseyresJson[];
    n_passages: number;
    rang: number;
    marques_visibles: number;
    part_sponsor: number;
    hors_jeu_s: number;
    panneaux_fixes: string;
  };
  classement: (string | number)[][];
  hypotheses: Hypotheses;
  valeur_match: { bas: ValeurScenarioJson; base: ValeurScenarioJson; haut: ValeurScenarioJson };
  valeur_saison: {
    bas: ValeurScenarioJson;
    base: ValeurScenarioJson;
    haut: ValeurScenarioJson;
    exposition_s: number;
    passages: number;
    equiv_s: number;
  };
  leviers: {
    passages_12: number;
    creation_lisible: number;
    package_social: number;
  };
}

export interface ResumeSeptembre {
  journee: number;
  adversaire: string;
  egokiefer_s: number;
  egokiefer_part_voix_pct: number;
  premiere_marque: string;
}

/** EgoKiefer-resumes-septembre.json : presence sur les resumes, jamais additionnee au match complet. */
export interface EgoKieferResumes {
  _source: string;
  unite: string;
  matchs: ResumeSeptembre[];
  total_4_resumes: {
    egokiefer_s: number;
    egokiefer_part_voix_pct: number;
    images_egokiefer: number;
    aon_s: number;
    sequence_moyenne_egokiefer_s: number;
    total_sponsor_s: number;
    marques_detectees: number;
  };
  match_complet_J09: {
    egokiefer_s_jeu: number;
    passages: number;
    rang: number;
    source: string;
  };
  statut_egokiefer: string;
}

/** Une entree de referentiel-partenaires-v2.json. */
export interface EntreeReferentiel {
  label: string;
  statut: string;
  support: string;
  trained: boolean;
  note?: string;
}

/** hauteurs_<marque>.json produit par scripts/mesure_hauteurs.py (optionnel). */
export interface HauteurPassage {
  clip: string;
  chrono: string;
  secondes_visibles: number | null;
  compte: boolean | null;
  n_detections: number;
  hauteur_mediane_px: number | null;
  plan: string;
  conf_moyenne: number | null;
}

export interface FichierHauteurs {
  marque: string;
  passages: HauteurPassage[];
  secondes_par_plan: ParPlan;
}

export interface SecondeChronologie {
  phase: string;
  bandeau: string | string[];
  source: string;
}

/** J09-SLO-chronologie-bandeau-seconde-par-seconde.json (lu au build, jamais envoye au navigateur). */
export interface Chronologie {
  bornes_diffusion_s: Bornes;
  secondes: Record<string, SecondeChronologie>;
}
