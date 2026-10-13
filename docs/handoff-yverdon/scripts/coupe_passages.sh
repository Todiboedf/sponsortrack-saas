#!/usr/bin/env bash
# Coupe un extrait par passage (EgoKiefer : 18 extraits, Roseyres : 8) dans le match complet,
# pour mesurer la hauteur du bandeau (scripts/mesure_hauteurs.py) et choisir les clips de la page.
# A lancer dans WSL (Ubuntu) :
#   bash /mnt/c/Users/ghnic/OneDrive/Documents/sponsorlens/handoff-pages/scripts/coupe_passages.sh egokiefer
#   bash .../coupe_passages.sh roseyres
# Source : le match complet 1280x720 (meme fichier que pour coupe_clips2.sh), par defaut ~/match_full.mp4.
MARQUE="${1:-egokiefer}"
OUT="/mnt/c/Users/ghnic/OneDrive/Documents/sponsorlens/yverdon-2026-27/passages_${MARQUE}"
mkdir -p "$OUT"
FFMPEG=ffmpeg
[ -x /usr/bin/ffmpeg ] && FFMPEG=/usr/bin/ffmpeg
SRC="${SRC_FORCE:-$HOME/match_full.mp4}"
if [ ! -f "$SRC" ]; then
  echo "MATCH COMPLET INTROUVABLE ($SRC). Relance avec :  SRC_FORCE=/chemin/vers/match.mp4 bash coupe_passages.sh $MARQUE"
  exit 1
fi
echo "ffmpeg : $FFMPEG   source : $SRC   marque : $MARQUE"
n=0
while read -r marque nom debut duree reste; do
  [ -z "$nom" ] && continue
  [ "$marque" != "$MARQUE" ] && continue
  if "$FFMPEG" -nostdin -v error -y -ss "$debut" -i "$SRC" -t "$duree" -an -r 25 -c:v libx264 -preset veryfast -crf 16 "$OUT/$nom.mp4" < /dev/null; then
    echo "ok  $nom  ($debut s, $duree s)"; n=$((n+1))
  else
    echo "ECHEC  $nom"
  fi
done <<'LISTE'
egokiefer egokiefer_p01 790 51   # MT1 01:31-02:18 48 s visibles
egokiefer egokiefer_p02 1048 33   # MT1 05:49-06:18 30 s visibles
egokiefer egokiefer_p03 1318 33   # MT1 10:19-10:48 30 s visibles
egokiefer egokiefer_p04 1468 31   # MT1 12:49-13:16 25 s visibles
egokiefer egokiefer_p05 2158 33   # MT1 24:19-24:48 30 s visibles
egokiefer egokiefer_p06 2668 33   # MT1 32:49-33:18 30 s visibles
egokiefer egokiefer_p07 2848 31   # MT1 35:49-36:16 28 s visibles
egokiefer egokiefer_p08 3412 39   # MT1 45:13-45:48 30 s visibles
egokiefer egokiefer_p09 4618 34   # MT2 46:36-47:06 24 s visibles
egokiefer egokiefer_p10 4858 33   # MT2 50:36-51:05 23 s visibles
egokiefer egokiefer_p11 5137 15   # MT2 55:15-55:26 12 s visibles
egokiefer egokiefer_p12 5267 32   # MT2 57:25-57:53 29 s visibles
egokiefer egokiefer_p13 6028 25   # MT2 70:06-70:27 22 s visibles
egokiefer egokiefer_p14 6567 34   # MT2 79:05-79:35 31 s visibles
egokiefer egokiefer_p15 6748 33   # MT2 82:06-82:35 30 s visibles
egokiefer egokiefer_p16 7297 24   # MT2 91:15-91:35 21 s visibles
egokiefer egokiefer_p17 7378 9   # MT2 92:36-92:41 6 s visibles (sous 8 s, ne compte pas)
egokiefer egokiefer_p18 7394 17   # MT2 92:52-93:05 14 s visibles
roseyres roseyres_p01 1078 35   # MT1 06:19-06:50 30 s visibles
roseyres roseyres_p02 2458 33   # MT1 29:19-29:48 30 s visibles
roseyres roseyres_p03 2578 17   # MT1 31:19-31:32 14 s visibles
roseyres roseyres_p04 3118 33   # MT1 40:19-40:48 30 s visibles
roseyres roseyres_p05 4888 34   # MT2 51:06-51:36 31 s visibles
roseyres roseyres_p06 6346 24   # MT2 75:24-75:44 21 s visibles
roseyres roseyres_p07 6458 33   # MT2 77:16-77:45 30 s visibles
roseyres roseyres_p08 6497 5   # MT2 77:55-77:56 2 s visibles (sous 8 s, ne compte pas)
roseyres roseyres_p09 7018 10   # MT2 86:36-86:42 7 s visibles (sous 8 s, ne compte pas)
roseyres roseyres_p10 7037 14   # MT2 86:55-87:05 11 s visibles
LISTE
echo "TERMINE : $n extraits dans $OUT"
