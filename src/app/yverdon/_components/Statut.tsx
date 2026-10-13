import type { Statut as TypeStatut } from "../_data/sponsor";

const LIBELLE: Record<TypeStatut, string> = {
  mesure: "mesuré",
  verifie: "vérifié",
  hypothese: "hypothèse",
};

const PASTILLE: Record<TypeStatut, string> = {
  mesure: "bg-yv-accent",
  verifie: "bg-yv-data",
  hypothese: "bg-yv-amber",
};

/** Statut d'un chiffre : mesuré, vérifié ou hypothèse ; drapeaux borne basse et levier en plus. */
export function Statut({
  s,
  borneBasse = false,
  levier = false,
  className = "",
}: {
  s: TypeStatut;
  borneBasse?: boolean;
  levier?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex flex-wrap items-center gap-1 align-middle ${className}`}>
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm border border-yv-rule bg-white px-1.5 py-px text-[0.6875rem] font-medium leading-4 text-yv-ink-2">
        <span aria-hidden className={`size-1.5 rounded-full ${PASTILLE[s]}`} />
        {LIBELLE[s]}
      </span>
      {borneBasse && (
        <span className="whitespace-nowrap rounded-sm border border-yv-amber/40 bg-yv-amber-bg px-1.5 py-px text-[0.6875rem] font-medium leading-4 text-yv-amber">
          borne basse
        </span>
      )}
      {levier && (
        <span className="whitespace-nowrap rounded-sm border border-yv-ink-2/30 bg-yv-surface px-1.5 py-px text-[0.6875rem] font-medium leading-4 text-yv-ink-2">
          levier, pas une mesure
        </span>
      )}
    </span>
  );
}

export function LegendeStatuts({ borneBasse }: { borneBasse: boolean }) {
  return (
    <dl className="grid gap-x-6 gap-y-2 text-sm text-yv-muted sm:grid-cols-2">
      <div className="flex items-start gap-2">
        <dt className="shrink-0"><Statut s="mesure" /></dt>
        <dd>lu image par image sur la diffusion, ou compté publication par publication sur la plateforme.</dd>
      </div>
      <div className="flex items-start gap-2">
        <dt className="shrink-0"><Statut s="verifie" /></dt>
        <dd>repris d&apos;une source externe citée, avec sa date (page partenaires du club, nombre d&apos;abonnés affiché).</dd>
      </div>
      <div className="flex items-start gap-2">
        <dt className="shrink-0"><Statut s="hypothese" /></dt>
        <dd>valeur retenue faute de donnée publiée, écrite avec son chiffre.</dd>
      </div>
      {borneBasse && (
      <div className="flex items-start gap-2">
        <dt className="shrink-0">
          <span className="whitespace-nowrap rounded-sm border border-yv-amber/40 bg-yv-amber-bg px-1.5 py-px text-[0.6875rem] font-medium leading-4 text-yv-amber">
            borne basse
          </span>
        </dt>
        <dd>tous les passages comptés en plan large, l&apos;indice de visibilité le plus bas, en attendant la mesure de la hauteur du bandeau. Audience et tarifs restent ceux des scénarios base et optimiste.</dd>
      </div>
      )}
    </dl>
  );
}
