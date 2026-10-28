# Docker en servers

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Amsterdam \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Image | `ghcr.io/irooftop/rooftop`, linux/amd64 en linux/arm64 |
| Tags | `latest`, `X.Y.Z`, `X.Y` |
| Data | `/data` (exports, chats, instellingen) |
| Importeren bij start | koppel een map en zet `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js en ffmpeg
De image bevat geen van beide. Voor stdio-MCP-servers die met `npx` worden gestart, breid je hem uit:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg laat de AI GIF's en video's frame voor frame zien
```

Of gebruik een externe (HTTP) MCP-server.
:::

## Een server met HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) draait iRoof.top achter [Caddy](https://caddyserver.com),
dat het certificaat ophaalt en vernieuwt:

```sh
cd deploy
sed -i 's/example.com/jouw.domein/g' Caddyfile        # het domein moet al naar de server wijzen
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  bezoeker ──https──▶ Caddy :443 ──▶ iroof:8080
                        │               ├─ /s/…, /api/s/…, bestanden   openbaar
                        │               └─ al het andere               wachtwoord
                        └─ TLS-certificaat, automatisch vernieuwd
```

* Sharelinks gebruiken je domein: `https://jouw.domein/s/<naam>`.
* De container draait alleen-lezen, zonder capabilities en met een geheugenlimiet.
* `ROOFTOP_TRUST_PROXY` staat aan, omdat Caddy het IP van de bezoeker doorgeeft.
* Bijwerken met `docker compose pull && docker compose up -d`. Maak een back-up van het volume `iroof-data`.

::: danger Stel een wachtwoord in op een openbare server
`ROOFTOP_PASSWORD` beschermt de eigenaarsinterface en -API. Zonder dat kan iedereen die het adres vindt je chats lezen.
:::
