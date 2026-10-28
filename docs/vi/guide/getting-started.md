# Bắt đầu

## Cài đặt {#install}

| | Lệnh |
|---|---|
| **Ứng dụng máy tính**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **Ứng dụng máy tính**, Windows | [Trình cài đặt (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) hoặc [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **Ứng dụng máy tính**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) hoặc [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Máy chủ**, macOS và Linux | `brew install irooftop/tap/rooftop` (sau đó `brew services start rooftop`) |
| **Máy chủ**, ở bất kỳ đâu có Rust ≥ 1.88 | `cargo install rooftop` |
| **Máy chủ**, container | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

Ứng dụng máy tính không cần terminal: xem [Ứng dụng máy tính](./desktop).

## Chạy

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # mặc định; mọi API tương thích OpenAI đều chạy được
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # phải hỗ trợ gọi công cụ
rooftop                                               # http://127.0.0.1:8080
```

Các biến cũng có thể nằm trong tệp `.env` cạnh nơi bạn khởi chạy `rooftop`, hoặc được đặt sau trong **Cài đặt**.
**Kiểm tra** trong Cài đặt gửi một yêu cầu nhỏ và cho bạn biết bằng lời đơn giản điều gì sai, ví dụ
"openrouter.ai đã từ chối khóa API (401)".

Muốn không có gì rời khỏi máy tính của bạn? Dùng một mô hình cục bộ và [Chế độ ngoại tuyến](./offline).

## Cuộc trò chuyện đầu tiên

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Xuất      │ ──▶ │ 2. Kéo thả vào     │ ──▶ │ 3. Cuộc trò chuyện   │
 │ cuộc chat    │     │    trang           │     │ mới: chọn AI đóng vai│
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Xuất một cuộc chat](./export) từ Telegram Desktop hoặc WhatsApp.
2. Kéo thư mục, tệp `.zip` hoặc tệp `.txt` của WhatsApp vào trang (hoặc khởi động bằng `rooftop --import <thư mục>`).
3. Nhấn **Cuộc trò chuyện mới** và chọn nhân vật: người kia, hoặc chính bạn ("trò chuyện với chính mình theo phong cách của bạn").

::: tip Thử mà không cần cuộc chat của bạn
Kho mã có hai bản xuất giả định trong [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas và Priya nấu lasagna trên Telegram, Sofia và Daniel trải qua cuối tuần trên WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Không có bản xuất? Bắt đầu từ ghi chú

**Cuộc trò chuyện mới → Từ ghi chú** chỉ cần tên của họ (tên bạn là tùy chọn) và vài dòng về họ: họ là ai,
hai người chia sẻ điều gì, họ viết thế nào ("gọi tôi là cưng, tin nhắn tiếng Ý ngắn, nhiều ❤️"). AI chỉ dựa vào những
ghi chú này để viết như họ. Không có lịch sử thì không có hồ sơ phong cách hay thư viện phương tiện, vì vậy ghi chú càng mô tả cách họ viết thì càng giống. Bạn có thể sửa ghi chú trong cuộc chat bất cứ lúc nào (✎) và chia sẻ cuộc chat qua liên kết như các cuộc khác. Xóa cuộc chat sẽ xóa mọi thứ nó có.

## Trong cửa sổ có gì

| Nút | Chức năng |
|---|---|
| **Chia sẻ** | [Liên kết](../features/share-links) để bạn bè trò chuyện với nhân vật |
| **Thư viện phương tiện** | Mọi nhãn dán, GIF, ảnh và tin nhắn thoại cùng những gì AI biết về chúng |
| **Ghi chú** | Những điều về người đó mà bản xuất không nói. Nhân vật đọc được, khách truy cập thì không bao giờ |
| **`{ }`** | JSON chính xác được gửi đến mô hình và số token đã dùng |
| **Viết lại** | Bỏ câu trả lời cuối của nhân vật và viết lại |
| **Để họ viết trước** | Nhân vật bắt đầu cuộc trò chuyện |
