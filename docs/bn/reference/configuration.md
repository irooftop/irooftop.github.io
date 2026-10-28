# কনফিগারেশন

এনভায়রনমেন্ট ভেরিয়েবল, ওয়ার্কিং ডিরেক্টরির `.env` ফাইল, বা সংশ্লিষ্ট `rooftop` বিকল্প ([CLI](./cli))। **সেটিংস**-এ সেট করা মানগুলো LLM এন্ডপয়েন্ট, মডেল, কী, তাপমাত্রা, ইতিহাস বাজেট, টুল ধাপ, MCP সার্ভার, Telegram বট, ও অফলাইন মোডের জন্য পরিবেশের উপরে থাকে। `TELEGRAM_BOT_TOKEN` সেটিংসের উপরে থাকে।

## মডেল

| ভেরিয়েবল | ডিফল্ট | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | যেকোনো OpenAI-সামঞ্জস্যপূর্ণ API: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | Bearer টোকেন |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | টুল কলিং সমর্থন করতে হবে |
| `OPENAI_TEMPERATURE` | প্রদানকারীর ডিফল্ট | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | ছবির বর্ণনা দেয় ও ভয়েস ট্রান্সক্রাইব করে, যেমন `xiaomi/mimo-v2.6-flash` |

## অফলাইন

| ভেরিয়েবল | ডিফল্ট | |
|---|---|---|
| `ROOFTOP_OFFLINE` | বন্ধ | `1`, `true`, `yes`, বা `on`: শুধু স্থানীয় মডেল ও MCP সার্ভার (এই কম্পিউটার বা নেটওয়ার্ক), ইন্টারনেট শেয়ার নেই, Telegram নেই। সেটিংস-এর **Offline** সুইচের মতো, তবে সেটিংস এটি বন্ধ করতে পারে না। ডেস্কটপ অ্যাপও এটি মানে। [অফলাইন ও গোপনীয়তা](../guide/offline) |

## সার্ভার

| ভেরিয়েবল | ডিফল্ট | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (Docker-এ `0.0.0.0:8080`) | `0.0.0.0:<পোর্ট>`-এর সাথে লগ LAN URL দেখায় |
| `ROOFTOP_DATA` | `./data` (Docker-এ `/data`) | এক্সপোর্ট, চ্যাট, সেটিংস |
| `ROOFTOP_IMPORT` | – | শুরুতে ইমপোর্ট হওয়া এক্সপোর্ট, `:` দিয়ে আলাদা, ইডেমপোটেন্ট |
| `ROOFTOP_PASSWORD` | – | মালিকের ইন্টারফেসের জন্য HTTP Basic প্রমাণীকরণ (যেকোনো ব্যবহারকারীর নাম)। **একটি সর্বজনীন সার্ভারে সেট করুন** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | মালিকের জন্য MiB-তে আপলোড সীমা; `0` মানে কোনো সীমা নেই (এক্সপোর্ট কয়েক GB হয়)। এমন সার্ভারে সেট করুন যেখানে অন্যরা পৌঁছাতে পারে। শেয়ার লিংকের নিজস্ব ১৬ MiB সীমা থাকে। ডেস্কটপ অ্যাপের কোনো সীমা নেই |
| `ROOFTOP_TRUST_PROXY` | `false` | `X-Forwarded-For` / `X-Real-IP` থেকে ক্লায়েন্ট IP, শুধু একটি রিভার্স প্রক্সির পেছনে |
| `ROOFTOP_FFMPEG` | `PATH`-এর `ffmpeg`, তারপর Homebrew, `/usr/local`, `/usr/bin` | GIF ও ভিডিওর ফ্রেম (ঐচ্ছিক) |
| `TZ` | UTC | লাইভ বার্তার সময় অঞ্চল |

## Telegram

| ভেরিয়েবল | ডিফল্ট | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | [@BotFather](https://t.me/BotFather) থেকে আপনার বট ([Telegram থেকে উত্তর দিন](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | বট যেসব গ্রুপে যোগ দেয় সবগুলো | অনুমোদিত গ্রুপ আইডি, কমা দিয়ে আলাদা |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | যেমন একটি স্ব-হোস্টেড Bot API সার্ভার |

## রিলে

| ভেরিয়েবল | ডিফল্ট | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | **ইন্টারনেট** শেয়ার ও শেয়ার করা বটের রিলে |
| `ROOFTOP_RELAY_DOMAIN` | – | এই ডোমেইনের জন্য একটি [রিলে হাব](./relay-hub) চালায় |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | হাবের শেয়ার করা বট; `TELEGRAM_BOT_TOKEN`-এর থেকে আলাদা হতে হবে |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | একটি হাব সর্বোচ্চ কতগুলো নাম রাখে |

## শুধু সেটিংস-এ {#settings-only}

| সেটিং | ডিফল্ট | |
|---|---|---|
| ইতিহাস বাজেট | `120000` অক্ষর | [স্মৃতি](../features/how-it-works#long-chats) কার্যকর হওয়ার আগে কতটা ইতিহাস পুনরায় চালানো হয় |
| সর্বোচ্চ টুল ধাপ | `6` | প্রতি উত্তরে LLM রাউন্ড (অনুসন্ধান, MCP টুল, উত্তর…) |
