# Ứng dụng máy tính

Ứng dụng máy tính ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) chạy cùng máy chủ như `rooftop serve` trên một cổng
`127.0.0.1` ngẫu nhiên, và hiển thị nó trong một cửa sổ gốc.

| Nền tảng | Cài đặt |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, hoặc `.dmg` cho [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) hoặc [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 và 11 | [Trình cài đặt (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) hoặc [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (mọi bản phân phối), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) hoặc [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Các liên kết tải xuống luôn trỏ đến bản phát hành mới nhất.

::: warning Các bản dựng chưa được ký
Trên macOS, mở ứng dụng một lần, rồi **Cài đặt Hệ thống → Quyền riêng tư và Bảo mật → Vẫn mở**. Trên Windows, chọn
**Thông tin thêm → Vẫn chạy** trong SmartScreen. Từng bước, có hoạt ảnh: [Mở một ứng dụng chưa ký](./unsigned-apps).
:::

## Lần khởi động đầu tiên

Ứng dụng không đọc shell hay `.env` của bạn, nên nó chào bạn bằng **Kết nối một mô hình**: mở **Cài đặt**, nhập
điểm cuối, khóa và mô hình, rồi nhấn **Kiểm tra**. Nếu `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` hoặc
`OPENAI_TEMPERATURE` được đặt, chúng trở thành giá trị khởi đầu.

| | |
|---|---|
| Dữ liệu | thư mục dữ liệu ứng dụng của hệ điều hành, ví dụ `~/Library/Application Support/top.iroof.desktop` trên macOS |
| Liên kết chia sẻ | trên cùng Wi‑Fi hoặc qua Internet: [Mở liên kết trên thiết bị khác](../features/share-links#open-links-on-other-devices) |
| Trang khác | các liên kết như `t.me` mở trong trình duyệt của bạn |
| Cửa sổ macOS | không có thanh tiêu đề hệ thống: phần đầu của ứng dụng tiếp tục bên dưới nút đèn giao thông và kéo cửa sổ |
| Nhập | ứng dụng tự đọc bản xuất: **Chọn thư mục…** mở bộ chọn của hệ thống, và thư mục, `.zip` hoặc `.txt` được thả vào sẽ được nhập từ nơi nó nằm. Không có gì được tải lên, bản gốc không bị đụng đến, và trên APFS phương tiện được nhân bản thay vì sao chép, nên ngay cả bản xuất 13 GB cũng hầu như không tốn thêm dung lượng |

## Tự xây dựng {#build-it-yourself}

Bạn cần Rust ≥ 1.95 và Node.js, và trên Linux là [điều kiện tiên quyết của Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # trình cài đặt trong desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # chỉ tệp nhị phân
```

Trên macOS, `npm run build` cũng tạo `.dmg`, và bỏ qua AppleScript của Finder chỉ sắp xếp cửa sổ DMG
(nó thất bại nếu không có quyền *Tự động hóa*). Đặt `ROOFTOP_DMG_FINDER=1` để giữ bố cục Finder, như
trong các DMG đã phát hành: nền từ `desktop/dmg/` với mũi tên từ ứng dụng tới *Ứng dụng*, và các tệp ẩn của ổ đĩa
ở ngoài tầm nhìn. Sau khi chỉnh sửa `desktop/dmg/background.svg`, chạy `desktop/dmg/make-background.sh`.
