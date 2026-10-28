# Docker y servidores

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
| Imagen | `ghcr.io/irooftop/rooftop`, linux/amd64 y linux/arm64 |
| Etiquetas | `latest`, `X.Y.Z`, `X.Y` |
| Datos | `/data` (exportaciones, chats, ajustes) |
| Importar al iniciar | monta una carpeta y define `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js y ffmpeg
La imagen no los incluye. Para los servidores MCP por stdio iniciados con `npx`, amplíala:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg permite a la IA ver GIF y vídeos fotograma a fotograma
```

O usa un servidor MCP remoto (HTTP).
:::

## Un servidor con HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) ejecuta iRoof.top detrás de [Caddy](https://caddyserver.com),
que obtiene y renueva el certificado:

```sh
cd deploy
sed -i 's/example.com/tu.dominio/g' Caddyfile        # el dominio ya debe apuntar al servidor
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  visitante ──https──▶ Caddy :443 ──▶ iroof:8080
                         │               ├─ /s/…, /api/s/…, recursos   público
                         │               └─ todo lo demás              contraseña
                         └─ certificado TLS, renovado automáticamente
```

* Los enlaces para compartir usan tu dominio: `https://tu.dominio/s/<nombre>`.
* El contenedor funciona en solo lectura, sin capacidades y con límite de memoria.
* `ROOFTOP_TRUST_PROXY` está activado, porque Caddy pasa la IP del visitante.
* Actualiza con `docker compose pull && docker compose up -d`. Haz copia de seguridad del volumen `iroof-data`.

::: danger Define una contraseña en un servidor público
`ROOFTOP_PASSWORD` protege la interfaz y la API del propietario. Sin ella, cualquiera que encuentre la dirección puede leer tus chats.
:::
