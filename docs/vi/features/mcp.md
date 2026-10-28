# Công cụ MCP

**Cài đặt → Máy chủ MCP** chấp nhận JSON `mcpServers` thông thường:

```json
{
  "giphy":  { "command": "npx", "args": ["-y", "mcp-server-giphy"], "env": { "GIPHY_API_KEY": "…" } },
  "remote": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer …" } },
  "legacy": { "url": "https://old.example.com/sse", "type": "sse" }
}
```

* Công cụ đến mô hình dưới dạng `mcp_<máy chủ>_<công cụ>`. Một GIF tìm được qua Giphy được gửi bằng `send_gif {url}`.
* `env`, `headers`, `args`, `command` và `url` có thể dùng `${TÊN}` từ môi trường hoặc `.env`, để bí mật nằm ngoài `settings.json`.
* Máy chủ stdio chạy trong thư mục riêng của nó, `data/mcp/<máy chủ>/`.
* **Kết nối lại MCP** trong Cài đặt khởi động lại chúng; trạng thái liệt kê giao thức và công cụ của mỗi máy chủ.

## Phiên bản giao thức

| Phiên bản | Truyền tải | |
|---|---|---|
| `2026-07-28` | Streamable HTTP, không trạng thái | thử trước bằng `server/discover` |
| `2025-11-25`, `2025-06-18`, `2025-03-26` | Streamable HTTP hoặc stdio | bắt tay `initialize`, phiên |
| `2024-11-05` | HTTP+SSE (đã lỗi thời) | phương án dự phòng cuối cùng |

```
 server/discover (2026-07-28)
   ├─ ok ─────────────────────────────▶ không trạng thái
   ├─ -32022 phiên bản không được hỗ trợ ─▶ đổi phiên bản
   └─ khác ─▶ initialize ─┬──▶ phiên (initialize lại khi 404)
                          └──▶ HTTP+SSE cũ
```

Các yêu cầu elicitation và sampling (`input_required`) được báo cho mô hình dưới dạng lỗi.
