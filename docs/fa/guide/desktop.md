# برنامه‌ی دسکتاپ

برنامه‌ی دسکتاپ ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) همان سروری را اجرا می‌کند که `rooftop serve` اجرا می‌کند، روی یک درگاه تصادفی `127.0.0.1`، و آن را در یک پنجره‌ی بومی نشان می‌دهد.

| پلتفرم | نصب |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`، یا فایل `.dmg` برای [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) یا [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 و 11 | [نصب‌کننده (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) یا [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (هر توزیعی)، [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian، Ubuntu)، یا [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

پیوندهای دانلود همیشه به آخرین نسخه اشاره می‌کنند.

::: warning بسته‌ها هنوز امضا نشده‌اند
در macOS، برنامه را یک بار باز کنید، سپس **System Settings ← Privacy & Security ← Open Anyway**. در Windows، در SmartScreen گزینه‌ی **More info ← Run anyway** را انتخاب کنید. راهنمای گام‌به‌گام همراه با انیمیشن: [باز کردن یک برنامه‌ی امضانشده](./unsigned-apps).
:::

## اولین اجرا

برنامه پوسته یا فایل `.env` شما را نمی‌خواند، پس با صفحه‌ی **اتصال یک مدل** از شما استقبال می‌کند: **تنظیمات** را باز کنید، نقطه‌ی پایانی، کلید و مدل را وارد کنید، و **آزمایش** را بزنید. اگر `OPENAI_BASE_URL`، `OPENAI_API_KEY`، `OPENAI_MODEL` یا `OPENAI_TEMPERATURE` تنظیم شده باشند، مقادیر اولیه‌ی پیش‌فرض می‌شوند.

| | |
|---|---|
| داده | پوشه‌ی داده‌ی برنامه‌های سیستم، برای مثال `~/Library/Application Support/top.iroof.desktop` در macOS |
| پیوندهای اشتراک‌گذاری | در همان Wi‑Fi یا از طریق اینترنت: [باز کردن پیوندها روی دستگاه‌های دیگر](../features/share-links#open-links-on-other-devices) |
| سایت‌های دیگر | پیوندهایی مثل `t.me` در مرورگر شما باز می‌شوند |
| پنجره‌ی macOS | نوار عنوان سیستم ندارد: سرصفحه‌های برنامه زیر دکمه‌های چراغ ادامه می‌یابند و پنجره را می‌کشند |
| وارد کردن | برنامه خودش صادرات را می‌خواند: **انتخاب پوشه…** گزینش‌گر سیستم را باز می‌کند، و پوشه، `.zip` یا `.txt` رهاشده از همان جایی که هست وارد می‌شود. چیزی آپلود نمی‌شود، اصل فایل دست‌نخورده می‌ماند، و روی APFS رسانه‌ها کلون می‌شوند نه کپی، پس حتی یک صادرات ۱۳ گیگابایتی فضای اضافی چندانی مصرف نمی‌کند |

## خودتان بسازید {#build-it-yourself}

به Rust نسخه‌ی ≥ 1.95 و Node.js نیاز دارید، و در Linux [پیش‌نیازهای Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # نصب‌کننده‌ها در desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # فقط فایل اجرایی
```

در macOS، `npm run build` فایل `.dmg` را هم می‌سازد و اسکریپت AppleScript مربوط به Finder را که فقط پنجره‌ی DMG را مرتب می‌کند رد می‌کند (بدون مجوز *Automation* شکست می‌خورد). برای حفظ چیدمان Finder، مانند DMGهای منتشرشده، `ROOFTOP_DMG_FINDER=1` را تنظیم کنید: پس‌زمینه از `desktop/dmg/` با یک فلش از برنامه به *Applications*، و فایل‌های پنهان حجم از دید خارج می‌شوند. پس از ویرایش `desktop/dmg/background.svg`، `desktop/dmg/make-background.sh` را اجرا کنید.
