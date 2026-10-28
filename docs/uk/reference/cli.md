# CLI

```text
rooftop [serve] [ОПЦІЇ]          запускає веб-сервер (типово)
rooftop parse <ПАПКА>            виводить нормалізований експорт як JSON
rooftop convert [ОПЦІЇ] <ПАПКА>  виводить {model, messages, tools} експорту
```

## `serve`

| Опція | Змінна | Типово |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (без обмеження) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | кожна група, до якої приєднається бот |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | вимкнено |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` відхиляє нелокальні кінцеві точки моделі та MCP і вимикає спільний доступ через інтернет та Telegram-бота
([Офлайн-режим і приватність](../guide/offline)). Його не можна поєднувати з `--relay-domain`. Що робить кожна: [Конфігурація](./configuration).

## `parse` і `convert`

```sh
rooftop parse   ./examples/telegram                          # нормалізований JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # те, що отримує модель
```

| Опція `convert` | Типово | |
|---|---|---|
| `--persona` | назва чату / інша людина | від чийого імені говорить LLM |
| `--user` | інший учасник | кого грає людина |
| `--budget` | `120000` | бюджет історії в символах |

У застосунку кнопка `{ }` показує той самий JSON для поточного чату.
