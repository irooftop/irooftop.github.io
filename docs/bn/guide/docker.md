# Docker ও সার্ভার

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Dhaka \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| ইমেজ | `ghcr.io/irooftop/rooftop`, linux/amd64 ও linux/arm64 |
| ট্যাগ | `latest`, `X.Y.Z`, `X.Y` |
| ডেটা | `/data` (এক্সপোর্ট, চ্যাট, সেটিংস) |
| শুরুতে ইমপোর্ট | একটি ফোল্ডার মাউন্ট করুন এবং `ROOFTOP_IMPORT=/import/chat` সেট করুন |

::: tip Node.js ও ffmpeg
ইমেজে এর কোনোটিই নেই। `npx` দিয়ে শুরু হওয়া stdio MCP সার্ভারের জন্য ইমেজটি বাড়ান:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg AI-কে GIF ও ভিডিও ফ্রেম-ফ্রেম দেখতে দেয়
```

অথবা একটি রিমোট (HTTP) MCP সার্ভার ব্যবহার করুন।
:::

## HTTPS সহ একটি সার্ভার

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) iRoof.top-কে [Caddy](https://caddyserver.com)-এর পেছনে চালায়, যা সার্টিফিকেট নেয় ও নবায়ন করে:

```sh
cd deploy
sed -i 's/example.com/আপনার.ডোমেইন/g' Caddyfile        # ডোমেইন আগে থেকেই সার্ভারের দিকে নির্দেশ করতে হবে
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  ভিজিটর ──https──▶ Caddy :443 ──▶ iroof:8080
                       │               ├─ /s/…, /api/s/…, সম্পদ   সর্বজনীন
                       │               └─ বাকি সব                  পাসওয়ার্ড
                       └─ TLS সার্টিফিকেট, স্বয়ংক্রিয়ভাবে নবায়িত
```

* শেয়ার লিংক আপনার ডোমেইন ব্যবহার করে: `https://আপনার.ডোমেইন/s/<নাম>`।
* কন্টেইনার শুধু-পঠনযোগ্য মোডে, কোনো capability ছাড়া এবং মেমোরি সীমাসহ চলে।
* `ROOFTOP_TRUST_PROXY` চালু থাকে, কারণ Caddy ভিজিটরের IP পাঠায়।
* আপডেট করুন `docker compose pull && docker compose up -d` দিয়ে। `iroof-data` ভলিউমের ব্যাকআপ রাখুন।

::: danger একটি সর্বজনীন সার্ভারে পাসওয়ার্ড সেট করুন
`ROOFTOP_PASSWORD` মালিকের ইন্টারফেস ও API রক্ষা করে। এটি ছাড়া ঠিকানা খুঁজে পাওয়া যে কেউ আপনার চ্যাট পড়তে পারে।
:::
