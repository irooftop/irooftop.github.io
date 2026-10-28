# Alat MCP

**Pengaturan → Server MCP** menerima JSON `mcpServers` yang umum:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Alat mencapai model sebagai `mcp_<server>_<alat>`. GIF yang ditemukan dengan Giphy dikirim dengan `send_gif {url}`.
* `env`, `headers`, `args`, `command`, dan `url` dapat menggunakan `${NAMA}` dari lingkungan atau `.env`, sehingga rahasia tetap di luar `settings.json`.
* Server stdio berjalan di direktorinya sendiri, `data/mcp/<server>/`.
* **Sambungkan ulang MCP** di Pengaturan memulainya lagi; statusnya mencantumkan protokol dan alat setiap server.

## Revisi protokol

| Revisi | Transport | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, tanpa status | diuji pertama dengan `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP atau stdio | jabat tangan `initialize`, sesi |
| `2024-11-05` | HTTP+SSE (usang) | cadangan terakhir |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ tanpa status
   ├─ -32022 versi tidak didukung ────▶ ganti versi
   └─ lainnya ─▶ initialize ─┬──▶ sesi (initialize ulang saat 404)
                             └──▶ HTTP+SSE lama
```

Permintaan elicitation dan sampling (`input_required`) dilaporkan ke model sebagai galat.
