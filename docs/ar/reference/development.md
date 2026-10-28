# التطوير

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| تغطي الاختبارات | |
|---|---|
| المحلل والتحويل | على `examples/telegram` و`examples/whatsapp` |
| روابط المشاركة | عزل الزوار، وقفل PIN، وقائمة الوسائط المسموح بها، والغرف، والأسماء، والحظر، وتجاوز المصادقة |
| عميل MCP | خوادم وهمية من كل حقبة للبروتوكول (HTTP، وSSE القديم، وstdio) |
| الترحيل | المحور، والأسماء، والتمرير |

حزمة سطح المكتب منفصلة: `cd desktop && cargo check`.

## البنية

```
src/        الخادم (axum)، والمحللات، ووكيل LLM، وعميل MCP، وروابط المشاركة، والترحيل، وTelegram
  server/     واجهة HTTP للمالك، ملف لكل مجال: الأصول، والرفع، والتصدير، والمحادثات،
              والرسائل، والإعدادات، والوسائط؛ يبني mod.rs أجهزة التوجيه
  share_api/  روابط المشاركة: owner.rs (إدارة الروابط والزوار)، وvisitor.rs (/s/…)
web/        الواجهة: index.html، وapp.css، وjs/ (يُقدَّم كملف app.js واحد، ومضمَّن في الملف الثنائي)
  js/         ملف لكل مجال من الواجهة، مرقّم حسب ترتيب التحميل (نص برمجي واحد، ونطاق واحد)
desktop/    تطبيق Tauri حول الخادم نفسه
deploy/     Caddy + Docker Compose
examples/   تصديران خياليان
```

لا توجد الوثائق والصفحة الترحيبية لـ iroof.top في هذا المستودع. توجد في [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (هذا الموقع) و`landing/`.

## الوثائق

توجد الوثائق في [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). وهي تأخذ الصور وإصدار التطبيق من هذا المستودع: انسخ المستودعين جنبًا إلى جنب، ثم ابنِ من هناك.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

يُنشر الموقع على [irooftop.github.io](https://irooftop.github.io) في كل دفع (push) إلى `main` في ذلك المستودع يغيّر `docs/`. يُنشأ `demo.svg` بالأمر `python3 scripts/demo-svg.py` في مستودع التطبيق (SVG وCSS خالصان، ليعرضهما GitHub).

## الإصدار

```
 ارفع Cargo.toml ─▶ الوسم vX.Y.Z ─┬─▶ Release: crates.io + صورة ghcr.io (amd64 + arm64، مشغّلات أصلية)
                                  └─▶ desktop: المثبّتات ─▶ انشر الإصدار (الأحدث) ─▶ Homebrew: formula + cask
```

1. ارفع `version` في `Cargo.toml` (وفي `desktop/`)، وثبّت التغييرات، وادفع الوسم `vX.Y.Z`. يجب أن يكون الوسم رقميًا لمثبّت Windows MSI. كل ما يلي يعمل دون نقرات إضافية.
2. يُصدر *Release* الحزمة (السر `CARGO_REGISTRY_TOKEN`، والبيئة `crates-io`) وصورة Docker: تدفع مهمة واحدة لكل بنية على مشغّل أصلي (`ubuntu-latest`، و`ubuntu-24.04-arm`) بالـdigest، وتنشئ مهمة `merge` الوسوم متعددة البنى. شغّلها يدويًا بـ`dry_run` للتحقق من نشر الحزمة.
3. يبني *desktop* المثبّتات لـmacOS (arm64، x64)، وWindows، وLinux في إصدار مسودة. عندما تُرفق كلها، تضيف مهمة `publish` ملاحظات الإصدار المُولَّدة، وتنشر الإصدار، وتعلّمه كأحدث إصدار.
4. ثم تستدعي مهمة `homebrew` *Homebrew*، الذي يدفع `Formula/rooftop.rb` و`Casks/irooftop.rb` إلى [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). يحتاج إلى السر `HOMEBREW_TAP_TOKEN` (رمز دقيق النطاق، و`irooftop/homebrew-tap`، وContents: قراءة وكتابة) أو `HOMEBREW_TAP_DEPLOY_KEY`؛ ومن دون أيٍّ منهما تتخطى المهمة مع إشعار. (لا يُطلق الإصدار المنشور بـ`GITHUB_TOKEN` الحدث `release: published`، لذلك يكون الاستدعاء صريحًا؛ نشر الإصدار يدويًا ما زال يُطلق Homebrew عبر ذلك الحدث.)

لإعادة تشغيل تحديث الـtap لوسم موجود، مثلًا بعد إضافة السر:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

يُنشئ `scripts/homebrew-tap.sh vX.Y.Z <نسخة الـtap>` الملفات نفسها محليًا. إذا فشلت مثبّتات وسم ما، فأعد تشغيل مهام *desktop* الفاشلة: تستمر `publish` و`homebrew` عندما تنجح.
