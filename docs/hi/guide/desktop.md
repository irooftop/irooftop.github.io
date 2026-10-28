# डेस्कटॉप ऐप

डेस्कटॉप ऐप ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) वही सर्वर चलाता है जो `rooftop serve` चलाता है, एक यादृच्छिक `127.0.0.1` पोर्ट पर, और उसे एक नेटिव विंडो में दिखाता है।

| प्लेटफ़ॉर्म | इंस्टॉल |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, या [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) या [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) के लिए `.dmg` |
| Windows 10 और 11 | [इंस्टॉलर (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) या [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (कोई भी डिस्ट्रीब्यूशन), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu), या [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

डाउनलोड लिंक हमेशा नवीनतम रिलीज़ की ओर जाते हैं।

::: warning बिल्ड अभी साइन नहीं हुए हैं
macOS पर ऐप एक बार खोलें, फिर **सिस्टम सेटिंग्स → गोपनीयता और सुरक्षा → फिर भी खोलें**। Windows पर SmartScreen में **More info → Run anyway** चुनें। एनिमेशन के साथ चरण-दर-चरण: [बिना साइन किया ऐप खोलना](./unsigned-apps)।
:::

## पहली बार चलाना

ऐप आपका शेल या `.env` नहीं पढ़ता, इसलिए वह आपका स्वागत **मॉडल कनेक्ट करें** से करता है: **सेटिंग्स** खोलें, एंडपॉइंट, कुंजी और मॉडल डालें, फिर **टेस्ट** दबाएँ। अगर `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`, या `OPENAI_TEMPERATURE` सेट हैं, तो वे शुरुआती डिफ़ॉल्ट बन जाते हैं।

| | |
|---|---|
| डेटा | सिस्टम का ऐप-डेटा फ़ोल्डर, उदाहरण के लिए macOS पर `~/Library/Application Support/top.iroof.desktop` |
| शेयर लिंक | उसी Wi‑Fi पर या इंटरनेट से: [दूसरे डिवाइस पर लिंक खोलना](../features/share-links#open-links-on-other-devices) |
| अन्य साइटें | `t.me` जैसे लिंक आपके ब्राउज़र में खुलते हैं |
| macOS विंडो | सिस्टम टाइटल बार नहीं: ऐप के हेडर ट्रैफ़िक लाइट्स के नीचे तक जाते हैं और विंडो को खींचते हैं |
| इम्पोर्ट | ऐप एक्सपोर्ट को खुद पढ़ता है: **Choose folder…** सिस्टम पिकर खोलता है, और छोड़ा गया फ़ोल्डर, `.zip`, या `.txt` जहाँ है वहीं से इम्पोर्ट होता है। कुछ भी अपलोड नहीं होता, मूल फ़ाइल अछूती रहती है, और APFS पर मीडिया कॉपी होने के बजाय क्लोन होता है, इसलिए 13 GB का एक्सपोर्ट भी लगभग कोई अतिरिक्त जगह नहीं लेता |

## खुद बनाएँ {#build-it-yourself}

आपको Rust ≥ 1.95 और Node.js चाहिए, और Linux पर [Tauri की पूर्वापेक्षाएँ](https://v3.tauri.app/start/prerequisites/)।

```sh
cd desktop
npm ci
npm run build                          # इंस्टॉलर desktop/target/release/bundle/ में
npm run build -- --debug --no-bundle   # केवल बाइनरी
```

macOS पर `npm run build` `.dmg` भी बनाता है, और Finder का AppleScript छोड़ देता है जो केवल DMG विंडो को व्यवस्थित करता है (*Automation* अनुमति के बिना यह विफल होता है)। Finder का लेआउट रखने के लिए `ROOFTOP_DMG_FINDER=1` सेट करें, जैसा प्रकाशित DMG में होता है: `desktop/dmg/` की पृष्ठभूमि पर ऐप से *Applications* तक एक तीर, और वॉल्यूम की छिपी फ़ाइलें नज़रों से दूर। `desktop/dmg/background.svg` संपादित करने के बाद `desktop/dmg/make-background.sh` चलाएँ।
