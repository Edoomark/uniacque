# TODO — Uniacque Scuole

Stato: Fase 0 in corso. Blocker principale: nessun accesso al DNS di
`uniacque.bg.it` né possibilità di migrare il dominio su Cloudflare.
Tutto quello che dipende da record DNS del dominio Uniacque è rimandato.

---

## 🔴 Blocker esterni (in attesa di terzi)

- [ ] **DNS `uniacque.bg.it`**: contatto tecnico trovato il 2026-10-01 —
      Alex Perez (`aperez@imteam.it`, Yamme Srl / Gruppo IMteam), introdotto
      da Antonio Sarti Deponti (Uniacque). In attesa di risposta a mail con
      proposta tecnica + richiesta dati.
      Opzione proposta a Yamme (nuova, preferita):
  0. **Subdomain delegation**: 2 record NS su `scuole.uniacque.bg.it` →
     nameserver Cloudflare. Loro intervengono una sola volta, noi
     gestiamo in autonomia tutto sotto `scuole.*` (sito, CDN su
     `cdn.scuole.*`, email transazionale `no-reply@scuole.*`).
     Il resto di `uniacque.bg.it` (mail, PEC, servizi interni) resta
     intoccato sui loro NS.
  Piani di fallback (in ordine):
  1. delega del DNS dell'intero dominio a Cloudflare (improbabile)
  2. accesso in scrittura al loro pannello DNS (improbabile per policy)
  3. richiesta puntuale: loro aggiungono i singoli record di volta in
     volta (Resend, CNAME Pages, CNAME R2)
  Dati chiesti nella mail: registrar del dominio, provider DNS attuale,
  hosting attuale di `www.educational.uniacque.bg.it`, record
  SPF/DKIM/DMARC già presenti, conferma del subdomain finale
  (`scuole.*` vs mantenere `educational.*`).
  Blocca:
  - Verifica dominio Resend per invio email di produzione
  - Custom domain R2 (`cdn.uniacque.bg.it` o `cdn.scuole.*`) — sostituibile per ora con URL `*.r2.dev`
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
- [x] **R2**: bucket `uniacque-scuole-assets` creato, public access
      abilitato su `https://pub-13224ea6388147de83adf583fe26b9fb.r2.dev`,
      38 asset caricati nelle cartelle attese (`HP/`, `Sezione Educational/`,
      `Sezione Water Week/`), tutti i path dei frontmatter verificati 200
- [x] **Cloudflare Stream**: Starter Bundle attivato, 12 video FSL
      caricati via API/TUS, UID applicati in `fsl.md`.
      Subdomain: `customer-vg6r6z68e7cwtk8f.cloudflarestream.com`
- [x] **Turnstile**: widget `uniacque-scuole` creato, hostname `localhost`
      (aggiungere `*.pages.dev` e custom domain quando disponibili)
- [x] Compilare `.env` locale con tutti i valori raccolti
- [ ] Test locale `npm run dev` (asset R2 + video Stream) — opzionale, già
      verificato in produzione su `uniacque-scuole.pages.dev`
- [ ] Test locale `npx wrangler pages dev -- npm run dev` (contact form → Resend)
      — opzionale, già verificabile direttamente in produzione

---

## 🟢 Fase 0 — da chiudere lato Claude

- [x] Sostituire i `PLACEHOLDER_UID_*` in `src/content/programs/fsl.md`
      con gli UID Stream reali
- [x] Commit unico: font + contact endpoint + fix type-check scaffold + UID reali
      (commit `cadd623`)

---

## Fase 2 — Gap tecnici (subito dopo Fase 0)

- [ ] Paginazione news statica (`src/pages/news/[...page].astro` con `paginate()`)
      — rimandata: `src/content/news/` è ancora vuota, nessun contenuto
      da paginare
- [x] Pagina 404 (`src/pages/404.astro`)
- [x] `sitemap.xml` (integrazione `@astrojs/sitemap` → genera
      `/sitemap-index.xml` + `/sitemap-0.xml`)
- [x] `robots.txt` (statico in `public/`, punta a sitemap-index)
- [x] `prose prose-lg`: installato `@tailwindcss/typography` come
      plugin Tailwind v4 (`@plugin "@tailwindcss/typography"` in
      `global.css`), classi funzionanti
- [x] Riconciliate CTA nei frontmatter: rimossi i CTA
      Accedi/Registrati con `href: "#"` dai programs, `ProgramLayout`
      renderizza sempre `CtaPair` da env; i `ctas` restanti in
      frontmatter restano per CTA opzionali
- [x] Menu mobile: aggiunti `aria-expanded` / `aria-controls` +
      aria-label dinamico
- [ ] OG image di default in `public/` — in attesa dell'illustrazione
      brand Uniacque
- [ ] Feed RSS news (opzionale) — rimandato finché non ci sono news

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

- [x] Push repo su GitHub (`Edoomark/uniacque`, main)
- [x] Connettere repo a Cloudflare Pages, preset Astro
- [x] Configurare env vars in Pages (Production + Preview):
      tutte le `PUBLIC_*` + le server-side (`TURNSTILE_SECRET_KEY`,
      `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`)
- [x] **Sito online**: https://uniacque-scuole.pages.dev
      (progetto `uniacque-scuole`, production branch `main`)
      Resterà su `*.pages.dev` fino a quando il DNS non sarà disponibile.
- [ ] Aggiornare gli hostname consentiti in Turnstile e Stream con
      `uniacque-scuole.pages.dev`
- [ ] Quando il DNS Uniacque sarà disponibile:
  - collegare il custom domain `scuole.uniacque.bg.it` a Pages
  - `astro.config.mjs` già impostato su quell'URL
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
