# MCP ٹولز

**Settings → MCP servers** عام `mcpServers` JSON لیتا ہے:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* ٹولز ماڈل تک `mcp_<server>_<tool>` کے نام سے پہنچتے ہیں۔ Giphy سے ملا GIF `send_gif {url}` کے ساتھ بھیجا جاتا ہے۔
* `env`، `headers`، `args`، `command` اور `url` ماحول یا `.env` سے `${NAME}` استعمال کر سکتے ہیں، تاکہ راز `settings.json` سے باہر رہیں۔
* stdio سرورز اپنی ڈائریکٹری `data/mcp/<server>/` میں چلتے ہیں۔
* Settings میں **Reconnect MCP** انہیں دوبارہ شروع کرتا ہے؛ حالت ہر سرور کا پروٹوکول اور ٹولز دکھاتی ہے۔

## پروٹوکول کے ورژنز

| ورژن | ٹرانسپورٹ | |
|---|---|---|
| `2026-07-28` | Streamable HTTP، stateless | پہلے `server/discover` سے جانچا جاتا ہے |
| `2025-11-25`، `2025-06-18`، `2025-03-26` | Streamable HTTP یا stdio | `initialize` ہینڈ شیک، سیشنز |
| `2024-11-05` | HTTP+SSE (متروک) | آخری متبادل |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ stateless
   ├─ -32022 unsupported version ─────▶ ورژن بدلیں
   └─ باقی ہر چیز ─▶ initialize ─┬──▶ سیشن (404 پر دوبارہ initialize)
                                 └──▶ پرانا HTTP+SSE
```

Elicitation اور sampling کی درخواستیں (`input_required`) ماڈل کو خرابیوں کے طور پر بتائی جاتی ہیں۔
