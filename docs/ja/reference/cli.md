# CLI

```text
rooftop [serve] [オプション]         Web サーバーを実行（既定）
rooftop parse <フォルダ>             正規化されたエクスポートを JSON で出力
rooftop convert [オプション] <フォルダ>  エクスポートの {model, messages, tools} を出力
```

## `serve`

| オプション | 変数 | 既定 |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0`（無制限） |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | ボットが参加するすべてのグループ |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | オフ |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` は、ローカルでないモデルと MCP のエンドポイントを拒否し、インターネット共有と Telegram ボットをオフにします（[オフラインとプライバシー](../guide/offline)）。`--relay-domain` と組み合わせることはできません。それぞれの役割：[設定](./configuration)。

## `parse` と `convert`

```sh
rooftop parse   ./examples/telegram                          # 正規化された JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # モデルが受け取るもの
```

| `convert` のオプション | 既定 | |
|---|---|---|
| `--persona` | チャットのタイトル / 相手 | LLM が誰として話すか |
| `--user` | もう一方の参加者 | 人間を演じるのは誰か |
| `--budget` | `120000` | 文字数で表した履歴の予算 |

アプリでは、`{ }` ボタンが現在のチャットについて同じ JSON を表示します。
