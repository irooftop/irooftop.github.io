# CLI

```text
rooftop [serve] [OPCJE]          uruchamia serwer WWW (domyślnie)
rooftop parse <FOLDER>           wypisuje znormalizowany eksport jako JSON
rooftop convert [OPCJE] <FOLDER> wypisuje {model, messages, tools} eksportu
```

## `serve`

| Opcja | Zmienna | Domyślnie |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (bez limitu) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | każda grupa, do której dołączy bot |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | wyłączone |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` odrzuca nielokalne endpointy modelu i MCP oraz wyłącza udostępnianie przez internet i bota Telegrama
([Tryb offline i prywatność](../guide/offline)). Nie można go łączyć z `--relay-domain`. Co robi każda z nich: [Konfiguracja](./configuration).

## `parse` i `convert`

```sh
rooftop parse   ./examples/telegram                          # znormalizowany JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # to, co dostaje model
```

| Opcja `convert` | Domyślnie | |
|---|---|---|
| `--persona` | tytuł czatu / druga osoba | w czyim imieniu mówi LLM |
| `--user` | drugi uczestnik | kogo gra człowiek |
| `--budget` | `120000` | budżet historii w znakach |

W aplikacji przycisk `{ }` pokazuje ten sam JSON dla bieżącego czatu.
