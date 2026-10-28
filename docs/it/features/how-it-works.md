# Come funziona

<div class="wide">

![Come funziona iRoof.top](/how-it-works.svg)

</div>

Ogni esportazione diventa gli stessi messaggi normalizzati. Poi ogni azione del personaggio viene riprodotta al modello come una
**chiamata a strumento**, così impara *come* la persona interagisce, non solo cosa scrive, e risponde nello stesso modo.

## Le azioni come chiamate a strumenti

| Cosa ha fatto il personaggio | Chiamata a strumento nella cronologia e nelle risposte dal vivo |
|---|---|
| bolla di testo, magari una risposta o una citazione parziale | `send_message {text, reply_to?, quote?}` |
| sticker | `send_sticker {sticker_id, reply_to?}` |
| GIF dalla libreria, oppure un URL da uno strumento MCP | `send_gif {gif_id \| url, caption?}` |
| foto, video, voce, audio, file | `send_media {media_id, caption?}` |
| post inoltrato | `forward_message {message_id}` |
| reazione | `react {message_id, emoji}` |
| *(richiamare la cronologia più vecchia)* | `search_history {query}` |

Più chiamate in un turno diventano più bolle. I messaggi dell'altra parte diventano righe compatte a cui fanno riferimento gli id:

```text
#52108 19:08 ↩ risposta a #52107 (tu: "lasagne della nonna 🍝"): Non hai mai fatto le lasagne nemmeno una volta.
<sticker stk_156dbb381a>: un gatto con il cappello da cuoco che mescola una pentola
ha reagito 😂 a #52107 ("lasagne della nonna 🍝")
```

## Il prompt di sistema

| Parte | |
|---|---|
| Chi essere | stimare le conoscenze e lo stile del personaggio, senza mai sapere più di quanto saprebbe lui |
| Profilo di stile | dall'esportazione *intera*: lunghezza dei messaggi, maiuscole, punteggiatura, uso di emoji e sticker, abitudini di risposta e reazione, bolle per turno, esempi testuali |
| Libreria | sticker, GIF e media con come sono stati usati |
| Note | ciò che hai scritto sulla persona |

Il prompt è **statico** per una chat: niente orologio, niente contatori. Il modello legge l'ora dai separatori `— giorno —`
e dalle marcature `HH:MM`, e ogni richiesta è un prefisso identico byte per byte della successiva, quindi le cache dei prompt dei fornitori continuano a funzionare.

## Chat lunghe {#long-chats}

```
 budget della cronologia ──────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ memoria (≤ 350 par.) │ turni recenti, tagliati al 60 % budget │
 └──────────────────────┴────────────────────────────────────────┘
   relazione, fatti,      il punto di taglio resta fermo a lungo,
   temi, battute          quindi lo resta anche il prefisso in cache
```

Quando la cronologia riprodotta supera il budget, la risposta successiva riassume prima i turni più vecchi (e la memoria precedente)
in un breve riepilogo. Non si spende nulla all'importazione né all'apertura di una chat. Il profilo di stile viene comunque dall'intera
esportazione, e `search_history` raggiunge ogni messaggio vecchio. L'`usage` dei token (prompt, cache, completamento) viene mostrato in `{ }`.

## Libreria media

Il modello di chat legge il testo, quindi uno sticker è solo `<sticker stk_…>` finché non viene descritto. **Descrivi con IA** invia
le immagini degli elementi mancanti al modello media, che deve supportare la visione.

* GIF, sticker video e video vengono inviati come **4 fotogrammi in ordine**, così il modello vede il movimento. Serve
  [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`), altrimenti si usa la miniatura.
* **Rifai** descrive di nuovo un elemento. Ogni descrizione può essere modificata a mano.
* Le descrizioni appartengono all'esportazione e servono tutte le sue chat.

Provalo tu stesso con la [CLI](../reference/cli): `rooftop convert <esportazione> --persona "Jonas Weber"`.
