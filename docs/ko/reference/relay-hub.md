# 릴레이 허브

서버는 앱이 **인터넷** 공유에 사용하는 릴레이가 될 수 있습니다. iroof.top이 그렇습니다.

```
 방문자 ──▶ https://alex.당신의.도메인/s/… ──▶ 허브 ══ WebSocket ══▶ Alex의 앱
                                             │
 앱 ── POST /relay/v1/register {name} ──────▶│  이름: 먼저 온 사람이 먼저 받음
 앱 ── GET  /relay/v1/connect ═════════════▶│  앱당 송신 연결 하나
```

| 쪽 | 설정 |
|---|---|
| 허브 | `ROOFTOP_RELAY_DOMAIN=당신의.도메인`(선택 사항인 공유 봇: `ROOFTOP_RELAY_BOT_TOKEN`) |
| 앱 | `ROOFTOP_RELAY_URL=https://당신의.도메인`: 링크는 `https://<이름>.당신의.도메인` |

## 요구 사항

* 서버를 가리키는 와일드카드 DNS 레코드 `*.당신의.도메인`.
* 와일드카드 인증서. Caddy로 하려면 DNS-01 검증과 [DNS 공급자 모듈](https://caddyserver.com/docs/modules/)이 필요합니다(`xcaddy build --with github.com/caddy-dns/<공급자>`).
* `Host`를 전달하는 리버스 프록시(Caddy는 기본적으로 그렇게 합니다):

```nginx
*.당신의.도메인 {
	tls {
		dns <공급자> …
	}
	reverse_proxy iroof:8080
}
```

## 메인 도메인의 랜딩 페이지 {#a-splash-page-on-the-main-domain}

메인 도메인에서 허브는 릴레이 API, 자체 공유 링크, 소유자의 앱(`ROOFTOP_PASSWORD` 뒤)을 제공합니다. iroof.top은 대신 `/`에 작은 랜딩 페이지를 보여 주며, 여기에는 문서와 GitHub 링크가 있고, 영어와 20개 다른 언어로 제공됩니다(`/es/`, `/zh-hans/`, `/ja/`, …. 목록은 모든 페이지에 있고, `sitemap.xml`이 hreflang 대안과 함께 나열합니다). [`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html)이 영어 페이지이며, `python3 scripts/landing-i18n.py`가 `scripts/landing-i18n/`의 번역으로 나머지를 만듭니다. 각 페이지는 하나의 자체 완결 파일입니다(스크립트, 글꼴, 제3자 요청 없음). 질문은 기본 `<details>` 요소입니다. 알 수 없는 `<이름>.당신의.도메인` 링크도 여기로 옵니다. 내부의 앱 데모는 [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg)이며, `python3 scripts/landing-demo.py`가 `data:` 이미지로 삽입합니다(`demo.svg`를 바꾼 뒤 실행하고, 이어서 `scripts/landing-i18n.py`를 실행하세요).
폴더를 Caddy에 마운트하고(`./landing:/srv/landing:ro`) `/`, 언어 폴더, `sitemap.xml`을 라우팅하세요.

```nginx
당신의.도메인 {
	# 방문자: 랜딩 페이지. 이미 소유자의 비밀번호를 보내는 브라우저는 앱을 받습니다.
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
	# 다른 언어: /es/, /zh-hans/, … (scripts/landing-i18n.py가 쓰는 폴더).
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
	# 소유자는 /owner에서 로그인합니다: 브라우저가 비밀번호를 묻고, 계속 보내며, /는 앱을 엽니다.
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

앱은 소유자의 요청마다 여전히 비밀번호를 확인합니다. 매처는 랜딩 페이지를 누가 볼지만 결정합니다.

## 규칙

| | |
|---|---|
| 허브 API | 메인 도메인의 `/relay/v1/…` |
| `<이름>.당신의.도메인` | 항상 그 이름을 소유한 앱으로 가며, 허브의 소유자 화면으로는 절대 가지 않음 |
| 이름 | 3–32자의 소문자, 숫자, 하이픈. 일부(`www`, `api`, `admin`…)는 예약됨 |
| 해제 | 180일 동안 연결이 없으면 해제됨 |
| 새 이름 | IP별로 속도 제한 |
| 소유권 | 앱의 `settings.json`에 있는 무작위 비밀. 허브는 그 SHA-256만 저장 |
| 상태 | 데이터 폴더의 `relay.json`과 `relay-telegram.json` |
