# Настільний застосунок

Настільний застосунок ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) запускає той самий сервер, що і `rooftop serve`, на випадковому
порту `127.0.0.1` і показує його в нативному вікні.

| Платформа | Встановлення |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, або `.dmg` для [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) чи [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 і 11 | [Інсталятор (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) або [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (будь-який дистрибутив), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) або [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Посилання на завантаження завжди ведуть до найновішої версії.

::: warning Збірки ще не підписані
У macOS відкрийте застосунок один раз, а потім **Системні налаштування → Конфіденційність і безпека → Однаково відкрити**. У Windows у SmartScreen оберіть
**Додаткова інформація → Все одно запустити**. Покроково, з анімацією: [Відкриття непідписаного застосунку](./unsigned-apps).
:::

## Перший запуск

Застосунок не читає вашу оболонку або `.env`, тому він вітає вас екраном **Під'єднати модель**: відкрийте **Налаштування**, введіть
кінцеву точку, ключ і модель та натисніть **Перевірити**. Якщо задано `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` або
`OPENAI_TEMPERATURE`, вони стають початковими значеннями.

| | |
|---|---|
| Дані | каталог даних застосунків системи, наприклад `~/Library/Application Support/top.iroof.desktop` у macOS |
| Посилання для спільного доступу | у тій самій Wi‑Fi мережі або через інтернет: [Відкриття посилань на інших пристроях](../features/share-links#open-links-on-other-devices) |
| Інші сайти | посилання на кшталт `t.me` відкриваються у вашому браузері |
| Вікно macOS | без системного заголовка: заголовки застосунку продовжуються під світлофорами і перетягують вікно |
| Імпорт | застосунок читає експорт сам: **Обрати папку…** відкриває системний вибір, а перетягнуті папка, `.zip` або `.txt` імпортуються звідти, де вони лежать. Нічого не завантажується, оригінал залишається недоторканим, а на APFS медіа клонуються, а не копіюються, тож навіть експорт на 13 ГБ майже не займає додаткового місця |

## Зберіть самостійно {#build-it-yourself}

Потрібні Rust ≥ 1.95 і Node.js, а в Linux — [передумови Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # інсталятори в desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # лише бінарний файл
```

У macOS `npm run build` також створює `.dmg` і пропускає AppleScript Finder, який лише впорядковує вікно DMG
(він завершується помилкою без дозволу *Автоматизація*). Задайте `ROOFTOP_DMG_FINDER=1`, щоб зберегти розташування Finder, як
у опублікованих DMG: фон із `desktop/dmg/` зі стрілкою від застосунку до *Програм*, а приховані файли тому
поза полем зору. Після редагування `desktop/dmg/background.svg` запустіть `desktop/dmg/make-background.sh`.
