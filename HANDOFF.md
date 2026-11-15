# Piano di consegna — Uniacque Educational

**Stato attuale (2026-11-15):** sito funzionalmente completo e live su
`https://uniacque-scuole.pages.dev` (Cloudflare Pages, auto-deploy da branch
`main`). **Go-live approvato da Giulia Vaini il 2026-11-15.**

**Subdomain definitivo:** `educational.uniacque.bg.it` — continuità con
l'attuale sito Wix (confermato implicitamente da Antonio Sarti Deponti
nel thread DNS del 2026-10-02, dove riferisce esplicitamente al dominio
`www.educational.uniacque.bg.it` come oggetto dell'attività). `astro.config.mjs`
già aggiornato di conseguenza.

**Cosa resta:** switch del record `educational.uniacque.bg.it` da Wix a
Cloudflare Pages, gestito da Andrea Gamba (Uniacque IT governance) +
Alexandru Cadu / IMteam (operatore tecnico sul DNS autoritativo).

Questo file documenta la strategia di handoff + i draft delle email da
inviare per sbloccare il go-live. Mantenere allineato con `TODO.md`
sez. "Blocker esterni".

---

## Strategia in 4 step

### Step 1 — Showoff cliente su preview *(fatto)*
Demo e approvazione contenuti/UX su `https://uniacque-scuole.pages.dev`.
Approvazione Giulia Vaini: 2026-11-15.

### Step 2 — Email ad Andrea Gamba (Uniacque IT) — nuovo thread
Richiesta di **sostituzione del CNAME `educational.uniacque.bg.it`** (oggi
→ Wix) con il nuovo target Cloudflare Pages, in un'unica richiesta che
include anche i record opzionali (CDN R2, Resend). Cc Antonio Sarti
Deponti + IMteam (Alexandru Cadu, Alex Perez).

**Non** si risponde al thread del 2 ott 2026 (era chiuso a livello
decisionale); si apre un nuovo thread operativo. Draft sotto.

### Step 3 — Operazioni post-DNS lato nostro (~15 min)
Da fare appena Andrea / IMteam confermano lo switch del CNAME:

1. Cloudflare Pages → progetto `uniacque-scuole` → Custom domains →
   aggiungi `educational.uniacque.bg.it` (validazione automatica,
   Cloudflare emette certificato TLS)
2. `astro.config.mjs` già su `https://educational.uniacque.bg.it`;
   verificare che `sitemap.xml` e canonical URL puntino al dominio
   corretto dopo il prossimo deploy
3. Cloudflare R2 → bucket `uniacque-scuole-assets` → Settings →
   Custom Domains → collega `cdn.educational.uniacque.bg.it`
   *(solo se CNAME `cdn.*` è stato inserito)*
4. Cloudflare Pages → env Production + Preview →
   aggiornare `PUBLIC_R2_BASE_URL` → `https://cdn.educational.uniacque.bg.it`
5. Resend → Domains → aggiungi `educational.uniacque.bg.it`, attendi
   verifica SPF/DKIM, poi aggiornare `CONTACT_FROM_EMAIL` in env Pages
   → `no-reply@educational.uniacque.bg.it`
6. Re-deploy Pages (basta un empty commit o un "Retry deployment")
7. Smoke test: home, form contatti (deve arrivare mail), 2-3 pagine
   programma, Area Didattica con `?auth=1`

### Step 4 — Handoff finale a Giulia Vaini (Edoomark)
Email recap strutturata con tutto quanto consegnato: codice, hosting,
DNS, Resend, env, analytics, accessi. Da inviare **solo** quando tutti
i punti sopra sono chiusi, per evitare giri multipli. Draft sotto.

---

## Draft #1 — Email ad Andrea Gamba (nuovo thread)

**A:** andrea.gamba@uniacque.bg.it
**Cc:** antonio.sartideponti@uniacque.bg.it, acadu@imteam.it, aperez@imteam.it
**Oggetto:** Uniacque Educational — go-live nuovo sito e sostituzione record DNS

Ciao Andrea,

