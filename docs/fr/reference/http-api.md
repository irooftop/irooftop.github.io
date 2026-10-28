# API HTTP

JSON sur HTTP. Lorsque `ROOFTOP_PASSWORD` est défini, l'API du propriétaire exige une authentification HTTP Basic.

## Propriétaire

| Méthode | Chemin | |
|---|---|---|
| GET | `/api/state` | exports, chats, liens de partage, infos LLM |
| POST | `/api/exports` | envoi multipart : fichiers d'un dossier avec des noms relatifs, ou un `.zip`. Répond `202 {"id"}` immédiatement et importe en arrière-plan |
| POST | `/api/uploads` | démarre un envoi par lots (ce qu'utilise l'interface web) : `{"id"}` |
| POST | `/api/uploads/{id}/files` | lot multipart de fichiers avec des noms relatifs ; renvoyer un lot remplace ses fichiers : `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | après les fichiers de chat, avant les médias : `{"bytes"}` encore à envoyer → `{title, messages, existing, fits, free_bytes, needed_bytes}` (déjà importé ? assez d'espace disque ?) |
| POST | `/api/uploads/{id}/import` | importe tout ce qui a été envoyé jusqu'ici : `202 {"id"}` de la tâche d'import |
| DELETE | `/api/uploads/{id}` | abandonne un envoi inachevé (les envois abandonnés sont supprimés après 24 h et au redémarrage) |
| POST | `/api/local/pick` | application de bureau uniquement : affiche le sélecteur natif, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` si annulé) |
| POST | `/api/local/import` | application de bureau uniquement : importe depuis cet ordinateur, `{"paths": […]}` (un dossier, un `.zip` ou un `.txt` WhatsApp ; les fichiers d'un même export représentent son dossier) → `202 {"id", "name"}` de la tâche d'import ; la source est copiée, jamais modifiée |
| GET | `/api/imports/{id}` | progression d'une tâche d'import, voir plus bas |
| GET · DELETE | `/api/exports/{id}` | détails avec la médiathèque · supprimer avec ses chats |
| POST | `/api/exports/{id}/describe` | décrit la médiathèque |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}` ; sans `export_id`, un chat à partir de notes seules : `persona` est son nom, `user` le vôtre (par défaut `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | chronologie (`?limit=`) · titre et notes · supprimer |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` supprime) |
| POST | `/api/chats/{id}/voice` | `file` multipart (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | laisse le personnage agir ; renvoie les messages et les actions ordonnées |
| POST | `/api/chats/{id}/regenerate` | supprime le dernier tour du personnage et répond de nouveau |
| GET | `/api/chats/{id}/prompt` | le `{model, messages, tools}` exact |
| GET · POST | `/api/chats/{id}/shares` | lister · créer des liens de partage |
| PATCH · DELETE | `/api/shares/{id}` | modifier (`pin: ""` le supprime, `revoke_sessions`) · supprimer |
| DELETE | `/api/shares/{id}/sessions/{session}` | termine une conversation de visiteur |
| GET · PUT | `/api/settings` | LLM, MCP et Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | état MCP · reconnecter |
| GET · POST | `/api/telegram` · `/api/telegram/link` | état du bot et groupes · un lien `t.me` qui ajoute le bot à un groupe |
| GET · PUT | `/api/sharing` | partage Wi‑Fi et Internet `{lan?, internet?, name?}` (interface propriétaire sur localhost uniquement) |
| GET | `/api/qr?text=…` | un code QR (SVG) |

### Tâches d'import

`GET /api/imports/{id}` renvoie

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state` : `queued` (un autre import est en cours ; ils s'exécutent un à la fois), `running`, `done` ou `failed`.
* `stage` : `unpacking`, `reading`, `parsing` (`done` sur `total` pages), `hashing` et `placing` (fichiers), `saving`.
* `messages` : messages trouvés jusqu'ici.
* `failed` ajoute `error`, par ex. `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` ajoute `created` (`false` si le même export avait déjà été importé) et `export`, le résumé également présent dans `/api/state`.

Les 16 dernières tâches terminées sont conservées ; un identifiant inconnu renvoie 404.

## Public

Sans mot de passe, pour les visiteurs des liens de partage :

| Méthode | Chemin | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | la page du visiteur |
| GET | `/api/s/{name}` | infos de la page d'accueil |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | chronologie |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | comme pour le propriétaire ; `regenerate`, et `respond` sans nouveau message du visiteur (« écrire en premier »), seulement lorsque le lien a `allow_regenerate` / `allow_nudge` (sinon `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | médias que le visiteur peut voir |

## Hub relais

| Méthode | Chemin | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, réserver ou renommer (`Authorization: Bearer <secret>`) |
| GET | `/relay/v1/connect` | la WebSocket de l'application |
| GET | `/relay/v1/info` | infos du hub |
| * | `/relay/v1/tg/bot<secret>/<méthode>` | le proxy Bot API du bot partagé |
