# TODO — Uniacque Scuole

Stato: sito in produzione su `uniacque-scuole.pages.dev`, redesign grafico
completato e deployato (commit `ac61a4f`), captcha rimosso, accessibilità
di base coperta. Rimangono bloccanti esterni (DNS Uniacque, asset grafici
cliente) e task post-lancio.

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
- [ ] **Illustrazioni custom aggiuntive**: le 11 flat/vettoriali attuali
      (astronaut, laboratory, vr, doc, roboto, graduation, design-science
      e 4 Missione Comune) sono in uso. Eventuali asset extra brand da fornire.
- [ ] **URL privacy/cookie policy definitivi** (ora placeholder in `src/data/site.ts`)
- [ ] **OG image di default** in `public/` — in attesa dell'illustrazione
      brand Uniacque dedicata (1200x630 PNG)

---

## 🟡 Fase 0 — da chiudere lato utente (fattibile senza DNS Uniacque)

Dettagli operativi nel README + tutorial in conversazione.

- [x] **Resend**: account creato, API key ottenuta.
      **Opzione A** — dominio `edoolearning.com` verificato (`sending: enabled`).
      - `CONTACT_FROM_EMAIL=no-reply@edoolearning.com`
      - `CONTACT_TO_EMAIL=educational@uniacque.bg.it` (destinatario reale)
      - Il form arriva davvero in casella Uniacque anche in produzione provvisoria.
      - Pre-golive opzionale: migrazione a `no-reply@scuole.uniacque.bg.it`
        quando DNS disponibile.
- [x] **R2**: bucket `uniacque-scuole-assets` creato, public access
      abilitato su `https://pub-13224ea6388147de83adf583fe26b9fb.r2.dev`,
      38 asset caricati nelle cartelle attese, tutti i path verificati 200
- [x] **Cloudflare Stream**: Starter Bundle attivato, 12 video FSL
      caricati, UID applicati. Fix URL embed `/iframe` suffix in `lib/stream.ts`.
      Subdomain: `customer-vg6r6z68e7cwtk8f.cloudflarestream.com`
- [x] **Turnstile**: ~~widget creato~~ **rimosso dal codice** su richiesta cliente
      (commit `45ae311`). Form contatti senza captcha. Se in futuro si vuole
      riattivare: ripristinare il widget in `ContactForm.astro` + verifica
      server-side in `functions/api/contact.ts`.
- [x] Compilare `.env` locale con tutti i valori raccolti
- [ ] Test locale `npm run dev` — opzionale, già verificato in produzione
- [ ] Test locale `npx wrangler pages dev -- npm run dev` (contact form → Resend)
      — opzionale, già verificabile in produzione (ora senza captcha)

---

## 🟢 Fase 0 — chiuso lato Claude

- [x] UID Stream reali in `fsl.md`
- [x] Commit scaffold (`cadd623`)

---

## Fase 2 — Gap tecnici

- [ ] Paginazione news statica (`src/pages/news/[...page].astro` con `paginate()`)
      — rimandata: `src/content/news/` è vuota
- [x] Pagina 404 (`src/pages/404.astro`) + verifica che Cloudflare Pages la serva
      sulle route inesistenti (confermato live)
- [x] `sitemap.xml` (integrazione `@astrojs/sitemap`)
- [x] `robots.txt` statico
- [x] `@tailwindcss/typography` v4 plugin
- [x] CTA frontmatter puliti
- [x] Menu mobile aria-expanded/aria-controls/aria-label dinamico
- [ ] Feed RSS news (opzionale) — rimandato finché non ci sono news

---

## Fase 3 — Qualità e pre-lancio

- [x] **Accessibilità base** (commit `45ae311`):
      - Nuovo token `--color-warm-ink #8A4A0F` (contrast AAA su white)
        per testo warm, warm puro resta solo per decorazioni
      - Focus visibili con ring warm offset su logo header, nav desktop/mobile,
        cards cliccabili (FeatureCard, HomeFeatureCard, water-school edizioni)
      - `aria-current="page"` su nav attiva via SSR path-based
- [ ] **A11y audit completo**: `<main>`/`<nav>` landmarks (già presenti? verifica),
      alt reali per immagini R2 editoriali (già dal frontmatter, verifica
      caso per caso), focus trap/escape nel menu mobile
- [ ] **Lighthouse audit** ≥95 su Home + Educational Center + Area didattica.
      Lancia da Chrome DevTools (Claude non ha browser automation).
