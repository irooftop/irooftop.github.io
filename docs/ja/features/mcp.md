# MCP ツール

**設定 → MCP サーバー**には、一般的な `mcpServers` の JSON を入力します。

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* ツールはモデルに `mcp_<サーバー>_<ツール>` という名前で届きます。Giphy で見つけた GIF は `send_gif {url}` で送られます。
* `env`、`headers`、`args`、`command`、`url` は、環境変数または `.env` からの `${NAME}` を使えるので、秘密情報を `settings.json` の外に置けます。
* stdio サーバーは、自分専用のフォルダ `data/mcp/<サーバー>/` で動きます。
* 設定の **MCP を再接続**で再起動します。ステータスには、各サーバーのプロトコルとツールが表示されます。

## プロトコルのリビジョン

| リビジョン | トランスポート | |
|---|---|---|
| `2026-07-28` | Streamable HTTP、ステートレス | `server/discover` で最初に確認 |
| `2025-11-25`、`2025-06-18`、`2025-03-26` | Streamable HTTP または stdio | `initialize` のハンドシェイク、セッション |
| `2024-11-05` | HTTP+SSE（非推奨） | 最後のフォールバック |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ ステートレス
   ├─ -32022 未対応のバージョン ────────▶ バージョンを切り替え
   └─ それ以外 ─▶ initialize ─┬──▶ セッション（404 のとき再 initialize）
                              └──▶ 旧 HTTP+SSE
```

elicitation と sampling のリクエスト（`input_required`）は、エラーとしてモデルに報告されます。
