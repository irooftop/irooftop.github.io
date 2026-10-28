# CLI

```text
rooftop [serve] [OPTIONS]        ویب سرور چلائیں (ڈیفالٹ)
rooftop parse <DIR>              معیاری شدہ ایکسپورٹ کو JSON کے طور پر پرنٹ کریں
rooftop convert [OPTIONS] <DIR>  ایکسپورٹ کے لیے {model, messages, tools} پرنٹ کریں
```

## `serve`

| فلیگ | متغیر | ڈیفالٹ |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (بے حد) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | ہر وہ گروپ جس میں بوٹ شامل ہو |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | بند |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` غیر مقامی ماڈل اور MCP endpoints کو رد کرتا ہے، اور انٹرنیٹ شیئرنگ اور Telegram بوٹ بند کر دیتا ہے ([آف لائن اور رازداری](../guide/offline))۔ اسے `--relay-domain` کے ساتھ نہیں ملایا جا سکتا۔ ہر ایک کیا کرتا ہے: [ترتیب](./configuration)۔

## `parse` اور `convert`

```sh
rooftop parse   ./examples/telegram                          # معیاری JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # جو ماڈل وصول کرتا ہے
```

| `convert` فلیگ | ڈیفالٹ | |
|---|---|---|
| `--persona` | چیٹ کا عنوان / دوسرا شخص | LLM کس کے طور پر بولتا ہے |
| `--user` | دوسرا شریک | انسان کا کردار کون ادا کرتا ہے |
| `--budget` | `120000` | حروف میں تاریخ کا بجٹ |

ایپ میں `{ }` بٹن موجودہ چیٹ کے لیے یہی JSON دکھاتا ہے۔
