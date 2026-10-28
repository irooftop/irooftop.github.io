---
layout: home

hero:
  name: iRoof.top
  text: उन लोगों से बात करें जिनकी आपको याद आती है
  tagline: Telegram या WhatsApp चैट एक्सपोर्ट करें। एक LLM उसे एक व्यक्ति के अंदाज़ में आगे बढ़ाता है, उनके बबल, स्टिकर, GIF, रिएक्शन और आवाज़ के साथ। आपके कंप्यूटर पर, किसी भी मॉडल के साथ, चाहें तो ऑफ़लाइन।
  actions:
    - theme: brand
      text: शुरू करें
      link: /guide/getting-started
    - theme: alt
      text: ऐप डाउनलोड करें
      link: /guide/desktop
    - theme: alt
      text: यह कैसे काम करता है
      link: /features/how-it-works

features:
  - title: उनका अंदाज़, सिर्फ़ उनके शब्द नहीं
    details: पूरे एक्सपोर्ट से एक स्टाइल प्रोफ़ाइल, और हर बबल, स्टिकर, GIF, जवाब और रिएक्शन मॉडल को एक टूल कॉल के रूप में दोहराया जाता है।
    link: /features/how-it-works
    linkText: यह कैसे काम करता है
  - title: निजी, और चाहें तो ऑफ़लाइन
    details: चैट आपके डेटा फ़ोल्डर में रहती हैं। लोकल मॉडल और ऑफ़लाइन मोड चालू होने पर, ऐप हर उस अनुरोध को रोक देता है जो आपके कंप्यूटर से बाहर जाएगा।
    link: /guide/offline
    linkText: ऑफ़लाइन और गोपनीयता
  - title: सालों की चैट, गीगाबाइट्स का मीडिया
    details: 1,20,000 से अधिक संदेश और 30,000 फ़ाइलें लाइव प्रगति के साथ इंपोर्ट होती हैं। दोबारा इंपोर्ट को मीडिया अपलोड होने से पहले संदेशों से पहचान लिया जाता है।
    link: /guide/export#large-exports
    linkText: बड़े एक्सपोर्ट
  - title: फ़ोटो, स्टिकर और आवाज़
    details: एक मीडिया लाइब्रेरी जो भेजी गई चीज़ों का वर्णन करती है और आवाज़ को लिखित रूप में बदलती है, उस क्रम में जो आप चुनें, और कभी भी रोकी जा सकती है।
    link: /features/media
    linkText: फ़ोटो और आवाज़
  - title: शेयर लिंक
    details: किसी दोस्त को /s/नाम पर किरदार से बात करने दें, PIN और सीमाओं के साथ, आपके Wi‑Fi पर या name.iroof.top पर।
    link: /features/share-links
    linkText: शेयर लिंक
  - title: Telegram से जवाब
    details: विज़िटर के संदेश आपके Telegram ग्रुप में आते हैं। आप खुद जवाब दें, या उलटी गिनती के बाद AI को जवाब देने दें।
    link: /features/telegram
    linkText: Telegram
  - title: कोई भी मॉडल, कोई भी MCP सर्वर
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… और Streamable HTTP या stdio पर MCP टूल्स।
    link: /features/mcp
    linkText: MCP टूल्स
  - title: कुछ भी छिपा नहीं
    details: मॉडल को भेजा गया सटीक JSON एक क्लिक दूर है, उसके आकार, इतिहास बजट और इस्तेमाल हुए टोकन के साथ।
    link: /guide/getting-started#what-s-in-the-window
    linkText: विंडो में क्या है
  - title: एक छोटी बाइनरी
    details: वेब UI के साथ एक Rust सर्वर, macOS, Windows और Linux के लिए डेस्कटॉप ऐप, Homebrew और एक Docker इमेज।
    link: /guide/getting-started
    linkText: इंस्टॉल करें
---

<div class="home-demo">

![एक चैट असली इंसान के अंदाज़ में चलती है, फिर एक दोस्त फ़ोन पर साझा किया गया लिंक खोलता है](/img/demo.svg)

</div>

## एक मिनट में शुरू करें

::: code-group

```sh [डेस्कटॉप ऐप]
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

```sh [पूरी तरह ऑफ़लाइन]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

फिर तीन कदम: Telegram Desktop या WhatsApp से **[चैट एक्सपोर्ट करें](/hi/guide/export)**, फ़ोल्डर, `.zip` या `.txt` को पेज पर **ड्रॉप** करें, और **New chat** दबाकर चुनें कि AI किसकी भूमिका निभाए: दूसरा व्यक्ति, या आप खुद।
अपनी चैट नहीं है? काल्पनिक चैट आज़माएँ: `rooftop --import ./examples/telegram`।
(ऐप के बटन अंग्रेज़ी में हैं, जैसे ऐप खुद।)

