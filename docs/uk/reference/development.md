# Розробка

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Тести покривають | |
|---|---|
| Парсер і конвертація | на `examples/telegram` і `examples/whatsapp` |
| Посилання для спільного доступу | ізоляція відвідувачів, блокування PIN, список дозволених медіа, кімнати, імена, блокування, обхід автентифікації |
| MCP-клієнт | імітації серверів кожної епохи протоколу (HTTP, застарілий SSE, stdio) |
| Ретрансляція | хаб, імена, пересилання |

Крейт настільного застосунку окремий: `cd desktop && cargo check`.

## Структура

```
src/        сервер (axum), парсери, агент LLM, MCP-клієнт, посилання для спільного доступу, ретрансляція, Telegram
  server/     HTTP API власника, по файлу на область: ресурси, завантаження, експорти, чати,
              повідомлення, налаштування, медіа; mod.rs збирає маршрутизатори
  share_api/  посилання для спільного доступу: owner.rs (керування посиланнями й відвідувачами), visitor.rs (/s/…)
web/        інтерфейс: index.html, app.css і js/ (віддається як один app.js), вбудований у бінарний файл
  js/         по файлу на область інтерфейсу, пронумеровані в порядку завантаження (один скрипт, одна область видимості)
desktop/    застосунок Tauri навколо того самого сервера
deploy/     Caddy + Docker Compose
examples/   два вигадані експорти
```

Документація й стартова сторінка iroof.top не знаходяться в цьому репозиторії. Вони є в
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (цей сайт) і `landing/`.

## Документація

Документація розміщена в [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Вона бере зображення
і версію застосунку з цього репозиторію: клонуйте обидва поруч і збирайте там.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Сайт публікується на [irooftop.github.io](https://irooftop.github.io) при кожному push у `main` цього репозиторію, який змінює `docs/`. `demo.svg` створюється командою `python3 scripts/demo-svg.py` у репозиторії застосунку (чистий SVG і CSS, щоб GitHub його показував).

## Випуск версії

```
 підняти Cargo.toml ─▶ тег vX.Y.Z ─┬─▶ Release: crates.io + образ ghcr.io (amd64 + arm64, нативні раннери)
                                   └─▶ desktop: інсталятори ─▶ опублікувати реліз (найновіший) ─▶ Homebrew: формула + cask
```

1. Підніміть `version` у `Cargo.toml` (і в `desktop/`), зробіть коміт і надішліть тег `vX.Y.Z`. Тег має бути числовим для
   MSI Windows. Усе далі виконується без додаткових кліків.
2. *Release* публікує крейт (секрет `CARGO_REGISTRY_TOKEN`, середовище `crates-io`) і образ Docker:
   одне завдання на архітектуру на нативному раннері (`ubuntu-latest`, `ubuntu-24.04-arm`) надсилає за digest, а завдання
   `merge` створює багатоархітектурні теги. Запустіть вручну з `dry_run`, щоб перевірити публікацію крейта.
3. *desktop* збирає інсталятори для macOS (arm64, x64), Windows і Linux у чернетку релізу. Коли всі вони
   прикріплені, його завдання `publish` додає згенеровані примітки до релізу, публікує реліз і позначає його як найновіший.
4. Його завдання `homebrew` потім викликає *Homebrew*, який надсилає `Formula/rooftop.rb` і `Casks/irooftop.rb` до
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Потрібен секрет `HOMEBREW_TAP_TOKEN`
   (токен з обмеженим доступом, `irooftop/homebrew-tap`, Contents: читання і запис) або `HOMEBREW_TAP_DEPLOY_KEY`; без жодного з них
   завдання пропускається з повідомленням. (Реліз, опублікований через `GITHUB_TOKEN`, не запускає `release: published`, тому виклик явний;
   публікація релізу вручну все одно запускає Homebrew через цю подію.)

Щоб повторно запустити оновлення tap для наявного тегу, наприклад після додавання секрету:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <копія tap>` створює ті самі файли локально. Якщо інсталятори тегу завершилися з помилкою,
перезапустіть невдалі завдання *desktop*: `publish` і `homebrew` виконаються, щойно вони пройдуть.
