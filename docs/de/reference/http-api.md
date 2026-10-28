# HTTP-API

JSON über HTTP. Ist `ROOFTOP_PASSWORD` gesetzt, braucht die Eigentümer-API HTTP-Basic-Authentifizierung.

## Eigentümer

| Methode | Pfad | |
|---|---|---|
| GET | `/api/state` | Exporte, Chats, Share-Links, LLM-Info |
| POST | `/api/exports` | Multipart-Upload: Ordnerdateien mit relativen Namen, oder eine `.zip`. Antwortet sofort mit `202 {"id"}` und importiert im Hintergrund |
| POST | `/api/uploads` | startet einen gestapelten Upload (das nutzt die Weboberfläche): `{"id"}` |
| POST | `/api/uploads/{id}/files` | Multipart-Stapel von Dateien mit relativen Namen; erneutes Senden eines Stapels ersetzt seine Dateien: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | nach den Chat-Dateien, vor den Medien: `{"bytes"}` noch zu senden → `{title, messages, existing, fits, free_bytes, needed_bytes}` (schon importiert? genug Speicherplatz?) |
| POST | `/api/uploads/{id}/import` | importiert alles bisher Hochgeladene: `202 {"id"}` des Importjobs |
| DELETE | `/api/uploads/{id}` | verwirft einen unvollständigen Upload (verlassene werden nach 24 h und beim Neustart entfernt) |
| POST | `/api/local/pick` | nur Desktop-App: zeigt den nativen Auswahldialog, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` bei Abbruch) |
| POST | `/api/local/import` | nur Desktop-App: importiert von diesem Computer, `{"paths": […]}` (ein Ordner, `.zip` oder WhatsApp-`.txt`; Dateien innerhalb eines Exports stehen für dessen Ordner) → `202 {"id", "name"}` des Importjobs; die Quelle wird kopiert, nie verändert |
| GET | `/api/imports/{id}` | Fortschritt eines Importjobs, siehe unten |
| GET · DELETE | `/api/exports/{id}` | Details mit der Medienbibliothek · löschen mit seinen Chats |
| POST | `/api/exports/{id}/describe` | beschreibt die Medienbibliothek |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; ohne `export_id` ein Chat nur aus Notizen: `persona` ist ihr Name, `user` deiner (Standard `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | Zeitleiste (`?limit=`) · Titel und Notizen · löschen |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` entfernt) |
| POST | `/api/chats/{id}/voice` | Multipart-`file` (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | lässt die Person handeln; liefert Nachrichten und geordnete Aktionen |
| POST | `/api/chats/{id}/regenerate` | verwirft den letzten Zug der Person und antwortet erneut |
| GET | `/api/chats/{id}/prompt` | das exakte `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | auflisten · Share-Links erstellen |
| PATCH · DELETE | `/api/shares/{id}` | bearbeiten (`pin: ""` entfernt sie, `revoke_sessions`) · löschen |
| DELETE | `/api/shares/{id}/sessions/{session}` | beendet eine Besucherunterhaltung |
| GET · PUT | `/api/settings` | LLM, MCP und Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP-Status · neu verbinden |
| GET · POST | `/api/telegram` · `/api/telegram/link` | Bot-Status und Gruppen · ein `t.me`-Link, der den Bot zu einer Gruppe hinzufügt |
| GET · PUT | `/api/sharing` | Teilen über WLAN und Internet `{lan?, internet?, name?}` (Eigentümeroberfläche nur auf localhost) |
| GET | `/api/qr?text=…` | ein QR-Code (SVG) |

### Importjobs

`GET /api/imports/{id}` liefert

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (ein anderer Import läuft; sie laufen nacheinander), `running`, `done` oder `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` von `total` Seiten), `hashing` und `placing` (Dateien), `saving`.
* `messages`: bisher gefundene Nachrichten.
* `failed` ergänzt `error`, z. B. `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` ergänzt `created` (`false`, wenn derselbe Export schon einmal importiert wurde) und `export`, die Zusammenfassung, die auch in `/api/state` steht.

Die letzten 16 abgeschlossenen Jobs werden behalten; eine unbekannte ID antwortet mit 404.

## Öffentlich

Ohne Passwort, für Besucher von Share-Links:

| Methode | Pfad | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | die Besucherseite |
| GET | `/api/s/{name}` | Infos der Startseite |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | Zeitleiste |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | wie beim Eigentümer; `regenerate` und `respond` ohne neue Besuchernachricht („schreiben lassen“) nur, wenn der Link `allow_regenerate` / `allow_nudge` hat (sonst `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | Medien, die der Besucher sehen darf |

## Relay-Hub

| Methode | Pfad | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, beanspruchen oder umbenennen (`Authorization: Bearer <secret>`) |
| GET | `/relay/v1/connect` | die WebSocket der App |
| GET | `/relay/v1/info` | Hub-Infos |
| * | `/relay/v1/tg/bot<secret>/<method>` | der Bot-API-Proxy des geteilten Bots |
