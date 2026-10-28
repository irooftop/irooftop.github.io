# HTTP-API

JSON over HTTP. Met `ROOFTOP_PASSWORD` ingesteld vereist de eigenaars-API HTTP Basic-authenticatie.

## Eigenaar

| Methode | Pad | |
|---|---|---|
| GET | `/api/state` | exports, chats, sharelinks, LLM-info |
| POST | `/api/exports` | multipart-upload: mapbestanden met relatieve namen, of een `.zip`. Antwoordt direct met `202 {"id"}` en importeert op de achtergrond |
| POST | `/api/uploads` | start een upload in batches (wat de webinterface gebruikt): `{"id"}` |
| POST | `/api/uploads/{id}/files` | multipart-batch van bestanden met relatieve namen; opnieuw sturen van een batch vervangt zijn bestanden: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | na de chatbestanden, vóór de media: `{"bytes"}` nog te sturen → `{title, messages, existing, fits, free_bytes, needed_bytes}` (al geïmporteerd? genoeg schijfruimte?) |
| POST | `/api/uploads/{id}/import` | importeert alles wat tot nu toe is geüpload: `202 {"id"}` van de importtaak |
| DELETE | `/api/uploads/{id}` | verwijdert een onafgemaakte upload (verlaten uploads worden na 24 u en bij herstart verwijderd) |
| POST | `/api/local/pick` | alleen desktopapp: toont de native kiezer, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` bij annuleren) |
| POST | `/api/local/import` | alleen desktopapp: importeert van deze computer, `{"paths": […]}` (een map, `.zip` of WhatsApp-`.txt`; bestanden binnen één export staan voor de map ervan) → `202 {"id", "name"}` van de importtaak; de bron wordt gekopieerd, nooit gewijzigd |
| GET | `/api/imports/{id}` | voortgang van een importtaak, zie hieronder |
| GET · DELETE | `/api/exports/{id}` | details met de mediabibliotheek · verwijderen met zijn chats |
| POST | `/api/exports/{id}/describe` | beschrijft de mediabibliotheek |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; zonder `export_id` een chat alleen uit notities: `persona` is hun naam, `user` die van jou (standaard `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | tijdlijn (`?limit=`) · titel en notities · verwijderen |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` verwijdert) |
| POST | `/api/chats/{id}/voice` | multipart `file` (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | laat de persoon handelen; geeft berichten en acties in volgorde terug |
| POST | `/api/chats/{id}/regenerate` | verwijdert de laatste beurt van de persoon en antwoordt opnieuw |
| GET | `/api/chats/{id}/prompt` | de exacte `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | lijst · sharelinks maken |
| PATCH · DELETE | `/api/shares/{id}` | bewerken (`pin: ""` verwijdert hem, `revoke_sessions`) · verwijderen |
| DELETE | `/api/shares/{id}/sessions/{session}` | beëindigt één bezoekersgesprek |
| GET · PUT | `/api/settings` | LLM, MCP en Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP-status · opnieuw verbinden |
| GET · POST | `/api/telegram` · `/api/telegram/link` | botstatus en groepen · een `t.me`-link die de bot aan een groep toevoegt |
| GET · PUT | `/api/sharing` | delen via Wi‑Fi en internet `{lan?, internet?, name?}` (eigenaarsinterface alleen op localhost) |
| GET | `/api/qr?text=…` | een QR-code (SVG) |

### Importtaken

`GET /api/imports/{id}` geeft

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (een andere import draait; ze draaien één per keer), `running`, `done` of `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` van `total` pagina's), `hashing` en `placing` (bestanden), `saving`.
* `messages`: tot nu toe gevonden berichten.
* `failed` voegt `error` toe, bijvoorbeeld `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` voegt `created` toe (`false` als dezelfde export al eerder was geïmporteerd) en `export`, de samenvatting die ook in `/api/state` staat.

De laatste 16 afgeronde taken worden bewaard; een onbekend id geeft 404.

## Openbaar

Zonder wachtwoord, voor bezoekers van sharelinks:

| Methode | Pad | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | de bezoekerspagina |
| GET | `/api/s/{name}` | info van de startpagina |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | tijdlijn |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | zoals voor de eigenaar; `regenerate`, en `respond` zonder een nieuw bericht van de bezoeker ("eerst laten schrijven"), alleen waar de link `allow_regenerate` / `allow_nudge` heeft (anders `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | media die de bezoeker mag zien |

## Relayhub

| Methode | Pad | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, claimen of hernoemen (`Authorization: Bearer <secret>`) |
| GET | `/relay/v1/connect` | de WebSocket van de app |
| GET | `/relay/v1/info` | hub-info |
| * | `/relay/v1/tg/bot<secret>/<method>` | de Bot API-proxy van de gedeelde bot |
