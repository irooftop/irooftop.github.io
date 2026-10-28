# أدوات MCP

يقبل **الإعدادات ← خوادم MCP** صيغة JSON المعتادة `mcpServers`:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* تصل الأدوات إلى النموذج باسم `mcp_<الخادم>_<الأداة>`. يُرسل GIF الذي يُعثر عليه عبر Giphy بـ`send_gif {url}`.
* يمكن أن تستخدم `env` و`headers` و`args` و`command` و`url` القيمة `${الاسم}` من البيئة أو من `.env`، لتبقى الأسرار خارج `settings.json`.
* تعمل خوادم stdio في مجلدها الخاص، `data/mcp/<الخادم>/`.
* يعيد **إعادة الاتصال بـ MCP** في الإعدادات تشغيلها؛ تسرد الحالة بروتوكول كل خادم وأدواته.

## إصدارات البروتوكول

| الإصدار | النقل | |
|---|---|---|
| `2026-07-28` | Streamable HTTP، عديم الحالة | يُجرَّب أولًا بـ`server/discover` |
| `2025-11-25`، `2025-06-18`، `2025-03-26` | Streamable HTTP أو stdio | مصافحة `initialize`، والجلسات |
| `2024-11-05` | HTTP+SSE (مهجور) | الخيار الاحتياطي الأخير |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ عديم الحالة
   ├─ -32022 إصدار غير مدعوم ───────────▶ بدّل الإصدار
   └─ غير ذلك ─▶ initialize ─┬──▶ جلسة (إعادة initialize عند 404)
                             └──▶ HTTP+SSE القديم
```

تُبلَّغ طلبات elicitation وsampling (`input_required`) إلى النموذج كأخطاء.
