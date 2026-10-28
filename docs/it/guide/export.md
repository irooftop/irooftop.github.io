# Esportare una chat

<div class="wide">

![Telegram Desktop: apri la chat, clicca su ⋯ in alto a destra, scegli Esporta cronologia chat…, poi Esporta](/img/telegram-export.svg)

</div>

## Telegram

In **Telegram Desktop** (macOS, Windows, Linux): apri la chat → **⋯** → **Esporta cronologia chat…** → **Esporta**.

* Tieni attivi foto, video, messaggi vocali, sticker e GIF: il personaggio li usa.
* Entrambi i formati funzionano: **HTML** (`messages.html`) e **JSON** leggibile dalle macchine (`result.json`).
* Trascina nella pagina la cartella dell'esportazione, o un suo `.zip`.

## WhatsApp

Sul telefono: apri la chat → **⋮ → Altro → Esporta chat** (iPhone: tocca il nome del contatto → **Esporta chat**) →
**Includi media**. Invia lo `.zip` al tuo computer e trascinalo nella pagina.

Una chat esportata senza media è un singolo `.txt`, e funziona comunque.

## Esportazioni grandi

Le esportazioni di oltre 100.000 messaggi e di molti gigabyte funzionano allo stesso modo: trascina la cartella. La pagina mostra cosa sta succedendo:

1. **Lettura della cartella…** conta i file (il browser può impiegare un po' a elencarne decine di migliaia).
2. **Prima va la chat.** Le pagine dei messaggi (o `result.json`, o il `.txt` di WhatsApp) vengono caricate e lette prima dei media. Se questa esportazione è **già importata**, l'importazione termina qui e la apre, e nessun media viene caricato. Se i media non entrano nel disco, ti viene detto quanto spazio serve prima di inviare qualcosa di grande.
3. **Caricamento di 1,2 GB su 3,4 GB (35%) · 9.000 file su 30.905**: i media seguono a piccoli gruppi, uno dopo l'altro. Il browser non costruisce mai un'unica richiesta enorme, e un gruppo interrotto viene ritentato da solo. Non c'è alcun limite di dimensione quando lo esegui sul tuo computer.
4. **Lettura dei messaggi: pagina 37 di 121 · 36.000 messaggi**: tutte le pagine vengono lette una volta, in parallelo.
5. **Controllo dei media** e **Spostamento dei media**: i file vengono sottoposti a hash per trovare i duplicati e spostati (non copiati due volte) nella cartella dati.
6. **Salvataggio**, poi si apre la finestra *Nuova chat*.

Gira una sola importazione alla volta; un errore resta visibile nell'area di trascinamento e puoi scegliere di nuovo la cartella.

Nell'[app desktop](./desktop) questo caricamento non avviene: l'app legge la cartella, lo `.zip` o il `.txt` da dove si trovano
(passi 4–6), il che è più veloce e non risente dei problemi del browser qui sotto.

::: details Quando un file non può essere caricato (browser)
Un file che il browser non riesce più a leggere (spostato, modificato, oppure un segnaposto di iCloud/OneDrive non scaricato) viene individuato e saltato, così come un singolo file che continua a far fallire il suo gruppo: il gruppo viene diviso finché il file non è isolato. I media saltati compaiono come mancanti nella chat; il messaggio dopo l'importazione ne nomina uno, e la console del browser le elenca tutte. Quando il file di chat stesso non può essere inviato, l'importazione si ferma e lo indica. Gli errori dicono cosa ha ricevuto il server, per esempio `il server ha ricevuto 1.200 di 4.096 byte`, così un problema di connessione o del browser si distingue facilmente.
:::

Durante un'importazione nulla lascia il tuo computer e nessun modello viene chiamato. I media vengono descritti solo quando premi **Descrivi** nella libreria media.

Con `rooftop --import <cartella>` la cartella viene letta sul posto e i suoi file vengono copiati, mai spostati; l'avanzamento viene registrato nel log.
Per un'esportazione enorme sullo stesso computer è il modo più rapido: nessun caricamento e nessuna seconda copia in una cartella temporanea.

## Cosa viene riconosciuto

| Origine | File |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (usato quando una cartella non ha `messages.html`) |
| WhatsApp | `WhatsApp Chat with <nome>.txt` (Android) o `_chat.txt` (iOS), in una cartella, in uno `.zip` o da solo |

* **Telegram**: testo con a capo, link, citazioni e codice; risposte e citazioni parziali; inoltri; modifiche; messaggi di servizio;
  reazioni; anteprime dei link; foto, video, video rotondo, messaggio vocale, audio, file, sticker (`.webp`, `.webm`,
  `.tgs`), GIF, posizione, contatto, sondaggio e chiamata.
* **WhatsApp**: formati Android e iOS, orologi a 12 e 24 ore e entrambi gli ordini giorno/mese, rilevati per file.
  Messaggi su più righe, modifiche e allegati vengono mantenuti. I messaggi eliminati e l'avviso di crittografia vengono saltati,
  e `<Media omitted>` viene contrassegnato come non disponibile.

I file multimediali vengono sottoposti a hash, quindi uno sticker inviato cinque volte diventa un unico elemento della libreria (`stk_…`, `gif_…`, `pho_…`).

::: info Reazioni negli export HTML
Gli export HTML non dicono chi ha reagito. Nelle chat uno a uno una reazione viene attribuita all'altro partecipante, e a entrambi quando il conteggio è 2.
:::
