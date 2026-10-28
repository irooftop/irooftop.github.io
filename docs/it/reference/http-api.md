# API HTTP

JSON su HTTP. Con `ROOFTOP_PASSWORD` impostata, l'API del proprietario richiede l'autenticazione HTTP Basic.

## Proprietario

| Metodo | Percorso | |
|---|---|---|
| GET | `/api/state` | esportazioni, chat, link di condivisione, info LLM |
| POST | `/api/exports` | caricamento multipart: file di una cartella con nomi relativi, oppure uno `.zip`. Risponde subito `202 {"id"}` e importa in background |
| POST | `/api/uploads` | avvia un caricamento a gruppi (quello che usa l'interfaccia web): `{"id"}` |
| POST | `/api/uploads/{id}/files` | gruppo multipart di file con nomi relativi; rinviare un gruppo sostituisce i suoi file: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | dopo i file della chat, prima dei media: `{"bytes"}` ancora da inviare → `{title, messages, existing, fits, free_bytes, needed_bytes}` (già importata? spazio su disco sufficiente?) |
| POST | `/api/uploads/{id}/import` | importa tutto ciò che è stato caricato finora: `202 {"id"}` del job di importazione |
| DELETE | `/api/uploads/{id}` | scarta un caricamento incompleto (quelli abbandonati vengono rimossi dopo 24 h e al riavvio) |
| POST | `/api/local/pick` | solo app desktop: mostra il selettore nativo, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` se annullato) |
| POST | `/api/local/import` | solo app desktop: importa da questo computer, `{"paths": […]}` (una cartella, uno `.zip` o un `.txt` di WhatsApp; i file dentro un'esportazione rappresentano la sua cartella) → `202 {"id", "name"}` del job di importazione; l'origine viene copiata, mai modificata |
| GET | `/api/imports/{id}` | avanzamento di un job di importazione, vedi sotto |
| GET · DELETE | `/api/exports/{id}` | dettagli con la libreria media · eliminare con le sue chat |
| POST | `/api/exports/{id}/describe` | descrive la libreria media |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; senza `export_id`, una chat solo da note: `persona` è il suo nome, `user` il tuo (predefinito `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | cronologia (`?limit=`) · titolo e note · eliminare |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` rimuove) |
| POST | `/api/chats/{id}/voice` | `file` multipart (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | lascia agire il personaggio; restituisce i messaggi e le azioni in ordine |
| POST | `/api/chats/{id}/regenerate` | scarta l'ultimo turno del personaggio e risponde di nuovo |
| GET | `/api/chats/{id}/prompt` | il `{model, messages, tools}` esatto |
| GET · POST | `/api/chats/{id}/shares` | elencare · creare link di condivisione |
| PATCH · DELETE | `/api/shares/{id}` | modificare (`pin: ""` lo rimuove, `revoke_sessions`) · eliminare |
| DELETE | `/api/shares/{id}/sessions/{session}` | termina una conversazione di visitatore |
| GET · PUT | `/api/settings` | LLM, MCP e Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | stato MCP · riconnetti |
| GET · POST | `/api/telegram` · `/api/telegram/link` | stato del bot e gruppi · un link `t.me` che aggiunge il bot a un gruppo |
| GET · PUT | `/api/sharing` | condivisione Wi‑Fi e Internet `{lan?, internet?, name?}` (interfaccia del proprietario solo su localhost) |
| GET | `/api/qr?text=…` | un codice QR (SVG) |

### Job di importazione

`GET /api/imports/{id}` restituisce

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (un'altra importazione è in corso; girano una alla volta), `running`, `done` o `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` di `total` pagine), `hashing` e `placing` (file), `saving`.
* `messages`: messaggi trovati finora.
* `failed` aggiunge `error`, per esempio `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` aggiunge `created` (`false` se la stessa esportazione era già stata importata) e `export`, il riepilogo presente anche in `/api/state`.

Vengono conservati gli ultimi 16 job completati; un id sconosciuto restituisce 404.

## Pubblico

Senza password, per i visitatori dei link di condivisione:

| Metodo | Percorso | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | la pagina del visitatore |
| GET | `/api/s/{name}` | informazioni della pagina iniziale |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | cronologia |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | come per il proprietario; `regenerate`, e `respond` senza un nuovo messaggio del visitatore («scrivi per primo»), solo dove il link ha `allow_regenerate` / `allow_nudge` (altrimenti `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | i media che il visitatore può vedere |

## Hub relay

| Metodo | Percorso | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, rivendica o rinomina (`Authorization: Bearer <segreto>`) |
| GET | `/relay/v1/connect` | la WebSocket dell'app |
| GET | `/relay/v1/info` | informazioni sull'hub |
| * | `/relay/v1/tg/bot<segreto>/<metodo>` | il proxy Bot API del bot condiviso |
