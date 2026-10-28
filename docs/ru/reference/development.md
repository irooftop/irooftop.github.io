# Разработка

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Тесты покрывают | |
|---|---|
| Парсер и конвертация | на `examples/telegram` и `examples/whatsapp` |
| Ссылки для общего доступа | изоляция посетителей, блокировка по PIN, список разрешённых медиа, комнаты, имена, блокировки, обход авторизации |
| Клиент MCP | имитации серверов каждой эпохи протокола (HTTP, устаревший SSE, stdio) |
| Ретрансляция | хаб, имена, пересылка |

Крейт настольного приложения отдельный: `cd desktop && cargo check`.

## Структура

```
src/        сервер (axum), парсеры, агент LLM, клиент MCP, ссылки для общего доступа, ретрансляция, Telegram
  server/     HTTP API владельца, по файлу на область: ресурсы, загрузки, экспорты, чаты,
              сообщения, настройки, медиа; mod.rs собирает маршрутизаторы
  share_api/  ссылки для общего доступа: owner.rs (управление ссылками и посетителями), visitor.rs (/s/…)
web/        интерфейс: index.html, app.css и js/ (отдаётся одним app.js), встроен в бинарный файл
  js/         по файлу на область интерфейса, пронумерованы в порядке загрузки (один скрипт, одна область видимости)
desktop/    приложение Tauri вокруг того же сервера
deploy/     Caddy + Docker Compose
examples/   два вымышленных экспорта
```

Документация и стартовая страница iroof.top не находятся в этом репозитории. Они лежат в
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (этот сайт) и `landing/`.

## Документация

Документация находится в [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Она берёт изображения
и версию приложения из этого репозитория: клонируйте оба рядом и собирайте там.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Сайт публикуется на [irooftop.github.io](https://irooftop.github.io) при каждом push в `main` этого репозитория, который меняет `docs/`. `demo.svg` создаётся командой `python3 scripts/demo-svg.py` в репозитории приложения (чистый SVG и CSS, поэтому GitHub его отображает).

## Выпуск версии

```
 поднять Cargo.toml ─▶ тег vX.Y.Z ─┬─▶ Release: crates.io + образ ghcr.io (amd64 + arm64, нативные раннеры)
                                   └─▶ desktop: установщики ─▶ публикация релиза (последний) ─▶ Homebrew: формула + cask
```

1. Увеличьте `version` в `Cargo.toml` (и в `desktop/`), сделайте коммит и отправьте тег `vX.Y.Z`. Тег должен быть числовым для
   MSI под Windows. Всё дальнейшее выполняется без дополнительных нажатий.
2. *Release* публикует крейт (секрет `CARGO_REGISTRY_TOKEN`, окружение `crates-io`) и образ Docker:
   одна задача на архитектуру на нативном раннере (`ubuntu-latest`, `ubuntu-24.04-arm`) отправляет по digest, а задача
   `merge` создаёт мультиархитектурные теги. Запустите вручную с `dry_run`, чтобы проверить публикацию крейта.
3. *desktop* собирает установщики для macOS (arm64, x64), Windows и Linux в черновик релиза. Когда все они
   прикреплены, его задача `publish` добавляет сгенерированные заметки к выпуску, публикует релиз и отмечает его как последний.
4. Затем его задача `homebrew` вызывает *Homebrew*, который отправляет `Formula/rooftop.rb` и `Casks/irooftop.rb` в
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Нужен секрет `HOMEBREW_TAP_TOKEN`
   (токен с ограниченным доступом, `irooftop/homebrew-tap`, Contents: чтение и запись) или `HOMEBREW_TAP_DEPLOY_KEY`; без них
   задача пропускается с уведомлением. (Релиз, опубликованный с `GITHUB_TOKEN`, не запускает `release: published`, поэтому вызов явный;
   публикация релиза вручную по-прежнему запускает Homebrew через это событие.)

Чтобы повторно обновить tap для существующего тега, например после добавления секрета:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <копия tap>` создаёт те же файлы локально. Если установщики тега
завершились с ошибкой, перезапустите упавшие задачи *desktop*: `publish` и `homebrew` выполнятся, когда они пройдут.
