# تطبيق سطح المكتب

يشغّل تطبيق سطح المكتب ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) الخادم نفسه الذي يشغّله `rooftop serve` على منفذ `127.0.0.1` عشوائي، ويعرضه في نافذة أصلية.

| المنصة | التثبيت |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`، أو ملف `.dmg` لـ[Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) أو [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 وWindows 11 | [المثبّت (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) أو [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (أي توزيعة)، أو [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian وUbuntu)، أو [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

تشير روابط التنزيل دائمًا إلى أحدث إصدار.

::: warning البنيات غير موقّعة بعد
على macOS، افتح التطبيق مرة واحدة، ثم **System Settings ← Privacy & Security ← Open Anyway**. على Windows، اختر **More info ← Run anyway** في SmartScreen. خطوة بخطوة، مع رسوم متحركة: [فتح تطبيق غير موقّع](./unsigned-apps).
:::

## التشغيل الأول

لا يقرأ التطبيق الصدفة أو ملف `.env` الخاص بك، لذلك يستقبلك بشاشة **ربط نموذج**: افتح **الإعدادات**، وأدخل نقطة النهاية والمفتاح والنموذج، ثم اضغط **اختبار**. إذا كانت `OPENAI_BASE_URL` أو `OPENAI_API_KEY` أو `OPENAI_MODEL` أو `OPENAI_TEMPERATURE` مضبوطة، فستصبح القيم الافتراضية الأولية.

| | |
|---|---|
| البيانات | مجلد بيانات تطبيقات النظام، مثل `~/Library/Application Support/top.iroof.desktop` على macOS |
| روابط المشاركة | على نفس شبكة Wi‑Fi أو عبر الإنترنت: [فتح الروابط على أجهزة أخرى](../features/share-links#open-links-on-other-devices) |
| المواقع الأخرى | تُفتح الروابط مثل `t.me` في متصفحك |
| نافذة macOS | لا يوجد شريط عنوان للنظام: تمتد ترويسات التطبيق تحت أزرار الإشارة وتسحب النافذة |
| الاستيراد | يقرأ التطبيق التصدير بنفسه: **اختيار مجلد…** يفتح منتقي النظام، والمجلد أو `.zip` أو `.txt` المُسقط يُستورد من مكانه. لا يُرفع شيء، والأصل يبقى كما هو، وعلى APFS تُستنسخ الوسائط بدلًا من نسخها، فلا يستهلك حتى تصدير بحجم 13 GB مساحة إضافية تُذكر |

## ابنِه بنفسك {#build-it-yourself}

تحتاج إلى Rust ≥ 1.95 وNode.js، وعلى Linux [متطلبات Tauri المسبقة](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # المثبّتات في desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # الملف الثنائي فقط
```

على macOS، يُنشئ `npm run build` أيضًا ملف `.dmg`، ويتخطى نص AppleScript الخاص بـ Finder الذي يرتب نافذة DMG فقط (يفشل دون إذن *Automation*). اضبط `ROOFTOP_DMG_FINDER=1` للاحتفاظ بتخطيط Finder، كما في ملفات DMG المنشورة: الخلفية من `desktop/dmg/` مع سهم من التطبيق إلى *Applications*، والملفات المخفية للوحدة خارج الرؤية. بعد تحرير `desktop/dmg/background.svg`، شغّل `desktop/dmg/make-background.sh`.
