# MCP 도구

**설정 → MCP 서버**는 일반적인 `mcpServers` JSON을 받습니다.

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* 도구는 모델에 `mcp_<서버>_<도구>`로 전달됩니다. Giphy로 찾은 GIF는 `send_gif {url}`로 보내집니다.
* `env`, `headers`, `args`, `command`, `url`은 환경이나 `.env`의 `${NAME}`을 사용할 수 있으므로, 비밀 정보를 `settings.json` 밖에 둘 수 있습니다.
* stdio 서버는 자기 폴더 `data/mcp/<서버>/`에서 실행됩니다.
* 설정의 **MCP 다시 연결**은 서버를 다시 시작합니다. 상태에는 각 서버의 프로토콜과 도구가 나열됩니다.

## 프로토콜 버전

| 버전 | 전송 방식 | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, 무상태 | `server/discover`로 먼저 확인 |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP 또는 stdio | `initialize` 핸드셰이크, 세션 |
| `2024-11-05` | HTTP+SSE (사용 중단됨) | 마지막 대체 수단 |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ 무상태
   ├─ -32022 지원하지 않는 버전 ───────▶ 버전 전환
   └─ 그 밖 ─▶ initialize ─┬──▶ 세션 (404이면 다시 initialize)
                           └──▶ 이전 HTTP+SSE
```

elicitation과 sampling 요청(`input_required`)은 오류로 모델에 보고됩니다.
