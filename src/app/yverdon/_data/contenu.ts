// Textes propres a chaque marque. Statuts : referentiel-partenaires-v2.json (page partenaires du club,
// verifiee le 09.10.2026). EgoKiefer n'y est pas listee : « statut a confirmer par le club », jamais un palier.

import { PAGE_PARTENAIRES_VERIFIEE_LE } from "./regles";
import type { CleSponsor } from "./sponsor";

export interface ContenuMarque {
  /** Titre de l'en-tete. */
  titre: string;
  /** Statut du partenaire, tel qu'on peut l'ecrire dans le bloc statut. */
  statut: string;
  /** Precision sous le statut. */
  statutDetail: string;
  /** Le statut vient d'une source externe datee (page partenaires du club). */
  statutVerifie: boolean;
  /** Panneaux fixes de la marque : toujours une ligne a part du bandeau. */
  panneauxFixes: string;
  /** Hors jeu : pourquoi le chiffre est ce qu'il est. */
  horsJeu: string;
}

export const CONTENU: Record<CleSponsor, ContenuMarque> = {
  roseyres: {
    titre: "Roseyres.ch",
    statut: "Sponsor principal selon le site du club",
    statutDetail:
      "Roseyres.ch est une création de Smartimmo Sàrl, listée «\u00a0Sponsor principal\u00a0» sur la page partenaires officielle du club.",
    statutVerifie: true,
    panneauxFixes:
      "Les panneaux fixes «\u00a0Les Roseyres\u00a0» derrière le but sont visibles en gros plan sur les actions devant ce but (fin de l'extrait vidéo). Ils ne sont pas encore mesurés à part.",
    horsJeu:
      "Le détecteur utilisé hors jeu ne connaissait pas encore cette création\u00a0: l'échauffement, la mi-temps et la fin de rencontre ne sont pas mesurés pour elle.",
  },
  egokiefer: {
    titre: "EgoKiefer",
    statut: "Statut du partenaire à confirmer par le club",
    statutDetail: `Le statut d'EgoKiefer ne figure pas sur la page partenaires du club consultée le ${PAGE_PARTENAIRES_VERIFIEE_LE.valeur}\u00a0: il reste à confirmer par le club.`,
    statutVerifie: false,
    panneauxFixes: "Les panneaux fixes EgoKiefer du stade ne sont pas encore mesurés à part.",
    horsJeu:
      "Le détecteur utilisé hors jeu connaît cette création\u00a0: il ne l'a vue ni à l'échauffement, ni à la mi-temps, ni après le match.",
  },
};