riprendo il filo rispetto allo scambio di inizio ottobre sul nuovo sito
**Uniacque Educational**: lo sviluppo è concluso, i contenuti sono stati
approvati lato cliente e siamo pronti al go-live. Il dominio finale
resta quello attuale, **`educational.uniacque.bg.it`** (in continuità
con il sito esistente), quindi l'operazione da fare è una **sostituzione
del CNAME oggi puntato su Wix** con il nuovo target Cloudflare Pages.

Ti riepilogo tutto in un'unica richiesta così puoi valutarla in un colpo
solo, come da modello che avevi indicato (record puntuali sul DNS
autoritativo). Metto in copia anche Alexandru e Alex (IMteam) per la
parte operativa.

---

### 1) Sito web — sostituzione CNAME `educational.uniacque.bg.it`

È il record che oggi serve il sito Wix. Va sostituito con il nuovo
target Cloudflare Pages.

| Tipo  | Nome           | Valore attuale (da sostituire) | Nuovo valore                 | TTL  | Proxy |
|-------|----------------|--------------------------------|------------------------------|------|-------|
| CNAME | `educational`  | *(record Wix attuale)*         | `uniacque-scuole.pages.dev`  | Auto | No    |

> Appena la modifica è propagata, lato Cloudflare Pages collego il
> custom domain `educational.uniacque.bg.it` e la validazione del
> certificato TLS è automatica. Nessuna azione aggiuntiva da parte vostra.
>
> **Finestra di cutover**: se possibile, abbassare il TTL del record
> attuale a 300s qualche ora prima dello switch riduce al minimo la
> coda di propagazione (10-15 min invece di qualche ora). Non è
> indispensabile — fattibile anche a TTL standard, basta mettere in
> conto qualche ora di convivenza tra vecchio e nuovo.

---

### 2) CDN immagini — nuovo CNAME `cdn.educational.uniacque.bg.it` *(opzionale)*

Oggi le immagini del sito sono servite da un URL tecnico Cloudflare
(`pub-13224ea6388147de83adf583fe26b9fb.r2.dev`). Vorremmo esporle
sotto un sottodominio brandizzato per pulizia e cache control.

| Tipo  | Nome              | Valore                                                              | TTL  | Proxy |
|-------|-------------------|---------------------------------------------------------------------|------|-------|
| CNAME | `cdn.educational` | *(endpoint custom hostname R2 — vi giro il valore esatto se decidete di procedere)* | Auto | No    |

> Se preferite evitare questo passaggio, possiamo tenere l'URL R2
> attuale senza impatto funzionale: segnatelo e saltiamo il record.

---

### 3) Invio email transazionali — nuovi record Resend *(opzionale)*

Il form "Contattaci" del sito invia una mail a
`educational@uniacque.bg.it` tramite il provider Resend. Oggi usiamo
un mittente provvisorio `no-reply@edoolearning.com` (dominio Edoomark
già verificato). Per il go-live vorremmo spostarlo su
`no-reply@educational.uniacque.bg.it` così da avere mittente coerente
con il dominio del sito.

Resend richiede 3 record per verificare il dominio. I **valori esatti**
vengono generati da Resend quando aggiungo il dominio sul loro pannello
(DKIM key diversa per ogni dominio), quindi te li giro con un follow-up
appena li ho sotto mano. Per anticiparti, lo schema è:

| Tipo | Nome                               | Valore                                     | TTL  | Proxy |
|------|------------------------------------|--------------------------------------------|------|-------|
| MX   | `send.educational`                 | `feedback-smtp.eu-west-1.amazonses.com` (priority 10) | Auto | No    |
| TXT  | `send.educational`                 | `v=spf1 include:amazonses.com ~all`        | Auto | No    |
| TXT  | `resend._domainkey.educational`    | *(DKIM key — ~400 caratteri, giro il valore esatto in follow-up)* | Auto | No    |

> Opzionale, consigliato per policy anti-spoofing:
> | TXT | `_dmarc.educational` | `v=DMARC1; p=none; rua=mailto:dmarc@uniacque.bg.it` | Auto | No |

> Se preferite evitare questo blocco mantenendo il mittente
> `no-reply@edoolearning.com`, ditemelo: funziona già oggi e la mail
> arriva comunque in casella `educational@uniacque.bg.it`.

---

