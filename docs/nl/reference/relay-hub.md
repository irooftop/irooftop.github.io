# Relayhub

Een server kan de relay zijn die apps gebruiken voor **Internet**-delen, zoals iroof.top dat is.

```
 bezoeker ──▶ https://alex.jouw.domein/s/… ──▶ hub ══ WebSocket ══▶ Alex' app
                                              │
 app ── POST /relay/v1/register {name} ──────▶│  namen: wie het eerst komt, die krijgt ze
 app ── GET  /relay/v1/connect ══════════════▶│  één uitgaande verbinding per app
```

| Kant | Instelling |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=jouw.domein` (optionele gedeelde bot: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Apps | `ROOFTOP_RELAY_URL=https://jouw.domein`: links op `https://<naam>.jouw.domein` |

## Vereisten

* Een wildcard-DNS-record `*.jouw.domein` dat naar de server wijst.
* Een wildcard-certificaat. Met Caddy is daarvoor de DNS-01-uitdaging nodig en een
  [DNS-providermodule](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<provider>`).
* Een reverse proxy die `Host` doorgeeft (Caddy doet dat standaard):

```nginx
*.jouw.domein {
	tls {
		dns <provider> …
	}
	reverse_proxy iroof:8080
}
```

## Een startpagina op het hoofddomein {#a-splash-page-on-the-main-domain}

Op het hoofddomein serveert de hub de relay-API, zijn eigen sharelinks en de app van de eigenaar (achter `ROOFTOP_PASSWORD`).
iroof.top toont in plaats daarvan een kleine startpagina op `/`, met links naar de documentatie en GitHub, in het Engels en 20 andere talen
(`/es/`, `/zh-hans/`, `/ja/`, …; de lijst staat op elke pagina, en `sitemap.xml` somt ze op met hun hreflang-alternatieven).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) is de Engelse pagina;
`python3 scripts/landing-i18n.py` maakt de andere ervan, met de vertalingen uit `scripts/landing-i18n/`. Elke pagina is één
op zichzelf staand bestand (geen scripts, lettertypen of verzoeken naar derden); de vragen zijn native `<details>`-elementen.
Onbekende `<naam>.jouw.domein`-links komen daar ook uit. De demo van de app erin is [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
ingesloten als `data:`-afbeelding door `python3 scripts/landing-demo.py` (draai het na een wijziging aan `demo.svg`, en daarna `scripts/landing-i18n.py`).
Koppel de map in Caddy (`./landing:/srv/landing:ro`) en routeer `/`, de taalmappen en `sitemap.xml`:

```nginx
jouw.domein {
	# Bezoekers: de startpagina. Een browser die het wachtwoord van de eigenaar al stuurt, krijgt de app.
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
	# De andere talen: /es/, /zh-hans/, … (de mappen die scripts/landing-i18n.py schrijft).
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
	# De eigenaar meldt zich aan op /owner: de browser vraagt het wachtwoord, blijft het sturen, en / opent de app.
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

De app controleert het wachtwoord nog steeds bij elk verzoek van de eigenaar; de matcher bepaalt alleen wie de startpagina ziet.

## Regels

| | |
|---|---|
| Hub-API | `/relay/v1/…` op het hoofddomein |
| `<naam>.jouw.domein` | gaat altijd naar de app die de naam bezit, nooit naar de eigenaarsinterface van de hub |
| Namen | 3–32 kleine letters, cijfers en koppeltekens; enkele (`www`, `api`, `admin`…) zijn gereserveerd |
| Vrijgave | na 180 dagen zonder verbinding |
| Nieuwe namen | per IP begrensd |
| Eigendom | een willekeurig geheim in het `settings.json` van de app; de hub bewaart alleen de SHA-256 ervan |
| Staat | `relay.json` en `relay-telegram.json` in de datamap |
