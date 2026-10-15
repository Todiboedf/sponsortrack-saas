import type { VueClub } from "../_data/club";
import { duree, entier } from "../_data/format";
import { NBSP } from "./communs";
import { Tag } from "./Etiquette";

const COULEUR_PART: Record<VueClub["partage"][number]["cle"], string> = {
  sponsors: "var(--blue-1)",
  ligue: "var(--blue-2)",
  club: "var(--blue-3)",
  vide: "rgba(244,239,230,.16)",
  hors_image: "rgba(244,239,230,.05)",
};

function s(n: number): string {
  return `${entier(n)}${NBSP}s`;
}

/** Vue club : le bandeau du match, toutes marques nommées. Onglet unique, sans valeur média. */
export function PanneauClub({ vue }: { vue: VueClub }) {
  const maxP = Math.max(...vue.passages.map((p) => p.passages));
  const nbStade = vue.marques.length;

  return (
    <>
      <div className="panel-head">
        <div>
          <h2>Le bandeau du match, toutes marques</h2>
          <p className="lede">
            {`Vue club : les ${duree(vue.jeuS)} de jeu lues seconde par seconde, avec le nom de chaque marque. ${vue.nbMarquesJeu} marques passent pendant le jeu, sur ${nbStade} vues dans le stade. Mesure du match, version ${String(vue.versionMesure).replace(".", ",")}.`}
          </p>
        </div>
        <Tag e="mesure" texte="mesuré seconde par seconde" />
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <h3>{`Le partage des ${duree(vue.jeuS)} de jeu`}</h3>
            <p>{`Ce que montre le bandeau LED à chaque seconde de jeu. Il est à l'image ${duree(vue.bandeauVisibleS)}.`}</p>
          </div>
          <Tag e="mesure" />
        </div>
        <div className="stack" aria-hidden style={{ height: 22 }}>
          {vue.partage.map((p) => (
            <span
              key={p.cle}
              style={{
                width: `${((p.secondes / vue.jeuS) * 100).toFixed(2)}%`,
                background: COULEUR_PART[p.cle],
                outline: p.cle === "hors_image" ? "1px solid var(--line)" : undefined,
                outlineOffset: -1,
              }}
            />
          ))}
        </div>
        <div className="kv" style={{ marginTop: 14 }}>
          {vue.partage.map((p) => (
            <div key={p.cle}>
              <span className="k" style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <i
                  aria-hidden
                  style={{
                    width: 14,
                    height: 10,
                    borderRadius: 2,
                    flex: "none",
                    background: COULEUR_PART[p.cle],
                    border: p.cle === "hors_image" ? "1px solid var(--line)" : undefined,
                  }}
                />
                <span>
                  {p.libelle}
                  <small>{p.detail}</small>
                </span>
              </span>
              <span className="v" style={{ display: "grid", justifyItems: "end", gap: 4 }}>
                <span className="nowrap">{`${duree(p.secondes)} · ${s(p.secondes)}`}</span>
                <Tag e="mesure" />
              </span>
            </div>
          ))}
        </div>
        <p className="note">
          {`Bandeau à l'image : sponsors, ligue, club et bandeau vide, ${s(vue.bandeauVisibleS)}. Avec le temps où le bandeau n'est pas à l'image, ${s(vue.jeuS)}, soit tout le jeu.`}
        </p>
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <h3>{`Les ${nbStade} marques vues dans le stade`}</h3>
            <p>
              Pendant le jeu, lu seconde par seconde ; hors jeu (échauffement, mi-temps, fin), mesuré par le détecteur
              Sponsorlens, en développement, en plancher. Une création que ce détecteur ne connaît pas n&apos;est pas
              mesurée hors jeu.
            </p>
          </div>
          <Tag e="mesure" />
        </div>
        <div className="tbl club">
          <table>
            <caption className="sr">Temps à l&apos;image et passages de chaque marque</caption>
            <thead>
              <tr>
                <th scope="col">Marque</th>
                <th scope="col" className="r">
                  Jeu
                </th>
                <th scope="col" className="r">
                  Hors jeu
                </th>
                <th scope="col" className="r">
                  Pass.
                </th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {vue.marques.map((x) => {
                const note = [x.precision, x.aConfirmer ? "à confirmer" : null].filter(Boolean).join(", ");
                return (
                  <tr key={x.cle}>
                    <td>
                      {x.nom}
                      {note && <small>{note}</small>}
                    </td>
                    <td className="r">{s(x.jeuS)}</td>
                    <td className="r">{x.horsJeuS === null ? <Tag e="non" /> : s(x.horsJeuS)}</td>
                    <td className="r">{x.passages}</td>
                    <td>{x.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="note">
          {`« Pass. » : passages pendant le jeu, une rotation de la création comptée dès 8${NBSP}secondes à l'image. Les panneaux fixes sont comptés seulement quand ils occupent la zone du bandeau ; leur mesure propre vient au prochain match. Les créations «${NBSP}à confirmer${NBSP}» ne figurent dans aucun document du club.`}
        </p>
      </div>

      <div className="grid g-7-5">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Passages pendant le jeu</h3>
              <p>Rotations de chaque création sur le bandeau, ligue et club compris.</p>
            </div>
            <Tag e="mesure" />
          </div>
          <ol className="bars" style={{ margin: 0, padding: 0, listStyle: "none" }} aria-label="Passages pendant le jeu, par marque">
            {vue.passages.map((p, i) => (
              <li key={p.cle} className="bar-row">
                <span className="rank">{i + 1}</span>
                <div className="name">
                  <span>
                    {p.nom}
                    {p.groupe !== "marque" && <small>{` ${p.groupe}`}</small>}
                  </span>
                  <div
                    className="bar"
                    style={{
                      width: `${((p.passages / maxP) * 100).toFixed(1)}%`,
                      background: p.groupe === "marque" ? undefined : "rgba(244,239,230,.28)",
                    }}
                  />
                </div>
                <span className="val">{p.passages}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid" style={{ alignContent: "start" }}>
          <div className="card">
            <div className="card-head">
              <div>
                <h3>La ligue et le club, à part</h3>
                <p>Habillage central de la ligue et auto-promotion du club, pendant le jeu.</p>
              </div>
              <Tag e="mesure" />
            </div>
            <div className="kv">
              {vue.ligue.map((l) => (
                <div key={l.cle}>
                  <span className="k">
                    {l.nom}
                    <small>{`${l.groupe}${l.passages !== null ? `, ${l.passages} passages` : ""}`}</small>
                  </span>
                  <span className="v nowrap">{s(l.jeuS)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="big-fact">
            <div className="n lime">{entier(vue.cleanCo.jeuS)}</div>
            <div>
              <h3>secondes du panneau fixe Clean&amp;Co pendant le jeu, à part</h3>
              <p>
                {`${duree(vue.cleanCo.jeuS)} à l'image, en ${vue.cleanCo.sequences} séquences d'au moins 8${NBSP}secondes, plus ${s(vue.cleanCo.horsJeuS)} hors jeu. Panneau imprimé sur la clôture, mesuré à part du bandeau.`}
              </p>
              <Tag e="mesure" />
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <h3>{`${vue.aZero.length} créations à zéro seconde pendant le jeu`}</h3>
                <p>Diffusées seulement avant le coup d&apos;envoi, à la mi-temps ou après le match.</p>
              </div>
              <Tag e="mesure" />
            </div>
            <div className="chips">
              {vue.aZero.map((x) => (
                <span key={x.cle} className="chip">
                  <span>{x.nom}</span>
                  <span className="plan">{x.horsJeuS === null ? "hors jeu non mesuré" : `${s(x.horsJeuS)} hors jeu`}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
