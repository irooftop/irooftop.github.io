# HTTP API

JSON через HTTP. Коли задано `ROOFTOP_PASSWORD`, API власника вимагає HTTP Basic-автентифікації.

## Власник

| Метод | Шлях | |
|---|---|---|
| GET | `/api/state` | експорти, чати, посилання для спільного доступу, відомості про LLM |
| POST | `/api/exports` | multipart-завантаження: файли папки з відносними іменами або `.zip`. Одразу відповідає `202 {"id"}` і імпортує у фоні |
| POST | `/api/uploads` | починає пакетне завантаження (його використовує веб-інтерфейс): `{"id"}` |
| POST | `/api/uploads/{id}/files` | multipart-пакет файлів із відносними іменами; повторне надсилання пакета замінює його файли: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | після файлів чату, перед медіа: `{"bytes"}` ще не надіслано → `{title, messages, existing, fits, free_bytes, needed_bytes}` (уже імпортовано? чи вистачає місця на диску?) |
| POST | `/api/uploads/{id}/import` | імпортує все, що завантажено до цього моменту: `202 {"id"}` завдання імпорту |
| DELETE | `/api/uploads/{id}` | скасовує незавершене завантаження (покинуті видаляються через 24 год і під час перезапуску) |
| POST | `/api/local/pick` | лише настільний застосунок: показує системний вибір, `{"kind": "folder" \| "file"}` → `{"path"}` (`null`, якщо скасовано) |
| POST | `/api/local/import` | лише настільний застосунок: імпорт із цього комп'ютера, `{"paths": […]}` (папка, `.zip` або `.txt` WhatsApp; файли всередині одного експорту означають його папку) → `202 {"id", "name"}` завдання імпорту; джерело копіюється, ніколи не змінюється |
| GET | `/api/imports/{id}` | прогрес завдання імпорту, див. нижче |
| GET · DELETE | `/api/exports/{id}` | подробиці з медіатекою · видалення разом з чатами |
| POST | `/api/exports/{id}/describe` | описує медіатеку |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; без `export_id` — чат лише з нотаток: `persona` — його ім'я, `user` — ваше (типово `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | стрічка (`?limit=`) · назва і нотатки · видалення |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` видаляє) |
| POST | `/api/chats/{id}/voice` | multipart `file` (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | дозволяє персонажу діяти; повертає повідомлення та дії в порядку |
| POST | `/api/chats/{id}/regenerate` | видаляє останній хід персонажа і відповідає знову |
| GET | `/api/chats/{id}/prompt` | точний `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | список · створити посилання для спільного доступу |
| PATCH · DELETE | `/api/shares/{id}` | змінити (`pin: ""` прибирає PIN, `revoke_sessions`) · видалити |
| DELETE | `/api/shares/{id}/sessions/{session}` | завершує одну розмову відвідувача |
| GET · PUT | `/api/settings` | LLM, MCP і Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | статус MCP · перепідключити |
| GET · POST | `/api/telegram` · `/api/telegram/link` | статус бота і групи · посилання `t.me`, яке додає бота до групи |
| GET · PUT | `/api/sharing` | спільний доступ через Wi‑Fi та інтернет `{lan?, internet?, name?}` (інтерфейс власника лише на localhost) |
| GET | `/api/qr?text=…` | QR-код (SVG) |

### Завдання імпорту

`GET /api/imports/{id}` повертає

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (виконується інший імпорт; вони йдуть по одному), `running`, `done` або `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` із `total` сторінок), `hashing` і `placing` (файли), `saving`.
* `messages`: повідомлення, знайдені на цей момент.
* `failed` додає `error`, наприклад `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` додає `created` (`false`, якщо той самий експорт уже імпортували) і `export`, підсумок, який також є в `/api/state`.

Зберігаються останні 16 завершених завдань; невідомий ідентифікатор повертає 404.

## Публічні

Без пароля, для відвідувачів посилань для спільного доступу:

| Метод | Шлях | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | сторінка відвідувача |
| GET | `/api/s/{name}` | відомості стартової сторінки |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | стрічка |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | як для власника; `regenerate` і `respond` без нового повідомлення відвідувача («хай напише перший») — лише там, де посилання має `allow_regenerate` / `allow_nudge` (інакше `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | медіа, які відвідувач може бачити |

## Хаб ретрансляції

| Метод | Шлях | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, зайняти або перейменувати (`Authorization: Bearer <секрет>`) |
| GET | `/relay/v1/connect` | WebSocket застосунку |
| GET | `/relay/v1/info` | відомості про хаб |
| * | `/relay/v1/tg/bot<секрет>/<метод>` | проксі Bot API спільного бота |
