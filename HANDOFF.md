# Piano di consegna — Uniacque Educational

**Stato attuale (2026-10-26):** sito funzionalmente completo e live su
`https://uniacque-scuole.pages.dev` (Cloudflare Pages, auto-deploy da branch
`main`). Rimane un solo blocco esterno: **DNS Uniacque** e scelta del
subdomain definitivo.

Questo file documenta la strategia di handoff + i draft delle email da
inviare per sbloccare il go-live. Mantenere allineato con `TODO.md`
sez. "Blocker esterni".

---

## Strategia in 5 step

### Step 1 — Showoff cliente su preview
Demo e approvazione contenuti/UX su `https://uniacque-scuole.pages.dev`.
Il sito è completo; il dominio finale è solo "vestito grafico" sopra.
Nessun deploy serve dopo l'approvazione se non si cambia copy.

### Step 2 — Email ad Antonio Sarti Deponti (Uniacque Comunicazione)
Deve scegliere il **nome del subdomain**. Senza questa decisione non si
muove nessun record DNS. Tono: non tecnico, due opzioni chiare + default
consigliato. Draft sotto.

### Step 3 — Email ad Andrea Gamba (Uniacque IT), cc Antonio
Elenco completo e puntuale dei record DNS da inserire (CNAME/TXT/MX),
raggruppati in un'unica richiesta per minimizzare il round-trip (Andrea
ha rifiutato subdomain delegation per policy — ogni record va chiesto
singolarmente). Draft sotto.

### Step 4 — Operazioni post-DNS lato nostro (~15 min)
Da fare appena Andrea conferma inserimento record:

1. Cloudflare Pages → progetto `uniacque-scuole` → Custom domains →
   aggiungi `<subdomain>.uniacque.bg.it`
2. Se il nome scelto è ≠ `scuole`: aggiornare `astro.config.mjs` →
   campo `site` + push su `main` per rigenerare `sitemap.xml`
3. Cloudflare R2 → bucket `uniacque-scuole-assets` → Settings →
   Custom Domains → collega `cdn.<subdomain>.uniacque.bg.it`
4. Cloudflare Pages → env Production + Preview →
   aggiornare `PUBLIC_R2_BASE_URL` → `https://cdn.<subdomain>.uniacque.bg.it`
5. Resend → Domains → aggiungi `<subdomain>.uniacque.bg.it`, attendi
   verifica SPF/DKIM, poi aggiornare `CONTACT_FROM_EMAIL` in env Pages
   → `no-reply@<subdomain>.uniacque.bg.it`
6. Re-deploy Pages (basta un empty commit o un "Retry deployment")
7. Smoke test: home, form contatti (deve arrivare mail), 2-3 pagine
   programma, Area Didattica con `?auth=1`

### Step 5 — Handoff finale a Giulia Vaini (Edoomark)
Email recap strutturata con tutto quanto consegnato: codice, hosting,
DNS, Resend, env, analytics, accessi. Da inviare **solo** quando tutti
i punti sopra sono chiusi, per evitare giri multipli. Draft sotto.

---

## Draft #1 — Email ad Antonio Sarti Deponti

**A:** antonio.sartideponti@uniacque.bg.it
**Cc:** giulia.vaini@edoomark.com
**Oggetto:** Uniacque Educational — scelta nome del sito

Ciao Antonio,

ti scrivo perché siamo alle battute finali del nuovo sito Uniacque
Educational. Prima di collegare il dominio ufficiale avrei bisogno di
una tua decisione: come vogliamo chiamare l'indirizzo del sito?

Le due opzioni in gioco sono:

- **educational.uniacque.bg.it** — in continuità con la denominazione
  attuale e con il naming del progetto (Uniacque Educational)
- **scuole.uniacque.bg.it** — più immediato per il pubblico scolastico
  a cui ci rivolgiamo (insegnanti, famiglie)

Se non hai preferenze particolari, io andrei su
**educational.uniacque.bg.it**: tiene insieme il brand del progetto
("Educational") con l'URL, e Andrea Gamba la riconoscerà subito come
subdomain di continuità.

Nel frattempo il sito è già visibile e navigabile qui:
https://uniacque-scuole.pages.dev — puoi dare un'occhiata quando vuoi.

Appena mi confermi il nome, scrivo ad Andrea Gamba con l'elenco
tecnico dei record DNS da inserire e in pochi giorni siamo online
sul dominio ufficiale.

Grazie!
Marco

---

## Draft #2 — Email ad Andrea Gamba

**A:** andrea.gamba@uniacque.bg.it
**Cc:** antonio.sartideponti@uniacque.bg.it, acadu@imteam.it, aperez@imteam.it, giulia.vaini@edoomark.com
**Oggetto:** Uniacque Educational — richiesta inserimento record DNS su `uniacque.bg.it`

> **Nota consegna:** inviare come **reply al thread del 2 ott 2026**
> ("Uniacque - Delega DNS 'Sito educational Uniacque'") per mantenere
> il contesto della decisione iniziale (Andrea = modello record puntuali,
> Antonio = conferma attività).

Ciao Andrea,

come concordato, invio in un'unica richiesta tutti i record DNS da
inserire sulla zona `uniacque.bg.it` per mandare in produzione il
nuovo sito **Uniacque Educational**.

Il subdomain scelto da Antonio è: **`<SUBDOMAIN>`.uniacque.bg.it**
*(sostituire con `educational` o `scuole` secondo quanto deciderà Antonio)*

