# Checklist Go-Live — Uniacque Educational

**URL preview:** https://uniacque-scuole.pages.dev
**Ultimo commit atteso:** `58eaa78` (24 ott) — "allineamento totale al copy ufficiale Giulia"
**Fonte di verità copy:** `COPY.md` in root del repo (sync Word Giulia).

> Spuntare ciascuna voce aprendo la relativa pagina in **browser normale** e in **mobile emulato** (DevTools → iPhone 12/13).

---

## 0 — Verifica deploy prima di tutto

- [ ] Su CF Pages → progetto `uniacque-scuole` → Deployments → ultimo "Production" deploy = commit `58eaa78` (o successivo), status "Success"
- [ ] Hard refresh (`Cmd+Shift+R`) nel browser per bypassare la cache HTML
- [ ] Visualizzazione pagina sorgente HTML (`view-source:`) sulla home → cerca stringa "Uniacque per le scuole" nel titolo H1. Se non c'è, deploy vecchio ancora servito

---

## 1 — Globale (su ogni pagina)

- [ ] **Header**: logo nuovo "UniAcque EDUCATIONAL" (goccia + wordmark colorato); **nessuno** scritta "Uniacque Edu" testuale accanto
- [ ] Menu desktop con: Educational / Water School / Area didattica / News / Contattaci
- [ ] **Menu mobile**: hamburger apre overlay, chiude con `Esc`, scroll bloccato quando aperto, focus trap funzionante (`Tab` resta dentro)
- [ ] **Footer**: email `educational@uniacque.bg.it`, link **Privacy** → `https://www.uniacque.bg.it/privacy/`, link **Cookie** → `https://www.uniacque.bg.it/chi-siamo/cookie/`, logo partner **Skillherz**
- [ ] **Favicon**: visibile nella tab del browser
- [ ] **Hero in tutte le pagine**: box bianco con **solo** titolo + eyebrow + illustrazione nell'angolo. **NESSUN paragrafo di testo** dentro il box bianco dell'hero (prima era un bug)
- [ ] **Testi non spezzati**: `text-balance` sui titoli, line break naturali
- [ ] **OG preview** (test rapido su https://www.opengraph.xyz/url/https%3A%2F%2Funiacque-scuole.pages.dev): titolo + descrizione + immagine brand

---

## 2 — Home `/`

- [ ] Hero **video** di sfondo (HP/hero.mp4)
- [ ] Box bianco con H1 = **"Uniacque per le scuole"** (NON "Uniacque Educational" come titolo H1)
- [ ] Illustrazione angolo = persona (mc-persona-v2)
- [ ] **Card body sotto l'hero** (fondo pagina `bg-accent-cloud`, card bianca interna) con 4 paragrafi, in ordine:
  1. "L'acqua è la materia della vita…"
  2. "Per questa ragione dal 2021…"
  3. "Un impegno che cresce ogni anno…"
  4. "In questo portale potrai trovare…"
- [ ] 4 box IMG+TXT+CTA "Scopri di più": Educational / Water School / Area didattica / News
- [ ] In fondo: **form di contatto** (destinazione del menu "Contattaci" che scrolla fino a qui)
- [ ] **Mobile HP**: nessuno spazio blu vuoto sopra/sotto il video hero (bug già risolto)

---

## 3 — Educational landing `/educational`

- [ ] Hero foto (Sezione Educational/hero.jpg) → ⚠️ verifica che l'immagine R2 esista
- [ ] Box bianco: titolo "Educational" + illustrazione `graduation.png`
- [ ] Card body con, in quest'ordine:
  1. "Quando una tematica è complessa…"
  2. "Per questo abbiamo costruito un percorso…"
  3. "Ogni attività nasce per un'età precisa…"
- [ ] Griglia 4 card con titolo esatto + descrizione esatta + CTA "Scopri di più":
  - **Sorgente Nossana** → "Un viaggio per scoprire l'origine dell'acqua che arriva nelle nostre case."
  - **Missione Comune** → "Un laboratorio che trasforma la classe in una centrale operativa: ogni scelta ha conseguenze, per tutti."
  - **Educational Center** → "Uno spazio pensato per sporcarsi le mani, osservare e sperimentare il servizio idrico integrato."
  - **Formazione Scuola-Lavoro** → "Un percorso in cui i ragazzi delle scuole superiori entrano nel mondo del lavoro, imparando a raccontare l'acqua con le proprie parole."

---

## 4 — Educational > Sorgente Nossana `/educational/sorgente-nossana`

- [ ] Hero foto (sorgente Nossana) → verifica R2
- [ ] Box bianco: titolo "Sorgente Nossana" + illustrazione **rubinetto** (mc-rubinetto-v2) — ❌ niente "mano mozzata"
- [ ] Card body con intro + "Portare le classi fin qui…"
- [ ] **Modulo separato "Come funziona"** (card bianca con eyebrow arancione) contenente:
  - paragrafo "Una mattinata alla sorgente…"
  - grid info-box: Dove / Cosa include / Durata / Trasporto / Iscrizioni
- [ ] Nota in box warm "Su richiesta, in abbinamento, è possibile prenotare… Maglio Museo"
- [ ] **Doppia CTA Accedi + Registrati** → posizionata **dopo** "Come funziona", **sopra** la Gallery
- [ ] Gallery foto a 3 colonne

---

## 5 — Educational > Missione Comune `/educational/missione-comune`

- [ ] Hero **video** → verifica R2
- [ ] Box bianco: titolo "Missione Comune" + illustrazione **palazzo** (mc-palazzo-v2)
- [ ] Card body con intro + "Missione Comune nasce…" + "È anche per questo…"
- [ ] **Modulo separato "Come funziona"** con paragrafi "La classe diventa…" + "Al termine dell'attività…" + grid 3 info-box (Target / Dove / Formato)
- [ ] **Box blu finale** con testo COMPLETO: "Il laboratorio viene proposto gratuitamente a un gruppo selezionato di classi, nei Comuni soci di Uniacque: a inizio anno scolastico i Comuni coinvolti verranno contattati direttamente per organizzare l'attività. Per ulteriori informazioni è possibile scrivere a **educational@uniacque.bg.it**." (email linkata/sottolineata)
- [ ] ❌ **NESSUNA doppia CTA Accedi/Registrati** su questa pagina (il laboratorio è su invito)
- [ ] Gallery foto

---

## 6 — Educational > Educational Center `/educational/educational-center`

- [ ] Hero foto → verifica R2
- [ ] Box bianco: titolo "Educational Center" + illustrazione **persona** (mc-persona-v2) — ❌ niente "mano mozzata"
- [ ] Card body con intro + "Ogni momento della visita…"
- [ ] **Modulo "Come funziona"** con "Accompagnati da due ambassador…" + "Non solo, tra le tappe…" + grid 5 info-box (Target / Dove / Formato / Accompagnamento / Iscrizioni)
- [ ] **Doppia CTA Accedi + Registrati** sopra la gallery
- [ ] Gallery foto

---

## 7 — Educational > FSL `/educational/fsl`

- [ ] Hero foto → verifica R2
- [ ] Box bianco: titolo "Formazione Scuola-Lavoro" + illustrazione roboto (⚠️ provvisorio, da sostituire quando Giulia manda la nuova)
- [ ] Card body con intro ("Il nostro impegno coinvolge da sempre…") + "Non è quindi solo un modo…"
- [ ] **Modulo "Come funziona"** con **solo** la grid 3 info-box (Target / Formato / Iscrizioni) sotto il titolo — ❌ nessun paragrafo inventato
- [ ] **Doppia CTA Accedi + Registrati** sopra la video gallery
- [ ] **Video gallery FSL**: 12 video Cloudflare Stream, ogni anteprima = **frame diverso del video** (non la stessa copertina)

---

## 8 — Water School landing `/water-school`

- [ ] Hero foto → verifica R2
- [ ] Box bianco: titolo "Water School" + illustrazione vr.png
- [ ] Card body con:
  1. "Da cinque edizioni, dedichiamo una settimana…"
  2. "Un format collaudato che unisce anime diverse…"
  3. "L'ultimo anno scolastico qualcosa si è aggiunto…"
  4. "Creare attività su misura…"
- [ ] Lista "Edizioni" (almeno 2026) con link al dettaglio

---

## 9 — Water School 2026 `/water-school/2026`

- [ ] Hero foto edizione 2026 → verifica R2
- [ ] Box bianco: titolo "WaterSchool — Edizione 2026" + illustrazione vr.png
- [ ] Card body con 4 paragrafi:
  1. "Nel 2026, la giornata dedicata alle scuole…"
  2. "A ogni classe una parola chiave…"
  3. "Il giorno dell'evento, davanti a studenti…"
  4. "Non è un caso che tutto questo sia avvenuto…"
- [ ] ❌ **NESSUN info-box** (durata/temi/format/giuria/premio tolti — non erano nel word)
- [ ] Gallery foto

---

## 10 — Area didattica `/area-didattica`

- [ ] Hero: box bianco con titolo "Area didattica" + eyebrow "Area riservata" + illustrazione mc-eolica (❌ non più uguale a Educational landing)
- [ ] Card body con paragrafo intro: "Accedi all'area riservata per prenotare le attività…"
- [ ] Sotto la card: **doppia CTA Accedi + Registrati**
- [ ] ❌ **Niente altro visibile** da utente non loggato (body "In questa pagina trovi…" + 5 risorse NASCOSTE)
- [ ] Click su "Accedi" → naviga al portale esterno; al ritorno con `?auth=1` nell'URL (o se il portale redirige con quel flag) → **si sbloccano** le risorse
- [ ] **Test manuale gating**: aprire `/area-didattica?auth=1` → vedere card "Risorse" + grid 5 risorse (Approfondimenti / Giochi / Laboratori / Esperimenti / Pillole)
- [ ] Reset gating per retest: in DevTools console → `localStorage.removeItem('uniacque_auth'); location.reload();`

---

## 11 — News `/news`

- [ ] Hero: box bianco con titolo "News" + eyebrow "Aggiornamenti" + illustrazione doc.png
- [ ] Card body con paragrafo "Le storie, gli aggiornamenti e i momenti più significativi del progetto."
- [ ] Griglia **5 articoli**:
  1. Inaugurato Uniacque Educational Center
  2. La Water Week 2024 arriva tra i banchi di scuola
  3. Le nostre attività aspettano i tuoi studenti
  4. Anche quest'anno presenti a BergamoScienza
  5. Novità anno scolastico 2025-2026 — Uniacque arriva nelle classi
- [ ] Ogni card ha: immagine di copertina, titolo, data in italiano, estratto
- [ ] **Dettaglio singolo articolo**: hero image, titolo, data, corpo, eventuale gallery/video, articoli correlati in fondo

---

## 12 — Mobile responsive (iPhone emulato)

- [ ] HP: nessuno spazio blu vuoto sopra/sotto il video
- [ ] Header mobile: hamburger funziona (apre, chiude con Esc o click fuori)
- [ ] Hero su ogni pagina: box bianco + illustrazione **non si sovrappongono male** al titolo
- [ ] Tutti i testi integri (nessun word spezzato in modo brutto)
- [ ] Gallery a 1-2 colonne, non 3
- [ ] CTA Accedi/Registrati facilmente tappabili

---

## 13 — Pre-flight tecnico

- [ ] Lighthouse mobile ≥ 85 su Performance, Accessibility, Best Practices, SEO
- [ ] `view-source:` → `<meta name="description">` presente su ogni pagina
- [ ] OG tags: `og:title`, `og:description`, `og:image` presenti
- [ ] Nessun errore in console browser (F12 → tab Console)
- [ ] Form "Contattaci" → compilare + invio di prova → arriva mail
- [ ] HTTPS attivo (lucchetto verde)

---

## 14 — Open points residui (da verificare con Giulia prima del go-live)

- [ ] Illustrazione **FSL** definitiva (ora `roboto.png` è provvisorio)
- [ ] Copy "Come funziona" **FSL** se c'è un paragrafo di testo da aggiungere oltre ai 3 box
- [ ] Immagini R2 di tutti gli hero disponibili nel bucket (⚠️ Giulia segnala "alcune non visibili")
- [ ] Comportamento esatto del flusso di login (il portale esterno sa redirigere con `?auth=1`?)
- [ ] Dominio definitivo (`educational.uniacque.bg.it` o `scuole.uniacque.bg.it`) + DNS

---

## 15 — Immagini hero mancanti (da controllare nel bucket R2)

Path attesi nel bucket:

- `HP/hero.mp4` + `HP/hero-poster.jpg`
- `HP/box-educational.jpg`, `HP/box-water-school.jpg`, `HP/box-area-didattica.jpg`, `HP/box-news.jpg`
- `Sezione Educational/hero.jpg`
- `Sezione Educational/Formazione Scuola-Lavoro/Sorgente Nossana/hero.jpg`
- `Sezione Educational/Formazione Scuola-Lavoro/Missione Comune/hero.mp4` + `hero-poster.jpg`
- `Sezione Educational/Educational Center/hero.jpg`
- `Sezione Educational/Formazione Scuola-Lavoro/hero.jpg`
- `Sezione Water Week/hero.jpg`
- `Sezione Water Week/Edizione 2026/hero.jpg`
- cover + gallery di ogni articolo news

Se qualcuno di questi file manca, l'hero rimane "vuoto" o rotto → **Giulia lo vedrà come header senza immagine**.
