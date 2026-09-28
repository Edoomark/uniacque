const BASE = import.meta.env.PUBLIC_R2_BASE_URL ?? '';

/**
 * Costruisce l'URL pubblico R2 a partire da un path relativo salvato nei frontmatter.
 * Se BASE è vuoto (dev senza bucket), ritorna il path per debug — l'immagine sarà rotta ma il build passa.
 */
export function r2Url(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/+/, '');
  return BASE ? `${BASE}/${clean}` : `/${clean}`;
}
