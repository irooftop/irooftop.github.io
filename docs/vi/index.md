---
layout: home

hero:
  name: iRoof.top
  text: Nói chuyện với những người bạn nhớ
  tagline: Xuất một đoạn chat Telegram hoặc WhatsApp, rồi một LLM sẽ tiếp tục cuộc trò chuyện theo cách nói của một người, với bong bóng chat, sticker, GIF, biểu cảm và giọng nói của họ. Trên máy tính của bạn, với mô hình bạn chọn, và có thể dùng ngoại tuyến nếu muốn.
  actions:
    - theme: brand
      text: Bắt đầu
      link: /guide/getting-started
    - theme: alt
      text: Tải ứng dụng
      link: /guide/desktop
    - theme: alt
      text: Cách hoạt động
      link: /features/how-it-works

features:
  - title: Cách nói của họ, không chỉ lời nói
    details: Một hồ sơ phong cách lấy từ toàn bộ bản xuất, và mỗi bong bóng, sticker, GIF, câu trả lời, biểu cảm được phát lại cho mô hình dưới dạng một lệnh gọi công cụ.
    link: /features/how-it-works
    linkText: Cách hoạt động
  - title: Riêng tư, và ngoại tuyến nếu bạn muốn
    details: Các cuộc trò chuyện nằm trong thư mục dữ liệu của bạn. Với mô hình cục bộ và chế độ ngoại tuyến bật, ứng dụng từ chối mọi yêu cầu sẽ rời khỏi máy tính của bạn.
    link: /guide/offline
    linkText: Ngoại tuyến và quyền riêng tư
  - title: Nhiều năm chat, hàng gigabyte đa phương tiện
    details: Hơn 120.000 tin nhắn và 30.000 tệp được nhập kèm tiến trình trực tiếp. Lần nhập trùng được nhận ra từ tin nhắn, trước khi bất kỳ đa phương tiện nào được tải lên.
    link: /guide/export#large-exports
    linkText: Bản xuất lớn
  - title: Ảnh, sticker và giọng nói
    details: Thư viện đa phương tiện mô tả những gì đã gửi và chuyển giọng nói thành chữ, theo thứ tự bạn chọn, và có thể dừng bất cứ lúc nào.
    link: /features/media
    linkText: Ảnh và giọng nói
  - title: Liên kết chia sẻ
    details: Cho một người bạn trò chuyện với nhân vật tại /s/tên, với mã PIN và giới hạn, trên Wi‑Fi của bạn hoặc tại tên.iroof.top.
    link: /features/share-links
    linkText: Liên kết chia sẻ
  - title: Trả lời từ Telegram
    details: Tin nhắn của khách truy cập đến nhóm Telegram của bạn. Tự trả lời, hoặc để AI trả lời sau một bộ đếm ngược.
    link: /features/telegram
    linkText: Telegram
  - title: Mọi mô hình, mọi máy chủ MCP
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… cùng các công cụ MCP qua Streamable HTTP hoặc stdio.
    link: /features/mcp
    linkText: Công cụ MCP
  - title: Không giấu gì
    details: Chỉ một cú nhấp để xem đúng JSON gửi cho mô hình, cùng kích thước, ngân sách lịch sử và số token đã dùng.
    link: /guide/getting-started#what-s-in-the-window
    linkText: Những gì có trong cửa sổ
  - title: Một tệp nhị phân nhỏ
    details: Máy chủ Rust có sẵn giao diện web, ứng dụng máy tính cho macOS, Windows và Linux, Homebrew và một image Docker.
    link: /guide/getting-started
    linkText: Cài đặt
---

<div class="home-demo">

![Một cuộc trò chuyện tiếp tục theo cách nói của người thật, rồi một người bạn mở liên kết chia sẻ trên điện thoại](/img/demo.svg)

</div>

## Bắt đầu trong một phút

::: code-group

