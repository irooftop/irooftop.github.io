# Narzędzia MCP

**Ustawienia → Serwery MCP** przyjmuje zwykły JSON `mcpServers`:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Narzędzia docierają do modelu jako `mcp_<serwer>_<narzędzie>`. GIF znaleziony przez Giphy jest wysyłany przez `send_gif {url}`.
* `env`, `headers`, `args`, `command` i `url` mogą używać `${NAZWA}` ze środowiska lub `.env`, dzięki czemu sekrety pozostają poza `settings.json`.
* Serwery stdio działają we własnym katalogu, `data/mcp/<serwer>/`.
* **Połącz ponownie MCP** w Ustawieniach uruchamia je od nowa; status pokazuje protokół i narzędzia każdego serwera.

## Wersje protokołu

| Wersja | Transport | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, bezstanowy | najpierw sprawdzana przez `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP lub stdio | uzgadnianie `initialize`, sesje |
| `2024-11-05` | HTTP+SSE (przestarzały) | ostatnia rezerwa |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ bezstanowy
   ├─ -32022 nieobsługiwana wersja ───▶ zmień wersję
   └─ inaczej ─▶ initialize ─┬──▶ sesja (ponowne initialize przy 404)
                             └──▶ przestarzały HTTP+SSE
```

Żądania elicitation i sampling (`input_required`) są zgłaszane modelowi jako błędy.
