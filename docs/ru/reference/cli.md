# CLI

```text
rooftop [serve] [ОПЦИИ]          запускает веб-сервер (по умолчанию)
rooftop parse <ПАПКА>            выводит нормализованный экспорт в JSON
rooftop convert [ОПЦИИ] <ПАПКА>  выводит {model, messages, tools} экспорта
```

## `serve`

| Опция | Переменная | По умолчанию |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (без ограничений) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | каждая группа, в которую входит бот |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | выкл. |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` отклоняет нелокальные конечные точки модели и MCP и отключает общий доступ через интернет и Telegram-бота
([Автономный режим и конфиденциальность](../guide/offline)). Не может использоваться вместе с `--relay-domain`. Что делает каждый: [Конфигурация](./configuration).

## `parse` и `convert`

```sh
rooftop parse   ./examples/telegram                          # нормализованный JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # то, что получает модель
```

| Опция `convert` | По умолчанию | |
|---|---|---|
| `--persona` | название чата / другой человек | от чьего имени говорит LLM |
| `--user` | другой участник | кого играет человек |
| `--budget` | `120000` | бюджет истории в символах |

В приложении кнопка `{ }` показывает тот же JSON для текущего чата.
