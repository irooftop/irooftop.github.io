# البدء

## التثبيت {#install}

| | الأمر |
|---|---|
| **تطبيق سطح المكتب**، macOS | `brew install --cask irooftop/tap/irooftop` |
| **تطبيق سطح المكتب**، Windows | [المثبّت (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) أو [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **تطبيق سطح المكتب**، Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) أو [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) أو [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **الخادم**، macOS وLinux | `brew install irooftop/tap/rooftop` (ثم `brew services start rooftop`) |
| **الخادم**، في أي مكان يتوفر فيه Rust ≥ 1.88 | `cargo install rooftop` |
| **الخادم**، حاوية | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

لا يحتاج تطبيق سطح المكتب إلى الطرفية: انظر [تطبيق سطح المكتب](./desktop).

## التشغيل

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # الإعداد الافتراضي؛ يعمل أي واجهة API متوافقة مع OpenAI
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # يجب أن يدعم استدعاء الأدوات
rooftop                                               # http://127.0.0.1:8080
```

يمكن أن تكون المتغيرات أيضًا في ملف `.env` بجوار المكان الذي تشغّل منه `rooftop`، أو أن تُضبط لاحقًا في **الإعدادات**.
يرسل **اختبار** في الإعدادات طلبًا صغيرًا ويخبرك بلغة بسيطة بما هو خاطئ، مثل
"رفض openrouter.ai مفتاح API (401)".

هل تريد ألا يغادر أي شيء جهازك؟ استخدم نموذجًا محليًا و[الوضع دون اتصال](./offline).

## أول محادثة لك

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. صدّر      │ ──▶ │ 2. اسحبه إلى       │ ──▶ │ 3. محادثة جديدة:     │
 │ المحادثة     │     │    الصفحة          │     │ اختر من يؤدي دوره AI │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [صدّر محادثة](./export) من Telegram Desktop أو WhatsApp.
2. اسحب المجلد أو ملف `.zip` أو ملف `.txt` الخاص بـ WhatsApp إلى الصفحة (أو ابدأ بـ `rooftop --import <المجلد>`).
3. اضغط **محادثة جديدة** واختر الشخصية: الشخص الآخر، أو نفسك ("التحدث مع نفسك بأسلوبك").

::: tip جرّبه دون محادثاتك
يحتوي المستودع على تصديرين خياليين في [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
يطبخ جوناس وبرييا اللازانيا على Telegram، ويقضي صوفيا ودانيال عطلة نهاية أسبوع على WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### لا يوجد تصدير؟ ابدأ من الملاحظات

تحتاج **محادثة جديدة ← من الملاحظات** إلى اسمه فقط (اسمك اختياري) وبضعة أسطر عنه: من هو،
ما الذي تتشاركانه، وكيف يكتب ("يناديني حبيبتي، رسائل إيطالية قصيرة، ❤️ كثيرة"). يكتب الذكاء الاصطناعي كما يكتب هو
اعتمادًا على هذه الملاحظات وحدها. فمن دون سجل لا يوجد ملف أسلوب أو مكتبة وسائط، لذا كلما وصفت الملاحظات طريقة كتابته، اقترب الناتج منه أكثر. يمكنك تعديل الملاحظات في المحادثة في أي وقت (✎)، ومشاركة المحادثة عبر رابط كأي محادثة أخرى. حذف المحادثة يحذف كل ما فيها.

## ما الذي في النافذة

| الزر | وظيفته |
|---|---|
| **مشاركة** | [روابط](../features/share-links) ليتحدث الأصدقاء مع الشخصية |
| **مكتبة الوسائط** | كل ملصق وGIF وصورة ورسالة صوتية مع ما يعرفه الذكاء الاصطناعي عنها |
| **الملاحظات** | أشياء عن الشخص لا يذكرها التصدير. تقرؤها الشخصية، ولا يقرؤها الزوار أبدًا |
| **`{ }`** | JSON الدقيق المرسل إلى النموذج، والرموز المستخدمة |
| **إعادة الكتابة** | يحذف آخر رد للشخصية ويكتبه من جديد |
| **دعهم يكتبون أولًا** | تبدأ الشخصية المحادثة |
