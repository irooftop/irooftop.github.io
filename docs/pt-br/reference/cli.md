# CLI

```text
rooftop [serve] [OPÇÕES]        executa o servidor web (o padrão)
rooftop parse <PASTA>           imprime a exportação normalizada como JSON
rooftop convert [OPÇÕES] <PASTA>  imprime o {model, messages, tools} de uma exportação
```

## `serve`

| Opção | Variável | Padrão |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (ilimitado) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | todo grupo em que o bot entrar |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | desligado |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` recusa endpoints de modelo e MCP não locais, e desliga o compartilhamento pela internet e o bot do Telegram
([Offline e privacidade](../guide/offline)). Não pode ser combinado com `--relay-domain`. O que cada um faz: [Configuração](./configuration).

## `parse` e `convert`

```sh
rooftop parse   ./examples/telegram                          # JSON normalizado
rooftop convert ./examples/telegram --persona "Jonas Weber"  # o que o modelo recebe
```

| Opção de `convert` | Padrão | |
|---|---|---|
| `--persona` | o título do chat / a outra pessoa | em nome de quem o LLM fala |
| `--user` | o outro participante | quem o humano interpreta |
| `--budget` | `120000` | orçamento do histórico em caracteres |

No app, o botão `{ }` mostra o mesmo JSON do chat atual.
