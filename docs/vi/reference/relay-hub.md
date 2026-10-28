# Hub chuyển tiếp

Một máy chủ có thể là chuyển tiếp mà các ứng dụng dùng để chia sẻ qua **Internet**, như iroof.top.

```
 khách truy cập ──▶ https://alex.ten.mien.cua.ban/s/… ──▶ hub ══ WebSocket ══▶ ứng dụng của Alex
                                                      │
 ứng dụng ── POST /relay/v1/register {name} ─────────▶│  tên: ai đến trước được trước
 ứng dụng ── GET  /relay/v1/connect ═════════════════▶│  một kết nối đi ra cho mỗi ứng dụng
```

| Phía | Thiết lập |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=ten.mien.cua.ban` (bot dùng chung tùy chọn: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Ứng dụng | `ROOFTOP_RELAY_URL=https://ten.mien.cua.ban`: liên kết tại `https://<tên>.ten.mien.cua.ban` |

## Yêu cầu

* Một bản ghi DNS wildcard `*.ten.mien.cua.ban` trỏ đến máy chủ.
* Một chứng chỉ wildcard. Với Caddy, cần thử thách DNS-01 và một
  [mô-đun nhà cung cấp DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<nhà cung cấp>`).
* Một reverse proxy chuyển tiếp `Host` (Caddy làm việc này theo mặc định):

```nginx
*.ten.mien.cua.ban {
	tls {
		dns <nhà cung cấp> …
	}
	reverse_proxy iroof:8080
}
```

## Một trang giới thiệu trên tên miền chính {#a-splash-page-on-the-main-domain}

Trên tên miền chính, hub phục vụ API chuyển tiếp, các liên kết chia sẻ của chính nó và ứng dụng của chủ sở hữu (sau `ROOFTOP_PASSWORD`).
iroof.top thay vào đó hiển thị một trang giới thiệu nhỏ tại `/`, với các liên kết đến tài liệu và GitHub, bằng tiếng Anh và 20 ngôn ngữ khác
(`/es/`, `/zh-hans/`, `/ja/`, …; danh sách có trên mọi trang, và `sitemap.xml` liệt kê chúng cùng các phương án thay thế hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) là trang tiếng Anh;
`python3 scripts/landing-i18n.py` tạo các trang khác từ đó, với các bản dịch trong `scripts/landing-i18n/`. Mỗi trang là một
tệp độc lập duy nhất (không có script, phông chữ hay yêu cầu bên thứ ba); các câu hỏi là phần tử `<details>` gốc.
Các liên kết `<tên>.ten.mien.cua.ban` không xác định cũng đến đây. Bản demo ứng dụng bên trong là [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
được nhúng dưới dạng hình ảnh `data:` bởi `python3 scripts/landing-demo.py` (chạy sau khi thay đổi `demo.svg`, rồi `scripts/landing-i18n.py`).
Gắn thư mục vào Caddy (`./landing:/srv/landing:ro`) và định tuyến `/`, các thư mục ngôn ngữ và `sitemap.xml`:

```nginx
ten.mien.cua.ban {
	# Khách truy cập: trang giới thiệu. Trình duyệt đã gửi mật khẩu của chủ sở hữu sẽ nhận được ứng dụng.
	@landing {
		method GET HEAD
		path / /index.html
		not header Authorization *
	}
	handle @landing {
		root * /srv/landing
		rewrite * /index.html
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	# Các ngôn ngữ khác: /es/, /zh-hans/, … (các thư mục do scripts/landing-i18n.py ghi).
	@languages {
		method GET HEAD
		path_regexp lang ^/(es|zh-hans|hi|ar|fr|bn|pt-br|ru|ur|id|de|ja|tr|ko|vi|it|pl|uk|nl|fa)(/|/index\.html)?$
		not header Authorization *
	}
	handle @languages {
		root * /srv/landing
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	handle /sitemap.xml {
		root * /srv/landing
		file_server
	}
	# Chủ sở hữu đăng nhập tại /owner: trình duyệt hỏi mật khẩu, tiếp tục gửi nó, và / mở ứng dụng.
	handle /owner {
		@anon not header Authorization *
		handle @anon {
			header WWW-Authenticate "Basic realm=\"iRoof.top\""
			respond "Sign in to open the app" 401
		}
		handle {
			redir * / 302
		}
	}
	handle {
		reverse_proxy iroof:8080
	}
}
```

Ứng dụng vẫn kiểm tra mật khẩu ở mỗi yêu cầu của chủ sở hữu; bộ so khớp chỉ quyết định ai thấy trang giới thiệu.

## Quy tắc

| | |
|---|---|
| API của hub | `/relay/v1/…` trên tên miền chính |
| `<tên>.ten.mien.cua.ban` | luôn đến ứng dụng sở hữu tên, không bao giờ đến giao diện chủ sở hữu của hub |
| Tên | 3–32 chữ thường, chữ số và dấu gạch ngang; một số (`www`, `api`, `admin`…) được dành riêng |
| Giải phóng | sau 180 ngày không kết nối |
| Tên mới | giới hạn tốc độ theo IP |
| Quyền sở hữu | một bí mật ngẫu nhiên trong `settings.json` của ứng dụng; hub chỉ lưu SHA-256 của nó |
| Trạng thái | `relay.json` và `relay-telegram.json` trong thư mục dữ liệu |
