# Phát triển

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Các bài kiểm thử bao phủ | |
|---|---|
| Bộ phân tích và chuyển đổi | trên `examples/telegram` và `examples/whatsapp` |
| Liên kết chia sẻ | cô lập khách truy cập, khóa PIN, danh sách phương tiện cho phép, phòng, tên, chặn, bỏ qua xác thực |
| Client MCP | máy chủ giả lập của mọi thời kỳ giao thức (HTTP, SSE cũ, stdio) |
| Chuyển tiếp | hub, tên, chuyển tiếp |

Crate của ứng dụng máy tính là riêng biệt: `cd desktop && cargo check`.

## Bố cục

```
src/        máy chủ (axum), bộ phân tích, tác nhân LLM, client MCP, liên kết chia sẻ, chuyển tiếp, Telegram
  server/     API HTTP của chủ sở hữu, một tệp cho mỗi khu vực: tài nguyên, tải lên, bản xuất, cuộc chat,
              tin nhắn, cài đặt, phương tiện; mod.rs xây dựng các bộ định tuyến
  share_api/  liên kết chia sẻ: owner.rs (quản lý liên kết và khách truy cập), visitor.rs (/s/…)
web/        giao diện: index.html, app.css và js/ (được phục vụ như một app.js duy nhất), nhúng vào tệp nhị phân
  js/         một tệp cho mỗi khu vực của giao diện, được đánh số theo thứ tự tải (một script, một phạm vi)
desktop/    ứng dụng Tauri xung quanh cùng máy chủ
deploy/     Caddy + Docker Compose
examples/   hai bản xuất giả định
```

Tài liệu và trang giới thiệu của iroof.top không nằm trong kho mã này. Chúng nằm trong
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (trang này) và `landing/`.

## Tài liệu

Tài liệu nằm trong [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Nó lấy hình ảnh
và phiên bản ứng dụng từ kho này: hãy sao chép cả hai cạnh nhau, rồi xây dựng ở đó.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Trang được xuất bản tại [irooftop.github.io](https://irooftop.github.io) sau mỗi lần push lên `main` của kho đó có thay đổi `docs/`. `demo.svg` được tạo bằng `python3 scripts/demo-svg.py` trong kho ứng dụng (SVG và CSS thuần, để GitHub hiển thị).

## Phát hành

```
 tăng Cargo.toml ─▶ thẻ vX.Y.Z ─┬─▶ Release: crates.io + image ghcr.io (amd64 + arm64, runner gốc)
                                └─▶ desktop: trình cài đặt ─▶ xuất bản bản phát hành (mới nhất) ─▶ Homebrew: công thức + cask
```

1. Tăng `version` trong `Cargo.toml` (và trong `desktop/`), commit, rồi push một thẻ `vX.Y.Z`. Thẻ phải là số để dùng cho
   MSI của Windows. Mọi thứ bên dưới sau đó chạy mà không cần thêm nhấp chuột nào.
2. *Release* xuất bản crate (bí mật `CARGO_REGISTRY_TOKEN`, môi trường `crates-io`) và image Docker:
   một công việc cho mỗi kiến trúc trên runner gốc (`ubuntu-latest`, `ubuntu-24.04-arm`) đẩy theo digest, và một công việc
   `merge` tạo các thẻ đa kiến trúc. Chạy thủ công với `dry_run` để kiểm tra việc xuất bản crate.
3. *desktop* xây dựng trình cài đặt cho macOS (arm64, x64), Windows và Linux vào một bản phát hành nháp. Khi tất cả đã được đính kèm,
   công việc `publish` của nó thêm ghi chú phát hành được tạo tự động, xuất bản bản phát hành và đánh dấu là mới nhất.
4. Công việc `homebrew` của nó sau đó gọi *Homebrew*, đẩy `Formula/rooftop.rb` và `Casks/irooftop.rb` tới
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Nó cần bí mật `HOMEBREW_TAP_TOKEN`
   (mã thông báo chi tiết, `irooftop/homebrew-tap`, Contents: đọc và ghi) hoặc `HOMEBREW_TAP_DEPLOY_KEY`; nếu không có cái nào
   thì bỏ qua với một thông báo. (Bản phát hành được xuất bản bằng `GITHUB_TOKEN` không kích hoạt `release: published`, đó là lý do lời gọi được viết rõ ràng;
   xuất bản bản phát hành thủ công vẫn kích hoạt Homebrew qua sự kiện đó.)

Để chạy lại cập nhật tap cho một thẻ hiện có, ví dụ sau khi thêm bí mật:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <bản sao tap>` tạo cùng các tệp đó cục bộ. Nếu trình cài đặt của một thẻ thất bại,
hãy chạy lại các công việc *desktop* bị lỗi: `publish` và `homebrew` sẽ tiếp tục khi chúng thành công.
