# Mở một ứng dụng chưa ký

Các trình cài đặt máy tính chưa được ký hay công chứng, nên lần khởi động đầu tiên hiển thị cảnh báo trên macOS và Windows.
Đây là một bước chỉ làm một lần: sau khi bạn cho phép ứng dụng một lần, nó mở bình thường, kể cả sau các bản cập nhật được cài theo cùng cách.

::: tip Không muốn làm vậy?
[Tự xây dựng ứng dụng](./desktop#build-it-yourself), hoặc chạy [máy chủ](./getting-started#install) và dùng nó trong
trình duyệt: `brew install irooftop/tap/rooftop`, `cargo install rooftop` hoặc [Docker](./docker).
:::

## macOS

![Mở một ứng dụng chưa xác minh trên macOS: cảnh báo "Không mở được", Xong, Cài đặt Hệ thống, Quyền riêng tư và Bảo mật, Vẫn mở, mật khẩu, và ứng dụng mở ra](/how-to-open-an-unsigned-app-on-macos.svg)

Trên macOS 15 Sequoia trở lên:

1. Mở **iRoof.top**. macOS nói *"iRoof.top" không mở được: Apple không thể xác minh…*. Nhấp **Xong**.
2. Mở **menu Apple → Cài đặt Hệ thống… → Quyền riêng tư và Bảo mật**.
3. Cuộn xuống **Bảo mật**: *"iRoof.top" đã bị chặn để bảo vệ Mac của bạn*. Nhấp **Vẫn mở**.
4. Xác nhận bằng **Vẫn mở**, và nhập mật khẩu hoặc dùng Touch ID.

Nút **Vẫn mở** chỉ xuất hiện sau khi bạn đã thử mở ứng dụng, trong khoảng một giờ. Nếu nó không có,
hãy mở lại ứng dụng và quay lại Quyền riêng tư và Bảo mật.

Trên macOS 14 Sonoma trở về trước, nhấp chuột phải (hoặc Control-nhấp) vào ứng dụng trong Finder, chọn **Mở**, rồi **Mở** lần nữa.

### Từ Terminal

Gỡ cờ cách ly mà trình duyệt đặt lên tệp tải về cũng hoạt động:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Không phải lúc nào cũng hiệu quả: trên các macOS mới, Terminal có thể cần **Quản lý ứng dụng** (hoặc **Truy cập đầy đủ vào đĩa**) trong
Quyền riêng tư và Bảo mật để thay đổi ứng dụng trong `/Applications`, và nếu không có nó thì thất bại với `Operation not permitted`. Các bước trên luôn hiệu quả.

::: details "iRoof.top bị hỏng và không thể mở"
Thông báo này cũng có nghĩa là cờ cách ly, không phải tệp tải về bị hỏng. Nhấp **Hủy** (không phải **Chuyển vào Thùng rác**) và chạy
lệnh `xattr` ở trên, hoặc làm theo các bước trong Cài đặt Hệ thống.
:::

## Windows

SmartScreen hiển thị **Windows đã bảo vệ PC của bạn** cho trình cài đặt:

1. Nhấp **Thông tin thêm**.
2. Nhấp **Vẫn chạy**.

Nếu trình duyệt giữ lại tệp tải về (*không thường được tải xuống*), mở danh sách tải xuống, chọn **⋯ → Giữ**,
rồi **Hiện thêm → Vẫn giữ**. Với `.msi`, bạn cũng có thể nhấp chuột phải → **Thuộc tính** → đánh dấu **Bỏ chặn** →
**OK** trước khi chạy.

Trên Windows 11 với **Smart App Control** bật, các ứng dụng chưa ký bị chặn mà không có nút **Vẫn chạy**. Thay vào đó hãy dùng
[máy chủ](./getting-started#install), hoặc tắt Smart App Control trong **Windows Security → App & browser control → Smart App Control settings**.

## Linux

Linux không chặn các ứng dụng chưa ký, nhưng AppImage cần quyền để chạy:

```sh
chmod +x iRoof.top_amd64.AppImage    # hoặc: Properties → Permissions → Allow executing file as program
./iRoof.top_amd64.AppImage
```

Nếu nó báo lỗi FUSE (`dlopen(): error loading libfuse.so.2`), cài `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) hoặc chạy với `--appimage-extract-and-run`.

Các gói được cài bằng trình quản lý gói, chấp nhận các gói cục bộ chưa ký:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
