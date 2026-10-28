# Hub de relay

Um servidor pode ser o relay que os apps usam para o compartilhamento pela **Internet**, como o iroof.top é.

```
 visitante ──▶ https://alex.seu.dominio/s/… ──▶ hub ══ WebSocket ══▶ app da Alex
                                              │
 app ── POST /relay/v1/register {name} ──────▶│  nomes: quem chega primeiro é atendido primeiro
 app ── GET  /relay/v1/connect ══════════════▶│  uma conexão de saída por app
```

| Lado | Configuração |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=seu.dominio` (bot compartilhado opcional: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Apps | `ROOFTOP_RELAY_URL=https://seu.dominio`: links em `https://<nome>.seu.dominio` |

## Requisitos

* Um registro DNS curinga `*.seu.dominio` apontando para o servidor.
* Um certificado curinga. Com o Caddy, isso exige o desafio DNS-01 e um
  [módulo de provedor DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<provedor>`).
* Um proxy reverso que repasse o `Host` (o Caddy faz isso por padrão):

```nginx
*.seu.dominio {
	tls {
		dns <provedor> …
	}
	reverse_proxy iroof:8080
}
```

## Uma página inicial no domínio principal {#a-splash-page-on-the-main-domain}

No domínio principal, o hub serve a API do relay, os próprios links de compartilhamento e o app do proprietário (protegido por `ROOFTOP_PASSWORD`).
O iroof.top mostra uma pequena página inicial em `/`, com links para a documentação e o GitHub, em inglês e em outros 20 idiomas
(`/es/`, `/zh-hans/`, `/ja/`, …; a lista aparece em todas as páginas, e o `sitemap.xml` as lista com suas alternativas hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) é a página em inglês;
`python3 scripts/landing-i18n.py` gera as demais a partir dela, com as traduções de `scripts/landing-i18n/`. Cada página é um
único arquivo autocontido (sem scripts, fontes ou requisições de terceiros); as perguntas são elementos `<details>` nativos.
Links `<nome>.seu.dominio` desconhecidos também caem ali. A demonstração do app dentro dela é o [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
incorporado como imagem `data:` por `python3 scripts/landing-demo.py` (execute após mudar o `demo.svg`, depois o `scripts/landing-i18n.py`).
Monte a pasta no Caddy (`./landing:/srv/landing:ro`) e roteie `/`, as pastas de idiomas e o `sitemap.xml`:

```nginx
seu.dominio {
	# Visitantes: a página inicial. Um navegador que já envia a senha do proprietário recebe o app.
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
	# Os outros idiomas: /es/, /zh-hans/, … (as pastas escritas por scripts/landing-i18n.py).
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
	# O proprietário entra em /owner: o navegador pede a senha, continua enviando, e / abre o app.
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

O app ainda verifica a senha em cada requisição do proprietário; o matcher só decide quem vê a página inicial.

## Regras

| | |
|---|---|
| API do hub | `/relay/v1/…` no domínio principal |
| `<nome>.seu.dominio` | sempre vai para o app que possui o nome, nunca para a interface do proprietário do hub |
| Nomes | 3–32 letras minúsculas, dígitos e hífens; alguns (`www`, `api`, `admin`…) reservados |
| Liberação | após 180 dias sem conexão |
| Nomes novos | limitados por taxa por IP |
| Posse | um segredo aleatório no `settings.json` do app; o hub guarda apenas o SHA-256 dele |
| Estado | `relay.json` e `relay-telegram.json` na pasta de dados |
