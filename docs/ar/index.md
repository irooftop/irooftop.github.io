---
layout: home

hero:
  name: iRoof.top
  text: تحدّث مع الأشخاص الذين تشتاق إليهم
  tagline: صدّر محادثة من تيليغرام أو واتساب، ويكملها نموذج لغوي بأسلوب شخص واحد، بفقاعاته وملصقاته وصوره المتحركة وتفاعلاته وصوته. على حاسوبك، مع أي نموذج، ودون اتصال إن شئت.
  actions:
    - theme: brand
      text: البدء
      link: /guide/getting-started
    - theme: alt
      text: تنزيل التطبيق
      link: /guide/desktop
    - theme: alt
      text: كيف يعمل
      link: /features/how-it-works

features:
  - title: أسلوبه، لا كلماته فقط
    details: ملف أسلوب من التصدير كله، وكل فقاعة وملصق وصورة متحركة وردّ وتفاعل يُعاد تشغيله أمام النموذج كاستدعاء أداة.
    link: /features/how-it-works
    linkText: كيف يعمل
  - title: خاص، ويعمل دون اتصال إن شئت
    details: تبقى المحادثات في مجلد بياناتك. مع نموذج محلي وتفعيل وضع عدم الاتصال، يرفض التطبيق كل طلب يغادر حاسوبك.
    link: /guide/offline
    linkText: دون اتصال والخصوصية
  - title: سنوات من المحادثات، وغيغابايتات من الوسائط
    details: استيراد أكثر من 120,000 رسالة و30,000 ملف مع تقدّم مباشر. يُكتشف الاستيراد المكرر من الرسائل قبل رفع أي وسائط.
    link: /guide/export#large-exports
    linkText: التصديرات الكبيرة
  - title: الصور والملصقات والصوت
    details: مكتبة وسائط تصف ما أُرسل وتحوّل الصوت إلى نص، بالترتيب الذي تختاره، ويمكن إيقافها في أي وقت.
    link: /features/media
    linkText: الصور والصوت
  - title: روابط المشاركة
    details: دع صديقاً يتحدث مع الشخصية على /s/الاسم، برقم PIN وحدود، على شبكة Wi‑Fi الخاصة بك أو على name.iroof.top.
    link: /features/share-links
    linkText: روابط المشاركة
  - title: الرد من تيليغرام
    details: تصل رسائل الزوار إلى مجموعة تيليغرام الخاصة بك. ردّ بنفسك، أو دع الذكاء الاصطناعي يجيب بعد عدّ تنازلي.
    link: /features/telegram
    linkText: تيليغرام
  - title: أي نموذج، وأي خادم MCP
    details: OpenAI وOpenRouter وGemini وOllama وLM Studio وllama.cpp… وأدوات MCP عبر Streamable HTTP أو stdio.
    link: /features/mcp
    linkText: أدوات MCP
  - title: لا شيء مخفي
    details: ملف JSON الدقيق المرسل إلى النموذج على بُعد نقرة، مع حجمه وميزانية السجل والرموز المستخدمة.
    link: /guide/getting-started#what-s-in-the-window
    linkText: ما في النافذة
  - title: ملف تنفيذي صغير واحد
    details: خادم Rust مع واجهة الويب مدمجة، وتطبيقات سطح مكتب لـ macOS وWindows وLinux، وHomebrew وصورة Docker.
    link: /guide/getting-started
    linkText: التثبيت
---

<div class="home-demo">

![تستمر محادثة بأسلوب شخص حقيقي، ثم يفتح صديق الرابط المشترك على الهاتف](/img/demo.svg)

</div>

## ابدأ في دقيقة

::: code-group

```sh [تطبيق سطح المكتب]
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

```sh [دون اتصال تماماً]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

ثم ثلاث خطوات: **[صدّر محادثة](/ar/guide/export)** من Telegram Desktop أو واتساب، و**أفلت** المجلد أو ملف `.zip` أو `.txt` على الصفحة، واضغط **New chat** لتختار من يؤدي دور الذكاء الاصطناعي: الشخص الآخر، أو أنت.
ليست لديك محادثة؟ جرّب المحادثات الخيالية: `rooftop --import ./examples/telegram`.
(أزرار التطبيق بالإنجليزية، كالتطبيق نفسه.)

