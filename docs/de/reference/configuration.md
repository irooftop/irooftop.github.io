# Konfiguration

Umgebungsvariablen, eine `.env`-Datei im Arbeitsverzeichnis oder die passenden `rooftop`-Optionen
([CLI](./cli)). In **Einstellungen** gesetzte Werte haben Vorrang vor der Umgebung für LLM-Endpunkt, Modell, Schlüssel, Temperatur,
Verlaufsbudget, Tool-Schritte, MCP-Server, den Telegram-Bot und den Offline-Modus. `TELEGRAM_BOT_TOKEN` hat Vorrang vor den Einstellungen.

## Modell

| Variable | Standard | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | jede OpenAI-kompatible API: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | Bearer-Token |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | muss Tool-Aufrufe unterstützen |
| `OPENAI_TEMPERATURE` | Anbieter-Standard | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | beschreibt Bilder und transkribiert Sprache, z. B. `xiaomi/mimo-v2.6-flash` |

## Offline

| Variable | Standard | |
|---|---|---|
| `ROOFTOP_OFFLINE` | aus | `1`, `true`, `yes` oder `on`: nur lokale Modelle und MCP-Server (dieser Computer oder das Netzwerk), kein Internet-Teilen, kein Telegram. Entspricht dem Schalter **Offline** in den Einstellungen, aber die Einstellungen können ihn nicht ausschalten. Die Desktop-App berücksichtigt ihn ebenfalls. [Offline & Datenschutz](../guide/offline) |

## Server

| Variable | Standard | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` in Docker) | mit `0.0.0.0:<port>` zeigt das Log die LAN-URL |
| `ROOFTOP_DATA` | `./data` (`/data` in Docker) | Exporte, Chats, Einstellungen |
| `ROOFTOP_IMPORT` | – | beim Start zu importierende Exporte, durch `:` getrennt, idempotent |
| `ROOFTOP_PASSWORD` | – | HTTP-Basic-Authentifizierung für die Eigentümeroberfläche (beliebiger Benutzername). **Auf einem öffentlichen Server setzen** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | Upload-Limit für den Eigentümer in MiB; `0` heißt keins (Exporte sind viele GB groß). Setze es auf einem Server, den andere erreichen. Share-Links behalten ihr eigenes Limit von 16 MiB. Die Desktop-App hat kein Limit |
| `ROOFTOP_TRUST_PROXY` | `false` | Client-IP aus `X-Forwarded-For` / `X-Real-IP`, nur hinter einem Reverse-Proxy |
| `ROOFTOP_FFMPEG` | `ffmpeg` im `PATH`, dann Homebrew, `/usr/local`, `/usr/bin` | Bilder von GIFs und Videos (optional) |
| `TZ` | UTC | Zeitzone der Live-Nachrichten |

## Telegram

| Variable | Standard | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | dein Bot von [@BotFather](https://t.me/BotFather) ([Aus Telegram antworten](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | jede Gruppe, der der Bot beitritt | erlaubte Gruppen-IDs, durch Kommas getrennt |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | z. B. ein selbst betriebener Bot-API-Server |

## Relay

| Variable | Standard | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | Relay für **Internet**-Teilen und den geteilten Bot |
| `ROOFTOP_RELAY_DOMAIN` | – | betreibe einen [Relay-Hub](./relay-hub) für diese Domain |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | der geteilte Bot des Hubs; muss sich von `TELEGRAM_BOT_TOKEN` unterscheiden |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | die meisten Namen, die ein Hub speichert |

## Nur in den Einstellungen {#settings-only}

| Einstellung | Standard | |
|---|---|---|
| Verlaufsbudget | `120000` Zeichen | wie viel Verlauf wiedergegeben wird, bevor das [Gedächtnis](../features/how-it-works#long-chats) greift |
| Max. Tool-Schritte | `6` | LLM-Runden pro Antwort (Suche, MCP-Tool, Antwort…) |
