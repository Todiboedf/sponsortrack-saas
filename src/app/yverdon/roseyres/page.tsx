import { Tableau } from "../_components/Tableau";
import { metadonnees } from "../_data/metadonnees";
import { construireVue } from "../_data/sponsor";

export const dynamic = "force-static";

export const metadata = metadonnees("roseyres");

export default function Page() {
  return <Tableau vue={construireVue("roseyres")} />;
}
