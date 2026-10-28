# Docker и серверы

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Moscow \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Образ | `ghcr.io/irooftop/rooftop`, linux/amd64 и linux/arm64 |
| Теги | `latest`, `X.Y.Z`, `X.Y` |
| Данные | `/data` (экспорты, чаты, настройки) |
| Импорт при запуске | смонтируйте папку и задайте `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js и ffmpeg
В образе их нет. Для stdio MCP-серверов, которые запускаются через `npx`, расширьте образ:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg позволяет ИИ видеть GIF и видео покадрово
```

Или используйте удалённый (HTTP) MCP-сервер.
:::

## Сервер с HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) запускает iRoof.top за [Caddy](https://caddyserver.com),
который получает и продлевает сертификат:

```sh
cd deploy
sed -i 's/example.com/ваш.домен/g' Caddyfile        # домен уже должен указывать на сервер
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  посетитель ──https──▶ Caddy :443 ──▶ iroof:8080
                          │               ├─ /s/…, /api/s/…, ресурсы   публично
                          │               └─ всё остальное             пароль
                          └─ TLS-сертификат, продлевается автоматически
```

* Ссылки для общего доступа используют ваш домен: `https://ваш.домен/s/<имя>`.
* Контейнер работает только для чтения, без capabilities и с ограничением памяти.
* `ROOFTOP_TRUST_PROXY` включён, потому что Caddy передаёт IP посетителя.
* Обновление: `docker compose pull && docker compose up -d`. Сделайте резервную копию тома `iroof-data`.

::: danger Задайте пароль на публичном сервере
`ROOFTOP_PASSWORD` защищает интерфейс и API владельца. Без него любой, кто найдёт адрес, может читать ваши чаты.
:::
