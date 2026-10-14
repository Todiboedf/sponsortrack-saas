import { chf, couverture, dateCh, decimal, duree, entier, secondes as fmtSecondes, taux } from "../_data/format";
import { DIFFUSEUR, ETUDE_ZHAW, PALIERS_INVESTISSEMENT_CHF } from "../_data/regles";
import type { VueSponsor } from "../_data/sponsor";
import type { ValeurMatch } from "../_data/valeur";
import { NBSP } from "./communs";
import { CalculCouverture } from "./Couverture";
import { Source, Tag, TagsLevier, type Etat } from "./Etiquette";
import { ScenarioValeur, type ChiffresScenario } from "./ScenarioValeur";

/** "81 ÷ 30 × 6'000 ÷ 1'000 × 45" : le calcul de la valeur TV, pour qu'un lecteur puisse le refaire. */
function calculTv(secondes: number, dureeSpot: number, audience: number, cpm: number): string {
  const s = Number.isInteger(secondes) ? entier(secondes) : decimal(secondes, 1);
  return `${s}${NBSP}÷${NBSP}${dureeSpot} × ${entier(audience)}${NBSP}÷${NBSP}1'000 × ${cpm}`;
}

/** Onglet 4 : valeur média. */
export function PanneauValeur({ vue }: { vue: VueSponsor }) {
  const h = vue.hypotheses;
  const v = vue.valeur;
  const vb = v.base.match;
  const vo = v.optimiste.match;
  const ex = vue.exposition;
  const n = vue.saison.matchs;
  const sb = v.base.saison.totalMesure;
  const so = v.optimiste.saison.totalMesure;
  const sommeLignes = (m: ValeurMatch) => m.tv + m.stade + m.socialOrganique;
  const totalAvantArrondi = sommeLignes(vb) !== vb.totalMesure || sommeLignes(vo) !== vo.totalMesure;
  const packageAvantArrondi = vb.totalAvecPackage !== vb.totalMesure + vb.socialPackage;

  const scenario = (m: ValeurMatch, base: boolean): ChiffresScenario => {
    const total = sommeLignes(m);
    return {
      libelle: base ? "estimation de base" : "scénario optimiste",
      total: chf(m.totalMesure),
      alt: base
        ? `Scénario optimiste : ${chf(vo.totalMesure)} (audience et tarifs dans le haut de la fourchette)`
        : `Estimation de base : ${chf(vb.totalMesure)} (audience et tarifs retenus)`,
      tv: chf(m.tv),
      stade: chf(m.stade),
      social: chf(m.socialOrganique),
      parts: [(m.tv / total) * 100, (m.stade / total) * 100, Math.max((m.socialOrganique / total) * 100, 0.6)],
      saison: chf(base ? sb : so),
      saisonAlt: base
        ? `valeur média de la saison à domicile, base · ${chf(so)} en optimiste`
        : `valeur média de la saison à domicile, optimiste · ${chf(sb)} en base`,
      contactsTv: entier(m.contactsTv * n),
      contactsStade: entier(m.contactsStade * n),
    };
  };

  const ligneTv = `${fmtSecondes(ex.equivS)} équivalentes (${duree(ex.brutS)} brut)`;
  const ligneStade = `${v.passages} passages vus par ${entier(h.affluence.base)} spectateurs`;

  const campagne: { t: string; e: Etat }[] = [
    {
      t: `Vos ${fmtSecondes(ex.equivS)} équivalentes : ${calculTv(ex.equivS, h.duree_passage_s, h.audience_tv.base, h.cpm_tv_30s.base)} = ${chf(vb.tv)}`,
      e: "hypothese",
    },
    {
      t: `Sans pondération de lisibilité, les ${fmtSecondes(ex.brutS)} brutes : ${calculTv(ex.brutS, h.duree_passage_s, h.audience_tv.base, h.cpm_tv_30s.base)} = ${chf(vb.tvBrut)}`,
      e: "hypothese",
    },
    {
      t: `Contacts en base : ${entier(vb.contactsTv)} à la TV (${entier(h.audience_tv.base)} téléspectateurs × ${v.passages} passages)`,
      e: "hypothese",
    },
    {
      t: `Contacts au stade : ${entier(vb.contactsStade)} (${entier(h.affluence.base)} spectateurs × ${v.passages} passages)`,
      e: "verifie",
    },
  ];

  const hyp: { nom: string; detail: React.ReactNode; val: string; e: Etat }[] = [
    {
      nom: "Temps à l'écran, passages",
      detail: "lus image par image sur la diffusion",
      val: `${duree(ex.brutS)}, ${v.passages} passages`,
      e: "mesure",
    },
    {
      nom: "Taille du bandeau à l'image",
      detail:
        ex.parPlanSource === "mesure_hauteurs"
          ? "plan large, plan moyen, gros plan, par apparition (hauteur médiane des détections), pas seconde par seconde"
          : "plan large, plan moyen, gros plan, seconde par seconde",
      val: ex.parPlan ? `${duree(ex.parPlan.large)} · ${duree(ex.parPlan.moyen)} · ${duree(ex.parPlan.gros)}` : "",
      e: "mesure",
    },
    {
      nom: "Indice de visibilité",
      detail: "règle Sponsorlens, selon la hauteur du bandeau à l'écran",
      val: `${decimal(h.qi.large, 2)} · ${decimal(h.qi.moyen, 2)} · ${decimal(h.qi.gros, 2)}`,
      e: "hypothese",
    },
    {
      nom: "Audience TV et streaming",
      detail: "le diffuseur ne publie pas ce chiffre ; base, puis optimiste",
      val: `${entier(h.audience_tv.base)} · ${entier(h.audience_tv.haut)}`,
      e: "hypothese",
    },
    {
      nom: "Tarif TV",
      detail: `pour 1'000 contacts et ${h.duree_passage_s} secondes ; base, puis optimiste`,
      val: `${chf(h.cpm_tv_30s.base)} · ${chf(h.cpm_tv_30s.haut)}`,
      e: "hypothese",
    },
    {
      nom: "Affluence au stade",
      detail: (
        <>
          <Source href={vue.reseaux.affluence_j09.source}>SFL match center</Source>
          {`, lue le ${dateCh(vue.reseaux.releve_le)} ; la même dans les deux scénarios`}
        </>
      ),
      val: `${entier(h.affluence.base)} spectateurs`,
      e: "verifie",
    },
    {
      nom: "Visibilité au stade",
      detail: "part du public qui voit le bandeau à chaque passage",
      val: decimal(h.qi_stade, 1),
      e: "hypothese",
    },
    {
      nom: "Tarif affichage",
      detail: "pour 1'000 contacts ; base, puis optimiste",
      val: `${chf(h.cpm_stade.base)} · ${chf(h.cpm_stade.haut)}`,
      e: "hypothese",
    },
    {
      nom: "Audience Instagram du club",
      detail: `@yverdonsport, relevé le ${h.instagram_verifie_le} ; Facebook, TikTok, LinkedIn non comptés`,
      val: `${entier(h.instagram_abonnes)} abonnés`,
      e: "verifie",
    },
    {
      nom: "Réseaux sociaux, organique",
      detail: "part du bandeau dans les contenus vidéo du club, puis part des abonnés qui voient le résumé",
      val: `${taux(h.part_bandeau_contenus, 1)} · ${taux(h.vues_resume_video)}`,
      e: "hypothese",
    },
    {
      nom: "Tarif social",
      detail: "pour 1'000 impressions ; base, puis optimiste",
      val: `${chf(h.cpm_social.base)} · ${chf(h.cpm_social.haut)}`,
      e: "hypothese",
    },
  ];

  const z = ETUDE_ZHAW.valeur;
  const sansPassages = vue.leviers.every((l) => l.type !== "passages");

  return (
    <>
      <ScenarioValeur
        entete={
          <div>
            <h2>Valeur média</h2>
            <p className="lede">
              Ce qu&apos;il aurait fallu acheter en publicité classique pour obtenir le même nombre de contacts avec le
              même temps de présence, canal par canal. Les chiffres d&apos;audience du club ou du diffuseur remplacent
              les hypothèses dès réception.
            </p>
          </div>
        }
        base={scenario(vb, true)}
        optimiste={scenario(vo, false)}
        sousTotal={`pour ${duree(ex.brutS)} à l'écran, ${v.passages} passages, devant ${entier(h.affluence.base)} spectateurs`}
        etiquetteTotal={
          <>
            <Tag e="hypothese" texte="hypothèse · audience TV non publiée" />
            {totalAvantArrondi && (
              <p className="note">Le total est calculé avant l&apos;arrondi de chaque ligne au franc.</p>
            )}
          </>
        }
        teteCanal={
          <>
            <div>
              <h3>Par canal</h3>
              <p>{`${ligneTv} · ${ligneStade}`}</p>
            </div>
            <Tag e="hypothese" />
          </>
        }
        legende={
          <>
            <span>
              <i style={{ background: "var(--blue-1)" }} />
              {`TV et streaming (${DIFFUSEUR.valeur})`}
            </span>
            <span>
              <i style={{ background: "var(--blue-2)" }} />
              Stade
            </span>
            <span>
              <i style={{ background: "var(--blue-3)" }} />
              Réseaux sociaux, organique
            </span>
          </>
        }
        lignes={{
          tv: (
            <span className="k">
              TV et streaming <small>{ligneTv}</small>
            </span>
          ),
          stade: (
            <span className="k">
              Stade <small>{ligneStade}</small>
            </span>
          ),
          social: (
            <span className="k">
              Réseaux sociaux, organique <small>bandeau en arrière-plan des vidéos du club</small>
            </span>
          ),
        }}
        calcul={
          <details style={{ marginTop: 14 }}>
            <summary>Comment c&apos;est calculé</summary>
            <div className="in">
              <div className="formula">
                {`Valeur TV = secondes équivalentes ÷ ${h.duree_passage_s}${NBSP}s × audience ÷ 1'000 × tarif pour 1'000 contacts et ${h.duree_passage_s}${NBSP}s. Stade = affluence × passages ÷ 1'000 × tarif affichage × visibilité au stade. Réseaux sociaux = impressions ÷ 1'000 × tarif social. Valeur du match = TV + stade + réseaux sociaux organiques.`}
              </div>
              <p style={{ margin: "12px 0 6px", color: "var(--fg-2)", fontSize: 13.5 }}>
                {`Ce qu'aurait coûté une campagne TV classique : des spots de ${h.duree_passage_s}${NBSP}s au tarif de ${chf(h.cpm_tv_30s.base)} pour 1'000 contacts, devant ${entier(h.audience_tv.base)} téléspectateurs.`}
              </p>
              <div className="kv">
                {campagne.map((c) => (
                  <div key={c.t}>
                    <span className="k" style={{ fontSize: 13 }}>
                      {c.t}
                    </span>
                    <span className="v">
                      <Tag e={c.e} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </details>
        }
        projection={{
          eyebrow: `Projection · ${n} matchs à domicile`,
          ecran: (
            <>
              <span className="k">{`${vue.nom} à l'écran pendant le jeu`}</span>
              <span className="v">{duree(vue.saison.expositionS)}</span>
            </>
          ),
          passages: (
            <>
              <span className="k">Passages</span>
              <span className="v">{entier(vue.saison.passages)}</span>
            </>
          ),
          pied: (
            <>
              <p className="note">
                {`${n} matchs à domicile au rythme mesuré sur cette journée : même exposition, mêmes hypothèses, audience TV supposée, ${entier(h.affluence.base)} spectateurs à chaque match. La projection ne remplace pas la mesure de chaque match.`}
              </p>
              <div style={{ marginTop: 8 }}>
                <Tag e="hypothese" />
              </div>
            </>
          ),
        }}
        aCote={
          <div className="card">
            <div className="card-head">
              <div>
                <h3>La part de l&apos;écran dans votre contrat</h3>
                <p>
                  Un contrat de sponsoring, c&apos;est l&apos;écran, mais aussi l&apos;hospitalité, le réseau et
                  l&apos;image. Aucun pourcentage de référence n&apos;existe pour dire ce que l&apos;écran doit peser.
                  Ici, la part de l&apos;écran se mesure sur votre contrat, pas sur une moyenne.
                </p>
              </div>
              <Tag e="hypothese" />
            </div>
            <div className="couv">
              {PALIERS_INVESTISSEMENT_CHF.valeur.map((p) => (
                <div key={p}>
                  <span className="inv">{`${chf(p)} / saison`}</span>
                  <span className={`c${sb / p > 1 ? " full" : ""}`}>{couverture(sb, p)}</span>
                  <span className="o">{`optimiste ${couverture(so, p)}`}</span>
                </div>
              ))}
            </div>
            <p className="note">
              {`Au-delà de 1${NBSP}×, l'écran seul rembourse le contrat ; le réseau, l'hospitalité et l'image viennent en plus. L'audience TV reste une hypothèse.`}
            </p>
            <CalculCouverture saisonBase={sb} saisonOptimiste={so} />
          </div>
        }
      />

      <div>
        <div className="panel-head" style={{ marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: 20 }}>Comment augmenter cette valeur</h3>
            <p className="lede" style={{ fontSize: 14 }}>
              {`Scénario base, même formule et mêmes hypothèses que la valeur du match. Un levier est un calcul, pas une mesure.${
                sansPassages
                  ? ` Pas de levier «${NBSP}plus de passages${NBSP}» : ${vue.nom} a déjà le plus de passages des marques du bandeau (${vue.marque.passages}).`
                  : ""
              }`}
            </p>
          </div>
        </div>
        <div className="grid g3">
          {vue.leviers.map((l) => (
            <div key={l.titre} className="lever">
              <div className="eyebrow">Valeur du match</div>
              <div className="v">
                {chf(l.valeur)}
                <small>{`+${l.gainPct}${NBSP}%`}</small>
              </div>
              <h3>{l.titre}</h3>
              <p>
                {l.type === "publications" && packageAvantArrondi
                  ? `${l.description} ${chf(vb.totalMesure)} + ${chf(vb.socialPackage)}, calculé avant l'arrondi.`
                  : l.description}
              </p>
              <TagsLevier />
            </div>
          ))}
        </div>
      </div>

      <details>
        <summary>Les hypothèses, et ce qui est mesuré</summary>
        <div className="in tbl">
          <table>
            <thead>
              <tr>
                <th scope="col">Donnée</th>
                <th scope="col" className="r">
                  Valeur
                </th>
                <th scope="col" className="r">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {hyp.map((x) => (
                <tr key={x.nom}>
                  <td>
                    {x.nom}
                    <small>{x.detail}</small>
                  </td>
                  <td className="r">{x.val}</td>
                  <td className="r">
                    <Tag e={x.e} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="note" style={{ margin: 0 }}>
        {`Étude ZHAW ${z.titre} ${z.annee} (n=${z.repondants}) : l'image (${z.imagePct}${NBSP}%) et la notoriété (${z.notorietePct}${NBSP}%) sont les deux premiers objectifs des sponsors en Suisse, devant les ventes (${z.ventesPct}${NBSP}%). L'exposition sert ces deux objectifs. `}
        <Tag e="verifie" /> <Source href={ETUDE_ZHAW.source}>étude ZHAW (PDF)</Source>
      </p>
    </>
  );
}
