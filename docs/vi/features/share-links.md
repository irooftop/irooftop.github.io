# Liên kết chia sẻ

**Chia sẻ** trong tiêu đề cuộc chat tạo liên kết để người khác có thể trò chuyện với nhân vật, ví dụ:

* một người bạn đánh giá AI viết giỏi đến mức nào **theo phong cách của bạn**;
* một người bạn trò chuyện với **một bản sao của chính họ**.

Liên kết có dạng `https://<máy chủ của bạn>/s/<tên>`. Khách truy cập chỉ thấy cuộc chat: không có thanh bên, cài đặt, ghi chú, mô tả phương tiện,
lời nhắc, mức dùng token hay các cuộc chat khác.

## Tùy chọn

| Tùy chọn | Mặc định | |
|---|---|---|
| Ai có thể mở | máy tính này | các công tắc **Wi‑Fi** và **Internet**, ngay trong trình chỉnh sửa ([bên dưới](#open-links-on-other-devices)) |
| Liên kết | ngẫu nhiên | chọn một tên như `alex` |
| Tên hiển thị | tên nhân vật | tên thật từ bản xuất không được hiển thị |
| PIN | không có | 4–64 ký tự, lưu dưới dạng băm Argon2id. ✨ tạo 6 chữ số |
| Cuộc trò chuyện | riêng tư | **Riêng tư**: một cuộc trò chuyện cho mỗi khách truy cập. **Phòng chung**: mọi người trong một cuộc trò chuyện |
| Khách truy cập có thể đọc bản xuất | không gì | không gì, *N* tin nhắn cuối, hoặc tất cả |
| Giới hạn | 50 khách truy cập, 200 câu trả lời mỗi người | mỗi câu trả lời tốn token của khóa bạn. `0` = không giới hạn |
| Khách truy cập có thể để họ viết trước | tắt | hiển thị nút 💬: nhân vật gửi một tin nhắn mà không cần khách truy cập viết gì |
| Khách truy cập có thể viết lại một câu trả lời | tắt | hiển thị nút ↻: câu trả lời cuối của nhân vật được viết lại. Cả hai đều dùng một câu trả lời của giới hạn, và máy chủ từ chối chúng khi chúng tắt |
| Hết hạn / đang hoạt động | không bao giờ / bật | tạm dừng hoặc làm hết hạn một liên kết mà không xóa nó |
| Nhóm Telegram | tắt | [trả lời từ Telegram](./telegram) |

Trong hộp thoại Chia sẻ, bạn có thể **Đọc** mọi cuộc trò chuyện của khách truy cập, và **Kết thúc** một cuộc để thu hồi. Mỗi khách truy cập hiển thị
địa chỉ mà họ đã gửi tin nhắn cuối cùng từ đó; khi kết thúc một cuộc trò chuyện, **Đồng thời chặn** giữ địa chỉ đó
khỏi liên kết (trang bắt đầu, các cuộc trò chuyện mới và các cuộc đang mở) cho đến khi bạn **Bỏ chặn**. Trên một mạng dùng chung,
một địa chỉ có thể là nhiều người. Địa chỉ được lưu cùng liên kết, chỉ trên máy tính của bạn.

## Nhân vật nói chuyện với ai

Khách truy cập không phải là bạn. Khi Mia mở liên kết của bạn, nhân vật biết rằng **Mia** đang viết, rằng liên kết
đến từ bạn, và rằng lịch sử và ghi chú của bạn nói về bạn và họ, không phải về Mia: nó gặp cô ấy
như một người mới. Không có tên thì cô ấy chỉ là một khách.

| | Nhân vật thấy |
|---|---|
| Liên kết riêng tư | một cuộc trò chuyện với khách truy cập, dưới tên họ đã đưa (hoặc "Khách") |
| Phòng chung | một cuộc chat nhóm: mỗi tin nhắn mang tên người gửi, và mọi người có thể tham gia bất cứ lúc nào |
| Lịch sử bản xuất của bạn | tin nhắn của bạn dưới tên bạn, rồi đến tin nhắn của khách truy cập, để chúng không bao giờ bị lẫn |

Lời nhắc hệ thống cố định cho mỗi cuộc trò chuyện, nên các nhà cung cấp lưu đệm nó: tên khách truy cập được đặt
khi cuộc trò chuyện bắt đầu, và trong một phòng, các tên đi cùng tin nhắn. Một khách truy cập tự gọi mình như nhân vật hoặc như bạn
sẽ trở thành, ví dụ, "Alex (khách)", và một "Ann" thứ hai trong một phòng sẽ là "Ann 2".

## Lời mời

| Liên kết | Mở ra |
|---|---|
| `/s/alex` | trang bắt đầu |
| `/s/alex#pin=2468` | cuộc chat ngay lập tức. PIN nằm sau `#`, nên nó không bao giờ đến máy chủ hay nhật ký |
| `/s/alex#name=Greg&pin=2468` | như trên, với tên khách truy cập đã được điền sẵn (`?name=Greg` cũng hoạt động) |

Nút **QR** của một liên kết mở một mã để quét bằng điện thoại, cho mọi địa chỉ hoạt động. Ngay sau khi lưu,
**Sao chép lời mời có PIN** sao chép liên kết kèm PIN.

## Mở liên kết trên thiết bị khác {#open-links-on-other-devices}

Trên máy chủ, liên kết chỉ dùng địa chỉ của máy chủ. Ứng dụng máy tính (và `rooftop` trên `127.0.0.1`) chỉ chạy trên
máy tính của bạn, nên hộp thoại Chia sẻ và trình chỉnh sửa liên kết có hai công tắc. Mỗi công tắc cho biết nó đang **Hoạt động**,
**Đang kết nối** hay **Không hoạt động**, và trình chỉnh sửa hiển thị ngay địa chỉ mà liên kết sẽ có.

```
                    ┌──────────── máy tính của bạn ─────────┐
 điện thoại trên Wi‑Fi ─▶│ :8737  chỉ các trang khách truy cập  │
                    │                                       │
 bất kỳ ai ──▶ tên.iroof.top ══ một WebSocket đi ra ══▶ ứng dụng │
                    │                                       │
                    │ 127.0.0.1  giao diện chủ sở hữu,      │
                    │            cài đặt và API              │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi và mạng cục bộ | Internet |
|---|---|---|
| Địa chỉ | `http://<IP của bạn>:8737/s/<tên>` | `https://<tên>.iroof.top/s/<tên>` |
| Ai | thiết bị trong cùng mạng | bất kỳ ai, khi ứng dụng đang chạy |
| Cách | một bộ lắng nghe thứ hai chỉ phục vụ các trang khách truy cập | một WebSocket đi ra đến chuyển tiếp; không có gì lắng nghe trên internet |
| Dữ liệu của bạn | ở lại máy tính của bạn | ở lại máy tính của bạn, nhưng tin nhắn khách truy cập đi qua chuyển tiếp |

* Cổng Wi‑Fi giữ nguyên qua các lần khởi động lại, nên mã QR đã in vẫn hoạt động. Trên macOS, cho phép
  kết nối đến nếu tường lửa hỏi.
* Tên Internet do bạn chọn và thay đổi được (**Đổi** bên cạnh địa chỉ). Chuyển tiếp chỉ chuyển
  `/s/…`, `/api/s/…` và tài nguyên trang, loại bỏ cookie cả hai chiều, và hiển thị trang "ngoại tuyến" khi ứng dụng đóng.
* Muốn chuyển tiếp của riêng bạn thay vì iroof.top? Xem [Hub chuyển tiếp](../reference/relay-hub).
* **Chế độ ngoại tuyến** tắt và khóa công tắc Internet; Wi‑Fi vẫn hoạt động. Những gì chuyển tiếp có thể thấy:
  [Ngoại tuyến và quyền riêng tư](../guide/offline#share-with-friends-safely).

## Bảo vệ

| Biện pháp | Giới hạn |
|---|---|
| PIN sai từ một IP | sau 5: khóa 1 phút, sau đó 2, 4… tối đa 1 giờ |
| PIN sai trên một liên kết, mọi IP | 20 trong 15 phút: khóa 5 phút, nhân đôi tối đa 24 giờ |
| Tin nhắn mỗi khách truy cập | 30 mỗi phút, 10 câu trả lời mỗi phút |
| Cuộc trò chuyện mới | 20 mỗi giờ cho mỗi IP |

Bộ đếm nằm trong bộ nhớ. Một PIN 6 chữ số không thể đoán trong thời gian hợp lý. Phía sau reverse proxy, đặt
`ROOFTOP_TRUST_PROXY=true`, để bộ đếm thấy IP thật của máy khách.

Phiên khách truy cập dùng một mã thông báo ngẫu nhiên 26 ký tự trong `/s/<tên>/<mã>`, được trình duyệt ghi nhớ và được bảo vệ không bị rò rỉ bởi
`Referrer-Policy: no-referrer`. Khách truy cập chỉ có thể tải những phương tiện mà họ được phép xem.
