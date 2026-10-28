# شروع کریں

## انسٹال {#install}

| | کمانڈ |
|---|---|
| **ڈیسک ٹاپ ایپ**، macOS | `brew install --cask irooftop/tap/irooftop` |
| **ڈیسک ٹاپ ایپ**، Windows | [انسٹالر (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) یا [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **ڈیسک ٹاپ ایپ**، Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage)، [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) یا [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **سرور**، macOS اور Linux | `brew install irooftop/tap/rooftop` (پھر `brew services start rooftop`) |
| **سرور**، Rust ≥ 1.88 والی کسی بھی جگہ | `cargo install rooftop` |
| **سرور**، کنٹینر | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

ڈیسک ٹاپ ایپ کو ٹرمینل کی ضرورت نہیں: دیکھیں [ڈیسک ٹاپ ایپ](./desktop)۔

## چلائیں

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # پیش‌فرض؛ کوئی بھی OpenAI سے مطابقت رکھنے والا API کام کرتا ہے
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # فنکشن کال سپورٹ کرنا لازمی ہے
rooftop                                               # http://127.0.0.1:8080
```

یہ متغیرات `rooftop` شروع کرنے کی جگہ کے ساتھ والی `.env` فائل میں بھی رکھے جا سکتے ہیں، یا بعد میں **Settings** میں مقرر کیے جا سکتے ہیں۔
**Settings** میں **Test** ایک چھوٹی درخواست بھیجتا ہے اور سادہ الفاظ میں بتاتا ہے کہ مسئلہ کیا ہے، مثلاً
"openrouter.ai rejected the API key (401)"۔

چاہتے ہیں کہ کچھ بھی آپ کے کمپیوٹر سے باہر نہ جائے؟ مقامی ماڈل استعمال کریں اور [آف لائن موڈ](./offline) دیکھیں۔

## آپ کی پہلی چیٹ

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. ایکسپورٹ  │ ──▶ │ 2. صفحے پر         │ ──▶ │ 3. نئی چیٹ: چنیں    │
 │    کریں      │     │    ڈالیں           │     │ AI کس کا کردار ادا کرے │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. Telegram Desktop یا WhatsApp سے [چیٹ ایکسپورٹ کریں](./export)۔
2. فولڈر، `.zip` یا WhatsApp `.txt` صفحے پر ڈالیں (یا `rooftop --import <folder>` سے شروع کریں)۔
3. **New chat** دبائیں اور کردار چنیں: دوسرا شخص، یا آپ خود ("ان کے انداز میں خود سے بات کریں")۔

::: tip اپنی چیٹس کے بغیر آزمائیں
ریپوزٹری میں [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples) میں دو فرضی ایکسپورٹ ہیں:
Jonas اور Priya Telegram پر لازانیا بناتے ہیں، Sofia اور Daniel WhatsApp پر ویک اینڈ گزارتے ہیں۔

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### ایکسپورٹ نہیں ہے؟ نوٹس سے شروع کریں

**New chat → From notes** کو صرف ان کا نام درکار ہے (آپ کا نام اختیاری ہے) اور ان کے بارے میں چند سطریں: وہ کون ہیں، آپ کیا شیئر کرتے ہیں، وہ کیسے لکھتے ہیں ("مجھے tesoro کہتی ہیں، مختصر اطالوی پیغامات، بہت سارے ❤️")۔ AI صرف انہی نوٹس سے ان کے انداز میں لکھتا ہے۔ تاریخ کے بغیر کوئی انداز پروفائل یا میڈیا لائبریری نہیں ہوتی، اس لیے نوٹس میں جتنا زیادہ بتایا جائے گا، نتیجہ اتنا ہی قریب ہوگا۔ آپ چیٹ میں کسی بھی وقت نوٹس میں ترمیم کر سکتے ہیں (✎)، اور چیٹ کو کسی بھی دوسری چیٹ کی طرح لنک سے شیئر کر سکتے ہیں۔ چیٹ حذف کرنے سے اس کی ہر چیز حذف ہو جاتی ہے۔

## ونڈو میں کیا ہے

| بٹن | کیا کرتا ہے |
|---|---|
| **Share** | دوستوں کے لیے [لنکس](../features/share-links) تاکہ وہ کردار سے بات کر سکیں |
| **Media library** | ہر اسٹیکر، GIF، تصویر اور صوتی پیغام، اور AI کو ان کے بارے میں جو معلوم ہے |
| **Notes** | وہ باتیں جو ایکسپورٹ میں نہیں ہیں۔ کردار انہیں پڑھتا ہے، وزیٹرز کبھی نہیں |
| **`{ }`** | ماڈل کو بھیجا گیا بالکل درست JSON، اور استعمال ہونے والے ٹوکن |
| **Rewrite** | کردار کا آخری جواب ہٹا کر دوبارہ لکھواتا ہے |
| **Let them write first** | کردار گفتگو شروع کرتا ہے |
