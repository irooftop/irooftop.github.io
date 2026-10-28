# Настольное приложение

Настольное приложение ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) запускает тот же сервер, что и `rooftop serve`, на случайном
порту `127.0.0.1` и показывает его в нативном окне.

| Платформа | Установка |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, или `.dmg` для [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) или [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 и 11 | [Установщик (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) или [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (любой дистрибутив), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) или [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Ссылки для загрузки всегда ведут на самую новую версию.

::: warning Сборки пока не подписаны
В macOS откройте приложение один раз, затем **Системные настройки → Конфиденциальность и безопасность → Всё равно открыть**. В Windows выберите
**Подробнее → Выполнить в любом случае** в SmartScreen. Пошагово, с анимацией: [Открытие неподписанного приложения](./unsigned-apps).
:::

## Первый запуск

Приложение не читает ваш shell и `.env`, поэтому оно встречает вас экраном **Подключить модель**: откройте **Настройки**, введите
конечную точку, ключ и модель и нажмите **Проверить**. Если заданы `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` или
`OPENAI_TEMPERATURE`, они становятся начальными значениями.

| | |
|---|---|
| Данные | каталог данных приложений системы, например `~/Library/Application Support/top.iroof.desktop` в macOS |
| Ссылки для общего доступа | в той же сети Wi‑Fi или через интернет: [Открытие ссылок на других устройствах](../features/share-links#open-links-on-other-devices) |
| Другие сайты | ссылки вроде `t.me` открываются в браузере |
| Окно macOS | без системной строки заголовка: заголовки приложения продолжаются под светофорами и перетаскивают окно |
| Импорт | приложение читает экспорт само: **Выбрать папку…** открывает системный диалог, а перетащенные папка, `.zip` или `.txt` импортируются с того места, где лежат. Ничего не загружается, оригинал остаётся нетронутым, а на APFS медиа клонируются, а не копируются, поэтому даже экспорт в 13 ГБ почти не занимает дополнительного места |

## Соберите сами {#build-it-yourself}

Нужны Rust ≥ 1.95 и Node.js, а в Linux — [требования Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # установщики в desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # только бинарный файл
```

В macOS `npm run build` также создаёт `.dmg` и пропускает AppleScript Finder, который лишь упорядочивает окно DMG
(он падает без разрешения *Автоматизация*). Задайте `ROOFTOP_DMG_FINDER=1`, чтобы сохранить расположение Finder, как
в опубликованных DMG: фон из `desktop/dmg/` со стрелкой от приложения к *Программам*, а скрытые файлы тома
выведены из вида. После редактирования `desktop/dmg/background.svg` запустите `desktop/dmg/make-background.sh`.
