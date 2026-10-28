# Docker & Server

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Berlin \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Image | `ghcr.io/irooftop/rooftop`, linux/amd64 und linux/arm64 |
| Tags | `latest`, `X.Y.Z`, `X.Y` |
| Daten | `/data` (Exporte, Chats, Einstellungen) |
| Import beim Start | einen Ordner einhängen und `ROOFTOP_IMPORT=/import/chat` setzen |

::: tip Node.js und ffmpeg
Das Image enthält keines von beiden. Für stdio-MCP-Server, die mit `npx` gestartet werden, erweitere es:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg lässt die KI GIFs und Videos Bild für Bild sehen
```

Oder nutze stattdessen einen entfernten (HTTP-)MCP-Server.
:::

## Ein Server mit HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) betreibt iRoof.top hinter [Caddy](https://caddyserver.com),
das das Zertifikat holt und erneuert:

```sh
cd deploy
sed -i 's/example.com/deine.domain/g' Caddyfile        # die Domain muss bereits auf den Server zeigen
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  Besucher ──https──▶ Caddy :443 ──▶ iroof:8080
                        │               ├─ /s/…, /api/s/…, Assets   öffentlich
                        │               └─ alles andere             Passwort
                        └─ TLS-Zertifikat, automatisch erneuert
```

* Share-Links verwenden deine Domain: `https://deine.domain/s/<name>`.
* Der Container läuft schreibgeschützt, ohne Capabilities und mit Speicherlimit.
* `ROOFTOP_TRUST_PROXY` ist aktiv, weil Caddy die IP des Besuchers weitergibt.
* Aktualisieren mit `docker compose pull && docker compose up -d`. Sichere das Volume `iroof-data`.

::: danger Setze auf einem öffentlichen Server ein Passwort
`ROOFTOP_PASSWORD` schützt die Eigentümeroberfläche und die API. Ohne es kann jeder, der die Adresse findet, deine Chats lesen.
:::
