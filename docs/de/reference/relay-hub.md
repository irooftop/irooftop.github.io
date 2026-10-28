# Relay-Hub

Ein Server kann das Relay sein, das Apps für **Internet**-Teilen nutzen, so wie iroof.top.

```
 Besucher ──▶ https://alex.deine.domain/s/… ──▶ Hub ══ WebSocket ══▶ Alex' App
                                              │
 App ── POST /relay/v1/register {name} ──────▶│  Namen: wer zuerst kommt, mahlt zuerst
 App ── GET  /relay/v1/connect ══════════════▶│  eine ausgehende Verbindung pro App
```

| Seite | Einstellung |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=deine.domain` (optionaler geteilter Bot: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Apps | `ROOFTOP_RELAY_URL=https://deine.domain`: Links unter `https://<name>.deine.domain` |

## Voraussetzungen

* Ein DNS-Wildcard-Eintrag `*.deine.domain`, der auf den Server zeigt.
* Ein Wildcard-Zertifikat. Mit Caddy braucht das die DNS-01-Challenge und ein
  [DNS-Provider-Modul](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<provider>`).
* Ein Reverse-Proxy, der `Host` durchreicht (Caddy tut das standardmäßig):

```nginx
*.deine.domain {
	tls {
		dns <provider> …
	}
	reverse_proxy iroof:8080
}
```

## Eine Startseite auf der Hauptdomain {#a-splash-page-on-the-main-domain}

Auf der Hauptdomain liefert der Hub die Relay-API, seine eigenen Share-Links und die App des Eigentümers (hinter `ROOFTOP_PASSWORD`).
iroof.top zeigt stattdessen unter `/` eine kleine Startseite mit Links zur Dokumentation und zu GitHub, auf Englisch und in 20 weiteren Sprachen
(`/es/`, `/zh-hans/`, `/ja/`, …; die Liste steht auf jeder Seite, und `sitemap.xml` führt sie mit ihren hreflang-Alternativen auf).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) ist die englische Seite;
`python3 scripts/landing-i18n.py` erzeugt die anderen daraus, mit den Übersetzungen aus `scripts/landing-i18n/`. Jede Seite ist eine
einzige in sich geschlossene Datei (keine Skripte, Schriften oder Drittanbieter-Anfragen); die Fragen sind native `<details>`-Elemente.
Unbekannte `<name>.deine.domain`-Links landen dort ebenfalls. Die Demo der App darin ist [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
die `python3 scripts/landing-demo.py` als `data:`-Bild einbettet (nach einer Änderung an `demo.svg` ausführen, dann `scripts/landing-i18n.py`).
Binde den Ordner in Caddy ein (`./landing:/srv/landing:ro`) und leite `/`, die Sprachordner und `sitemap.xml` weiter:

```nginx
deine.domain {
	# Besucher: die Startseite. Ein Browser, der bereits das Passwort des Eigentümers sendet, erhält die App.
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
	# Die anderen Sprachen: /es/, /zh-hans/, … (die Ordner, die scripts/landing-i18n.py schreibt).
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
	# Der Eigentümer meldet sich unter /owner an: Der Browser fragt nach dem Passwort, sendet es weiter, und / öffnet die App.
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

Die App prüft das Passwort bei jeder Eigentümer-Anfrage weiterhin selbst; der Matcher entscheidet nur, wer die Startseite sieht.

## Regeln

| | |
|---|---|
| Hub-API | `/relay/v1/…` auf der Hauptdomain |
| `<name>.deine.domain` | geht immer an die App, der der Name gehört, nie an die Eigentümeroberfläche des Hubs |
| Namen | 3–32 Kleinbuchstaben, Ziffern und Bindestriche; einige (`www`, `api`, `admin`…) sind reserviert |
| Freigabe | nach 180 Tagen ohne Verbindung |
| Neue Namen | pro IP ratenbegrenzt |
| Besitz | ein zufälliges Geheimnis in der `settings.json` der App; der Hub speichert nur dessen SHA-256 |
| Zustand | `relay.json` und `relay-telegram.json` im Datenverzeichnis |
