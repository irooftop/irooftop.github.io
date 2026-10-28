# Strumenti MCP

**Impostazioni → Server MCP** accetta il consueto JSON `mcpServers`:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Gli strumenti arrivano al modello come `mcp_<server>_<strumento>`. Una GIF trovata con Giphy viene inviata con `send_gif {url}`.
* `env`, `headers`, `args`, `command` e `url` possono usare `${NOME}` dall'ambiente o da `.env`, così i segreti restano fuori da `settings.json`.
* I server stdio vengono eseguiti nella propria cartella, `data/mcp/<server>/`.
* **Riconnetti MCP** nelle Impostazioni li riavvia; lo stato elenca il protocollo e gli strumenti di ogni server.

## Revisioni del protocollo

| Revisione | Trasporto | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, senza stato | provata prima con `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP o stdio | handshake `initialize`, sessioni |
| `2024-11-05` | HTTP+SSE (obsoleto) | ultimo ripiego |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ senza stato
   ├─ -32022 versione non supportata ─▶ cambia versione
   └─ altro ─▶ initialize ─┬──▶ sessione (di nuovo initialize con 404)
                           └──▶ HTTP+SSE legacy
```

Le richieste di elicitation e di sampling (`input_required`) vengono riportate al modello come errori.
