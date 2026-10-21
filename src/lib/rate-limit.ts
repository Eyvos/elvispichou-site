/**
 * Limiteur de débit en mémoire (fenêtre glissante), propre à chaque instance du Worker.
 * C'est un filet de sécurité : il freine un robot simple mais ne remplace pas une règle de limitation Cloudflare (docs/05-technique.md).
 */
const hits = new Map<string, number[]>();
const MAX_KEYS = 5000;

/** Retourne `true` si l'appel est autorisé, `false` si la limite est atteinte pour cette clé. */
export function allow(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > MAX_KEYS) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return true;
}
