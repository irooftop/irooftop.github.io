# باز کردن برنامه‌ی امضانشده

بسته‌های نصب دسکتاپ هنوز امضا یا نوتاریزه نشده‌اند، بنابراین اولین اجرا در macOS و Windows هشداری نشان می‌دهد. این یک مرحله‌ی یک‌باره است: وقتی یک بار به برنامه اجازه دادید، به‌طور عادی باز می‌شود، حتی بعد از به‌روزرسانی‌هایی که به همان روش نصب شده‌اند.

::: tip ترجیح می‌دهید از آن دوری کنید؟
[برنامه را خودتان بسازید](./desktop#build-it-yourself)، یا [سرور](./getting-started#install) را اجرا کنید و در مرورگر خود از آن استفاده کنید: `brew install irooftop/tap/rooftop`، `cargo install rooftop`، یا [Docker](./docker).
:::

## macOS

![باز کردن برنامه‌ی تأیید‌نشده در macOS: هشدار «Not Opened»، سپس Done، سپس System Settings، و Privacy & Security، و Open Anyway، و رمز عبور، و باز شدن برنامه](/how-to-open-an-unsigned-app-on-macos.svg)

در macOS 15 Sequoia و جدیدتر:

1. **iRoof.top** را باز کنید. macOS می‌گوید *«iRoof.top» باز نشد: Apple نتوانست آن را تأیید کند…*. روی **Done** کلیک کنید.
2. **منوی Apple ← System Settings… ← Privacy & Security** را باز کنید.
3. تا بخش **Security** پایین بروید: *«iRoof.top» برای محافظت از Mac شما مسدود شد*. روی **Open Anyway** کلیک کنید.
4. با **Open Anyway** تأیید کنید، و رمز عبور خود را وارد کنید یا از Touch ID استفاده کنید.

دکمه‌ی **Open Anyway** فقط پس از تلاش برای باز کردن برنامه، حدود یک ساعت ظاهر می‌شود. اگر نبود، برنامه را دوباره باز کنید و به Privacy & Security برگردید.

در macOS 14 Sonoma و قدیمی‌تر، روی برنامه در Finder کلیک راست کنید (یا Control-کلیک)، **Open** را انتخاب کنید، و سپس دوباره **Open** را بزنید.

### از ترمینال

حذف پرچم قرنطینه‌ای که مرورگر روی دانلود گذاشته هم کار می‌کند:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

همیشه کار نمی‌کند: در macOS های جدیدتر، ترمینال ممکن است برای تغییر برنامه‌ها در `/Applications` به **App Management** (یا **Full Disk Access**) در Privacy & Security نیاز داشته باشد، و بدون آن با `Operation not permitted` شکست می‌خورد. مراحل بالا همیشه کار می‌کنند.

::: details «iRoof.top آسیب‌دیده است و نمی‌توان آن را باز کرد»
این پیام هم به پرچم قرنطینه اشاره دارد، نه به یک دانلود خراب. روی **Cancel** کلیک کنید (نه **Move to Trash**) و دستور `xattr` بالا را اجرا کنید، یا مراحل System Settings را دنبال کنید.
:::

## Windows

SmartScreen برای نصب‌کننده نشان می‌دهد **Windows از رایانه‌ی شما محافظت کرد**:

1. روی **More info** کلیک کنید.
2. روی **Run anyway** کلیک کنید.

اگر مرورگر دانلود را نگه دارد (*معمولاً دانلود نمی‌شود*)، فهرست دانلودها را باز کنید، **⋯ ← Keep** را انتخاب کنید، سپس **Show more ← Keep anyway**. برای `.msi` می‌توانید روی آن راست‌کلیک کنید ← **Properties** ← تیک **Unblock** ← **OK** را بزنید، پیش از اجرا.

در Windows 11 با **Smart App Control** روشن، برنامه‌های امضانشده بدون دکمه‌ی **Run anyway** مسدود می‌شوند. به‌جای آن از [سرور](./getting-started#install) استفاده کنید، یا Smart App Control را در **Windows Security ← App & browser control ← Smart App Control settings** خاموش کنید.

## Linux

Linux برنامه‌های امضانشده را مسدود نمی‌کند، اما AppImage برای اجرا به مجوز نیاز دارد:

```sh
chmod +x iRoof.top_amd64.AppImage    # یا: Properties ← Permissions ← Allow executing file as program
./iRoof.top_amd64.AppImage
```

اگر درباره‌ی FUSE شکایت کرد (`dlopen(): error loading libfuse.so.2`)، `libfuse2` را نصب کنید (Ubuntu 24.04: `sudo apt install libfuse2t64`) یا با `--appimage-extract-and-run` اجرا کنید.

بسته‌ها با مدیر بسته نصب می‌شوند، که بسته‌های محلی امضانشده را می‌پذیرد:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian، Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
