# توسعه

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| آزمون‌ها پوشش می‌دهند | |
|---|---|
| تجزیه‌گر و تبدیل | روی `examples/telegram` و `examples/whatsapp` |
| پیوندهای اشتراک‌گذاری | جداسازی بازدیدکنندگان، قفل PIN، فهرست مجاز رسانه، اتاق‌ها، نام‌ها، مسدودسازی، دورزدن احراز هویت |
| کلاینت MCP | سرورهای ساختگی از هر دوره‌ی پروتکل (HTTP، SSE قدیمی، stdio) |
| رله | هاب، نام‌ها، ارسال |

بسته‌ی دسکتاپ جداست: `cd desktop && cargo check`.

## ساختار

```
src/        سرور (axum)، تجزیه‌گرها، عامل LLM، کلاینت MCP، پیوندهای اشتراک‌گذاری، رله، تلگرام
  server/     API HTTP مالک، یک فایل برای هر بخش: دارایی‌ها، بارگذاری‌ها، صادرات‌ها، گفتگوها،
              پیام‌ها، تنظیمات، رسانه؛ mod.rs مسیریاب‌ها را می‌سازد
  share_api/  پیوندهای اشتراک‌گذاری: owner.rs (مدیریت پیوندها و بازدیدکنندگان)، visitor.rs (/s/…)
web/        رابط: index.html، app.css و js/ (به‌صورت یک app.js ارائه می‌شود، در فایل اجرایی تعبیه شده)
  js/         یک فایل برای هر بخش رابط، شماره‌گذاری‌شده بر اساس ترتیب بارگذاری (یک اسکریپت، یک محدوده)
desktop/    برنامه‌ی Tauri پیرامون همان سرور
deploy/     Caddy + Docker Compose
examples/   دو صادرات ساختگی
```

مستندات و صفحه‌ی معرفی iroof.top در این مخزن نیستند. در [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) هستند: `docs/` (این سایت) و `landing/`.

## مستندات

مستندات در [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) است. تصاویر و نسخه‌ی برنامه را از این مخزن می‌گیرد: هر دو را کنار هم کلون کنید، سپس آنجا بسازید.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

سایت در هر push به `main` آن مخزن که `docs/` را تغییر دهد، روی [irooftop.github.io](https://irooftop.github.io) منتشر می‌شود. `demo.svg` با `python3 scripts/demo-svg.py` در مخزن برنامه ساخته می‌شود (SVG و CSS خالص، تا GitHub آن را نمایش دهد).

## انتشار نسخه

```
 افزایش Cargo.toml ─▶ برچسب vX.Y.Z ─┬─▶ Release: crates.io + ایمیج ghcr.io (amd64 + arm64، رانرهای بومی)
                                    └─▶ desktop: نصب‌کننده‌ها ─▶ انتشار نسخه (جدیدترین) ─▶ Homebrew: formula + cask
```

1. `version` را در `Cargo.toml` (و `desktop/`) افزایش دهید، commit کنید و برچسب `vX.Y.Z` را push کنید. برچسب برای نصب‌کننده‌ی MSI ویندوز باید عددی باشد. هر آنچه بعد می‌آید بدون کلیک بیشتر اجرا می‌شود.
2. *Release* کرِیت (رمز `CARGO_REGISTRY_TOKEN`، محیط `crates-io`) و ایمیج Docker را منتشر می‌کند: یک کار برای هر معماری روی یک رانر بومی (`ubuntu-latest`، `ubuntu-24.04-arm`) با digest push می‌کند، و کار `merge` برچسب‌های چندمعماری را می‌سازد. برای بررسی انتشار کرِیت، دستی با `dry_run` اجرا کنید.
3. *desktop* نصب‌کننده‌ها را برای macOS (arm64، x64)، ویندوز و لینوکس در یک نسخه‌ی پیش‌نویس می‌سازد. وقتی همه پیوست شدند، کار `publish` آن یادداشت‌های انتشار تولیدشده را اضافه می‌کند، نسخه را منتشر می‌کند و آن را جدیدترین علامت می‌زند.
4. کار `homebrew` آن سپس *Homebrew* را فراخوانی می‌کند، که `Formula/rooftop.rb` و `Casks/irooftop.rb` را به [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap) push می‌کند. رمز `HOMEBREW_TAP_TOKEN` (توکن با دسترسی دقیق، `irooftop/homebrew-tap`، Contents: خواندن و نوشتن) یا `HOMEBREW_TAP_DEPLOY_KEY` لازم است؛ اگر هیچ‌کدام نباشد، با یک اعلان رد می‌شود. (نسخه‌ای که با `GITHUB_TOKEN` منتشر شود، رویداد `release: published` را فعال نمی‌کند، به همین دلیل فراخوانی صریح است؛ انتشار دستی نسخه همچنان از طریق همان رویداد Homebrew را فعال می‌کند.)

برای اجرای دوباره‌ی به‌روزرسانی tap برای یک برچسب موجود، مثلاً پس از افزودن رمز:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <نسخه‌ی tap>` همان فایل‌ها را به‌صورت محلی می‌سازد. اگر نصب‌کننده‌های یک برچسب شکست خوردند، کارهای ناموفق *desktop* را دوباره اجرا کنید: `publish` و `homebrew` پس از موفقیت ادامه می‌دهند.
