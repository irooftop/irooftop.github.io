# Docker とサーバー

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Tokyo \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| イメージ | `ghcr.io/irooftop/rooftop`、linux/amd64 と linux/arm64 |
| タグ | `latest`、`X.Y.Z`、`X.Y` |
| データ | `/data`（エクスポート、チャット、設定） |
| 起動時のインポート | フォルダをマウントして `ROOFTOP_IMPORT=/import/chat` を設定 |

::: tip Node.js と ffmpeg
イメージにはどちらも含まれていません。`npx` で起動する stdio の MCP サーバーには、イメージを拡張してください。

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg があると、AI が GIF や動画をコマ送りで見られます
```

または、リモートの（HTTP）MCP サーバーを使ってください。
:::

## HTTPS を使うサーバー

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) は、[Caddy](https://caddyserver.com) の背後で iRoof.top を動かします。Caddy が証明書を取得し、更新します。

```sh
cd deploy
sed -i 's/example.com/あなたのドメイン/g' Caddyfile        # ドメインがすでにサーバーを指している必要があります
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  訪問者 ──https──▶ Caddy :443 ──▶ iroof:8080
                      │               ├─ /s/…、/api/s/…、アセット   公開
                      │               └─ それ以外                    パスワード
                      └─ TLS 証明書、自動的に更新
```

* 共有リンクはあなたのドメインを使います：`https://あなたのドメイン/s/<名前>`。
* コンテナは読み取り専用、ケーパビリティなし、メモリ上限付きで動きます。
* Caddy が訪問者の IP を渡すため、`ROOFTOP_TRUST_PROXY` が有効になっています。
* `docker compose pull && docker compose up -d` で更新します。`iroof-data` ボリュームをバックアップしてください。

::: danger 公開サーバーではパスワードを設定してください
`ROOFTOP_PASSWORD` は所有者の画面と API を保護します。これがないと、アドレスを見つけた人は誰でもあなたのチャットを読めてしまいます。
:::
