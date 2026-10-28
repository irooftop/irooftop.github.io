# উন্নয়ন

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| টেস্ট যা কভার করে | |
|---|---|
| পার্সার ও রূপান্তর | `examples/telegram` ও `examples/whatsapp`-এর বিপরীতে |
| শেয়ার লিংক | ভিজিটর বিচ্ছিন্নতা, PIN লকআউট, মিডিয়া অনুমতি তালিকা, রুম, নাম, ব্লকিং, auth বাইপাস |
| MCP ক্লায়েন্ট | প্রতিটি প্রোটোকল যুগের মক সার্ভার (HTTP, পুরোনো SSE, stdio) |
| রিলে | হাব, নাম, ফরওয়ার্ডিং |

ডেস্কটপ crate আলাদা: `cd desktop && cargo check`।

## কাঠামো

```
src/        সার্ভার (axum), পার্সার, LLM এজেন্ট, MCP ক্লায়েন্ট, শেয়ার লিংক, রিলে, Telegram
  server/     মালিকের HTTP API, প্রতি এলাকায় একটি ফাইল: অ্যাসেট, আপলোড, এক্সপোর্ট, চ্যাট,
              বার্তা, সেটিংস, মিডিয়া; mod.rs রাউটার তৈরি করে
  share_api/  শেয়ার লিংক: owner.rs (লিংক ও ভিজিটর পরিচালনা), visitor.rs (/s/…)
web/        ইন্টারফেস: index.html, app.css, ও js/ (একটি app.js হিসেবে পরিবেশিত, বাইনারিতে এমবেড করা)
  js/         ইন্টারফেসের প্রতিটি এলাকার জন্য একটি ফাইল, লোড ক্রমে নম্বরযুক্ত (একটি স্ক্রিপ্ট, একটি স্কোপ)
desktop/    একই সার্ভারের চারপাশে Tauri অ্যাপ
deploy/     Caddy + Docker Compose
examples/   দুটি কাল্পনিক এক্সপোর্ট
```

ডকুমেন্টেশন ও iroof.top-এর ল্যান্ডিং পেজ এই রিপোজিটরিতে নেই। এগুলো আছে [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io)-তে: `docs/` (এই সাইট) ও `landing/`।

## ডকুমেন্টেশন

ডকুমেন্টেশন আছে [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io)-তে। এটি এই রিপোজিটর থেকে ছবি ও অ্যাপের সংস্করণ নেয়: দুটিকে পাশাপাশি ক্লোন করুন, তারপর সেখানে বিল্ড করুন।

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

সাইটটি সেই রিপোজিটরির `main`-এ প্রতিটি push-এ প্রকাশিত হয় যা `docs/` পরিবর্তন করে: [irooftop.github.io](https://irooftop.github.io)। `demo.svg` অ্যাপ রিপোজিটরিতে `python3 scripts/demo-svg.py` দিয়ে তৈরি হয় (GitHub যাতে দেখাতে পারে সেজন্য বিশুদ্ধ SVG ও CSS)।

## রিলিজ

```
 Cargo.toml বাড়ান ─▶ ট্যাগ vX.Y.Z ─┬─▶ Release: crates.io + ghcr.io ইমেজ (amd64 + arm64, নেটিভ রানার)
                                    └─▶ desktop: ইনস্টলার ─▶ রিলিজ প্রকাশ (সর্বশেষ) ─▶ Homebrew: formula + cask
```

1. `Cargo.toml` (ও `desktop/`) এ `version` বাড়ান, কমিট করুন, এবং `vX.Y.Z` ট্যাগ push করুন। Windows MSI-এর জন্য ট্যাগ সংখ্যাসূচক হতে হবে। এরপরের সবকিছু আর কোনো ক্লিক ছাড়াই চলে।
2. *Release* crate (সিক্রেট `CARGO_REGISTRY_TOKEN`, পরিবেশ `crates-io`) ও Docker ইমেজ প্রকাশ করে: প্রতিটি আর্কিটেকচারের জন্য একটি নেটিভ রানারে (`ubuntu-latest`, `ubuntu-24.04-arm`) একটি জব digest দিয়ে push করে, এবং একটি `merge` জব মাল্টি-আর্কিটেকচার ট্যাগ তৈরি করে। crate প্রকাশ পরীক্ষা করতে `dry_run` দিয়ে হাতে চালান।
3. *desktop* macOS (arm64, x64), Windows, ও Linux-এর জন্য ইনস্টলার একটি ড্রাফট রিলিজে বিল্ড করে। সবগুলো সংযুক্ত হলে, তার `publish` জব তৈরি রিলিজ নোট যোগ করে, রিলিজ প্রকাশ করে, এবং সেটিকে সর্বশেষ হিসেবে চিহ্নিত করে।
4. তার `homebrew` জব তারপর *Homebrew*-কে কল করে, যা `Formula/rooftop.rb` ও `Casks/irooftop.rb` [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap)-এ push করে। এর জন্য `HOMEBREW_TAP_TOKEN` সিক্রেট (সূক্ষ্ম-দানার টোকেন, `irooftop/homebrew-tap`, Contents: পড়া ও লেখা) বা `HOMEBREW_TAP_DEPLOY_KEY` লাগে; কোনোটিই না থাকলে একটি বিজ্ঞপ্তিসহ এড়িয়ে যায়। (`GITHUB_TOKEN` দিয়ে প্রকাশিত রিলিজ `release: published` ট্রিগার করে না, তাই কলটি স্পষ্ট; রিলিজ হাতে প্রকাশ করলে সেই ইভেন্টের মাধ্যমে Homebrew এখনো চলে।)

বিদ্যমান ট্যাগের জন্য tap আপডেট আবার চালাতে, যেমন সিক্রেট যোগ করার পরে:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap checkout>` একই ফাইল স্থানীয়ভাবে তৈরি করে। একটি ট্যাগের ইনস্টলার ব্যর্থ হলে, ব্যর্থ *desktop* জবগুলো আবার চালান: `publish` ও `homebrew` পাস করলে এগিয়ে যায়।
