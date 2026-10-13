import { Info } from "lucide-react";

import { CONTENU } from "../_data/contenu";
import {
  chf,
  chrono,
  decimal,
  duree,
  entier,
  heures,
  pourcent,
  rang,
  secondes as fmtSecondes,
  taux,
} from "../_data/format";
import { adversaire, de } from "../_data/marques";
import {
  CONTROLE_ACCORD_PCT,
  CONTROLE_SECONDES,
  CRENEAU_LECTURE_S,
  DEBUT_RELEVE_SOCIAL,
  DIFFUSEUR,
  DUREE_FICHIER_DIFFUSION_S,
  IMAGES_LUES_A_L_OEIL,
  IMAGE_REFERENCE,
  LECTURE_HORS_JEU_AVANT_COUP_ENVOI_S,
  PAGE_PARTENAIRES_VERIFIEE_LE,
  PASSAGE_MIN_S,
  PRECISION_DUREES_PCT,
  SEUIL_GROS_PLAN_PX,
  SEUIL_PLAN_MOYEN_PX,
  TOLERANCE_HORS_CHAMP_S,
} from "../_data/regles";
import type { VueSponsor } from "../_data/sponsor";
import { Frise } from "./Frise";
import { BarrePlans, BarresValeur, BrutEquivalent, Classement } from "./Graphiques";
import { PartExposition } from "./PartExposition";
import { LegendeStatuts, Statut } from "./Statut";

const NBSP = " ";

