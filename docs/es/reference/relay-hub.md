# Hub de relé

Un servidor puede ser el relé que usan las apps para compartir por **Internet**, como lo es iroof.top.

```
 visitante ──▶ https://alex.tu.dominio/s/… ──▶ hub ══ WebSocket ══▶ app de Alex
                                              │
 app ── POST /relay/v1/register {name} ──────▶│  nombres: el primero que llega, el primero que se sirve
 app ── GET  /relay/v1/connect ══════════════▶│  una conexión saliente por app
```

| Lado | Ajuste |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=tu.dominio` (bot compartido opcional: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Apps | `ROOFTOP_RELAY_URL=https://tu.dominio`: enlaces en `https://<nombre>.tu.dominio` |

## Requisitos

* Un registro DNS comodín `*.tu.dominio` que apunte al servidor.
* Un certificado comodín. Con Caddy requiere el desafío DNS-01 y un
  [módulo de proveedor DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<proveedor>`).
* Un proxy inverso que pase `Host` (Caddy lo hace por defecto):

```nginx
*.tu.dominio {
	tls {
		dns <proveedor> …
	}
	reverse_proxy iroof:8080
}
```

## Una página de inicio en el dominio principal {#a-splash-page-on-the-main-domain}

En el dominio principal, el hub sirve la API del relé, sus propios enlaces para compartir y la app del propietario (protegida por `ROOFTOP_PASSWORD`).
iroof.top muestra en su lugar una pequeña página de inicio en `/`, con enlaces a la documentación y a GitHub, en inglés y en otros 20 idiomas
(`/es/`, `/zh-hans/`, `/ja/`, …; la lista aparece en cada página, y `sitemap.xml` las enumera con sus alternativas hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) es la página en inglés;
`python3 scripts/landing-i18n.py` genera las demás a partir de ella, con las traducciones de `scripts/landing-i18n/`. Cada página es un
único archivo autocontenido (sin scripts, fuentes ni peticiones de terceros); las preguntas son elementos `<details>` nativos.
Los enlaces `<nombre>.tu.dominio` desconocidos también llegan allí. La demo de la app incluida es [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
insertada como imagen `data:` por `python3 scripts/landing-demo.py` (ejecútalo tras cambiar `demo.svg`, y luego `scripts/landing-i18n.py`).
Monta la carpeta en Caddy (`./landing:/srv/landing:ro`) y enruta `/`, las carpetas de idiomas y `sitemap.xml`:

```nginx
tu.dominio {
	# Visitantes: la página de inicio. Un navegador que ya envía la contraseña del propietario obtiene la app.
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
	# Los demás idiomas: /es/, /zh-hans/, … (las carpetas que escribe scripts/landing-i18n.py).
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
	# El propietario inicia sesión en /owner: el navegador pide la contraseña, la sigue enviando, y / abre la app.
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

La app sigue comprobando la contraseña en cada petición del propietario; el filtro solo decide quién ve la página de inicio.

## Reglas

| | |
|---|---|
| API del hub | `/relay/v1/…` en el dominio principal |
| `<nombre>.tu.dominio` | siempre va a la app que posee el nombre, nunca a la interfaz del propietario del hub |
| Nombres | 3–32 letras minúsculas, dígitos y guiones; algunos (`www`, `api`, `admin`…) reservados |
| Liberación | tras 180 días sin conexión |
| Nombres nuevos | limitados por tasa por IP |
| Propiedad | un secreto aleatorio en el `settings.json` de la app; el hub solo guarda su SHA-256 |
| Estado | `relay.json` y `relay-telegram.json` en el directorio de datos |
