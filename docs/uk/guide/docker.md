# Docker і сервери

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Europe/Kyiv \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| Образ | `ghcr.io/irooftop/rooftop`, linux/amd64 і linux/arm64 |
| Теги | `latest`, `X.Y.Z`, `X.Y` |
| Дані | `/data` (експорти, чати, налаштування) |
| Імпорт під час запуску | змонтуйте папку і задайте `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js і ffmpeg
В образі їх немає. Для stdio MCP-серверів, які запускаються через `npx`, розширте образ:

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg дозволяє ШІ бачити GIF і відео покадрово
```

Або використовуйте віддалений (HTTP) MCP-сервер.
:::

## Сервер з HTTPS

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) запускає iRoof.top за [Caddy](https://caddyserver.com),
який отримує і поновлює сертифікат:

```sh
cd deploy
sed -i 's/example.com/ваш.домен/g' Caddyfile        # домен уже має вказувати на сервер
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  відвідувач ──https──▶ Caddy :443 ──▶ iroof:8080
                          │               ├─ /s/…, /api/s/…, ресурси   публічно
                          │               └─ решта                     пароль
                          └─ TLS-сертифікат, поновлюється автоматично
```

* Посилання для спільного доступу використовують ваш домен: `https://ваш.домен/s/<назва>`.
* Контейнер працює лише для читання, без capabilities і з обмеженням пам'яті.
* `ROOFTOP_TRUST_PROXY` увімкнено, бо Caddy передає IP відвідувача.
* Оновлення: `docker compose pull && docker compose up -d`. Зробіть резервну копію тому `iroof-data`.

::: danger Задайте пароль на публічному сервері
`ROOFTOP_PASSWORD` захищає інтерфейс і API власника. Без нього кожен, хто знайде адресу, може читати ваші чати.
:::
