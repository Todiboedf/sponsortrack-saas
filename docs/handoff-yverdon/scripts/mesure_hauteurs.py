#!/usr/bin/env python3
"""
Mesure la hauteur du bandeau (en pixels, image 1280x720) sur les extraits d'une marque,
pour classer chaque passage en plan large / moyen / gros et calculer les secondes equivalentes.

Usage :
  pip install ultralytics opencv-python   (une fois)
  python3 mesure_hauteurs.py egokiefer  /chemin/vers/passages_egokiefer  ../modele/best_v3.pt  [conf=0.25]

Sortie : hauteurs_<marque>.json a cote des extraits :
  { "marque": ..., "passages": [ {"clip": "egokiefer_p01.mp4", "n_detections": 31, "hauteur_mediane_px": 27,
                                   "plan": "moyen", "conf_moyenne": 0.71}, ... ],
    "secondes_par_plan": {"large": ..., "moyen": ..., "gros": ...} }

Regle (identique a la fiche Roseyres) : hauteur de la boite < 24 px = plan large (qi 0.30),
24 a 59 px = plan moyen (qi 0.60), 60 px et plus = gros plan (qi 1.00).
Les secondes visibles de chaque passage viennent de data/J09-passages-detail.json ; ce script ne
fait que leur attribuer un plan. secondes_par_plan additionne toutes les apparitions, comptees comme
passage ou non, pour retrouver le temps a l'ecran complet (EgoKiefer : 463 s). Sans detection sur un extrait, le passage est compte en plan large
(l'hypothese la plus basse), jamais plus haut.
"""
import json, sys, statistics
from pathlib import Path

import cv2
from ultralytics import YOLO

marque = sys.argv[1]
dossier = Path(sys.argv[2])
poids = sys.argv[3]
conf_min = float(sys.argv[4]) if len(sys.argv) > 4 else 0.25

model = YOLO(poids)
noms = {i: n for i, n in model.names.items()}
print("classes du modele :", noms)
cibles = [i for i, n in noms.items() if marque.lower() in n.lower()]
if not cibles:
    sys.exit(f"aucune classe du modele ne contient '{marque}' ; choisis un nom dans la liste ci-dessus")
print("classe(s) cible(s) :", {i: noms[i] for i in cibles})

detail = json.load(open(Path(__file__).resolve().parent.parent / "data" / "J09-passages-detail.json"))
passages = detail["marques"][marque]["detail"]

def plan(h):
    return "large" if h < 24 else ("moyen" if h < 60 else "gros")

resultats = []
clips = sorted(dossier.glob(f"{marque}_p*.mp4"))
for k, clip in enumerate(clips):
    cap = cv2.VideoCapture(str(clip))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    pas = max(1, int(round(fps)))          # une image par seconde
    hauteurs, confs = [], []
    i = 0
    while True:
        ok, img = cap.read()
        if not ok:
            break
        if i % pas == 0:
            if img.shape[1] != 1280:
                img = cv2.resize(img, (1280, int(img.shape[0] * 1280 / img.shape[1])))
            r = model.predict(img, imgsz=832, conf=conf_min, verbose=False)[0]
            for b in r.boxes:
                if int(b.cls) in cibles:
                    x0, y0, x1, y1 = b.xyxy[0].tolist()
                    hauteurs.append(y1 - y0)
                    confs.append(float(b.conf))
        i += 1
    cap.release()
    p = passages[k] if k < len(passages) else {}
    h_med = round(statistics.median(hauteurs)) if hauteurs else None
    resultats.append({
        "clip": clip.name,
        "chrono": f"{p.get('chrono_debut','?')}-{p.get('chrono_fin','?')}",
        "secondes_visibles": p.get("secondes_visibles"),
        "compte": p.get("compte"),
        "n_detections": len(hauteurs),
        "hauteur_mediane_px": h_med,
        "plan": plan(h_med) if h_med is not None else "large (aucune detection, hypothese basse)",
        "conf_moyenne": round(sum(confs) / len(confs), 2) if confs else None,
    })
    print(resultats[-1])

# Toutes les apparitions, comptees comme passage ou non : leurs secondes sont dans le temps a l'ecran
# (463 s pour EgoKiefer), donc dans la valeur.
par_plan = {"large": 0, "moyen": 0, "gros": 0}
for r in resultats:
    cle = r["plan"].split(" ")[0]
    par_plan[cle] += r["secondes_visibles"] or 0

sortie = {"marque": marque, "poids": poids, "conf_min": conf_min, "passages": resultats, "secondes_par_plan": par_plan}
chemin = dossier / f"hauteurs_{marque}.json"
json.dump(sortie, open(chemin, "w"), ensure_ascii=False, indent=1)
print("secondes par plan :", par_plan)
print("ecrit :", chemin)
