import { Tableau } from "../../_components/Tableau";
import { metadonnees } from "../../_data/metadonnees";
import { construireVue } from "../../_data/sponsor";

// Vue club : la même page, avec le nom et les notes des autres marques. Noindex par le layout /yverdon.
export const dynamic = "force-static";

export const metadata = metadonnees("egokiefer", "club");

export default function Page() {
  return <Tableau vue={construireVue("egokiefer", "club")} />;
}
