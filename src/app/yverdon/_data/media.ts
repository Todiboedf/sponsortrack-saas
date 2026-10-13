// Videos de preuve, versionnees dans public/yverdon/ et servies avec le site.
// YVERDON_MEDIA_BASE_URL (lu au build) permettra de les servir depuis Vercel Blob plus tard.

import {
  CLIP_EGOKIEFER_EXTRAIT_S,
  DETECTEUR_MARQUES,
  DETECTEUR_REENTRAINE_IMAGES,
  DETECTEUR_VERSION,
} from "./regles";

const BASE = (process.env.YVERDON_MEDIA_BASE_URL ?? "/yverdon").replace(/\/$/, "");

export interface MomentVideo {
  miTemps: 1 | 2;
  /** Chrono de debut du passage montre (J09-passages-detail.json). */
  passageDebut: string;
}

export interface Video {
  src: string;
  poster: string;
  /** Duree du fichier en secondes (ffprobe). */
  dureeS: number;
  moments: MomentVideo[];
  /** Gros plan sur un panneau fixe, en fin d'extrait. */
  panneauFixe: { miTemps: 1 | 2; chrono: string } | null;
  /** Chronos affiches dans l'incrustation du clip, quand il n'y a qu'un moment. */
  incrustation: { debut: string; fin: string } | null;
  /** D'ou viennent les cadres de l'extrait, et a quoi il sert. */
  origineCadres: string;
}

export const VIDEOS: Record<"roseyres" | "egokiefer", Video> = {
  roseyres: {
    src: `${BASE}/Roseyres-J09-extrait-diffusion.mp4`,
    poster: `${BASE}/Roseyres-J09-extrait-diffusion.jpg`,
    dureeS: 40,
    moments: [
      { miTemps: 1, passageDebut: "06:19" },
      { miTemps: 1, passageDebut: "29:19" },
      { miTemps: 2, passageDebut: "51:06" },
      { miTemps: 2, passageDebut: "75:24" },
    ],
    panneauFixe: { miTemps: 2, chrono: "77:43" },
    incrustation: null,
    origineCadres: `Les cadres viennent du détecteur réentraîné sur ${DETECTEUR_REENTRAINE_IMAGES.valeur} images de ce match, complété par une reconnaissance du motif dans le bandeau.`,
  },
  egokiefer: {
    src: `${BASE}/J09-EgoKiefer.mp4`,
    poster: `${BASE}/J09-EgoKiefer.jpg`,
    dureeS: 5,
    moments: [{ miTemps: 2, passageDebut: "70:06" }],
    panneauFixe: null,
    incrustation: { debut: "70:20", fin: "70:24" },
    // Complete dans sponsor.ts avec le plan du passage mesure (origineClipEgoKiefer).
    origineCadres: "",
  },
};

/**
 * Legende du clip EgoKiefer. Le plan et la hauteur sont ceux du passage qui contient le clip,
 * lus dans hauteurs_egokiefer.json : le clip montre les secondes les plus lisibles, pas le plan du passage.
 */
export function origineClipEgoKiefer(planPassage: string, hauteurPx: number): string {
  if (VIDEOS.egokiefer.dureeS !== 5) throw new Error("[yverdon] legende du clip EgoKiefer : « cinq secondes » a revoir");
  return `Il est tiré d'un extrait de ${CLIP_EGOKIEFER_EXTRAIT_S.valeur}\u00a0s, choisi là où le détecteur Sponsorlens (version ${DETECTEUR_VERSION.valeur}, ${DETECTEUR_MARQUES.valeur} marques) reconnaît la création, sur les cinq secondes les plus lisibles du passage, qui est classé ${planPassage} sur sa hauteur médiane (${hauteurPx}\u00a0px). Il prouve la reconnaissance, il ne sert pas aux durées\u00a0: pendant le jeu, elles viennent de la lecture seconde par seconde.`;
}
