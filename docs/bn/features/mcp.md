# MCP টুল

**সেটিংস → MCP সার্ভার** সাধারণ `mcpServers` JSON গ্রহণ করে:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* টুলগুলো মডেলে `mcp_<সার্ভার>_<টুল>` হিসেবে পৌঁছায়। Giphy দিয়ে পাওয়া একটি GIF `send_gif {url}` দিয়ে পাঠানো হয়।
* `env`, `headers`, `args`, `command`, ও `url` পরিবেশ বা `.env` থেকে `${NAME}` ব্যবহার করতে পারে, যাতে গোপন তথ্য `settings.json`-এর বাইরে থাকে।
* stdio সার্ভারগুলো তাদের নিজস্ব ডিরেক্টরি `data/mcp/<সার্ভার>/`-এ চলে।
* সেটিংস-এর **Reconnect MCP** সেগুলো পুনরায় চালু করে; স্ট্যাটাসে প্রতিটি সার্ভারের প্রোটোকল ও টুল তালিকাভুক্ত থাকে।

## প্রোটোকল সংস্করণ

| সংস্করণ | ট্রান্সপোর্ট | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, স্টেটলেস | আগে `server/discover` দিয়ে পরীক্ষা করা হয় |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP বা stdio | `initialize` হ্যান্ডশেক, সেশন |
| `2024-11-05` | HTTP+SSE (অপ্রচলিত) | শেষ বিকল্প |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ স্টেটলেস
   ├─ -32022 অসমর্থিত সংস্করণ ─────────▶ সংস্করণ বদলান
   └─ অন্যথায় ─▶ initialize ─┬──▶ সেশন (৪০৪-এ আবার initialize)
                              └──▶ পুরোনো HTTP+SSE
```

elicitation ও sampling অনুরোধ (`input_required`) মডেলকে ত্রুটি হিসেবে জানানো হয়।
