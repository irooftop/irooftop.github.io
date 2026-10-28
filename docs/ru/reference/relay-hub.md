# Хаб ретрансляции

Сервер может быть ретранслятором, который приложения используют для общего доступа через **Интернет**, как это делает iroof.top.

```
 посетитель ──▶ https://alex.ваш.домен/s/… ──▶ хаб ══ WebSocket ══▶ приложение Алекс
                                              │
 приложение ── POST /relay/v1/register {name} ─▶│  имена: кто первый, тому и достаются
 приложение ── GET  /relay/v1/connect ════════▶│  одно исходящее соединение на приложение
```

| Сторона | Настройка |
|---|---|
| Хаб | `ROOFTOP_RELAY_DOMAIN=ваш.домен` (необязательный общий бот: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Приложения | `ROOFTOP_RELAY_URL=https://ваш.домен`: ссылки вида `https://<имя>.ваш.домен` |

## Требования

* Wildcard-запись DNS `*.ваш.домен`, указывающая на сервер.
* Wildcard-сертификат. С Caddy для этого нужен вызов DNS-01 и
  [модуль DNS-провайдера](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<провайдер>`).
* Обратный прокси, который передаёт `Host` (Caddy делает это по умолчанию):

```nginx
*.ваш.домен {
	tls {
		dns <провайдер> …
	}
	reverse_proxy iroof:8080
}
```

## Стартовая страница на основном домене {#a-splash-page-on-the-main-domain}

На основном домене хаб отдаёт API ретрансляции, собственные ссылки для общего доступа и приложение владельца (за `ROOFTOP_PASSWORD`).
iroof.top вместо этого показывает небольшую стартовую страницу на `/` со ссылками на документацию и GitHub, на английском и ещё на 20 языках
(`/es/`, `/zh-hans/`, `/ja/`, …; список есть на каждой странице, а `sitemap.xml` перечисляет их с альтернативами hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) — английская страница;
`python3 scripts/landing-i18n.py` создаёт остальные из неё, с переводами из `scripts/landing-i18n/`. Каждая страница — это
один самодостаточный файл (без скриптов, шрифтов и запросов к сторонним сервисам); вопросы оформлены нативными элементами `<details>`.
Неизвестные ссылки `<имя>.ваш.домен` тоже попадают сюда. Демонстрация приложения внутри — это [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
встроенный как изображение `data:` командой `python3 scripts/landing-demo.py` (запускайте после изменения `demo.svg`, затем `scripts/landing-i18n.py`).
Смонтируйте папку в Caddy (`./landing:/srv/landing:ro`) и настройте маршруты для `/`, папок языков и `sitemap.xml`:

```nginx
ваш.домен {
	# Посетители: стартовая страница. Браузер, который уже отправляет пароль владельца, получает приложение.
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
	# Остальные языки: /es/, /zh-hans/, … (папки, которые пишет scripts/landing-i18n.py).
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
	# Владелец входит на /owner: браузер запрашивает пароль, продолжает его отправлять, а / открывает приложение.
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

Приложение по-прежнему проверяет пароль при каждом запросе владельца; матчер только решает, кто видит стартовую страницу.

## Правила

| | |
|---|---|
| API хаба | `/relay/v1/…` на основном домене |
| `<имя>.ваш.домен` | всегда идёт к приложению, которое владеет именем, и никогда к интерфейсу владельца хаба |
| Имена | 3–32 строчные буквы, цифры и дефисы; некоторые (`www`, `api`, `admin`…) зарезервированы |
| Освобождение | после 180 дней без соединения |
| Новые имена | ограничены по частоте с IP |
| Владение | случайный секрет в `settings.json` приложения; хаб хранит только его SHA-256 |
| Состояние | `relay.json` и `relay-telegram.json` в каталоге данных |
