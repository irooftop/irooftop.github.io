# MCP 工具

**设置 → MCP 服务器**接受常见的 `mcpServers` JSON：

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* 工具以 `mcp_<服务器>_<工具>` 的形式呈现给模型。通过 Giphy 找到的 GIF 会用 `send_gif {url}` 发送。
* `env`、`headers`、`args`、`command` 和 `url` 可以使用来自环境或 `.env` 的 `${名称}`，这样密钥就不会出现在 `settings.json` 中。
* stdio 服务器在它们自己的目录 `data/mcp/<服务器>/` 中运行。
* 设置中的**重新连接 MCP**会重新启动它们；状态会列出每个服务器的协议和工具。

## 协议版本

| 版本 | 传输方式 | |
|---|---|---|
| `2026-07-28` | Streamable HTTP，无状态 | 先通过 `server/discover` 探测 |
| `2025-11-25`、`2025-06-18`、`2025-03-26` | Streamable HTTP 或 stdio | `initialize` 握手，会话 |
| `2024-11-05` | HTTP+SSE（已弃用） | 最后的回退方案 |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ 无状态
   ├─ -32022 不支持的版本 ────────────▶ 切换版本
   └─ 其他 ─▶ initialize ─┬──▶ 会话（遇到 404 时重新 initialize）
                          └──▶ 旧版 HTTP+SSE
```

elicitation 和 sampling 请求（`input_required`）会以错误的形式报告给模型。
