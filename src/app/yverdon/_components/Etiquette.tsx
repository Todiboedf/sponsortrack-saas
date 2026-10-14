import { ExternalLink } from "lucide-react";

/** Statut d'un chiffre : mesuré, vérifié, hypothèse ; levier, non mesuré, à confirmer par le club. */
export type Etat = "mesure" | "verifie" | "hypothese" | "levier" | "non" | "attente";

const LIBELLE: Record<Etat, string> = {
  mesure: "mesuré",
  verifie: "vérifié",
  hypothese: "hypothèse",
  levier: "levier, pas une mesure",
  non: "non mesuré",
  attente: "à confirmer par le club",
};

/** Étiquette de statut, en mono 10 px majuscules avec point coloré (gabarit : .tag). */
export function Tag({ e, texte }: { e: Etat; texte?: string }) {
  return <span className={`tag ${e}`}>{texte ?? LIBELLE[e]}</span>;
}

/** Un levier reste une hypothèse : les deux étiquettes, comme avant la refonte. */
export function TagsLevier() {
  return (
    <span className="tags">
      <Tag e="hypothese" />
      <Tag e="levier" />
    </span>
  );
}

/** Lien vers une source externe, ouvert dans un nouvel onglet. */
export function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="src" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalLink aria-hidden />
    </a>
  );
}
