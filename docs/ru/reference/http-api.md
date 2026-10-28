# HTTP API

JSON поверх HTTP. Если задан `ROOFTOP_PASSWORD`, API владельца требует HTTP Basic-аутентификации.

## Владелец

| Метод | Путь | |
|---|---|---|
| GET | `/api/state` | экспорты, чаты, ссылки для общего доступа, сведения о LLM |
| POST | `/api/exports` | multipart-загрузка: файлы папки с относительными именами или `.zip`. Сразу отвечает `202 {"id"}` и импортирует в фоне |
| POST | `/api/uploads` | начать пакетную загрузку (её использует веб-интерфейс): `{"id"}` |
| POST | `/api/uploads/{id}/files` | multipart-пакет файлов с относительными именами; повторная отправка пакета заменяет его файлы: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | после файлов чата, до медиа: `{"bytes"}` ещё предстоит отправить → `{title, messages, existing, fits, free_bytes, needed_bytes}` (уже импортирован? хватает ли места на диске?) |
| POST | `/api/uploads/{id}/import` | импортировать всё, что загружено к этому моменту: `202 {"id"}` задачи импорта |
| DELETE | `/api/uploads/{id}` | отменить незавершённую загрузку (брошенные удаляются через 24 ч и при перезапуске) |
| POST | `/api/local/pick` | только настольное приложение: показывает системный выбор, `{"kind": "folder" \| "file"}` → `{"path"}` (`null`, если отменено) |
| POST | `/api/local/import` | только настольное приложение: импорт с этого компьютера, `{"paths": […]}` (папка, `.zip` или `.txt` WhatsApp; файлы внутри одного экспорта означают его папку) → `202 {"id", "name"}` задачи импорта; источник копируется, никогда не меняется |
| GET | `/api/imports/{id}` | прогресс задачи импорта, см. ниже |
| GET · DELETE | `/api/exports/{id}` | подробности с медиатекой · удалить вместе с чатами |
| POST | `/api/exports/{id}/describe` | описать медиатеку |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; без `export_id` — чат только из заметок: `persona` — её имя, `user` — ваше (по умолчанию `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | лента (`?limit=`) · название и заметки · удалить |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` удаляет) |
| POST | `/api/chats/{id}/voice` | multipart `file` (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | пусть персонаж действует; возвращает сообщения и действия по порядку |
| POST | `/api/chats/{id}/regenerate` | удалить последний ход персонажа и ответить заново |
| GET | `/api/chats/{id}/prompt` | точный `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | список · создать ссылки для общего доступа |
| PATCH · DELETE | `/api/shares/{id}` | изменить (`pin: ""` удаляет PIN, `revoke_sessions`) · удалить |
| DELETE | `/api/shares/{id}/sessions/{session}` | завершить один разговор посетителя |
| GET · PUT | `/api/settings` | LLM, MCP и Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | статус MCP · переподключить |
| GET · POST | `/api/telegram` · `/api/telegram/link` | статус бота и группы · ссылка `t.me`, которая добавляет бота в группу |
| GET · PUT | `/api/sharing` | общий доступ по Wi‑Fi и через Интернет `{lan?, internet?, name?}` (интерфейс владельца только на localhost) |
| GET | `/api/qr?text=…` | QR-код (SVG) |

### Задачи импорта

`GET /api/imports/{id}` возвращает

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (выполняется другой импорт; они идут по одному), `running`, `done` или `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` из `total` страниц), `hashing` и `placing` (файлы), `saving`.
* `messages`: сообщения, найденные к этому моменту.
* `failed` добавляет `error`, например `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` добавляет `created` (`false`, если тот же экспорт уже импортировали) и `export` — сводку, которая есть и в `/api/state`.

Хранятся последние 16 завершённых задач; неизвестный id возвращает 404.

## Публичный

Без пароля, для посетителей ссылок для общего доступа:

| Метод | Путь | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | страница посетителя |
| GET | `/api/s/{name}` | сведения стартовой страницы |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | лента |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | как для владельца; `regenerate` и `respond` без нового сообщения посетителя («пусть пишет первым») — только там, где у ссылки есть `allow_regenerate` / `allow_nudge` (иначе `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | медиа, которые посетитель может видеть |

## Хаб ретрансляции

| Метод | Путь | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, занять или переименовать (`Authorization: Bearer <секрет>`) |
| GET | `/relay/v1/connect` | WebSocket приложения |
| GET | `/relay/v1/info` | сведения о хабе |
| * | `/relay/v1/tg/bot<секрет>/<метод>` | прокси Bot API общего бота |
