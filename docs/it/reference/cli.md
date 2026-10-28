# CLI

```text
rooftop [serve] [OPZIONI]        avvia il server web (predefinito)
rooftop parse <CARTELLA>         stampa l'esportazione normalizzata come JSON
rooftop convert [OPZIONI] <CARTELLA>  stampa il {model, messages, tools} di un'esportazione
```

## `serve`

| Opzione | Variabile | Predefinito |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (illimitato) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | ogni gruppo a cui il bot si unisce |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | disattivato |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` rifiuta gli endpoint di modello e MCP non locali, e disattiva la condivisione via internet e il bot Telegram
([Offline e privacy](../guide/offline)). Non può essere combinato con `--relay-domain`. Cosa fa ciascuno: [Configurazione](./configuration).

## `parse` e `convert`

```sh
rooftop parse   ./examples/telegram                          # JSON normalizzato
rooftop convert ./examples/telegram --persona "Jonas Weber"  # ciò che riceve il modello
```

| Opzione di `convert` | Predefinito | |
|---|---|---|
| `--persona` | il titolo della chat / l'altra persona | a nome di chi parla l'LLM |
| `--user` | l'altro partecipante | chi interpreta l'umano |
| `--budget` | `120000` | budget della cronologia in caratteri |

Nell'app, il pulsante `{ }` mostra lo stesso JSON per la chat corrente.
