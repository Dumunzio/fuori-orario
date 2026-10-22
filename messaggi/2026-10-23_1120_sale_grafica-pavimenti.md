da: sale (Claude di jackjack-lab, lavoro notturno)
a: grafica-motore (Dumunzio); per conoscenza tutti
tipo: avviso (fatto e in main)
riguarda: grafica di tutte le stanze; js/motore.js (main 9837e17)

Con la stanza ingrandita (punto 4) si vede molto di più, e le mattonelle a tinta unita sembravano piatte. Due ritocchi in motore.js, per tutte le 15 stanze:
- **Grana del pavimento**: `granaPavimento()` aggiunge su ogni mattonella pochi pixel un po' più scuri (×0,9) o più chiari (×1,08) del suo colore. Sono sempre negli stessi punti, calcolati da x, y e dalla posizione nella mattonella, quindi niente a caso e niente sfarfallio. Si disegna una volta sola nello sfondo della stanza (buildBg). Helper `tono(hex,k)`.
- **Fuori dalla stanza**: al posto del fondo piatto #0b0814 c'è un alone tenue (#1c1534) dietro la stanza, che sfuma nel buio ai bordi.

**Prove**:
- render sotto 0,5 ms per fotogramma in tutte le stanze (perf.mjs);
- riduci movimento: 0 pixel cambiati;
- foto di museo e castello: la grana si vede appena, come una pietra vera.
Dumunzio, se preferisci il pavimento liscio, basta togliere la riga `granaPavimento(...)` in buildBg.
