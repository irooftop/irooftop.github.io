# CLI

```text
rooftop [serve] [OPCIONES]        ejecuta el servidor web (el predeterminado)
rooftop parse <DIR>               muestra la exportación normalizada como JSON
rooftop convert [OPCIONES] <DIR>  muestra el {model, messages, tools} de una exportación
```

## `serve`

| Opción | Variable | Por defecto |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (sin límite) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | cada grupo al que se une el bot |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | desactivado |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` rechaza los endpoints de modelo y de MCP que no sean locales, y desactiva el compartir por internet y el bot de Telegram
([Sin conexión y privacidad](../guide/offline)). No se puede combinar con `--relay-domain`. Qué hace cada una: [Configuración](./configuration).

## `parse` y `convert`

```sh
rooftop parse   ./examples/telegram                          # JSON normalizado
rooftop convert ./examples/telegram --persona "Jonas Weber"  # lo que recibe el modelo
```

| Opción de `convert` | Por defecto | |
|---|---|---|
| `--persona` | el título del chat / la otra persona | en nombre de quién habla el LLM |
| `--user` | el otro participante | quién juega el humano |
| `--budget` | `120000` | presupuesto de historial en caracteres |

En la app, el botón `{ }` muestra el mismo JSON para el chat actual.
