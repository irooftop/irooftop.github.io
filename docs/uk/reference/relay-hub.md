# Хаб ретрансляції

Сервер може бути ретранслятором, який застосунки використовують для спільного доступу через **Інтернет**, як це робить iroof.top.

```
 відвідувач ──▶ https://alex.ваш.домен/s/… ──▶ хаб ══ WebSocket ══▶ застосунок Alex
                                              │
 застосунок ── POST /relay/v1/register {name} ─▶│  імена: хто перший, тому й дістаються
 застосунок ── GET  /relay/v1/connect ════════▶│  одне вихідне з'єднання на застосунок
```

| Сторона | Налаштування |
|---|---|
| Хаб | `ROOFTOP_RELAY_DOMAIN=ваш.домен` (необов'язковий спільний бот: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Застосунки | `ROOFTOP_RELAY_URL=https://ваш.домен`: посилання на `https://<назва>.ваш.домен` |

## Вимоги

* Запис DNS wildcard `*.ваш.домен`, що вказує на сервер.
* Wildcard-сертифікат. З Caddy потрібні виклик DNS-01 і
  [модуль DNS-провайдера](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<провайдер>`).
* Зворотний проксі, який передає `Host` (Caddy робить це типово):

```nginx
*.ваш.домен {
	tls {
		dns <провайдер> …
	}
	reverse_proxy iroof:8080
}
```

## Стартова сторінка на головному домені {#a-splash-page-on-the-main-domain}

На головному домені хаб обслуговує API ретрансляції, власні посилання для спільного доступу та застосунок власника (за `ROOFTOP_PASSWORD`).
iroof.top натомість показує невелику стартову сторінку на `/` з посиланнями на документацію та GitHub, англійською та ще 20 мовами
(`/es/`, `/zh-hans/`, `/ja/`, …; список є на кожній сторінці, а `sitemap.xml` перелічує їх з альтернативами hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) — англійська сторінка;
`python3 scripts/landing-i18n.py` створює з неї інші за перекладами з `scripts/landing-i18n/`. Кожна сторінка — це
один самодостатній файл (без скриптів, шрифтів і запитів до сторонніх сервісів); запитання оформлені нативними елементами `<details>`.
Невідомі посилання `<назва>.ваш.домен` теж потрапляють сюди. Демо застосунку всередині — це [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
вбудований як зображення `data:` командою `python3 scripts/landing-demo.py` (запускайте після зміни `demo.svg`, а потім `scripts/landing-i18n.py`).
Змонтуйте папку в Caddy (`./landing:/srv/landing:ro`) і маршрутизуйте `/`, папки мов і `sitemap.xml`:

```nginx
ваш.домен {
	# Відвідувачі: стартова сторінка. Браузер, який уже надсилає пароль власника, отримує застосунок.
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
	# Інші мови: /es/, /zh-hans/, … (папки, які пише scripts/landing-i18n.py).
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
	# Власник входить на /owner: браузер запитує пароль, продовжує його надсилати, а / відкриває застосунок.
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

Застосунок і далі перевіряє пароль під час кожного запиту власника; співставник лише визначає, хто бачить стартову сторінку.

## Правила

| | |
|---|---|
| API хабу | `/relay/v1/…` на головному домені |
| `<назва>.ваш.домен` | завжди йде до застосунку, що володіє назвою, ніколи до інтерфейсу власника хабу |
| Імена | 3–32 малі літери, цифри і дефіси; деякі (`www`, `api`, `admin`…) зарезервовані |
| Звільнення | після 180 днів без з'єднання |
| Нові імена | обмежені за частотою на IP |
| Володіння | випадковий секрет у `settings.json` застосунку; хаб зберігає лише його SHA-256 |
| Стан | `relay.json` і `relay-telegram.json` у каталозі даних |
