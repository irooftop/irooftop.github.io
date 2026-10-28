# HTTP API

HTTP 上の JSON です。`ROOFTOP_PASSWORD` が設定されていると、所有者の API には HTTP Basic 認証が必要です。

## 所有者

| メソッド | パス | |
|---|---|---|
| GET | `/api/state` | エクスポート、チャット、共有リンク、LLM の情報 |
| POST | `/api/exports` | マルチパートのアップロード：相対名を持つフォルダのファイル、または `.zip`。すぐに `202 {"id"}` を返し、バックグラウンドでインポートする |
| POST | `/api/uploads` | バッチアップロードを開始（Web UI が使う）：`{"id"}` |
| POST | `/api/uploads/{id}/files` | 相対名を持つファイルのマルチパートのバッチ。同じバッチを再送すると、そのファイルが置き換わる：`{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | チャットのファイルの後、メディアの前：まだ送っていない `{"bytes"}` → `{title, messages, existing, fits, free_bytes, needed_bytes}`（すでにインポート済みか、ディスクに空きがあるか） |
| POST | `/api/uploads/{id}/import` | これまでにアップロードしたすべてをインポートする：インポートジョブの `202 {"id"}` |
| DELETE | `/api/uploads/{id}` | 完了していないアップロードを破棄する（放置されたものは 24 時間後と再起動時に削除される） |
| POST | `/api/local/pick` | デスクトップアプリのみ：ネイティブのピッカーを表示、`{"kind": "folder" \| "file"}` → `{"path"}`（キャンセル時は `null`） |
| POST | `/api/local/import` | デスクトップアプリのみ：このコンピュータからインポート、`{"paths": […]}`（フォルダ、`.zip`、または WhatsApp の `.txt`。1 つのエクスポート内のファイルは、そのフォルダを表す）→ インポートジョブの `202 {"id", "name"}`。ソースはコピーされ、決して変更されない |
| GET | `/api/imports/{id}` | インポートジョブの進捗。下を参照 |
| GET · DELETE | `/api/exports/{id}` | メディアライブラリを含む詳細 · チャットと一緒に削除 |
| POST | `/api/exports/{id}/describe` | メディアライブラリを説明する |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`。`export_id` がなければ、メモだけのチャット：`persona` は相手の名前、`user` はあなたの名前（既定は `Me`） |
| GET · PATCH · DELETE | `/api/chats/{id}` | タイムライン（`?limit=`）· タイトルとメモ · 削除 |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}`（`""` で削除） |
| POST | `/api/chats/{id}/voice` | マルチパートの `file`（wav、ogg、mp3、m4a、webm）、`duration?`、`reply_to?` |
| POST | `/api/chats/{id}/respond` | ペルソナに行動させる。メッセージと順序付きのアクションを返す |
| POST | `/api/chats/{id}/regenerate` | ペルソナの最後のターンを破棄して、もう一度返信する |
| GET | `/api/chats/{id}/prompt` | 正確な `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | 一覧 · 共有リンクを作成 |
| PATCH · DELETE | `/api/shares/{id}` | 編集（`pin: ""` で PIN を削除、`revoke_sessions`）· 削除 |
| DELETE | `/api/shares/{id}/sessions/{session}` | 1 つの訪問者の会話を終了する |
| GET · PUT | `/api/settings` | LLM、MCP、Telegram（`telegram: {mode: off\|shared\|own, token?}`） |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP のステータス · 再接続 |
| GET · POST | `/api/telegram` · `/api/telegram/link` | ボットのステータスとグループ · ボットをグループに追加する `t.me` リンク |
| GET · PUT | `/api/sharing` | Wi‑Fi とインターネットの共有 `{lan?, internet?, name?}`（所有者の画面は localhost のみ） |
| GET | `/api/qr?text=…` | QR コード（SVG） |

### インポートジョブ

`GET /api/imports/{id}` は次を返します。

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`：`queued`（ほかのインポートが実行中。1 つずつ実行される）、`running`、`done`、`failed`。
* `stage`：`unpacking`、`reading`、`parsing`（`total` ページ中 `done`）、`hashing` と `placing`（ファイル）、`saving`。
* `messages`：これまでに見つかったメッセージ数。
* `failed` には `error` が追加される。例：`no messages.html, result.json or WhatsApp .txt found in the upload`。
* `done` には `created`（同じエクスポートを以前にインポートしていた場合は `false`）と `export` が追加される。`export` は `/api/state` にもある要約。

直近 16 件の完了したジョブが保持されます。不明な ID は 404 を返します。

## 公開

パスワード不要。共有リンクの訪問者用：

| メソッド | パス | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | 訪問者のページ |
| GET | `/api/s/{name}` | スタートページの情報 |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | タイムライン |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | 所有者と同じ。`regenerate`、および新しい訪問者のメッセージがない `respond`（「先に書いてもらう」）は、リンクに `allow_regenerate` / `allow_nudge` がある場合だけ（それ以外は `403`） |
| GET | `/api/s/{name}/c/{token}/media/{path}` | 訪問者が見てよいメディア |

## リレーハブ

| メソッド | パス | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`、名前の確保または変更（`Authorization: Bearer <シークレット>`） |
| GET | `/relay/v1/connect` | アプリの WebSocket |
| GET | `/relay/v1/info` | ハブの情報 |
| * | `/relay/v1/tg/bot<シークレット>/<メソッド>` | 共有ボットの Bot API プロキシ |
