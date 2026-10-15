import type { Metadata } from "next";
import { Table2 } from "lucide-react";

import { Onglets } from "../_components/Onglets";
import { PanneauClub } from "../_components/PanneauClub";
import { BarreHaute, Pied } from "../_components/Tableau";
import { construireVueClub } from "../_data/club";

// Vue club : tout le bandeau du match, toutes marques nommees. Noindex par le layout /yverdon.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Yverdon Sport FC, journée 9 : le bandeau du match, vue club",
  description: "Page exemple : temps à l'image et passages de chaque marque du bandeau LED, ligue et club à part.",
  alternates: { canonical: "/yverdon/club" },
};

export default function Page() {
  const vue = construireVueClub();
  return (
    <Onglets
      barre={<BarreHaute journee={vue.match.journee} date={vue.match.date} misAJourLe={vue.misAJourLe} />}
      onglets={[{ id: "club", libelle: "Vue club", icone: <Table2 aria-hidden />, contenu: <PanneauClub vue={vue} /> }]}
      pied={<Pied />}
    />
  );
}