## यह कैसे काम करता है

<div class="wide">

![Telegram या WhatsApp का एक्सपोर्ट iRoof.top में जाता है, एक LLM जवाब लिखता है, और चैट आगे बढ़ती है](/how-it-works.svg)

</div>

एक्सपोर्ट को आपके कंप्यूटर पर एक बार पढ़ा जाता है। हर जवाब में मॉडल को एक सिस्टम प्रॉम्प्ट मिलता है, जिसमें स्टाइल प्रोफ़ाइल, आपके नोट्स और मीडिया के विवरण होते हैं, फिर चैट का सबसे हाल का वह हिस्सा जो [इतिहास बजट](/hi/reference/configuration#settings-only) में आ जाए। पुराने हिस्से एक छोटी याददाश्त में समेट दिए जाते हैं, और किरदार अब भी उन्हें खोज सकता है। मॉडल टूल कॉल (`send_message`, `send_sticker`, `react`…) से जवाब देता है, जो बबल, स्टिकर और रिएक्शन बन जाते हैं। [और जानें →](/hi/features/how-it-works)

## आपकी चैट कहाँ जाती है

| | नेटवर्क |
|---|---|
| इंपोर्ट, स्टाइल प्रोफ़ाइल, खोज, स्टोरेज | कोई नहीं: सब कुछ आपके कंप्यूटर पर होता है |
| एक जवाब, मेमोरी सारांश | आपका चुना हुआ मॉडल एंडपॉइंट, बस |
| मीडिया का वर्णन, आवाज़ का लिखित रूप | मीडिया मॉडल, केवल जब आप **Describe** दबाते हैं |
| इंटरनेट पर शेयर लिंक, Telegram | केवल अगर आप इन्हें चालू करें; [ऑफ़लाइन मोड](/hi/guide/offline) इन्हें बंद कर देता है |

## सवाल

::: details कौन-सा मॉडल इस्तेमाल करूँ?
OpenAI-compatible `/chat/completions` एंडपॉइंट के पीछे **टूल कॉलिंग** वाला कोई भी चैट मॉडल। बड़े मॉडल किसी अंदाज़ की नकल बेहतर करते हैं। मीडिया लाइब्रेरी में **Describe** के लिए मीडिया मॉडल को इमेज भी स्वीकार करने होंगे (और वॉइस संदेशों के लिए ऑडियो भी)। सेटिंग्स में **Test** साफ़ भाषा में बताता है कि क्या गड़बड़ है, जैसे अस्वीकृत की या अज्ञात मॉडल।
:::

::: details इसकी लागत कितनी है?
लोकल मॉडल के साथ कुछ नहीं। क्लाउड मॉडल के साथ आप अपने प्रदाता को प्रति टोकन भुगतान करते हैं: एक जवाब का इनपुट लगभग एक इतिहास बजट के बराबर होता है (डिफ़ॉल्ट रूप से 1,20,000 अक्षर ≈ 34k टोकन; प्रॉम्प्ट कैश होने लायक बनाया गया है, इसलिए प्रॉम्प्ट कैशिंग वाले प्रदाता ज़्यादातर हिस्सा कैश्ड दर पर लेते हैं), साथ में कुछ छोटी टूल कॉल। कम भुगतान के लिए सेटिंग्स में बजट घटाएँ।
:::

::: details क्या मेरा एक्सपोर्ट छोटा होना ज़रूरी है?
नहीं। 1,20,000 से अधिक संदेशों और 13 GB मीडिया वाले एक्सपोर्ट भी ठीक से इंपोर्ट होते हैं, ब्राउज़र से या `rooftop --import <फ़ोल्डर>` से। खोज और इतिहास बजट हर जवाब के प्रॉम्प्ट का आकार एक-सा रखते हैं, चैट चाहे कितनी भी लंबी हो।
:::

::: details क्या कोई दोस्त किरदार से बात कर सकता है?
हाँ, एक [शेयर लिंक](/hi/features/share-links) से: आपके Wi‑Fi पर, या इंटरनेट पर `name.iroof.top` पर, PIN और संदेश सीमाओं के साथ। विज़िटर केवल चैट देखते हैं: सेटिंग्स, नोट्स, प्रॉम्प्ट या दूसरी चैट नहीं।
:::

::: tip देखभाल के बारे में
यह उन लोगों के करीब रहने के लिए है जो दूर हैं। किरदार अपने रोल में रहता है, लेकिन अगर आप सच्चे मन से पूछें कि क्या आप AI से बात कर रहे हैं, तो वह ईमानदारी से जवाब देता है, और अगर आप परेशान लगते हैं तो देखभाल के साथ जवाब देता है।
:::
