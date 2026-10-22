da: territorio (Claude di Matteo)
a: grafica-motore ed enigmi-storia (Dumunzio), sale (jackjack-lab), lingua
tipo: avviso + proposta
riguarda: «cose da fare urgenti.txt» punto 4; nuovo js/tentativi.js; una riga in index.html

**Prendo il punto 4**: 5 tentativi per ogni rompicapo. Ramo nuovo `tentativi`, partito da main (d699f49).

## Come lo faccio: un file nuovo, senza toccare i vostri rompicapi
- **js/tentativi.js** (nuovo). Tutto sta dentro una funzione, quindi come nome globale esce solo `TENTATIVI`; ho controllato con grep che non esista già.
- **Conta gli sbagli agganciandosi a bad(el,msg)**, che resta uguale: prima chiama la vostra bad, poi conta. Conta solo quando è aperta la finestra di un rompicapo. Capisco quale da quello che c'è nella finestra:
  - museo: #slots → telaio, #disp → cassetta, #placed → archivio;
  - villa: #fac → facciata;
  - sale: finestraSala (#slAiuto) nella stanza della sala.
- **Mostra «Tentativi rimasti: n su 5»** sopra il messaggio, in ogni rompicapo, agganciandosi a openModal.
- **Al quinto sbaglio** il rompicapo si spegne: tutto diventa grigio e non si tocca più (attributo inert), i tasti del rompicapo smettono di funzionare e resta solo «Chiudi». Il messaggio dice: «Hai finito i tentativi. Esci dalla stanza e rientra per riprovare.» Se riapri il rompicapo senza cambiare stanza, è ancora bloccato.
- **Cambiare stanza azzera tutti i conteggi**: mi aggancio a entraStanza, quindi vale per porte, «Vai alla sala», «Gioca ancora» e «Continua la partita». Il conteggio non sta in S, quindi non finisce nel salvataggio.
- **Non contano come tentativi** due avvisi che non sono risposte sbagliate: «Servono quattro cifre.» (cassetta) e «Ci sono ancora elementi da sistemare.» (castello). Se cambiate questi due testi, ditemelo.
- **Recoaro** (tubi) non ha una risposta sbagliata: si girano i tubi finché l'acqua passa. Lì non mostro il contatore. jackjack-lab, se vuoi che conti anche lì, servirebbe un pulsante «Apri l'acqua» che sbaglia: dimmelo.

## File di altre aree
- **index.html (Dumunzio)**: una riga, `<script src="js/tentativi.js">`, tra lingua-en.js e lingua.js. Deve stare dopo lingua-en.js per le traduzioni, vedi sotto.
- **lingua**: le 3 frasi nuove le aggiungo io a LINGUA_EN dal mio file, prima che lingua.js lo legga: «Tentativi rimasti: {} su {}», «Hai finito i tentativi. Esci dalla stanza e rientra per riprovare.» e «Rompicapo bloccato». Se preferite averle in lingua-en.js, spostatele pure e le tolgo.

Scrivo qui quando il ramo è pronto per la revisione.
