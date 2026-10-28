# 中继服务器

服务器可以成为应用用于**互联网**分享的中继，就像 iroof.top 一样。

```
 访客 ──▶ https://alex.你的域名/s/… ──▶ 服务器 ══ WebSocket ══▶ Alex 的应用
                                       │
 应用 ── POST /relay/v1/register {name} ─▶│  名称：先到先得
 应用 ── GET  /relay/v1/connect ════════▶│  每个应用一条出站连接
```

| 一侧 | 设置 |
|---|---|
| 服务器 | `ROOFTOP_RELAY_DOMAIN=你的域名`（可选的共享机器人：`ROOFTOP_RELAY_BOT_TOKEN`） |
| 应用 | `ROOFTOP_RELAY_URL=https://你的域名`：链接位于 `https://<名称>.你的域名` |

## 要求

* 指向服务器的通配符 DNS 记录 `*.你的域名`。
* 通配符证书。使用 Caddy 时需要 DNS-01 验证和一个 [DNS 提供商模块](https://caddyserver.com/docs/modules/)（`xcaddy build --with github.com/caddy-dns/<提供商>`）。
* 一个会传递 `Host` 的反向代理（Caddy 默认会这样做）：

```nginx
*.你的域名 {
	tls {
		dns <提供商> …
	}
	reverse_proxy iroof:8080
}
```

## 主域名上的起始页 {#a-splash-page-on-the-main-domain}

在主域名上，服务器提供中继 API、它自己的分享链接，以及所有者的应用（受 `ROOFTOP_PASSWORD` 保护）。iroof.top 则在 `/` 上显示一个小的起始页，其中包含文档和 GitHub 的链接，提供英文和另外 20 种语言（`/es/`、`/zh-hans/`、`/ja/`……列表在每个页面上都有，`sitemap.xml` 会列出它们及其 hreflang 替代项）。[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) 是英文页面；`python3 scripts/landing-i18n.py` 会根据 `scripts/landing-i18n/` 中的翻译生成其他页面。每个页面都是一个独立的文件（没有脚本、字体或第三方请求）；问题使用原生的 `<details>` 元素。未知的 `<名称>.你的域名` 链接也会落到这里。其中的应用演示是 [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg)，由 `python3 scripts/landing-demo.py` 以 `data:` 图像的形式嵌入（修改 `demo.svg` 后运行它，然后运行 `scripts/landing-i18n.py`）。
将该文件夹挂载到 Caddy（`./landing:/srv/landing:ro`），并路由 `/`、语言文件夹和 `sitemap.xml`：

```nginx
你的域名 {
	# 访客：起始页。已经发送所有者密码的浏览器会得到应用。
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
	# 其他语言：/es/、/zh-hans/、…（由 scripts/landing-i18n.py 写入的文件夹）。
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
	# 所有者在 /owner 登录：浏览器会要求输入密码并持续发送，/ 则打开应用。
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

应用仍会在每个所有者请求上检查密码；匹配器只决定谁能看到起始页。

## 规则

| | |
|---|---|
| 服务器 API | 主域名上的 `/relay/v1/…` |
| `<名称>.你的域名` | 始终指向拥有该名称的应用，绝不会指向服务器的所有者界面 |
| 名称 | 3–32 个小写字母、数字和连字符；部分名称（`www`、`api`、`admin`……）被保留 |
| 释放 | 180 天没有连接后释放 |
| 新名称 | 按 IP 限速 |
| 所有权 | 应用 `settings.json` 中的随机密钥；服务器只保存其 SHA-256 |
| 状态 | 数据目录中的 `relay.json` 和 `relay-telegram.json` |
