# هاب رله

یک سرور می‌تواند رله‌ای باشد که برنامه‌ها برای اشتراک‌گذاری **اینترنتی** از آن استفاده می‌کنند، مانند iroof.top.

```
 بازدیدکننده ──▶ https://alex.دامنه‌ی.شما/s/… ──▶ هاب ══ WebSocket ══▶ برنامه‌ی Alex
                                                  │
 برنامه ── POST /relay/v1/register {name} ──────▶│  نام‌ها: هرکه اول برسد، اول خدمت می‌بیند
 برنامه ── GET  /relay/v1/connect ══════════════▶│  یک اتصال خروجی برای هر برنامه
```

| طرف | تنظیم |
|---|---|
| هاب | `ROOFTOP_RELAY_DOMAIN=دامنه‌ی.شما` (ربات مشترک اختیاری: `ROOFTOP_RELAY_BOT_TOKEN`) |
| برنامه‌ها | `ROOFTOP_RELAY_URL=https://دامنه‌ی.شما`: پیوندها در `https://<نام>.دامنه‌ی.شما` |

## پیش‌نیازها

* یک رکورد DNS از نوع wildcard، `*.دامنه‌ی.شما`، که به سرور اشاره کند.
* یک گواهی wildcard. با Caddy به چالش DNS-01 و یک [ماژول ارائه‌دهنده‌ی DNS](https://caddyserver.com/docs/modules/) نیاز دارد (`xcaddy build --with github.com/caddy-dns/<ارائه‌دهنده>`).
* یک پروکسی معکوس که `Host` را منتقل کند (Caddy به‌طور پیش‌فرض این کار را می‌کند):

```nginx
*.دامنه‌ی.شما {
	tls {
		dns <ارائه‌دهنده> …
	}
	reverse_proxy iroof:8080
}
```

## صفحه‌ی معرفی روی دامنه‌ی اصلی {#a-splash-page-on-the-main-domain}

روی دامنه‌ی اصلی، هاب API رله، پیوندهای اشتراک‌گذاری خودش، و برنامه‌ی مالک (پشت `ROOFTOP_PASSWORD`) را سرویس می‌دهد. iroof.top به‌جای آن یک صفحه‌ی معرفی کوچک روی `/` نشان می‌دهد، با پیوندهایی به مستندات و GitHub، به انگلیسی و ۲۰ زبان دیگر (`/es/`، `/zh-hans/`، `/ja/`، …؛ فهرست در هر صفحه هست، و `sitemap.xml` آن‌ها را با جایگزین‌های hreflang فهرست می‌کند). [`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) صفحه‌ی انگلیسی است؛ `python3 scripts/landing-i18n.py` بقیه را از آن و با ترجمه‌های `scripts/landing-i18n/` می‌سازد. هر صفحه یک فایل مستقل است (بدون اسکریپت، فونت یا درخواست شخص ثالث)؛ پرسش‌ها عناصر بومی `<details>` هستند. نام‌های ناشناخته‌ی `<نام>.دامنه‌ی.شما` هم به اینجا می‌رسند. دموی برنامه داخل آن [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg) است که `python3 scripts/landing-demo.py` به‌صورت تصویر `data:` جاسازی می‌کند (بعد از تغییر `demo.svg` اجرا کنید، سپس `scripts/landing-i18n.py`).
پوشه را به Caddy وصل کنید (`./landing:/srv/landing:ro`) و `/`، پوشه‌های زبان و `sitemap.xml` را مسیریابی کنید:

```nginx
دامنه‌ی.شما {
	# بازدیدکنندگان: صفحه‌ی معرفی. مرورگری که از قبل رمز مالک را می‌فرستد، برنامه را دریافت می‌کند.
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
	# زبان‌های دیگر: /es/، /zh-hans/، … (پوشه‌هایی که scripts/landing-i18n.py می‌نویسد).
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
	# مالک در /owner وارد می‌شود: مرورگر رمز را می‌خواهد، آن را می‌فرستد، و / برنامه را باز می‌کند.
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

برنامه هنوز در هر درخواست مالک رمز را بررسی می‌کند؛ تطبیق‌دهنده فقط تعیین می‌کند چه کسی صفحه‌ی معرفی را می‌بیند.

## قواعد

| | |
|---|---|
| API هاب | `/relay/v1/…` روی دامنه‌ی اصلی |
| `<نام>.دامنه‌ی.شما` | همیشه به برنامه‌ای می‌رود که نام را دارد، هرگز به رابط مالک هاب |
| نام‌ها | ۳ تا ۳۲ حرف کوچک، رقم و خط‌تیره؛ برخی (`www`، `api`، `admin`…) رزرو شده‌اند |
| آزادسازی | بعد از ۱۸۰ روز بدون اتصال |
| نام‌های جدید | محدودیت نرخ برای هر IP |
| مالکیت | یک رمز تصادفی در `settings.json` برنامه؛ هاب فقط SHA-256 آن را نگه می‌دارد |
| وضعیت | `relay.json` و `relay-telegram.json` در پوشه‌ی داده |
