# MCP araçları

**Ayarlar → MCP sunucuları**, yaygın `mcpServers` JSON'unu kabul eder:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Araçlar modele `mcp_<sunucu>_<araç>` olarak ulaşır. Giphy ile bulunan bir GIF `send_gif {url}` ile gönderilir.
* `env`, `headers`, `args`, `command` ve `url`, ortamdan ya da `.env`'den `${AD}` kullanabilir; böylece sırlar `settings.json` dışında kalır.
* stdio sunucuları kendi klasörlerinde, `data/mcp/<sunucu>/` içinde çalışır.
* Ayarlar'daki **MCP'yi yeniden bağla** bunları yeniden başlatır; durum her sunucunun protokolünü ve araçlarını listeler.

## Protokol sürümleri

| Sürüm | Taşıma | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, durumsuz | önce `server/discover` ile denenir |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP ya da stdio | `initialize` el sıkışması, oturumlar |
| `2024-11-05` | HTTP+SSE (eskimiş) | son yedek seçenek |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ durumsuz
   ├─ -32022 desteklenmeyen sürüm ────▶ sürümü değiştir
   └─ diğer ─▶ initialize ─┬──▶ oturum (404'te yeniden initialize)
                           └──▶ eski HTTP+SSE
```

Elicitation ve sampling istekleri (`input_required`) modele hata olarak bildirilir.
