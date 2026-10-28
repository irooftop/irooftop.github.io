# غیر دستخط شدہ ایپ کھولیں

ڈیسک ٹاپ انسٹالرز ابھی دستخط یا notarize شدہ نہیں ہیں، اس لیے پہلی بار کھولنے پر macOS اور Windows پر انتباہ ظاہر ہوتا ہے۔
یہ ایک بار کا مرحلہ ہے: ایپ کو ایک بار اجازت دینے کے بعد وہ عام طور پر کھلتی ہے، اور اسی طرح انسٹال ہونے والی اپ ڈیٹس کے بعد بھی۔

::: tip یہ نہیں کرنا چاہتے؟
[ایپ خود بنائیں](./desktop#build-it-yourself)، یا [سرور](./getting-started#install) چلائیں اور اسے اپنے براؤزر میں استعمال کریں: `brew install irooftop/tap/rooftop`، `cargo install rooftop` یا [Docker](./docker)۔
:::

## macOS

![macOS پر غیر تصدیق شدہ ایپ کھولنا: "Not Opened" انتباہ، Done، System Settings، Privacy & Security، Open Anyway، پاس ورڈ، اور ایپ کھل جاتی ہے](/how-to-open-an-unsigned-app-on-macos.svg)

macOS 15 Sequoia اور بعد کے ورژنز پر:

1. **iRoof.top** کھولیں۔ macOS کہتا ہے *“iRoof.top” Not Opened: Apple could not verify…*۔ **Done** پر کلک کریں۔
2. **Apple menu → System Settings… → Privacy & Security** کھولیں۔
3. **Security** تک نیچے اسکرول کریں: *“iRoof.top” was blocked to protect your Mac*۔ **Open Anyway** پر کلک کریں۔
4. **Open Anyway** سے تصدیق کریں، اور اپنا پاس ورڈ داخل کریں یا Touch ID استعمال کریں۔

**Open Anyway** بٹن صرف اس وقت ظاہر ہوتا ہے جب آپ ایپ کھولنے کی کوشش کر چکے ہوں، اور تقریباً ایک گھنٹے تک۔ اگر وہ نظر نہ آئے تو ایپ دوبارہ کھولیں اور Privacy & Security پر واپس جائیں۔

macOS 14 Sonoma اور اس سے پہلے کے ورژنز پر، Finder میں ایپ پر دائیں کلک (یا Control-click) کریں، **Open** چنیں، پھر دوبارہ **Open**۔

### ٹرمینل سے

براؤزر کے ڈاؤن لوڈ پر لگا quarantine فلیگ ہٹانا بھی کام کرتا ہے:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

یہ ہمیشہ کام نہیں کرتا: حالیہ macOS پر Terminal کو `/Applications` میں ایپس بدلنے کے لیے Privacy & Security میں **App Management** (یا **Full Disk Access**) درکار ہو سکتی ہے، اور اس کے بغیر یہ `Operation not permitted` کے ساتھ ناکام ہوتا ہے۔ اوپر کے مراحل ہمیشہ کام کرتے ہیں۔

::: details “iRoof.top is damaged and can't be opened”
یہ پیغام بھی quarantine فلیگ کا مطلب ہے، خراب ڈاؤن لوڈ کا نہیں۔ **Cancel** پر کلک کریں (**Move to Trash** پر نہیں) اور اوپر والی `xattr` کمانڈ چلائیں، یا System Settings کے مراحل پر عمل کریں۔
:::

## Windows

SmartScreen انسٹالر کے لیے **Windows protected your PC** دکھاتا ہے:

1. **More info** پر کلک کریں۔
2. **Run anyway** پر کلک کریں۔

اگر براؤزر ڈاؤن لوڈ روک دے (*isn't commonly downloaded*)، تو ڈاؤن لوڈز کی فہرست کھولیں، **⋯ → Keep** چنیں، پھر **Show more → Keep anyway**۔ `.msi` کے لیے، چلانے سے پہلے آپ دائیں کلک کر کے **Properties** → **Unblock** پر نشان لگا کر **OK** بھی کر سکتے ہیں۔

Windows 11 پر **Smart App Control** آن ہو تو غیر دستخط شدہ ایپس **Run anyway** بٹن کے بغیر بلاک ہو جاتی ہیں۔ اس صورت میں [سرور](./getting-started#install) استعمال کریں، یا **Windows Security → App & browser control → Smart App Control settings** میں اسے بند کریں۔

## Linux

Linux غیر دستخط شدہ ایپس کو بلاک نہیں کرتا، لیکن AppImage کو چلنے کی اجازت درکار ہوتی ہے:

```sh
chmod +x iRoof.top_amd64.AppImage    # یا: Properties → Permissions → Allow executing file as program
./iRoof.top_amd64.AppImage
```

اگر وہ FUSE کی شکایت کرے (`dlopen(): error loading libfuse.so.2`)، تو `libfuse2` انسٹال کریں (Ubuntu 24.04: `sudo apt install libfuse2t64`) یا اسے `--appimage-extract-and-run` کے ساتھ چلائیں۔

پیکیجز پیکیج مینیجر کے ذریعے انسٹال ہوتے ہیں، جو مقامی غیر دستخط شدہ پیکیجز قبول کرتا ہے:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian، Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
