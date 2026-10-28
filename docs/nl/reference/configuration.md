# Configuratie

Omgevingsvariabelen, een `.env`-bestand in de werkmap, of de bijbehorende `rooftop`-opties
([CLI](./cli)). Waarden die in **Instellingen** zijn ingesteld, winnen van de omgeving voor het LLM-endpoint, model, sleutel, temperatuur,
geschiedenisbudget, tool-stappen, MCP-servers, de Telegram-bot en de Offline-modus. `TELEGRAM_BOT_TOKEN` wint van Instellingen.

## Model

| Variabele | Standaard | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | elke OpenAI-compatibele API: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | bearer-token |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | moet tool calling ondersteunen |
| `OPENAI_TEMPERATURE` | standaard van de aanbieder | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | beschrijft afbeeldingen en transcribeert spraak, bijvoorbeeld `xiaomi/mimo-v2.6-flash` |

## Offline

| Variabele | Standaard | |
|---|---|---|
| `ROOFTOP_OFFLINE` | uit | `1`, `true`, `yes` of `on`: alleen lokale modellen en MCP-servers (deze computer of het netwerk), geen delen via internet, geen Telegram. Hetzelfde als de schakelaar **Offline** in Instellingen, maar Instellingen kunnen hem niet uitzetten. De desktopapp respecteert hem ook. [Offline en privacy](../guide/offline) |

## Server

| Variabele | Standaard | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` in Docker) | met `0.0.0.0:<poort>` toont het log de LAN-URL |
| `ROOFTOP_DATA` | `./data` (`/data` in Docker) | exports, chats, instellingen |
| `ROOFTOP_IMPORT` | – | exports om bij het starten te importeren, gescheiden door `:`, idempotent |
| `ROOFTOP_PASSWORD` | – | HTTP Basic-authenticatie voor de eigenaarsinterface (elke gebruikersnaam). **Stel dit in op een openbare server** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | uploadlimiet voor de eigenaar in MiB; `0` betekent geen (exports zijn vele GB's). Stel dit in op een server die anderen kunnen bereiken. Sharelinks houden hun eigen limiet van 16 MiB. De desktopapp heeft geen limiet |
| `ROOFTOP_TRUST_PROXY` | `false` | client-IP uit `X-Forwarded-For` / `X-Real-IP`, alleen achter een reverse proxy |
| `ROOFTOP_FFMPEG` | `ffmpeg` in `PATH`, daarna Homebrew, `/usr/local`, `/usr/bin` | frames van GIF's en video's (optioneel) |
| `TZ` | UTC | tijdzone van live berichten |

## Telegram

| Variabele | Standaard | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | je bot van [@BotFather](https://t.me/BotFather) ([Antwoorden vanuit Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | elke groep die de bot joint | toegestane groeps-id's, door komma's gescheiden |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | bijvoorbeeld een zelf gehoste Bot API-server |

## Relay

| Variabele | Standaard | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | relay voor **Internet**-delen en de gedeelde bot |
| `ROOFTOP_RELAY_DOMAIN` | – | draait een [relayhub](./relay-hub) voor dit domein |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | de gedeelde bot van de hub; moet verschillen van `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | het maximale aantal namen dat een hub bewaart |

## Alleen in Instellingen {#settings-only}

| Instelling | Standaard | |
|---|---|---|
| Geschiedenisbudget | `120000` tekens | hoeveel geschiedenis wordt herhaald voordat het [geheugen](../features/how-it-works#long-chats) ingrijpt |
| Max. tool-stappen | `6` | LLM-rondes per antwoord (zoeken, MCP-tool, antwoord…) |
