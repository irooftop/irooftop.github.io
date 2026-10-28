# ترتیب (Configuration)

ماحولیاتی متغیرات، کام کرنے والی ڈائریکٹری میں `.env` فائل، یا متعلقہ `rooftop` فلیگز ([CLI](./cli))۔ **Settings** میں مقرر کی گئی قدریں ماحول پر فوقیت رکھتی ہیں، LLM endpoint، ماڈل، کلید، temperature، تاریخ کا بجٹ، ٹول کے مراحل، MCP سرورز، Telegram بوٹ اور آف لائن موڈ کے لیے۔ `TELEGRAM_BOT_TOKEN` Settings پر فوقیت رکھتا ہے۔

## ماڈل

| متغیر | ڈیفالٹ | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | کوئی بھی OpenAI سے مطابقت رکھنے والا API: OpenAI، OpenRouter، Gemini، Mistral، DeepSeek، Groq، Ollama (`http://localhost:11434/v1`)، LM Studio (`http://localhost:1234/v1`)، llama.cpp (`http://localhost:8080/v1`)، vLLM… |
| `OPENAI_API_KEY` | – | bearer ٹوکن |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | ٹول کال سپورٹ کرنا لازمی ہے |
| `OPENAI_TEMPERATURE` | فراہم کنندہ کا ڈیفالٹ | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | تصاویر کی تفصیل اور آواز کو متن میں بدلتا ہے، مثلاً `xiaomi/mimo-v2.6-flash` |

## آف لائن

| متغیر | ڈیفالٹ | |
|---|---|---|
| `ROOFTOP_OFFLINE` | بند | `1`، `true`، `yes` یا `on`: صرف مقامی ماڈلز اور MCP سرورز (یہی کمپیوٹر یا نیٹ ورک)، انٹرنیٹ شیئرنگ نہیں، Telegram نہیں۔ یہ Settings میں **Offline** سوئچ جیسا ہے، مگر Settings اسے بند نہیں کر سکتیں۔ ڈیسک ٹاپ ایپ بھی اسے مانتی ہے۔ [آف لائن اور رازداری](../guide/offline) |

## سرور

| متغیر | ڈیفالٹ | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (Docker میں `0.0.0.0:8080`) | `0.0.0.0:<port>` کے ساتھ لاگ LAN URL دکھاتا ہے |
| `ROOFTOP_DATA` | `./data` (Docker میں `/data`) | ایکسپورٹس، چیٹس، سیٹنگز |
| `ROOFTOP_IMPORT` | – | شروع ہونے پر درآمد ہونے والی ایکسپورٹس، `:` سے الگ، idempotent |
| `ROOFTOP_PASSWORD` | – | مالک کے UI کے لیے HTTP Basic auth (کوئی بھی صارف نام)۔ **عوامی سرور پر ضرور سیٹ کریں** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | مالک کے لیے اپ لوڈ کی حد MiB میں؛ `0` کا مطلب کوئی حد نہیں (ایکسپورٹس کئی GB کی ہوتی ہیں)۔ ایسے سرور پر سیٹ کریں جس تک دوسرے پہنچ سکیں۔ شیئر لنکس کی اپنی 16 MiB حد ہے۔ ڈیسک ٹاپ ایپ کی کوئی حد نہیں |
| `ROOFTOP_TRUST_PROXY` | `false` | کلائنٹ IP `X-Forwarded-For` / `X-Real-IP` سے، صرف ریورس پراکسی کے پیچھے |
| `ROOFTOP_FFMPEG` | `PATH` پر `ffmpeg`، پھر Homebrew، `/usr/local`، `/usr/bin` | GIFs اور ویڈیوز کے فریمز (اختیاری) |
| `TZ` | UTC | براہ راست پیغامات کا ٹائم زون |

## Telegram

| متغیر | ڈیفالٹ | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | [@BotFather](https://t.me/BotFather) سے آپ کا بوٹ ([Telegram سے جواب دیں](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | ہر وہ گروپ جس میں بوٹ شامل ہو | اجازت یافتہ گروپ IDs، کاما سے الگ |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | مثلاً خود میزبان Bot API سرور |

## ریلے

| متغیر | ڈیفالٹ | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | **انٹرنیٹ** شیئرنگ اور مشترکہ بوٹ کے لیے ریلے |
| `ROOFTOP_RELAY_DOMAIN` | – | اس ڈومین کے لیے [ریلے ہب](./relay-hub) چلائیں |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | ہب کا مشترکہ بوٹ؛ `TELEGRAM_BOT_TOKEN` سے مختلف ہونا چاہیے |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | ایک ہب زیادہ سے زیادہ کتنے نام رکھتا ہے |

## صرف Settings میں {#settings-only}

| سیٹنگ | ڈیفالٹ | |
|---|---|---|
| تاریخ کا بجٹ | `120000` حروف | [یادداشت](../features/how-it-works#long-chats) شروع ہونے سے پہلے کتنی تاریخ دوبارہ چلائی جائے |
| زیادہ سے زیادہ ٹول کے مراحل | `6` | ہر جواب کے لیے LLM کے دور (تلاش، MCP ٹول، جواب…) |
