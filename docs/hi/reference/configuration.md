# कॉन्फ़िगरेशन

एनवायरनमेंट वेरिएबल्स, वर्किंग डायरेक्टरी में `.env` फ़ाइल, या संबंधित `rooftop` विकल्प ([CLI](./cli))। **सेटिंग्स** में सेट किए गए मान LLM एंडपॉइंट, मॉडल, कुंजी, तापमान, इतिहास बजट, टूल चरण, MCP सर्वर, Telegram बॉट, और ऑफ़लाइन मोड के लिए एनवायरनमेंट से ऊपर होते हैं। `TELEGRAM_BOT_TOKEN` सेटिंग्स से ऊपर होता है।

## मॉडल

| वेरिएबल | डिफ़ॉल्ट | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | कोई भी OpenAI-संगत API: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | Bearer टोकन |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | टूल कॉलिंग को सपोर्ट करना चाहिए |
| `OPENAI_TEMPERATURE` | प्रदाता का डिफ़ॉल्ट | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | छवियों का वर्णन करता है और आवाज़ का ट्रांसक्रिप्शन करता है, जैसे `xiaomi/mimo-v2.6-flash` |

## ऑफ़लाइन

| वेरिएबल | डिफ़ॉल्ट | |
|---|---|---|
| `ROOFTOP_OFFLINE` | बंद | `1`, `true`, `yes`, या `on`: केवल स्थानीय मॉडल और MCP सर्वर (यह कंप्यूटर या नेटवर्क), इंटरनेट शेयरिंग नहीं, Telegram नहीं। सेटिंग्स के **Offline** स्विच जैसा ही, लेकिन सेटिंग्स इसे बंद नहीं कर सकतीं। डेस्कटॉप ऐप भी इसका सम्मान करता है। [ऑफ़लाइन और गोपनीयता](../guide/offline) |

## सर्वर

| वेरिएबल | डिफ़ॉल्ट | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (Docker में `0.0.0.0:8080`) | `0.0.0.0:<पोर्ट>` के साथ लॉग LAN URL दिखाता है |
| `ROOFTOP_DATA` | `./data` (Docker में `/data`) | एक्सपोर्ट, चैट, सेटिंग्स |
| `ROOFTOP_IMPORT` | – | शुरू होने पर इम्पोर्ट करने वाले एक्सपोर्ट, `:` से अलग, इडम्पोटेंट |
| `ROOFTOP_PASSWORD` | – | मालिक के इंटरफ़ेस के लिए HTTP Basic प्रमाणीकरण (कोई भी यूज़रनेम)। **सार्वजनिक सर्वर पर सेट करें** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | मालिक के लिए MiB में अपलोड सीमा; `0` का मतलब कोई नहीं (एक्सपोर्ट कई GB के होते हैं)। ऐसे सर्वर पर सेट करें जिस तक दूसरे पहुँच सकते हैं। शेयर लिंक की अपनी 16 MiB सीमा रहती है। डेस्कटॉप ऐप की कोई सीमा नहीं है |
| `ROOFTOP_TRUST_PROXY` | `false` | `X-Forwarded-For` / `X-Real-IP` से क्लाइंट IP, केवल रिवर्स प्रॉक्सी के पीछे |
| `ROOFTOP_FFMPEG` | `PATH` में `ffmpeg`, फिर Homebrew, `/usr/local`, `/usr/bin` | GIF और वीडियो के फ़्रेम (वैकल्पिक) |
| `TZ` | UTC | लाइव संदेशों का समय क्षेत्र |

## Telegram

| वेरिएबल | डिफ़ॉल्ट | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | [@BotFather](https://t.me/BotFather) से आपका बॉट ([Telegram से जवाब दें](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | हर ग्रुप जिसमें बॉट जुड़ता है | अनुमत ग्रुप ID, कॉमा से अलग |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | जैसे खुद होस्ट किया गया Bot API सर्वर |

## रिले

| वेरिएबल | डिफ़ॉल्ट | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | **इंटरनेट** शेयरिंग और साझा बॉट के लिए रिले |
| `ROOFTOP_RELAY_DOMAIN` | – | इस डोमेन के लिए एक [रिले हब](./relay-hub) चलाता है |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | हब का साझा बॉट; `TELEGRAM_BOT_TOKEN` से अलग होना चाहिए |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | हब अधिकतम कितने नाम रखता है |

## केवल सेटिंग्स में {#settings-only}

| सेटिंग | डिफ़ॉल्ट | |
|---|---|---|
| इतिहास बजट | `120000` अक्षर | [मेमोरी](../features/how-it-works#long-chats) लागू होने से पहले कितना इतिहास दोहराया जाता है |
| अधिकतम टूल चरण | `6` | हर जवाब के लिए LLM राउंड (खोज, MCP टूल, जवाब…) |
