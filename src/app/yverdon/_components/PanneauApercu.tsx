import { ArrowRight, Banknote, Share2, Tv } from "lucide-react";

import { CONTENU } from "../_data/contenu";
import { chf, duree, entier, pourcent, rang } from "../_data/format";
import { DIFFUSEUR, PAGE_PARTENAIRES_VERIFIEE_LE } from "../_data/regles";
import type { VueSponsor } from "../_data/sponsor";
import { adversaireDuMatch, NBSP, Video } from "./communs";
import { Tag } from "./Etiquette";
import { CarteAcces } from "./Onglets";
import { resumeReseaux } from "./PanneauReseaux";

/** Onglet 1 : vue d'ensemble. */
export function PanneauApercu({ vue }: { vue: VueSponsor }) {
  const c = CONTENU[vue.cle];
  const m = vue.match;
  const vb = vue.valeur.base;
  const vo = vue.valeur.optimiste;
  const r = resumeReseaux(vue);
  const nbM = vue.jeu.nbMarquesJeu;

  return (
    <>
      <div className="hero">
        <div>
          <div className="eyebrow">Sponsorlens · ce que voit le partenaire · exemple</div>
          <h1>
            {vue.nom}
            <small>× Yverdon Sport FC</small>
          </h1>
          <p className="lede">
            {`Sur ce match, ${vue.nom} a obtenu ${duree(vue.marque.secondes)} d'écran pendant le jeu, l'équivalent de ${chf(vb.match.totalMesure)} de publicité, ${
              r.publications === 0
                ? "et aucune publication du club où votre marque apparaît"
                : `et ${r.publications} publication${r.publications > 1 ? "s" : ""} du club où votre logo est visible`
            }.`}
          </p>
          <div className="meta">
            <span>
              <b>{m.date}</b> à {m.heure}
            </span>
            <span>
              Yverdon Sport FC <b>{m.score}</b> {adversaireDuMatch(vue)}
            </span>
            <span>{`Journée ${m.journee}, ${m.competition}`}</span>
            <span>{m.stade}</span>
            <span>{`Diffusion ${DIFFUSEUR.valeur}`}</span>
          </div>
          {(c.statutVerifie || vue.lecteur === "club") && (
            <div className="statut">
              <strong>{c.statut}</strong>
              {c.statutVerifie ? <Tag e="verifie" /> : <Tag e="attente" />}
              {c.statutVerifie && (
                <span className="mono" style={{ letterSpacing: ".06em" }}>
                  {`page partenaires du club, ${PAGE_PARTENAIRES_VERIFIEE_LE.valeur}`}
                </span>
              )}
              <p>{c.statutDetail}</p>
            </div>
          )}
        </div>
        <Video vue={vue} />
      </div>

      <div className="grid g4 kpis">
        <div className="kpi accent">
          <Tag e="mesure" />
          <div className="v">{duree(vue.marque.secondes)}</div>
          <div className="l">à l&apos;écran pendant le jeu, sur le bandeau LED</div>
        </div>
        <div className="kpi">
          <Tag e="mesure" />
          <div className="v">
            {vue.marque.passages}
            <small>passages</small>
          </div>
          <div className="l">{`rotations de la création, de ${vue.marque.passageMinS} à ${vue.marque.passageMaxS}${NBSP}s chacun`}</div>
        </div>
        <div className="kpi">
          <Tag e="mesure" />
          <div className="v">
            {rang(vue.marque.rang)}
            <small>{`sur ${nbM}`}</small>
          </div>
          <div className="l">
            {`marque du match par temps d'écran pendant le jeu · ${pourcent(vue.marque.secondes, vue.jeu.totalSponsorJeuS)} du temps sponsor`}
          </div>
        </div>
        <div className="kpi">
          <Tag e="hypothese" />
          <div className="v">{chf(vb.match.totalMesure)}</div>
          <div className="l">{`valeur média du match, base · ${chf(vo.match.totalMesure)} en scénario optimiste`}</div>
        </div>
      </div>

      <div className="grid g3">
        <CarteAcces vers="image">
          <div className="top">
            <h3>
              <Tv aria-hidden />
              À l&apos;image
            </h3>
            <ArrowRight aria-hidden className="arrow" />
          </div>
          <div className="big">
            {duree(vue.jeu.bandeauVisibleS)}
            <small>{`de bandeau LED à l'image sur ${duree(vue.jeu.jeuS)} de jeu, partagées entre ${nbM} marques, la ligue et le club`}</small>
          </div>
          <Tag e="mesure" />
          <div className="sub">{`Frise minute par minute, ${vue.marque.passages} passages chronométrés, classement des ${nbM} marques, taille à l'écran.`}</div>
        </CarteAcces>
        <CarteAcces vers="reseaux">
          <div className="top">
            <h3>
              <Share2 aria-hidden />
              Réseaux sociaux
            </h3>
            <ArrowRight aria-hidden className="arrow" />
          </div>
          <div className="big">
            {r.chiffre}
            <small>{r.titre}</small>
          </div>
          <Tag e="mesure" />
          <div className="sub">
            {`${entier(vue.hypotheses.instagram_abonnes)} abonnés Instagram, ${vue.reseaux.match_j09.posts_club.length} publications sur le match, relevé du ${vue.hypotheses.instagram_verifie_le}.`}
          </div>
        </CarteAcces>
        <CarteAcces vers="valeur">
          <div className="top">
            <h3>
              <Banknote aria-hidden />
              Valeur média
            </h3>
            <ArrowRight aria-hidden className="arrow" />
          </div>
          <div className="big">
            {chf(vb.saison.totalMesure)}
            <small>{`sur ${vue.saison.matchs} matchs à domicile au même rythme, base · ${chf(vo.saison.totalMesure)} en optimiste`}</small>
          </div>
          <Tag e="hypothese" />
          <div className="sub">TV, stade et réseaux, la part de l&apos;écran dans votre contrat, et les leviers chiffrés.</div>
        </CarteAcces>
      </div>
    </>
  );
}
