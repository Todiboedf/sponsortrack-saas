import { CONTENU } from "../_data/contenu";
import { chrono, decimal, duree, entier, pourcent, secondes as fmtSecondes } from "../_data/format";
import { adversaire, de } from "../_data/marques";
import {
  IMAGE_REFERENCE,
  PASSAGE_MIN_S,
  SEUIL_GROS_PLAN_PX,
  SEUIL_PLAN_MOYEN_PX,
  TOLERANCE_HORS_CHAMP_S,
} from "../_data/regles";
import type { MiTempsVue, PassageVue, VueSponsor } from "../_data/sponsor";
import type { ParPlan } from "../_data/types";
import { NBSP, nomMiTemps, Video } from "./communs";
import { Tag } from "./Etiquette";
import { FriseMatch, type PisteFrise, type SegmentFrise } from "./FriseMatch";

/** Texte de remplacement, flouté, à la place du nom d'une autre marque : le vrai nom n'est jamais dans le HTML. */
const LIBELLE_FLOU = "Marque du bandeau";

/** Plus de 60 s en minutes (« 2 min 30 »), sinon en secondes (« 50 s »). */
function temps(s: number): string {
  return s >= 60 ? duree(s) : fmtSecondes(s);
}

/** Une mi-temps de la frise : segments, infobulles et graduations toutes les 5 minutes. */
function piste(m: MiTempsVue, nom: string): PisteFrise {
  const segments: SegmentFrise[] = [];
  for (const s of m.segments) {
    if (s.type === "hors_champ") continue;
    if (s.type === "autre") {
      segments.push({ debut: s.debutS, fin: s.finS, type: "autre" });
      continue;
    }
    const deb = chrono(m.chronoDepartS + s.debutS);
    const fin = chrono(m.chronoDepartS + s.finS);
    const n = s.finS - s.debutS;
    segments.push({
      debut: s.debutS,
      fin: s.finS,
      type: "marque",
      tip: `${deb} à ${fin} · ${n}${NBSP}s`,
      aria: `${nom} à l'image de ${deb} à ${fin}, ${n}${NBSP}seconde${n > 1 ? "s" : ""}`,
    });
  }
  const graduations: PisteFrise["graduations"] = [];
  for (let min = 0; min * 60 <= m.dureeS; min += 5) {
    graduations.push({
      pos: ((min * 60) / m.dureeS) * 100,
      texte: `${m.chronoDepartS / 60 + min}'`,
      mineure: min % 15 !== 0,
    });
  }
  return {
    nom: nomMiTemps(m.numero),
    resume: `${m.passagesComptes} passages · ${duree(m.secondesMarque)}`,
    dureeS: m.dureeS,
    segments,
    graduations,
  };
}

function Puce({ p, seuilS }: { p: PassageVue; seuilS: number }) {
  if (!p.compte) {
    return (
      <span className="chip off">
        <b>·</b>
        <span className="num">{`${p.chronoDebut} à ${p.chronoFin}`}</span>
        <span className="plan">{`${fmtSecondes(p.secondesVisibles)}, ne compte pas`}</span>
      </span>
    );
  }
  const plan = p.plan
    ? `${p.plan.libelle}${p.plan.hauteurPx !== null ? `, ${p.plan.hauteurPx}${NBSP}px` : ", aucune détection, compté en plan large"}`
    : "plan pas encore mesuré";
  return (
    <span className="chip">
      <b>{p.numero}</b>
      <span className="num">{`${p.chronoDebut} à ${p.chronoFin}`}</span>
      <span className="plan">{`${fmtSecondes(p.secondesVisibles)} · ${plan}`}</span>
    </span>
  );
}

