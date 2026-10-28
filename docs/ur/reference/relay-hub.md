# ریلے ہب

ایک سرور وہ ریلے ہو سکتا ہے جسے ایپس **انٹرنیٹ** شیئرنگ کے لیے استعمال کرتی ہیں، جیسا کہ iroof.top ہے۔

```
 وزیٹر ──▶ https://alex.your.domain/s/… ──▶ ہب ══ WebSocket ══▶ Alex کی ایپ
                                             │
 ایپ ── POST /relay/v1/register {name} ─────▶│  نام: جو پہلے آئے، اسے پہلے ملے
 ایپ ── GET  /relay/v1/connect ════════════▶│  ہر ایپ کے لیے ایک باہر جانے والا کنکشن
```

| فریق | ترتیب |
|---|---|
| ہب | `ROOFTOP_RELAY_DOMAIN=your.domain` (اختیاری مشترکہ بوٹ: `ROOFTOP_RELAY_BOT_TOKEN`) |
| ایپس | `ROOFTOP_RELAY_URL=https://your.domain`: لنکس `https://<name>.your.domain` پر |

## شرائط

* ایک wildcard DNS ریکارڈ `*.your.domain` جو سرور کی طرف اشارہ کرے۔
* ایک wildcard سرٹیفکیٹ۔ Caddy کے ساتھ اس کے لیے DNS-01 چیلنج اور ایک [DNS provider ماڈیول](https://caddyserver.com/docs/modules/) درکار ہے (`xcaddy build --with github.com/caddy-dns/<provider>`)۔
* ایک ریورس پراکسی جو `Host` کو آگے بھیجے (Caddy ڈیفالٹ طور پر یہ کرتا ہے):

```nginx
*.your.domain {
	tls {
		dns <provider> …
	}
	reverse_proxy iroof:8080
}
```

## مرکزی ڈومین پر ابتدائی صفحہ {#a-splash-page-on-the-main-domain}

مرکزی ڈومین پر ہب ریلے API، اپنے شیئر لنکس، اور مالک کی ایپ (`ROOFTOP_PASSWORD` کے پیچھے) پیش کرتا ہے۔ iroof.top اس کے بجائے `/` پر ایک چھوٹا ابتدائی صفحہ دکھاتا ہے، جس میں دستاویزات اور GitHub کے لنکس ہیں، انگریزی اور 20 دیگر زبانوں میں (`/es/`، `/zh-hans/`، `/ja/`، …؛ فہرست ہر صفحے پر ہے، اور `sitemap.xml` ان کی hreflang متبادل کے ساتھ فہرست دیتا ہے)۔ [`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) انگریزی صفحہ ہے؛ `python3 scripts/landing-i18n.py` باقی کو اسی سے اور `scripts/landing-i18n/` کے ترجموں سے لکھتا ہے۔ ہر صفحہ ایک الگ، خود مختار فائل ہے (کوئی اسکرپٹ، فونٹ یا تیسرے فریق کی درخواست نہیں)؛ سوالات مقامی `<details>` عناصر ہیں۔ نامعلوم `<name>.your.domain` لنکس بھی یہیں پہنچتے ہیں۔ اس میں ایپ کا ڈیمو [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg) ہے، جسے `python3 scripts/landing-demo.py` `data:` تصویر کے طور پر شامل کرتا ہے (`demo.svg` بدلنے کے بعد اسے چلائیں، پھر `scripts/landing-i18n.py`)۔
فولڈر کو Caddy میں ماونٹ کریں (`./landing:/srv/landing:ro`) اور `/`، زبانوں کے فولڈرز اور `sitemap.xml` کو راستہ دیں:

```nginx
your.domain {
	# وزیٹرز: ابتدائی صفحہ۔ جو براؤزر پہلے ہی مالک کا پاس ورڈ بھیجتا ہے اسے ایپ ملتی ہے۔
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
	# دیگر زبانیں: /es/، /zh-hans/، … (وہ فولڈرز جو scripts/landing-i18n.py لکھتا ہے)۔
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
	# مالک /owner سے سائن ان کرتا ہے: براؤزر پاس ورڈ مانگتا ہے، اسے بھیجتا رہتا ہے، اور / ایپ کھولتا ہے۔
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

ایپ ہر مالک کی درخواست پر اب بھی پاس ورڈ چیک کرتی ہے؛ matcher صرف یہ طے کرتا ہے کہ ابتدائی صفحہ کون دیکھے۔

## قواعد

| | |
|---|---|
| ہب API | مرکزی ڈومین پر `/relay/v1/…` |
| `<name>.your.domain` | ہمیشہ اس ایپ کو جاتا ہے جس کے پاس نام ہے، کبھی ہب کے مالک UI کو نہیں |
| نام | 3 تا 32 چھوٹے حروف، ہندسے اور ہائفن؛ کچھ (`www`، `api`، `admin`…) محفوظ ہیں |
| رہائی | 180 دن بغیر کنکشن کے بعد |
| نئے نام | فی IP شرح کی حد |
| ملکیت | ایپ کے `settings.json` میں ایک بے ترتیب راز؛ ہب صرف اس کا SHA-256 رکھتا ہے |
| حالت | ڈیٹا ڈائریکٹری میں `relay.json` اور `relay-telegram.json` |