Di seguito l'elenco completo dei record, raggruppati per servizio.

---

### 1) Sito web — Cloudflare Pages

Serve a puntare il subdomain al nostro deploy su Cloudflare Pages.

| Tipo  | Nome                                | Valore                       | TTL  | Proxy |
|-------|-------------------------------------|------------------------------|------|-------|
| CNAME | `<SUBDOMAIN>`                       | `uniacque-scuole.pages.dev`  | Auto | No    |

> Nota: una volta inserito il CNAME, dovrò collegare lato Cloudflare
> Pages il custom domain `<SUBDOMAIN>.uniacque.bg.it` e la validazione
> sarà automatica (Cloudflare emette il certificato TLS). Non serve
> altro da parte tua su questo punto.

---

### 2) CDN immagini — Cloudflare R2 (opzionale ma consigliato)

Oggi le immagini del sito sono servite da un URL tecnico Cloudflare
(`pub-13224ea6388147de83adf583fe26b9fb.r2.dev`). Vorremmo esporle
sotto un sottodominio brandizzato per pulizia e cache control.

| Tipo  | Nome                     | Valore                                                | TTL  | Proxy |
|-------|--------------------------|-------------------------------------------------------|------|-------|
| CNAME | `cdn.<SUBDOMAIN>`        | *(valore fornito da Cloudflare R2 al momento del setup, nel formato `<bucket>.<hash>.r2.cloudflarestorage.com` o endpoint custom hostname R2)* | Auto | No    |

> Se preferisci evitare questo passaggio, possiamo tenere l'URL R2
> attuale senza impatto funzionale: segnamelo e saltiamo il record.

---

### 3) Invio email transazionali — Resend (form contatti)

Il form "Contattaci" del sito invia una mail a
`educational@uniacque.bg.it` tramite il provider Resend. Oggi
usiamo un mittente provvisorio `no-reply@edoolearning.com` (dominio
di Edoomark già verificato). Per il go-live vorremmo spostarlo su
`no-reply@<SUBDOMAIN>.uniacque.bg.it` così da avere mittente coerente
con il dominio del sito.

Resend richiede 3 record per verificare il dominio. I **valori esatti**
verranno generati automaticamente da Resend quando aggiungerò il
dominio sul loro pannello (DKIM key diversa per ogni dominio), quindi
te li giro con una mail di follow-up appena li ho sotto mano. Per
anticiparti, lo schema è questo:

| Tipo | Nome                               | Valore                                     | TTL  | Proxy |
|------|------------------------------------|--------------------------------------------|------|-------|
| MX   | `send.<SUBDOMAIN>`                 | `feedback-smtp.eu-west-1.amazonses.com` (priority 10) | Auto | No    |
| TXT  | `send.<SUBDOMAIN>`                 | `v=spf1 include:amazonses.com ~all`        | Auto | No    |
| TXT  | `resend._domainkey.<SUBDOMAIN>`    | *(DKIM key — ~400 caratteri, giro il valore esatto in follow-up)* | Auto | No    |

> Opzionale, consigliato per policy anti-spoofing:
> | TXT | `_dmarc.<SUBDOMAIN>` | `v=DMARC1; p=none; rua=mailto:dmarc@uniacque.bg.it` | Auto | No |

> Se preferisci evitare questo blocco mantenendo il mittente
> `no-reply@edoolearning.com`, dimmelo: funziona già oggi e la mail
> arriva comunque in casella `educational@uniacque.bg.it`.

---

### Riepilogo richiesta minima (solo sito, senza R2 e Resend)

Se vuoi partire col minimo indispensabile per andare live, basta
inserire **solo il CNAME del punto (1)**:

| Tipo  | Nome                | Valore                       |
|-------|---------------------|------------------------------|
| CNAME | `<SUBDOMAIN>`       | `uniacque-scuole.pages.dev`  |

Gli altri record si possono aggiungere in un secondo momento senza
impatto sul sito pubblico.

---

Resto a disposizione per qualsiasi dubbio o se preferisci un formato
diverso dei record (es. zone file BIND).

Grazie per il supporto,
Marco

*(sviluppo@edoomark.com)*

---

## Draft #3 — Email di handoff a Giulia Vaini

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
- URL definitivo: `https://<SUBDOMAIN>.uniacque.bg.it`
- URL preview tecnico (sempre attivo): `https://uniacque-scuole.pages.dev`
- Repository: `github.com/Edoomark/uniacque` (branch `main` =
  produzione, push → auto-deploy su Cloudflare Pages)

### Hosting e infrastruttura
- **Cloudflare Pages**: progetto `uniacque-scuole`, piano Free,
  build automatica da `main`.
- **Cloudflare R2**: bucket `uniacque-scuole-assets`, immagini e
  video esposti via `https://cdn.<SUBDOMAIN>.uniacque.bg.it`.
- **Cloudflare Stream**: Starter Bundle, 12 video FSL caricati,
  subdomain `customer-vg6r6z68e7cwtk8f.cloudflarestream.com`.

### DNS su `uniacque.bg.it`
Record inseriti da **Andrea Gamba** (Uniacque IT) il *<DATA>*.
Elenco preciso dei record attivi: vedi email del *<DATA>* ad Andrea
(oppure il file `HANDOFF.md` nel repo).

### Email transazionali (form contatti)
- Provider: **Resend**
- Mittente: `no-reply@<SUBDOMAIN>.uniacque.bg.it` (dominio verificato)
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
