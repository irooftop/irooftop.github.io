# Docker và máy chủ

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Ho_Chi_Minh \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Image | `ghcr.io/irooftop/rooftop`, linux/amd64 và linux/arm64 |
| Thẻ | `latest`, `X.Y.Z`, `X.Y` |
| Dữ liệu | `/data` (bản xuất, cuộc chat, cài đặt) |
| Nhập khi khởi động | gắn một thư mục và đặt `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js và ffmpeg
Image không có cái nào trong số này. Với máy chủ MCP stdio khởi động bằng `npx`, hãy mở rộng image:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg cho phép AI xem GIF và video từng khung hình
```

Hoặc dùng máy chủ MCP từ xa (HTTP).
:::

## Máy chủ với HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) chạy iRoof.top phía sau [Caddy](https://caddyserver.com),
Caddy lấy và gia hạn chứng chỉ:

```sh
cd deploy
sed -i 's/example.com/ten.mien.cua.ban/g' Caddyfile        # tên miền phải đã trỏ đến máy chủ
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  khách truy cập ──https──▶ Caddy :443 ──▶ iroof:8080
                              │               ├─ /s/…, /api/s/…, tài nguyên   công khai
                              │               └─ phần còn lại                  mật khẩu
                              └─ chứng chỉ TLS, tự động gia hạn
```

* Liên kết chia sẻ dùng tên miền của bạn: `https://ten.mien.cua.ban/s/<tên>`.
* Container chạy ở chế độ chỉ đọc, không có capability và có giới hạn bộ nhớ.
* `ROOFTOP_TRUST_PROXY` được bật, vì Caddy chuyển tiếp IP của khách truy cập.
* Cập nhật bằng `docker compose pull && docker compose up -d`. Sao lưu volume `iroof-data`.

::: danger Đặt mật khẩu trên máy chủ công khai
`ROOFTOP_PASSWORD` bảo vệ giao diện và API của chủ sở hữu. Nếu không có nó, bất kỳ ai tìm thấy địa chỉ đều có thể đọc các cuộc chat của bạn.
:::
