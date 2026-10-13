// Mise en forme francaise (Suisse romande) : apostrophe des milliers, virgule decimale,
// espaces insecables. Decimales et pourcentages en arrondi normal, comme le rapport de mesure
// (« ne jamais gonfler » veut dire : pas d'estimation ajoutee, pas tronquer).

const NBSP = " ";

/** 31700 -> 31'700 */
export function entier(n: number): string {
  const signe = n < 0 ? "-" : "";
  const chiffres = Math.trunc(Math.abs(n)).toString();
  return signe + chiffres.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

/** 860 -> CHF 860 */
export function chf(n: number): string {
  return `CHF${NBSP}${entier(n)}`;
}

/** Nombre decimal avec virgule, arrondi normal (0,05 -> 0,1). */
export function decimal(n: number, decimales = 1): string {
  const facteur = 10 ** decimales;
  const arrondi = Math.round(n * facteur + 1e-9) / facteur;
  const [ent, dec] = arrondi.toFixed(decimales).split(".");
  return dec !== undefined && decimales > 0 ? `${entier(Number(ent))},${dec}` : entier(Number(ent));
}

/** Part en pourcentage, arrondi normal : 463 / 2699 -> 17,2 % (17,15 % exact), comme le rapport. */
export function pourcent(numerateur: number, denominateur: number, decimales = 1): string {
  return `${decimal((numerateur / denominateur) * 100, decimales)}${NBSP}%`;
}

/** Pourcentage deja exprime en % (ex. 0.2 -> "20 %"). */
export function taux(fraction: number, decimales = 0): string {
  return `${decimal(fraction * 100, decimales)}${NBSP}%`;
}

/** 463 -> 7 min 43 ; 57 -> 57 s ; 120 -> 2 min 00 */
export function duree(secondes: number): string {
  const s = Math.round(secondes);
  if (s < 60) return `${s}${NBSP}s`;
  const min = Math.floor(s / 60);
  const reste = s % 60;
  return `${min}${NBSP}min${NBSP}${reste.toString().padStart(2, "0")}`;
}

/** 8836 -> 2 h 27 (minutes tronquees) */
export function heures(secondes: number): string {
  const h = Math.floor(secondes / 3600);
  const m = Math.floor((secondes % 3600) / 60);
  return `${h}${NBSP}h${NBSP}${m.toString().padStart(2, "0")}`;
}

/** 81 -> "81 s" ; 138.9 -> "138,9 s" */
export function secondes(n: number): string {
  return Number.isInteger(n) ? `${entier(n)}${NBSP}s` : `${decimal(n, 1)}${NBSP}s`;
}

/** Temps de jeu en secondes -> MM:SS (chrono du tableau d'affichage). */
export function chrono(secondesDeJeu: number): string {
  const m = Math.floor(secondesDeJeu / 60);
  const s = secondesDeJeu % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/** "06:19" -> 379 */
export function chronoEnSecondes(c: string): number {
  const [m, s] = c.split(":").map(Number);
  return m * 60 + s;
}

/** 7 -> "7e" ; 1 -> "1re" */
export function rang(n: number): string {
  return n === 1 ? "1re" : `${n}e`;
}

/** "2026-10-13" -> "13.10.2026" */
export function dateCh(iso: string): string {
  const [a, m, j] = iso.split("-");
  return `${j}.${m}.${a}`;
}
