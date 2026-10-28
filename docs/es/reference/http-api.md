# API HTTP

JSON sobre HTTP. Con `ROOFTOP_PASSWORD` definido, la API del propietario requiere autenticación HTTP Basic.

## Propietario

| Método | Ruta | |
|---|---|---|
| GET | `/api/state` | exportaciones, chats, enlaces para compartir, información del LLM |
| POST | `/api/exports` | subida multiparte: archivos de una carpeta con nombres relativos, o un `.zip`. Responde `202 {"id"}` al instante e importa en segundo plano |
| POST | `/api/uploads` | inicia una subida por lotes (lo que usa la interfaz web): `{"id"}` |
| POST | `/api/uploads/{id}/files` | lote multiparte de archivos con nombres relativos; reenviar un lote reemplaza sus archivos: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | tras los archivos de chat, antes de los medios: `{"bytes"}` aún por enviar → `{title, messages, existing, fits, free_bytes, needed_bytes}` (¿ya importada? ¿hay espacio en disco?) |
| POST | `/api/uploads/{id}/import` | importa todo lo subido hasta ahora: `202 {"id"}` del trabajo de importación |
| DELETE | `/api/uploads/{id}` | descarta una subida sin terminar (las abandonadas se eliminan tras 24 h y al reiniciar) |
| POST | `/api/local/pick` | solo app de escritorio: muestra el selector nativo, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` si se cancela) |
| POST | `/api/local/import` | solo app de escritorio: importa desde este equipo, `{"paths": […]}` (una carpeta, `.zip` o `.txt` de WhatsApp; los archivos dentro de una exportación representan su carpeta) → `202 {"id", "name"}` del trabajo de importación; el origen se copia, nunca se modifica |
| GET | `/api/imports/{id}` | progreso de un trabajo de importación, ver abajo |
| GET · DELETE | `/api/exports/{id}` | detalles con la biblioteca de medios · borrar con sus chats |
| POST | `/api/exports/{id}/describe` | describe la biblioteca de medios |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; sin `export_id`, un chat solo desde notas: `persona` es su nombre, `user` el tuyo (por defecto `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | cronología (`?limit=`) · título y notas · borrar |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` la elimina) |
| POST | `/api/chats/{id}/voice` | `file` multiparte (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | deja actuar a la persona; devuelve los mensajes y las acciones en orden |
| POST | `/api/chats/{id}/regenerate` | descarta el último turno de la persona y responde de nuevo |
| GET | `/api/chats/{id}/prompt` | el `{model, messages, tools}` exacto |
| GET · POST | `/api/chats/{id}/shares` | listar · crear enlaces para compartir |
| PATCH · DELETE | `/api/shares/{id}` | editar (`pin: ""` lo elimina, `revoke_sessions`) · borrar |
| DELETE | `/api/shares/{id}/sessions/{session}` | termina una conversación de visitante |
| GET · PUT | `/api/settings` | LLM, MCP y Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | estado de MCP · reconectar |
| GET · POST | `/api/telegram` · `/api/telegram/link` | estado del bot y grupos · un enlace `t.me` que añade el bot a un grupo |
| GET · PUT | `/api/sharing` | compartir por Wi‑Fi e Internet `{lan?, internet?, name?}` (interfaz del propietario solo en localhost) |
| GET | `/api/qr?text=…` | un código QR (SVG) |

### Trabajos de importación

`GET /api/imports/{id}` devuelve

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (otra importación está en curso; se ejecutan de una en una), `running`, `done` o `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` de `total` páginas), `hashing` y `placing` (archivos), `saving`.
* `messages`: mensajes encontrados hasta ahora.
* `failed` añade `error`, por ejemplo `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` añade `created` (`false` si la misma exportación se importó antes) y `export`, el resumen que también aparece en `/api/state`.

Se conservan los últimos 16 trabajos terminados; un id desconocido responde 404.

## Público

Sin contraseña, para los visitantes de los enlaces para compartir:

| Método | Ruta | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | la página del visitante |
| GET | `/api/s/{name}` | información de la página de inicio |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | cronología |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | igual que para el propietario; `regenerate`, y `respond` sin un nuevo mensaje del visitante («escribir primero»), solo donde el enlace tiene `allow_regenerate` / `allow_nudge` (si no, `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | medios que el visitante puede ver |

## Hub de relé

| Método | Ruta | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, reclamar o renombrar (`Authorization: Bearer <secreto>`) |
| GET | `/relay/v1/connect` | el WebSocket de la app |
| GET | `/relay/v1/info` | información del hub |
| * | `/relay/v1/tg/bot<secreto>/<método>` | el proxy de la API de Bot del bot compartido |
