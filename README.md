# Uniacque per le scuole

Portale educational di Uniacque per le scuole di Bergamo: laboratori,
visite guidate, formazione scuola-lavoro, area didattica e news.

## Stack

- [Astro](https://astro.build) (SSG puro)
- [Tailwind CSS v4](https://tailwindcss.com)
- Content Collections (Content Layer API) per pagine e news
- Deploy statico su [Cloudflare Pages](https://pages.cloudflare.com)
- Media editoriali su [Cloudflare R2](https://developers.cloudflare.com/r2/) (URL pubblico diretto)
- Video pesanti FSL su [Cloudflare Stream](https://developers.cloudflare.com/stream/)

## Setup locale

```bash
cp .env.example .env      # imposta PUBLIC_R2_BASE_URL, PUBLIC_STREAM_SUBDOMAIN, PUBLIC_AUTH_*, PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_*
npm install
npm run dev
```

Per testare il form contatto in locale serve `wrangler pages dev`:

```bash
npx wrangler pages dev -- npm run dev
```

## Struttura

- `src/content/` — contenuti in Markdown (frontmatter + body), organizzati per collezione:
  - `programs/` — 4 sub-pagine Educational (Sorgente Nossana, Missione Comune, Educational Center, FSL)
  - `waterEditions/` — edizioni WaterWeek
  - `news/` — articoli
  - `pages/` — testi delle pagine indice (home, educational, water-school, area-didattica)
- `src/components/` — `layout/`, `ui/`, `blocks/`, `media/`
- `src/layouts/` — BaseLayout, ProgramLayout, ArticleLayout
- `src/pages/` — routing Astro (index, educational, water-school, area-didattica, news)
- `src/lib/` — helper `r2Url()` e `streamEmbedUrl()`
- `src/data/site.ts` — navigazione, contatti, partner
- `public/fonts/` — self-hosting Fredoka + Inter (variable, latin, da Fontsource)
- `functions/api/contact.ts` — Cloudflare Pages Function: verifica Turnstile + invio email via Resend

## Gestione media

I contenuti referenziano file su R2 con **path relativi** nel frontmatter:

```yaml
hero:
  type: image
  image:
    src: Sezione Educational/Formazione Scuola-Lavoro/Sorgente Nossana/hero.jpg
    alt: La sorgente Nossana
```

Il componente `<R2Image>` prepende `PUBLIC_R2_BASE_URL` (env) al build.

I video FSL usano `kind: stream` con UID Cloudflare Stream. Lo schema
supporta anche `r2`, `youtube`, `bunny` se si volesse cambiare provider.

## Deploy su Cloudflare Pages

1. Push del repo su GitHub
2. Su Cloudflare Pages: connetti repo, framework preset **Astro**
3. Build command: `npm run build`, output: `dist`
4. Variabili d'ambiente (Production + Preview):
   - `PUBLIC_*` da `.env.example` (client-side, embedded nel build)
   - `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (server-side, solo Pages Functions)
5. Turnstile: crea widget su Cloudflare dashboard → Turnstile e associalo al dominio del sito
6. Resend: verifica il dominio mittente (SPF/DKIM) per abilitare `CONTACT_FROM_EMAIL`
