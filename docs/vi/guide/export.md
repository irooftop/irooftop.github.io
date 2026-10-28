# Xuất một cuộc chat

<div class="wide">

![Telegram Desktop: mở cuộc chat, nhấp ⋯ ở góc trên bên phải, chọn Xuất lịch sử trò chuyện…, rồi Xuất](/img/telegram-export.svg)

</div>

## Telegram

Trong **Telegram Desktop** (macOS, Windows, Linux): mở cuộc chat → **⋯** → **Xuất lịch sử trò chuyện…** → **Xuất**.

* Giữ bật ảnh, video, tin nhắn thoại, nhãn dán và GIF: nhân vật sử dụng chúng.
* Cả hai định dạng đều hoạt động: **HTML** (`messages.html`) và **JSON** dễ đọc bằng máy (`result.json`).
* Kéo thư mục xuất, hoặc một tệp `.zip` của nó, vào trang.

## WhatsApp

Trên điện thoại: mở cuộc chat → **⋮ → Thêm → Xuất trò chuyện** (iPhone: chạm vào tên liên hệ → **Xuất trò chuyện**) →
**Bao gồm phương tiện**. Gửi tệp `.zip` về máy tính và kéo vào trang.

Một cuộc chat xuất không kèm phương tiện là một tệp `.txt` duy nhất, và cách đó cũng hoạt động.

## Bản xuất lớn

Bản xuất với hơn 100.000 tin nhắn và nhiều gigabyte hoạt động theo cùng cách: kéo thư mục vào. Trang hiển thị những gì đang diễn ra:

1. **Đang đọc thư mục…** đếm các tệp (trình duyệt có thể mất chút thời gian để liệt kê hàng chục nghìn tệp).
2. **Cuộc chat đi trước.** Các trang tin nhắn (hoặc `result.json`, hoặc tệp `.txt` WhatsApp) được tải lên và đọc trước phương tiện. Nếu bản xuất này **đã được nhập**, việc nhập dừng ở đây và mở nó, và không có phương tiện nào được tải lên. Nếu phương tiện không vừa đĩa, bạn sẽ được báo cần bao nhiêu dung lượng trước khi gửi bất cứ thứ gì lớn.
3. **Đang tải lên 1,2 GB trong 3,4 GB (35 %) · 9.000 trong 30.905 tệp**: phương tiện đi theo các lô nhỏ, lần lượt từng lô. Trình duyệt không bao giờ tạo một yêu cầu khổng lồ duy nhất, và một lô bị gián đoạn sẽ được thử lại riêng. Không có giới hạn kích thước khi bạn chạy trên máy tính của mình.
4. **Đang đọc tin nhắn: trang 37 trong 121 · 36.000 tin nhắn**: tất cả các trang được đọc một lần, song song.
5. **Đang kiểm tra phương tiện** và **Đang chuyển phương tiện**: các tệp được băm để tìm bản trùng lặp và được chuyển (không sao chép hai lần) vào thư mục dữ liệu.
6. **Đang lưu**, sau đó hộp thoại *Cuộc trò chuyện mới* mở ra.

Chỉ một lần nhập chạy tại một thời điểm; một lỗi vẫn hiển thị trong vùng thả và bạn có thể chọn lại thư mục.

Trong [ứng dụng máy tính](./desktop), việc tải lên này không xảy ra: ứng dụng đọc thư mục, `.zip` hoặc `.txt` ngay từ nơi chúng nằm
(bước 4 đến 6), nhanh hơn và không bị ảnh hưởng bởi các vấn đề trình duyệt bên dưới.

::: details Khi một tệp không thể tải lên (trình duyệt)
Một tệp mà trình duyệt không còn đọc được (đã di chuyển, đã thay đổi, hoặc một placeholder iCloud/OneDrive chưa được tải xuống) được tìm thấy và bỏ qua, và một tệp đơn lẻ liên tục làm hỏng lô của nó cũng vậy: lô được chia nhỏ cho đến khi tệp đó bị cô lập. Phương tiện bị bỏ qua hiển thị là thiếu trong cuộc chat; thông báo sau khi nhập nêu tên một tệp, và bảng điều khiển trình duyệt liệt kê tất cả. Khi chính tệp cuộc chat không thể gửi đi, việc nhập dừng và nêu tên nó. Lỗi cho biết máy chủ đã nhận được gì, ví dụ `máy chủ nhận được 1.200 trên 4.096 byte`, để dễ phân biệt sự cố kết nối với sự cố trình duyệt.
:::

Trong khi nhập, không có gì rời khỏi máy tính của bạn và không có mô hình nào được gọi. Phương tiện chỉ được mô tả khi bạn nhấn **Mô tả** trong thư viện phương tiện.

Với `rooftop --import <thư mục>`, thư mục được đọc tại chỗ và các tệp của nó được sao chép, không bao giờ được chuyển; tiến trình được ghi vào nhật ký.
Với một bản xuất khổng lồ trên cùng một máy tính, đây là cách nhanh nhất: không tải lên và không có bản sao thứ hai trong thư mục tạm.

## Những gì được nhận diện

| Nguồn | Tệp |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (dùng khi thư mục không có `messages.html`) |
| WhatsApp | `WhatsApp Chat with <tên>.txt` (Android) hoặc `_chat.txt` (iOS), trong thư mục, `.zip` hoặc đứng riêng |

* **Telegram**: văn bản có ngắt dòng, liên kết, trích dẫn và mã; trả lời và trích dẫn một phần; tin nhắn chuyển tiếp; chỉnh sửa; tin nhắn hệ thống;
  phản ứng; xem trước liên kết; ảnh, video, video tròn, tin nhắn thoại, âm thanh, tệp, nhãn dán (`.webp`, `.webm`,
  `.tgs`), GIF, vị trí, liên hệ, cuộc thăm dò và cuộc gọi.
* **WhatsApp**: bố cục Android và iOS, đồng hồ 12 và 24 giờ và cả hai thứ tự ngày/tháng, được phát hiện theo từng tệp.
  Tin nhắn nhiều dòng, chỉnh sửa và tệp đính kèm được giữ lại. Tin nhắn đã xóa và thông báo mã hóa bị bỏ qua,
  và `<Media omitted>` được đánh dấu là không khả dụng.

Các tệp phương tiện được băm, nên một nhãn dán được gửi năm lần sẽ trở thành một mục trong thư viện (`stk_…`, `gif_…`, `pho_…`).

::: info Phản ứng trong bản xuất HTML
Bản xuất HTML không cho biết ai đã phản ứng. Trong các cuộc chat một-đối-một, một phản ứng được gán cho người tham gia còn lại, và cho cả hai khi số lượng là 2.
:::
