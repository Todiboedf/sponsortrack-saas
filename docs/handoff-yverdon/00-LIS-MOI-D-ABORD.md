# Sponsorlens x Yverdon Sport : brief de reprise pour les pages sponsor EgoKiefer et Roseyres

Ce dossier contient tout ce qu'une nouvelle session (Cowork ou Claude Code) doit savoir pour construire deux pages web completes, une par sponsor, sans rien redemander. Lis ce fichier en entier avant de produire quoi que ce soit. Les chiffres ci-dessous sont verifies contre les fichiers de `data/` ; ne les arrondis pas vers le haut, ne les complete pas par des estimations non etiquetees.

## 1. Contexte en dix lignes

Sponsorlens (GHaas Management SA, Guillaume Haas) mesure la visibilite reelle des sponsors d'un club image par image sur la diffusion TV, la convertit en valeur media, y ajoute les reseaux sociaux, et met le tout a disposition dans une page par sponsor. Pilote en cours avec Yverdon Sport FC (dieci Challenge League), offert, en echange d'un cas client.

Le directeur marketing et commercial du club, Nicolas Cherbuin, a repondu par ecrit puis par telephone qu'il n'en avait pas besoin : Nielsen (TV), KORE/Hookit (reseaux) et C'Mon (activation) sont deja en place, et selon lui les sponsors ne veulent pas voir leur visibilite ni leur presence LED. Guillaume est convaincu du contraire. Les deux pages servent a le prouver : montrer concretement ce qu'un sponsor verrait dans son tableau de bord, et le montrer directement a des sponsors.

Point important : Roseyres.ch est une creation de Smartimmo Sarl, qui est listee « Sponsor principal » sur la page partenaires officielle du club, et Smartimmo est un client de Guillaume (il construit leur site de promotion immobiliere). La page Roseyres peut donc etre montree directement au sponsor, sans passer par le club. C'est la page a soigner en premier.

Un premier match a ete mesure en entier : journee 9, Yverdon Sport 0-0 FC Stade-Lausanne-Ouchy, dimanche 20.09.2026 14:00, Stade Municipal, diffusion blue Sport de 2 h 27 (8836 s), lue seconde par seconde.

## 2. Ce qu'il faut produire

Deux pages web, une pour EgoKiefer, une pour Roseyres.ch (Smartimmo), qui sont la version « ce que le sponsor voit » du produit. Chaque page doit contenir, dans cet ordre :

