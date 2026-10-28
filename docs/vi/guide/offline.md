# Ngoại tuyến và quyền riêng tư

iRoof.top giữ các cuộc chat của bạn trên máy tính của bạn. Với một mô hình cũng chạy trên máy tính của bạn, **không có gì phải rời khỏi máy**.
**Chế độ ngoại tuyến** biến điều đó thành một quy tắc mà ứng dụng thực thi, chứ không phải một thói quen.

## Những gì diễn ra cục bộ

| Bước | Chạy ở đâu | Mạng |
|---|---|---|
| Nhập, phân tích, hồ sơ phong cách | máy tính của bạn | không có |
| Lưu trữ | tệp JSON và phương tiện trong thư mục dữ liệu | không có |
| Tìm trong lịch sử, PIN liên kết, thư viện phương tiện | máy tính của bạn | không có |
| Mô tả ảnh, nhãn dán, GIF, video | **mô hình phương tiện**, chỉ khi bạn nhấn **Mô tả bằng AI** | một yêu cầu cho mỗi mục đến điểm cuối của mô hình |
| Chuyển giọng nói thành văn bản | mô hình phương tiện, khi bạn nhấn **Mô tả bằng AI** ở tin nhắn thoại hoặc ghi âm một tin | một yêu cầu đến điểm cuối của mô hình |
| Một câu trả lời | **mô hình chat**, khi bạn gửi tin nhắn (hoặc khách truy cập gửi) | các yêu cầu đến điểm cuối của mô hình |
| Nén lịch sử dài | mô hình chat, như một phần của câu trả lời, khi lịch sử vượt ngân sách | một yêu cầu thêm đến điểm cuối của mô hình |

