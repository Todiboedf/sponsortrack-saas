import { Heart, MessageCircle, Music2 } from "lucide-react";

import { chf, dateCh, entier, taux } from "../_data/format";
import { de } from "../_data/marques";
import type { VueSponsor } from "../_data/sponsor";
import type { CompteReleve, PublicationReleve } from "../_data/types";
import { NBSP } from "./communs";
import { Source, Tag, TagsLevier, type Etat } from "./Etiquette";

const PLATEFORMES: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  x: "X",
  tiktok: "TikTok",
  youtube: "YouTube",
};

// Tracés des icônes de marque de Lucide (retirées du paquet lucide-react 1.x), repris du gabarit.
const TRACES: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  youtube: (
    <>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

function Icone({ cle }: { cle: string }) {
  if (cle === "x") return <b>X</b>;
  if (cle === "tiktok") return <Music2 aria-hidden />;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {TRACES[cle]}
    </svg>
  );
}

/** Le nombre affiché par la plateforme est arrondi (13 K, 1,77 k) sauf si le relevé dit l'avoir lu exact. */
function abonnes(c: CompteReleve): string {
  if (c.abonnes === undefined) return "non lu";
  const arrondi = c.abonnes_affiche !== undefined && !(c.note ?? "").includes("valeur exacte");
  return arrondi ? `≈${NBSP}${entier(c.abonnes)}` : entier(c.abonnes);
}

/** Ce que la marque obtient dans les publications du club : le chiffre résumé de la vue d'ensemble. */
export function resumeReseaux(vue: VueSponsor): { chiffre: string; titre: string; publications: number } {
  const m = vue.cle === "egokiefer" ? vue.reseaux.marques.egokiefer : vue.reseaux.marques.roseyres_smartimmo;
  const lus = vue.reseaux.instagram_club_periode.posts_lus;
  if (vue.cle === "egokiefer" && m.repartition) {
    const mentions = m.repartition.texte_ou_mention + m.repartition.hashtag;
    return {
      publications: m.repartition.logo_visible,
      chiffre: entier(m.repartition.logo_visible),
      titre: `publications du club avec le logo visible, ${mentions} mention${mentions > 1 ? "s" : ""} écrite${mentions > 1 ? "s" : ""}, sur ${lus} ouvertes une par une`,
    };
  }
  return {
    publications: m.posts_club.length,
    chiffre: entier(m.posts_club.length),
    titre: `publication du club citant ou montrant ${vue.nom}, sur ${lus} ouvertes une par une`,
  };
}

function Publication({ p }: { p: PublicationReleve }) {
  return (
    <div className="post">
      <div className="d">
        <a href={p.url} target="_blank" rel="noopener noreferrer">
          {dateCh(p.date)}
        </a>
        <small>{`${PLATEFORMES[p.plateforme] ?? p.plateforme}, ${p.format}`}</small>
      </div>
      <div className="t">
        <q>{p.extrait_texte}</q>
        {p.commentaires_detail && <small>{p.commentaires_detail}</small>}
      </div>
      <div className="m">
        <span>
          <Heart aria-hidden />
          {entier(p.likes)}
          <span className="sr">{` like${p.likes > 1 ? "s" : ""}`}</span>
        </span>
        <span>
          <MessageCircle aria-hidden />
          {entier(p.commentaires)}
          <span className="sr">{` commentaire${p.commentaires > 1 ? "s" : ""}`}</span>
        </span>
      </div>
    </div>
  );
}

function GrandFait({ chiffre, titre, texte, e }: { chiffre: string; titre: string; texte: React.ReactNode; e: Etat }) {
  return (
    <div className="big-fact">
      <div className={`n ${chiffre === "0" ? "zero" : "lime"}`}>{chiffre}</div>
      <div>
        <h3>{titre}</h3>
        <p>{texte}</p>
        <Tag e={e} />
      </div>
    </div>
  );
}

