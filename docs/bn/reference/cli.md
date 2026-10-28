# CLI

```text
rooftop [serve] [বিকল্প]           ওয়েব সার্ভার চালায় (ডিফল্ট)
rooftop parse <ফোল্ডার>            স্বাভাবিকীকৃত এক্সপোর্ট JSON হিসেবে প্রিন্ট করে
rooftop convert [বিকল্প] <ফোল্ডার>  একটি এক্সপোর্টের {model, messages, tools} প্রিন্ট করে
```

## `serve`

| বিকল্প | ভেরিয়েবল | ডিফল্ট |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (সীমাহীন) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | বট যেসব গ্রুপে যোগ দেয় সবগুলো |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | বন্ধ |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` স্থানীয় নয় এমন মডেল ও MCP এন্ডপয়েন্ট প্রত্যাখ্যান করে, এবং ইন্টারনেট শেয়ার ও Telegram বট বন্ধ করে ([অফলাইন ও গোপনীয়তা](../guide/offline))। এটি `--relay-domain`-এর সাথে ব্যবহার করা যায় না। প্রতিটি কী করে: [কনফিগারেশন](./configuration)।

## `parse` ও `convert`

```sh
rooftop parse   ./examples/telegram                          # স্বাভাবিকীকৃত JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # মডেল যা পায়
```

| `convert`-এর বিকল্প | ডিফল্ট | |
|---|---|---|
| `--persona` | চ্যাটের শিরোনাম / অন্য ব্যক্তি | LLM কার নামে কথা বলে |
| `--user` | অন্য অংশগ্রহণকারী | কে মানুষের ভূমিকা নেয় |
| `--budget` | `120000` | অক্ষরে ইতিহাসের বাজেট |

অ্যাপে `{ }` বোতামটি বর্তমান চ্যাটের জন্য একই JSON দেখায়।
