# Docker ve sunucular

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Istanbul \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| İmaj | `ghcr.io/irooftop/rooftop`, linux/amd64 ve linux/arm64 |
| Etiketler | `latest`, `X.Y.Z`, `X.Y` |
| Veri | `/data` (dışa aktarımlar, sohbetler, ayarlar) |
| Başlangıçta içe aktarma | bir klasör bağlayın ve `ROOFTOP_IMPORT=/import/chat` ayarlayın |

::: tip Node.js ve ffmpeg
İmaj ikisini de içermez. `npx` ile başlatılan stdio MCP sunucuları için imajı genişletin:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg, YZ'nin GIF'leri ve videoları kare kare görmesini sağlar
```

Ya da uzak (HTTP) bir MCP sunucusu kullanın.
:::

## HTTPS'li bir sunucu

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy), iRoof.top'ı sertifikayı alıp yenileyen
[Caddy](https://caddyserver.com) arkasında çalıştırır:

```sh
cd deploy
sed -i 's/example.com/alanadiniz.com/g' Caddyfile        # alan adı zaten sunucuya işaret etmelidir
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  ziyaretçi ──https──▶ Caddy :443 ──▶ iroof:8080
                         │               ├─ /s/…, /api/s/…, varlıklar   herkese açık
                         │               └─ geri kalan her şey          parola
                         └─ TLS sertifikası, otomatik yenilenir
```

* Paylaşım bağlantıları alan adınızı kullanır: `https://alanadiniz.com/s/<ad>`.
* Konteyner salt okunur, yetenekler (capabilities) olmadan ve bellek sınırıyla çalışır.
* Caddy ziyaretçinin IP'sini ilettiği için `ROOFTOP_TRUST_PROXY` etkindir.
* `docker compose pull && docker compose up -d` ile güncelleyin. `iroof-data` birimini yedekleyin.

::: danger Herkese açık bir sunucuda parola belirleyin
`ROOFTOP_PASSWORD` sahip arayüzünü ve API'sini korur. Bu olmadan adresi bulan herkes sohbetlerinizi okuyabilir.
:::
