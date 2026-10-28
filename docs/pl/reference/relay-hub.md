# Hub przekaźnika

Serwer może być przekaźnikiem, którego aplikacje używają do udostępniania przez **Internet**, tak jak iroof.top.

```
 odwiedzający ──▶ https://alex.twoja.domena/s/… ──▶ hub ══ WebSocket ══▶ aplikacja Alex
                                                  │
 aplikacja ── POST /relay/v1/register {name} ────▶│  nazwy: kto pierwszy, ten dostaje
 aplikacja ── GET  /relay/v1/connect ════════════▶│  jedno wychodzące połączenie na aplikację
```

| Strona | Ustawienie |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=twoja.domena` (opcjonalny wspólny bot: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Aplikacje | `ROOFTOP_RELAY_URL=https://twoja.domena`: linki w `https://<nazwa>.twoja.domena` |

## Wymagania

* Rekord DNS wildcard `*.twoja.domena` wskazujący na serwer.
* Certyfikat wildcard. Przy Caddy wymaga to wyzwania DNS-01 i
  [modułu dostawcy DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<dostawca>`).
* Odwrotne proxy, które przekazuje `Host` (Caddy robi to domyślnie):

```nginx
*.twoja.domena {
	tls {
		dns <dostawca> …
	}
	reverse_proxy iroof:8080
}
```

## Strona startowa na domenie głównej {#a-splash-page-on-the-main-domain}

Na domenie głównej hub obsługuje API przekaźnika, własne linki udostępniania i aplikację właściciela (za `ROOFTOP_PASSWORD`).
iroof.top pokazuje zamiast tego małą stronę startową pod `/`, z linkami do dokumentacji i GitHuba, po angielsku i w 20 innych językach
(`/es/`, `/zh-hans/`, `/ja/`, …; lista jest na każdej stronie, a `sitemap.xml` wymienia je z alternatywami hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) to strona angielska;
`python3 scripts/landing-i18n.py` tworzy z niej pozostałe, na podstawie tłumaczeń w `scripts/landing-i18n/`. Każda strona to
pojedynczy samodzielny plik (bez skryptów, czcionek i żądań do zewnętrznych usług); pytania to natywne elementy `<details>`.
Nieznane linki `<nazwa>.twoja.domena` też tu trafiają. Demo aplikacji w środku to [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
wstawiane jako obraz `data:` przez `python3 scripts/landing-demo.py` (uruchom po zmianie `demo.svg`, a potem `scripts/landing-i18n.py`).
Zamontuj folder w Caddy (`./landing:/srv/landing:ro`) i skieruj `/`, foldery języków i `sitemap.xml`:

```nginx
twoja.domena {
	# Odwiedzający: strona startowa. Przeglądarka, która już wysyła hasło właściciela, dostaje aplikację.
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
	# Pozostałe języki: /es/, /zh-hans/, … (foldery zapisywane przez scripts/landing-i18n.py).
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
	# Właściciel loguje się pod /owner: przeglądarka pyta o hasło, nadal je wysyła, a / otwiera aplikację.
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

Aplikacja nadal sprawdza hasło przy każdym żądaniu właściciela; matcher decyduje tylko, kto widzi stronę startową.

## Zasady

| | |
|---|---|
| API huba | `/relay/v1/…` na domenie głównej |
| `<nazwa>.twoja.domena` | zawsze trafia do aplikacji, która posiada nazwę, nigdy do interfejsu właściciela huba |
| Nazwy | 3–32 małe litery, cyfry i myślniki; niektóre (`www`, `api`, `admin`…) zarezerwowane |
| Zwolnienie | po 180 dniach bez połączenia |
| Nowe nazwy | ograniczone liczbowo na IP |
| Własność | losowy sekret w `settings.json` aplikacji; hub przechowuje tylko jego SHA-256 |
| Stan | `relay.json` i `relay-telegram.json` w katalogu danych |
