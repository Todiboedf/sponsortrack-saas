import { Banknote, Focus, LayoutDashboard, ListChecks, Share2, Tv } from "lucide-react";

import type { VueSponsor } from "../_data/sponsor";
import { Onglets, type Onglet } from "./Onglets";
import { PanneauApercu } from "./PanneauApercu";
import { PanneauImage } from "./PanneauImage";
import { PanneauMethode } from "./PanneauMethode";
import { PanneauReseaux } from "./PanneauReseaux";
import { PanneauValeur } from "./PanneauValeur";

/**
 * Page sponsor en tableau de bord, cinq onglets (docs/handoff-yverdon/redesign/template.html).
 * Tout est rendu au serveur ; les onglets, la frise, le scénario et le calcul de couverture sont des îlots clients.
 */
export function Tableau({ vue }: { vue: VueSponsor }) {
  if (vue.borneBasse) throw new Error(`[yverdon] ${vue.cle} : borne basse, le tableau de bord attend les plans mesurés`);

  const onglets: Onglet[] = [
    { id: "apercu", libelle: "Vue d'ensemble", icone: <LayoutDashboard aria-hidden />, contenu: <PanneauApercu vue={vue} /> },
    { id: "image", libelle: "À l'image", icone: <Tv aria-hidden />, contenu: <PanneauImage vue={vue} /> },
    { id: "reseaux", libelle: "Réseaux sociaux", icone: <Share2 aria-hidden />, contenu: <PanneauReseaux vue={vue} /> },
    { id: "valeur", libelle: "Valeur média", icone: <Banknote aria-hidden />, contenu: <PanneauValeur vue={vue} /> },
    { id: "methode", libelle: "Méthode", icone: <ListChecks aria-hidden />, contenu: <PanneauMethode vue={vue} /> },
  ];

  return (
    <Onglets
      barre={
        <div className="topbar">
          <a className="logo" href="https://sponsorlens.io" aria-label="Sponsorlens">
            <Focus aria-hidden />
            Sponsorlens
          </a>
          <div className="ctx">
            <span className="mono">{`Yverdon Sport FC · Journée ${vue.match.journee} · ${vue.match.date}`}</span>
            <span className="pill">{`Mis à jour le ${vue.misAJourLe} · prochain match à\u00a0domicile\u00a0: à\u00a0mesurer`}</span>
          </div>
        </div>
      }
      onglets={onglets}
      pied={
        <>
          <p>
            Page exemple, construite par Sponsorlens sur la mesure réelle de ce match. Elle n&apos;est pas validée par
            Yverdon Sport. Elle est mise à jour après chaque match.
          </p>
          <p>Guillaume Haas · GHaas Management SA · Sponsorlens, mesure de la visibilité et de la valeur des partenariats sportifs.</p>
        </>
      }
    />
  );
}
