# রিলে হাব

একটি সার্ভার সেই রিলে হতে পারে যা অ্যাপগুলো **ইন্টারনেট** শেয়ারিংয়ের জন্য ব্যবহার করে, যেমন iroof.top।

```
 ভিজিটর ──▶ https://alex.আপনার.ডোমেইন/s/… ──▶ হাব ══ WebSocket ══▶ Alex-এর অ্যাপ
                                              │
 অ্যাপ ── POST /relay/v1/register {name} ────▶│  নাম: যে আগে আসে, সে পায়
 অ্যাপ ── GET  /relay/v1/connect ════════════▶│  প্রতি অ্যাপে একটি বহির্গামী সংযোগ
```

| দিক | সেটিং |
|---|---|
| হাব | `ROOFTOP_RELAY_DOMAIN=আপনার.ডোমেইন` (ঐচ্ছিক শেয়ার করা বট: `ROOFTOP_RELAY_BOT_TOKEN`) |
| অ্যাপ | `ROOFTOP_RELAY_URL=https://আপনার.ডোমেইন`: লিংক `https://<নাম>.আপনার.ডোমেইন`-এ |

## প্রয়োজনীয়তা

* সার্ভারের দিকে নির্দেশ করা একটি ওয়াইল্ডকার্ড DNS রেকর্ড `*.আপনার.ডোমেইন`।
* একটি ওয়াইল্ডকার্ড সার্টিফিকেট। Caddy দিয়ে এর জন্য DNS-01 চ্যালেঞ্জ ও একটি [DNS প্রদানকারী মডিউল](https://caddyserver.com/docs/modules/) লাগে (`xcaddy build --with github.com/caddy-dns/<প্রদানকারী>`)।
* একটি রিভার্স প্রক্সি যা `Host` পাঠায় (Caddy ডিফল্টভাবে এটি করে):

```nginx
*.আপনার.ডোমেইন {
	tls {
		dns <প্রদানকারী> …
	}
	reverse_proxy iroof:8080
}
```

## মূল ডোমেইনে একটি স্প্ল্যাশ পেজ {#a-splash-page-on-the-main-domain}

মূল ডোমেইনে হাব রিলে API, তার নিজস্ব শেয়ার লিংক, ও মালিকের অ্যাপ (`ROOFTOP_PASSWORD`-এর পেছনে) পরিবেশন করে। iroof.top বরং `/`-এ একটি ছোট স্প্ল্যাশ পেজ দেখায়, যাতে ডকুমেন্টেশন ও GitHub-এর লিংক আছে, ইংরেজি এবং অন্য ২০টি ভাষায় (`/es/`, `/zh-hans/`, `/ja/`, …; তালিকাটি প্রতিটি পেজে থাকে, এবং `sitemap.xml` hreflang বিকল্পসহ সেগুলো তালিকাভুক্ত করে)। [`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) ইংরেজি পেজ; `python3 scripts/landing-i18n.py` `scripts/landing-i18n/`-এর অনুবাদ দিয়ে এটি থেকে বাকিগুলো তৈরি করে। প্রতিটি পেজ একটি স্বয়ংসম্পূর্ণ ফাইল (কোনো স্ক্রিপ্ট, ফন্ট বা তৃতীয়-পক্ষের অনুরোধ নেই); প্রশ্নগুলো নেটিভ `<details>` উপাদান। অজানা `<নাম>.আপনার.ডোমেইন` লিংকগুলোও এখানে আসে। এর ভেতরের অ্যাপ ডেমো হলো [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg), যা `python3 scripts/landing-demo.py` একটি `data:` ছবি হিসেবে এমবেড করে (`demo.svg` বদলানোর পর চালান, তারপর `scripts/landing-i18n.py`)।
ফোল্ডারটি Caddy-তে মাউন্ট করুন (`./landing:/srv/landing:ro`) এবং `/`, ভাষার ফোল্ডার, ও `sitemap.xml` রাউট করুন:

```nginx
আপনার.ডোমেইন {
	# ভিজিটর: স্প্ল্যাশ পেজ। যে ব্রাউজার ইতিমধ্যে মালিকের পাসওয়ার্ড পাঠায়, সে অ্যাপ পায়।
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
	# অন্য ভাষাগুলো: /es/, /zh-hans/, … (scripts/landing-i18n.py দ্বারা লেখা ফোল্ডার)।
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
	# মালিক /owner-এ সাইন ইন করে: ব্রাউজার পাসওয়ার্ড চায়, সেটি পাঠাতে থাকে, এবং / অ্যাপ খোলে।
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

অ্যাপ মালিকের প্রতিটি অনুরোধে এখনো পাসওয়ার্ড যাচাই করে; ম্যাচার শুধু ঠিক করে স্প্ল্যাশ পেজ কে দেখবে।

## নিয়মাবলি

| | |
|---|---|
| হাব API | মূল ডোমেইনে `/relay/v1/…` |
| `<নাম>.আপনার.ডোমেইন` | সর্বদা নামের মালিক অ্যাপে যায়, হাবের মালিকের ইন্টারফেসে কখনো নয় |
| নাম | ৩–৩২টি ছোট হাতের অক্ষর, সংখ্যা ও হাইফেন; কিছু (`www`, `api`, `admin`…) সংরক্ষিত |
| মুক্তি | ১৮০ দিন সংযোগ না থাকলে |
| নতুন নাম | প্রতি IP-তে হার-সীমিত |
| মালিকানা | অ্যাপের `settings.json`-এ একটি এলোমেলো সিক্রেট; হাব শুধু এর SHA-256 রাখে |
| অবস্থা | ডেটা ডিরেক্টরিতে `relay.json` ও `relay-telegram.json` |
