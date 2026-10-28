# Docker और सर्वर

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Kolkata \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| इमेज | `ghcr.io/irooftop/rooftop`, linux/amd64 और linux/arm64 |
| टैग | `latest`, `X.Y.Z`, `X.Y` |
| डेटा | `/data` (एक्सपोर्ट, चैट, सेटिंग्स) |
| शुरू होने पर इम्पोर्ट | एक फ़ोल्डर माउंट करें और `ROOFTOP_IMPORT=/import/chat` सेट करें |

::: tip Node.js और ffmpeg
इमेज में इनमें से कोई भी शामिल नहीं है। `npx` से शुरू होने वाले stdio MCP सर्वर के लिए इमेज को बढ़ाएँ:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg AI को GIF और वीडियो फ़्रेम-दर-फ़्रेम देखने देता है
```

या एक रिमोट (HTTP) MCP सर्वर इस्तेमाल करें।
:::

## HTTPS वाला सर्वर

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) iRoof.top को [Caddy](https://caddyserver.com) के पीछे चलाता है, जो सर्टिफ़िकेट प्राप्त और नवीनीकृत करता है:

```sh
cd deploy
sed -i 's/example.com/आपका.डोमेन/g' Caddyfile        # डोमेन पहले से सर्वर की ओर इंगित होना चाहिए
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  विज़िटर ──https──▶ Caddy :443 ──▶ iroof:8080
                       │               ├─ /s/…, /api/s/…, एसेट्स   सार्वजनिक
                       │               └─ बाकी सब                  पासवर्ड
                       └─ TLS सर्टिफ़िकेट, अपने-आप नवीनीकृत
```

* शेयर लिंक आपके डोमेन का उपयोग करते हैं: `https://आपका.डोमेन/s/<नाम>`।
* कंटेनर केवल-पढ़ने के मोड में, बिना capabilities के और मेमोरी सीमा के साथ चलता है।
* `ROOFTOP_TRUST_PROXY` चालू है, क्योंकि Caddy विज़िटर का IP आगे भेजता है।
* अपडेट के लिए `docker compose pull && docker compose up -d`। `iroof-data` वॉल्यूम का बैकअप लें।

::: danger सार्वजनिक सर्वर पर पासवर्ड सेट करें
`ROOFTOP_PASSWORD` मालिक के इंटरफ़ेस और API की रक्षा करता है। इसके बिना, पता पाने वाला कोई भी आपकी चैट पढ़ सकता है।
:::
