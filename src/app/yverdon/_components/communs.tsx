// Ce que plusieurs onglets partagent : la vidéo et sa légende, le nom de l'adversaire.
// Tout sort de la vue (sponsor.ts) ; rien n'est codé en dur ici.

import type { VueSponsor } from "../_data/sponsor";
import { VideoCadre } from "./VideoCadre";

export const NBSP = " ";

export function nomMiTemps(n: 1 | 2): string {
  return n === 1 ? "1re mi-temps" : "2e mi-temps";
}

/** « Yverdon Sport FC - FC Stade-Lausanne-Ouchy » -> « FC Stade-Lausanne-Ouchy ». */
export function adversaireDuMatch(vue: VueSponsor): string {
  const [domicile, exterieur] = vue.match.nom.split(" - ");
  if (domicile !== "Yverdon Sport FC" || !exterieur) throw new Error(`[yverdon] nom du match inattendu : ${vue.match.nom}`);
  return exterieur;
}

/** La vidéo de preuve, avec l'étiquette et la légende de l'extrait. */
export function Video({ vue }: { vue: VueSponsor }) {
  const v = vue.video;
  const detecteur = `Chaque logo reconnu est encadré avec la confiance du détecteur Sponsorlens, en développement.`;
  let etiquette: string;
  let legende: string;
  if (v.incrustation) {
    const m = v.moments[0];
    const p = vue.passages.find((x) => x.chronoDebut === m.passageDebut);
    if (!p) throw new Error(`[yverdon] passage du clip absent : ${m.passageDebut}`);
    etiquette = `Clip ${v.dureeS}${NBSP}s · ${nomMiTemps(m.miTemps)}, ${v.incrustation.debut} à ${v.incrustation.fin}`;
    legende = `Pendant le passage de ${p.chronoDebut} à ${p.chronoFin}. ${detecteur} ${v.origineCadres}`;
  } else {
    const groupes = ([1, 2] as const)
      .map((n) => ({ n, chronos: v.moments.filter((m) => m.miTemps === n).map((m) => m.passageDebut) }))
      .filter((g) => g.chronos.length > 0)
      .map((g) => `${g.chronos.join(" et ")} (${nomMiTemps(g.n)})`)
      .join(", ");
    etiquette = `Extrait ${v.dureeS}${NBSP}s · ${v.moments.length} passages${v.panneauFixe ? " et le panneau fixe" : ""}`;
    legende = `Des moments de ${v.moments.length} passages, à ${groupes}${
      v.panneauFixe ? `, puis à ${v.panneauFixe.chrono} un gros plan sur le panneau fixe derrière le but` : ""
    }. ${detecteur} ${v.origineCadres} Les durées de la page ne viennent pas de ces cadres : elles sont relevées seconde par seconde.`;
  }
  return (
    <VideoCadre
      src={v.src}
      poster={v.poster}
      chyron={`Journée ${vue.match.journee} · ${vue.match.score}`}
      etiquette={etiquette}
      legende={legende}
    />
  );
}