1. En-tete : marque, club, match mesure, date, statut du partenaire (voir section 6 : jamais « Bronze » pour EgoKiefer).
2. Les chiffres cles du match : secondes a l'ecran pendant le jeu, nombre de passages, rang parmi les marques visibles pendant le jeu, part du temps sponsor, et la valeur media du match (base et optimiste, jamais de scenario « bas » affiche).
3. La preuve video : extrait avec le logo encadre et le pourcentage de confiance (Roseyres : `video/Roseyres-J09-extrait-diffusion.mp4`, 40 s ; EgoKiefer : clip de 5 s `J09-EgoKiefer.mp4` sur le PC de Guillaume, voir section 8, ou nouveaux extraits a couper avec `scripts/coupe_passages.sh`).
4. La chronologie du match : les passages sur une frise de 0 a 95 minutes, mi-temps separees, chaque passage cliquable avec son chrono, sa duree, son plan (large, moyen, gros). Donnees dans `data/J09-passages-detail.json`.
5. L'exposition detaillee : repartition par mi-temps, par plan (hauteur du bandeau a l'image), secondes brutes contre secondes equivalentes, et la position face aux autres marques (classement des 12 marques visibles pendant le jeu, sans montrer les montants de personne).
6. La valeur media : TV, stade, reseaux sociaux, total du match, projection sur les 18 matchs a domicile, avec la formule ecrite en clair et chaque hypothese affichee avec son statut (mesure, verifie, hypothese). Comparaison avec ce que la meme visibilite aurait coute en campagne publicitaire classique (c'est exactement ce que calcule la ligne « tv_brut » et la ligne « tv » : des secondes de spot a 30 s au CPM de reference).
7. Les reseaux sociaux : ce qui a ete trouve sur les comptes du club pour cette marque (posts, vues, likes, commentaires), la portee estimee, la valeur, et le levier « package social » (2 posts dedies par match) clairement marque comme levier et pas comme mesure.
8. La part exposition : ce que l'ecran represente face au reste du partenariat (reseau, hospitalite, image). Sans palier connu, la page montre la valeur livree et laisse une ligne « votre investissement » a remplir par le sponsor, avec le calcul de la part couverte qui se fait tout seul.
9. Les leviers chiffres : plus de passages, creation plus lisible, package social (valeurs dans le JSON Roseyres, a recalculer pour EgoKiefer avec `scripts/valeur.py`).
10. La methode, en bas de page, en dix lignes : detecteur entraine sur les logos du stade, lecture seconde par seconde, bornes du match verifiees sur le chronometre du stade, regle des passages, ce qui est mesure et ce qui est hypothese.

La page doit etre en francais, lisible sur telephone en premier, sobre (typographie de conseil, pas de dashboard neon), sans tiret cadratin, sans emoji, icones Lucide uniquement si des icones sont utilisees. Chaque chiffre affiche porte son statut. Un chiffre qu'on ne peut pas justifier ne s'affiche pas.

## 3. Les fichiers de ce dossier

`data/J09-SLO-mesure-complete-donnees.json` : la mesure finale du match (version 4.1), fait foi pour tous les totaux. Cles : `jeu_s` 5708, `bandeau_visible_s` 4960, `sponsors_jeu_s` par marque, `sponsors_hors_jeu_s`, `ligue_jeu_s`, `passages_jeu`, `bornes_diffusion_s`, `panneaux_fixes_s.clean_co`.

`data/J09-passages-detail.json` : chaque passage de chaque marque pendant le jeu (mi-temps, seconde de diffusion de debut et de fin, secondes visibles, chrono de jeu MM:SS, s'il compte). Reconstruit depuis la chronologie avec la regle officielle, reproduit les comptes de la v4.1 (une difference de 1 sur La Sante a Champagne, 10 contre 11 ; la v4.1 fait foi).

`data/J09-SLO-chronologie-bandeau-seconde-par-seconde.json` : pour chaque seconde de diffusion, la phase, l'etiquette du bandeau, la source (lecture humaine pendant le jeu, detecteur hors jeu), et les secondes ou le panneau fixe Clean&Co est a l'image. Etiquettes courtes : `ego` = egokiefer, `garage` = garage_plaine, `sante` = sante_champagne, `ab` = ab_serrurerie, `jolly` = jolly_voyages, `hors_champ` = bandeau pas a l'image, `none` = bandeau vide.

`data/Roseyres-J09-donnees-et-hypotheses.json` : tout ce qui est dans la fiche Roseyres : les 8 passages avec hauteur en pixels et plan, les secondes par plan, le classement, les hypotheses (audience, CPM, affluence, Instagram, portee), les valeurs match et saison par scenario, les leviers.

`data/EgoKiefer-resumes-septembre.json` : l'historique EgoKiefer sur les resumes de 4 matchs de septembre (J02 Carouge, J04 Aarau, J05 Wil, J07 Nyonnais), mesure sur resumes avec le modele de septembre. A montrer comme « presence sur les resumes diffuses », jamais additionne au match complet.

`data/referentiel-partenaires-v2.json` : statut officiel de chaque marque d'apres la page partenaires du club (verifiee le 09.10.2026), support observe, notes. Fait foi pour les statuts.

`refs/` : le rapport complet du match (PDF, la reference de ton et de methode), la fiche Roseyres exemple (PDF, la page Roseyres doit la depasser, pas la repeter), l'exemple de tableau de bord EgoKiefer de septembre (PDF et PNG, a depasser aussi), le rapport de mesure de septembre, la chronologie du bandeau en image, les deux planches d'inventaire du bandeau, et `style-maison-sponsorlens.css` (couleurs et typographie des documents Sponsorlens, voir section 7).

`video/Roseyres-J09-extrait-diffusion.mp4` : 40 s, 1004 images, quatre moments du match avec chaque logo Roseyres encadre et son pourcentage, plus le panneau fixe derriere le but. Validee par Guillaume, a utiliser telle quelle.

`modele/best_v3.pt` : le detecteur YOLO11n (25 classes, mAP50 0,703), pour mesurer les hauteurs de bandeau EgoKiefer (section 5). Ne pas le reentrainer.

`scripts/coupe_passages.sh` : coupe un extrait par passage dans le match complet (sur le PC de Guillaume, WSL, `~/match_full.mp4`, 1280x720). `scripts/mesure_hauteurs.py` : mesure la hauteur mediane du bandeau sur chaque extrait et classe le passage en plan large, moyen, gros. `scripts/valeur.py` : la formule de valeur media, qui redonne exactement les chiffres de la fiche Roseyres (`python3 valeur.py roseyres` affiche « TEST ROSEYRES : OK »).

## 4. Les chiffres verifies du match J09

Bornes de diffusion, lues sur le chronometre du stade : coup d'envoi 701 s, fin de 1re mi-temps 3471 s, reprise 4524 s, coup de sifflet final 7462 s. Jeu effectif 95 min 08 (5708 s). Bandeau LED a l'image pendant le jeu : 82 min 40 (4960 s), dont sponsors 44 min 59 (2699 s), habillage ligue dieci 17 min 01, Macron 7 min 08, auto-promotion club 8 min 33, bandeau vide 3 min 42. Vingt et une marques vues dans le stade, douze visibles pendant le jeu, neuf qui ne tournent qu'avant le coup d'envoi ou a la mi-temps. Panneau fixe Clean&Co : 13 min 58 pendant le jeu, mesure a part du bandeau.

Classement des secondes pendant le jeu : EgoKiefer 463, Multitel 345, Desinfection Piller 336, « rouge » (Rouge FM, a confirmer) 279, Garage de la Plaine 271, La Sante a Champagne 224, Roseyres 206, AB Serrurerie 199, Jubin (a confirmer) 191, ASA 114, AON 57, Jolly Voyages 14, Kiki Pneus 0 (34 s avant le coup d'envoi seulement).

EgoKiefer : 463 s pendant le jeu (7 min 43), 17 passages, 1re marque sur 12, 17,2 % du temps sponsor (463 / 2699), 0 s hors jeu. 8 passages en 1re mi-temps, 9 en 2e. Passages entre 12 et 48 s, la plupart autour de 30 s. Liste complete avec chronos dans `data/J09-passages-detail.json`.

Roseyres : 206 s pendant le jeu (3 min 26), 8 passages, 7e sur 12, 7,6 % du temps sponsor, 0 s hors jeu. Par plan : 150 s plan large (hauteur 13 a 18 px), 50 s plan moyen (25 a 36 px), 6 s gros plan. Secondes equivalentes 81. Valeur match : base CHF 860 (TV 729, stade 128, social organique 3), optimiste CHF 2'561. Saison 18 matchs : base 15'480, optimiste 46'098. Leviers : 12 passages 1'288, creation lisible 1'297, package social 1'013.

Reseaux : Instagram @yverdonsport 31'700 abonnes, verifie le 10.10.2026. Rien d'autre n'a encore ete mesure cote reseaux (section 5).

## 5. Les trous de donnees et comment les combler

EgoKiefer, hauteur du bandeau par passage : pas encore mesuree, donc pas de secondes equivalentes ni de valeur definitive. Tant que ce n'est pas fait, `python3 scripts/valeur.py egokiefer` donne la borne basse (tout en plan large) : base CHF 1'526 par match (TV 1'250, stade 272, social 3), optimiste CHF 4'506, saison 27'468 a 81'108. Si la page sort avant la mesure, elle affiche cette borne basse en l'appelant borne basse. Pour la mesurer : sur le PC de Guillaume, `bash scripts/coupe_passages.sh egokiefer` (18 extraits), puis `python3 scripts/mesure_hauteurs.py egokiefer <dossier des extraits> modele/best_v3.pt`, puis `python3 scripts/valeur.py egokiefer <dossier>/hauteurs_egokiefer.json`. Le detecteur v3 tourne sur CPU, 1 image par seconde, environ 10 minutes pour les 18 extraits.

Reseaux sociaux, les deux marques : a rechercher. Comptes du club : Instagram @yverdonsport, Facebook, LinkedIn, X, TikTok, YouTube. Pour chaque marque, depuis le debut de la saison 2026-27 (juillet 2026) : posts qui la citent ou la montrent (texte, tag, logo visible), avec date, format, vues si affichees, likes, commentaires ; et le resume video du match J09 s'il a ete publie. Chaque chiffre lu sur la plateforme est « mesure », la portee par post est une hypothese (15 %, 20 %, 30 % des abonnes par scenario, dans le JSON). Regarder aussi les comptes de la marque elle-meme (EgoKiefer Suisse, Smartimmo, Roseyres.ch) pour voir s'ils relaient le partenariat. Ne rien inventer : zero post trouve s'affiche comme zero post trouve.

Audience TV par match : blue Sport ne la publie pas. Hypotheses dans le JSON (3'000, 6'000, 12'000 telespectateurs ; CPM 30 s 35, 45, 70 CHF). Affluence : hypothese (1'500, 2'000, 3'000), l'affluence reelle du match J09 est a chercher sur le site de la SFL ou dans les comptes rendus de presse, et devient « verifie » si trouvee.

Paliers et montants : le club n'a rien donne. La grille publique 2017 est obsolete et les paliers Platine, Gold, Argent, Bronze trouves sur le site concernent le tournoi juniors YS Cup, pas le stade. Ne pas utiliser ces paliers. La page prevoit une ligne « votre investissement » que le sponsor renseigne lui-meme.

Deux noms a confirmer par le club : la creation rouge sombre (Rouge FM ?) et la creation rose « Jubin ». Sur les pages, ils apparaissent dans le classement sous ces noms avec la mention « a confirmer ».

## 6. Les regles qui ne se discutent pas

Jamais gonfler un chiffre. Un chiffre affiche est soit mesure (lu image par image ou sur la plateforme), soit verifie (source externe citee), soit hypothese (ecrite comme telle, avec sa valeur). Pas de scenario « bas » sur les pages : base et optimiste seulement.

Jamais « temps reel », jamais « sans intervention humaine », jamais « lundi matin automatiquement ». Les pages sont mises a jour apres chaque match, point.

EgoKiefer n'est pas listee sur la page partenaires officielle du club et le palier « Bronze » des rapports de septembre venait de la page YS Cup. Ecrire « statut a confirmer par le club ». Roseyres.ch est une creation de Smartimmo Sarl, listee « Sponsor principal » sur le site du club.

Le panneau fixe Clean&Co et les passages Roseyres derriere le but ne se melangent pas avec le bandeau : ce sont des lignes a part.

Pas de montants des autres sponsors, pas de tarifs Sponsorlens sur les pages. Pas de citation de Nicolas Cherbuin ni du club comme client ou reference : le club n'a rien valide. Les pages sont des exemples construits sur une mesure reelle, et le disent.

Jamais la cle API Roboflow dans un chat ou un script (elle vit dans `~/sponsorlens/.env`). Pas de procedure de telechargement YouTube ou blue Sport : le match complet existe deja sur le PC de Guillaume.

Style d'ecriture : francais, phrases courtes, pas de tiret cadratin, pas d'emoji, pas de lorem ipsum, titres sobres. Le texte s'adresse au sponsor, en vouvoiement.

## 7. Style maison

Fichier `refs/style-maison-sponsorlens.css`. Encre `#0A1628`, encre secondaire `#2B3A55`, texte `#1F2937`, gris `#6B7280`, filets `#E3E6EA`, surface `#F6F7F9`, accent vert `#008300` (utilise pour les cadres de detection et les repères, pas pour decorer), bleus de donnees `#256abf`, `#5598e7`, `#86b6ef`, bleu profond `#104281`, ambre d'alerte `#B45309` sur `#FDF6EC`. Police Inter. Les PDF de `refs/` montrent le rendu attendu : couverture encre avec barre verte, tableaux a filets fins, chiffres en gras encre, annotations courtes. Mode sombre souhaitable mais pas prioritaire.

Graphiques : une frise des passages sur le temps de jeu, un classement en barres horizontales (une couleur pour la marque, gris pour les autres), une decomposition de la valeur (TV, stade, social) en barres empilees ou en tuiles, pas de camembert, pas de double axe, pas de couleur arc-en-ciel. Direct labels sur la marque de la page, legende presente des qu'il y a deux series.

## 8. Ce qui est sur le PC de Guillaume

Dossier `C:\Users\ghnic\OneDrive\Documents\sponsorlens\` : `rapports-match\clips-sponsors\J09-<Marque>.mp4` (16 clips de 5 s, logos encadres avec pourcentage, dont `J09-EgoKiefer.mp4`), `rapports-match\Yverdon-J09-SLO-Mesure-match-complete.pdf`, `rapports-match\fiches-partenaires\Roseyres-J09-Fiche-partenaire-EXEMPLE.pdf` + `.mp4` + `.json`, `yverdon-2026-27\clips_src\` (extraits roseyres_1 a 5 et autres sources), `Mail-Nicolas-Cherbuin\` (les 7 pieces jointes du mail), `coupe_clips2.sh` a `coupe_clips5.sh` (scripts de coupe qui ont fonctionne). Dans WSL Ubuntu : `~/match_full.mp4`, le match complet 1280x720 50 i/s, 2 h 27.

## 9. Ordre de travail conseille

1. Lire ce fichier, puis `data/J09-passages-detail.json` et `data/Roseyres-J09-donnees-et-hypotheses.json`, puis les deux PDF de reference (rapport du match, fiche Roseyres).
2. Construire la page Roseyres d'abord : toutes les donnees existent, la video existe, le sponsor peut la voir directement.
3. Lancer la recherche reseaux sociaux pour les deux marques pendant que la page Roseyres se construit.
4. Construire la page EgoKiefer avec la borne basse, puis demander a Guillaume de lancer `coupe_passages.sh` et `mesure_hauteurs.py` pour remplacer la borne basse par la valeur mesuree.
5. Verifier chaque chiffre affiche contre les JSON avant de livrer, et relire les pages sur une largeur de telephone.
