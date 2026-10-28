# Docker et serveurs

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Paris \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Image | `ghcr.io/irooftop/rooftop`, linux/amd64 et linux/arm64 |
| Étiquettes | `latest`, `X.Y.Z`, `X.Y` |
| Données | `/data` (exports, chats, paramètres) |
| Import au démarrage | montez un dossier et définissez `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js et ffmpeg
L'image n'inclut ni l'un ni l'autre. Pour les serveurs MCP stdio lancés avec `npx`, étendez-la :

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg permet à l'IA de voir les GIF et vidéos image par image
```

Ou utilisez un serveur MCP distant (HTTP).
:::

## Un serveur avec HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) fait tourner iRoof.top derrière [Caddy](https://caddyserver.com),
qui obtient et renouvelle le certificat :

```sh
cd deploy
sed -i 's/example.com/votre.domaine/g' Caddyfile        # le domaine doit déjà pointer vers le serveur
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  visiteur ──https──▶ Caddy :443 ──▶ iroof:8080
                        │               ├─ /s/…, /api/s/…, ressources   public
                        │               └─ le reste                     mot de passe
                        └─ certificat TLS, renouvelé automatiquement
```

* Les liens de partage utilisent votre domaine : `https://votre.domaine/s/<nom>`.
* Le conteneur fonctionne en lecture seule, sans capacités, avec une limite de mémoire.
* `ROOFTOP_TRUST_PROXY` est activé, car Caddy transmet l'IP du visiteur.
* Mise à jour avec `docker compose pull && docker compose up -d`. Sauvegardez le volume `iroof-data`.

::: danger Définissez un mot de passe sur un serveur public
`ROOFTOP_PASSWORD` protège l'interface et l'API du propriétaire. Sans lui, quiconque trouve l'adresse peut lire vos chats.
:::
