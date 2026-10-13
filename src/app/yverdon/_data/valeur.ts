// Portage exact de docs/handoff-yverdon/scripts/valeur.py.
// Memes operations, dans le meme ordre, et l'arrondi de Python (au pair le plus proche) :
// le build echoue si la fiche Roseyres n'est pas retrouvee (voir sources.ts).
// Seuls les scenarios base et optimiste existent ici : le scenario bas ne se calcule pas pour les pages.

import type { Hypotheses, ParPlan } from "./types";

export type Scenario = "base" | "optimiste";

export const SCENARIOS: readonly Scenario[] = ["base", "optimiste"];

/** Cle du scenario dans les fourchettes d'hypotheses du JSON. */
const CLE: Record<Scenario, "base" | "haut"> = { base: "base", optimiste: "haut" };

/** round() de Python 3 : moitie au pair le plus proche, sur la valeur binaire exacte. */
export function arrondiPython(x: number): number {
  const plancher = Math.floor(x);
  const reste = x - plancher;
  if (reste > 0.5) return plancher + 1;
  if (reste < 0.5) return plancher;
  return plancher % 2 === 0 ? plancher : plancher + 1;
}

export interface ValeurMatch {
  tv: number;
  tvBrut: number;
  stade: number;
  socialOrganique: number;
  socialPackage: number;
  totalMesure: number;
  totalAvecPackage: number;
  contactsTv: number;
  contactsStade: number;
  impressionsSocialOrg: number;
  impressionsSocialPackage: number;
}

export interface ValeurSaison {
  tv: number;
  stade: number;
  socialOrganique: number;
  totalMesure: number;
  totalAvecPackage: number;
}

export interface ValeurScenario {
  match: ValeurMatch;
  saison: ValeurSaison;
}

export interface ResultatValeur {
  secondesBrutes: number;
  passages: number;
  parPlan: ParPlan;
  /** Secondes equivalentes non arrondies (entrent dans le calcul). */
  equiv: number;
  /** round(equiv, 1), comme valeur.py. */
  equivAffiche: number;
  base: ValeurScenario;
  optimiste: ValeurScenario;
}

export function secondesEquivalentes(h: Hypotheses, parPlan: ParPlan): number {
  return parPlan.large * h.qi.large + parPlan.moyen * h.qi.moyen + parPlan.gros * h.qi.gros;
}

interface Composantes {
  tv: number;
  tvBrut: number;
  stade: number;
  socialOrganique: number;
  socialPackage: number;
  impressionsOrg: number;
  impressionsPack: number;
}

function composantes(h: Hypotheses, scenario: Scenario, brut: number, passages: number, equiv: number): Composantes {
  const cle = CLE[scenario];
  const aud = h.audience_tv[cle];
  const cpm = h.cpm_tv_30s[cle];
  const tv = (((equiv / h.duree_passage_s) * aud) / 1000) * cpm;
  const tvBrut = (((brut / h.duree_passage_s) * aud) / 1000) * cpm;
  const aff = h.affluence[cle];
  const cpmStade = h.cpm_stade[cle];
  const stade = ((aff * passages) / 1000) * cpmStade * h.qi_stade;
  const impressionsOrg = h.instagram_abonnes * h.part_bandeau_contenus * h.vues_resume_video;
  const socialOrganique = (impressionsOrg / 1000) * h.cpm_social[cle];
  const impressionsPack = h.posts_partenaire_par_match * h.instagram_abonnes * h.portee_post[cle];
  const socialPackage = (impressionsPack / 1000) * h.cpm_social[cle];
  return { tv, tvBrut, stade, socialOrganique, socialPackage, impressionsOrg, impressionsPack };
}

/** valeur(marque, par_plan) de valeur.py. */
export function valeur(h: Hypotheses, brut: number, passages: number, parPlan: ParPlan): ResultatValeur {
  const equiv = secondesEquivalentes(h, parPlan);
  const parScenario = (scenario: Scenario): ValeurScenario => {
    const c = composantes(h, scenario, brut, passages, equiv);
    const cle = CLE[scenario];
    const total = c.tv + c.stade + c.socialOrganique;
    const n = h.matchs_domicile;
    const match: ValeurMatch = {
      tv: arrondiPython(c.tv),
      tvBrut: arrondiPython(c.tvBrut),
      stade: arrondiPython(c.stade),
      socialOrganique: arrondiPython(c.socialOrganique),
      socialPackage: arrondiPython(c.socialPackage),
      totalMesure: arrondiPython(total),
      totalAvecPackage: arrondiPython(total + c.socialPackage),
      contactsTv: h.audience_tv[cle] * passages,
      contactsStade: h.affluence[cle] * passages,
      impressionsSocialOrg: arrondiPython(c.impressionsOrg),
      impressionsSocialPackage: arrondiPython(c.impressionsPack),
    };
    const saison: ValeurSaison = {
      tv: match.tv * n,
      stade: match.stade * n,
      socialOrganique: match.socialOrganique * n,
      totalMesure: match.totalMesure * n,
      totalAvecPackage: match.totalAvecPackage * n,
    };
    return { match, saison };
  };
  return {
    secondesBrutes: brut,
    passages,
    parPlan,
    equiv,
    equivAffiche: Math.round(equiv * 10) / 10,
    base: parScenario("base"),
    optimiste: parScenario("optimiste"),
  };
}

/**
 * Leviers « plus de passages » et « creation plus lisible » de la fiche Roseyres (scenario base) :
 * meme formule, composantes tronquees a l'unite puis additionnees. C'est ce qui redonne
 * exactement 1'288 et 1'297 ; le controle est fait dans sources.ts.
 */
export function valeurLevier(h: Hypotheses, brut: number, passages: number, equiv: number): number {
  const c = composantes(h, "base", brut, passages, equiv);
  return Math.floor(c.tv) + Math.floor(c.stade) + Math.floor(c.socialOrganique);
}

/** Gain d'un levier en pourcentage de la valeur du match, arrondi normal. */
export function gainPct(levier: number, reference: number): number {
  return Math.round(((levier - reference) / reference) * 100);
}
