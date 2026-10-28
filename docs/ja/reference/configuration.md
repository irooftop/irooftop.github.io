# 設定

環境変数、作業ディレクトリの `.env` ファイル、または対応する `rooftop` のオプション（[CLI](./cli)）で指定します。**設定**で指定した値は、LLM のエンドポイント、モデル、キー、温度、履歴の予算、ツールのステップ数、MCP サーバー、Telegram ボット、オフラインモードについて、環境より優先されます。`TELEGRAM_BOT_TOKEN` は設定より優先されます。

## モデル

| 変数 | 既定 | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | OpenAI 互換の任意の API：OpenAI、OpenRouter、Gemini、Mistral、DeepSeek、Groq、Ollama（`http://localhost:11434/v1`）、LM Studio（`http://localhost:1234/v1`）、llama.cpp（`http://localhost:8080/v1`）、vLLM… |
| `OPENAI_API_KEY` | – | Bearer トークン |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | ツール呼び出しに対応している必要がある |
| `OPENAI_TEMPERATURE` | プロバイダーの既定値 | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | 画像を説明し、音声を文字起こしする。例：`xiaomi/mimo-v2.6-flash` |

## オフライン

| 変数 | 既定 | |
|---|---|---|
| `ROOFTOP_OFFLINE` | オフ | `1`、`true`、`yes`、`on`：ローカルのモデルと MCP サーバー（このコンピュータまたはネットワーク）だけ、インターネット共有なし、Telegram なし。設定の**オフライン**スイッチと同じですが、設定ではオフにできません。デスクトップアプリも従います。[オフラインとプライバシー](../guide/offline) |

## サーバー

| 変数 | 既定 | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080`（Docker では `0.0.0.0:8080`） | `0.0.0.0:<ポート>` のとき、ログに LAN の URL が表示される |
| `ROOFTOP_DATA` | `./data`（Docker では `/data`） | エクスポート、チャット、設定 |
| `ROOFTOP_IMPORT` | – | 起動時にインポートするエクスポート。`:` 区切り、冪等 |
| `ROOFTOP_PASSWORD` | – | 所有者の画面の HTTP Basic 認証（ユーザー名は任意）。**公開サーバーでは必ず設定してください** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | 所有者のアップロード上限（MiB）。`0` は上限なし（エクスポートは数 GB になります）。ほかの人がアクセスできるサーバーでは設定してください。共有リンクは独自に 16 MiB の上限を持ちます。デスクトップアプリに上限はありません |
| `ROOFTOP_TRUST_PROXY` | `false` | `X-Forwarded-For` / `X-Real-IP` からクライアントの IP を取得。リバースプロキシの背後でのみ |
| `ROOFTOP_FFMPEG` | `PATH` 上の `ffmpeg`、次に Homebrew、`/usr/local`、`/usr/bin` | GIF と動画のフレーム（任意） |
| `TZ` | UTC | ライブメッセージのタイムゾーン |

## Telegram

| 変数 | 既定 | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | [@BotFather](https://t.me/BotFather) から取得したボット（[Telegram から返信](../features/telegram)） |
| `TELEGRAM_CHAT_ID` | ボットが参加するすべてのグループ | 許可するグループ ID。カンマ区切り |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | 例：自前で運用する Bot API サーバー |

## リレー

| 変数 | 既定 | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | **インターネット**共有と共有ボット用のリレー |
| `ROOFTOP_RELAY_DOMAIN` | – | このドメインの[リレーハブ](./relay-hub)を実行する |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | ハブの共有ボット。`TELEGRAM_BOT_TOKEN` とは別のものにしてください |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | ハブが保持する名前の最大数 |

## 設定のみ {#settings-only}

| 設定 | 既定 | |
|---|---|---|
| 履歴の予算 | `120000` 文字 | [メモリ](../features/how-it-works#long-chats)が働く前に、どれだけの履歴を再生するか |
| ツールステップの最大数 | `6` | 回答ごとの LLM のラウンド数（検索、MCP ツール、返信…） |
