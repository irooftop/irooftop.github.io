# Foto e voce

Alcune persone mandano soprattutto foto, altre parlano soprattutto con messaggi vocali. iRoof.top mantiene entrambe le abitudini.

## Capirle

Nella libreria media, **Descrivi con IA** descrive sticker, GIF e foto e **trascrive i messaggi vocali** con il
*modello media*, che deve accettare immagini e audio. Impostalo nelle Impostazioni o con `OPENAI_MEDIA_MODEL`, per esempio
`google/gemini-3.5-flash-lite` su OpenRouter. Le descrizioni vengono fatte solo quando premi il pulsante, e con un modello locale e la
[Modalità offline](../guide/offline) le foto non lasciano mai il tuo computer.

```text
<messaggio vocale 0:05: «ciò che è stato detto»>
```

Quando un tipo domina, il profilo di stile lo dice, per esempio «parla soprattutto con messaggi vocali (10 su 10)».

### Librerie grandi

Una chat lunga può contenere decine di migliaia di sticker, GIF e foto. La libreria media ti aiuta a spendere i token del modello
dove contano:

| Controllo | Cosa fa |
|---|---|
| Schede per tipo | Tutti, Mancanti, Descritti, Sticker, GIF, Foto, Video, Voce, con i conteggi |
| Ordine | più usati (predefinito), meno usati, usati di recente, usati per primi |
| Numero di usi | nasconde gli elementi usati meno di 2, 3, 5, 10 o 25 volte |
| Ricerca | nelle descrizioni e negli id |

**Descrivi N con IA** descrive esattamente ciò che è mostrato e non ancora descritto, **dall'alto in basso nell'ordine scelto**,
quattro alla volta. Ogni descrizione viene salvata appena arriva. La riga di avanzamento mostra quante sono fatte, gli errori,
la velocità e il tempo rimanente. Lo stesso pulsante diventa **Ferma**: puoi fermarti in qualsiasi momento, e la prossima esecuzione continua
con il resto. Un buon inizio per una chat grande: *Più usati prima* e *Usati 3 o più volte*.

## I tuoi messaggi vocali

Con il campo di scrittura vuoto il pulsante di invio diventa un **microfono**, come in Telegram. La registrazione viene convertita in WAV nel
browser, caricata e trascritta. Anche i visitatori dei link di condivisione possono registrare.

::: info
I browser consentono la registrazione solo su `https://` o `localhost`.
:::

## Le foto e la voce del personaggio

Collega un server MCP che genera immagini e uno che parla:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

Il personaggio riceve allora altre due azioni:

| Azione | Cosa fa |
|---|---|
| `send_voice {text}` | chiama lo strumento vocale (WAV, con nuovo tentativo in mp3) e invia un messaggio vocale |
| `send_photo {prompt, caption?}` | chiama lo strumento di immagini e invia una foto |

* Con uno strumento vocale collegato, i messaggi vocali trascritti del personaggio vengono riprodotti come `send_voice`, così il modello vede
  l'abitudine nella forma che può continuare.
* **Voce** in *Dettagli chat* (per esempio `Puck`) dà al personaggio una voce propria.
* Ogni altra immagine o audio restituito da uno strumento MCP diventa un media della chat `gen_…` (verificato dal contenuto, fino a 25 MB, eliminato
  con la chat).

::: tip Costi
Ogni foto o messaggio vocale è una chiamata a pagamento in più: circa 0,01 $ per immagine con `meta/muse-image`, e pochi secondi di TTS.
:::
