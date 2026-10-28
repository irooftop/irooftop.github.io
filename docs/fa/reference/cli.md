# CLI

```text
rooftop [serve] [گزینه‌ها]          وب‌سرور را اجرا می‌کند (پیش‌فرض)
rooftop parse <پوشه>               صادرات استانداردشده را به‌صورت JSON چاپ می‌کند
rooftop convert [گزینه‌ها] <پوشه>  {model, messages, tools} یک صادرات را چاپ می‌کند
```

## `serve`

| گزینه | متغیر | پیش‌فرض |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (بی‌حد) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | هر گروهی که ربات به آن می‌پیوندد |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | خاموش |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` نقاط پایانی مدل و MCP غیرمحلی را رد می‌کند و اشتراک‌گذاری از طریق اینترنت و ربات تلگرام را خاموش می‌کند ([آفلاین و حریم خصوصی](../guide/offline)). با `--relay-domain` قابل ترکیب نیست. کارکرد هرکدام: [پیکربندی](./configuration).

## `parse` و `convert`

```sh
rooftop parse   ./examples/telegram                          # JSON استانداردشده
rooftop convert ./examples/telegram --persona "Jonas Weber"  # آنچه مدل دریافت می‌کند
```

| گزینه‌ی `convert` | پیش‌فرض | |
|---|---|---|
| `--persona` | عنوان گفتگو / شخص دیگر | به نام چه کسی LLM صحبت می‌کند |
| `--user` | شرکت‌کننده‌ی دیگر | چه کسی نقش انسان را بازی می‌کند |
| `--budget` | `120000` | بودجه‌ی تاریخچه بر حسب نویسه |

در برنامه، دکمه‌ی `{ }` همان JSON را برای گفتگوی فعلی نشان می‌دهد.
