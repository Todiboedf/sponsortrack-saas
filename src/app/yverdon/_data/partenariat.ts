// Prix publics du club pour valoriser les contreparties hors ecran d'un partenariat
// (references-package-partenariat.json). Tout ce que la page affiche sort d'ici, en objet simple
// passe au composant client ; les controles font echouer le build si une reference ne se reproduit pas.

import referencesJson from "../../../../docs/handoff-yverdon/data/references-package-partenariat.json";

import { dateCh } from "./format";
import { hypotheses } from "./sources";
import type { ReferencesPartenariat } from "./types";
import { arrondiPython } from "./valeur";

const references: ReferencesPartenariat = referencesJson;

export type StatutReference = "verifie" | "hypothese";

export interface Reference {
  valeur: number;
  statut: StatutReference;
  /** URL de la page du club, ou explication du calcul pour une reference derivee. */
  source: string;
}

export interface VuePartenariat {
  releveLe: string;
  matchsDomicile: number;
  loungeSaison: Reference;
  loungeMatch: Reference;
  cotisationClub1000: Reference;
  soireesClub1000: Reference;
  soiree: Reference;
  /** Remises publiees entre partenaires du club, en %. */
  remises: number[];
  /** Moyenne des remises, arrondie au pour-cent : sert au calcul. */
  remiseMoyennePct: number;
  remisesSource: string;
  publicationBase: Reference;
  publicationOptimiste: number;
  publicationAbonnes: number;
  porteeBase: number;
  porteeOptimiste: number;
  cpmSocialBase: number;
  cpmSocialOptimiste: number;
  inventaireSource: string;
}

function statut(s: string): StatutReference {
  if (s === "verifie" || s === "hypothese") return s;
  throw new Error(`[yverdon] references-package-partenariat.json : statut inconnu ${s}`);
}

function ref(p: { valeur: number; statut: string; source: string }): Reference {
  return { valeur: p.valeur, statut: statut(p.statut), source: p.source };
}

function controler(condition: boolean, message: string): void {
  if (!condition) throw new Error(`[yverdon] references-package-partenariat.json : ${message}`);
}

export function vuePartenariat(): VuePartenariat {
  const r = references;
  const h = r.hospitalite;
  const n = r.reseau;

  // Les remises sont dans le texte de la source : « Kiki Pneus 8 %, ... Chris Medical Services 7,5 % ... ».
  const remises = [...n.avantages_partenaires.detail.matchAll(/(\d+(?:,\d+)?) %/g)].map((m) =>
    Number(m[1].replace(",", ".")),
  );
  controler(remises.length > 0, "aucune remise lue dans avantages_partenaires");
  const remiseMoyennePct = Math.round(remises.reduce((t, x) => t + x, 0) / remises.length);

  // Publication dediee : meme formule que le package social des pages (abonnes x portee / 1000 x CPM social).
  const parPost = (cle: "base" | "haut") =>
    arrondiPython(((hypotheses.instagram_abonnes * hypotheses.portee_post[cle]) / 1000) * hypotheses.cpm_social[cle]);
  const publication = r.digital.publication_dediee_valeur_par_post_chf;
  controler(parPost("base") === publication.valeur, `publication dediee ${parPost("base")} != ${publication.valeur}`);
  controler(parPost("haut") === 171, `publication dediee optimiste ${parPost("haut")} != 171`);

  // Soiree de reseau : cotisation / soirees.
  const soiree = n.valeur_reference_soiree_reseau_par_personne_chf;
  controler(
    Math.round(n.club_des_1000_cotisation_annuelle_chf.valeur / n.club_des_1000_soirees_par_an.valeur) === soiree.valeur,
    "soiree de reseau != cotisation / soirees",
  );
  controler(h.matchs_domicile_saison.valeur === hypotheses.matchs_domicile, "matchs a domicile");

  return {
    releveLe: dateCh(r.releve_le),
    matchsDomicile: h.matchs_domicile_saison.valeur,
    loungeSaison: ref(h.ys_lounge_saison_par_personne_chf),
    loungeMatch: ref(h.ys_lounge_match_par_personne_chf),
    cotisationClub1000: ref(n.club_des_1000_cotisation_annuelle_chf),
    soireesClub1000: ref(n.club_des_1000_soirees_par_an),
    soiree: ref(soiree),
    remises,
    remiseMoyennePct,
    remisesSource: n.avantages_partenaires.source,
    publicationBase: ref(r.digital.publication_dediee_valeur_par_post_chf),
    publicationOptimiste: parPost("haut"),
    publicationAbonnes: hypotheses.instagram_abonnes,
    porteeBase: hypotheses.portee_post.base,
    porteeOptimiste: hypotheses.portee_post.haut,
    cpmSocialBase: hypotheses.cpm_social.base,
    cpmSocialOptimiste: hypotheses.cpm_social.haut,
    inventaireSource: r.inventaire_club_sans_prix_public.source,
  };
}
