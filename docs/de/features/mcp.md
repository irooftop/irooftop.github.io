# MCP-Tools

**Einstellungen → MCP-Server** akzeptiert das übliche JSON `mcpServers`:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Tools erreichen das Modell als `mcp_<server>_<tool>`. Ein mit Giphy gefundenes GIF wird mit `send_gif {url}` gesendet.
* `env`, `headers`, `args`, `command` und `url` dürfen `${NAME}` aus der Umgebung oder der `.env` verwenden, damit Geheimnisse aus `settings.json` herausbleiben.
* stdio-Server laufen in ihrem eigenen Verzeichnis, `data/mcp/<server>/`.
* **MCP neu verbinden** in den Einstellungen startet sie neu; der Status zeigt das Protokoll und die Tools jedes Servers.

## Protokollversionen

| Version | Transport | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, zustandslos | zuerst mit `server/discover` geprüft |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP oder stdio | `initialize`-Handshake, Sitzungen |
| `2024-11-05` | HTTP+SSE (veraltet) | letzter Fallback |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ zustandslos
   ├─ -32022 nicht unterstützte Version ─▶ Version wechseln
   └─ sonst ─▶ initialize ─┬──▶ Sitzung (bei 404 erneut initialize)
                           └──▶ Legacy-HTTP+SSE
```

Elicitation- und Sampling-Anfragen (`input_required`) werden dem Modell als Fehler gemeldet.
