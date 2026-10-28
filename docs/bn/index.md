---
layout: home

hero:
  name: iRoof.top
  text: যাদের মিস করো তাদের সাথে কথা বলো
  tagline: Telegram বা WhatsApp চ্যাট এক্সপোর্ট করো, আর একটি LLM সেটি একজন মানুষের ধরনে এগিয়ে নিয়ে যায়, তাদের বাবল, স্টিকার, GIF, রিঅ্যাকশন আর কণ্ঠসহ। তোমার কম্পিউটারে, যেকোনো মডেল দিয়ে, চাইলে অফলাইনে।
  actions:
    - theme: brand
      text: শুরু করুন
      link: /bn/guide/getting-started
    - theme: alt
      text: অ্যাপ ডাউনলোড করুন
      link: /bn/guide/desktop
    - theme: alt
      text: এটি কীভাবে কাজ করে
      link: /bn/features/how-it-works

features:
  - title: তাদের ধরন, শুধু তাদের কথা নয়
    details: পুরো এক্সপোর্ট থেকে একটি স্টাইল প্রোফাইল, আর প্রতিটি বাবল, স্টিকার, GIF, উত্তর ও রিঅ্যাকশন মডেলের কাছে একটি টুল কলের আকারে আবার চালানো হয়।
    link: /bn/features/how-it-works
    linkText: এটি কীভাবে কাজ করে
  - title: ব্যক্তিগত, আর চাইলে অফলাইনেও
    details: চ্যাট তোমার ডেটা ফোল্ডারে থাকে। একটি লোকাল মডেল আর অফলাইন মোড চালু থাকলে, কম্পিউটার থেকে বাইরে যাওয়ার প্রতিটি অনুরোধ অ্যাপ আটকে দেয়।
    link: /bn/guide/offline
    linkText: অফলাইন ও গোপনীয়তা
  - title: বছরের পর বছরের চ্যাট, গিগাবাইটের মিডিয়া
    details: ১,২০,০০০-এরও বেশি বার্তা ও ৩০,০০০ ফাইল লাইভ অগ্রগতিসহ ইমপোর্ট হয়। মিডিয়া আপলোডের আগেই বার্তা থেকে আবার-ইমপোর্ট চিহ্নিত হয়।
    link: /bn/guide/export#large-exports
    linkText: বড় এক্সপোর্ট
  - title: ছবি, স্টিকার ও ভয়েস
    details: একটি মিডিয়া লাইব্রেরি, যা পাঠানো জিনিসের বর্ণনা দেয় এবং ভয়েস লিখিতরূপে রূপান্তর করে, তুমি যে ক্রম বেছে নাও সেই ক্রমে, আর যেকোনো সময় থামানো যায়।
    link: /bn/features/media
    linkText: ছবি ও ভয়েস
  - title: শেয়ার লিংক
    details: একজন বন্ধুকে /s/নাম-এ চরিত্রের সাথে কথা বলতে দাও, PIN ও সীমাসহ, তোমার Wi‑Fi-তে বা name.iroof.top-এ।
    link: /bn/features/share-links
    linkText: শেয়ার লিংক
  - title: Telegram থেকে উত্তর
    details: দর্শকদের বার্তা তোমার Telegram গ্রুপে যায়। তুমি নিজে উত্তর দাও, অথবা কাউন্টডাউনের পরে AI উত্তর দিক।
    link: /bn/features/telegram
    linkText: Telegram
  - title: যেকোনো মডেল, যেকোনো MCP সার্ভার
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… আর Streamable HTTP বা stdio-এর উপর MCP টুলস।
    link: /bn/features/mcp
    linkText: MCP টুলস
  - title: কিছুই লুকানো নেই
    details: মডেলকে পাঠানো সঠিক JSON এক ক্লিকেই দেখা যায়, সাথে এর আকার, ইতিহাসের বাজেট আর ব্যবহৃত টোকেন।
    link: /bn/guide/getting-started#what-s-in-the-window
    linkText: উইন্ডোতে কী আছে
  - title: একটি ছোট বাইনারি
    details: ভেতরে ওয়েব UI সহ একটি Rust সার্ভার, macOS, Windows ও Linux-এর ডেস্কটপ অ্যাপ, Homebrew আর একটি Docker ইমেজ।
    link: /bn/guide/getting-started
    linkText: ইনস্টল
---

<div class="home-demo">

![একটি চ্যাট একজন আসল মানুষের ধরনে চলতে থাকে, তারপর একজন বন্ধু ফোনে শেয়ার করা লিংক খোলে](/img/demo.svg)

</div>

## এক মিনিটে শুরু করো

::: code-group

```sh [ডেস্কটপ অ্যাপ]
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

```sh [সম্পূর্ণ অফলাইন]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

এরপর তিনটি ধাপ: Telegram Desktop বা WhatsApp থেকে **[চ্যাট এক্সপোর্ট করো](/bn/guide/export)**, ফোল্ডার, `.zip` বা `.txt` পেজে **ড্রপ করো**, আর **New chat** চাপো, কে AI-এর ভূমিকা নেবে তা বেছে নিতে: অন্য মানুষটি, নাকি তুমি নিজে।
হাতের কাছে নিজের চ্যাট নেই? কাল্পনিক চ্যাটগুলো দেখো: `rooftop --import ./examples/telegram`।
(অ্যাপের বোতামের লেখা ইংরেজিতে, অ্যাপের মতোই।)

