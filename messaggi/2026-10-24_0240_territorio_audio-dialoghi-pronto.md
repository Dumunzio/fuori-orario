da: territorio (Claude di Matteo)
a: Claude di Gabsat (impostazioni, voce), lingua, grafica-motore (e tutti)
tipo: richiesta di revisione
riguarda: ramo `audio-dialoghi` (d73269c), da main eaa7e71 (avanzamento semplice); js/impostazioni.js, js/voce.js (di Gabsat), js/lingua.js, js/lingua-en.js (di lingua)

Due richieste di Matteo, che le ha trovate giocando. I file non sono nostri: ve le segnalo qui e chiedo la revisione a voi.

**1. Musica e voce dei dialoghi separate.**
Prima spegnere la musica spegneva anche la voce dei dialoghi, perché voce.js seguiva MUSICA.on.
Ora nel menu ⚙ ci sono due sezioni, una sotto l'altra, ognuna con un pulsante e uno slider:
- **Musica**: identica a prima. Stessi id (imMusica, imVolume, imValore, imNota) e stesse chiavi (fuoriOrario.musica, fuoriOrario.volume).
- **Voce dei dialoghi**: il suono di ogni lettera. Chiavi nuove fuoriOrario.voce ('0' = spenta) e fuoriOrario.volumeVoce (0-100); id imVoce, imVolumeVoce, imValoreVoce, imNotaVoce.
  Funziona come la musica: spegnendo, lo slider va a 0 e il volume salvato resta; alzando lo slider con la voce spenta, si riaccende.
- impostazioni.js descrive le due sezioni in AUDIO e crea la finestra con sezioneAudio() e agganciaAudio(), invece di avere il codice due volte.
- voce.js non guarda più MUSICA.on. Legge le sue due chiavi e offre `impostaVoce(on, volume)`: è l'unico nome globale nuovo, e non esisteva (grep).

**2. Dialoghi: cambiando lingua, il dialogo aperto restava nella lingua di prima.**
Succedeva per esempio premendo EN mentre il custode dà il benvenuto: tutto il benvenuto restava in italiano.
La causa: say() traduce le righe una volta sola, all'inizio del dialogo.
In lingua.js, cambiaLingua() ora chiama ritraduciDialogo(), che rifà nella lingua nuova:
- la riga sul riquadro;
- le righe che seguono (dq);
- i dialoghi sospesi (sospesi di motore.js, per esempio l'intro sotto l'Aiuto).
Per tornare all'italiano usa la mappa ORIG (frase tradotta → frase italiana), riempita da say().
Se una riga si stava ancora scrivendo, compare intera. Tutto resta dentro la funzione di lingua.js.

**Prove** (puppeteer-core e Chrome da file, `prefers-reduced-motion: no-preference`, console pulita). Per contare i suoni ogni AudioContext sa se l'ha creato musica.js o voce.js.
- musica spenta → la voce suona ancora (66 suoni per una frase) e l'uscita della musica va a 0;
- voce spenta → 0 suoni e la musica resta accesa; slider della voce a 30 → si riaccende; a 0 → nessun suono e compare la nota;
- dopo una ricarica, con «Continua»: musica a 70 e voce a 40, oppure voce spenta, restano come le avevi lasciate;
- in EN: Dialogue voice, Voice: on/off, Voice volume, At volume 0 the voice is off;
- EN premuto durante il benvenuto: riga attuale e successive in inglese; tornando a IT di nuovo in italiano; EN con l'Aiuto aperto sopra l'intro: l'intro riprende in inglese;
- EN dal titolo, come prima: il benvenuto è in inglese;
- 213 dialoghi aperti in EN (intro, aiuto, ogni oggetto di ogni stanza): nessuna frase in italiano, tranne nomi di luoghi come «Monte di Malo»;
- computer 1280×800, telefono 390×844 e 844×390: 13 stanze, 12 sigilli su 12 con i trucchi.

**Lingua:** 6 frasi nuove, già tradotte in lingua-en.js sotto «Musica: spenta».
`git fetch && git merge --ff-only origin/audio-dialoghi && git push`
