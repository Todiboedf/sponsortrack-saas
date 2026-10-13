# Prompts de depart

Deux routes. La route A fait le vrai produit dans ton repo Sponsorlens (sponsortrack-saas, Next.js, Vercel) : pages a une vraie adresse sur sponsorlens.io, code a toi, deploiement en preview. La route B fait les deux pages en artefacts publies depuis une nouvelle session Cowork : plus rapide, un lien a partager, sans toucher au repo. Les deux partent du meme dossier.

## Route A : Claude Code dans le repo Sponsorlens

1. Copie ce dossier dans le repo : `docs/handoff-yverdon/` (tout sauf `modele/` et `video/`, qui restent hors git ; mets la video dans `public/yverdon/` ou sur Vercel Blob).
2. Copie `CLAUDE.md` de ce dossier a la racine du repo (ou fusionne-le avec le tien).
3. Ouvre Claude Code a la racine du repo et colle :

```
Lis docs/handoff-yverdon/00-LIS-MOI-D-ABORD.md en entier, puis les JSON de docs/handoff-yverdon/data/.
Construis deux pages statiques, /yverdon/roseyres et /yverdon/egokiefer, qui sont la version « ce que le sponsor voit » du produit Sponsorlens, en suivant exactement la structure en 10 points de la section 2 du brief et les regles de la section 6.
Les donnees viennent des JSON (charge-les dans des types TypeScript stricts, pas de any), les hypotheses s'affichent avec leur statut, pas de scenario bas.
Commence par Roseyres. Fais tourner `python3 docs/handoff-yverdon/scripts/valeur.py roseyres` et verifie que tu retrouves 860 et 2561 avant d'afficher une valeur.
Pour EgoKiefer, affiche la borne basse de valeur.py en l'appelant borne basse, et prepare le chargement de hauteurs_egokiefer.json quand je l'aurai genere.
Mobile d'abord, Inter, couleurs du fichier refs/style-maison-sponsorlens.css, icones Lucide, pas de tiret cadratin, pas d'emoji.
Quand les deux pages tournent en local, prends des captures sur 390 px et 1280 px de large et montre-les moi avant de deployer.
```

4. Pendant que Claude Code construit, lance dans WSL : `bash docs/handoff-yverdon/scripts/coupe_passages.sh egokiefer`, puis `python3 docs/handoff-yverdon/scripts/mesure_hauteurs.py egokiefer /mnt/c/Users/ghnic/OneDrive/Documents/sponsorlens/yverdon-2026-27/passages_egokiefer docs/handoff-yverdon/modele/best_v3.pt` (il faut `pip install ultralytics opencv-python` dans WSL), et donne le fichier `hauteurs_egokiefer.json` a Claude Code.
5. La recherche reseaux sociaux (section 5 du brief) se fait mieux dans une session Cowork avec Chrome : lance-la en parallele avec le prompt de la route B, point 3, et colle le resultat JSON dans `docs/handoff-yverdon/data/`.

## Route B : nouvelle session Cowork

1. Ouvre une nouvelle session Cowork, connecte le dossier `sponsorlens` (ou joins le zip), et colle :

```
Dans le dossier handoff-pages, lis 00-LIS-MOI-D-ABORD.md en entier avant toute chose, puis les JSON de data/.
Objectif : deux pages web publiees (une par sponsor, Roseyres d'abord, puis EgoKiefer), qui montrent ce qu'un sponsor verrait dans son tableau de bord Sponsorlens, en suivant exactement la structure en 10 points de la section 2 et les regles de la section 6.
Chaque chiffre vient des JSON et porte son statut (mesure, verifie, hypothese). Pas de scenario bas. Pas de tiret cadratin, pas d'emoji, Inter, couleurs de refs/style-maison-sponsorlens.css, lisible sur telephone.
Avant d'afficher une valeur, fais tourner scripts/valeur.py roseyres et verifie 860 et 2561.
Integre la video video/Roseyres-J09-extrait-diffusion.mp4 dans la page Roseyres.
Pour EgoKiefer, affiche la borne basse de valeur.py en l'appelant borne basse.
Publie chaque page et donne-moi le lien ; ouvre-la dans Chrome et verifie qu'elle s'affiche bien avant de me la donner.
```

2. Pour les hauteurs EgoKiefer, meme procedure que la route A, point 4, puis donne `hauteurs_egokiefer.json` a la session pour qu'elle remplace la borne basse.

3. Recherche reseaux sociaux, dans la meme session ou une autre :

```
Avec Chrome, cherche sur les comptes d'Yverdon Sport (Instagram @yverdonsport, Facebook, LinkedIn, X, TikTok, YouTube) tous les posts depuis le 1er juillet 2026 qui citent ou montrent EgoKiefer d'une part, Roseyres.ch ou Smartimmo d'autre part, plus le resume video du match du 20.09.2026 contre Stade-Lausanne-Ouchy. Pour chaque post : date, plateforme, format, texte ou tag, vues si affichees, likes, commentaires, lien. Regarde aussi les comptes d'EgoKiefer Suisse, de Smartimmo et de Roseyres.ch. Cherche enfin l'affluence officielle du match (site SFL, presse). Livre un JSON reseaux-sociaux-J09.json avec, pour chaque chiffre, sa source et son statut (mesure ou hypothese). Zero post trouve = zero, n'invente rien.
```

## Dans les deux cas

Ne rouvre pas l'ancienne session : tout ce qu'elle savait d'utile est dans ce dossier. Si un chiffre manque, il manque aussi la-bas.
