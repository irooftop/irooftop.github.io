# ডেস্কটপ অ্যাপ

ডেস্কটপ অ্যাপ ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) `rooftop serve`-এর মতো একই সার্ভার একটি এলোমেলো `127.0.0.1` পোর্টে চালায়, এবং একটি নেটিভ উইন্ডোতে দেখায়।

| প্ল্যাটফর্ম | ইনস্টল |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, বা [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) বা [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg)-এর জন্য `.dmg` |
| Windows 10 ও 11 | [ইনস্টলার (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) বা [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (যেকোনো ডিস্ট্রিবিউশন), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu), বা [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

ডাউনলোড লিংকগুলো সবসময় সর্বশেষ রিলিজের দিকে নির্দেশ করে।

::: warning বিল্ড এখনো সাইন করা হয়নি
macOS-এ অ্যাপটি একবার খুলুন, তারপর **System Settings → Privacy & Security → Open Anyway**। Windows-এ SmartScreen-এ **More info → Run anyway** বেছে নিন। অ্যানিমেশনসহ ধাপে ধাপে: [একটি অসাইন করা অ্যাপ খোলা](./unsigned-apps)।
:::

## প্রথমবার চালানো

অ্যাপ আপনার শেল বা `.env` পড়ে না, তাই এটি আপনাকে **একটি মডেল সংযুক্ত করুন** স্ক্রিন দিয়ে স্বাগত জানায়: **সেটিংস** খুলুন, এন্ডপয়েন্ট, কী ও মডেল লিখুন, তারপর **পরীক্ষা** চাপুন। `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`, বা `OPENAI_TEMPERATURE` সেট থাকলে সেগুলো প্রাথমিক ডিফল্ট হয়ে যায়।

| | |
|---|---|
| ডেটা | অপারেটিং সিস্টেমের অ্যাপ-ডেটা ফোল্ডার, যেমন macOS-এ `~/Library/Application Support/top.iroof.desktop` |
| শেয়ার লিংক | একই Wi‑Fi-তে বা ইন্টারনেটের মাধ্যমে: [অন্য ডিভাইসে লিংক খোলা](../features/share-links#open-links-on-other-devices) |
| অন্যান্য সাইট | `t.me`-এর মতো লিংক আপনার ব্রাউজারে খোলে |
| macOS উইন্ডো | সিস্টেমের টাইটেল বার নেই: অ্যাপের হেডার ট্রাফিক লাইটের নিচ পর্যন্ত যায় এবং উইন্ডো টেনে নেওয়া যায় |
| ইমপোর্ট | অ্যাপ এক্সপোর্টটি নিজেই পড়ে: **ফোল্ডার বেছে নিন…** সিস্টেম পিকার খোলে, এবং ড্রপ করা ফোল্ডার, `.zip`, বা `.txt` যেখানে আছে সেখান থেকেই ইমপোর্ট হয়। কিছুই আপলোড হয় না, মূল ফাইল অক্ষত থাকে, এবং APFS-এ মিডিয়া কপি না হয়ে ক্লোন হয়, তাই ১৩ GB এক্সপোর্টও প্রায় কোনো অতিরিক্ত জায়গা নেয় না |

## নিজে তৈরি করুন {#build-it-yourself}

আপনার Rust ≥ 1.95 ও Node.js লাগবে, এবং Linux-এ [Tauri-এর পূর্বশর্তগুলো](https://v3.tauri.app/start/prerequisites/)।

```sh
cd desktop
npm ci
npm run build                          # ইনস্টলার desktop/target/release/bundle/-এ
npm run build -- --debug --no-bundle   # শুধু বাইনারি
```

macOS-এ `npm run build` `.dmg`-ও বানায়, এবং শুধু DMG উইন্ডো সাজানো Finder AppleScript বাদ দেয় (*Automation* অনুমতি ছাড়া এটি ব্যর্থ হয়)। প্রকাশিত DMG-এর মতো Finder-এর লেআউট রাখতে `ROOFTOP_DMG_FINDER=1` সেট করুন: `desktop/dmg/`-এর ব্যাকগ্রাউন্ডে অ্যাপ থেকে *Applications*-এ একটি তীর থাকে, এবং ভলিউমের লুকানো ফাইলগুলো দৃষ্টির বাইরে থাকে। `desktop/dmg/background.svg` সম্পাদনার পর `desktop/dmg/make-background.sh` চালান।
