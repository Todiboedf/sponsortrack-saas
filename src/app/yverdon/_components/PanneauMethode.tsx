import { CONTENU } from "../_data/contenu";
import { chf, chrono, dateCh, duree, entier, heures } from "../_data/format";
import {
  CONTROLE_ACCORD_PCT,
  CONTROLE_SECONDES,
  CRENEAU_LECTURE_S,
  DIFFUSEUR,
  DUREE_FICHIER_DIFFUSION_S,
  FICHE_HYPOTHESES_DATE,
  IMAGES_LUES_A_L_OEIL,
  LECTURE_HORS_JEU_AVANT_COUP_ENVOI_S,
  PASSAGE_MIN_S,
  PRECISION_DUREES_PCT,
  TOLERANCE_HORS_CHAMP_S,
} from "../_data/regles";
import type { VueSponsor } from "../_data/sponsor";
import { NBSP } from "./communs";
import { Tag } from "./Etiquette";

/** Onglet 5 : méthode. */
export function PanneauMethode({ vue }: { vue: VueSponsor }) {
  const c = CONTENU[vue.cle];
  const h = vue.hypotheses;
  const ex = vue.exposition;
  const vb = vue.valeur.base.match;
  const vo = vue.valeur.optimiste.match;
  const diffusionLue = vue.match.diffusionS;
  const apresCoupDeSifflet = diffusionLue - vue.bornes.fin_match;

  const points = [
    `Sur les ${heures(DUREE_FICHIER_DIFFUSION_S.valeur)} de la diffusion ${DIFFUSEUR.valeur} du match, ${Math.floor(diffusionLue / 60)}${NBSP}minutes sont lues seconde par seconde, de l'avant-match jusqu'à ${apresCoupDeSifflet}${NBSP}s après le coup de sifflet final.`,
    `Les bornes du jeu sont calées sur le chronomètre du stade : coup d'envoi à ${chrono(vue.bornes.coup_envoi)} de diffusion, mi-temps à ${chrono(vue.bornes.fin_1re_mi_temps)}, reprise à ${chrono(vue.bornes.reprise)}, coup de sifflet final à ${chrono(vue.bornes.fin_match)}.`,
    `Pendant le jeu, le détecteur ne lit pas encore le bandeau de la caméra principale, trop petit à l'image : il a été lu à l'œil sur ${IMAGES_LUES_A_L_OEIL.valeur} images réparties sur chaque créneau de ${CRENEAU_LECTURE_S.valeur}${NBSP}secondes, puis chaque seconde a été rattachée à l'image lue la plus ressemblante.`,
    `Contrôle sur ${CONTROLE_SECONDES.valeur} secondes tirées au hasard : ${CONTROLE_ACCORD_PCT.valeur}${NBSP}% d'accord. Précision des durées par marque : environ ${PRECISION_DUREES_PCT.valeur}${NBSP}%.`,
    `Une seconde compte si le bandeau est dans le champ, lisible ou non. Un passage est une rotation de la création : il compte dès ${PASSAGE_MIN_S.valeur}${NBSP}secondes visibles, une sortie de champ de ${TOLERANCE_HORS_CHAMP_S.valeur}${NBSP}secondes ou moins ne le coupe pas, la mi-temps le coupe.`,
    `Hors jeu (échauffement, mi-temps, fin), les durées viennent du détecteur Sponsorlens, en développement, réentraîné sur ce match, et d'une lecture à l'œil des ${LECTURE_HORS_JEU_AVANT_COUP_ENVOI_S.valeur}${NBSP}secondes qui précèdent le coup d'envoi. Une création que ce détecteur ne connaît pas n'est pas mesurée hors jeu.`,
    `Le plan se lit sur la hauteur du bandeau à l'image${
      ex.parPlanSource === "mesure_hauteurs"
        ? `. Pour ${vue.nom}, classement par apparition : hauteur médiane des détections du détecteur Sponsorlens sur l'extrait de chaque apparition, appliquée à toutes ses secondes visibles, pas seconde par seconde`
        : ", seconde par seconde"
    }. L'indice de visibilité pondère chaque seconde avant le calcul de la valeur TV.`,
    `Mesuré : temps à l'écran, passages, plans. Vérifié : affluence du match, abonnés des comptes${c.statutVerifie ? ", statut sur la page partenaires du club" : ""}. Hypothèses : audience TV, tarifs, portée sociale, indices de visibilité, et l'affluence de chaque match dans la projection saison.`,
    `Les panneaux fixes se mesurent à part : ${vue.lecteur === "club" ? "le panneau Clean&Co" : "un panneau fixe d'une autre marque"} est à l'image ${duree(vue.jeu.cleanCoJeuS)} pendant le jeu, sur une ligne séparée. Les autres panneaux fixes ne sont pas encore mesurés à part.`,
    `L'affluence est celle du SFL match center, ${entier(h.affluence.base)} spectateurs, lue le ${dateCh(vue.reseaux.releve_le)}. Les hypothèses de valeur viennent de la fiche du ${FICHE_HYPOTHESES_DATE.valeur}, qui utilisait une affluence supposée de ${entier(vue.affluenceFiche.base)} en base et ${entier(vue.affluenceFiche.haut)} en optimiste${
      vue.valeurFiche
        ? ` : elle donnait ${chf(vue.valeurFiche.base)} et ${chf(vue.valeurFiche.optimiste)}, contre ${chf(vb.totalMesure)} et ${chf(vo.totalMesure)} ici. La formule est la même, contrôlée sur ces deux chiffres à chaque mise à jour`
        : ""
    }.`,
    `Valeur : équivalent média, pas prix de marché du contrat. L'audience TV reste une hypothèse tant que le diffuseur ne l'a pas communiquée.`,
  ];

  return (
    <>
      <div className="panel-head">
        <div>
          <h2>Méthode</h2>
          <p className="lede">
            Durées, bornes et contrôles cités ici, d&apos;après le rapport de mesure du match. Chaque chiffre de ce
            tableau de bord porte l&apos;un des trois statuts ci-dessous.
          </p>
        </div>
        <Tag e="mesure" />
      </div>
      <div className="defs">
        <div>
          <Tag e="mesure" />
          <span>lu image par image sur la diffusion, ou compté publication par publication sur la plateforme.</span>
        </div>
        <div>
          <Tag e="verifie" />
          <span>
            repris d&apos;une source externe citée, avec sa date&nbsp;: page partenaires du club, affluence publiée par la
            ligue, nombre d&apos;abonnés affiché.
          </span>
        </div>
        <div>
          <Tag e="hypothese" />
          <span>valeur retenue faute de donnée publiée, écrite avec son chiffre. Remplacée par la mesure dès réception.</span>
        </div>
      </div>
      <div className="card">
        <ol className="method">
          {points.map((p) => (
            <li key={p}>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="note" style={{ margin: 0 }}>{`Données : ${vue.sources.join(", ")}.`}</p>
    </>
  );
}
