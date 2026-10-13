import { ExternalLink } from "lucide-react";

import { chf, dateCh, entier, taux } from "../_data/format";
import type { VueSponsor } from "../_data/sponsor";
import type { CompteReleve, PublicationReleve } from "../_data/types";
import { Ligne } from "./Blocs";
import { Statut } from "./Statut";

const NBSP = " ";

const PLATEFORMES: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  x: "X",
  tiktok: "TikTok",
  youtube: "YouTube",
};

/** Le nombre affiche par la plateforme est arrondi (13 K, 1,77 k) sauf si le releve dit l'avoir lu exact. */
function abonnesArrondis(c: CompteReleve): boolean {
  return c.abonnes_affiche !== undefined && !(c.note ?? "").includes("valeur exacte");
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

function Publications({ posts, legende }: { posts: PublicationReleve[]; legende: string }) {
  return (
    <ul className="divide-y divide-yv-rule border-y border-yv-rule" aria-label={legende}>
      {posts.map((p) => (
        <li key={p.url} className="py-3 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <Lien href={p.url}>
              <span className="font-mono tabular-nums">{dateCh(p.date)}</span>
              <span>{`${PLATEFORMES[p.plateforme] ?? p.plateforme}, ${p.format}`}</span>
            </Lien>
            <span className="tabular-nums text-yv-ink">
              {`${entier(p.likes)}${NBSP}likes · ${entier(p.commentaires)}${NBSP}commentaire${p.commentaires > 1 ? "s" : ""}`}
            </span>
          </div>
          <p className="mt-1 text-yv-body">{`«${NBSP}${p.extrait_texte}${NBSP}»`}</p>
          {p.commentaires_detail && <p className="mt-0.5 text-xs text-yv-muted">{p.commentaires_detail}</p>}
        </li>
      ))}
    </ul>
  );
}

export function Reseaux({ vue }: { vue: VueSponsor }) {
  const r = vue.reseaux;
  const h = vue.hypotheses;
  const vb = vue.valeur.base.match;
  const vo = vue.valeur.optimiste.match;
  const releve = dateCh(r.releve_le);
  const ig = r.instagram_club_periode;
  const periodeIg = `du ${dateCh(ig.du)} au ${dateCh(ig.au)}`;
  const instagram = r.comptes_club.instagram;
  const marque = vue.cle === "egokiefer" ? r.marques.egokiefer : r.marques.roseyres_smartimmo;
  const postsLogo = marque.posts_club;
  const likes = postsLogo.reduce((t, p) => t + p.likes, 0);
  const resume = r.match_j09.resume_video;
  const postsMatch = r.match_j09.posts_club;

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-sm font-semibold text-yv-ink">Les comptes du club</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[17rem] text-sm">
            <caption className="sr-only">{`Abonnés des comptes du club, relevés le ${releve}`}</caption>
            <thead>
              <tr className="border-b border-yv-ink/80 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-yv-muted">
                <th scope="col" className="py-2 pr-2">Plateforme</th>
                <th scope="col" className="py-2 text-right">{`Abonnés au ${releve}`}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(r.comptes_club).map(([cle, c]) => (
                <tr key={cle} className="border-b border-yv-rule">
                  <th scope="row" className="py-1.5 pr-2 text-left font-normal">
                    {`${PLATEFORMES[cle] ?? cle}${c.handle?.startsWith("@") ? `, ${c.handle}` : ""}`}
                  </th>
                  <td className="py-1.5 text-right tabular-nums">
                    {c.abonnes === undefined
                      ? "non lu"
                      : abonnesArrondis(c)
                        ? `environ ${entier(c.abonnes)}`
                        : entier(c.abonnes)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-yv-muted">
          <Statut s="verifie" />
          <span>nombre affiché par chaque plateforme. Facebook et YouTube l&apos;affichent arrondi.</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-yv-ink">{`${vue.nom} dans les publications du club`}</h3>
        <p className="mt-1 text-sm text-yv-muted">
          {`Les ${ig.posts_lus} publications Instagram du club ${periodeIg}, ouvertes une par une, et le compte LinkedIn du club.`}
        </p>
        <div className="mt-2">
          {vue.cle === "egokiefer" && marque.repartition ? (
            <>
              <Ligne
                libelle="Mentions écrites"
                detail="nom dans le texte, @mention ou hashtag"
                valeur={entier(marque.repartition.texte_ou_mention + marque.repartition.hashtag)}
                statut={<Statut s="mesure" />}
              />
              <Ligne
                libelle="Publications avec le logo visible"
                detail={"haut d'entraînement EgoKiefer sur les visuels de composition et d'anniversaire, bandeau LED en arrière-plan d'une photo"}
                valeur={entier(marque.repartition.logo_visible)}
                statut={<Statut s="mesure" />}
              />
              <Ligne
                libelle="Likes cumulés sur ces publications"
                detail={`lus sur chaque publication le ${releve}`}
                valeur={entier(likes)}
                statut={<Statut s="mesure" />}
              />
              <Ligne
                libelle="Portée de ces publications"
                detail={`Instagram ne l'affiche pas. Estimation seulement : ${postsLogo.length} publications × ${entier(instagram.abonnes ?? 0)} abonnés × ${taux(h.portee_post.base)} de portée par publication en base, ${taux(h.portee_post.haut)} en optimiste.`}
                valeur={`${entier(postsLogo.length * (instagram.abonnes ?? 0) * h.portee_post.base)} · ${entier(postsLogo.length * (instagram.abonnes ?? 0) * h.portee_post.haut)} vues`}
                statut={<Statut s="hypothese" />}
              />
            </>
          ) : (
            <Ligne
              libelle="Publications citant ou montrant Roseyres.ch ou Smartimmo"
              detail="ni dans le texte, ni par un logo lisible, y compris sur les photos du match"
              valeur={entier(postsLogo.length)}
              statut={<Statut s="mesure" />}
            />
          )}
        </div>
        {postsLogo.length > 0 && (
          <div className="mt-4">
            <Publications posts={postsLogo} legende={`Publications du club avec le logo ${vue.nom}`} />
            <div className="mt-2">
              <Statut s="mesure" />
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-yv-ink">{`Les comptes ${vue.cle === "egokiefer" ? "d'EgoKiefer" : "de Smartimmo et Roseyres.ch"}`}</h3>
        <div className="mt-2">
          {vue.cle === "egokiefer" ? (
            <Ligne
              libelle="Publications de la marque sur Yverdon Sport"
              detail={`${Object.entries(marque.comptes_marque)
                .map(([cle, c]) => `${PLATEFORMES[cle] ?? cle} ${c.handle ?? ""}, ${entier(c.abonnes ?? 0)} abonnés`)
                .join(" ; ")}. Le partenariat n'y est pas relayé sur la période.`}
              valeur={entier(marque.posts_marque.length)}
              statut={<Statut s="mesure" />}
            />
          ) : (
            <>
              <Ligne
                libelle="Publications de Smartimmo ou de Roseyres.ch"
                detail={`LinkedIn Smartimmo, ${entier(marque.comptes_marque.linkedin?.abonnes ?? 0)} abonnés, sans publication sur la période. Pas de compte Instagram trouvé. Le site roseyres.ch ne renvoie vers aucun réseau social.`}
                valeur={entier(marque.posts_marque.length)}
                statut={<Statut s="mesure" />}
              />
              <Ligne
                libelle="Seule trace du partenariat"
                detail={
                  <>
                    {"Le pied de page de "}
                    <Lien href={marque.comptes_marque.site_smartimmo?.url ?? "https://smartimmo.ch/"}>smartimmo.ch</Lien>
                    {` : «${NBSP}Fier Sponsor d'Yverdon Sport Football Club${NBSP}», avec un lien vers le site du club. Sans date.`}
                  </>
                }
                valeur="1"
                statut={<Statut s="verifie" />}
              />
            </>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-yv-ink">{`Le match du ${vue.match.date} sur les comptes du club`}</h3>
        <p className="mt-1 text-sm text-yv-muted">
          {`${postsMatch.length} publications Instagram, de l'annonce au résultat. Aucun logo ${vue.nom} n'y est lisible. Pas de publication sur LinkedIn ni TikTok.`}
        </p>
        <div className="mt-3">
          <Publications posts={postsMatch} legende={`Publications du club sur le match du ${vue.match.date}`} />
          <div className="mt-2">
            <Statut s="mesure" />
          </div>
        </div>
        <div className="mt-4">
          <Ligne
            libelle="Résumé vidéo sur la chaîne YouTube du club"
            detail={
              <>
                <Lien href={resume.url}>{`publié le ${dateCh(resume.date)}, ${resume.duree.replace(":", " min ")}`}</Lien>
                {`, vues lues le ${releve}. Présence du bandeau à l'image pas encore mesurée. Aucun résumé blue Sport ou SFL de ce match trouvé sur YouTube.`}
              </>
            }
            valeur={`${entier(resume.vues)} vues`}
            statut={<Statut s="mesure" />}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-yv-ink">Ce qui n&apos;a pas pu être lu</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yv-body marker:text-yv-muted">
          <li>Facebook du club&nbsp;: les publications sont derrière un mur de connexion, seul le nombre d&apos;abonnés est visible.</li>
          <li>X&nbsp;: le fil complet est derrière un mur de connexion.</li>
          <li>Instagram&nbsp;: le nombre de vues des reels n&apos;est pas affiché sur les pages des publications.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-yv-ink">Ce qui entre dans la valeur</h3>
        <div className="mt-2">
          <Ligne
            libelle="Exposition organique estimée"
            detail={`${entier(h.instagram_abonnes)} abonnés Instagram (relevé du ${h.instagram_verifie_le}, celui des hypothèses) × ${taux(h.part_bandeau_contenus, 1)} de contenus avec le bandeau × ${taux(h.vues_resume_video)} de vues du résumé`}
            valeur={`${entier(vb.impressionsSocialOrg)} impressions, ${chf(vb.socialOrganique)}`}
            statut={<Statut s="hypothese" />}
          />
          <Ligne
            libelle={`Package social : ${h.posts_partenaire_par_match} publications dédiées par match`}
            detail={`portée de ${taux(h.portee_post.base)} des abonnés par publication en base, ${taux(h.portee_post.haut)} en optimiste`}
            valeur={`${entier(vb.impressionsSocialPackage)} impressions, ${chf(vb.socialPackage)} ; optimiste ${chf(vo.socialPackage)}`}
            statut={<Statut s="hypothese" levier />}
          />
        </div>
        <p className="mt-3 text-xs text-yv-muted">
          {`Le package social n'est pas une mesure : c'est ce que donneraient ${h.posts_partenaire_par_match} publications «${NBSP}partenaire du match${NBSP}» si le club les publiait. Il n'entre pas dans la valeur du match.`}
        </p>
      </div>
    </div>
  );
}
