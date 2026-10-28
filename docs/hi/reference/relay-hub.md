# रिले हब

एक सर्वर वह रिले बन सकता है जिसे ऐप **इंटरनेट** शेयरिंग के लिए इस्तेमाल करते हैं, जैसे iroof.top है।

```
 विज़िटर ──▶ https://alex.आपका.डोमेन/s/… ──▶ हब ══ WebSocket ══▶ Alex का ऐप
                                             │
 ऐप ── POST /relay/v1/register {name} ──────▶│  नाम: जो पहले आए, उसे मिले
 ऐप ── GET  /relay/v1/connect ═════════════▶│  हर ऐप के लिए एक आउटगोइंग कनेक्शन
```

| पक्ष | सेटिंग |
|---|---|
| हब | `ROOFTOP_RELAY_DOMAIN=आपका.डोमेन` (वैकल्पिक साझा बॉट: `ROOFTOP_RELAY_BOT_TOKEN`) |
| ऐप | `ROOFTOP_RELAY_URL=https://आपका.डोमेन`: लिंक `https://<नाम>.आपका.डोमेन` पर |

## आवश्यकताएँ

* सर्वर की ओर इशारा करता एक वाइल्डकार्ड DNS रिकॉर्ड `*.आपका.डोमेन`।
* एक वाइल्डकार्ड सर्टिफ़िकेट। Caddy के साथ इसके लिए DNS-01 चैलेंज और एक [DNS प्रदाता मॉड्यूल](https://caddyserver.com/docs/modules/) चाहिए (`xcaddy build --with github.com/caddy-dns/<प्रदाता>`)।
* एक रिवर्स प्रॉक्सी जो `Host` आगे भेजे (Caddy डिफ़ॉल्ट रूप से ऐसा करता है):

```nginx
*.आपका.डोमेन {
	tls {
		dns <प्रदाता> …
	}
	reverse_proxy iroof:8080
}
```

## मुख्य डोमेन पर एक स्प्लैश पेज {#a-splash-page-on-the-main-domain}

मुख्य डोमेन पर हब रिले API, अपने शेयर लिंक, और मालिक का ऐप (`ROOFTOP_PASSWORD` के पीछे) सर्व करता है। iroof.top इसके बजाय `/` पर एक छोटा स्प्लैश पेज दिखाता है, जिसमें दस्तावेज़ और GitHub के लिंक हैं, अंग्रेज़ी में और 20 अन्य भाषाओं में (`/es/`, `/zh-hans/`, `/ja/`, …; सूची हर पेज पर है, और `sitemap.xml` उन्हें hreflang विकल्पों के साथ सूचीबद्ध करता है)। [`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) अंग्रेज़ी पेज है; `python3 scripts/landing-i18n.py` उससे बाकी बनाता है, `scripts/landing-i18n/` के अनुवादों के साथ। हर पेज एक स्व-निहित फ़ाइल है (कोई स्क्रिप्ट, फ़ॉन्ट या तृतीय-पक्ष अनुरोध नहीं); प्रश्न मूल `<details>` तत्व हैं। अज्ञात `<नाम>.आपका.डोमेन` लिंक भी यहीं आते हैं। इसके अंदर का ऐप डेमो [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg) है, जिसे `python3 scripts/landing-demo.py` एक `data:` छवि के रूप में डालता है (`demo.svg` बदलने के बाद चलाएँ, फिर `scripts/landing-i18n.py`)।
फ़ोल्डर को Caddy में माउंट करें (`./landing:/srv/landing:ro`) और `/`, भाषा फ़ोल्डर, और `sitemap.xml` को रूट करें:

```nginx
आपका.डोमेन {
	# विज़िटर: स्प्लैश पेज। जो ब्राउज़र पहले से मालिक का पासवर्ड भेज रहा है, उसे ऐप मिलता है।
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
	# दूसरी भाषाएँ: /es/, /zh-hans/, … (scripts/landing-i18n.py द्वारा लिखे गए फ़ोल्डर)।
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
	# मालिक /owner पर साइन इन करता है: ब्राउज़र पासवर्ड माँगता है, उसे भेजता रहता है, और / ऐप खोलता है।
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

ऐप मालिक के हर अनुरोध पर अब भी पासवर्ड जाँचता है; मैचर केवल तय करता है कि स्प्लैश पेज कौन देखे।

## नियम

| | |
|---|---|
| हब API | मुख्य डोमेन पर `/relay/v1/…` |
| `<नाम>.आपका.डोमेन` | हमेशा उस ऐप तक जाता है जो नाम का मालिक है, कभी हब के मालिक इंटरफ़ेस तक नहीं |
| नाम | 3–32 छोटे अक्षर, अंक और हाइफ़न; कुछ (`www`, `api`, `admin`…) आरक्षित हैं |
| रिलीज़ | 180 दिन बिना कनेक्शन के बाद |
| नए नाम | प्रति IP दर-सीमित |
| स्वामित्व | ऐप के `settings.json` में एक यादृच्छिक सीक्रेट; हब केवल उसका SHA-256 रखता है |
| स्थिति | डेटा डायरेक्टरी में `relay.json` और `relay-telegram.json` |