- [ ] **Test mobile reale** iOS Safari + Android Chrome (serve device fisico)
- [x] **Image Transformations supporto codice** (commit `45ae311`):
      helper `cfImage()` + `cfSrcset()` in `lib/r2.ts`, prop `widths`/`sizes`
      in `R2Image`. Opt-in via `PUBLIC_CF_IMAGE_RESIZING=1`.
- [ ] **Attivare Image Transformations lato account**: richiede piano Cloudflare
      Pro+, abilitare "Image Resizing" sul dominio, aggiungere
      `PUBLIC_CF_IMAGE_RESIZING=1` nelle env Pages, poi passare `widths` sui
      componenti `R2Image` che vogliamo responsivi

---

## Fase 4 — Deploy Cloudflare Pages

- [x] Push repo su GitHub (`Edoomark/uniacque`, main)
- [x] Repo collegato a Cloudflare Pages, preset Astro
- [x] Env vars configurate (Production + Preview): `PUBLIC_*`, `RESEND_API_KEY`,
      `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- [x] **Sito online**: https://uniacque-scuole.pages.dev
      (production branch `main`, auto-deploy on push)
- [x] Auto-deploy preview branch: `*.uniacque-scuole.pages.dev` per ogni push
      su branch non-main
- [ ] Quando il DNS Uniacque sarà disponibile:
  - collegare il custom domain `scuole.uniacque.bg.it` a Pages
  - `astro.config.mjs` già impostato su quell'URL
  - aggiornare hostname Stream (il subdomain customer `.cloudflarestream.com`
    accetta embed di default, nessuna whitelist richiesta se non abilitata)

---

## Fase 5 — Post-lancio

- [x] **Cloudflare Web Analytics (snippet)**: beacon condizionale in
      `BaseHead.astro`, opt-in via `PUBLIC_WEB_ANALYTICS_TOKEN`
      (commit `45ae311`)
- [ ] **Attivare Web Analytics lato account**: creare site in CF dashboard
      → Web Analytics, copiare il token, aggiungere `PUBLIC_WEB_ANALYTICS_TOKEN`
      nelle env Pages (Production + Preview)
- [x] **Flusso redazionale news**: documentato nel README (file `.md` +
      frontmatter + upload R2 + commit → auto-deploy, sezione "Flusso
      redazionale news")
- [x] **Preview branch su Pages**: già operativo per default (ogni push su
      branch ≠ main genera `<branch>.uniacque-scuole.pages.dev`)
- [ ] **Pre-golive**: migrazione mittente Resend al dominio Uniacque
      verificato (`no-reply@scuole.uniacque.bg.it` o simile).
      Solo aggiornamento env vars in Pages, nessun deploy di codice.
- [ ] **Custom domain R2** (`cdn.uniacque.bg.it` o `cdn.scuole.*`) appena
      DNS disponibile — sostituire `PUBLIC_R2_BASE_URL` nelle env Pages

---

## Redesign grafico (completato)

- [x] Palette estesa con `accent-soft`/`accent-cloud` (azzurro ghiaccio),
      `warm-soft` (badge), `cream`/`cream-dark`, `warm-ink` (testo accessibile)
- [x] HeroCard: media full viewport (`h-screen min-h-[600px] max-h-[920px]`),
      card bianca title/intro/CTA overlappata in basso-sx, mascot opzionale
- [x] HomeHero / index: video R2 full viewport con titolo/intro in overlay
      sinistra, scrim gradient navy per leggibilità
- [x] Hero area-didattica, news: navy drenched con dots pattern, blobs
      decorativi, mascot ruotata (graduation / doc)
- [x] FeatureCard / HomeFeatureCard: hover lift, freccia direzionale, mascot
      overlap, link completo cliccabile con focus-visible ring
- [x] InfoBox: card azzurro ghiaccio con label uppercase warm-ink
- [x] ProgramLayout: slot body `.md` in `<article>` card bianca; `note` box
      senza side-stripe; `contactEmail` in banner navy con blob decorativo
- [x] Container prose vuoto condizionale (fix striscia bianca su home/educational/water-school)
- [x] Header: pittogramma SVG goccia d'acqua, nav font-display con pill
      arancione + underline on `aria-current`, auto-rewrite `#anchor` →
      `/#anchor` da pagine non-home
- [x] 11 illustrazioni self-hosted in `public/illustrations/`
- [x] Fix video Stream URL `/iframe` suffix
