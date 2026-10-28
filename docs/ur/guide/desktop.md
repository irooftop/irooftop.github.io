# ڈیسک ٹاپ ایپ

ڈیسک ٹاپ ایپ ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) وہی سرور چلاتی ہے جو `rooftop serve` چلاتا ہے، ایک بے ترتیب `127.0.0.1` پورٹ پر، اور اسے ایک مقامی ونڈو میں دکھاتی ہے۔

| پلیٹ فارم | انسٹال |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`، یا [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) یا [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) کے لیے `.dmg` |
| Windows 10 اور 11 | [انسٹالر (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) یا [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (کسی بھی ڈسٹری بیوشن پر)، [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian، Ubuntu) یا [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

ڈاؤن لوڈ لنکس ہمیشہ نئی ترین ریلیز کی طرف اشارہ کرتے ہیں۔

::: warning بلڈز ابھی دستخط شدہ نہیں ہیں
macOS پر ایپ ایک بار کھولیں، پھر **System Settings → Privacy & Security → Open Anyway**۔ Windows پر SmartScreen میں **More info → Run anyway** چنیں۔ تصویری مرحلہ وار ہدایات: [غیر دستخط شدہ ایپ کھولیں](./unsigned-apps)۔
:::

## پہلی بار کھولنا

ایپ آپ کا شیل یا `.env` نہیں پڑھتی، اس لیے وہ **Connect a model** کے ساتھ استقبال کرتی ہے: **Settings** کھولیں، endpoint، کلید اور ماڈل داخل کریں، اور **Test** دبائیں۔ اگر `OPENAI_BASE_URL`، `OPENAI_API_KEY`، `OPENAI_MODEL` یا `OPENAI_TEMPERATURE` سیٹ ہوں تو وہ ابتدائی ڈیفالٹ بن جاتے ہیں۔

| | |
|---|---|
| ڈیٹا | OS کی ایپ-ڈیٹا ڈائریکٹری، مثلاً macOS پر `~/Library/Application Support/top.iroof.desktop` |
| شیئر لنکس | اسی Wi‑Fi پر یا انٹرنیٹ کے ذریعے: [دوسرے آلات پر لنکس کھولیں](../features/share-links#open-links-on-other-devices) |
| دوسری سائٹیں | `t.me` جیسے لنکس آپ کے براؤزر میں کھلتے ہیں |
| macOS ونڈو | سسٹم کا ٹائٹل بار نہیں: ایپ کے ہیڈرز traffic lights کے نیچے تک جاتے ہیں اور ونڈو کو کھینچنے کا کام کرتے ہیں |
| درآمد | ایپ ایکسپورٹ خود پڑھتی ہے: **Choose folder…** سسٹم پکر کھولتا ہے، اور ڈراپ کیا ہوا فولڈر، `.zip` یا `.txt` وہیں سے درآمد ہوتا ہے۔ کچھ اپ لوڈ نہیں ہوتا، اصل فائل نہیں چھیڑی جاتی، اور APFS پر میڈیا کاپی کے بجائے clone ہوتا ہے، اس لیے 13 GB کی ایکسپورٹ بھی تقریباً کوئی اضافی جگہ نہیں لیتی |

## خود بنائیں

آپ کو Rust ≥ 1.95 اور Node.js چاہیے، اور Linux پر [Tauri کی شرائط](https://v3.tauri.app/start/prerequisites/)۔

```sh
cd desktop
npm ci
npm run build                          # انسٹالرز desktop/target/release/bundle/ میں
npm run build -- --debug --no-bundle   # صرف بائنری
```

macOS پر `npm run build` `.dmg` بھی بناتا ہے، اور Finder کا AppleScript چھوڑ دیتا ہے جو صرف DMG ونڈو کی ترتیب کرتا ہے (یہ *Automation* اجازت کے بغیر ناکام ہوتا ہے)۔ `ROOFTOP_DMG_FINDER=1` سیٹ کریں تاکہ Finder کا لے آؤٹ برقرار رہے، جیسا کہ جاری شدہ DMGs میں ہوتا ہے: `desktop/dmg/` کا پس منظر، ایپ سے *Applications* تک تیر، اور والیوم کی چھپی ہوئی فائلیں نظر سے دور۔ `desktop/dmg/background.svg` میں تبدیلی کے بعد `desktop/dmg/make-background.sh` چلائیں۔
