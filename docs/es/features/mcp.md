# Herramientas MCP

**Ajustes → Servidores MCP** acepta el JSON habitual `mcpServers`:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Las herramientas llegan al modelo como `mcp_<servidor>_<herramienta>`. Un GIF encontrado con Giphy se envía con `send_gif {url}`.
* `env`, `headers`, `args`, `command` y `url` pueden usar `${NOMBRE}` del entorno o de `.env`, así que los secretos quedan fuera de `settings.json`.
* Los servidores stdio se ejecutan en su propio directorio, `data/mcp/<servidor>/`.
* **Reconectar MCP** en Ajustes los reinicia; el estado muestra el protocolo y las herramientas de cada servidor.

## Revisiones del protocolo

| Revisión | Transporte | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, sin estado | se prueba primero con `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP o stdio | handshake `initialize`, sesiones |
| `2024-11-05` | HTTP+SSE (obsoleto) | último recurso |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ sin estado
   ├─ -32022 versión no soportada ────▶ cambiar de versión
   └─ cualquier otra cosa ─▶ initialize ─┬──▶ sesión (vuelve a initialize con 404)
                                         └──▶ HTTP+SSE heredado
```

Las solicitudes de elicitación y de muestreo (`input_required`) se comunican al modelo como errores.
