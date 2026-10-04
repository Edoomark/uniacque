const SUBDOMAIN = import.meta.env.PUBLIC_STREAM_SUBDOMAIN ?? '';

/**
 * Costruisce l'URL iframe embed di Cloudflare Stream.
 * uid = Stream video UID (32 char hex).
 */
export function streamEmbedUrl(uid: string): string {
  if (!uid) return '';
  if (SUBDOMAIN) {
    return `https://${SUBDOMAIN}/${uid}/iframe`;
  }
  return `https://iframe.videodelivery.net/${uid}`;
}

/**
 * URL del poster generato da Stream (thumbnail).
 */
export function streamPoster(uid: string, time = '1s'): string {
  if (!uid) return '';
  return `https://videodelivery.net/${uid}/thumbnails/thumbnail.jpg?time=${time}`;
}