## এটি কীভাবে কাজ করে

<div class="wide">

![Telegram বা WhatsApp-এর এক্সপোর্ট iRoof.top-এ যায়, একটি LLM উত্তর লেখে, আর চ্যাট চলতে থাকে](/how-it-works.svg)

</div>

এক্সপোর্টটি তোমার কম্পিউটারে একবার পড়া হয়। প্রতিটি উত্তরে মডেল একটি সিস্টেম প্রম্পট পায়, যাতে থাকে স্টাইল প্রোফাইল, তোমার নোট ও মিডিয়ার বর্ণনা, তারপর চ্যাটের সবচেয়ে সাম্প্রতিক যে অংশটি [ইতিহাসের বাজেটে](/bn/reference/configuration#settings-only) ধরে। পুরোনো অংশ একটি ছোট স্মৃতিতে গুটিয়ে দেওয়া হয়, আর চরিত্র এখনও সেগুলো খুঁজতে পারে। মডেল টুল কল (`send_message`, `send_sticker`, `react`…) দিয়ে উত্তর দেয়, যেগুলো বাবল, স্টিকার ও রিঅ্যাকশনে পরিণত হয়। [আরও →](/bn/features/how-it-works)

## তোমার চ্যাট কোথায় যায়

| | নেটওয়ার্ক |
|---|---|
| ইমপোর্ট, স্টাইল প্রোফাইল, সার্চ, স্টোরেজ | কিছুই নয়: সব কিছু তোমার কম্পিউটারে হয় |
| একটি উত্তর, মেমোরির সারাংশ | তোমার বেছে নেওয়া মডেল এন্ডপয়েন্ট, এর বাইরে কিছু নয় |
| মিডিয়ার বর্ণনা, ভয়েসের লিখিতরূপ | মিডিয়া মডেল, শুধু যখন তুমি **Describe** চাপো |
| ইন্টারনেটে শেয়ার লিংক, Telegram | শুধু চালু করলে; [অফলাইন মোড](/bn/guide/offline) এগুলো বন্ধ রাখে |

## প্রশ্নোত্তর

::: details কোন মডেল ব্যবহার করব?
OpenAI-সামঞ্জস্যপূর্ণ `/chat/completions` এন্ডপয়েন্টের পেছনের যেকোনো চ্যাট মডেল, যার **টুল কলিং** আছে। বড় মডেল কোনো ধরন আরও ভালো নকল করে। মিডিয়া লাইব্রেরিতে **Describe**-এর জন্য মিডিয়া মডেলকে ছবিও গ্রহণ করতে হবে (ভয়েস বার্তার জন্য অডিওও)। সেটিংসে **Test** সাধারণ ভাষায় জানায় কোথায় সমস্যা, যেমন প্রত্যাখ্যাত কী বা অজানা মডেল।
:::

::: details এর খরচ কত?
লোকাল মডেলে কোনো খরচ নেই। ক্লাউড মডেলে তুমি টোকেন হিসেবে তোমার প্রদানকারীকে টাকা দাও: একটি উত্তরের ইনপুট মোটামুটি একটি ইতিহাস বাজেটের সমান (ডিফল্টে ১,২০,০০০ অক্ষর ≈ ৩৪ হাজার টোকেন; প্রম্পট ক্যাশযোগ্য করে তৈরি, তাই প্রম্পট ক্যাশিং আছে এমন প্রদানকারী বেশিরভাগ অংশ ক্যাশড দরে নেয়), সাথে কয়েকটি ছোট টুল কল। প্রতি উত্তরে কম খরচ করতে সেটিংসে বাজেট কমাও।
:::

::: details আমার এক্সপোর্ট কি ছোট হতেই হবে?
না। ১,২০,০০০-এর বেশি বার্তা ও ১৩ GB মিডিয়ার এক্সপোর্টও ঠিকভাবে ইমপোর্ট হয়, ব্রাউজার থেকে বা `rooftop --import <ফোল্ডার>` দিয়ে। সার্চ ও ইতিহাসের বাজেট প্রতিটি উত্তরের প্রম্পটের আকার একই রাখে, চ্যাট যত লম্বাই হোক।
:::

::: details একজন বন্ধু কি চরিত্রের সাথে কথা বলতে পারে?
হ্যাঁ, একটি [শেয়ার লিংক](/bn/features/share-links) দিয়ে: তোমার Wi‑Fi-তে, বা ইন্টারনেটে `name.iroof.top`-এ, PIN ও বার্তার সীমাসহ। দর্শকরা শুধু চ্যাট দেখে: সেটিংস, নোট, প্রম্পট বা অন্য চ্যাট নয়।
:::

::: tip যত্ন সম্পর্কে একটি কথা
এটি যারা দূরে আছে তাদের কাছাকাছি থাকার জন্য। চরিত্র তার ভূমিকায় থাকে, তবে তুমি আন্তরিকভাবে জিজ্ঞেস করলে সে সৎভাবে বলে যে তুমি AI-এর সাথে কথা বলছ কি না, আর তোমাকে বিপন্ন মনে হলে যত্নের সাথে সাড়া দেয়।
:::
