---
layout: home

hero:
  name: iRoof.top
  text: ان لوگوں سے بات کریں جنہیں آپ یاد کرتے ہیں
  tagline: Telegram یا WhatsApp کی چیٹ ایکسپورٹ کریں، اور ایک LLM اسے ایک شخص کے انداز میں آگے بڑھاتا ہے، اُس کے بلبلوں، اسٹیکرز، GIFs، ری ایکشنز اور آواز کے ساتھ۔ آپ کے کمپیوٹر پر، کسی بھی ماڈل کے ساتھ، اور چاہیں تو آف لائن۔
  actions:
    - theme: brand
      text: شروع کریں
      link: /guide/getting-started
    - theme: alt
      text: ایپ ڈاؤن لوڈ کریں
      link: /guide/desktop
    - theme: alt
      text: یہ کیسے کام کرتا ہے
      link: /features/how-it-works

features:
  - title: ان کا انداز، صرف ان کے الفاظ نہیں
    details: پورے ایکسپورٹ سے ایک اسٹائل پروفائل، اور ہر بلبلہ، اسٹیکر، GIF، جواب اور ری ایکشن ماڈل کو ایک ٹول کال کے طور پر دوبارہ چلایا جاتا ہے۔
    link: /features/how-it-works
    linkText: یہ کیسے کام کرتا ہے
  - title: نجی، اور چاہیں تو آف لائن بھی
    details: چیٹس آپ کے ڈیٹا فولڈر میں رہتی ہیں۔ مقامی ماڈل اور آف لائن موڈ آن ہونے پر، ایپ ہر ایسی درخواست کو روک دیتی ہے جو آپ کے کمپیوٹر سے باہر جاتی۔
    link: /guide/offline
    linkText: آف لائن اور رازداری
  - title: برسوں کی چیٹ، گیگابائٹس کا میڈیا
    details: 1,20,000 سے زیادہ پیغامات اور 30,000 فائلیں لائیو پیش رفت کے ساتھ امپورٹ ہوتی ہیں۔ میڈیا اپلوڈ ہونے سے پہلے پیغامات سے دوبارہ امپورٹ پہچان لیا جاتا ہے۔
    link: /guide/export#large-exports
    linkText: بڑے ایکسپورٹس
  - title: تصاویر، اسٹیکرز اور آواز
    details: ایک میڈیا لائبریری جو بھیجی گئی چیزوں کی تفصیل دیتی ہے اور آواز کو تحریر میں بدلتی ہے، اُس ترتیب سے جو آپ چنیں، اور کسی بھی وقت روکی جا سکتی ہے۔
    link: /features/media
    linkText: تصاویر اور آواز
  - title: شیئر لنکس
    details: کسی دوست کو /s/نام پر کردار سے بات کرنے دیں، PIN اور حدود کے ساتھ، آپ کے Wi‑Fi پر یا name.iroof.top پر۔
    link: /features/share-links
    linkText: شیئر لنکس
  - title: Telegram سے جواب
    details: وزیٹرز کے پیغامات آپ کے Telegram گروپ میں آتے ہیں۔ آپ خود جواب دیں، یا کاؤنٹ ڈاؤن کے بعد AI کو جواب دینے دیں۔
    link: /features/telegram
    linkText: Telegram
  - title: کوئی بھی ماڈل، کوئی بھی MCP سرور
    details: OpenAI، OpenRouter، Gemini، Ollama، LM Studio، llama.cpp… اور Streamable HTTP یا stdio پر MCP ٹولز۔
    link: /features/mcp
    linkText: MCP ٹولز
  - title: کچھ بھی چھپا ہوا نہیں
    details: ماڈل کو بھیجا گیا درست JSON ایک کلک دور ہے، اس کے سائز، تاریخ کے بجٹ اور استعمال شدہ ٹوکنز کے ساتھ۔
    link: /guide/getting-started#what-s-in-the-window
    linkText: ونڈو میں کیا ہے
  - title: ایک چھوٹی بائنری
    details: ویب UI کے ساتھ ایک Rust سرور، macOS، Windows اور Linux کے لیے ڈیسک ٹاپ ایپس، Homebrew اور ایک Docker امیج۔
    link: /guide/getting-started
    linkText: انسٹال کریں
---

<div class="home-demo">

![ایک چیٹ حقیقی شخص کے انداز میں چلتی رہتی ہے، پھر ایک دوست فون پر شیئر کیا گیا لنک کھولتا ہے](/img/demo.svg)

</div>

## ایک منٹ میں شروع کریں

::: code-group

