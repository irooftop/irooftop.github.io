# Cấu hình

Biến môi trường, một tệp `.env` trong thư mục làm việc, hoặc các tùy chọn `rooftop` tương ứng
([CLI](./cli)). Các giá trị đặt trong **Cài đặt** có ưu tiên hơn môi trường đối với điểm cuối LLM, mô hình, khóa, nhiệt độ,
ngân sách lịch sử, số bước công cụ, máy chủ MCP, bot Telegram và chế độ ngoại tuyến. `TELEGRAM_BOT_TOKEN` có ưu tiên hơn Cài đặt.

## Mô hình

| Biến | Mặc định | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | mọi API tương thích OpenAI: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | mã thông báo bearer |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | phải hỗ trợ gọi công cụ |
| `OPENAI_TEMPERATURE` | mặc định của nhà cung cấp | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | mô tả hình ảnh và chuyển giọng nói thành văn bản, ví dụ `xiaomi/mimo-v2.6-flash` |

## Ngoại tuyến

| Biến | Mặc định | |
|---|---|---|
| `ROOFTOP_OFFLINE` | tắt | `1`, `true`, `yes` hoặc `on`: chỉ mô hình và máy chủ MCP cục bộ (máy tính này hoặc mạng), không chia sẻ qua Internet, không Telegram. Giống công tắc **Ngoại tuyến** trong Cài đặt, nhưng Cài đặt không thể tắt nó. Ứng dụng máy tính cũng tôn trọng nó. [Ngoại tuyến và quyền riêng tư](../guide/offline) |

## Máy chủ

| Biến | Mặc định | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` trong Docker) | với `0.0.0.0:<cổng>` nhật ký hiển thị URL LAN |
| `ROOFTOP_DATA` | `./data` (`/data` trong Docker) | bản xuất, cuộc chat, cài đặt |
| `ROOFTOP_IMPORT` | – | các bản xuất để nhập khi khởi động, phân tách bằng `:`, có tính idempotent |
| `ROOFTOP_PASSWORD` | – | xác thực HTTP Basic cho giao diện chủ sở hữu (tên người dùng bất kỳ). **Đặt trên máy chủ công khai** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | giới hạn tải lên cho chủ sở hữu tính bằng MiB; `0` nghĩa là không có (bản xuất lên đến nhiều GB). Đặt trên máy chủ mà người khác có thể truy cập. Liên kết chia sẻ giữ giới hạn 16 MiB riêng. Ứng dụng máy tính không có giới hạn |
| `ROOFTOP_TRUST_PROXY` | `false` | IP máy khách từ `X-Forwarded-For` / `X-Real-IP`, chỉ khi đứng sau reverse proxy |
| `ROOFTOP_FFMPEG` | `ffmpeg` trong `PATH`, sau đó Homebrew, `/usr/local`, `/usr/bin` | khung hình của GIF và video (tùy chọn) |
| `TZ` | UTC | múi giờ của tin nhắn trực tiếp |

## Telegram

| Biến | Mặc định | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | bot của bạn từ [@BotFather](https://t.me/BotFather) ([Trả lời từ Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | mọi nhóm bot tham gia | các id nhóm được phép, phân tách bằng dấu phẩy |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | ví dụ một máy chủ Bot API tự lưu trữ |

## Chuyển tiếp

| Biến | Mặc định | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | chuyển tiếp cho chia sẻ qua **Internet** và bot dùng chung |
| `ROOFTOP_RELAY_DOMAIN` | – | chạy một [hub chuyển tiếp](./relay-hub) cho tên miền này |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | bot dùng chung của hub; phải khác `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | số tên tối đa một hub lưu giữ |

## Chỉ trong Cài đặt {#settings-only}

| Cài đặt | Mặc định | |
|---|---|---|
| Ngân sách lịch sử | `120000` ký tự | bao nhiêu lịch sử được phát lại trước khi [bộ nhớ](../features/how-it-works#long-chats) bắt đầu |
| Số bước công cụ tối đa | `6` | vòng LLM mỗi câu trả lời (tìm kiếm, công cụ MCP, trả lời…) |
