import { Info } from "lucide-react";

export function Ligne({
  libelle,
  detail,
  valeur,
  statut,
}: {
  libelle: React.ReactNode;
  detail?: React.ReactNode;
  valeur: React.ReactNode;
  statut: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 border-b border-yv-rule py-3 sm:grid-cols-[minmax(0,1fr)_auto_8.5rem] sm:items-baseline sm:gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-yv-ink">{libelle}</p>
        {detail && <p className="mt-0.5 text-sm text-yv-muted">{detail}</p>}
      </div>
      <p className="text-sm font-semibold tabular-nums text-yv-ink sm:text-right">{valeur}</p>
      <div className="sm:text-right">{statut}</div>
    </div>
  );
}

export function Note({ children, ton = "neutre" }: { children: React.ReactNode; ton?: "neutre" | "alerte" }) {
  return (
    <div
      className={`flex gap-3 rounded-sm border-l-2 px-4 py-3 text-sm leading-relaxed ${
        ton === "alerte" ? "border-yv-amber bg-yv-amber-bg text-yv-body" : "border-yv-data bg-yv-surface text-yv-body"
      }`}
    >
      <Info aria-hidden className={`mt-0.5 size-4 shrink-0 ${ton === "alerte" ? "text-yv-amber" : "text-yv-data"}`} />
      <div>{children}</div>
    </div>
  );
}
