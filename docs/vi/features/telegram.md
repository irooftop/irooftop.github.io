# Trả lời từ Telegram

Một liên kết chia sẻ có thể đăng tin nhắn của khách truy cập vào một nhóm Telegram. Bạn trả lời ở đó, hoặc AI trả lời khi
đồng hồ đếm ngược kết thúc. Khách truy cập thấy cùng dòng "đang nhập…" trong cả hai trường hợp và không thể biết ai đã trả lời: một trò chơi "người hay AI?", hoặc
một bàn hỗ trợ nơi AI xử lý những câu hỏi hiển nhiên.

```
 khách truy cập ──▶ liên kết chia sẻ ──▶ 🤖 bot ──▶ nhóm Telegram của bạn
                                                  ├─ ✍️ Trả lời          bạn trả lời
                                                  └─ 🤖 Trả lời AI (10 giây) AI trả lời ngay, hoặc khi đếm ngược kết thúc
```

## Thiết lập

**Cài đặt → Telegram** hiển thị bot, nó có đang kết nối hay không, và mọi nhóm mà nó ở trong đó.

| Chế độ | Thiết lập | Tin nhắn đi đến |
|---|---|---|
| **Bot dùng chung** | không có | qua chuyển tiếp (iroof.top), dạng văn bản thuần như mọi bot |
| **Bot của riêng bạn** | tạo một cái với [@BotFather](https://t.me/BotFather), dán mã thông báo và **Kết nối** | trực tiếp giữa ứng dụng của bạn và Telegram |
| `TELEGRAM_BOT_TOKEN` | trên máy chủ; `TELEGRAM_CHAT_ID` giới hạn các nhóm | trực tiếp; ưu tiên hơn Cài đặt |

Sau đó nhấn **Thêm vào nhóm**:

1. Mở liên kết trong **ứng dụng Telegram**, trong **Telegram Web**, hoặc quét mã QR bằng điện thoại. Cả hai liên kết đều có thể sao chép.
2. Chọn một nhóm (hoặc tạo một nhóm) và xác nhận.
3. Hộp thoại chuyển sang màu xanh lá, và nhóm xuất hiện trong Cài đặt và trong mọi liên kết chia sẻ.

Với bot dùng chung, liên kết mang một mã dùng một lần, có hiệu lực một giờ, chỉ gắn nhóm với ứng dụng của bạn.

Cuối cùng, chọn nhóm dưới **Nhóm Telegram** trong một liên kết chia sẻ, và đặt sau bao nhiêu giây AI trả lời
(`0` = chỉ khi bạn nhấn **Trả lời AI**).

::: tip Quyền riêng tư
Chỉ các tin nhắn mới của khách truy cập và câu trả lời của AI được đăng vào nhóm, không bao giờ là lịch sử đã xuất. Chế độ ngoại tuyến tắt
bot. Chi tiết: [Ngoại tuyến và quyền riêng tư](../guide/offline#the-telegram-bot).
:::

::: tip Không cần địa chỉ công khai
Cả hai loại bot đều dùng long polling, nên hoạt động từ một máy tính xách tay. Một mã thông báo bot chỉ hoạt động trong một ứng dụng tại một thời điểm.
:::

## Ba cách trả lời

1. Trả lời lời nhắc "✍️ … trả lời tin nhắn này" của bot.
2. Trả lời tin nhắn của khách truy cập (hoặc một câu trả lời AI) bất cứ lúc nào, mà không cần nhấn **Trả lời**.
3. Nhấn **Trả lời**, rồi cứ viết. Trong 15 phút, tin nhắn của bạn đi đến khách truy cập đó, và thêm 2 phút sau mỗi
   câu trả lời, nên một câu trả lời có thể kéo dài qua nhiều tin nhắn.

Cách thứ ba cần bot thấy các tin nhắn nhóm thông thường: tắt chế độ quyền riêng tư (@BotFather → `/setprivacy` → Disable, rồi
thêm lại bot) hoặc đặt bot làm quản trị viên. Cách 1 và 2 luôn hoạt động.

::: warning Dùng một nhóm mà bạn tin cậy
Bất kỳ ai trong nhóm đều có thể trả lời. Chỉ các câu trả lời văn bản được chuyển tiếp, và các câu trả lời AI được tính vào giới hạn của liên kết.
:::
