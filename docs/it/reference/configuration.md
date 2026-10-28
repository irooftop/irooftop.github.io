# Configurazione

Variabili d'ambiente, un file `.env` nella cartella di lavoro, oppure le opzioni corrispondenti di `rooftop`
([CLI](./cli)). I valori impostati in **Impostazioni** hanno la precedenza sull'ambiente per endpoint LLM, modello, chiave, temperatura,
budget della cronologia, passi degli strumenti, server MCP, bot Telegram e Modalità offline. `TELEGRAM_BOT_TOKEN` ha la precedenza sulle Impostazioni.

## Modello

| Variabile | Predefinito | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | qualsiasi API compatibile con OpenAI: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | token bearer |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | deve supportare le chiamate agli strumenti |
| `OPENAI_TEMPERATURE` | quella del fornitore | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | descrive le immagini e trascrive la voce, per esempio `xiaomi/mimo-v2.6-flash` |

## Offline

| Variabile | Predefinito | |
|---|---|---|
| `ROOFTOP_OFFLINE` | disattivato | `1`, `true`, `yes` o `on`: solo modelli e server MCP locali (questo computer o la rete), niente condivisione via internet, niente Telegram. Come l'interruttore **Offline** nelle Impostazioni, ma le Impostazioni non possono disattivarlo. Anche l'app desktop lo rispetta. [Offline e privacy](../guide/offline) |

## Server

| Variabile | Predefinito | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` in Docker) | con `0.0.0.0:<porta>` il log mostra l'URL della LAN |
| `ROOFTOP_DATA` | `./data` (`/data` in Docker) | esportazioni, chat, impostazioni |
| `ROOFTOP_IMPORT` | – | esportazioni da importare all'avvio, separate da `:`, idempotente |
| `ROOFTOP_PASSWORD` | – | autenticazione HTTP Basic per l'interfaccia del proprietario (nome utente qualsiasi). **Impostala su un server pubblico** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | limite di caricamento per il proprietario in MiB; `0` significa nessuno (le esportazioni sono di molti GB). Impostalo su un server raggiungibile da altri. I link di condivisione mantengono il proprio limite di 16 MiB. L'app desktop non ha limiti |
| `ROOFTOP_TRUST_PROXY` | `false` | IP del client da `X-Forwarded-For` / `X-Real-IP`, solo dietro un reverse proxy |
| `ROOFTOP_FFMPEG` | `ffmpeg` nel `PATH`, poi Homebrew, `/usr/local`, `/usr/bin` | fotogrammi di GIF e video (facoltativo) |
| `TZ` | UTC | fuso orario dei messaggi in tempo reale |

## Telegram

| Variabile | Predefinito | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | il tuo bot da [@BotFather](https://t.me/BotFather) ([Rispondere da Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | ogni gruppo a cui si unisce il bot | id dei gruppi consentiti, separati da virgole |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | per esempio un server Bot API self-hosted |

## Relay

| Variabile | Predefinito | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | relay per la condivisione via **Internet** e il bot condiviso |
| `ROOFTOP_RELAY_DOMAIN` | – | esegue un [hub relay](./relay-hub) per questo dominio |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | il bot condiviso dell'hub; deve essere diverso da `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | numero massimo di nomi conservati da un hub |

## Solo Impostazioni {#settings-only}

| Impostazione | Predefinito | |
|---|---|---|
| Budget della cronologia | `120000` caratteri | quanta cronologia viene riprodotta prima che entri in gioco la [memoria](../features/how-it-works#long-chats) |
| Passi massimi degli strumenti | `6` | turni dell'LLM per risposta (ricerca, strumento MCP, risposta…) |
