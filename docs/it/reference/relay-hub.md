# Hub relay

Un server può essere il relay che le app usano per la condivisione **Internet**, come lo è iroof.top.

```
 visitatore ──▶ https://alex.tuo.dominio/s/… ──▶ hub ══ WebSocket ══▶ app di Alex
                                              │
 app ── POST /relay/v1/register {name} ──────▶│  nomi: chi arriva primo, viene servito per primo
 app ── GET  /relay/v1/connect ══════════════▶│  una connessione in uscita per app
```

| Lato | Impostazione |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=tuo.dominio` (bot condiviso facoltativo: `ROOFTOP_RELAY_BOT_TOKEN`) |
| App | `ROOFTOP_RELAY_URL=https://tuo.dominio`: link su `https://<nome>.tuo.dominio` |

## Requisiti

* Un record DNS wildcard `*.tuo.dominio` che punta al server.
* Un certificato wildcard. Con Caddy serve la sfida DNS-01 e un
  [modulo per il provider DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<provider>`).
* Un reverse proxy che inoltri `Host` (Caddy lo fa per impostazione predefinita):

```nginx
*.tuo.dominio {
	tls {
		dns <provider> …
	}
	reverse_proxy iroof:8080
}
```

## Una pagina iniziale sul dominio principale {#a-splash-page-on-the-main-domain}

Sul dominio principale l'hub serve l'API del relay, i propri link di condivisione e l'app del proprietario (protetta da `ROOFTOP_PASSWORD`).
iroof.top mostra invece una piccola pagina iniziale su `/`, con link alla documentazione e a GitHub, in inglese e in altre 20 lingue
(`/es/`, `/zh-hans/`, `/ja/`, …; l'elenco è in ogni pagina, e `sitemap.xml` le elenca con le alternative hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) è la pagina in inglese;
`python3 scripts/landing-i18n.py` genera le altre a partire da essa, con le traduzioni in `scripts/landing-i18n/`. Ogni pagina è un
unico file autonomo (nessuno script, font o richiesta a terzi); le domande sono elementi `<details>` nativi.
Anche i link `<nome>.tuo.dominio` sconosciuti finiscono lì. La demo dell'app al suo interno è [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
incorporata come immagine `data:` da `python3 scripts/landing-demo.py` (eseguilo dopo aver cambiato `demo.svg`, poi `scripts/landing-i18n.py`).
Monta la cartella in Caddy (`./landing:/srv/landing:ro`) e instrada `/`, le cartelle delle lingue e `sitemap.xml`:

```nginx
tuo.dominio {
	# Visitatori: la pagina iniziale. Un browser che invia già la password del proprietario riceve l'app.
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
	# Le altre lingue: /es/, /zh-hans/, … (le cartelle scritte da scripts/landing-i18n.py).
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
	# Il proprietario accede da /owner: il browser chiede la password, la invia di nuovo, e / apre l'app.
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

L'app verifica ancora la password a ogni richiesta del proprietario; il matcher decide solo chi vede la pagina iniziale.

## Regole

| | |
|---|---|
| API dell'hub | `/relay/v1/…` sul dominio principale |
| `<nome>.tuo.dominio` | va sempre all'app che possiede il nome, mai all'interfaccia del proprietario dell'hub |
| Nomi | 3–32 lettere minuscole, cifre e trattini; alcuni (`www`, `api`, `admin`…) riservati |
| Rilascio | dopo 180 giorni senza connessione |
| Nomi nuovi | limitati per IP |
| Proprietà | un segreto casuale nel `settings.json` dell'app; l'hub conserva solo il suo SHA-256 |
| Stato | `relay.json` e `relay-telegram.json` nella cartella dati |
