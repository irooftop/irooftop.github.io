# Cách hoạt động

<div class="wide">

![iRoof.top hoạt động như thế nào](/how-it-works.svg)

</div>

Mỗi bản xuất trở thành cùng những tin nhắn đã chuẩn hóa. Sau đó mọi hành động của nhân vật được phát lại cho mô hình như một
**lời gọi công cụ**, để nó học *cách* người đó tương tác, không chỉ điều họ viết, và trả lời theo cùng cách.

## Hành động như lời gọi công cụ

| Điều nhân vật đã làm | Lời gọi công cụ trong lịch sử và trong câu trả lời trực tiếp |
|---|---|
| bong bóng văn bản, có thể là một câu trả lời hoặc trích dẫn một phần | `send_message {text, reply_to?, quote?}` |
| nhãn dán | `send_sticker {sticker_id, reply_to?}` |
| GIF từ thư viện, hoặc một URL từ công cụ MCP | `send_gif {gif_id \| url, caption?}` |
| ảnh, video, giọng nói, âm thanh, tệp | `send_media {media_id, caption?}` |
| bài đăng được chuyển tiếp | `forward_message {message_id}` |
| phản ứng | `react {message_id, emoji}` |
| *(nhớ lại lịch sử cũ)* | `search_history {query}` |

Nhiều lời gọi trong một lượt trở thành nhiều bong bóng. Tin nhắn từ phía bên kia trở thành các dòng gọn mà các mã định danh tham chiếu đến:

```text
#52108 19:08 ↩ trả lời #52107 (bạn: "lasagna của bà 🍝"): Bạn chưa bao giờ làm lasagna lần nào.
<sticker stk_156dbb381a>: một con mèo đội mũ đầu bếp đang khuấy nồi
đã thả 😂 vào #52107 ("lasagna của bà 🍝")
```

## Lời nhắc hệ thống

| Phần | |
|---|---|
| Nên là ai | ước lượng kiến thức và phong cách của nhân vật, và không bao giờ biết nhiều hơn những gì họ biết |
| Hồ sơ phong cách | từ *toàn bộ* bản xuất: độ dài tin nhắn, viết hoa, dấu câu, việc dùng emoji và nhãn dán, thói quen trả lời và phản ứng, số bong bóng mỗi lượt, mẫu nguyên văn |
| Thư viện | nhãn dán, GIF và phương tiện cùng cách chúng đã được dùng |
| Ghi chú | những gì bạn đã viết về người đó |

Lời nhắc là **tĩnh** cho một cuộc chat: không có đồng hồ, không có bộ đếm. Mô hình đọc thời gian từ các dấu phân cách `— ngày —`
và dấu thời gian `HH:MM`, và mỗi yêu cầu là tiền tố giống hệt từng byte của yêu cầu tiếp theo, nên bộ nhớ đệm lời nhắc của nhà cung cấp tiếp tục trúng.

## Cuộc chat dài {#long-chats}

```
 ngân sách lịch sử ────────────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ bộ nhớ (≤ 350 từ)    │ các lượt gần nhất, cắt còn 60 %        │
 └──────────────────────┴────────────────────────────────────────┘
   quan hệ, sự kiện,      điểm cắt đứng yên trong thời gian dài,
   chủ đề, trò đùa        nên tiền tố đã lưu đệm cũng vậy
```

Khi lịch sử được phát lại vượt quá ngân sách, câu trả lời tiếp theo trước hết gom các lượt cũ nhất (và bộ nhớ trước đó)
thành một bản tóm tắt ngắn. Không có gì bị tiêu tốn khi nhập hay khi mở một cuộc chat. Hồ sơ phong cách vẫn lấy từ toàn bộ
bản xuất, và `search_history` tiếp cận mọi tin nhắn cũ. `usage` của token (prompt, đã lưu đệm, phần hoàn thành) được hiển thị trong `{ }`.

## Thư viện phương tiện

Mô hình chat đọc văn bản, nên một nhãn dán chỉ là `<sticker stk_…>` cho đến khi nó được mô tả. **Mô tả bằng AI** gửi
hình ảnh của các mục còn thiếu đến mô hình phương tiện, mô hình này phải hỗ trợ thị giác.

* GIF, nhãn dán video và video được gửi dưới dạng **4 khung hình theo thứ tự**, để mô hình thấy chuyển động. Điều này cần
  [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`), nếu không thì dùng ảnh thu nhỏ.
* **Làm lại** mô tả lại một mục. Mọi mô tả đều có thể sửa bằng tay.
* Các mô tả thuộc về bản xuất và phục vụ mọi cuộc chat của nó.

Tự xem bằng [CLI](../reference/cli): `rooftop convert <bản xuất> --persona "Jonas Weber"`.
