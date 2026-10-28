# API HTTP

JSON qua HTTP. Khi `ROOFTOP_PASSWORD` được đặt, API của chủ sở hữu yêu cầu xác thực HTTP Basic.

## Chủ sở hữu

| Phương thức | Đường dẫn | |
|---|---|---|
| GET | `/api/state` | bản xuất, cuộc chat, liên kết chia sẻ, thông tin LLM |
| POST | `/api/exports` | tải lên multipart: các tệp thư mục với tên tương đối, hoặc một `.zip`. Trả về `202 {"id"}` ngay và nhập ở chế độ nền |
| POST | `/api/uploads` | bắt đầu tải lên theo lô (giao diện web dùng): `{"id"}` |
| POST | `/api/uploads/{id}/files` | lô multipart các tệp có tên tương đối; gửi lại một lô sẽ thay thế các tệp của nó: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | sau các tệp chat, trước phương tiện: `{"bytes"}` còn phải gửi → `{title, messages, existing, fits, free_bytes, needed_bytes}` (đã nhập chưa? đủ dung lượng đĩa không?) |
| POST | `/api/uploads/{id}/import` | nhập mọi thứ đã tải lên cho đến nay: `202 {"id"}` của công việc nhập |
| DELETE | `/api/uploads/{id}` | hủy một lần tải lên chưa hoàn tất (các lần bỏ dở bị xóa sau 24 giờ và khi khởi động lại) |
| POST | `/api/local/pick` | chỉ ứng dụng máy tính: hiển thị bộ chọn gốc, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` nếu hủy) |
| POST | `/api/local/import` | chỉ ứng dụng máy tính: nhập từ máy tính này, `{"paths": […]}` (một thư mục, `.zip` hoặc `.txt` WhatsApp; các tệp trong cùng một bản xuất đại diện cho thư mục của nó) → `202 {"id", "name"}` của công việc nhập; nguồn được sao chép, không bao giờ bị thay đổi |
| GET | `/api/imports/{id}` | tiến trình của một công việc nhập, xem bên dưới |
| GET · DELETE | `/api/exports/{id}` | chi tiết kèm thư viện phương tiện · xóa cùng các cuộc chat |
| POST | `/api/exports/{id}/describe` | mô tả thư viện phương tiện |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; không có `export_id`, một cuộc chat chỉ từ ghi chú: `persona` là tên họ, `user` là tên bạn (mặc định `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | dòng thời gian (`?limit=`) · tiêu đề và ghi chú · xóa |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` để xóa) |
| POST | `/api/chats/{id}/voice` | `file` multipart (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | cho nhân vật hành động; trả về các tin nhắn và hành động theo thứ tự |
| POST | `/api/chats/{id}/regenerate` | bỏ lượt cuối của nhân vật và trả lời lại |
| GET | `/api/chats/{id}/prompt` | `{model, messages, tools}` chính xác |
| GET · POST | `/api/chats/{id}/shares` | liệt kê · tạo liên kết chia sẻ |
| PATCH · DELETE | `/api/shares/{id}` | sửa (`pin: ""` xóa PIN, `revoke_sessions`) · xóa |
| DELETE | `/api/shares/{id}/sessions/{session}` | kết thúc một cuộc trò chuyện của khách truy cập |
| GET · PUT | `/api/settings` | LLM, MCP và Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | trạng thái MCP · kết nối lại |
| GET · POST | `/api/telegram` · `/api/telegram/link` | trạng thái bot và các nhóm · một liên kết `t.me` thêm bot vào nhóm |
| GET · PUT | `/api/sharing` | chia sẻ Wi‑Fi và Internet `{lan?, internet?, name?}` (giao diện chủ sở hữu chỉ trên localhost) |
| GET | `/api/qr?text=…` | một mã QR (SVG) |

### Công việc nhập

`GET /api/imports/{id}` trả về

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (một lần nhập khác đang chạy; chúng chạy lần lượt), `running`, `done` hoặc `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` trên `total` trang), `hashing` và `placing` (tệp), `saving`.
* `messages`: số tin nhắn đã tìm thấy cho đến nay.
* `failed` thêm `error`, ví dụ `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` thêm `created` (`false` nếu cùng bản xuất đã được nhập trước đó) và `export`, bản tóm tắt cũng có trong `/api/state`.

16 công việc đã hoàn thành gần nhất được giữ lại; một id không rõ trả về 404.

## Công khai

Không cần mật khẩu, dành cho khách truy cập liên kết chia sẻ:

| Phương thức | Đường dẫn | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | trang khách truy cập |
| GET | `/api/s/{name}` | thông tin trang bắt đầu |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | dòng thời gian |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | như cho chủ sở hữu; `regenerate`, và `respond` không có tin nhắn mới của khách truy cập ("để họ viết trước"), chỉ khi liên kết có `allow_regenerate` / `allow_nudge` (nếu không thì `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | phương tiện mà khách truy cập được phép xem |

## Hub chuyển tiếp

| Phương thức | Đường dẫn | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, giành hoặc đổi tên (`Authorization: Bearer <bí mật>`) |
| GET | `/relay/v1/connect` | WebSocket của ứng dụng |
| GET | `/relay/v1/info` | thông tin hub |
| * | `/relay/v1/tg/bot<bí mật>/<phương thức>` | proxy Bot API của bot dùng chung |
