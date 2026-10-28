# ڈویلپمنٹ

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| ٹیسٹ کیا کور کرتے ہیں | |
|---|---|
| Parser اور تبدیلی | `examples/telegram` اور `examples/whatsapp` کے خلاف |
| شیئر لنکس | وزیٹر کی علیحدگی، PIN لاک، میڈیا کی اجازت کی فہرست، رومز، نام، بلاک کرنا، auth bypass |
| MCP کلائنٹ | ہر پروٹوکول دور کے mock سرورز (HTTP، پرانا SSE، stdio) |
| ریلے | ہب، نام، فارورڈنگ |

ڈیسک ٹاپ کریٹ الگ ہے: `cd desktop && cargo check`۔

## ساخت

```
src/        سرور (axum)، parsers، LLM ایجنٹ، MCP کلائنٹ، شیئر لنکس، ریلے، Telegram
  server/     مالک کا HTTP API، ہر علاقے کے لیے ایک فائل: assets، uploads، exports، chats،
              messages، settings، media؛ mod.rs راؤٹرز بناتا ہے
  share_api/  شیئر لنکس: owner.rs (لنکس اور وزیٹرز کا انتظام)، visitor.rs (/s/…)
web/        UI: index.html، app.css اور js/ (ایک app.js کے طور پر پیش کیا جاتا ہے، بائنری میں شامل)
  js/         UI کے ہر علاقے کے لیے ایک فائل، لوڈ ترتیب کے مطابق نمبر دار (ایک اسکرپٹ، ایک scope)
desktop/    اسی سرور کے گرد Tauri ایپ
deploy/     Caddy + Docker Compose
examples/   دو فرضی ایکسپورٹس
```

دستاویزات اور iroof.top کا ابتدائی صفحہ اس ریپوزٹری میں نہیں ہیں۔ وہ [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) میں ہیں: `docs/` (یہ سائٹ) اور `landing/`۔

## دستاویزات

دستاویزات [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) میں ہیں۔ وہ تصاویر اور ایپ کا ورژن اسی ریپوزٹری سے لیتی ہیں: دونوں کو ساتھ ساتھ کلون کریں، پھر وہیں بنائیں۔

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

سائٹ اس ریپوزٹری کے `main` پر ہر push پر [irooftop.github.io](https://irooftop.github.io) پر شائع ہوتی ہے، جو `docs/` کو چھوتا ہو۔ `demo.svg` ایپ کی ریپوزٹری میں `python3 scripts/demo-svg.py` سے بنتا ہے (سادہ SVG اور CSS، تاکہ GitHub اسے دکھائے)۔

## ریلیز

```
 Cargo.toml بڑھائیں ─▶ ٹیگ vX.Y.Z ─┬─▶ Release: crates.io + ghcr.io ایمیج (amd64 + arm64، native رنرز)
                                  └─▶ desktop: انسٹالرز ─▶ ریلیز شائع (latest) ─▶ Homebrew: formula + cask
```

1. `Cargo.toml` میں `version` بڑھائیں (اور `desktop/` میں)، commit کریں، اور `vX.Y.Z` ٹیگ push کریں۔ Windows MSI کے لیے ٹیگ عددی ہونا چاہیے۔ اس کے بعد کا سب کچھ بغیر مزید کلک کے چلتا ہے۔
2. *Release* کریٹ شائع کرتا ہے (راز `CARGO_REGISTRY_TOKEN`، ماحول `crates-io`) اور Docker ایمیج: ہر architecture کے لیے ایک کام native رنر (`ubuntu-latest`، `ubuntu-24.04-arm`) پر digest کے ذریعے push کرتا ہے، اور `merge` کام multi-arch ٹیگز بناتا ہے۔ کریٹ کی اشاعت جانچنے کے لیے `dry_run` کے ساتھ ہاتھ سے چلائیں۔
3. *desktop* macOS (arm64، x64)، Windows اور Linux کے لیے انسٹالرز ایک draft ریلیز میں بناتا ہے۔ جب سب منسلک ہو جائیں، اس کا `publish` کام تیار شدہ ریلیز نوٹس شامل کرتا ہے، ریلیز شائع کرتا ہے اور اسے latest نشان زد کرتا ہے۔
4. اس کا `homebrew` کام پھر *Homebrew* کو کال کرتا ہے، جو `Formula/rooftop.rb` اور `Casks/irooftop.rb` کو [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap) پر push کرتا ہے۔ اسے راز `HOMEBREW_TAP_TOKEN` (fine-grained ٹوکن، `irooftop/homebrew-tap`، Contents: read and write) یا `HOMEBREW_TAP_DEPLOY_KEY` چاہیے؛ ان میں سے کچھ نہ ہو تو یہ ایک اطلاع کے ساتھ چھوڑ دیتا ہے۔ (`GITHUB_TOKEN` سے شائع ہونے والی ریلیز `release: published` کو فعال نہیں کرتی، اسی لیے کال صریح ہے؛ ہاتھ سے ریلیز شائع کرنا اب بھی اسی واقعے کے ذریعے Homebrew کو فعال کرتا ہے۔)

موجودہ ٹیگ کے لیے tap کی تازہ کاری دوبارہ چلانے کے لیے، مثلاً راز شامل کرنے کے بعد:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap checkout>` وہی فائلیں مقامی طور پر بناتا ہے۔ اگر کسی ٹیگ کے انسٹالرز ناکام ہوں تو ناکام *desktop* کام دوبارہ چلائیں: `publish` اور `homebrew` کامیاب ہونے پر آگے بڑھتے ہیں۔
