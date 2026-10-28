# MCP टूल्स

**सेटिंग्स → MCP सर्वर** सामान्य `mcpServers` JSON स्वीकार करता है:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* टूल मॉडल तक `mcp_<सर्वर>_<टूल>` के रूप में पहुँचते हैं। Giphy से मिला GIF `send_gif {url}` से भेजा जाता है।
* `env`, `headers`, `args`, `command`, और `url` वातावरण या `.env` से `${NAME}` का उपयोग कर सकते हैं, ताकि सीक्रेट `settings.json` से बाहर रहें।
* stdio सर्वर अपनी निर्देशिका `data/mcp/<सर्वर>/` में चलते हैं।
* सेटिंग्स में **Reconnect MCP** उन्हें फिर से शुरू करता है; स्थिति में हर सर्वर का प्रोटोकॉल और टूल दिखते हैं।

## प्रोटोकॉल संशोधन

| संशोधन | ट्रांसपोर्ट | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, स्टेटलेस | पहले `server/discover` से जाँचा जाता है |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP या stdio | `initialize` हैंडशेक, सेशन |
| `2024-11-05` | HTTP+SSE (अप्रचलित) | अंतिम विकल्प |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ स्टेटलेस
   ├─ -32022 असमर्थित संस्करण ─────────▶ संस्करण बदलें
   └─ अन्य ─▶ initialize ─┬──▶ सेशन (404 पर फिर से initialize)
                          └──▶ पुराना HTTP+SSE
```

elicitation और sampling अनुरोध (`input_required`) मॉडल को त्रुटियों के रूप में बताए जाते हैं।
