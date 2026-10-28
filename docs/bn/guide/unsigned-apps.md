# একটি অসাইন করা অ্যাপ খোলা

ডেস্কটপ ইনস্টলারগুলো এখনো সাইন বা নোটারাইজ করা হয়নি, তাই প্রথমবার চালানোর সময় macOS ও Windows-এ একটি সতর্কবার্তা দেখায়। এটি একবারের ধাপ: অ্যাপটিকে একবার অনুমতি দিলে, একই পথে ইনস্টল হওয়া আপডেটের পরেও এটি স্বাভাবিকভাবে খোলে।

::: tip এড়াতে চান?
[অ্যাপটি নিজে তৈরি করুন](./desktop#build-it-yourself), অথবা [সার্ভার](./getting-started#install) চালিয়ে আপনার ব্রাউজারে ব্যবহার করুন: `brew install irooftop/tap/rooftop`, `cargo install rooftop`, বা [Docker](./docker)।
:::

## macOS

![macOS-এ একটি যাচাই না হওয়া অ্যাপ খোলা: "Not Opened" সতর্কবার্তা, Done, System Settings, Privacy & Security, Open Anyway, পাসওয়ার্ড, এবং অ্যাপটি খোলে](/how-to-open-an-unsigned-app-on-macos.svg)

macOS 15 Sequoia ও তার পরে:

1. **iRoof.top** খুলুন। macOS বলবে *"iRoof.top" খোলা যায়নি: Apple যাচাই করতে পারেনি…*। **Done** ক্লিক করুন।
2. **Apple মেনু → System Settings… → Privacy & Security** খুলুন।
3. **Security** অংশে স্ক্রল করুন: *"iRoof.top" আপনার Mac রক্ষার জন্য ব্লক করা হয়েছে*। **Open Anyway** ক্লিক করুন।
4. **Open Anyway** দিয়ে নিশ্চিত করুন, এবং আপনার পাসওয়ার্ড লিখুন বা Touch ID ব্যবহার করুন।

**Open Anyway** বোতামটি শুধু অ্যাপটি খোলার চেষ্টার পরে, প্রায় এক ঘণ্টার জন্য দেখা যায়। না দেখা গেলে, অ্যাপটি আবার খুলুন এবং Privacy & Security-তে ফিরে যান।

macOS 14 Sonoma ও তার আগে, Finder-এ অ্যাপে ডান-ক্লিক (বা Control-ক্লিক) করুন, **Open** বেছে নিন, তারপর আবার **Open** চাপুন।

### টার্মিনাল থেকে

ব্রাউজার ডাউনলোডে যে কোয়ারেন্টিন ফ্ল্যাগ দিয়েছে তা সরানোও কাজ করে:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

এটি সবসময় কাজ করে না: নতুন macOS-এ `/Applications`-এর অ্যাপ বদলাতে টার্মিনালের Privacy & Security-তে **App Management** (বা **Full Disk Access**) লাগতে পারে, এবং তা ছাড়া এটি `Operation not permitted` দিয়ে ব্যর্থ হয়। উপরের ধাপগুলো সবসময় কাজ করে।

::: details "iRoof.top ক্ষতিগ্রস্ত এবং খোলা যাবে না"
এই বার্তাও কোয়ারেন্টিন ফ্ল্যাগকে বোঝায়, ভাঙা ডাউনলোডকে নয়। **Cancel** ক্লিক করুন (**Move to Trash** নয়) এবং উপরের `xattr` কমান্ড চালান, অথবা System Settings-এর ধাপগুলো অনুসরণ করুন।
:::

## Windows

SmartScreen ইনস্টলারের জন্য দেখায় **Windows আপনার PC রক্ষা করেছে**:

1. **More info** ক্লিক করুন।
2. **Run anyway** ক্লিক করুন।

ব্রাউজার ডাউনলোড আটকে রাখলে (*সাধারণত ডাউনলোড করা হয় না এমন ফাইল*), ডাউনলোড তালিকা খুলুন, **⋯ → Keep** বেছে নিন, তারপর **Show more → Keep anyway**। `.msi`-এর জন্য রাইট-ক্লিক → **Properties** → **Unblock**-এ টিক → **OK**-ও করতে পারেন, চালানোর আগে।

**Smart App Control** চালু থাকা Windows 11-এ অসাইন করা অ্যাপ **Run anyway** বোতাম ছাড়াই ব্লক হয়। বরং [সার্ভার](./getting-started#install) ব্যবহার করুন, অথবা **Windows Security → App & browser control → Smart App Control settings**-এ Smart App Control বন্ধ করুন।

## Linux

Linux অসাইন করা অ্যাপ ব্লক করে না, তবে একটি AppImage চালানোর অনুমতি লাগে:

```sh
chmod +x iRoof.top_amd64.AppImage    # বা: Properties → Permissions → Allow executing file as program
./iRoof.top_amd64.AppImage
```

FUSE নিয়ে অভিযোগ করলে (`dlopen(): error loading libfuse.so.2`), `libfuse2` ইনস্টল করুন (Ubuntu 24.04: `sudo apt install libfuse2t64`) অথবা `--appimage-extract-and-run` দিয়ে চালান।

প্যাকেজগুলো প্যাকেজ ম্যানেজার দিয়ে ইনস্টল হয়, যা স্থানীয় অসাইন করা প্যাকেজ গ্রহণ করে:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
