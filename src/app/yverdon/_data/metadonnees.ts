// Metadonnees des pages sponsor : l'apercu du lien (WhatsApp, LinkedIn, iMessage) est la premiere chose
// que le sponsor lit. Elles remplacent entierement celles du site (anglais, image /og, slogan).

import type { Metadata } from "next";

import { CONTENU } from "./contenu";
import { que } from "./marques";
import { roseyres } from "./sources";
import type { CleSponsor, Lecteur } from "./sponsor";

export function metadonnees(cle: CleSponsor, lecteur: Lecteur = "sponsor"): Metadata {
  const nom = CONTENU[cle].titre;
  const m = roseyres.match;
  const titre = `${nom} × Yverdon Sport FC, journée ${m.journee}`;
  const description = `Page exemple\u00a0: ce ${que(nom)} a obtenu à l'écran sur ${m.nom} du ${m.date}. Temps d'écran mesuré, passages, valeur média et hypothèses, mise à jour après chaque match.`;
  const chemin = lecteur === "club" ? `/yverdon/club/${cle}` : `/yverdon/${cle}`;
  return {
    title: titre,
    description,
    keywords: null,
    alternates: { canonical: chemin },
    openGraph: {
      type: "website",
      locale: "fr_CH",
      url: chemin,
      siteName: "Sponsorlens",
      title: titre,
      description,
    },
    twitter: { card: "summary", title: titre, description },
  };
}
