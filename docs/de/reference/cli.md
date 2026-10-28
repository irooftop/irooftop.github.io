# CLI

```text
rooftop [serve] [OPTIONEN]        startet den Webserver (Standard)
rooftop parse <ORDNER>            gibt den normalisierten Export als JSON aus
rooftop convert [OPTIONEN] <ORDNER>  gibt das {model, messages, tools} eines Exports aus
```

## `serve`

| Option | Variable | Standard |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (unbegrenzt) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | jede Gruppe, der der Bot beitritt |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | aus |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` lehnt nicht-lokale Modell- und MCP-Endpunkte ab und schaltet Internet-Teilen und den Telegram-Bot aus
([Offline & Datenschutz](../guide/offline)). Es kann nicht mit `--relay-domain` kombiniert werden. Was jede Option bewirkt: [Konfiguration](./configuration).

## `parse` und `convert`

```sh
rooftop parse   ./examples/telegram                          # normalisiertes JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # was das Modell erhält
```

| `convert`-Option | Standard | |
|---|---|---|
| `--persona` | der Chat-Titel / die andere Person | in wessen Namen das LLM spricht |
| `--user` | der andere Teilnehmer | wer der Mensch spielt |
| `--budget` | `120000` | Verlaufsbudget in Zeichen |

In der App zeigt die Schaltfläche `{ }` dasselbe JSON für den aktuellen Chat.
