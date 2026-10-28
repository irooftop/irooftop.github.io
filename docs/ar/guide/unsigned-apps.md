# فتح تطبيق غير موقّع

لم تُوقَّع مثبّتات سطح المكتب ولم تخضع للتوثيق (notarization) بعد، لذلك يُظهر التشغيل الأول تحذيرًا على macOS وWindows. هذه خطوة واحدة فقط: بعد السماح للتطبيق مرة واحدة، يُفتح بشكل طبيعي، بما في ذلك بعد التحديثات المثبتة بالطريقة نفسها.

::: tip تفضّل تجنّب ذلك؟
[ابنِ التطبيق بنفسك](./desktop#build-it-yourself)، أو شغّل [الخادم](./getting-started#install) واستخدمه في متصفحك: `brew install irooftop/tap/rooftop`، أو `cargo install rooftop`، أو [Docker](./docker).
:::

## macOS

![فتح تطبيق غير موثّق على macOS: تحذير "Not Opened"، ثم Done، ثم System Settings، وPrivacy & Security، وOpen Anyway، وكلمة المرور، ويُفتح التطبيق](/how-to-open-an-unsigned-app-on-macos.svg)

في macOS 15 Sequoia وما بعده:

1. افتح **iRoof.top**. سيقول macOS *"iRoof.top" لم يُفتح: لم تتمكن Apple من التحقق منه…*. اضغط **Done**.
2. افتح **قائمة Apple ← System Settings… ← Privacy & Security**.
3. مرّر إلى **Security**: *تم حظر "iRoof.top" لحماية جهاز Mac الخاص بك*. اضغط **Open Anyway**.
4. أكّد بـ **Open Anyway**، وأدخل كلمة المرور أو استخدم Touch ID.

يظهر زر **Open Anyway** فقط بعد أن تحاول فتح التطبيق، ولمدة ساعة تقريبًا. إذا لم يظهر، فأعد فتح التطبيق وارجع إلى Privacy & Security.

في macOS 14 Sonoma وما قبله، انقر بزر الماوس الأيمن (أو Control-نقر) على التطبيق في Finder، واختر **Open**، ثم **Open** مرة أخرى.

### من الطرفية

إزالة علامة الحجر الصحي التي وضعها المتصفح على التنزيل تعمل أيضًا:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

لا تنجح دائمًا: في أحدث إصدارات macOS قد تحتاج الطرفية إلى **App Management** (أو **Full Disk Access**) في Privacy & Security لتعديل التطبيقات في `/Applications`، ومن دونه تفشل برسالة `Operation not permitted`. الخطوات أعلاه تنجح دائمًا.

::: details "iRoof.top تالف ولا يمكن فتحه"
تعني هذه الرسالة أيضًا علامة الحجر الصحي، وليس تنزيلًا تالفًا. انقر **Cancel** (لا **Move to Trash**)، ونفّذ أمر `xattr` أعلاه، أو اتبع خطوات System Settings.
:::

## Windows

يُظهر SmartScreen للمثبّت الرسالة **حمت Windows جهاز الكمبيوتر الخاص بك**:

1. انقر **More info**.
2. انقر **Run anyway**.

إذا احتجز المتصفح التنزيل (*لا يُنزَّل عادة*)، فافتح قائمة التنزيلات، واختر **⋯ ← Keep**، ثم **Show more ← Keep anyway**. بالنسبة إلى `.msi` يمكنك أيضًا النقر بالزر الأيمن ← **Properties** ← تحديد **Unblock** ← **OK** قبل تشغيله.

على Windows 11 مع تفعيل **Smart App Control**، تُحظر التطبيقات غير الموقعة دون زر **Run anyway**. استخدم [الخادم](./getting-started#install) بدلًا من ذلك، أو أوقف Smart App Control من **Windows Security ← App & browser control ← Smart App Control settings**.

## Linux

لا يحظر Linux التطبيقات غير الموقّعة، لكن ملف AppImage يحتاج إلى إذن للتشغيل:

```sh
chmod +x iRoof.top_amd64.AppImage    # أو: Properties ← Permissions ← Allow executing file as program
./iRoof.top_amd64.AppImage
```

إذا اشتكى من FUSE (`dlopen(): error loading libfuse.so.2`)، فثبّت `libfuse2` (Ubuntu 24.04: `sudo apt install libfuse2t64`)، أو شغّله بـ `--appimage-extract-and-run`.

تُثبّت الحزم بمدير الحزم، الذي يقبل الحزم المحلية غير الموقّعة:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian وUbuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
