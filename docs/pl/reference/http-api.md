# API HTTP

JSON przez HTTP. Gdy ustawiono `ROOFTOP_PASSWORD`, API właściciela wymaga uwierzytelniania HTTP Basic.

## Właściciel

| Metoda | Ścieżka | |
|---|---|---|
| GET | `/api/state` | eksporty, czaty, linki udostępniania, informacje o LLM |
| POST | `/api/exports` | wysyłanie multipart: pliki folderu z nazwami względnymi albo `.zip`. Od razu odpowiada `202 {"id"}` i importuje w tle |
| POST | `/api/uploads` | rozpoczyna wysyłanie wsadowe (używane przez interfejs WWW): `{"id"}` |
| POST | `/api/uploads/{id}/files` | wsad multipart plików z nazwami względnymi; ponowne wysłanie wsadu zastępuje jego pliki: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | po plikach czatu, przed multimediami: `{"bytes"}` jeszcze do wysłania → `{title, messages, existing, fits, free_bytes, needed_bytes}` (już zaimportowany? wystarczy miejsca na dysku?) |
| POST | `/api/uploads/{id}/import` | importuje wszystko, co dotąd wysłano: `202 {"id"}` zadania importu |
| DELETE | `/api/uploads/{id}` | porzuca niedokończone wysyłanie (porzucone są usuwane po 24 h i przy ponownym uruchomieniu) |
| POST | `/api/local/pick` | tylko aplikacja desktopowa: pokazuje natywny wybór, `{"kind": "folder" \| "file"}` → `{"path"}` (`null`, gdy anulowano) |
| POST | `/api/local/import` | tylko aplikacja desktopowa: importuje z tego komputera, `{"paths": […]}` (folder, `.zip` lub `.txt` z WhatsAppa; pliki w jednym eksporcie oznaczają jego folder) → `202 {"id", "name"}` zadania importu; źródło jest kopiowane, nigdy nie zmieniane |
| GET | `/api/imports/{id}` | postęp zadania importu, patrz niżej |
| GET · DELETE | `/api/exports/{id}` | szczegóły z biblioteką mediów · usunięcie wraz z czatami |
| POST | `/api/exports/{id}/describe` | opisuje bibliotekę mediów |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; bez `export_id` czat tylko z notatek: `persona` to jej imię, `user` twoje (domyślnie `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | oś czasu (`?limit=`) · tytuł i notatki · usunięcie |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` usuwa) |
| POST | `/api/chats/{id}/voice` | `file` multipart (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | pozwala postaci działać; zwraca wiadomości i uporządkowane akcje |
| POST | `/api/chats/{id}/regenerate` | usuwa ostatnią turę postaci i odpowiada ponownie |
| GET | `/api/chats/{id}/prompt` | dokładny `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | lista · utworzenie linków udostępniania |
| PATCH · DELETE | `/api/shares/{id}` | edycja (`pin: ""` usuwa PIN, `revoke_sessions`) · usunięcie |
| DELETE | `/api/shares/{id}/sessions/{session}` | kończy jedną rozmowę odwiedzającego |
| GET · PUT | `/api/settings` | LLM, MCP i Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | status MCP · ponowne połączenie |
| GET · POST | `/api/telegram` · `/api/telegram/link` | status bota i grupy · link `t.me`, który dodaje bota do grupy |
| GET · PUT | `/api/sharing` | udostępnianie przez Wi‑Fi i Internet `{lan?, internet?, name?}` (interfejs właściciela tylko na localhost) |
| GET | `/api/qr?text=…` | kod QR (SVG) |

### Zadania importu

`GET /api/imports/{id}` zwraca

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (trwa inny import; działają po jednym), `running`, `done` albo `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` z `total` stron), `hashing` i `placing` (pliki), `saving`.
* `messages`: dotychczas znalezione wiadomości.
* `failed` dodaje `error`, np. `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` dodaje `created` (`false`, gdy ten sam eksport był już importowany) i `export`, podsumowanie, które jest też w `/api/state`.

Zachowywane jest ostatnich 16 zakończonych zadań; nieznany identyfikator zwraca 404.

## Publiczne

Bez hasła, dla odwiedzających linków udostępniania:

| Metoda | Ścieżka | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | strona odwiedzającego |
| GET | `/api/s/{name}` | informacje ze strony startowej |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | oś czasu |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | jak dla właściciela; `regenerate` i `respond` bez nowej wiadomości odwiedzającego („niech napiszą pierwsi”) tylko tam, gdzie link ma `allow_regenerate` / `allow_nudge` (inaczej `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | media, które odwiedzający może zobaczyć |

## Hub przekaźnika

| Metoda | Ścieżka | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, zajęcie lub zmiana nazwy (`Authorization: Bearer <sekret>`) |
| GET | `/relay/v1/connect` | WebSocket aplikacji |
| GET | `/relay/v1/info` | informacje o hubie |
| * | `/relay/v1/tg/bot<sekret>/<metoda>` | proxy Bot API wspólnego bota |
