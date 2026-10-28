---
layout: home

hero:
  name: iRoof.top
  text: Parla con le persone che ti mancano
  tagline: Esporta una chat di Telegram o WhatsApp e un LLM la continua nello stile di una persona, con le sue bolle, sticker, GIF, reazioni e voce. Sul tuo computer, con il modello che preferisci, anche offline se vuoi.
  actions:
    - theme: brand
      text: Inizia
      link: /it/guide/getting-started
    - theme: alt
      text: Scarica l'app
      link: /it/guide/desktop
    - theme: alt
      text: Come funziona
      link: /it/features/how-it-works

features:
  - title: Il suo stile, non solo le sue parole
    details: Un profilo di stile ricavato dall'intera esportazione, e ogni bolla, sticker, GIF, risposta e reazione viene riprodotta al modello come chiamata a uno strumento.
    link: /it/features/how-it-works
    linkText: Come funziona
  - title: Privato, e offline se vuoi
    details: Le chat restano nella tua cartella dei dati. Con un modello locale e la modalità offline attiva, l'app rifiuta ogni richiesta che lascerebbe il tuo computer.
    link: /it/guide/offline
    linkText: Offline e privacy
  - title: Anni di chat, gigabyte di media
    details: Oltre 120.000 messaggi e 30.000 file vengono importati con l'avanzamento in tempo reale. Un'importazione ripetuta viene riconosciuta dai messaggi, prima che venga caricato qualsiasi media.
    link: /it/guide/export#large-exports
    linkText: Esportazioni grandi
  - title: Foto, sticker e voce
    details: Una libreria di media che descrive ciò che è stato inviato e trascrive la voce, nell'ordine che scegli, interrompibile in ogni momento.
    link: /it/features/media
    linkText: Foto e voce
  - title: Link di condivisione
    details: Lascia che un amico parli con il personaggio su /s/nome, con PIN e limiti, sul tuo Wi‑Fi o su nome.iroof.top.
    link: /it/features/share-links
    linkText: Link di condivisione
  - title: Rispondere da Telegram
    details: I messaggi dei visitatori arrivano al tuo gruppo Telegram. Rispondi tu, o lascia che l'IA risponda dopo un conto alla rovescia.
    link: /it/features/telegram
    linkText: Telegram
  - title: Ogni modello, ogni server MCP
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… e strumenti MCP via Streamable HTTP o stdio.
    link: /it/features/mcp
    linkText: Strumenti MCP
  - title: Niente di nascosto
    details: Il JSON esatto inviato al modello è a un clic di distanza, con la sua dimensione, il budget della cronologia e i token usati.
    link: /it/guide/getting-started#what-s-in-the-window
    linkText: Cosa c'è nella finestra
  - title: Un piccolo file binario
    details: Un server Rust con l'interfaccia web incorporata, app desktop per macOS, Windows e Linux, Homebrew e un'immagine Docker.
    link: /it/guide/getting-started
    linkText: Installa
---

<div class="home-demo">

![Una chat prosegue nello stile di una persona reale, poi un amico apre il link condiviso sul telefono](/img/demo.svg)

</div>

## Inizia in un minuto

::: code-group

```sh [App desktop]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [Completamente offline]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Poi tre passaggi: **[esporta una chat](/it/guide/export)** da Telegram Desktop o WhatsApp, **trascina** la cartella, lo `.zip` o il `.txt` nella pagina e premi **New chat** per scegliere chi fa l'IA: l'altra persona, o tu.
Non hai una chat a portata di mano? Prova quelle fittizie: `rooftop --import ./examples/telegram`.
(I nomi dei pulsanti dell'app sono in inglese, come l'app stessa.)

## Come funziona

<div class="wide">

![Un'esportazione di Telegram o WhatsApp entra in iRoof.top, un LLM scrive le risposte e la chat prosegue](/how-it-works.svg)

</div>

L'esportazione viene letta una sola volta, sul tuo computer. A ogni risposta il modello riceve un prompt di sistema con il profilo di stile, le tue note e le descrizioni dei media, poi la parte più recente della chat che sta nel [budget della cronologia](/it/reference/configuration#settings-only). Le parti più vecchie vengono compresse in una memoria breve, e la persona può comunque cercarle. Il modello risponde con chiamate a strumenti (`send_message`, `send_sticker`, `react`…), che diventano bolle, sticker e reazioni. [Altro →](/it/features/how-it-works)

## Dove va la tua chat

| | Rete |
|---|---|
| Importazione, profilo di stile, ricerca, archiviazione | nessuna: tutto avviene sul tuo computer |
| Una risposta, un riassunto della memoria | solo l'endpoint del modello che scegli |
| Descrivere i media, trascrivere la voce | il modello dei media, solo quando premi **Describe** |
| Link di condivisione via internet, Telegram | solo se li attivi; la [modalità offline](/it/guide/offline) li disattiva |

## Domande

::: details Quale modello devo usare?
Un modello di chat con **chiamate a strumenti** dietro un endpoint `/chat/completions` compatibile con OpenAI. I modelli più grandi imitano meglio uno stile. Per **Describe** nella libreria dei media, il modello dei media deve anche accettare immagini (e audio per i messaggi vocali). **Test** nelle impostazioni spiega con parole semplici cosa non va, per esempio una chiave rifiutata o un modello sconosciuto.
:::

::: details Quanto costa?
Niente con un modello locale. Con un modello nel cloud paghi il fornitore a token: una risposta costa circa quanto un budget della cronologia in ingresso (120.000 caratteri ≈ 34 mila token di default; il prompt è costruito per essere memorizzabile nella cache, quindi i fornitori con cache dei prompt addebitano gran parte al prezzo in cache), più alcune brevi chiamate a strumenti. Riduci il budget nelle impostazioni per pagare meno a risposta.
:::

::: details La mia esportazione deve essere piccola?
No. Le esportazioni con più di 120.000 messaggi e 13 GB di media si importano senza problemi, dal browser o con `rooftop --import <cartella>`. La ricerca e il budget della cronologia mantengono la stessa dimensione del prompt a ogni risposta, per quanto lunga sia la chat.
:::

::: details Un amico può parlare con la persona?
Sì, con un [link di condivisione](/it/features/share-links): sul tuo Wi‑Fi, o via internet su `nome.iroof.top`, con PIN e limiti di messaggi. I visitatori vedono solo la chat: niente impostazioni, note, prompt o altre chat.
:::

::: tip Una nota sulla cura
Questo serve a restare vicini a persone lontane. La persona resta nel suo ruolo, ma risponde con onestà se chiedi sinceramente se stai parlando con un'IA, e risponde con cura se sembri in difficoltà.
:::
