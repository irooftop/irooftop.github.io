# Docker e servidores

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=America/Sao_Paulo \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Imagem | `ghcr.io/irooftop/rooftop`, linux/amd64 e linux/arm64 |
| Tags | `latest`, `X.Y.Z`, `X.Y` |
| Dados | `/data` (exportações, chats, configurações) |
| Importar ao iniciar | monte uma pasta e defina `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js e ffmpeg
A imagem não inclui nenhum dos dois. Para servidores MCP stdio iniciados com `npx`, estenda-a:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # o ffmpeg permite que a IA veja GIFs e vídeos quadro a quadro
```

Ou use um servidor MCP remoto (HTTP).
:::

## Um servidor com HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) executa o iRoof.top atrás do [Caddy](https://caddyserver.com),
que obtém e renova o certificado:

```sh
cd deploy
sed -i 's/example.com/seu.dominio/g' Caddyfile        # o domínio já deve apontar para o servidor
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  visitante ──https──▶ Caddy :443 ──▶ iroof:8080
                         │               ├─ /s/…, /api/s/…, recursos   público
                         │               └─ todo o resto               senha
                         └─ certificado TLS, renovado automaticamente
```

* Os links de compartilhamento usam o seu domínio: `https://seu.dominio/s/<nome>`.
* O contêiner roda somente leitura, sem capacidades e com limite de memória.
* `ROOFTOP_TRUST_PROXY` está ativo, porque o Caddy repassa o IP do visitante.
* Atualize com `docker compose pull && docker compose up -d`. Faça backup do volume `iroof-data`.

::: danger Defina uma senha em um servidor público
`ROOFTOP_PASSWORD` protege a interface e a API do proprietário. Sem ela, qualquer pessoa que encontrar o endereço pode ler seus chats.
:::
