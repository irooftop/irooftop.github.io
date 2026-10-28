# Docker اور سرورز

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Berlin \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| ایمیج | `ghcr.io/irooftop/rooftop`، linux/amd64 اور linux/arm64 |
| ٹیگز | `latest`، `X.Y.Z`، `X.Y` |
| ڈیٹا | `/data` (ایکسپورٹس، چیٹس، سیٹنگز) |
| شروع ہوتے ہی درآمد | ایک فولڈر ماونٹ کریں اور `ROOFTOP_IMPORT=/import/chat` سیٹ کریں |

::: tip Node.js اور ffmpeg
اس ایمیج میں نہ Node.js ہے نہ ffmpeg۔ `npx` سے شروع ہونے والے stdio MCP سرورز کے لیے اسے بڑھائیں:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg کی بدولت AI GIFs اور ویڈیوز کو فریم بہ فریم دیکھ سکتا ہے
```

یا اس کے بجائے ریموٹ (HTTP) MCP سرور استعمال کریں۔
:::

## HTTPS والا سرور

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) iRoof.top کو [Caddy](https://caddyserver.com) کے پیچھے چلاتا ہے، جو سرٹیفکیٹ حاصل کرتا اور تجدید کرتا ہے:

```sh
cd deploy
sed -i 's/example.com/your.domain/g' Caddyfile        # ڈومین پہلے ہی سرور کی طرف اشارہ کرتا ہو
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  وزیٹر ──https──▶ Caddy :443 ──▶ iroof:8080
                       │               ├─ /s/…، /api/s/…، اثاثے   عوامی
                       │               └─ باقی سب                 پاس ورڈ
                       └─ TLS سرٹیفکیٹ، خودکار تجدید
```

* شیئر لنکس آپ کا ڈومین استعمال کرتے ہیں: `https://your.domain/s/<name>`۔
* کنٹینر read-only چلتا ہے، بغیر capabilities کے اور میموری کی حد کے ساتھ۔
* `ROOFTOP_TRUST_PROXY` آن ہے، کیونکہ Caddy وزیٹر کا IP آگے بھیجتا ہے۔
* اپ ڈیٹ کے لیے `docker compose pull && docker compose up -d` چلائیں۔ `iroof-data` والیوم کا بیک اپ رکھیں۔

::: danger عوامی سرور پر پاس ورڈ لگائیں
`ROOFTOP_PASSWORD` مالک کے UI اور API کی حفاظت کرتا ہے۔ اس کے بغیر، جو کوئی بھی پتا ڈھونڈ لے وہ آپ کی چیٹس پڑھ سکتا ہے۔
:::
