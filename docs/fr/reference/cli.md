# CLI

```text
rooftop [serve] [OPTIONS]        lance le serveur web (par défaut)
rooftop parse <DOSSIER>          affiche l'export normalisé en JSON
rooftop convert [OPTIONS] <DOSSIER>  affiche le {model, messages, tools} d'un export
```

## `serve`

| Option | Variable | Par défaut |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (illimité) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | chaque groupe que le bot rejoint |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | désactivé |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` refuse les points d'accès de modèle et MCP non locaux, et désactive le partage sur Internet et le bot Telegram
([Hors ligne et confidentialité](../guide/offline)). Il ne peut pas être combiné avec `--relay-domain`. Ce que fait chacun : [Configuration](./configuration).

## `parse` et `convert`

```sh
rooftop parse   ./examples/telegram                          # JSON normalisé
rooftop convert ./examples/telegram --persona "Jonas Weber"  # ce que reçoit le modèle
```

| Option de `convert` | Par défaut | |
|---|---|---|
| `--persona` | le titre du chat / l'autre personne | au nom de qui parle le LLM |
| `--user` | l'autre participant | qui joue l'humain |
| `--budget` | `120000` | budget d'historique en caractères |

Dans l'application, le bouton `{ }` affiche le même JSON pour le chat en cours.
