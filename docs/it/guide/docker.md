# Docker e server

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Rome \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Immagine | `ghcr.io/irooftop/rooftop`, linux/amd64 e linux/arm64 |
| Tag | `latest`, `X.Y.Z`, `X.Y` |
| Dati | `/data` (esportazioni, chat, impostazioni) |
| Importazione all'avvio | monta una cartella e imposta `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js e ffmpeg
L'immagine non li include. Per i server MCP stdio avviati con `npx`, estendila:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg permette all'IA di vedere GIF e video fotogramma per fotogramma
```

Oppure usa un server MCP remoto (HTTP).
:::

## Un server con HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) esegue iRoof.top dietro [Caddy](https://caddyserver.com),
che ottiene e rinnova il certificato:

```sh
cd deploy
sed -i 's/example.com/tuo.dominio/g' Caddyfile        # il dominio deve già puntare al server
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  visitatore ──https──▶ Caddy :443 ──▶ iroof:8080
                          │               ├─ /s/…, /api/s/…, risorse   pubblico
                          │               └─ tutto il resto            password
                          └─ certificato TLS, rinnovato automaticamente
```

* I link di condivisione usano il tuo dominio: `https://tuo.dominio/s/<nome>`.
* Il container gira in sola lettura, senza capability e con un limite di memoria.
* `ROOFTOP_TRUST_PROXY` è attivo, perché Caddy passa l'IP del visitatore.
* Aggiorna con `docker compose pull && docker compose up -d`. Fai il backup del volume `iroof-data`.

::: danger Imposta una password su un server pubblico
`ROOFTOP_PASSWORD` protegge l'interfaccia e l'API del proprietario. Senza di essa, chiunque trovi l'indirizzo può leggere le tue chat.
:::
