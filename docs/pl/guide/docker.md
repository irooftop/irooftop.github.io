# Docker i serwery

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Warsaw \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Obraz | `ghcr.io/irooftop/rooftop`, linux/amd64 i linux/arm64 |
| Tagi | `latest`, `X.Y.Z`, `X.Y` |
| Dane | `/data` (eksporty, czaty, ustawienia) |
| Import przy starcie | zamontuj folder i ustaw `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js i ffmpeg
Obraz nie zawiera żadnego z nich. Dla serwerów MCP stdio uruchamianych przez `npx` rozszerz go:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg pozwala AI oglądać GIF-y i wideo klatka po klatce
```

Albo użyj zdalnego serwera MCP (HTTP).
:::

## Serwer z HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) uruchamia iRoof.top za [Caddy](https://caddyserver.com),
który pobiera i odnawia certyfikat:

```sh
cd deploy
sed -i 's/example.com/twoja.domena/g' Caddyfile        # domena musi już wskazywać na serwer
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  odwiedzający ──https──▶ Caddy :443 ──▶ iroof:8080
                            │               ├─ /s/…, /api/s/…, zasoby   publiczne
                            │               └─ reszta                    hasło
                            └─ certyfikat TLS, odnawiany automatycznie
```

* Linki udostępniania używają twojej domeny: `https://twoja.domena/s/<nazwa>`.
* Kontener działa tylko do odczytu, bez uprawnień (capabilities) i z limitem pamięci.
* `ROOFTOP_TRUST_PROXY` jest włączone, ponieważ Caddy przekazuje IP odwiedzającego.
* Aktualizacja: `docker compose pull && docker compose up -d`. Zrób kopię zapasową wolumenu `iroof-data`.

::: danger Ustaw hasło na publicznym serwerze
`ROOFTOP_PASSWORD` chroni interfejs i API właściciela. Bez niego każdy, kto znajdzie adres, może czytać twoje czaty.
:::
