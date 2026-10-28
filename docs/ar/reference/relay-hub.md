# محور الترحيل

يمكن للخادم أن يكون الترحيل الذي تستخدمه التطبيقات للمشاركة عبر **الإنترنت**، كما هو الحال مع iroof.top.

```
 الزائر ──▶ https://alex.نطاقك.com/s/… ──▶ المحور ══ WebSocket ══▶ تطبيق Alex
                                          │
 التطبيق ── POST /relay/v1/register {name} ─▶│  الأسماء: من يصل أولًا يُخدم أولًا
 التطبيق ── GET  /relay/v1/connect ═════════▶│  اتصال صادر واحد لكل تطبيق
```

| الطرف | الإعداد |
|---|---|
| المحور | `ROOFTOP_RELAY_DOMAIN=نطاقك.com` (بوت مشترك اختياري: `ROOFTOP_RELAY_BOT_TOKEN`) |
| التطبيقات | `ROOFTOP_RELAY_URL=https://نطاقك.com`: الروابط على `https://<الاسم>.نطاقك.com` |

## المتطلبات

* سجل DNS من نوع wildcard `*.نطاقك.com` يشير إلى الخادم.
* شهادة wildcard. مع Caddy يتطلب ذلك تحدي DNS-01 و[وحدة مزوّد DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<المزوّد>`).
* وكيل عكسي يمرّر `Host` (يفعل Caddy ذلك افتراضيًا):

```nginx
*.نطاقك.com {
	tls {
		dns <المزوّد> …
	}
	reverse_proxy iroof:8080
}
```

## صفحة ترحيبية على النطاق الرئيسي {#a-splash-page-on-the-main-domain}

على النطاق الرئيسي، يقدّم المحور واجهة الترحيل، وروابط المشاركة الخاصة به، وتطبيق المالك (خلف `ROOFTOP_PASSWORD`). يعرض iroof.top بدلًا من ذلك صفحة ترحيبية صغيرة على `/`، تحتوي على روابط للوثائق وGitHub، بالإنجليزية وبـ20 لغة أخرى (`/es/`، و`/zh-hans/`، و`/ja/`، …؛ القائمة موجودة في كل صفحة، و`sitemap.xml` يسردها مع بدائل hreflang). [`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) هي الصفحة الإنجليزية؛ ويولّد `python3 scripts/landing-i18n.py` البقية منها، بالترجمات الموجودة في `scripts/landing-i18n/`. كل صفحة ملف مستقل بذاته (دون نصوص برمجية أو خطوط أو طلبات لأطراف ثالثة)؛ والأسئلة عناصر `<details>` الأصلية. تصل الروابط غير المعروفة `<الاسم>.نطاقك.com` إلى هنا أيضًا. العرض التوضيحي للتطبيق بداخلها هو [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg)، ويُضمَّن كصورة `data:` بالأمر `python3 scripts/landing-demo.py` (شغّله بعد تغيير `demo.svg`، ثم `scripts/landing-i18n.py`).
ركّب المجلد في Caddy (`./landing:/srv/landing:ro`) ووجّه `/` ومجلدات اللغات و`sitemap.xml`:

```nginx
نطاقك.com {
	# الزوار: الصفحة الترحيبية. المتصفح الذي يرسل كلمة مرور المالك بالفعل يحصل على التطبيق.
	@landing {
		method GET HEAD
		path / /index.html
		not header Authorization *
	}
	handle @landing {
		root * /srv/landing
		rewrite * /index.html
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	# اللغات الأخرى: /es/، و/zh-hans/، … (المجلدات التي يكتبها scripts/landing-i18n.py).
	@languages {
		method GET HEAD
		path_regexp lang ^/(es|zh-hans|hi|ar|fr|bn|pt-br|ru|ur|id|de|ja|tr|ko|vi|it|pl|uk|nl|fa)(/|/index\.html)?$
		not header Authorization *
	}
	handle @languages {
		root * /srv/landing
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	handle /sitemap.xml {
		root * /srv/landing
		file_server
	}
	# يسجّل المالك الدخول عند /owner: يطلب المتصفح كلمة المرور، ويواصل إرسالها، والمسار / يفتح التطبيق.
	handle /owner {
		@anon not header Authorization *
		handle @anon {
			header WWW-Authenticate "Basic realm=\"iRoof.top\""
			respond "Sign in to open the app" 401
		}
		handle {
			redir * / 302
		}
	}
	handle {
		reverse_proxy iroof:8080
	}
}
```

يتحقق التطبيق من كلمة المرور في كل طلب للمالك؛ والمطابِق يحدد فقط من يرى الصفحة الترحيبية.

## القواعد

| | |
|---|---|
| واجهة المحور | `/relay/v1/…` على النطاق الرئيسي |
| `<الاسم>.نطاقك.com` | يذهب دائمًا إلى التطبيق الذي يملك الاسم، ولا يذهب أبدًا إلى واجهة مالك المحور |
| الأسماء | من 3 إلى 32 حرفًا صغيرًا وأرقامًا وشرطات؛ بعضها (`www`، و`api`، و`admin`…) محجوز |
| التحرير | بعد 180 يومًا دون اتصال |
| الأسماء الجديدة | محدودة بالمعدل لكل IP |
| الملكية | سر عشوائي في `settings.json` الخاص بالتطبيق؛ يخزّن المحور تجزئة SHA-256 له فقط |
| الحالة | `relay.json` و`relay-telegram.json` في مجلد البيانات |
