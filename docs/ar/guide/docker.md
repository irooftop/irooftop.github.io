# Docker والخوادم

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Riyadh \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| الصورة | `ghcr.io/irooftop/rooftop`، linux/amd64 وlinux/arm64 |
| الوسوم | `latest`، `X.Y.Z`، `X.Y` |
| البيانات | `/data` (التصديرات، والمحادثات، والإعدادات) |
| الاستيراد عند البدء | ركّب مجلدًا واضبط `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js وffmpeg
لا تحتوي الصورة على أيٍّ منهما. بالنسبة إلى خوادم MCP من نوع stdio التي تُشغَّل بـ `npx`، وسّع الصورة:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # يتيح ffmpeg للذكاء الاصطناعي رؤية GIF والفيديو إطارًا تلو الآخر
```

أو استخدم خادم MCP بعيدًا (HTTP).
:::

## خادم مع HTTPS

يشغّل [`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) iRoof.top خلف [Caddy](https://caddyserver.com)، الذي يحصل على الشهادة ويجددها:

```sh
cd deploy
sed -i 's/example.com/نطاقك.com/g' Caddyfile        # يجب أن يشير النطاق إلى الخادم مسبقًا
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  الزائر ──https──▶ Caddy :443 ──▶ iroof:8080
                      │               ├─ /s/…، /api/s/…، الملفات   عام
                      │               └─ كل ما عدا ذلك             كلمة المرور
                      └─ شهادة TLS، تُجدَّد تلقائيًا
```

* تستخدم روابط المشاركة نطاقك: `https://نطاقك.com/s/<الاسم>`.
* تعمل الحاوية للقراءة فقط، دون أي capabilities، ومع حد للذاكرة.
* `ROOFTOP_TRUST_PROXY` مفعّل، لأن Caddy يمرر عنوان IP الخاص بالزائر.
* للتحديث: `docker compose pull && docker compose up -d`. انسخ وحدة التخزين `iroof-data` احتياطيًا.

::: danger اضبط كلمة مرور على خادم عام
تحمي `ROOFTOP_PASSWORD` واجهة المالك وواجهة API الخاصة به. من دونها، يستطيع أي شخص يعثر على العنوان قراءة محادثاتك.
:::