```sh [ڈیسک ٹاپ ایپ]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [مکمل آف لائن]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

پھر تین مراحل: Telegram Desktop یا WhatsApp سے **[چیٹ ایکسپورٹ کریں](/ur/guide/export)**، فولڈر، `.zip` یا `.txt` کو صفحے پر **ڈراپ** کریں، اور **New chat** دبائیں تاکہ منتخب کر سکیں کہ AI کون بنے: دوسرا شخص، یا آپ خود۔
آپ کے پاس اپنی چیٹ نہیں؟ فرضی چیٹس آزمائیں: `rooftop --import ./examples/telegram`۔
(ایپ کے بٹنوں کے نام انگریزی میں ہیں، جیسے خود ایپ۔)

## یہ کیسے کام کرتا ہے

<div class="wide">

![Telegram یا WhatsApp کا ایکسپورٹ iRoof.top میں جاتا ہے، ایک LLM جواب لکھتا ہے، اور چیٹ آگے بڑھتی ہے](/how-it-works.svg)

</div>

ایکسپورٹ آپ کے کمپیوٹر پر ایک بار پڑھا جاتا ہے۔ ہر جواب کے ساتھ ماڈل کو ایک سسٹم پرامپٹ ملتا ہے، جس میں اسٹائل پروفائل، آپ کے نوٹس اور میڈیا کی تفصیلات ہوتی ہیں، پھر چیٹ کا وہ تازہ ترین حصہ جو [تاریخ کے بجٹ](/ur/reference/configuration#settings-only) میں سما جائے۔ پرانے حصے ایک مختصر یادداشت میں سمیٹ دیے جاتے ہیں، اور کردار اب بھی انہیں تلاش کر سکتا ہے۔ ماڈل ٹول کالز (`send_message`، `send_sticker`، `react`…) سے جواب دیتا ہے، جو بلبلوں، اسٹیکرز اور ری ایکشنز میں بدل جاتے ہیں۔ [مزید →](/ur/features/how-it-works)

## آپ کی چیٹ کہاں جاتی ہے

| | نیٹ ورک |
|---|---|
| امپورٹ، اسٹائل پروفائل، تلاش، اسٹوریج | کچھ نہیں: سب کچھ آپ کے کمپیوٹر پر ہوتا ہے |
| ایک جواب، میموری کا خلاصہ | آپ کا منتخب کردہ ماڈل اینڈ پوائنٹ، اور بس |
| میڈیا کی تفصیل، آواز کی تحریر | میڈیا ماڈل، صرف جب آپ **Describe** دبائیں |
| انٹرنیٹ پر شیئر لنکس، Telegram | صرف اگر آپ انہیں آن کریں؛ [آف لائن موڈ](/ur/guide/offline) انہیں بند رکھتا ہے |

## سوالات

::: details کون سا ماڈل استعمال کروں؟
OpenAI سے مطابقت رکھنے والے `/chat/completions` اینڈ پوائنٹ کے پیچھے **ٹول کالنگ** والا کوئی بھی چیٹ ماڈل۔ بڑے ماڈل کسی انداز کی بہتر نقل کرتے ہیں۔ میڈیا لائبریری میں **Describe** کے لیے میڈیا ماڈل کو تصاویر بھی قبول کرنی ہوں گی (اور وائس پیغامات کے لیے آڈیو بھی)۔ ترتیبات میں **Test** سادہ الفاظ میں بتاتا ہے کہ کیا خرابی ہے، جیسے مسترد شدہ کلید یا نامعلوم ماڈل۔
:::

::: details اس پر کتنا خرچ آتا ہے؟
مقامی ماڈل کے ساتھ کچھ نہیں۔ کلاؤڈ ماڈل کے ساتھ آپ ٹوکن کے حساب سے اپنے فراہم کنندہ کو ادائیگی کرتے ہیں: ایک جواب کا ان پٹ تقریباً ایک تاریخ بجٹ کے برابر ہوتا ہے (ڈیفالٹ کے طور پر 1,20,000 حروف ≈ 34 ہزار ٹوکنز؛ پرامپٹ کیشے کے قابل بنایا گیا ہے، اس لیے پرامپٹ کیشنگ والے فراہم کنندہ زیادہ تر حصہ کیشڈ ریٹ پر لیتے ہیں)، ساتھ ہی چند مختصر ٹول کالز۔ فی جواب کم ادائیگی کے لیے ترتیبات میں بجٹ کم کریں۔
:::

::: details کیا میرا ایکسپورٹ چھوٹا ہونا ضروری ہے؟
نہیں۔ 1,20,000 سے زیادہ پیغامات اور 13 GB میڈیا والے ایکسپورٹس بھی ٹھیک امپورٹ ہوتے ہیں، براؤزر سے یا `rooftop --import <فولڈر>` کے ساتھ۔ تلاش اور تاریخ کا بجٹ ہر جواب کے پرامپٹ کا سائز ایک جیسا رکھتے ہیں، چیٹ چاہے جتنی بھی لمبی ہو۔
:::

::: details کیا کوئی دوست کردار سے بات کر سکتا ہے؟
ہاں، ایک [شیئر لنک](/ur/features/share-links) کے ذریعے: آپ کے Wi‑Fi پر، یا انٹرنیٹ پر `name.iroof.top` پر، PIN اور پیغامات کی حدود کے ساتھ۔ وزیٹرز صرف چیٹ دیکھتے ہیں: ترتیبات، نوٹس، پرامپٹس یا دوسری چیٹس نہیں۔
:::

::: tip دیکھ بھال کے بارے میں
یہ ان لوگوں کے قریب رہنے کے لیے ہے جو دور ہیں۔ کردار اپنے کردار میں رہتا ہے، لیکن اگر آپ خلوص سے پوچھیں کہ کیا آپ AI سے بات کر رہے ہیں، تو وہ دیانت داری سے جواب دیتا ہے، اور اگر آپ پریشان لگیں تو احتیاط سے جواب دیتا ہے۔
:::