Nhập dữ liệu không bao giờ gọi mô hình. Lần gọi đầu tiên xảy ra khi bạn gửi tin nhắn, nhấn **Mô tả** hoặc ghi âm một
tin nhắn thoại. Một câu trả lời gửi cho mô hình lịch sử đã xuất của bạn (tối đa [ngân sách lịch sử](../reference/configuration#settings-only)),
hồ sơ phong cách và mô tả phương tiện. Vì vậy **nơi mô hình chạy quyết định cuộc chat của bạn đi đâu**: một điểm cuối trên đám mây sẽ nhận nó, một mô hình trên máy tính của bạn thì không.

## Chạy hoàn toàn ngoại tuyến

1. Cài [Ollama](https://ollama.com) hoặc [LM Studio](https://lmstudio.ai), hoặc chạy `llama-server` của llama.cpp.
2. Tải về một **mô hình chat hỗ trợ gọi công cụ**, và một **mô hình thị giác** nếu bạn muốn ảnh và nhãn dán được mô tả.
3. Trong **Cài đặt**, chọn điểm cuối và mô hình, rồi bật **Ngoại tuyến**:

| Máy chủ | URL cơ sở |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| `llama-server` của llama.cpp | `http://localhost:8081/v1` (cổng mặc định `8080` là của iRoof.top: khởi động bằng `llama-server --port 8081`) |

4. Nhấn **Kiểm tra**. Nó gửi một yêu cầu nhỏ và hiển thị mô hình và máy chủ đã trả lời. Bạn có thể tắt mạng và tiếp tục trò chuyện.

**Ứng dụng máy tính** được cài đặt trong Cài đặt. Nó không đọc shell hay tệp `.env` của bạn (xem [Ứng dụng máy tính](./desktop)),
nhưng vẫn tôn trọng `ROOFTOP_OFFLINE` và `OPENAI_*` nếu chúng nằm trong môi trường mà nó được khởi động. Một máy chủ
đọc môi trường (và `.env`):

::: code-group

```sh [Homebrew / máy chủ cargo]
# --offline giống ROOFTOP_OFFLINE=1
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=llama3.1 rooftop --offline
```

```sh [Docker]
docker run -p 8080:8080 -v rooftop-data:/data \
  --add-host=host.docker.internal:host-gateway \
  -e ROOFTOP_OFFLINE=1 \
  -e OPENAI_BASE_URL=http://host.docker.internal:11434/v1 -e OPENAI_MODEL=llama3.1 \
  ghcr.io/irooftop/rooftop
```

:::

Trong Docker, `localhost` là chính container, nên hãy dùng `host.docker.internal` (tùy chọn `--add-host` chỉ cần trên Linux).
Nếu Ollama từ chối kết nối, hãy để nó lắng nghe trên mọi giao diện (`OLLAMA_HOST=0.0.0.0`).

### Chế độ ngoại tuyến thực thi những gì

| | Chế độ ngoại tuyến |
|---|---|
| Chat, tóm tắt lịch sử, mô tả phương tiện, chuyển giọng nói thành văn bản | bị từ chối trừ khi điểm cuối là [cục bộ](#local-means) |
| Máy chủ MCP qua HTTP | bị từ chối nếu không cục bộ; hiển thị lỗi trong Cài đặt |
| Chia sẻ qua Internet (`<tên>.iroof.top`) | tắt: client chuyển tiếp không khởi động và công tắc bị khóa |
| Bot Telegram, của bạn hoặc dùng chung | không khởi động |
| GIF qua URL | AI không thể gửi GIF từ URL không cục bộ |
| Liên kết chia sẻ Wi‑Fi | hoạt động |

Một yêu cầu bị từ chối sẽ thất bại trước khi bất kỳ kết nối nào được thực hiện, và thông báo nói lý do: `Chế độ ngoại tuyến: https://openrouter.ai
không phải là điểm cuối cục bộ`. Chuyển hướng từ điểm cuối cục bộ sang máy chủ khác cũng bị từ chối. Một huy hiệu **Ngoại tuyến** nhỏ
hiển thị trên tiêu đề thanh bên khi chế độ đang bật. Cài đặt được lưu. `--offline` / `ROOFTOP_OFFLINE=1` bật chế độ bất kể Cài đặt, và Cài đặt không thể tắt nó.

#### "Cục bộ" nghĩa là gì {#local-means}

`localhost`, loopback (`127.0.0.0/8`, `::1`), địa chỉ mạng riêng (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
địa chỉ link-local, và các tên `*.local` và `*.internal` (như `host.docker.internal`). Một mô hình trên máy tính khác
trong mạng gia đình của bạn được coi là cục bộ, vì nó không bao giờ rời khỏi mạng của bạn. Tên được đánh giá theo cách chúng được viết, chúng không được tra cứu.

### Chế độ ngoại tuyến không thể kiểm tra điều gì

* **Máy chủ MCP stdio** là các chương trình trên máy tính của bạn. iRoof.top khởi động chúng nhưng không thấy chúng kết nối với đâu,
  vì vậy chỉ thêm những cái bạn tin tưởng sẽ ở lại cục bộ.
* **Chuyển giọng nói thành văn bản** dùng API chat (một phần `input_audio`), không phải API Whisper `/audio/transcriptions`.
  Nó cần một máy chủ và mô hình cục bộ chấp nhận âm thanh ở đó. Nếu của bạn không chấp nhận, tin nhắn thoại vẫn được lưu và gửi;
  chỉ thiếu phần văn bản của nó.
* **Tạo ảnh và giọng nói** chỉ tồn tại dưới dạng [công cụ MCP](../features/mcp). Khi ngoại tuyến, hãy dùng máy chủ MCP cục bộ cho chúng.
* Những người bạn chia sẻ mở liên kết Wi‑Fi của bạn trong trình duyệt của họ. Chế độ ngoại tuyến điều chỉnh ứng dụng này, không phải thiết bị của họ.

## Chia sẻ với bạn bè an toàn {#share-with-friends-safely}

| Liên kết | Điều gì xảy ra |
|---|---|
| **Wi‑Fi** `http://<IP của bạn>:8737/s/<tên>` | không bao giờ rời mạng cục bộ của bạn |
| **Internet** `https://<tên>.iroof.top/s/<tên>` | ứng dụng mở một kết nối WebSocket đi ra duy nhất đến hub, qua đó hub chuyển tiếp các yêu cầu HTTP của khách truy cập và phản hồi của ứng dụng bạn |

Với liên kết Internet, bản xuất, cuộc chat và mô hình của bạn vẫn ở trên máy tính của bạn, và hub không lưu trữ cái nào trong số đó.
Hub chỉ giữ một bản ghi tài khoản: tên của bạn, một băm của bí mật của bạn và thời điểm nó thấy bạn lần cuối.

Hãy rõ ràng về những gì điều này *không* mang lại. Hub kết thúc TLS, nên như bất kỳ reverse proxy nào, về mặt kỹ thuật nó thấy lưu lượng đi qua:
những gì khách truy cập gõ, các câu trả lời của nhân vật, và lịch sử mà liên kết cho phép khách truy cập đọc
(**Khách truy cập có thể đọc bản xuất**, mặc định là **không gì cả**). Nó chỉ chuyển tiếp các trang khách truy cập (`/s/…`,
`/api/s/…`, tài nguyên trang) và loại bỏ cookie theo cả hai chiều; giao diện chủ sở hữu và cài đặt của bạn không bao giờ truy cập được qua nó. Nếu quá nhiều niềm tin, hãy dùng liên kết Wi‑Fi, hoặc [chạy hub chuyển tiếp của riêng bạn](../reference/relay-hub).
[Thêm về liên kết chia sẻ](../features/share-links).

Với **Chế độ ngoại tuyến**, chuyển tiếp iroof.top bị tắt. Liên kết Wi‑Fi vẫn hoạt động.

## Bot Telegram {#the-telegram-bot}

[Trả lời từ Telegram](../features/telegram) đăng vào nhóm của bạn:

* **tin nhắn khách truy cập** mới (tên, tên liên kết, văn bản, hoặc nhãn phương tiện kèm mô tả hoặc bản chép lời, và bản xem trước ngắn
  của tin nhắn họ trả lời) và **câu trả lời** của AI;
* không bao giờ lịch sử đã xuất. Tin nhắn cũ không được truyền đi.

Bot không có mã hóa đầu cuối: văn bản đi qua Telegram ở dạng thuần. Với **bot dùng chung**, nó cũng đi qua
hub, nơi chỉ lưu nhóm nào thuộc tài khoản nào. **Bot của riêng bạn** nói chuyện trực tiếp với
Telegram, không qua hub. Chế độ ngoại tuyến tắt cả hai.

## Dữ liệu của bạn đi đâu

| Dữ liệu | Đi đâu |
|---|---|
| Bản xuất, cuộc chat, cài đặt, khóa API | thư mục dữ liệu trên máy tính của bạn |
| Nhập và hồ sơ phong cách | không đi đâu cả |
| Lịch sử, hồ sơ phong cách, tin nhắn của bạn | điểm cuối mô hình bạn đã chọn, mỗi lần trả lời |
| Ảnh và giọng nói | điểm cuối mô hình phương tiện, khi **Mô tả** hoặc khi bạn ghi âm tin nhắn thoại |
| Tin nhắn khách truy cập qua liên kết Wi‑Fi | máy tính của bạn và điểm cuối mô hình của bạn |
| Tin nhắn khách truy cập qua liên kết Internet | hub (trên đường đi), máy tính của bạn, điểm cuối mô hình của bạn |
| Tin nhắn khách truy cập qua Telegram | thêm Telegram, và hub đối với bot dùng chung |
| Chế độ ngoại tuyến | chỉ điểm cuối mô hình cục bộ, chỉ liên kết Wi‑Fi, không Telegram |
