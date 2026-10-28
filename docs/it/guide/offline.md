# Offline e privacy

iRoof.top conserva le tue chat sul tuo computer. Con un modello che gira anch'esso sul tuo computer, **niente deve uscirne**.
La **Modalità offline** trasforma questo in una regola che l'app impone, non in un'abitudine.

## Cosa succede in locale

| Passo | Dove viene eseguito | Rete |
|---|---|---|
| Importazione, analisi, profilo di stile | il tuo computer | nessuna |
| Archiviazione | file JSON e media nella cartella dati | nessuna |
| Ricerca nella cronologia, PIN dei link, libreria media | il tuo computer | nessuna |
| Descrizione di foto, sticker, GIF, video | il **modello media**, solo quando premi **Descrivi con IA** | una richiesta per elemento all'endpoint del modello |
| Trascrizione vocale | il modello media, quando premi **Descrivi con IA** su un messaggio vocale, o ne registri uno | una richiesta all'endpoint del modello |
| Una risposta | il **modello di chat**, quando invii un messaggio (o lo invia un visitatore) | richieste all'endpoint del modello |
| Compattazione di una cronologia lunga | il modello di chat, come parte di una risposta, quando la cronologia supera il budget | una richiesta extra all'endpoint del modello |

L'importazione non chiama mai un modello. La prima chiamata avviene quando invii un messaggio, premi **Descrivi** o registri un
messaggio vocale. Una risposta invia al modello la cronologia esportata (fino al [budget della cronologia](../reference/configuration#settings-only)),
il profilo di stile e le descrizioni dei media. Quindi **dove gira il modello decide dove va la tua chat**: un endpoint nel cloud la riceve, un modello sul tuo computer no.

## Funzionamento solo offline

1. Installa [Ollama](https://ollama.com) o [LM Studio](https://lmstudio.ai), oppure avvia `llama-server` di llama.cpp.
2. Scarica un **modello di chat che supporti le chiamate agli strumenti**, e un **modello di visione** se vuoi che foto e sticker vengano descritti.
3. In **Impostazioni** scegli l'endpoint e il modello, poi attiva **Offline**:

| Server | URL base |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| `llama-server` di llama.cpp | `http://localhost:8081/v1` (la sua porta predefinita `8080` è quella di iRoof.top: avvialo con `llama-server --port 8081`) |

4. Premi **Prova**. Invia una piccola richiesta e mostra il modello e l'host che hanno risposto. Puoi spegnere la rete e continuare a chattare.

L'**app desktop** si configura nelle Impostazioni. Non legge la tua shell né un file `.env` (vedi [App desktop](./desktop)),
anche se rispetta `ROOFTOP_OFFLINE` e `OPENAI_*` se sono nell'ambiente con cui è stata avviata. Un server
legge l'ambiente (e `.env`):

::: code-group

```sh [Homebrew / server cargo]
# --offline equivale a ROOFTOP_OFFLINE=1
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=llama3.1 rooftop --offline
```

```sh [Docker]
docker run -p 8080:8080 -v rooftop-data:/data \
  --add-host=host.docker.internal:host-gateway \
  -e ROOFTOP_OFFLINE=1 \
  -e OPENAI_BASE_URL=http://host.docker.internal:11434/v1 -e OPENAI_MODEL=llama3.1 \
  ghcr.io/irooftop/rooftop
```

:::

In Docker, `localhost` è il container stesso, quindi usa `host.docker.internal` (l'opzione `--add-host` serve solo su Linux).
Se Ollama rifiuta la connessione, fallo ascoltare su tutte le interfacce (`OLLAMA_HOST=0.0.0.0`).

### Cosa impone la Modalità offline

| | Modalità offline |
|---|---|
| Chat, riepilogo della cronologia, descrizione dei media, trascrizione vocale | rifiutati, a meno che l'endpoint non sia [locale](#local-means) |
| Server MCP raggiunti via HTTP | rifiutati se non locali; l'errore appare nelle Impostazioni |
| Condivisione su internet (`<nome>.iroof.top`) | disattivata: il client relay non si avvia e l'interruttore è bloccato |
| Bot Telegram, proprio o condiviso | non avviato |
| GIF tramite URL | l'IA non può inviare una GIF da un URL non locale |
| Link Wi‑Fi | funzionano |

Una richiesta rifiutata fallisce prima di aprire qualsiasi connessione, e il messaggio spiega il motivo: `Modalità offline: https://openrouter.ai
non è un endpoint locale`. Anche un reindirizzamento da un endpoint locale verso un altro host viene rifiutato. Un piccolo badge **Offline**
compare nell'intestazione della barra laterale mentre la modalità è attiva. L'impostazione viene salvata. `--offline` / `ROOFTOP_OFFLINE=1`
la attivano indipendentemente dalle Impostazioni, e le Impostazioni non possono disattivarla.

#### Cosa significa «locale» {#local-means}

`localhost`, il loopback (`127.0.0.0/8`, `::1`), gli indirizzi di rete privata (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
gli indirizzi link-local, e i nomi `*.local` e `*.internal` (come `host.docker.internal`). Un modello su un altro
computer della tua rete domestica conta come locale, perché non lascia mai la tua rete. I nomi si giudicano da come sono scritti,
non vengono risolti.

### Cosa la Modalità offline non può verificare

* I **server MCP stdio** sono programmi del tuo computer. iRoof.top li avvia ma non può vedere a cosa si collegano,
  quindi aggiungi solo quelli di cui ti fidi per restare in locale.
* La **trascrizione vocale** usa l'API di chat (una parte `input_audio`), non l'API Whisper `/audio/transcriptions`.
  Richiede un server e un modello locali che accettino audio lì. Se il tuo non lo fa, il messaggio vocale viene comunque salvato e
  inviato; manca solo il suo testo.
* La **generazione di immagini e voce** esiste solo come [strumenti MCP](../features/mcp). Offline, usa un server MCP locale per questi.
* Le persone con cui condividi aprono i tuoi link Wi‑Fi nei propri browser. La Modalità offline regola questa app, non i loro dispositivi.

## Condividere con sicurezza con gli amici {#share-with-friends-safely}

| Link | Cosa succede |
|---|---|
| **Wi‑Fi** `http://<il tuo IP>:8737/s/<nome>` | non lascia mai la tua rete locale |
| **Internet** `https://<nome>.iroof.top/s/<nome>` | l'app apre un'unica connessione WebSocket in uscita verso l'hub, che vi inoltra le richieste HTTP del visitatore e le risposte della tua app |

Con un link Internet, la tua esportazione, le tue chat e il modello restano sul tuo computer, e l'hub non ne conserva nessuno.
L'hub conserva solo un registro dell'account: il tuo nome, un hash del tuo segreto e quando ti ha visto l'ultima volta.

Sii chiaro su ciò che questo *non* ti dà. L'hub termina il TLS, quindi, come qualsiasi reverse proxy, tecnicamente vede il traffico
che passa: ciò che digita il visitatore, le risposte del personaggio e la cronologia che il link consente ai visitatori di leggere
(**I visitatori possono leggere l'esportazione**, predefinito **nulla**). Inoltra solo le pagine per i visitatori (`/s/…`,
`/api/s/…`, risorse della pagina) e scarta i cookie in entrambe le direzioni; la tua interfaccia da proprietario e le tue impostazioni non sono mai raggiungibili attraverso di lui. Se è troppa fiducia, usa i link Wi‑Fi, oppure [gestisci il tuo hub relay](../reference/relay-hub).
[Altro sui link di condivisione](../features/share-links).

Con la **Modalità offline** il relay di iroof.top è disattivato. I link Wi‑Fi continuano a funzionare.

## Il bot Telegram {#the-telegram-bot}

[Rispondi da Telegram](../features/telegram) pubblica nel tuo gruppo:

* i nuovi **messaggi dei visitatori** (nome, nome del link, testo, oppure un'etichetta del media con la sua descrizione o trascrizione, e una breve
  anteprima del messaggio a cui rispondono) e le **risposte** dell'IA;
* mai la cronologia esportata. I messaggi vecchi non vengono trasmessi.

I bot non hanno la crittografia end-to-end: il testo passa in chiaro attraverso Telegram. Con il **bot condiviso** passa anche
attraverso l'hub, che conserva solo quale gruppo appartiene a quale account. Un **bot proprio** parla direttamente con
Telegram, senza l'hub. La Modalità offline disattiva entrambi.

## Dove vanno i tuoi dati

| Dati | Dove vanno |
|---|---|
| Esportazioni, chat, impostazioni, chiave API | la cartella dati sul tuo computer |
| Importazione e profilo di stile | da nessuna parte |
| Cronologia, profilo di stile, i tuoi messaggi | l'endpoint del modello scelto, a ogni risposta |
| Foto e voce | l'endpoint del modello media, su **Descrivi** o quando registri un messaggio vocale |
| Messaggi dei visitatori su un link Wi‑Fi | il tuo computer e il tuo endpoint del modello |
| Messaggi dei visitatori su un link Internet | l'hub (in transito), il tuo computer, il tuo endpoint del modello |
| Messaggi dei visitatori con Telegram | in più, Telegram, e l'hub per il bot condiviso |
| Modalità offline | solo l'endpoint del modello locale, solo link Wi‑Fi, nessun Telegram |