## كيف يعمل

<div class="wide">

![يدخل تصدير من تيليغرام أو واتساب إلى iRoof.top، ويكتب نموذج لغوي الردود، وتستمر المحادثة](/how-it-works.svg)

</div>

تُقرأ الملفات المصدّرة مرة واحدة، على حاسوبك. في كل ردّ يتلقى النموذج موجّه نظام يحتوي على ملف الأسلوب وملاحظاتك وأوصاف الوسائط، ثم الجزء الأحدث من المحادثة الذي يتسع في [ميزانية السجل](/ar/reference/configuration#settings-only). تُطوى الأجزاء القديمة في ملخص ذاكرة قصير، ويستطيع الشخصية البحث فيها. ويردّ النموذج باستدعاءات أدوات (`send_message`، `send_sticker`، `react`…)، فتتحول إلى فقاعات وملصقات وتفاعلات. [المزيد ←](/ar/features/how-it-works)

## إلى أين تذهب محادثتك

| | الشبكة |
|---|---|
| الاستيراد وملف الأسلوب والبحث والتخزين | لا شيء: كل ذلك يحدث على حاسوبك |
| ردّ واحد، وملخص الذاكرة | نقطة النهاية للنموذج التي تختارها، ولا شيء غيرها |
| وصف الوسائط، تحويل الصوت إلى نص | نموذج الوسائط، فقط حين تضغط **Describe** |
| روابط المشاركة عبر الإنترنت، وتيليغرام | فقط إن فعّلتها؛ و[وضع عدم الاتصال](/ar/guide/offline) يوقفها |

## أسئلة

::: details أي نموذج أستخدم؟
أي نموذج دردشة يدعم **استدعاء الأدوات** خلف نقطة نهاية `/chat/completions` متوافقة مع OpenAI. النماذج الأكبر تقلّد الأسلوب بشكل أفضل. ولميزة **Describe** في مكتبة الوسائط يجب أن يقبل نموذج الوسائط الصور أيضاً (والصوت لرسائل الصوت). يخبرك **Test** في الإعدادات بكلمات واضحة بما هو خطأ، مثل مفتاح مرفوض أو نموذج غير معروف.
:::

::: details كم تكلّف؟
لا شيء مع نموذج محلي. مع نموذج سحابي تدفع لمزوّدك حسب الرمز: الرد الواحد يكلّف تقريباً بقدر ميزانية سجل واحدة من المدخلات (120,000 حرف ≈ 34 ألف رمز افتراضياً؛ وقد صُمم الموجّه ليكون قابلاً للتخزين المؤقت، فالمزوّدون الذين يدعمون التخزين المؤقت للموجّهات يحاسبون معظمه بالسعر المخزَّن) إضافة إلى بضعة استدعاءات قصيرة للأدوات. خفّض الميزانية في الإعدادات لتدفع أقل لكل رد.
:::

::: details هل يجب أن يكون التصدير صغيراً؟
لا. تُستورد التصديرات التي تضم أكثر من 120,000 رسالة و13 غيغابايت من الوسائط بشكل سليم، من المتصفح أو باستخدام `rooftop --import <مجلد>`. يحافظ البحث وميزانية السجل على حجم الموجّه نفسه في كل رد، مهما طالت المحادثة.
:::

::: details هل يستطيع صديق التحدث مع الشخصية؟
نعم، عبر [رابط مشاركة](/ar/features/share-links): على شبكة Wi‑Fi الخاصة بك، أو عبر الإنترنت على `name.iroof.top`، مع رقم PIN وحدود للرسائل. يرى الزوّار المحادثة فقط: لا إعدادات ولا ملاحظات ولا موجّهات ولا محادثات أخرى.
:::

::: tip ملاحظة حول الرعاية
هذا التطبيق لتبقى قريباً من أشخاص بعيدين. تبقى الشخصية في دورها، لكنها تجيب بصدق إن سألتها بجدية إن كنت تتحدث مع ذكاء اصطناعي، وتردّ بعناية إن بدا أنك في ضيق.
:::
