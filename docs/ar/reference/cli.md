# واجهة سطر الأوامر (CLI)

```text
rooftop [serve] [الخيارات]          يشغّل خادم الويب (الافتراضي)
rooftop parse <المجلد>              يطبع التصدير الموحّد بصيغة JSON
rooftop convert [الخيارات] <المجلد>  يطبع {model, messages, tools} لتصدير
```

## `serve`

| الخيار | المتغير | الافتراضي |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (بلا حد) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | كل مجموعة ينضم إليها البوت |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | مُعطّل |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

يرفض `--offline` نقاط نهاية النموذج وMCP غير المحلية، ويُطفئ المشاركة عبر الإنترنت وبوت Telegram ([الوضع دون اتصال والخصوصية](../guide/offline)). لا يمكن دمجه مع `--relay-domain`. ما يفعله كل منها: [الإعدادات](./configuration).

## `parse` و`convert`

```sh
rooftop parse   ./examples/telegram                          # JSON موحّد
rooftop convert ./examples/telegram --persona "Jonas Weber"  # ما يتلقاه النموذج
```

| خيار `convert` | الافتراضي | |
|---|---|---|
| `--persona` | عنوان المحادثة / الشخص الآخر | باسم من يتحدث LLM |
| `--user` | المشارك الآخر | من يؤدي دور الإنسان |
| `--budget` | `120000` | ميزانية السجل بالأحرف |

في التطبيق، يعرض زر `{ }` الـJSON نفسه للمحادثة الحالية.
