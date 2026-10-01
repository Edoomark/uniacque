# TODO — Uniacque Scuole

Stato: Fase 0 in corso. Blocker principale: nessun accesso al DNS di
`uniacque.bg.it` né possibilità di migrare il dominio su Cloudflare.
Tutto quello che dipende da record DNS del dominio Uniacque è rimandato.

---

## 🔴 Blocker esterni (in attesa di terzi)

- [ ] **DNS `uniacque.bg.it`**: richiedere all'IT Uniacque una di queste tre
      soluzioni, in ordine di preferenza:
  1. delega del DNS a Cloudflare (nameserver)
  2. accesso in scrittura al pannello DNS attuale
  3. su richiesta puntuale, l'IT aggiunge i record specifici (Resend
     dominio, CNAME R2, CNAME Cloudflare Pages)
  Blocca:
  - Verifica dominio Resend per invio email di produzione
  - Custom domain R2 (`cdn.uniacque.bg.it`) — sostituibile per ora con URL `*.r2.dev`
  - Custom domain Cloudflare Pages (`scuole.uniacque.bg.it`) — sostituibile per ora con URL `*.pages.dev`
- [ ] **Testi finali approvati**: confermare che i draft in `src/content/**/*.md`
      siano definitivi, oppure ricevere i testi ufficiali
- [ ] **Brand guideline Uniacque**: hex colori esatti + eventuali font ufficiali
      diversi da Fredoka + Inter (per ora self-hosted da Fontsource)
- [ ] **Illustrazioni arancioni flat/vettoriali**: file `.svg` da fornire per
      popolare i contenitori già previsti nei componenti
- [ ] **URL privacy/cookie policy definitivi** (ora placeholder in `src/data/site.ts`)

---

## 🟡 Fase 0 — da chiudere lato utente (fattibile senza DNS Uniacque)

Dettagli operativi nel README + tutorial in conversazione.

- [x] **Resend**: account creato, API key ottenuta.
      **Scelta confermata: Opzione A** — dominio `edoolearning.com` già
      verificato su Resend (`sending: enabled`), quindi si può spedire
      a qualsiasi indirizzo, compresa la casella Uniacque.
      - `CONTACT_FROM_EMAIL=no-reply@edoolearning.com`
      - `CONTACT_TO_EMAIL=educational@uniacque.bg.it` (destinatario reale)
      - Il form pubblico è pienamente funzionante: i messaggi arrivano
        davvero alla casella Uniacque anche in produzione provvisoria
        su `*.pages.dev`.
      - Pre-golive con DNS Uniacque: opzionale migrazione a un mittente
        `no-reply@scuole.uniacque.bg.it`, ma non necessaria per operare.
- [ ] **R2**: bucket + public access via `pub-XXX.r2.dev` + upload asset
      (mantenere la struttura di cartelle già cablata nei frontmatter)
- [x] **Cloudflare Stream**: Starter Bundle attivato, 12 video FSL
      caricati via API/TUS, UID applicati in `fsl.md`.
      Subdomain: `customer-vg6r6z68e7cwtk8f.cloudflarestream.com`
- [x] **Turnstile**: widget `uniacque-scuole` creato, hostname `localhost`
      (aggiungere `*.pages.dev` e custom domain quando disponibili)
- [ ] Compilare `.env` locale con tutti i valori raccolti
- [ ] Test locale `npm run dev` (asset R2 + video Stream)
- [ ] Test locale `npx wrangler pages dev -- npm run dev` (contact form → Resend)

---

## 🟢 Fase 0 — da chiudere lato Claude

- [x] Sostituire i `PLACEHOLDER_UID_*` in `src/content/programs/fsl.md`
      con gli UID Stream reali
- [ ] Commit unico: font + contact endpoint + fix type-check scaffold + UID reali

---

## Fase 2 — Gap tecnici (subito dopo Fase 0)

- [ ] Paginazione news statica (`src/pages/news/[...page].astro` con `paginate()`)
- [ ] Pagina 404 (`src/pages/404.astro`)
- [ ] `sitemap.xml` (integrare `@astrojs/sitemap`)
- [ ] `robots.txt`
- [ ] Decidere cosa fare di `prose prose-lg`: installare
      `@tailwindcss/typography`, sostituire con stile custom, o rimuovere
- [ ] Riconciliare le CTA nei frontmatter (`href: "#"`) con gli URL area
      riservata già in env — preferibile rimuoverle dai frontmatter e
      affidarsi a `CtaPair` che legge da env
- [ ] Menu mobile: aggiungere `aria-expanded` / `aria-controls`
- [ ] OG image di default in `public/`
- [ ] Feed RSS news (opzionale)

---

## Fase 3 — Qualità e pre-lancio

- [ ] Accessibilità: focus visibili, contrasti WCAG AA su `bg-primary`,
      `alt` reali, `<main>`/`<nav>` landmarks
- [ ] Lighthouse audit ≥95 su Homepage + Educational Center + una news
- [ ] Test mobile reale iOS Safari + Android Chrome (attenzione al
      hero-card sovrapposto con `-mt-20`)
- [ ] Ottimizzazione immagini: valutare Cloudflare Image Transformations
      per WebP/AVIF responsivi senza pre-generare varianti

---

## Fase 4 — Deploy Cloudflare Pages

- [ ] Push repo su GitHub
- [ ] Connettere repo a Cloudflare Pages, preset Astro
- [ ] Configurare env vars in Pages (Production + Preview):
      tutte le `PUBLIC_*` + le server-side (`TURNSTILE_SECRET_KEY`,
      `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`)
- [ ] Sito online su URL provvisorio `uniacque-scuole.pages.dev` (o simile)
      **fino a quando il DNS non sarà disponibile**
- [ ] Aggiornare gli hostname consentiti in Turnstile e Stream con l'URL
      `*.pages.dev` reale ottenuto
- [ ] Quando il DNS Uniacque sarà disponibile:
  - collegare il custom domain `scuole.uniacque.bg.it` a Pages
  - aggiornare `astro.config.mjs` (già impostato su quell'URL)
  - aggiornare hostname consentiti di Turnstile e Stream

---

## Fase 5 — Post-lancio

- [ ] Cloudflare Web Analytics (cookieless, GDPR-safe — coerente col
      resto delle scelte)
- [ ] Flusso redazionale news: documentare come pubblicare (nuovo file
      `.md` in `src/content/news/` → push → deploy automatico)
- [ ] Preview branch su Pages per review contenuti prima del merge
- [ ] **Pre-golive**: migrazione mittente Resend da `onboarding@resend.dev`
      al dominio Uniacque verificato (`no-reply@scuole.uniacque.bg.it` o
      simile) + `CONTACT_TO_EMAIL=educational@uniacque.bg.it`.
      Solo aggiornamento env vars in Pages, nessun deploy di codice.
- [ ] Migrazione a custom domain R2 (`cdn.uniacque.bg.it`) appena DNS
      disponibile — sostituire `PUBLIC_R2_BASE_URL` in env Pages