function Section({
  id,
  numero,
  titre,
  intro,
  children,
}: {
  id: string;
  numero: number;
  titre: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titre`} className="border-t border-yv-rule py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="font-mono text-xs font-medium tabular-nums text-yv-accent">{String(numero).padStart(2, "0")}</p>
        <h2 id={`${id}-titre`} className="mt-1 text-xl font-semibold tracking-tight text-yv-ink sm:text-2xl">
          {titre}
        </h2>
        {intro && <div className="mt-2 max-w-3xl text-[0.9375rem] leading-relaxed text-yv-muted">{intro}</div>}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Tuile({
  chiffre,
  libelle,
  statut,
}: {
  chiffre: React.ReactNode;
  libelle: React.ReactNode;
  statut: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-sm border-t-2 border-yv-accent bg-yv-surface p-4">
      <p className="text-2xl font-bold tracking-tight text-yv-ink tabular-nums sm:text-[1.75rem]">{chiffre}</p>
      <p className="mt-1 flex-1 text-sm leading-snug text-yv-body">{libelle}</p>
      <div className="mt-3">{statut}</div>
    </div>
  );
}

function Ligne({
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

function Note({ children, ton = "neutre" }: { children: React.ReactNode; ton?: "neutre" | "alerte" }) {
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

/** "81 ÷ 30 × 6'000 ÷ 1'000 × 45" : le calcul de la valeur TV, pour qu'un lecteur puisse le refaire. */
function calculTv(secondes: number, dureeSpot: number, audience: number, cpm: number): string {
  const s = Number.isInteger(secondes) ? entier(secondes) : decimal(secondes, 1);
  return `${s}${NBSP}÷${NBSP}${dureeSpot} × ${entier(audience)}${NBSP}÷${NBSP}1'000 × ${cpm}`;
}

export function PageSponsor({ vue }: { vue: VueSponsor }) {
  const c = CONTENU[vue.cle];
  const h = vue.hypotheses;
  const v = vue.valeur;
  const vb = v.base.match;
  const vo = v.optimiste.match;
  const bb = vue.borneBasse;
  const ex = vue.exposition;
  const nbM = vue.jeu.nbMarquesJeu;
  const sommeLignes = (m: typeof vb) => m.tv + m.stade + m.socialOrganique;
  const totalAvantArrondi = sommeLignes(vb) !== vb.totalMesure || sommeLignes(vo) !== vo.totalMesure;
  const packageAvantArrondi = vb.totalAvecPackage !== vb.totalMesure + vb.socialPackage;
  const premiere = vue.classement[0];
  const passagesVideo = vue.video.moments.map((mo) => vue.passages.find((p) => p.chronoDebut === mo.passageDebut));
  const momentsParMiTemps = ([1, 2] as const)
    .map((n) => ({ n, chronos: vue.video.moments.filter((mo) => mo.miTemps === n).map((mo) => mo.passageDebut) }))
    .filter((g) => g.chronos.length > 0);
  const diffusionLue = vue.match.diffusionS;
  const apresCoupDeSifflet = diffusionLue - vue.bornes.fin_match;
  const nomDe = de(vue.nom);
  const panneauxFixesClassement = vue.classement.filter((l) => l.panneauFixe).map((l) => l.nom);

  return (
    <>
      {/* 1. En-tete */}
      <header className="bg-yv-ink text-white">
        <div className="h-1.5 bg-yv-accent" />
        <div className="mx-auto max-w-5xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#8FA6C4]">
            Sponsorlens · ce que voit le partenaire · exemple
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {c.titre} <span className="font-normal text-[#8FA6C4]">×</span>{" "}Yverdon Sport FC
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#D6DEE9] sm:text-lg">
            {`Ce que votre marque a obtenu à l'écran sur ${vue.match.nom}, journée ${vue.match.journee} de ${vue.match.competition}, ce que cette exposition vaut en équivalent média, et ce que donne une saison à domicile au même rythme.`}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-[#8FA6C4]">
            <b className="font-semibold text-[#D6DEE9]">{`${vue.match.date} à ${vue.match.heure}`}</b>
            {` · ${vue.match.score} · ${vue.match.stade} · diffusion ${DIFFUSEUR.valeur} · mesure seconde par seconde, ${duree(vue.jeu.jeuS)} de jeu `}
            <Statut s="mesure" />
          </p>

          <div className="mt-6 flex flex-col gap-2 border-l-2 border-yv-accent pl-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <p className="text-sm text-[#D6DEE9]">
              <span className="text-[#8FA6C4]">{`Statut du partenaire${NBSP}: `}</span>
              <b className="font-semibold text-white">{c.statut}</b>
            </p>
            {c.statutVerifie && (
              <span className="inline-flex items-center gap-2 text-xs text-[#8FA6C4]">
                <Statut s="verifie" />
                {`page partenaires du club, ${PAGE_PARTENAIRES_VERIFIEE_LE.valeur}`}
              </span>
            )}
          </div>
          {c.statutDetail && <p className="mt-2 pl-4 text-sm text-[#C3CEDC]">{c.statutDetail}</p>}

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#8FA6C4]">
            Page exemple, construite par Sponsorlens sur la mesure réelle de ce match. Elle n&apos;est pas validée par
            Yverdon Sport. Elle est mise à jour après chaque match.
          </p>
        </div>
      </header>

      <main id="contenu">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <LegendeStatuts borneBasse={bb} />
        </div>

        {/* 2. Chiffres cles */}
        <Section
          id="chiffres"
          numero={1}
          titre="Les chiffres clés du match"
          intro={
            <p>
              {`Pendant le jeu, le bandeau LED est à l'image ${duree(vue.jeu.bandeauVisibleS)} sur ${duree(vue.jeu.jeuS)}. Ce temps se partage entre ${nbM} marques, la ligue et le club. Une seconde compte quand la caméra montre votre création sur le bandeau. `}
              <Statut s="mesure" />
            </p>
          }
        >
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <Tuile
              chiffre={duree(vue.marque.secondes)}
              libelle="à l'écran pendant le jeu, sur le bandeau LED"
              statut={<Statut s="mesure" />}
            />
            <Tuile
              chiffre={vue.marque.passages}
              libelle={`passages de la création, de ${vue.marque.passageMinS} à ${vue.marque.passageMaxS}${NBSP}s chacun`}
              statut={<Statut s="mesure" />}
            />
            <Tuile
              chiffre={
                <>
                  {rang(vue.marque.rang)}
                  <span className="text-lg font-semibold text-yv-muted">{` sur ${nbM}`}</span>
                </>
              }
              libelle="marque du match par temps d'écran pendant le jeu"
              statut={<Statut s="mesure" />}
            />
            <Tuile
              chiffre={pourcent(vue.marque.secondes, vue.jeu.totalSponsorJeuS)}
              libelle={`du temps sponsor pendant le jeu (${entier(vue.marque.secondes)}${NBSP}s sur ${entier(vue.jeu.totalSponsorJeuS)}${NBSP}s)`}
              statut={<Statut s="mesure" />}
            />
            <div className="col-span-2 lg:col-span-1">
              <Tuile
                chiffre={chf(vb.totalMesure)}
                libelle={`valeur média équivalente du match, base${NBSP}; ${chf(vo.totalMesure)} en scénario optimiste`}
                statut={<Statut s="hypothese" borneBasse={bb} />}
              />
            </div>
          </div>
          {bb && (
            <div className="mt-4">
              <Note ton="alerte">
                <b className="font-semibold text-yv-ink">Borne basse.</b>
                {` La hauteur du bandeau n'est pas encore mesurée sur les passages ${nomDe}. Tous sont comptés en plan large, l'indice de visibilité le plus bas (${decimal(h.qi.large, 2)}). L'audience et les tarifs restent ceux des scénarios base et optimiste. La mesure des hauteurs remplacera cette borne basse.`}
              </Note>
            </div>
          )}
        </Section>

        {/* 3. Preuve video */}
        <Section
          id="video"
          numero={2}
          titre="La preuve à l'image"
          intro={
            <p>
              {`Chaque logo reconnu est encadré, avec la confiance du détecteur en pourcentage. Ce détecteur Sponsorlens est en développement. Pendant le jeu, les durées de cette page ne viennent pas de ces cadres\u00a0: elles sont relevées seconde par seconde (méthode, points 3 et 4).`}
            </p>
          }
        >
            <figure>
              <video
                controls
                playsInline
                preload="metadata"
                poster={vue.video.poster}
                className="aspect-video w-full rounded-sm bg-yv-ink"
              >
                <source src={vue.video.src} type="video/mp4" />
                Votre navigateur ne lit pas cette vidéo.
              </video>
              <figcaption className="mt-3 text-sm leading-relaxed text-yv-muted">
                {vue.video.incrustation
                  ? `Clip de ${vue.video.dureeS}${NBSP}s, ${vue.video.moments[0].miTemps === 1 ? "1re" : "2e"} mi-temps, de ${vue.video.incrustation.debut} à ${vue.video.incrustation.fin}, pendant le passage de ${passagesVideo[0]?.chronoDebut} à ${passagesVideo[0]?.chronoFin}.`
                  : `Extrait de ${vue.video.dureeS}${NBSP}s\u00a0: des moments de ${vue.video.moments.length} passages, ceux qui commencent à ${momentsParMiTemps
                      .map((g) => `${g.chronos.join(" et ")} (${g.n === 1 ? "1re" : "2e"} mi-temps)`)
                      .join(", ")}${
                      vue.video.panneauFixe
                        ? `, puis, à ${vue.video.panneauFixe.chrono}, un gros plan sur le panneau fixe derrière le but`
                        : ""
                    }.`}
                {` ${vue.video.origineCadres}`}
              </figcaption>
            </figure>
        </Section>

        {/* 4. Chronologie */}
        <Section
          id="chronologie"
          numero={3}
          titre="Le match, minute par minute"
          intro={
            <p>
              {`Les deux mi-temps au chrono du tableau d'affichage. Touchez un passage sur la frise ou dans la liste pour voir son chrono, sa durée et son plan. Un passage compte dès ${PASSAGE_MIN_S.valeur}${NBSP}secondes à l'image.`}
            </p>
          }
        >
          <Frise
            nom={vue.nom}
            miTemps={vue.miTemps}
            passages={vue.passages}
            seuilS={PASSAGE_MIN_S.valeur}
            sourcePlans={ex.parPlanSource}
          />
        </Section>

        {/* 5. Exposition detaillee */}
        <Section id="exposition" numero={4} titre="L'exposition en détail">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-yv-ink">Par mi-temps</h3>
                <div className="mt-2">
                  {vue.miTemps.map((m) => (
                    <Ligne
                      key={m.numero}
                      libelle={m.numero === 1 ? "1re mi-temps" : "2e mi-temps"}
                      detail={`${m.passagesComptes} passage${m.passagesComptes > 1 ? "s" : ""}`}
                      valeur={duree(m.secondesMarque)}
                      statut={<Statut s="mesure" />}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-yv-ink">
                  {ex.parPlanSource === "fiche"
                    ? "Par plan, seconde par seconde"
                    : ex.parPlanSource === "mesure_hauteurs"
                      ? "Par plan, passage par passage"
                      : "Par plan"}
                </h3>
                {ex.parPlanSource === "fiche" && (
                  <p className="mt-1 text-sm text-yv-muted">
                    {`Chaque seconde est classée selon la hauteur du bandeau à cette seconde\u00a0: c'est ce classement qui sert à la valeur. Le plan dominant d'un passage, dans la liste plus haut, sert à l'affichage.`}
                  </p>
                )}
                {ex.parPlanSource === "mesure_hauteurs" && (
                  <p className="mt-1 text-sm text-yv-muted">
                    {`Chaque passage est classé selon la hauteur médiane du bandeau sur son extrait\u00a0; toutes ses secondes visibles prennent ce plan. C'est ce classement qui sert à la valeur.`}
                  </p>
                )}
                <p className="mt-2 text-sm text-yv-muted">
                  {`Sur une image ${IMAGE_REFERENCE.valeur}\u00a0: moins de ${SEUIL_PLAN_MOYEN_PX.valeur}${NBSP}px, plan large, le logo se devine\u00a0; de ${SEUIL_PLAN_MOYEN_PX.valeur} à ${SEUIL_GROS_PLAN_PX.valeur - 1}${NBSP}px, plan moyen, il se lit\u00a0; ${SEUIL_GROS_PLAN_PX.valeur}${NBSP}px et plus, gros plan. `}
                  <Statut s="hypothese" />
                  <span className="ml-1 text-xs">seuils&nbsp;: règle Sponsorlens</span>
                </p>
                <div className="mt-3">
                  {ex.parPlan ? (
                    <>
                      <BarrePlans parPlan={ex.parPlan} />
                      <div className="mt-2">
                        <Statut s="mesure" />
                      </div>
                    </>
                  ) : (
                    <Note ton="alerte">
                      {`Pas encore mesuré. En attendant, les ${entier(ex.brutS)}${NBSP}secondes sont comptées en plan large\u00a0: c'est la borne basse.`}
                    </Note>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-yv-ink">Secondes brutes et secondes équivalentes</h3>
                <p className="mt-1 text-sm text-yv-muted">
                  {`Chaque seconde est pondérée par l'indice de visibilité de son plan\u00a0: plan large ${decimal(h.qi.large, 2)}, plan moyen ${decimal(h.qi.moyen, 2)}, gros plan ${decimal(h.qi.gros, 2)} (règle Sponsorlens). C'est le temps équivalent, et non le temps brut, qui entre dans la valeur TV. `}
                  <Statut s="hypothese" />
                </p>
                <div className="mt-3">
                  <BrutEquivalent brut={ex.brutS} equiv={ex.equivS} borneBasse={bb} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-yv-ink">Hors jeu et panneaux fixes, à part</h3>
                <div className="mt-2">
                  <Ligne
                    libelle="Bandeau LED hors jeu (échauffement, mi-temps, fin)"
                    detail={c.horsJeu}
                    valeur={ex.horsJeuMesure ? fmtSecondes(ex.horsJeuS) : "non mesuré"}
                    statut={ex.horsJeuMesure ? <Statut s="mesure" /> : null}
                  />
                  <Ligne
                    libelle={`Panneaux fixes ${vue.nom}`}
                    detail={c.panneauxFixes}
                    valeur="non mesuré"
                    statut={null}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-yv-ink">Face aux autres marques du bandeau</h3>
                <p className="mt-1 text-sm text-yv-muted">
                  {`Temps d'écran pendant le jeu des ${nbM} marques visibles. ${premiere.nom}, qui passe le plus, cumule ${duree(premiere.secondes)}.`}
                </p>
                <div className="mt-4">
                  <Classement lignes={vue.classement} />
                </div>
                <div className="mt-3">
                  <Statut s="mesure" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-yv-muted">
                  Les créations marquées «&nbsp;à confirmer&nbsp;» ne figurent dans aucun document du club&nbsp;: leur nom
                  reste à confirmer par le club.
                </p>
                {panneauxFixesClassement.length > 0 && (
                  <p className="mt-1 text-xs leading-relaxed text-yv-muted">
                    {`${panneauxFixesClassement.join(" et ")}${NBSP}: panneaux fixes, comptés seulement quand ils occupent la zone du bandeau. Mesure propre au prochain match.`}
                  </p>
                )}
              </div>

              {vue.resumes && (
                <div>
                  <h3 className="text-sm font-semibold text-yv-ink">Avant ce match&nbsp;: les résumés de septembre</h3>
                  <p className="mt-1 text-sm text-yv-muted">
                    {`Présence ${nomDe} sur les résumés diffusés de ${vue.resumes.matchs.length} matchs. Mesure sur les résumés, avec le modèle de septembre\u00a0: à lire à part, jamais à additionner au match complet ci-dessus.`}
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[18rem] text-sm">
                      <caption className="sr-only">{`Présence ${nomDe} sur les résumés de septembre`}</caption>
                      <thead>
                        <tr className="border-b border-yv-ink/80 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-yv-muted">
                          <th scope="col" className="py-2 pr-2">Journée</th>
                          <th scope="col" className="py-2 pr-2 text-right">À l&apos;écran</th>
                          <th scope="col" className="py-2 text-right">Part de voix</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vue.resumes.matchs.map((m) => (
                          <tr key={m.journee} className="border-b border-yv-rule">
                            <td className="py-1.5 pr-2">{`J${m.journee}, ${adversaire(m.adversaire)}`}</td>
                            <td className="py-1.5 pr-2 text-right tabular-nums">
                              {`${decimal(m.egokiefer_s, 1)}${NBSP}s`}
                            </td>
                            <td className="py-1.5 text-right tabular-nums">
                              {`${decimal(m.egokiefer_part_voix_pct, 1)}${NBSP}%`}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="py-1.5 pr-2 font-semibold text-yv-ink">
                            {`${vue.resumes.matchs.length} résumés`}
                          </td>
                          <td className="py-1.5 pr-2 text-right font-semibold tabular-nums text-yv-ink">
                            {`${decimal(vue.resumes.total_4_resumes.egokiefer_s, 1)}${NBSP}s`}
                          </td>
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2">
                    <Statut s="mesure" />
                    <span className="ml-2 text-xs text-yv-muted">
                      part de voix&nbsp;: part du temps sponsor mesuré sur chaque résumé
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* 6. Valeur media */}
        <Section
          id="valeur"
          numero={5}
          titre="La valeur média"
          intro={
            <p>
              Ce qu&apos;il aurait fallu acheter en publicité classique pour obtenir le même nombre de contacts avec le
              même temps de présence, canal par canal. Deux scénarios&nbsp;: «&nbsp;base&nbsp;» est l&apos;estimation
              retenue, «&nbsp;optimiste&nbsp;» ce que donnent une audience et des tarifs dans le haut de la fourchette.
              Les chiffres d&apos;audience du club ou du diffuseur remplacent les hypothèses dès réception.
            </p>
          }
        >
          <div className="rounded-sm border-l-2 border-yv-data bg-yv-surface px-4 py-4 sm:px-6">
            <p className="text-sm font-semibold text-yv-ink sm:text-base">
              {`Valeur TV = secondes équivalentes ÷ ${h.duree_passage_s}${NBSP}s × audience ÷ 1'000 × tarif pour 1'000 contacts et ${h.duree_passage_s}${NBSP}s`}
            </p>
            <p className="mt-2 text-sm text-yv-muted">
              Stade = affluence × passages ÷ 1&apos;000 × tarif affichage × visibilité au stade. Réseaux sociaux =
              impressions ÷ 1&apos;000 × tarif social. Valeur du match = TV + stade + réseaux sociaux organiques.
            </p>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <BarresValeur
                scenarios={[
                  { nom: "Base", valeur: vb },
                  { nom: "Optimiste", valeur: vo },
                ]}
              />
              <div className="mt-3">
                <Statut s="hypothese" borneBasse={bb} />
              </div>
            </div>

            <div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[19rem] text-sm">
                  <caption className="sr-only">Valeur média équivalente du match, par canal</caption>
                  <thead>
                    <tr className="border-b border-yv-ink/80 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-yv-muted">
                      <th scope="col" className="py-2 pr-2">Canal</th>
                      <th scope="col" className="py-2 pr-2 text-right">Base</th>
                      <th scope="col" className="py-2 text-right">Optimiste</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-yv-rule align-top">
                      <th scope="row" className="py-2 pr-2 text-left font-normal">
                        <span className="font-medium text-yv-ink">{`TV et streaming (${DIFFUSEUR.valeur})`}</span>
                        <span className="block text-xs text-yv-muted">
                          {`${fmtSecondes(ex.equivS)} équivalentes (${duree(ex.brutS)} brut)`}
                        </span>
                      </th>
                      <td className="py-2 pr-2 text-right font-semibold tabular-nums text-yv-ink">{chf(vb.tv)}</td>
                      <td className="py-2 text-right tabular-nums">{chf(vo.tv)}</td>
                    </tr>
                    <tr className="border-b border-yv-rule align-top">
                      <th scope="row" className="py-2 pr-2 text-left font-normal">
                        <span className="font-medium text-yv-ink">Stade</span>
                        <span className="block text-xs text-yv-muted">
                          {`${v.passages} passages vus par le public présent`}
                        </span>
                      </th>
                      <td className="py-2 pr-2 text-right font-semibold tabular-nums text-yv-ink">{chf(vb.stade)}</td>
                      <td className="py-2 text-right tabular-nums">{chf(vo.stade)}</td>
                    </tr>
                    <tr className="border-b border-yv-rule align-top">
                      <th scope="row" className="py-2 pr-2 text-left font-normal">
                        <span className="font-medium text-yv-ink">Réseaux sociaux, organique</span>
                        <span className="block text-xs text-yv-muted">bandeau en arrière-plan des vidéos du club</span>
                      </th>
                      <td className="py-2 pr-2 text-right font-semibold tabular-nums text-yv-ink">
                        {chf(vb.socialOrganique)}
                      </td>
                      <td className="py-2 text-right tabular-nums">{chf(vo.socialOrganique)}</td>
                    </tr>
                    <tr className="border-b-2 border-yv-ink">
                      <th scope="row" className="py-2 pr-2 text-left font-semibold text-yv-ink">
                        Valeur média du match
                      </th>
                      <td className="py-2 pr-2 text-right font-bold tabular-nums text-yv-ink">
                        {chf(vb.totalMesure)}
                      </td>
                      <td className="py-2 text-right font-bold tabular-nums text-yv-ink">{chf(vo.totalMesure)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 space-y-1 text-xs text-yv-muted">
                {bb ? (
                  <>
                    <p className="flex flex-wrap items-center gap-2">
                      <span>{"TV et streaming, valeur du match\u00a0:"}</span>
                      <Statut s="hypothese" borneBasse />
                    </p>
                    <p className="flex flex-wrap items-center gap-2">
                      <span>{"stade et réseaux sociaux, qui ne dépendent pas du plan\u00a0:"}</span>
                      <Statut s="hypothese" />
                    </p>
                  </>
                ) : (
                  <Statut s="hypothese" />
                )}
                {totalAvantArrondi && <p>Le total est calculé avant l&apos;arrondi de chaque ligne au franc.</p>}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Note>
              <b className="font-semibold text-yv-ink">Ce qu&apos;aurait coûté une campagne TV classique.</b>
              {` Des spots de ${h.duree_passage_s}${NBSP}s au tarif de ${chf(h.cpm_tv_30s.base)} pour 1'000 contacts, devant ${entier(h.audience_tv.base)} téléspectateurs.`}
              <ul className="mt-2 space-y-2">
                <li>
                  {`Vos ${fmtSecondes(ex.equivS)} équivalentes\u00a0: ${calculTv(ex.equivS, h.duree_passage_s, h.audience_tv.base, h.cpm_tv_30s.base)} = ${chf(vb.tv)} `}
                  <Statut s="hypothese" borneBasse={bb} />
                </li>
                <li>
                  {`Sans pondération de lisibilité, les ${fmtSecondes(ex.brutS)} brutes\u00a0: ${calculTv(ex.brutS, h.duree_passage_s, h.audience_tv.base, h.cpm_tv_30s.base)} = ${chf(vb.tvBrut)} `}
                  <Statut s="hypothese" />
                </li>
                <li>
                  {`Contacts en base\u00a0: ${entier(vb.contactsTv)} à la TV (${entier(h.audience_tv.base)} téléspectateurs × ${v.passages} passages), ${entier(vb.contactsStade)} au stade `}
                  <Statut s="hypothese" />
                </li>
              </ul>
            </Note>
          </div>

          <h3 className="mt-10 text-base font-semibold text-yv-ink">Hypothèses, et ce qui est mesuré</h3>
          <div className="mt-2">
            <Ligne
              libelle="Temps à l'écran, passages"
              detail="lus image par image sur la diffusion"
              valeur={`${duree(ex.brutS)}, ${v.passages} passages`}
              statut={<Statut s="mesure" />}
            />
            <Ligne
              libelle="Taille du bandeau à l'image"
              detail={
                ex.parPlanSource === "fiche"
                  ? "plan large, plan moyen, gros plan, seconde par seconde"
                  : ex.parPlanSource === "mesure_hauteurs"
                    ? "plan large, plan moyen, gros plan, passage par passage"
                    : "pas encore mesurée\u00a0: tout compte en plan large"
              }
              valeur={
                ex.parPlan
                  ? `${duree(ex.parPlan.large)} · ${duree(ex.parPlan.moyen)} · ${duree(ex.parPlan.gros)}`
                  : "non mesurée"
              }
              statut={ex.parPlan ? <Statut s="mesure" /> : <Statut s="hypothese" borneBasse />}
            />
            <Ligne
              libelle="Indice de visibilité"
              detail="règle Sponsorlens, selon la hauteur du bandeau à l'écran"
              valeur={`${decimal(h.qi.large, 2)} · ${decimal(h.qi.moyen, 2)} · ${decimal(h.qi.gros, 2)}`}
              statut={<Statut s="hypothese" />}
            />
            <Ligne
              libelle="Audience TV et streaming"
              detail={"le diffuseur ne publie pas ce chiffre\u00a0; base, puis optimiste"}
              valeur={`${entier(h.audience_tv.base)} · ${entier(h.audience_tv.haut)}`}
              statut={<Statut s="hypothese" />}
            />
            <Ligne
              libelle="Tarif TV"
              detail={`pour 1'000 contacts et ${h.duree_passage_s}\u00a0secondes\u00a0; base, puis optimiste`}
              valeur={`${chf(h.cpm_tv_30s.base)} · ${chf(h.cpm_tv_30s.haut)}`}
              statut={<Statut s="hypothese" />}
            />
            <Ligne
              libelle="Affluence au stade"
              detail={"à confirmer par le club\u00a0; base, puis optimiste"}
              valeur={`${entier(h.affluence.base)} · ${entier(h.affluence.haut)}`}
              statut={<Statut s="hypothese" />}
            />
            <Ligne
              libelle="Visibilité au stade"
              detail="part du public qui voit le bandeau à chaque passage"
              valeur={decimal(h.qi_stade, 1)}
              statut={<Statut s="hypothese" />}
            />
            <Ligne
              libelle="Tarif affichage"
              detail={"pour 1'000 contacts\u00a0; base, puis optimiste"}
              valeur={`${chf(h.cpm_stade.base)} · ${chf(h.cpm_stade.haut)}`}
              statut={<Statut s="hypothese" />}
            />
            <Ligne
              libelle="Audience Instagram du club"
              detail={`@yverdonsport, relevé le ${h.instagram_verifie_le}\u00a0; Facebook, TikTok, LinkedIn non comptés`}
              valeur={`${entier(h.instagram_abonnes)} abonnés`}
              statut={<Statut s="verifie" />}
            />
            <Ligne
              libelle="Réseaux sociaux, organique"
              detail="part du bandeau dans les contenus vidéo du club, puis part des abonnés qui voient le résumé"
              valeur={`${taux(h.part_bandeau_contenus, 1)} · ${taux(h.vues_resume_video)}`}
              statut={<Statut s="hypothese" />}
            />
            <Ligne
              libelle="Tarif social"
              detail={"pour 1'000 impressions\u00a0; base, puis optimiste"}
              valeur={`${chf(h.cpm_social.base)} · ${chf(h.cpm_social.haut)}`}
              statut={<Statut s="hypothese" />}
            />
          </div>

          <h3 className="mt-10 text-base font-semibold text-yv-ink">Projection sur la saison à domicile</h3>
          <p className="mt-1 max-w-3xl text-sm text-yv-muted">
            {`${vue.saison.matchs} matchs à domicile au rythme mesuré sur cette journée\u00a0: même exposition, mêmes hypothèses. La projection ne remplace pas la mesure de chaque match.`}
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[19rem] text-sm">
              <caption className="sr-only">Projection sur la saison à domicile</caption>
              <thead>
                <tr className="border-b border-yv-ink/80 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-yv-muted">
                  <th scope="col" className="py-2 pr-2">{`Sur ${vue.saison.matchs} matchs`}</th>
                  <th scope="col" className="py-2 pr-2 text-right">Base</th>
                  <th scope="col" className="py-2 text-right">Optimiste</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-yv-rule">
                  <th scope="row" className="py-2 pr-2 text-left font-normal">
                    {`${vue.nom} à l'écran pendant le jeu`}
                  </th>
                  <td colSpan={2} className="py-2 text-right tabular-nums">
                    {duree(vue.saison.expositionS)}
                  </td>
                </tr>
                <tr className="border-b border-yv-rule">
                  <th scope="row" className="py-2 pr-2 text-left font-normal">Passages</th>
                  <td colSpan={2} className="py-2 text-right tabular-nums">
                    {entier(vue.saison.passages)}
                  </td>
                </tr>
                <tr className="border-b border-yv-rule">
                  <th scope="row" className="py-2 pr-2 text-left font-normal">Contacts TV</th>
                  <td className="py-2 pr-2 text-right tabular-nums">{entier(vb.contactsTv * vue.saison.matchs)}</td>
                  <td className="py-2 text-right tabular-nums">{entier(vo.contactsTv * vue.saison.matchs)}</td>
                </tr>
                <tr className="border-b border-yv-rule">
                  <th scope="row" className="py-2 pr-2 text-left font-normal">Contacts au stade</th>
                  <td className="py-2 pr-2 text-right tabular-nums">{entier(vb.contactsStade * vue.saison.matchs)}</td>
                  <td className="py-2 text-right tabular-nums">{entier(vo.contactsStade * vue.saison.matchs)}</td>
                </tr>
                <tr className="border-b-2 border-yv-ink">
                  <th scope="row" className="py-2 pr-2 text-left font-semibold text-yv-ink">
                    Valeur média, saison à domicile
                  </th>
                  <td className="py-2 pr-2 text-right font-bold tabular-nums text-yv-ink">
                    {chf(v.base.saison.totalMesure)}
                  </td>
                  <td className="py-2 text-right font-bold tabular-nums text-yv-ink">
                    {chf(v.optimiste.saison.totalMesure)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 space-y-1 text-xs text-yv-muted">
            <p className="flex flex-wrap items-center gap-2">
              <Statut s="hypothese" />
              <span>temps, passages et contacts&nbsp;: même rythme à chaque match, audience et affluence supposées</span>
            </p>
            <p className="flex flex-wrap items-center gap-2">
              <Statut s="hypothese" borneBasse={bb} />
              <span>valeur de la saison</span>
            </p>
          </div>
        </Section>

        {/* 7. Reseaux sociaux */}
        <Section
          id="reseaux"
          numero={6}
          titre="Les réseaux sociaux"
          intro={
            <p>
              {`Ce qui compte ici\u00a0: les publications du club qui citent ou montrent ${vue.nom}, avec leurs vues, likes et commentaires lus sur chaque plateforme. Tant que ce relevé n'est pas fait, rien ne s'affiche à sa place.`}
            </p>
          }
        >
          <Ligne
            libelle={`Publications du club citant ou montrant la marque, depuis ${DEBUT_RELEVE_SOCIAL.valeur}`}
            detail="Instagram, Facebook, LinkedIn, X, TikTok, YouTube du club, et les comptes de la marque"
            valeur="relevé à faire"
            statut={null}
          />
          <Ligne
            libelle={`Résumé vidéo du match du ${vue.match.date}`}
            detail="publication, vues et présence du bandeau à l'image"
            valeur="relevé à faire"
            statut={null}
          />
          <Ligne
            libelle="Audience Instagram du club"
            detail={`@yverdonsport, relevé le ${h.instagram_verifie_le}`}
            valeur={`${entier(h.instagram_abonnes)} abonnés`}
            statut={<Statut s="verifie" />}
          />
          <Ligne
            libelle="Exposition organique estimée"
            detail={`abonnés × ${taux(h.part_bandeau_contenus, 1)} de contenus avec le bandeau × ${taux(h.vues_resume_video)} de vues du résumé`}
            valeur={`${entier(vb.impressionsSocialOrg)} impressions, ${chf(vb.socialOrganique)}`}
            statut={<Statut s="hypothese" />}
          />
          <Ligne
            libelle={`Package social\u00a0: ${h.posts_partenaire_par_match} publications dédiées par match`}
            detail={`portée de ${taux(h.portee_post.base)} des abonnés par publication en base, ${taux(h.portee_post.haut)} en optimiste`}
            valeur={`${entier(vb.impressionsSocialPackage)} impressions, ${chf(vb.socialPackage)}\u00a0; optimiste ${chf(vo.socialPackage)}`}
            statut={<Statut s="hypothese" levier />}
          />
          <p className="mt-3 text-xs text-yv-muted">
            {`Le package social n'est pas une mesure\u00a0: c'est ce que donneraient ${h.posts_partenaire_par_match} publications «${NBSP}partenaire du match${NBSP}» si le club les publiait. Il n'entre pas dans la valeur du match.`}
          </p>
        </Section>

        {/* 8. Part exposition */}
        <Section
          id="part"
          numero={7}
          titre="La part de l'écran dans votre partenariat"
          intro={
            <p>
              {`Un partenariat, c'est aussi le réseau, l'hospitalité et l'image du club\u00a0: rien de cela ne se mesure ici. Cette page donne la valeur média de l'écran, calculée sur le temps d'écran mesuré pendant ce match, puis projetée sur la saison. Renseignez votre investissement pour voir la part qu'elle en couvre.`}
            </p>
          }
        >
          <PartExposition
            saisonBase={v.base.saison.totalMesure}
            saisonOptimiste={v.optimiste.saison.totalMesure}
            matchs={vue.saison.matchs}
            borneBasse={bb}
          />
        </Section>

        {/* 9. Leviers */}
        <Section
          id="leviers"
          numero={8}
          titre="Les leviers, chiffrés sur un match"
          intro={<p>Scénario base, même formule et mêmes hypothèses que la valeur ci-dessus.</p>}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {vue.leviers.map((l) => (
              <div key={l.titre} className="flex flex-col rounded-sm border-t-2 border-yv-accent bg-yv-surface p-4">
                <p className="text-2xl font-bold tracking-tight tabular-nums text-yv-ink">{chf(l.valeur)}</p>
                <p className="mt-1 text-sm font-semibold text-yv-ink">{l.titre}</p>
                <p className="mt-1 flex-1 text-sm text-yv-muted">
                  {bb
                    ? `${l.description} Soit ${chf(l.gainChf)} de plus sur la valeur du match.`
                    : `${l.description} Valeur du match +${l.gainPct}${NBSP}%.`}
                </p>
                <div className="mt-3">
                  <Statut s="hypothese" borneBasse={bb} levier />
                </div>
              </div>
            ))}
          </div>
          {packageAvantArrondi && (
            <p className="mt-3 text-xs text-yv-muted">
              {`Publications par match\u00a0: ${chf(vb.totalMesure)} + ${chf(vb.socialPackage)}, total calculé avant l'arrondi de chaque montant au franc.`}
            </p>
          )}
          {vue.cle === "egokiefer" && (
            <div className="mt-4">
              <Note>
                {bb
                  ? `Pas de levier «${NBSP}plus de passages${NBSP}»\u00a0: ${vue.nom} a déjà le plus de passages des marques du bandeau (${vue.marque.passages}). Le levier «${NBSP}création plus lisible${NBSP}» se chiffrera quand la hauteur du bandeau sera mesurée sur ses passages.`
                  : `Pas de levier «${NBSP}plus de passages${NBSP}»\u00a0: ${vue.nom} a déjà le plus de passages des marques du bandeau (${vue.marque.passages}).`}
              </Note>
            </div>
          )}
        </Section>

        {/* 10. Methode */}
        <Section
          id="methode"
          numero={9}
          titre="La méthode"
          intro={
            <p className="flex flex-wrap items-center gap-2">
              <Statut s="mesure" />
              <span>durées, bornes et contrôles cités ici, d&apos;après le rapport de mesure du match.</span>
            </p>
          }
        >
          <ol className="max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-yv-body marker:text-yv-muted">
            <li>
              {`Sur les ${heures(DUREE_FICHIER_DIFFUSION_S.valeur)} de la diffusion ${DIFFUSEUR.valeur} du match, ${Math.floor(diffusionLue / 60)}${NBSP}minutes sont lues seconde par seconde, de l'avant-match jusqu'à ${apresCoupDeSifflet}${NBSP}s après le coup de sifflet final.`}
            </li>
            <li>
              {`Les bornes du jeu sont calées sur le chronomètre du stade\u00a0: coup d'envoi à ${chrono(vue.bornes.coup_envoi)} de diffusion, mi-temps à ${chrono(vue.bornes.fin_1re_mi_temps)}, reprise à ${chrono(vue.bornes.reprise)}, coup de sifflet final à ${chrono(vue.bornes.fin_match)}.`}
            </li>
            <li>
              {`Pendant le jeu, le détecteur ne lit pas encore le bandeau de la caméra principale, trop petit à l'image\u00a0: il a été lu à l'œil sur ${IMAGES_LUES_A_L_OEIL.valeur} images réparties sur chaque créneau de ${CRENEAU_LECTURE_S.valeur}${NBSP}secondes, puis chaque seconde a été rattachée à l'image lue la plus ressemblante.`}
            </li>
            <li>
              {`Contrôle sur ${CONTROLE_SECONDES.valeur}\u00a0secondes tirées au hasard\u00a0: ${CONTROLE_ACCORD_PCT.valeur}${NBSP}% d'accord. Précision des durées par marque\u00a0: environ ${PRECISION_DUREES_PCT.valeur}${NBSP}%.`}
            </li>
            <li>
              {`Une seconde compte si le bandeau est dans le champ, lisible ou non. Un passage est une rotation de la création\u00a0: il compte dès ${PASSAGE_MIN_S.valeur}${NBSP}secondes visibles, une sortie de champ de ${TOLERANCE_HORS_CHAMP_S.valeur}${NBSP}secondes ou moins ne le coupe pas, la mi-temps le coupe.`}
            </li>
            <li>
              {`Hors jeu (échauffement, mi-temps, fin), les durées viennent du détecteur Sponsorlens, en développement, réentraîné sur ce match, et d'une lecture à l'œil des ${LECTURE_HORS_JEU_AVANT_COUP_ENVOI_S.valeur}${NBSP}secondes qui précèdent le coup d'envoi. Une création que ce détecteur ne connaît pas n'est pas mesurée hors jeu.`}
            </li>
            <li>
              Le plan se lit sur la hauteur du bandeau à l&apos;image&nbsp;; l&apos;indice de visibilité pondère chaque
              seconde avant le calcul de la valeur TV.
            </li>
            <li>
              {`Mesuré\u00a0: temps à l'écran, passages${vue.plansMesures ? ", plans" : ""}.${vue.plansMesures ? "" : " Pas encore mesurés\u00a0: les plans, d'où la borne basse."} Vérifié\u00a0: abonnés Instagram${c.statutVerifie ? ", statut sur la page partenaires du club" : ""}. Hypothèses\u00a0: audience TV, affluence, tarifs, portée sociale, indices de visibilité.`}
            </li>
            <li>
              {`Les panneaux fixes se mesurent à part\u00a0: le panneau Clean&Co est à l'image ${duree(vue.jeu.cleanCoJeuS)} pendant le jeu, sur une ligne séparée. Les autres panneaux fixes ne sont pas encore mesurés à part.`}
            </li>
            <li>
              Valeur&nbsp;: équivalent média, pas prix de marché du contrat. Les audiences et l&apos;affluence restent des
              hypothèses tant que le club ou le diffuseur ne les a pas communiquées.
            </li>
          </ol>
        </Section>
      </main>

      <footer className="border-t border-yv-rule bg-yv-surface">
        <div className="mx-auto max-w-5xl px-4 py-8 text-xs leading-relaxed text-yv-muted sm:px-6">
          <p>
            <b className="font-semibold text-yv-ink">Guillaume Haas</b>
            {" · GHaas Management SA · Sponsorlens, mesure de la visibilité et de la valeur des partenariats sportifs."}
          </p>
          <p className="mt-1">{`Données\u00a0: ${vue.sources.join(", ")}.`}</p>
        </div>
      </footer>
    </>
  );
}
