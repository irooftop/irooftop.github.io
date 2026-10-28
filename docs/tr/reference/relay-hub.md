# Aktarıcı merkezi

Bir sunucu, iroof.top'ın yaptığı gibi uygulamaların **İnternet** paylaşımı için kullandığı aktarıcı olabilir.

```
 ziyaretçi ──▶ https://alex.alanadiniz.com/s/… ──▶ merkez ══ WebSocket ══▶ Alex'in uygulaması
                                                  │
 uygulama ── POST /relay/v1/register {name} ─────▶│  adlar: ilk gelen ilk hizmet alır
 uygulama ── GET  /relay/v1/connect ═════════════▶│  uygulama başına tek giden bağlantı
```

| Taraf | Ayar |
|---|---|
| Merkez | `ROOFTOP_RELAY_DOMAIN=alanadiniz.com` (isteğe bağlı paylaşılan bot: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Uygulamalar | `ROOFTOP_RELAY_URL=https://alanadiniz.com`: bağlantılar `https://<ad>.alanadiniz.com` adresinde |

## Gereksinimler

* Sunucuya işaret eden bir `*.alanadiniz.com` joker DNS kaydı.
* Bir joker sertifika. Caddy ile bunun için DNS-01 sınaması ve bir
  [DNS sağlayıcı modülü](https://caddyserver.com/docs/modules/) gerekir (`xcaddy build --with github.com/caddy-dns/<sağlayıcı>`).
* `Host` değerini ileten bir ters vekil (Caddy varsayılan olarak bunu yapar):

```nginx
*.alanadiniz.com {
	tls {
		dns <sağlayıcı> …
	}
	reverse_proxy iroof:8080
}
```

## Ana alan adında bir karşılama sayfası {#a-splash-page-on-the-main-domain}

Ana alan adında merkez, aktarıcı API'sini, kendi paylaşım bağlantılarını ve sahibin uygulamasını (`ROOFTOP_PASSWORD` arkasında) sunar.
iroof.top bunun yerine `/` adresinde, belgelere ve GitHub'a bağlantılar içeren küçük bir karşılama sayfası gösterir; İngilizce ve 20 başka dilde
(`/es/`, `/zh-hans/`, `/ja/`, …; liste her sayfada bulunur ve `sitemap.xml` bunları hreflang alternatifleriyle listeler).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) İngilizce sayfadır;
`python3 scripts/landing-i18n.py` diğerlerini `scripts/landing-i18n/` içindeki çevirilerden üretir. Her sayfa tek ve kendi kendine yeten bir dosyadır
(betik, yazı tipi ya da üçüncü taraf isteği yok); sorular yerel `<details>` öğeleridir.
Bilinmeyen `<ad>.alanadiniz.com` bağlantıları da buraya düşer. İçindeki uygulama demosu [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg)'dir;
`python3 scripts/landing-demo.py` ile bir `data:` görseli olarak gömülür (`demo.svg` değiştikten sonra çalıştırın, ardından `scripts/landing-i18n.py`).
Klasörü Caddy'ye bağlayın (`./landing:/srv/landing:ro`) ve `/`, dil klasörlerini ve `sitemap.xml`'i yönlendirin:

```nginx
alanadiniz.com {
	# Ziyaretçiler: karşılama sayfası. Sahibin parolasını zaten gönderen bir tarayıcı uygulamayı alır.
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
	# Diğer diller: /es/, /zh-hans/, … (scripts/landing-i18n.py tarafından yazılan klasörler).
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
	# Sahip /owner adresinden giriş yapar: tarayıcı parolayı ister, göndermeye devam eder ve / uygulamayı açar.
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

Uygulama her sahip isteğinde parolayı yine denetler; eşleştirici yalnızca karşılama sayfasını kimin göreceğini belirler.

## Kurallar

| | |
|---|---|
| Merkez API'si | ana alan adında `/relay/v1/…` |
| `<ad>.alanadiniz.com` | her zaman adın sahibi uygulamaya gider, asla merkezin sahip arayüzüne değil |
| Adlar | 3–32 küçük harf, rakam ve kısa çizgi; bazıları (`www`, `api`, `admin`…) ayrılmıştır |
| Serbest bırakma | 180 gün bağlantı olmadan sonra |
| Yeni adlar | IP başına hız sınırlı |
| Sahiplik | uygulamanın `settings.json` dosyasında rastgele bir sır; merkez yalnızca onun SHA-256 özetini saklar |
| Durum | veri klasöründeki `relay.json` ve `relay-telegram.json` |
