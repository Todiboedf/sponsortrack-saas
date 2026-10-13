"use client";

import { ExternalLink } from "lucide-react";
import { useId, useState } from "react";

import { chf, decimal, entier, pourcent, taux } from "../_data/format";
import type { Reference, VuePartenariat } from "../_data/partenariat";
import { Statut } from "./Statut";

/** Sous ce montant, la saisie est presque toujours incomplete (« 1,5 » pour 1,5 million) : on demande de verifier. */
const MONTANT_MIN_CHF = 1_000;

/**
 * Montant saisi -> francs. Accepte 15000, 15'000, 15 000, 15.000, 15'000.00, 15 000,50, 15'000.-,
 * CHF 15'000, 15'000 CHF, Fr. 15'000. Renvoie null si la saisie ne se lit pas sans ambiguite.
 */
export function lireMontant(saisie: string): number | null {
  const t = saisie
    .trim()
    .replace(/^(?:CHF|Fr\.?)\s*/i, "")
    .replace(/\s*(?:CHF|Fr\.?)$/i, "")
    .replace(/[.,]\s*[-\u2013\u2014]+$/, "")
    .trim();
  const centimes = (c: string | undefined) => (c ? Number(`0.${c}`) : 0);
  // Milliers groupes par apostrophe ou espace, par trois chiffres : 15'000, 1 250 000.
  let m = /^(\d{1,3}(?:['\u2019 \u00a0\u202f]\d{3})+)(?:[.,](\d{1,2}))?$/.exec(t);
  if (m) return Number(m[1].replace(/\D/g, "")) + centimes(m[2]);
  // Sans separateur : 15000, 15000.50.
  m = /^(\d+)(?:[.,](\d{1,2}))?$/.exec(t);
  if (m) return Number(m[1]) + centimes(m[2]);
  // Milliers groupes par point ou virgule : 15.000, 1.250.000, 15,000.50.
  m = /^(\d{1,3}(?:([.,])\d{3})(?:\2\d{3})*)(?:[.,](\d{1,2}))?$/.exec(t);
  if (m) return Number(m[1].replace(/\D/g, "")) + centimes(m[3]);
  return null;
}

/**
 * Part du partenariat couverte par la valeur media projetee. Le sponsor saisit son investissement ;
 * rien n'est envoye ni enregistre, le calcul se fait dans le navigateur.

/** Quantite saisie (places, soirees, publications) : entier de 0 a 9999, vide = 0. Null si illisible. */
function lireQuantite(saisie: string): number | null {
  const t = saisie.trim();
  if (t === "") return 0;
  return /^\d{1,4}$/.test(t) ? Number(t) : null;
}

const NBSP = " ";

function Champ({
  libelle,
  valeur,
  changer,
  montant = false,
  aide,
}: {
  libelle: string;
  valeur: string;
  changer: (v: string) => void;
  montant?: boolean;
  aide?: string;
}) {
  const id = useId();
  const illisible = valeur.trim() !== "" && (montant ? lireMontant(valeur) === null : lireQuantite(valeur) === null);
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-xs text-yv-muted">
        {libelle}
      </label>
      <div className="mt-1 flex items-center rounded-sm border border-yv-rule-2 bg-white focus-within:border-yv-data focus-within:ring-1 focus-within:ring-yv-data">
        {montant && <span className="pl-2 text-sm text-yv-muted">CHF</span>}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder={montant ? "optionnel" : "0"}
          value={valeur}
          onChange={(e) => changer(e.target.value)}
          aria-invalid={illisible}
          aria-describedby={aide ? `${id}-aide` : undefined}
          className="w-full min-w-0 bg-transparent px-2 py-1.5 text-base tabular-nums text-yv-ink outline-none placeholder:text-yv-muted"
        />
      </div>
      {illisible ? (
        <p className="mt-1 text-xs text-yv-amber">{montant ? "Montant à vérifier" : "Nombre entier à vérifier"}</p>
      ) : (
        aide && (
          <p id={`${id}-aide`} className="mt-1 text-xs text-yv-muted">
            {aide}
          </p>
        )
      )}
    </div>
  );
}

function ARenseigner() {
  return (
    <span className="whitespace-nowrap rounded-sm border border-dashed border-yv-rule-2 bg-white px-1.5 py-px text-[0.6875rem] font-medium leading-4 text-yv-muted">
      à renseigner
    </span>
  );
}

function SaisiParVous() {
  return (
    <span className="whitespace-nowrap rounded-sm border border-yv-rule-2 bg-white px-1.5 py-px text-[0.6875rem] font-medium leading-4 text-yv-ink-2">
      saisi par vous
    </span>
  );
}

function Lien({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-sm text-yv-data underline underline-offset-2 outline-none hover:text-yv-ink focus-visible:ring-2 focus-visible:ring-yv-data"
    >
      {children}
      <ExternalLink aria-hidden className="size-3 shrink-0" />
    </a>
  );
}

function domaine(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/** Une part du partenariat : titre, statut, valeur, puis les champs a renseigner. */
function Part({
  titre,
  statut,
  valeur,
  detail,
  children,
}: {
  titre: string;
  statut: React.ReactNode;
  valeur: React.ReactNode;
  detail: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <li className="border-b border-yv-rule py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-sm font-semibold text-yv-ink">{titre}</h3>
        <p className="text-sm font-semibold tabular-nums text-yv-ink">{valeur}</p>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">{statut}</div>
      <p className="mt-1.5 text-sm text-yv-muted">{detail}</p>
      {children && <div className="mt-3 grid gap-3 sm:grid-cols-3">{children}</div>}
    </li>
  );
}

function valeurPaire(base: number, optimiste: number): string {
  return base === optimiste ? chf(base) : `${chf(base)} · ${chf(optimiste)}`;
}

/**
 * Ce que vaut l'ensemble du partenariat : l'ecran mesure, le reste au prix public du club.
 * Le sponsor saisit ses quantites et son investissement ; rien n'est envoye ni enregistre.
 */
export function EnsemblePartenariat({
  saisonBase,
  saisonOptimiste,
  matchs,
  borneBasse,
  refs,
}: {
  saisonBase: number;
  saisonOptimiste: number;
  matchs: number;
  borneBasse: boolean;
  refs: VuePartenariat;
}) {
  const idInvest = useId();
  const [loungeSaison, setLoungeSaison] = useState("");
  const [loungeParMatch, setLoungeParMatch] = useState("");
  const [loungeMatchs, setLoungeMatchs] = useState("");
  const [soirees, setSoirees] = useState("");
  const [participants, setParticipants] = useState("");
  const [achats, setAchats] = useState("");
  const [affaires, setAffaires] = useState("");
  const [publications, setPublications] = useState("");
  const [saisie, setSaisie] = useState("");

  const q = (s: string) => lireQuantite(s) ?? 0;
  const m = (s: string) => lireMontant(s) ?? 0;

  const hospitalite =
    q(loungeSaison) * refs.loungeSaison.valeur + q(loungeParMatch) * q(loungeMatchs) * refs.loungeMatch.valeur;
  const reseauSoirees = q(soirees) * q(participants) * refs.soiree.valeur;
  const reseauRemises = Math.round((m(achats) * refs.remiseMoyennePct) / 100);
  const reseau = reseauSoirees + reseauRemises;
  const affairesSignees = m(affaires);
  const digitalBase = q(publications) * refs.publicationBase.valeur;
  const digitalOptimiste = q(publications) * refs.publicationOptimiste;
  const totalBase = saisonBase + hospitalite + reseau + digitalBase;
  const totalOptimiste = saisonOptimiste + hospitalite + reseau + digitalOptimiste;

  const montant = lireMontant(saisie);
  const investissement = montant ?? 0;
  const valide = montant !== null && montant >= MONTANT_MIN_CHF;
  const aVerifier = saisie.trim() !== "" && !valide;
  const part = (x: number) => (valide ? pourcent(x, investissement, 0) : "à calculer");

  const repartition: { nom: string; base: number; optimiste: number }[] = [
    { nom: "Écran", base: saisonBase, optimiste: saisonOptimiste },
    { nom: "Hospitalité", base: hospitalite, optimiste: hospitalite },
    { nom: "Réseau", base: reseau, optimiste: reseau },
    { nom: "Digital", base: digitalBase, optimiste: digitalOptimiste },
  ];

  const sourceLien = (r: Reference) =>
    r.source.startsWith("http") ? <Lien href={r.source}>{domaine(r.source)}</Lien> : <span>{r.source}</span>;

  return (
    <div className="space-y-8">
      <ul className="border-t border-yv-ink/80">
        <Part
          titre="Écran"
          statut={
            <>
              <Statut s="mesure" />
              <Statut s="hypothese" borneBasse={borneBasse} />
            </>
          }
          valeur={valeurPaire(saisonBase, saisonOptimiste)}
          detail={`Valeur média projetée sur ${matchs}${NBSP}matchs à domicile, base puis optimiste : temps d'écran mesuré sur ce match, audience et tarifs supposés.`}
        />
        <Part
          titre="Hospitalité"
          statut={hospitalite > 0 ? <Statut s="verifie" /> : <ARenseigner />}
          valeur={hospitalite > 0 ? chf(hospitalite) : "à renseigner"}
          detail={`Places YS Lounge reçues, au prix public du club : ${chf(refs.loungeSaison.valeur)} par personne et par saison, ${chf(refs.loungeMatch.valeur)} par personne et par match.`}
        >
          <Champ libelle="Places YS Lounge à la saison" valeur={loungeSaison} changer={setLoungeSaison} />
          <Champ libelle="Places par match" valeur={loungeParMatch} changer={setLoungeParMatch} />
          <Champ
            libelle="× matchs"
            valeur={loungeMatchs}
            changer={setLoungeMatchs}
            aide={`${refs.matchsDomicile}${NBSP}matchs à domicile par saison`}
          />
        </Part>
        <Part
          titre="Réseau"
          statut={reseau > 0 ? <Statut s="hypothese" /> : <ARenseigner />}
          valeur={reseau > 0 ? chf(reseau) : "à renseigner"}
          detail={`Soirées partenaires offertes par le club, à ${chf(refs.soiree.valeur)} par participant (prix d'une soirée du Club des 1000). Achats chez les partenaires du club, à ${taux(refs.remiseMoyennePct / 100)} de remise moyenne.`}
        >
          <Champ libelle="Soirées partenaires offertes" valeur={soirees} changer={setSoirees} />
          <Champ libelle="× participants" valeur={participants} changer={setParticipants} />
          <Champ libelle="Achats chez les partenaires du club" valeur={achats} changer={setAchats} montant />
          <div className="sm:col-span-3">
            <Champ
              libelle="Affaires signées grâce au réseau du club"
              valeur={affaires}
              changer={setAffaires}
              montant
              aide="Votre chiffre, jamais estimé par Sponsorlens. Il s'affiche à part, hors du total au prix public."
            />
          </div>
        </Part>
        <Part
          titre="Digital"
          statut={digitalBase > 0 ? <Statut s="hypothese" /> : <ARenseigner />}
          valeur={digitalBase > 0 ? valeurPaire(digitalBase, digitalOptimiste) : "à renseigner"}
          detail={`Publications dédiées sur l'Instagram du club : ${chf(refs.publicationBase.valeur)} chacune en base, ${chf(refs.publicationOptimiste)} en optimiste.`}
        >
          <Champ libelle="Publications dédiées par saison" valeur={publications} changer={setPublications} />
        </Part>
        <Part
          titre="Image"
          statut={null}
          valeur="non chiffré"
          detail="L'association de votre marque à celle du club compte, mais elle n'a pas de valeur en francs."
        />
      </ul>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-sm border-t-2 border-yv-accent bg-yv-surface p-4">
            <p className="text-xs text-yv-muted">
              {"Valeur reçue sur la saison\u00a0: l'écran mesuré, le reste au prix public\u00a0; base, puis optimiste"}
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-yv-ink" aria-live="polite">
              {valeurPaire(totalBase, totalOptimiste)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Statut s="mesure" />
              <Statut s="verifie" />
              <Statut s="hypothese" borneBasse={borneBasse} />
            </div>
            {affairesSignees > 0 && (
              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-yv-body">
                <span>{`En plus, affaires signées grâce au réseau : ${chf(affairesSignees)}`}</span>
                <SaisiParVous />
              </p>
            )}
          </div>

          <div className="rounded-sm border border-yv-rule p-4">
            <label htmlFor={idInvest} className="block text-sm font-medium text-yv-ink">
              Votre investissement pour la saison
            </label>
            <div className="mt-2 flex items-center rounded-sm border border-yv-rule-2 bg-white focus-within:border-yv-data focus-within:ring-1 focus-within:ring-yv-data">
              <span className="pl-3 text-sm text-yv-muted">CHF</span>
              <input
                id={idInvest}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="à renseigner"
                value={saisie}
                onChange={(e) => setSaisie(e.target.value)}
                className="w-full min-w-0 bg-transparent px-2 py-2 text-base tabular-nums text-yv-ink outline-none placeholder:text-yv-muted"
              />
            </div>
            <p className="mt-2 text-xs text-yv-muted">
              {aVerifier
                ? "Montant à vérifier : écrivez le montant de la saison en francs, par exemple 25'000."
                : "Rien n'est envoyé ni enregistré : le calcul se fait dans votre navigateur."}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[17rem] text-sm" aria-live="polite">
            <caption className="pb-2 text-left text-sm font-semibold text-yv-ink">
              Part de votre investissement couverte
            </caption>
            <thead>
              <tr className="border-b border-yv-ink/80 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-yv-muted">
                <th scope="col" className="py-2 pr-2">Part</th>
                <th scope="col" className="py-2 pr-2 text-right">Base</th>
                <th scope="col" className="py-2 text-right">Optimiste</th>
              </tr>
            </thead>
            <tbody>
              {repartition.map((r) => (
                <tr key={r.nom} className="border-b border-yv-rule">
                  <th scope="row" className="py-1.5 pr-2 text-left font-normal">{r.nom}</th>
                  <td className="py-1.5 pr-2 text-right tabular-nums">{part(r.base)}</td>
                  <td className="py-1.5 text-right tabular-nums">{part(r.optimiste)}</td>
                </tr>
              ))}
              <tr className="border-b-2 border-yv-ink">
                <th scope="row" className="py-2 pr-2 text-left font-semibold text-yv-ink">Couvert au total</th>
                <td className="py-2 pr-2 text-right font-bold tabular-nums text-yv-ink">{part(totalBase)}</td>
                <td className="py-2 text-right font-bold tabular-nums text-yv-ink">{part(totalOptimiste)}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs text-yv-muted">
            Les affaires signées grâce au réseau restent hors de ce calcul&nbsp;: vous seul en connaissez la valeur.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-yv-ink">{`Prix de référence, relevés le ${refs.releveLe}`}</h3>
        <ul className="mt-2 space-y-2 text-sm text-yv-body">
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{`YS Lounge : ${chf(refs.loungeSaison.valeur)} par personne et par saison, ${chf(refs.loungeMatch.valeur)} par match, prix public TTC`}</span>
            <Statut s={refs.loungeSaison.statut} />
            {sourceLien(refs.loungeSaison)}
          </li>
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{`Club des 1000 : ${chf(refs.cotisationClub1000.valeur)} par an pour ${refs.soireesClub1000.valeur}${NBSP}soirées`}</span>
            <Statut s={refs.cotisationClub1000.statut} />
            {sourceLien(refs.cotisationClub1000)}
          </li>
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{`Soirée de réseau : ${entier(refs.cotisationClub1000.valeur)} ÷ ${refs.soireesClub1000.valeur} = ${chf(refs.soiree.valeur)} par personne, repas compris`}</span>
            <Statut s={refs.soiree.statut} />
          </li>
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{`Remises entre partenaires du club : ${refs.remises.map((x) => `${decimal(x, Number.isInteger(x) ? 0 : 1)}${NBSP}%`).join(", ")}, soit ${taux(refs.remiseMoyennePct / 100)} en moyenne arrondie`}</span>
            <Statut s="verifie" />
            <Lien href={refs.remisesSource}>{domaine(refs.remisesSource)}</Lien>
          </li>
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{`Publication dédiée : ${entier(refs.publicationAbonnes)} abonnés × ${taux(refs.porteeBase)} de portée ÷ 1'000 × ${chf(refs.cpmSocialBase)} = ${chf(refs.publicationBase.valeur)} en base ; ${taux(refs.porteeOptimiste)} et ${chf(refs.cpmSocialOptimiste)}, soit ${chf(refs.publicationOptimiste)}, en optimiste`}</span>
            <Statut s={refs.publicationBase.statut} />
          </li>
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-yv-muted">
          {"Les supports de visibilité du club (maillot, panneaux LED, écran géant, panneaux fixes) n'ont pas de prix public : c'est pourquoi l'écran est mesuré, et non repris d'un tarif. "}
          <Lien href={refs.inventaireSource}>{domaine(refs.inventaireSource)}</Lien>
        </p>
      </div>
    </div>
  );
}