/** Onglet 2 : à l'image. */
export function PanneauImage({ vue }: { vue: VueSponsor }) {
  const c = CONTENU[vue.cle];
  const ex = vue.exposition;
  const h = vue.hypotheses;
  const nbM = vue.jeu.nbMarquesJeu;
  const seuil = PASSAGE_MIN_S.valeur;
  const parPlan: ParPlan | null = ex.parPlan;
  if (!parPlan) throw new Error(`[yverdon] ${vue.cle} : plans non mesurés, le tableau de bord ne sait pas afficher la borne basse`);
  const totalPlans = parPlan.large + parPlan.moyen + parPlan.gros;
  const parApparition = ex.parPlanSource === "mesure_hauteurs";

  const comptes = vue.passages.filter((p) => p.compte);
  const courts = vue.passages.filter((p) => !p.compte);
  const somme = (xs: PassageVue[]) => xs.reduce((t, x) => t + x.secondesVisibles, 0);
  const pl = courts.length > 1;
  const decompte = `${comptes.length} passages comptés, ${fmtSecondes(somme(comptes))} visibles.${
    courts.length > 0
      ? ` ${courts.length} apparition${pl ? "s" : ""} de moins de ${seuil}${NBSP}s (${fmtSecondes(somme(courts))}) ne compte${pl ? "nt" : ""} pas comme passage${pl ? "s" : ""} mais reste${pl ? "nt" : ""} dans le temps à l'écran. Total : ${fmtSecondes(somme(vue.passages))}.`
      : ""
  } Un passage compte dès ${seuil}${NBSP}secondes à l'image ; une sortie de champ de ${TOLERANCE_HORS_CHAMP_S.valeur}${NBSP}s ou moins ne le coupe pas.`;
  const notePlans = parApparition
    ? `Le plan d'une apparition se lit sur la hauteur médiane des détections du bandeau dans son extrait ; toutes ses secondes visibles prennent ce plan pour la valeur.`
    : `Le plan affiché pour chaque passage est son plan dominant, celui de la plupart de ses secondes : il sert à l'affichage, la valeur utilise le classement seconde par seconde.`;

  const seuils = `moins de ${SEUIL_PLAN_MOYEN_PX.valeur}${NBSP}px, plan large${parApparition ? "" : ", le logo se devine"} ; de ${SEUIL_PLAN_MOYEN_PX.valeur} à ${SEUIL_GROS_PLAN_PX.valeur - 1}${NBSP}px, plan moyen${parApparition ? "" : ", il se lit"} ; ${SEUIL_GROS_PLAN_PX.valeur}${NBSP}px et plus, gros plan.`;
  const noteTaille = parApparition
    ? `Chaque apparition est classée selon la hauteur médiane des détections du bandeau sur son extrait (${IMAGE_REFERENCE.valeur}) : ${seuils} Toutes ses secondes visibles prennent ce plan. Classement par apparition, pas seconde par seconde. Seuils : règle Sponsorlens.`
    : `Chaque seconde est classée selon la hauteur du bandeau à l'image (${IMAGE_REFERENCE.valeur}) : ${seuils} Seuils : règle Sponsorlens.`;

  const maxS = Math.max(...vue.classement.map((l) => l.secondes));
  const premiere = vue.classement[0];
  const panneaux = vue.classement.filter((l) => l.panneauFixe).map((l) => l.nom);

  return (
    <>
      <div className="panel-head">
        <div>
          <h2>À l&apos;image</h2>
          <p className="lede">
            {`Pendant le jeu, le bandeau LED est à l'image ${duree(vue.jeu.bandeauVisibleS)} sur ${duree(vue.jeu.jeuS)}, partagées entre ${nbM} marques, la ligue et le club. Une seconde compte quand la caméra montre votre création sur le bandeau.`}
          </p>
        </div>
        <Tag e="mesure" texte="mesuré seconde par seconde" />
      </div>

      <div className="grid g-5-7">
        <div className="grid g2 kpis" style={{ alignContent: "start" }}>
          <div className="kpi accent">
            <Tag e="mesure" />
            <div className="v">{duree(vue.marque.secondes)}</div>
            <div className="l">à l&apos;écran pendant le jeu</div>
          </div>
          <div className="kpi">
            <Tag e="mesure" />
            <div className="v">{pourcent(vue.marque.secondes, vue.jeu.totalSponsorJeuS)}</div>
            <div className="l">{`${entier(vue.marque.secondes)}${NBSP}s sur ${entier(vue.jeu.totalSponsorJeuS)}${NBSP}s de temps sponsor`}</div>
          </div>
          {vue.miTemps.map((m) => (
            <div key={m.numero} className="kpi">
              <Tag e="mesure" />
              <div className="v">
                {m.passagesComptes}
                <small>passages</small>
              </div>
              <div className="l">{`${nomMiTemps(m.numero)} · ${duree(m.secondesMarque)}`}</div>
            </div>
          ))}
        </div>
        <Video vue={vue} />
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <h3>Le match, minute par minute</h3>
            <p>Les deux mi-temps au chrono du tableau d&apos;affichage. Survolez ou touchez un passage pour lire son chrono.</p>
          </div>
          <Tag e="mesure" />
        </div>
        <FriseMatch pistes={vue.miTemps.map((m) => piste(m, vue.nom))} />
        <div className="legend" style={{ marginTop: 14 }}>
          <span>
            <i style={{ background: "var(--accent)" }} />
            {`${vue.nom} sur le bandeau et à l'image`}
          </span>
          <span>
            <i style={{ background: "rgba(244,239,230,.16)" }} />
            autre marque, ligue, club ou bandeau vide
          </span>
          <span>
            <i style={{ background: "rgba(244,239,230,.05)", border: "1px solid var(--line)" }} />
            bandeau pas à l&apos;image
          </span>
        </div>
        <h3 style={{ marginTop: 22 }}>{`Les ${vue.marque.passages} passages`}</h3>
        <div className="chips" style={{ marginTop: 10 }}>
          {vue.passages.map((p) => (
            <Puce key={p.id} p={p} seuilS={seuil} />
          ))}
        </div>
        <p className="note">{`${decompte} ${notePlans}`}</p>
      </div>

      <div className="grid g-7-5">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>{`Face aux ${nbM} marques du bandeau`}</h3>
              <p>Temps d&apos;écran pendant le jeu, votre marque en couleur.</p>
            </div>
            <Tag e="mesure" />
          </div>
          <ol className="bars" aria-label="Temps d'écran pendant le jeu, par marque" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {vue.classement.map((l) => {
              const precision = [l.precision, l.aConfirmer ? "à confirmer" : null].filter(Boolean).join(", ");
              return (
                <li key={l.cle} className={`bar-row${l.estMarque ? " me" : ""}`}>
                  <span className="rank">{l.rang}</span>
                  <div className="name">
                    {l.anonyme ? (
                      <span>
                        {l.nom}{" "}
                        <span className="flou" aria-hidden>
                          {LIBELLE_FLOU}
                        </span>
                      </span>
                    ) : (
                      <span>
                        {l.nom}
                        {precision && <small>{` ${precision}`}</small>}
                      </span>
                    )}
                    <div className="bar" style={{ width: `${((l.secondes / maxS) * 100).toFixed(1)}%` }} />
                  </div>
                  <span className="val">{duree(l.secondes)}</span>
                </li>
              );
            })}
          </ol>
          <p className="note">
            {vue.lecteur === "sponsor"
              ? `Temps d'écran pendant le jeu des ${nbM} marques visibles sur le bandeau. ${premiere.anonyme ? "La marque qui passe le plus" : `${premiere.nom}, qui passe le plus,`} cumule ${duree(premiere.secondes)}. Les autres marques ne sont pas nommées sur cette page.`
              : `Temps d'écran pendant le jeu des ${nbM} marques visibles sur le bandeau. ${premiere.nom}, qui passe le plus, cumule ${duree(premiere.secondes)}. Les créations «${NBSP}à confirmer${NBSP}» ne figurent dans aucun document du club : leur nom reste à confirmer par le club.${
              panneaux.length > 0
                ? ` ${panneaux.join(" et ")} : panneaux fixes, comptés seulement quand ils occupent la zone du bandeau. Mesure propre au prochain match.`
                : ""
            }`}
          </p>
        </div>

        <div className="grid" style={{ alignContent: "start" }}>
          <div className="card">
            <div className="card-head">
              <div>
                <h3>Taille à l&apos;écran</h3>
                <p>
                  {`Classement ${parApparition ? "par apparition" : "seconde par seconde"}, selon la hauteur du bandeau à l'image. C'est ce classement qui sert à la valeur.`}
                </p>
              </div>
              <Tag e="mesure" />
            </div>
            <div className="stack" aria-hidden>
              <span className="s1" style={{ width: `${((parPlan.large / totalPlans) * 100).toFixed(1)}%` }} />
              <span className="s2" style={{ width: `${((parPlan.moyen / totalPlans) * 100).toFixed(1)}%` }} />
              <span className="s3" style={{ width: `${((parPlan.gros / totalPlans) * 100).toFixed(1)}%` }} />
            </div>
            <div className="legend" style={{ marginTop: 10 }}>
              <span>
                <i style={{ background: "var(--blue-3)" }} />
                plan large <b className="num">{temps(parPlan.large)}</b>
              </span>
              <span>
                <i style={{ background: "var(--blue-2)" }} />
                plan moyen <b className="num">{temps(parPlan.moyen)}</b>
              </span>
              <span>
                <i style={{ background: "var(--blue-1)" }} />
                gros plan <b className="num">{temps(parPlan.gros)}</b>
              </span>
            </div>
            <div className="kv" style={{ marginTop: 14 }}>
              <div>
                <span className="k">À l&apos;écran, brut</span>
                <span className="v">{fmtSecondes(ex.brutS)}</span>
              </div>
              <div>
                <span className="k">
                  Équivalent pleine visibilité
                  <small>{`plan large × ${decimal(h.qi.large, 2)}, plan moyen × ${decimal(h.qi.moyen, 2)}, gros plan × ${decimal(h.qi.gros, 2)}`}</small>
                </span>
                <span className="v">
                  {`${fmtSecondes(ex.equivS)} `}
                  <Tag e="hypothese" />
                </span>
              </div>
            </div>
            <p className="note">
              {`${noteTaille} `}
              <Tag e="hypothese" texte="seuils : hypothèse" />
            </p>
          </div>

          <div className="card">
            <h3>Hors jeu et panneaux fixes, à part</h3>
            <div className="kv" style={{ marginTop: 8 }}>
              <div>
                <span className="k">
                  Bandeau LED hors jeu
                  <small>{c.horsJeu}</small>
                </span>
                <span className="v muted nowrap">
                  {ex.horsJeuMesure ? (
                    <>
                      {`${fmtSecondes(ex.horsJeuS)} `}
                      <Tag e="mesure" />
                    </>
                  ) : (
                    <Tag e="non" />
                  )}
                </span>
              </div>
              <div>
                <span className="k">
                  {`Panneaux fixes ${vue.nom}`}
                  <small>{c.panneauxFixes}</small>
                </span>
                <span className="v muted nowrap">
                  <Tag e="non" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {vue.resumes && (
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Avant ce match, les résumés de septembre</h3>
              <p>
                {`Présence ${de(vue.nom)} sur les résumés diffusés de ${vue.resumes.matchs.length} matchs, mesurée sur les résumés avec le modèle de septembre. À lire à part, jamais à additionner au match complet.`}
              </p>
            </div>
            <Tag e="mesure" />
          </div>
          <div className="tbl">
            <table>
              <caption className="sr">{`Présence ${de(vue.nom)} sur les résumés de septembre`}</caption>
              <thead>
                <tr>
                  <th scope="col">Journée</th>
                  <th scope="col" className="r">
                    À l&apos;écran
                  </th>
                  <th scope="col" className="r">
                    Part de voix
                  </th>
                </tr>
              </thead>
              <tbody>
                {vue.resumes.matchs.map((r) => (
                  <tr key={r.journee}>
                    <td>{`J${r.journee}, ${adversaire(r.adversaire)}`}</td>
                    <td className="r">{`${decimal(r.egokiefer_s, 1)}${NBSP}s`}</td>
                    <td className="r">{`${decimal(r.egokiefer_part_voix_pct, 1)}${NBSP}%`}</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <b>{`${vue.resumes.matchs.length} résumés`}</b>
                  </td>
                  <td className="r">
                    <b>{`${decimal(vue.resumes.total_4_resumes.egokiefer_s, 1)}${NBSP}s`}</b>
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
          <p className="note">Part de voix&nbsp;: part du temps sponsor mesuré sur chaque résumé.</p>
        </div>
      )}
    </>
  );
}