### Riepilogo richiesta minima (solo sito, senza R2 e Resend)

Se preferite partire col minimo indispensabile per andare live, basta
la sostituzione del CNAME del punto (1):

| Tipo  | Nome           | Nuovo valore                 |
|-------|----------------|------------------------------|
| CNAME | `educational`  | `uniacque-scuole.pages.dev`  |

Gli altri record si possono aggiungere in un secondo momento senza
impatto sul sito pubblico.

---

Resto a disposizione per qualsiasi dubbio o se preferite un formato
diverso dei record (es. zone file BIND).

Grazie per il supporto,
Marco

*(sviluppo@edoomark.com)*

---

## Draft #2 — Email di handoff a Giulia Vaini

> Da inviare **solo dopo** la chiusura di tutti i punti tecnici
> (DNS live, Resend sul dominio Uniacque, env Pages aggiornate,
> smoke test ok). Lo scopo è lasciarle un documento operativo per
> gestire il rapporto con Uniacque in autonomia.

**A:** giulia.vaini@edoomark.com
**Oggetto:** Uniacque Educational — handoff finale e documentazione

Ciao Giulia,

ti riepilogo lo stato finale del progetto Uniacque Educational, con
tutti i riferimenti operativi che ti servono per gestirlo in
autonomia d'ora in avanti.

### Sito pubblico
- URL definitivo: `https://educational.uniacque.bg.it`
- URL preview tecnico (sempre attivo): `https://uniacque-scuole.pages.dev`
- Repository: `github.com/Edoomark/uniacque` (branch `main` =
  produzione, push → auto-deploy su Cloudflare Pages)

### Hosting e infrastruttura
- **Cloudflare Pages**: progetto `uniacque-scuole`, piano Free,
  build automatica da `main`.
- **Cloudflare R2**: bucket `uniacque-scuole-assets`, immagini e
  video esposti via `https://cdn.educational.uniacque.bg.it`.
- **Cloudflare Stream**: Starter Bundle, 12 video FSL caricati,
  subdomain `customer-vg6r6z68e7cwtk8f.cloudflarestream.com`.

### DNS su `uniacque.bg.it`
CNAME `educational` sostituito (da Wix a Cloudflare Pages) il *<DATA>*.
Elenco preciso dei record attivi: vedi email del *<DATA>* ad Andrea
Gamba (oppure il file `HANDOFF.md` nel repo).

### Email transazionali (form contatti)
- Provider: **Resend**
- Mittente: `no-reply@educational.uniacque.bg.it` (dominio verificato)
- Destinatario: `educational@uniacque.bg.it`
- API key presente nelle env di Cloudflare Pages (Production + Preview)

### Analytics
- Cloudflare Web Analytics attivo via snippet condizionale
  (`PUBLIC_WEB_ANALYTICS_TOKEN` nelle env Pages).

### Flusso redazionale news
Documentato in dettaglio in `README.md` del repo, sezione
"Flusso redazionale news": file markdown + upload R2 + commit →
auto-deploy. Posso girare un tutorial se serve.

### Punti ancora aperti / nice-to-have
- Illustrazione definitiva per la pagina **FSL** (ora placeholder
  `roboto.png`)
- OG image brand Uniacque dedicata (1200×630 PNG) — ora c'è un
  fallback generico
- Attivazione **Image Transformations** lato account Cloudflare
  (richiede piano Pro, codice già pronto, opt-in via env var)

### Referenti operativi lato Uniacque
- **Comunicazione / contenuti**: Antonio Sarti Deponti
- **IT / DNS**: Andrea Gamba
- **Fornitore IT**: Alexandru Cadu + Alex Perez (teamQUALITY /
  Gruppo IMteam) — in cc per visibilità

Resto a disposizione per il passaggio di consegne, anche con una
call se preferisci.

Un abbraccio,
Marco

---

## Riferimenti incrociati

- `TODO.md` → sez. "Blocker esterni" (DNS Uniacque)
- `CHECKLIST-GOLIVE.md` → sez. 14 (Open points residui)
- Memoria `reference_dns_uniacque.md` → catena di contatto completa
- Memoria `project_handoff_giulia.md` → promemoria email finale a Giulia