/** Onglet 3 : réseaux sociaux. */
export function PanneauReseaux({ vue }: { vue: VueSponsor }) {
  const r = vue.reseaux;
  const h = vue.hypotheses;
  const vb = vue.valeur.base.match;
  const vo = vue.valeur.optimiste.match;
  const releve = dateCh(r.releve_le);
  const ig = r.instagram_club_periode;
  const periodeIg = `du ${dateCh(ig.du)} au ${dateCh(ig.au)}`;
  const egokiefer = vue.cle === "egokiefer";
  const marque = egokiefer ? r.marques.egokiefer : r.marques.roseyres_smartimmo;
  const postsLogo = marque.posts_club;
  const likes = postsLogo.reduce((t, p) => t + p.likes, 0);
  const resume = r.match_j09.resume_video;
  const postsMatch = r.match_j09.posts_club;
  const abonnesIg = h.instagram_abonnes;

  const faits: React.ReactNode[] = [];
  if (egokiefer && marque.repartition) {
    const mentions = marque.repartition.texte_ou_mention + marque.repartition.hashtag;
    faits.push(
      <GrandFait
        key="mentions"
        chiffre={entier(mentions)}
        titre={`mention écrite ${de(vue.nom)} par le club`}
        texte={`${ig.posts_lus} publications Instagram ${periodeIg} ouvertes une par une, plus le compte LinkedIn du club : ni nom dans le texte, ni @mention, ni hashtag.`}
        e="mesure"
      />,
      <GrandFait
        key="logo"
        chiffre={entier(marque.repartition.logo_visible)}
        titre="publications du club avec le logo visible"
        texte={`Haut d'entraînement ${vue.nom} sur les visuels de composition et d'anniversaire, bandeau LED en arrière-plan d'une photo. ${entier(likes)} likes cumulés, lus le ${releve}.`}
        e="mesure"
      />,
      <GrandFait
        key="marque"
        chiffre={entier(marque.posts_marque.length)}
        titre={`publication ${de(vue.nom)} sur Yverdon Sport`}
        texte={`${Object.entries(marque.comptes_marque)
          .map(([cle, c]) => `${PLATEFORMES[cle] ?? cle} ${c.handle ?? ""}, ${entier(c.abonnes ?? 0)} abonnés`)
          .join(" ; ")}. Le partenariat n'y est pas relayé sur la période.`}
        e="mesure"
      />,
    );
  } else {
    const site = marque.comptes_marque.site_smartimmo;
    const traces = [site].filter((x) => x !== undefined).length;
    faits.push(
      <GrandFait
        key="club"
        chiffre={entier(postsLogo.length)}
        titre={`publication du club citant ou montrant ${vue.nom}`}
        texte={`${ig.posts_lus} publications Instagram ${periodeIg} ouvertes une par une, plus le compte LinkedIn du club : ni dans le texte, ni par un logo lisible, y compris sur les photos du match.`}
        e="mesure"
      />,
      <GrandFait
        key="marque"
        chiffre={entier(marque.posts_marque.length)}
        titre={`publication de Smartimmo ou de ${vue.nom}`}
        texte={`LinkedIn Smartimmo, ${entier(marque.comptes_marque.linkedin?.abonnes ?? 0)} abonnés, sans publication sur la période. Pas de compte Instagram trouvé. Le site roseyres.ch ne renvoie vers aucun réseau social.`}
        e="mesure"
      />,
      <GrandFait
        key="trace"
        chiffre={entier(traces)}
        titre="trace du partenariat"
        texte={
          <>
            {"Le pied de page de "}
            <Source href={site?.url ?? "https://smartimmo.ch/"}>smartimmo.ch</Source>
            {` : «${NBSP}Fier Sponsor d'Yverdon Sport Football Club${NBSP}», avec un lien vers le site du club. Sans date.`}
          </>
        }
        e="verifie"
      />,
    );
  }

  const porteeBase = postsLogo.length * abonnesIg * h.portee_post.base;
  const porteeHaut = postsLogo.length * abonnesIg * h.portee_post.haut;

  return (
    <>
      <div className="panel-head">
        <div>
          <h2>Réseaux sociaux</h2>
          <p className="lede">
            {`Relevé du ${releve} : les publications du club et de la marque depuis le ${dateCh(r.periode.debut)}, ouvertes une par une, avec leurs likes et commentaires. Chaque chiffre porte sa date.`}
          </p>
        </div>
        <Tag e="mesure" texte="compté publication par publication" />
      </div>

      <div className="grid g3">{faits}</div>

      <div className="card">
        <div className="card-head">
          <div>
            <h3>Les comptes du club</h3>
            <p>{`Abonnés affichés par chaque plateforme au ${releve}. Facebook et YouTube l'affichent arrondi.`}</p>
          </div>
          <Tag e="verifie" />
        </div>
        <div className="grid g6">
          {Object.entries(r.comptes_club).map(([cle, c]) => (
            <div key={cle} className="plat">
              <div className="ic">
                <Icone cle={cle} />
              </div>
              <div className="n">
                {abonnes(c)}
                <small>abonnés</small>
              </div>
              <div className="p">{`${PLATEFORMES[cle] ?? cle} · ${c.handle ?? ""}`}</div>
            </div>
          ))}
        </div>
      </div>

      {postsLogo.length > 0 && (
        <div className="card">
          <div className="card-head">
            <div>
              <h3>{`Les ${postsLogo.length} publications du club où le logo est visible`}</h3>
              <p>
                {`Portée : Instagram ne l'affiche pas. Estimation seulement : ${postsLogo.length} publications × ${entier(abonnesIg)} abonnés × ${taux(h.portee_post.base)} de portée par publication en base, ${taux(h.portee_post.haut)} en optimiste.`}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="num" style={{ fontWeight: 600 }}>{`${entier(porteeBase)} · ${entier(porteeHaut)} vues`}</div>
              <Tag e="hypothese" />
            </div>
          </div>
          <div className="posts">
            {postsLogo.map((p) => (
              <Publication key={p.url} p={p} />
            ))}
          </div>
          <p className="note" style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <Tag e="mesure" />
            {`likes et commentaires lus sur chaque publication le ${releve}`}
          </p>
        </div>
      )}

      <div className="grid g-7-5">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>{`Le match du ${vue.match.date} sur les comptes du club`}</h3>
              <p>
                {`${postsMatch.length} publications Instagram du club, de l'annonce au résultat. Aucun logo ${vue.nom} n'y est lisible. Pas de publication sur LinkedIn ni TikTok.`}
              </p>
            </div>
            <Tag e="mesure" />
          </div>
          <div className="posts">
            {postsMatch.map((p) => (
              <Publication key={p.url} p={p} />
            ))}
          </div>
        </div>
        <div className="grid" style={{ alignContent: "start" }}>
          <GrandFait
            chiffre={entier(resume.vues)}
            titre="vues du résumé vidéo sur la chaîne YouTube du club"
            texte={
              <>
                <Source href={resume.url}>{`Publié le ${dateCh(resume.date)}, ${resume.duree.replace(":", " min ")}`}</Source>
                {`, vues lues le ${releve}. Présence du bandeau à l'image pas encore mesurée. Aucun résumé blue Sport ou SFL de ce match trouvé sur YouTube.`}
              </>
            }
            e="mesure"
          />
          <div className="card">
            <h3>Ce qui entre dans la valeur</h3>
            <div className="kv stack-kv" style={{ marginTop: 8 }}>
              <div>
                <span className="k">
                  <b style={{ color: "var(--fg)" }}>Exposition organique estimée</b>
                  <small>
                    {`${entier(abonnesIg)} abonnés Instagram (relevé du ${h.instagram_verifie_le}) × ${taux(h.part_bandeau_contenus, 1)} de contenus avec le bandeau × ${taux(h.vues_resume_video)} de vues du résumé`}
                  </small>
                </span>
                <span className="v">{`${entier(vb.impressionsSocialOrg)} impressions · ${chf(vb.socialOrganique)}`}</span>
                <Tag e="hypothese" />
              </div>
              <div>
                <span className="k">
                  <b style={{ color: "var(--fg)" }}>{`Package social, ${h.posts_partenaire_par_match} publications dédiées par match`}</b>
                  <small>
                    {`Portée de ${taux(h.portee_post.base)} des abonnés par publication en base, ${taux(h.portee_post.haut)} en optimiste. C'est ce que donneraient ${h.posts_partenaire_par_match} publications «${NBSP}partenaire du match${NBSP}» si le club les publiait : un levier, pas une mesure, qui n'entre pas dans la valeur du match.`}
                  </small>
                </span>
                <span className="v">
                  {`${entier(vb.impressionsSocialPackage)} impressions · ${chf(vb.socialPackage)}, optimiste ${chf(vo.socialPackage)}`}
                </span>
                <TagsLevier />
              </div>
            </div>
          </div>
          <p className="note" style={{ margin: 0 }}>
            Ce qui n&apos;a pas pu être lu&nbsp;: Facebook et X, publications derrière un mur de connexion, seul le nombre
            d&apos;abonnés est visible. Instagram n&apos;affiche pas les vues des reels.
          </p>
        </div>
      </div>
    </>
  );
}
