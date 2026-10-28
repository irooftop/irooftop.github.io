# リレーハブ

サーバーは、iroof.top と同じように、アプリがインターネット共有に使うリレーになれます。

```
 訪問者 ──▶ https://alex.あなたのドメイン/s/… ──▶ ハブ ══ WebSocket ══▶ Alex のアプリ
                                                 │
 アプリ ── POST /relay/v1/register {name} ────────▶│  名前：早い者勝ち
 アプリ ── GET  /relay/v1/connect ═══════════════▶│  アプリごとに送信接続を 1 つ
```

| 側 | 設定 |
|---|---|
| ハブ | `ROOFTOP_RELAY_DOMAIN=あなたのドメイン`（任意の共有ボット：`ROOFTOP_RELAY_BOT_TOKEN`） |
| アプリ | `ROOFTOP_RELAY_URL=https://あなたのドメイン`：リンクは `https://<名前>.あなたのドメイン` になる |

## 要件

* サーバーを指すワイルドカードの DNS レコード `*.あなたのドメイン`。
* ワイルドカード証明書。Caddy では、DNS-01 チャレンジと [DNS プロバイダーのモジュール](https://caddyserver.com/docs/modules/)が必要です（`xcaddy build --with github.com/caddy-dns/<プロバイダー>`）。
* `Host` を渡すリバースプロキシ（Caddy は既定でそうします）：

```nginx
*.あなたのドメイン {
	tls {
		dns <プロバイダー> …
	}
	reverse_proxy iroof:8080
}
```

## メインドメインのスタートページ {#a-splash-page-on-the-main-domain}

メインドメインでは、ハブはリレー API、独自の共有リンク、所有者のアプリ（`ROOFTOP_PASSWORD` の背後）を提供します。iroof.top では代わりに、`/` に小さなスタートページを表示します。ドキュメントと GitHub へのリンクがあり、英語と 20 の言語で提供されます（`/es/`、`/zh-hans/`、`/ja/`、…。一覧はすべてのページにあり、`sitemap.xml` が hreflang の代替とともに列挙します）。英語のページは [`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) です。`python3 scripts/landing-i18n.py` が、`scripts/landing-i18n/` の翻訳を使って、ほかのページを生成します。各ページは 1 つの自己完結したファイルです（スクリプト、フォント、サードパーティへのリクエストはありません）。質問はネイティブの `<details>` 要素です。未知の `<名前>.あなたのドメイン` のリンクも、ここに届きます。内部のアプリのデモは [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg) で、`python3 scripts/landing-demo.py` が `data:` 画像として埋め込みます（`demo.svg` を変更したあとに実行し、そのあと `scripts/landing-i18n.py` を実行します）。
フォルダを Caddy にマウントし（`./landing:/srv/landing:ro`）、`/`、言語のフォルダ、`sitemap.xml` をルーティングします。

```nginx
あなたのドメイン {
	# 訪問者：スタートページ。すでに所有者のパスワードを送っているブラウザには、アプリを返します。
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
	# そのほかの言語：/es/、/zh-hans/、…（scripts/landing-i18n.py が書くフォルダ）。
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
	# 所有者は /owner でサインインします：ブラウザがパスワードを求め、それを送り続け、/ でアプリが開きます。
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

アプリは所有者のリクエストのたびに、引き続きパスワードを確認します。マッチャーが決めるのは、スタートページを誰が見られるかだけです。

## ルール

| | |
|---|---|
| ハブの API | メインドメインの `/relay/v1/…` |
| `<名前>.あなたのドメイン` | 常に、その名前を所有するアプリに届く。ハブの所有者画面には決して届かない |
| 名前 | 3～32 文字の小文字、数字、ハイフン。一部（`www`、`api`、`admin`…）は予約済み |
| 解放 | 180 日間接続がないと解放される |
| 新しい名前 | IP ごとにレート制限 |
| 所有 | アプリの `settings.json` にあるランダムなシークレット。ハブが保存するのはその SHA-256 だけ |
| 状態 | データフォルダの `relay.json` と `relay-telegram.json` |
