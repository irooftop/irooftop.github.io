# CLI

```text
rooftop [serve] [TÙY CHỌN]         chạy máy chủ web (mặc định)
rooftop parse <THƯ MỤC>            in bản xuất đã chuẩn hóa dưới dạng JSON
rooftop convert [TÙY CHỌN] <THƯ MỤC>  in {model, messages, tools} của một bản xuất
```

## `serve`

| Tùy chọn | Biến | Mặc định |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (không giới hạn) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | mọi nhóm bot tham gia |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | tắt |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` từ chối các điểm cuối mô hình và MCP không cục bộ, và tắt chia sẻ qua Internet cùng bot Telegram
([Ngoại tuyến và quyền riêng tư](../guide/offline)). Nó không thể kết hợp với `--relay-domain`. Mỗi tùy chọn làm gì: [Cấu hình](./configuration).

## `parse` và `convert`

```sh
rooftop parse   ./examples/telegram                          # JSON đã chuẩn hóa
rooftop convert ./examples/telegram --persona "Jonas Weber"  # những gì mô hình nhận được
```

| Tùy chọn `convert` | Mặc định | |
|---|---|---|
| `--persona` | tiêu đề cuộc chat / người kia | LLM nói thay cho ai |
| `--user` | người tham gia còn lại | ai đóng vai con người |
| `--budget` | `120000` | ngân sách lịch sử theo ký tự |

Trong ứng dụng, nút `{ }` hiển thị cùng JSON cho cuộc chat hiện tại.
