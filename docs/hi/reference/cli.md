# CLI

```text
rooftop [serve] [विकल्प]           वेब सर्वर चलाता है (डिफ़ॉल्ट)
rooftop parse <फ़ोल्डर>            सामान्यीकृत एक्सपोर्ट को JSON के रूप में प्रिंट करता है
rooftop convert [विकल्प] <फ़ोल्डर>  एक्सपोर्ट का {model, messages, tools} प्रिंट करता है
```

## `serve`

| विकल्प | वेरिएबल | डिफ़ॉल्ट |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (असीमित) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | हर ग्रुप जिसमें बॉट जुड़ता है |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | बंद |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` गैर-स्थानीय मॉडल और MCP एंडपॉइंट्स को अस्वीकार करता है, और इंटरनेट शेयरिंग तथा Telegram बॉट को बंद करता है ([ऑफ़लाइन और गोपनीयता](../guide/offline))। इसे `--relay-domain` के साथ नहीं जोड़ा जा सकता। हर एक क्या करता है: [कॉन्फ़िगरेशन](./configuration)।

## `parse` और `convert`

```sh
rooftop parse   ./examples/telegram                          # सामान्यीकृत JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # मॉडल को जो मिलता है
```

| `convert` विकल्प | डिफ़ॉल्ट | |
|---|---|---|
| `--persona` | चैट का शीर्षक / दूसरा व्यक्ति | LLM किसके नाम से बोलता है |
| `--user` | दूसरा प्रतिभागी | इंसान का रोल कौन निभाता है |
| `--budget` | `120000` | अक्षरों में इतिहास बजट |

ऐप में `{ }` बटन मौजूदा चैट के लिए वही JSON दिखाता है।
