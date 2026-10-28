# Docker dan server

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Jakarta \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Image | `ghcr.io/irooftop/rooftop`, linux/amd64 dan linux/arm64 |
| Tag | `latest`, `X.Y.Z`, `X.Y` |
| Data | `/data` (ekspor, chat, pengaturan) |
| Impor saat mulai | pasang folder dan atur `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js dan ffmpeg
Image tidak memiliki keduanya. Untuk server MCP stdio yang dijalankan dengan `npx`, perluas image:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg memungkinkan AI melihat GIF dan video bingkai demi bingkai
```

Atau gunakan server MCP jarak jauh (HTTP).
:::

## Server dengan HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) menjalankan iRoof.top di belakang [Caddy](https://caddyserver.com),
yang mengambil dan memperbarui sertifikat:

```sh
cd deploy
sed -i 's/example.com/domain.anda/g' Caddyfile        # domain harus sudah mengarah ke server
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  pengunjung ──https──▶ Caddy :443 ──▶ iroof:8080
                          │               ├─ /s/…, /api/s/…, aset   publik
                          │               └─ selebihnya             kata sandi
                          └─ sertifikat TLS, diperbarui otomatis
```

* Tautan berbagi menggunakan domain Anda: `https://domain.anda/s/<nama>`.
* Kontainer berjalan hanya-baca, tanpa capability, dengan batas memori.
* `ROOFTOP_TRUST_PROXY` aktif, karena Caddy meneruskan IP pengunjung.
* Perbarui dengan `docker compose pull && docker compose up -d`. Cadangkan volume `iroof-data`.

::: danger Atur kata sandi di server publik
`ROOFTOP_PASSWORD` melindungi antarmuka dan API pemilik. Tanpanya, siapa pun yang menemukan alamatnya dapat membaca chat Anda.
:::