```sh [Ứng dụng máy tính]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [Hoàn toàn ngoại tuyến]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Sau đó là ba bước: **[xuất đoạn chat](/guide/export)** từ Telegram Desktop hoặc WhatsApp, **kéo** thư mục, `.zip` hoặc `.txt` vào trang, rồi nhấn **New chat** để chọn ai sẽ đóng vai AI: người kia, hoặc chính bạn.
Chưa có đoạn chat nào? Hãy thử đoạn hư cấu: `rooftop --import ./examples/telegram`.
(Tên nút trong ứng dụng là tiếng Anh, như chính ứng dụng.)

## Cách hoạt động

<div class="wide">

![Bản xuất từ Telegram hoặc WhatsApp đi vào iRoof.top, một LLM viết câu trả lời và cuộc trò chuyện tiếp tục](/how-it-works.svg)

</div>

Bản xuất được đọc một lần, trên máy tính của bạn. Mỗi câu trả lời, mô hình nhận một lời nhắc hệ thống có hồ sơ phong cách, ghi chú của bạn và mô tả đa phương tiện, rồi đến phần mới nhất của cuộc trò chuyện vừa khít [ngân sách lịch sử](/reference/configuration#settings-only). Các phần cũ được gom thành một ký ức ngắn, và nhân vật vẫn có thể tìm kiếm chúng. Mô hình trả lời bằng các lệnh gọi công cụ (`send_message`, `send_sticker`, `react`…), trở thành bong bóng, sticker và biểu cảm. [Xem thêm →](/features/how-it-works)

## Cuộc trò chuyện của bạn đi đâu

| | Mạng |
|---|---|
| Nhập dữ liệu, hồ sơ phong cách, tìm kiếm, lưu trữ | không có: mọi thứ diễn ra trên máy tính của bạn |
| Một câu trả lời, tóm tắt bộ nhớ | điểm cuối mô hình bạn chọn, không gì khác |
| Mô tả đa phương tiện, chuyển giọng nói thành chữ | mô hình đa phương tiện, chỉ khi bạn nhấn **Describe** |
| Liên kết chia sẻ qua internet, Telegram | chỉ khi bạn bật; [chế độ ngoại tuyến](/guide/offline) sẽ tắt chúng |

## Câu hỏi

::: details Nên dùng mô hình nào?
Bất kỳ mô hình trò chuyện nào có **gọi công cụ**, đứng sau một điểm cuối `/chat/completions` tương thích OpenAI. Mô hình lớn hơn bắt chước phong cách tốt hơn. Với **Describe** trong thư viện đa phương tiện, mô hình đa phương tiện cũng phải nhận ảnh (và âm thanh cho tin nhắn thoại). **Test** trong Cài đặt cho bạn biết bằng lời dễ hiểu điều gì sai, ví dụ khóa bị từ chối hoặc mô hình không xác định.
:::

::: details Tốn bao nhiêu tiền?
Không tốn gì với mô hình cục bộ. Với mô hình đám mây, bạn trả nhà cung cấp theo token: một câu trả lời tốn xấp xỉ một ngân sách lịch sử ở đầu vào (mặc định 120.000 ký tự ≈ 34 nghìn token; lời nhắc được thiết kế để có thể lưu đệm, nên các nhà cung cấp hỗ trợ lưu đệm lời nhắc tính phần lớn theo giá đã lưu đệm), cộng thêm vài lệnh gọi công cụ ngắn. Giảm ngân sách trong Cài đặt để trả ít hơn cho mỗi câu trả lời.
:::

::: details Bản xuất có phải nhỏ không?
Không. Bản xuất với hơn 120.000 tin nhắn và 13 GB đa phương tiện vẫn nhập tốt, từ trình duyệt hoặc bằng `rooftop --import <thư mục>`. Tìm kiếm và ngân sách lịch sử giữ kích thước lời nhắc của mỗi câu trả lời không đổi, bất kể cuộc trò chuyện dài đến đâu.
:::

::: details Bạn bè có thể trò chuyện với nhân vật không?
Có, qua một [liên kết chia sẻ](/features/share-links): trên Wi‑Fi của bạn, hoặc qua internet tại `tên.iroof.top`, với mã PIN và giới hạn tin nhắn. Khách truy cập chỉ thấy cuộc trò chuyện: không có cài đặt, ghi chú, lời nhắc hay cuộc trò chuyện khác.
:::

::: tip Một lưu ý về sự quan tâm
Điều này dành cho việc gần gũi với những người ở xa. Nhân vật giữ đúng vai, nhưng trả lời trung thực nếu bạn thật lòng hỏi liệu bạn có đang nói chuyện với AI không, và phản hồi nhẹ nhàng nếu bạn có vẻ đang gặp khó khăn.
:::
