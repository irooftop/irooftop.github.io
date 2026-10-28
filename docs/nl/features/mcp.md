# MCP-tools

**Instellingen → MCP-servers** accepteert de gebruikelijke `mcpServers`-JSON:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Tools bereiken het model als `mcp_<server>_<tool>`. Een GIF die via Giphy is gevonden, wordt verstuurd met `send_gif {url}`.
* `env`, `headers`, `args`, `command` en `url` mogen `${NAAM}` gebruiken uit de omgeving of `.env`, zodat geheimen buiten `settings.json` blijven.
* Stdio-servers draaien in hun eigen map, `data/mcp/<server>/`.
* **MCP opnieuw verbinden** in Instellingen start ze opnieuw; de status toont het protocol en de tools van elke server.

## Protocolversies

| Versie | Transport | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, stateless | eerst getest met `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP of stdio | `initialize`-handshake, sessies |
| `2024-11-05` | HTTP+SSE (verouderd) | laatste terugvaloptie |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ stateless
   ├─ -32022 niet-ondersteunde versie ─▶ versie wisselen
   └─ anders ─▶ initialize ─┬──▶ sessie (opnieuw initialize bij 404)
                            └──▶ verouderde HTTP+SSE
```

Elicitation- en sampling-verzoeken (`input_required`) worden aan het model gemeld als fouten.
