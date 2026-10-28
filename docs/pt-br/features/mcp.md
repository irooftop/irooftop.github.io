# Ferramentas MCP

**Configurações → Servidores MCP** aceita o JSON `mcpServers` usual:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* As ferramentas chegam ao modelo como `mcp_<servidor>_<ferramenta>`. Um GIF encontrado com o Giphy é enviado com `send_gif {url}`.
* `env`, `headers`, `args`, `command` e `url` podem usar `${NOME}` do ambiente ou do `.env`, para que segredos fiquem fora do `settings.json`.
* Servidores stdio rodam no próprio diretório, `data/mcp/<servidor>/`.
* **Reconectar MCP** nas Configurações os reinicia; o status lista o protocolo e as ferramentas de cada servidor.

## Revisões do protocolo

| Revisão | Transporte | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, sem estado | testada primeiro com `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP ou stdio | handshake `initialize`, sessões |
| `2024-11-05` | HTTP+SSE (obsoleto) | último recurso |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ sem estado
   ├─ -32022 versão não suportada ────▶ trocar de versão
   └─ outra coisa ─▶ initialize ─┬──▶ sessão (initialize de novo em 404)
                                 └──▶ HTTP+SSE legado
```

Requisições de elicitation e sampling (`input_required`) são informadas ao modelo como erros.
