# CLI

```text
rooftop [serve] [OPTIES]          start de webserver (standaard)
rooftop parse <MAP>               toont de genormaliseerde export als JSON
rooftop convert [OPTIES] <MAP>    toont het {model, messages, tools} van een export
```

## `serve`

| Optie | Variabele | Standaard |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (onbeperkt) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | elke groep die de bot joint |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | uit |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` weigert niet-lokale model- en MCP-endpoints, en zet delen via internet en de Telegram-bot uit
([Offline en privacy](../guide/offline)). Het kan niet worden gecombineerd met `--relay-domain`. Wat elk doet: [Configuratie](./configuration).

## `parse` en `convert`

```sh
rooftop parse   ./examples/telegram                          # genormaliseerde JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # wat het model ontvangt
```

| `convert`-optie | Standaard | |
|---|---|---|
| `--persona` | de chattitel / de andere persoon | namens wie de LLM spreekt |
| `--user` | de andere deelnemer | wie de mens speelt |
| `--budget` | `120000` | geschiedenisbudget in tekens |

In de app toont de knop `{ }` dezelfde JSON voor de huidige chat.
