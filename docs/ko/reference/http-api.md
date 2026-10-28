# HTTP API

HTTP 위의 JSON입니다. `ROOFTOP_PASSWORD`가 설정되어 있으면 소유자 API는 HTTP Basic 인증이 필요합니다.

## 소유자

| 메서드 | 경로 | |
|---|---|---|
| GET | `/api/state` | 내보내기, 채팅, 공유 링크, LLM 정보 |
| POST | `/api/exports` | 멀티파트 업로드: 상대 이름을 가진 폴더 파일, 또는 `.zip`. 즉시 `202 {"id"}`로 응답하고 백그라운드에서 가져옴 |
| POST | `/api/uploads` | 일괄 업로드 시작(웹 UI가 사용): `{"id"}` |
| POST | `/api/uploads/{id}/files` | 상대 이름을 가진 파일의 멀티파트 묶음. 같은 묶음을 다시 보내면 그 파일들이 교체됨: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | 채팅 파일 뒤, 미디어 앞에: 아직 보내지 않은 `{"bytes"}` → `{title, messages, existing, fits, free_bytes, needed_bytes}`(이미 가져왔는지? 디스크 공간이 충분한지?) |
| POST | `/api/uploads/{id}/import` | 지금까지 업로드한 모든 것을 가져옴: 가져오기 작업의 `202 {"id"}` |
| DELETE | `/api/uploads/{id}` | 완료되지 않은 업로드를 버림(방치된 것은 24시간 뒤와 재시작할 때 삭제됨) |
| POST | `/api/local/pick` | 데스크톱 앱 전용: 네이티브 선택기를 표시, `{"kind": "folder" \| "file"}` → `{"path"}`(취소하면 `null`) |
| POST | `/api/local/import` | 데스크톱 앱 전용: 이 컴퓨터에서 가져옴, `{"paths": […]}`(폴더, `.zip`, 또는 WhatsApp `.txt`. 한 내보내기 안의 파일은 그 폴더를 나타냄) → 가져오기 작업의 `202 {"id", "name"}`. 원본은 복사되며, 절대 변경되지 않음 |
| GET | `/api/imports/{id}` | 가져오기 작업의 진행 상황. 아래 참고 |
| GET · DELETE | `/api/exports/{id}` | 미디어 라이브러리 포함 세부 정보 · 채팅과 함께 삭제 |
| POST | `/api/exports/{id}/describe` | 미디어 라이브러리를 설명 |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`. `export_id`가 없으면 메모만으로 만든 채팅: `persona`는 상대의 이름, `user`는 사용자의 이름(기본값 `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | 타임라인(`?limit=`) · 제목과 메모 · 삭제 |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}`(`""`이면 제거) |
| POST | `/api/chats/{id}/voice` | 멀티파트 `file`(wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | 페르소나가 행동하도록 함. 메시지와 순서가 있는 동작을 반환 |
| POST | `/api/chats/{id}/regenerate` | 페르소나의 마지막 턴을 버리고 다시 응답 |
| GET | `/api/chats/{id}/prompt` | 정확한 `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | 목록 · 공유 링크 만들기 |
| PATCH · DELETE | `/api/shares/{id}` | 편집(`pin: ""`이면 PIN 제거, `revoke_sessions`) · 삭제 |
| DELETE | `/api/shares/{id}/sessions/{session}` | 방문자 대화 하나를 종료 |
| GET · PUT | `/api/settings` | LLM, MCP, Telegram(`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP 상태 · 다시 연결 |
| GET · POST | `/api/telegram` · `/api/telegram/link` | 봇 상태와 그룹 · 봇을 그룹에 추가하는 `t.me` 링크 |
| GET · PUT | `/api/sharing` | Wi‑Fi와 인터넷 공유 `{lan?, internet?, name?}`(소유자 화면은 localhost만) |
| GET | `/api/qr?text=…` | QR 코드(SVG) |

### 가져오기 작업

`GET /api/imports/{id}`는 다음을 반환합니다.

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued`(다른 가져오기가 실행 중. 한 번에 하나씩 실행됨), `running`, `done`, 또는 `failed`.
* `stage`: `unpacking`, `reading`, `parsing`(`total` 페이지 중 `done`), `hashing`과 `placing`(파일), `saving`.
* `messages`: 지금까지 찾은 메시지 수.
* `failed`는 `error`를 추가합니다. 예: `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done`은 `created`(같은 내보내기를 이전에 가져왔다면 `false`)와 `export`를 추가합니다. `export`는 `/api/state`에도 있는 요약입니다.

최근 완료된 작업 16개가 보관되며, 알 수 없는 id는 404를 반환합니다.

## 공개

비밀번호 없음. 공유 링크 방문자용:

| 메서드 | 경로 | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | 방문자 페이지 |
| GET | `/api/s/{name}` | 시작 페이지 정보 |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | 타임라인 |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | 소유자와 같음. `regenerate`, 그리고 새 방문자 메시지가 없는 `respond`("먼저 말 걸기")는 링크에 `allow_regenerate` / `allow_nudge`가 있는 경우에만(아니면 `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | 방문자가 볼 수 있는 미디어 |

## 릴레이 허브

| 메서드 | 경로 | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, 이름을 차지하거나 바꿈(`Authorization: Bearer <비밀>`) |
| GET | `/relay/v1/connect` | 앱의 WebSocket |
| GET | `/relay/v1/info` | 허브 정보 |
| * | `/relay/v1/tg/bot<비밀>/<메서드>` | 공유 봇의 Bot API 프록시 |
