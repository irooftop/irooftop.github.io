# ابزارهای MCP

**تنظیمات ← سرورهای MCP** JSON رایج `mcpServers` را می‌پذیرد:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* ابزارها به مدل به شکل `mcp_<سرور>_<ابزار>` می‌رسند. GIFی که با Giphy پیدا شده با `send_gif {url}` فرستاده می‌شود.
* `env`، `headers`، `args`، `command` و `url` می‌توانند از `${NAME}` از محیط یا `.env` استفاده کنند، تا رمزها بیرون از `settings.json` بمانند.
* سرورهای stdio در پوشه‌ی خودشان، `data/mcp/<سرور>/`، اجرا می‌شوند.
* **اتصال مجدد MCP** در تنظیمات آن‌ها را دوباره راه‌اندازی می‌کند؛ وضعیت، پروتکل و ابزارهای هر سرور را فهرست می‌کند.

## نسخه‌های پروتکل

| نسخه | انتقال | |
|---|---|---|
| `2026-07-28` | Streamable HTTP، بی‌حالت | ابتدا با `server/discover` بررسی می‌شود |
| `2025-11-25`، `2025-06-18`، `2025-03-26` | Streamable HTTP یا stdio | دست‌دادن `initialize`، نشست‌ها |
| `2024-11-05` | HTTP+SSE (منسوخ) | آخرین گزینه‌ی جایگزین |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ بی‌حالت
   ├─ -32022 نسخه‌ی پشتیبانی‌نشده ────▶ تغییر نسخه
   └─ دیگر ─▶ initialize ─┬──▶ نشست (در ۴۰۴ دوباره initialize)
                          └──▶ HTTP+SSE قدیمی
```

درخواست‌های elicitation و sampling (`input_required`) به‌عنوان خطا به مدل گزارش می‌شوند.
