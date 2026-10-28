# Ảnh và giọng nói

Một số người chủ yếu gửi ảnh, số khác chủ yếu nói chuyện bằng tin nhắn thoại. iRoof.top giữ được cả hai thói quen.

## Hiểu chúng

Trong thư viện phương tiện, **Mô tả bằng AI** mô tả nhãn dán, GIF và ảnh và **chuyển tin nhắn thoại thành văn bản** bằng
*mô hình phương tiện*, mô hình này phải chấp nhận hình ảnh và âm thanh. Đặt nó trong Cài đặt hoặc bằng `OPENAI_MEDIA_MODEL`, ví dụ
`google/gemini-3.5-flash-lite` trên OpenRouter. Mô tả chỉ được tạo khi bạn nhấn nút, và với một mô hình cục bộ và
[Chế độ ngoại tuyến](../guide/offline), ảnh không bao giờ rời khỏi máy tính của bạn.

```text
<tin nhắn thoại 0:05: «những gì đã được nói»>
```

Khi một loại chiếm ưu thế, hồ sơ phong cách cho biết điều đó, ví dụ "chủ yếu nói chuyện bằng tin nhắn thoại (10 trên 10)".

### Thư viện lớn

Một cuộc chat dài có thể chứa hàng chục nghìn nhãn dán, GIF và ảnh. Thư viện phương tiện giúp bạn tiêu token của mô hình
vào nơi chúng quan trọng:

| Điều khiển | Chức năng |
|---|---|
| Thẻ loại | Tất cả, Còn thiếu, Đã mô tả, Nhãn dán, GIF, Ảnh, Video, Giọng nói, kèm số đếm |
| Sắp xếp | dùng nhiều nhất (mặc định), dùng ít nhất, dùng gần đây, dùng lần đầu sớm nhất |
| Số lần dùng | ẩn các mục đã dùng ít hơn 2, 3, 5, 10 hoặc 25 lần |
| Tìm kiếm | trong mô tả và mã định danh |

**Mô tả N bằng AI** mô tả chính xác những gì đang hiển thị và chưa được mô tả, **từ trên xuống theo thứ tự đã chọn**,
bốn mục một lúc. Mỗi mô tả được lưu ngay khi nó đến. Dòng tiến trình hiển thị có bao nhiêu mục đã xong, lỗi,
tốc độ và thời gian còn lại. Cùng nút đó biến thành **Dừng**: bạn có thể dừng bất cứ lúc nào, và lần chạy tiếp theo tiếp tục với phần còn lại.
Một khởi đầu tốt cho cuộc chat lớn: *Dùng nhiều nhất trước* và *Đã dùng từ 3 lần trở lên*.

## Tin nhắn thoại của bạn

Khi ô soạn thảo trống, nút gửi trở thành một **micro**, như trong Telegram. Bản ghi được chuyển thành WAV trong
trình duyệt, tải lên và chuyển thành văn bản. Khách truy cập của liên kết chia sẻ cũng có thể ghi âm.

::: info
Trình duyệt chỉ cho phép ghi âm trên `https://` hoặc `localhost`.
:::

## Ảnh và giọng nói của nhân vật

Kết nối một máy chủ MCP tạo hình ảnh và một máy chủ biết nói:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

Khi đó nhân vật có thêm hai hành động:

| Hành động | Chức năng |
|---|---|
| `send_voice {text}` | gọi công cụ giọng nói (WAV, thử lại bằng mp3 nếu lỗi) và gửi một tin nhắn thoại |
| `send_photo {prompt, caption?}` | gọi công cụ hình ảnh và gửi một ảnh |

* Khi kết nối công cụ giọng nói, các tin nhắn thoại đã chuyển thành văn bản của chính nhân vật được phát lại dưới dạng `send_voice`, để mô hình thấy
  thói quen ở dạng mà nó có thể tiếp tục.
* **Giọng** trong *Chi tiết cuộc chat* (ví dụ `Puck`) cho nhân vật giọng nói riêng của họ.
* Bất kỳ ảnh hoặc âm thanh nào khác mà công cụ MCP trả về sẽ trở thành phương tiện cuộc chat `gen_…` (kiểm tra theo nội dung, tối đa 25 MB, bị xóa
  cùng cuộc chat).

::: tip Chi phí
Mỗi ảnh hoặc tin nhắn thoại là một lần gọi có phí thêm: khoảng 0,01 $ mỗi ảnh với `meta/muse-image`, và vài giây TTS.
:::
