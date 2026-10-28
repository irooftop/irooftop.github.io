# विकास

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| टेस्ट कवर करते हैं | |
|---|---|
| पार्सर और कन्वर्ज़न | `examples/telegram` और `examples/whatsapp` के विरुद्ध |
| शेयर लिंक | विज़िटर आइसोलेशन, PIN लॉकआउट, मीडिया अनुमति सूची, कमरे, नाम, ब्लॉकिंग, auth बायपास |
| MCP क्लाइंट | हर प्रोटोकॉल युग के मॉक सर्वर (HTTP, पुराना SSE, stdio) |
| रिले | हब, नाम, फ़ॉरवर्डिंग |

डेस्कटॉप क्रेट अलग है: `cd desktop && cargo check`।

## संरचना

```
src/        सर्वर (axum), पार्सर, LLM एजेंट, MCP क्लाइंट, शेयर लिंक, रिले, Telegram
  server/     मालिक का HTTP API, हर क्षेत्र की एक फ़ाइल: एसेट्स, अपलोड, एक्सपोर्ट, चैट,
              संदेश, सेटिंग्स, मीडिया; mod.rs राउटर बनाता है
  share_api/  शेयर लिंक: owner.rs (लिंक और विज़िटर प्रबंधन), visitor.rs (/s/…)
web/        इंटरफ़ेस: index.html, app.css और js/ (एक app.js के रूप में दिया जाता है, बाइनरी में एम्बेडेड)
  js/         इंटरफ़ेस के हर क्षेत्र की एक फ़ाइल, लोड क्रम में क्रमांकित (एक स्क्रिप्ट, एक स्कोप)
desktop/    उसी सर्वर के चारों ओर Tauri ऐप
deploy/     Caddy + Docker Compose
examples/   दो काल्पनिक एक्सपोर्ट
```

दस्तावेज़ और iroof.top का लैंडिंग पेज इस रिपॉज़िटरी में नहीं हैं। वे [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) में हैं: `docs/` (यह साइट) और `landing/`।

## दस्तावेज़

दस्तावेज़ [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) में हैं। वे छवियाँ और ऐप का संस्करण इस रिपॉज़िटरी से लेते हैं: दोनों को साथ-साथ क्लोन करें, फिर वहीं बिल्ड करें।

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

साइट उस रिपॉज़िटरी के `main` पर हर push पर प्रकाशित होती है जो `docs/` बदलता है: [irooftop.github.io](https://irooftop.github.io)। `demo.svg` ऐप रिपॉज़िटरी में `python3 scripts/demo-svg.py` से बनता है (शुद्ध SVG और CSS, ताकि GitHub उसे दिखा सके)।

## रिलीज़

```
 Cargo.toml बढ़ाएँ ─▶ टैग vX.Y.Z ─┬─▶ Release: crates.io + ghcr.io इमेज (amd64 + arm64, नेटिव रनर)
                                   └─▶ desktop: इंस्टॉलर ─▶ रिलीज़ प्रकाशित (नवीनतम) ─▶ Homebrew: formula + cask
```

1. `Cargo.toml` (और `desktop/`) में `version` बढ़ाएँ, कमिट करें, और टैग `vX.Y.Z` push करें। Windows MSI के लिए टैग संख्यात्मक होना चाहिए। उसके बाद का सब कुछ बिना और क्लिक के चलता है।
2. *Release* क्रेट (सीक्रेट `CARGO_REGISTRY_TOKEN`, एनवायरनमेंट `crates-io`) और Docker इमेज प्रकाशित करता है: हर आर्किटेक्चर के लिए नेटिव रनर (`ubuntu-latest`, `ubuntu-24.04-arm`) पर एक जॉब digest से push करता है, और एक `merge` जॉब मल्टी-आर्किटेक्चर टैग बनाता है। क्रेट प्रकाशन जाँचने के लिए `dry_run` के साथ मैन्युअली चलाएँ।
3. *desktop* macOS (arm64, x64), Windows, और Linux के लिए इंस्टॉलर एक ड्राफ़्ट रिलीज़ में बनाता है। जब सभी जुड़ जाते हैं, तो उसका `publish` जॉब जनरेट किए गए रिलीज़ नोट्स जोड़ता है, रिलीज़ प्रकाशित करता है, और उसे नवीनतम के रूप में चिह्नित करता है।
4. उसका `homebrew` जॉब फिर *Homebrew* को कॉल करता है, जो `Formula/rooftop.rb` और `Casks/irooftop.rb` को [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap) पर push करता है। इसके लिए सीक्रेट `HOMEBREW_TAP_TOKEN` (फ़ाइन-ग्रेन्ड टोकन, `irooftop/homebrew-tap`, Contents: पढ़ना और लिखना) या `HOMEBREW_TAP_DEPLOY_KEY` चाहिए; इनमें से कोई भी न हो तो यह एक सूचना के साथ छोड़ दिया जाता है। (`GITHUB_TOKEN` से प्रकाशित रिलीज़ `release: published` को ट्रिगर नहीं करती, इसलिए कॉल स्पष्ट रूप से की जाती है; रिलीज़ को हाथ से प्रकाशित करने पर भी उस इवेंट के ज़रिए Homebrew चलता है।)

मौजूदा टैग के लिए tap अपडेट दोबारा चलाने के लिए, जैसे सीक्रेट जोड़ने के बाद:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap checkout>` वही फ़ाइलें स्थानीय रूप से बनाता है। अगर किसी टैग के इंस्टॉलर विफल हुए हों, तो विफल *desktop* जॉब दोबारा चलाएँ: `publish` और `homebrew` पास होने पर आगे बढ़ते हैं।
