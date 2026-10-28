# Rispondere da Telegram

Un link di condivisione può pubblicare i messaggi dei suoi visitatori in un gruppo Telegram. Rispondi tu lì, oppure l'IA risponde quando
termina un conto alla rovescia. I visitatori vedono lo stesso «sta scrivendo…» in entrambi i casi e non possono capire chi ha risposto: un gioco «umano o IA?», o uno
sportello di assistenza in cui l'IA gestisce le domande ovvie.

```
 visitatore ──▶ link di condivisione ──▶ 🤖 bot ──▶ il tuo gruppo Telegram
                                        ├─ ✍️ Rispondi        rispondi tu
                                        └─ 🤖 Risposta IA (10 s) l'IA risponde subito, o alla fine del conto alla rovescia
```

## Configurazione

**Impostazioni → Telegram** mostra il bot, se è connesso, e ogni gruppo in cui si trova.

| Modalità | Configurazione | I messaggi vanno |
|---|---|---|
| **Bot condiviso** | nessuna | attraverso il relay (iroof.top), in testo semplice come ogni bot |
| **Bot proprio** | crealo con [@BotFather](https://t.me/BotFather), incolla il token e **Connetti** | direttamente tra la tua app e Telegram |
| `TELEGRAM_BOT_TOKEN` | su un server; `TELEGRAM_CHAT_ID` limita i gruppi | direttamente; ha la precedenza sulle Impostazioni |

Poi premi **Aggiungi a un gruppo**:

1. Apri il link nell'**app di Telegram**, in **Telegram Web**, oppure inquadra il codice QR con il telefono. Entrambi i link si possono copiare.
2. Scegli un gruppo (o creane uno) e conferma.
3. La finestra diventa verde, e il gruppo compare nelle Impostazioni e in ogni link di condivisione.

Con il bot condiviso, il link porta un codice monouso, valido un'ora, che collega il gruppo solo alla tua app.

Infine scegli il gruppo sotto **Gruppo Telegram** in un link di condivisione, e imposta dopo quanti secondi l'IA risponde
(`0` = solo quando premi **Risposta IA**).

::: tip Privacy
Nel gruppo vengono pubblicati solo i nuovi messaggi dei visitatori e le risposte dell'IA, mai la cronologia esportata. La Modalità offline disattiva il
bot. Dettagli: [Offline e privacy](../guide/offline#the-telegram-bot).
:::

::: tip Non serve un indirizzo pubblico
Entrambi i tipi di bot usano il long polling, quindi funziona anche da un portatile. Un token di bot funziona in una sola app alla volta.
:::

## Tre modi di rispondere

1. Rispondi al messaggio «✍️ … rispondi a questo messaggio» del bot.
2. Rispondi al messaggio del visitatore (o a una risposta dell'IA) in qualsiasi momento, senza premere **Rispondi**.
3. Premi **Rispondi**, poi scrivi. Per 15 minuti i tuoi messaggi vanno a quel visitatore, e per altri 2 minuti dopo ogni
   risposta, così una risposta può estendersi su più messaggi.

Il terzo modo richiede che il bot veda i normali messaggi del gruppo: disattiva la modalità privacy (@BotFather → `/setprivacy` → Disable, poi
aggiungi di nuovo il bot) oppure rendilo amministratore. I modi 1 e 2 funzionano sempre.

::: warning Usa un gruppo di cui ti fidi
Chiunque nel gruppo può rispondere. Vengono inoltrate solo le risposte testuali, e le risposte dell'IA contano sul limite del link.
:::
