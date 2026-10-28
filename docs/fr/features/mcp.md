# Outils MCP

**Paramètres → Serveurs MCP** accepte le JSON habituel `mcpServers` :

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Les outils atteignent le modèle sous la forme `mcp_<serveur>_<outil>`. Un GIF trouvé avec Giphy est envoyé avec `send_gif {url}`.
* `env`, `headers`, `args`, `command` et `url` peuvent utiliser `${NOM}` depuis l'environnement ou `.env`, pour que les secrets restent hors de `settings.json`.
* Les serveurs stdio s'exécutent dans leur propre dossier, `data/mcp/<serveur>/`.
* **Reconnecter MCP** dans les Paramètres les redémarre ; l'état affiche le protocole et les outils de chaque serveur.

## Révisions du protocole

| Révision | Transport | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, sans état | testée d'abord avec `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP ou stdio | poignée de main `initialize`, sessions |
| `2024-11-05` | HTTP+SSE (obsolète) | dernier recours |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ sans état
   ├─ -32022 version non prise en charge ─▶ changer de version
   └─ autre ─▶ initialize ─┬──▶ session (réinitialisation sur 404)
                           └──▶ HTTP+SSE hérité
```

Les demandes d'elicitation et d'échantillonnage (`input_required`) sont signalées au modèle comme des erreurs.
