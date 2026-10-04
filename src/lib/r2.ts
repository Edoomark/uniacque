const BASE = import.meta.env.PUBLIC_R2_BASE_URL ?? '';
const CF_IMAGES = (import.meta.env.PUBLIC_CF_IMAGE_RESIZING ?? '') === '1';

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

interface CfImageOptions {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'scale-down' | 'crop' | 'pad';
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
}

/**
 * Avvolge un URL (R2 o esterno) in Cloudflare Image Resizing.
 * Richiede PUBLIC_CF_IMAGE_RESIZING=1 e che il sito sia servito da un
 * dominio Cloudflare con Image Resizing abilitato (Pro+ plan).
 * Se disabilitato o path vuoto, ritorna l'URL originale.
 */
export function cfImage(src: string, opts: CfImageOptions = {}): string {
  if (!src) return '';
  if (!CF_IMAGES) return src;
  const params: string[] = [`f=${opts.format ?? 'auto'}`, `q=${opts.quality ?? 85}`];
  if (opts.width) params.push(`w=${opts.width}`);
  if (opts.height) params.push(`h=${opts.height}`);
  if (opts.fit) params.push(`fit=${opts.fit}`);
  return `/cdn-cgi/image/${params.join(',')}/${src}`;
}

/**
 * Genera srcset responsive via Cloudflare Image Resizing.
 * Se CF Images è disabilitato, ritorna stringa vuota (nessun srcset applicato).
 */
export function cfSrcset(src: string, widths: number[], opts: Omit<CfImageOptions, 'width'> = {}): string {
  if (!src || !CF_IMAGES) return '';
  return widths.map((w) => `${cfImage(src, { ...opts, width: w })} ${w}w`).join(', ');
}
