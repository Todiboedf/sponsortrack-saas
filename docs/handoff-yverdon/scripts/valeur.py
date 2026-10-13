#!/usr/bin/env python3
"""
Calcul de la valeur media d'une marque sur un match, avec la formule exacte de la fiche Roseyres
(scenarios base et optimiste ; le scenario bas est calcule mais ne s'affiche pas sur les pages).

Usage :
  python3 valeur.py roseyres                      -> doit redonner 860 (base) et 2561 (optimiste), c'est le test
  python3 valeur.py egokiefer                     -> borne basse : tous les passages en plan large
  python3 valeur.py egokiefer hauteurs_egokiefer.json   -> avec les plans mesures par mesure_hauteurs.py

Formule :
  secondes equivalentes = s_large x 0.30 + s_moyen x 0.60 + s_gros x 1.00
  TV        = equiv / 30 x audience / 1000 x CPM 30 s
  stade     = affluence x passages / 1000 x CPM stade x 0.8
  social organique = abonnes Instagram x part du bandeau dans les contenus (3,6 %) x taux de vue du resume (25 %) / 1000 x CPM social
  social package   = 2 posts x abonnes x portee par post / 1000 x CPM social     (levier, pas une mesure)
  valeur mesuree du match = TV + stade + social organique ; saison = x 18 matchs a domicile
Toutes les hypotheses sont dans data/Roseyres-J09-donnees-et-hypotheses.json (cle "hypotheses") et doivent
etre affichees avec leur statut sur la page (audience TV et affluence = hypotheses, pas des mesures).
"""
import json, sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
DATA = ICI.parent / "data"
H = json.load(open(DATA / "Roseyres-J09-donnees-et-hypotheses.json"))["hypotheses"]
P = json.load(open(DATA / "J09-passages-detail.json"))["marques"]
QI = H["qi"]
SCEN = {"base": "base", "optimiste": "haut", "bas": "bas"}

def valeur(marque, par_plan):
    m = P[marque]
    brut = m["secondes_jeu"]
    passages = m["passages"]
    equiv = par_plan["large"] * QI["large"] + par_plan["moyen"] * QI["moyen"] + par_plan["gros"] * QI["gros"]
    out = {"marque": marque, "secondes_brutes": brut, "passages": passages, "secondes_par_plan": par_plan, "equiv_s": round(equiv, 1)}
    for nom, cle in SCEN.items():
        aud, cpm = H["audience_tv"][cle], H["cpm_tv_30s"][cle]
        tv = equiv / H["duree_passage_s"] * aud / 1000 * cpm
        tv_brut = brut / H["duree_passage_s"] * aud / 1000 * cpm
        aff, cpm_st = H["affluence"][cle], H["cpm_stade"][cle]
        stade = aff * passages / 1000 * cpm_st * H["qi_stade"]
        imp_org = H["instagram_abonnes"] * H["part_bandeau_contenus"] * H["vues_resume_video"]
        soc_org = imp_org / 1000 * H["cpm_social"][cle]
        imp_pack = H["posts_partenaire_par_match"] * H["instagram_abonnes"] * H["portee_post"][cle]
        soc_pack = imp_pack / 1000 * H["cpm_social"][cle]
        total = tv + stade + soc_org
        n = H["matchs_domicile"]
        out[nom] = {
            "match": {"tv": round(tv), "tv_brut_sans_ponderation": round(tv_brut), "stade": round(stade),
                      "social_organique": round(soc_org), "social_package_levier": round(soc_pack),
                      "total_mesure": round(total), "total_avec_package": round(total + soc_pack),
                      "contacts_tv": aud * passages, "contacts_stade": aff * passages,
                      "impressions_social_org": round(imp_org), "impressions_social_package": round(imp_pack)},
            "saison_18_matchs": {"tv": round(tv) * n, "stade": round(stade) * n, "social_organique": round(soc_org) * n,
                                 "total_mesure": round(total) * n, "total_avec_package": round(total + soc_pack) * n},
        }
    return out

if __name__ == "__main__":
    marque = sys.argv[1]
    if len(sys.argv) > 2:
        par_plan = json.load(open(sys.argv[2]))["secondes_par_plan"]
        note = "plans mesures par mesure_hauteurs.py"
    elif marque == "roseyres":
        par_plan = json.load(open(DATA / "Roseyres-J09-donnees-et-hypotheses.json"))["exposition"]["par_plan"]
        note = "plans de la fiche Roseyres"
    else:
        s = P[marque]["secondes_jeu"]
        par_plan = {"large": s, "moyen": 0, "gros": 0}
        note = "BORNE BASSE : hauteurs non mesurees, tout compte en plan large (qi 0.30)"
    r = valeur(marque, par_plan)
    r["note"] = note
    print(json.dumps(r, ensure_ascii=False, indent=1))
    if marque == "roseyres":
        ok = r["base"]["match"]["total_mesure"] == 860 and r["optimiste"]["match"]["total_mesure"] == 2561
        print("TEST ROSEYRES :", "OK, memes chiffres que la fiche" if ok else "ECART avec la fiche, verifier")
