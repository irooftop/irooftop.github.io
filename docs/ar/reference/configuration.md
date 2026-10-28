# الإعدادات

متغيرات البيئة، أو ملف `.env` في مجلد العمل، أو خيارات `rooftop` المقابلة ([واجهة سطر الأوامر](./cli)). القيم المضبوطة في **الإعدادات** تتقدم على البيئة بالنسبة إلى نقطة نهاية LLM والنموذج والمفتاح والحرارة وميزانية السجل وخطوات الأدوات وخوادم MCP وبوت Telegram والوضع دون اتصال. يتقدم `TELEGRAM_BOT_TOKEN` على الإعدادات.

## النموذج

| المتغير | الافتراضي | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | أي واجهة API متوافقة مع OpenAI: OpenAI، وOpenRouter، وGemini، وMistral، وDeepSeek، وGroq، وOllama (`http://localhost:11434/v1`)، وLM Studio (`http://localhost:1234/v1`)، وllama.cpp (`http://localhost:8080/v1`)، وvLLM… |
| `OPENAI_API_KEY` | – | رمز Bearer |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | يجب أن يدعم استدعاء الأدوات |
| `OPENAI_TEMPERATURE` | الافتراضي للمزوّد | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | يصف الصور ويفرّغ الصوت إلى نص، مثل `xiaomi/mimo-v2.6-flash` |

## دون اتصال

| المتغير | الافتراضي | |
|---|---|---|
| `ROOFTOP_OFFLINE` | مُعطّل | `1` أو `true` أو `yes` أو `on`: نماذج وخوادم MCP محلية فقط (هذا الجهاز أو الشبكة)، بلا مشاركة عبر الإنترنت، بلا Telegram. يماثل مفتاح **Offline** في الإعدادات، لكن الإعدادات لا تستطيع إطفاءه. يحترمه تطبيق سطح المكتب أيضًا. [الوضع دون اتصال والخصوصية](../guide/offline) |

## الخادم

| المتغير | الافتراضي | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` في Docker) | مع `0.0.0.0:<المنفذ>` يعرض السجل عنوان URL للشبكة المحلية |
| `ROOFTOP_DATA` | `./data` (`/data` في Docker) | التصديرات، والمحادثات، والإعدادات |
| `ROOFTOP_IMPORT` | – | التصديرات المراد استيرادها عند البدء، مفصولة بـ`:`، وهي idempotent |
| `ROOFTOP_PASSWORD` | – | مصادقة HTTP Basic لواجهة المالك (أي اسم مستخدم). **اضبطها على خادم عام** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | حد الرفع للمالك بالـMiB؛ `0` يعني بلا حد (التصديرات بالغيغابايتات). اضبطه على خادم يستطيع الآخرون الوصول إليه. تحتفظ روابط المشاركة بحدها الخاص البالغ 16 MiB. ليس لتطبيق سطح المكتب حد |
| `ROOFTOP_TRUST_PROXY` | `false` | عنوان IP للعميل من `X-Forwarded-For` / `X-Real-IP`، فقط خلف وكيل عكسي |
| `ROOFTOP_FFMPEG` | `ffmpeg` في `PATH`، ثم Homebrew، و`/usr/local`، و`/usr/bin` | إطارات GIF والفيديو (اختياري) |
| `TZ` | UTC | المنطقة الزمنية للرسائل المباشرة |

## Telegram

| المتغير | الافتراضي | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | بوتك من [@BotFather](https://t.me/BotFather) ([الرد من Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | كل مجموعة ينضم إليها البوت | معرّفات المجموعات المسموح بها، مفصولة بفواصل |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | مثل خادم Bot API مستضاف ذاتيًا |

## الترحيل

| المتغير | الافتراضي | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | الترحيل للمشاركة عبر **الإنترنت** والبوت المشترك |
| `ROOFTOP_RELAY_DOMAIN` | – | يشغّل [محور ترحيل](./relay-hub) لهذا النطاق |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | البوت المشترك للمحور؛ يجب أن يختلف عن `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | أقصى عدد من الأسماء يحتفظ به المحور |

## الإعدادات فقط {#settings-only}

| الإعداد | الافتراضي | |
|---|---|---|
| ميزانية السجل | `120000` حرف | كم من السجل يُعاد تشغيله قبل أن تبدأ [الذاكرة](../features/how-it-works#long-chats) عملها |
| أقصى عدد لخطوات الأدوات | `6` | جولات LLM لكل رد (البحث، وأداة MCP، والرد…) |
