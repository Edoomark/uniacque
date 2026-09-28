/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_R2_BASE_URL: string;
  readonly PUBLIC_STREAM_SUBDOMAIN: string;
  readonly PUBLIC_AUTH_LOGIN_URL: string;
  readonly PUBLIC_AUTH_REGISTER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
