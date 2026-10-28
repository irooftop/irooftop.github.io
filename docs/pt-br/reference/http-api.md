# API HTTP

JSON sobre HTTP. Com `ROOFTOP_PASSWORD` definida, a API do proprietário exige autenticação HTTP Basic.

## Proprietário

| Método | Caminho | |
|---|---|---|
| GET | `/api/state` | exportações, chats, links de compartilhamento, informações do LLM |
| POST | `/api/exports` | envio multipart: arquivos de uma pasta com nomes relativos, ou um `.zip`. Responde `202 {"id"}` na hora e importa em segundo plano |
| POST | `/api/uploads` | inicia um envio em lotes (o que a interface web usa): `{"id"}` |
| POST | `/api/uploads/{id}/files` | lote multipart de arquivos com nomes relativos; reenviar um lote substitui os seus arquivos: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | depois dos arquivos do chat, antes da mídia: `{"bytes"}` ainda a enviar → `{title, messages, existing, fits, free_bytes, needed_bytes}` (já importada? há espaço no disco?) |
| POST | `/api/uploads/{id}/import` | importa tudo o que foi enviado até agora: `202 {"id"}` do job de importação |
| DELETE | `/api/uploads/{id}` | descarta um envio incompleto (os abandonados são removidos após 24 h e na reinicialização) |
| POST | `/api/local/pick` | só app de desktop: mostra o seletor nativo, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` se cancelado) |
| POST | `/api/local/import` | só app de desktop: importa deste computador, `{"paths": […]}` (uma pasta, `.zip` ou `.txt` do WhatsApp; arquivos dentro de uma exportação representam a pasta dela) → `202 {"id", "name"}` do job de importação; a origem é copiada, nunca alterada |
| GET | `/api/imports/{id}` | progresso de um job de importação, veja abaixo |
| GET · DELETE | `/api/exports/{id}` | detalhes com a biblioteca de mídia · excluir com os seus chats |
| POST | `/api/exports/{id}/describe` | descreve a biblioteca de mídia |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; sem `export_id`, um chat só a partir de notas: `persona` é o nome dela, `user` o seu (padrão `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | linha do tempo (`?limit=`) · título e notas · excluir |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` remove) |
| POST | `/api/chats/{id}/voice` | `file` multipart (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | deixa a persona agir; devolve as mensagens e as ações em ordem |
| POST | `/api/chats/{id}/regenerate` | descarta o último turno da persona e responde de novo |
| GET | `/api/chats/{id}/prompt` | o `{model, messages, tools}` exato |
| GET · POST | `/api/chats/{id}/shares` | listar · criar links de compartilhamento |
| PATCH · DELETE | `/api/shares/{id}` | editar (`pin: ""` remove, `revoke_sessions`) · excluir |
| DELETE | `/api/shares/{id}/sessions/{session}` | encerra uma conversa de visitante |
| GET · PUT | `/api/settings` | LLM, MCP e Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | status do MCP · reconectar |
| GET · POST | `/api/telegram` · `/api/telegram/link` | status do bot e grupos · um link `t.me` que adiciona o bot a um grupo |
| GET · PUT | `/api/sharing` | compartilhamento por Wi‑Fi e Internet `{lan?, internet?, name?}` (interface do proprietário só em localhost) |
| GET | `/api/qr?text=…` | um QR code (SVG) |

### Jobs de importação

`GET /api/imports/{id}` retorna

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (outra importação está rodando; elas rodam uma por vez), `running`, `done` ou `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` de `total` páginas), `hashing` e `placing` (arquivos), `saving`.
* `messages`: mensagens encontradas até agora.
* `failed` acrescenta `error`, por exemplo `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` acrescenta `created` (`false` quando a mesma exportação já tinha sido importada) e `export`, o resumo também presente em `/api/state`.

Os 16 últimos jobs concluídos são mantidos; um id desconhecido retorna 404.

## Público

Sem senha, para os visitantes dos links de compartilhamento:

| Método | Caminho | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | a página do visitante |
| GET | `/api/s/{name}` | informações da página inicial |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | linha do tempo |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | como para o proprietário; `regenerate`, e `respond` sem uma nova mensagem do visitante ("deixar escrever primeiro"), só onde o link tem `allow_regenerate` / `allow_nudge` (senão `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | mídia que o visitante pode ver |

## Hub de relay

| Método | Caminho | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, reivindicar ou renomear (`Authorization: Bearer <segredo>`) |
| GET | `/relay/v1/connect` | o WebSocket do app |
| GET | `/relay/v1/info` | informações do hub |
| * | `/relay/v1/tg/bot<segredo>/<método>` | o proxy da Bot API do bot compartilhado |
