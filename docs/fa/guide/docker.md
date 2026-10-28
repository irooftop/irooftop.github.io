# Docker و سرورها

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Tehran \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| ایمیج | `ghcr.io/irooftop/rooftop`، linux/amd64 و linux/arm64 |
| برچسب‌ها | `latest`، `X.Y.Z`، `X.Y` |
| داده | `/data` (صادرات، گفتگوها، تنظیمات) |
| وارد کردن هنگام شروع | یک پوشه را متصل کنید و `ROOFTOP_IMPORT=/import/chat` را تنظیم کنید |

::: tip Node.js و ffmpeg
ایمیج هیچ‌کدام را ندارد. برای سرورهای MCP از نوع stdio که با `npx` شروع می‌شوند، ایمیج را گسترش دهید:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg به هوش مصنوعی اجازه می‌دهد GIF و ویدیو را فریم به فریم ببیند
```

یا از یک سرور MCP از راه دور (HTTP) استفاده کنید.
:::

## سرور با HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) iRoof.top را پشت [Caddy](https://caddyserver.com) اجرا می‌کند، که گواهی را می‌گیرد و تمدید می‌کند:

```sh
cd deploy
sed -i 's/example.com/دامنه‌ی.شما/g' Caddyfile        # دامنه باید از قبل به سرور اشاره کند
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  بازدیدکننده ──https──▶ Caddy :443 ──▶ iroof:8080
                           │               ├─ /s/…، /api/s/…، دارایی‌ها   عمومی
                           │               └─ بقیه                         رمز عبور
                           └─ گواهی TLS، به‌طور خودکار تمدید می‌شود
```

* پیوندهای اشتراک‌گذاری از دامنه‌ی شما استفاده می‌کنند: `https://دامنه‌ی.شما/s/<نام>`.
* کانتینر فقط‌خواندنی، بدون capabilities و با محدودیت حافظه اجرا می‌شود.
* `ROOFTOP_TRUST_PROXY` فعال است، زیرا Caddy نشانی IP بازدیدکننده را منتقل می‌کند.
* برای به‌روزرسانی: `docker compose pull && docker compose up -d`. از volume با نام `iroof-data` پشتیبان بگیرید.

::: danger روی سرور عمومی رمز عبور تنظیم کنید
`ROOFTOP_PASSWORD` از رابط و API مالک محافظت می‌کند. بدون آن، هر کسی که نشانی را پیدا کند می‌تواند گفتگوهای شما را بخواند.
:::
