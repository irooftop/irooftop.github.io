# CLI

```text
rooftop [serve] [옵션]           웹 서버를 실행 (기본값)
rooftop parse <폴더>             정규화된 내보내기를 JSON으로 출력
rooftop convert [옵션] <폴더>    내보내기의 {model, messages, tools}를 출력
```

## `serve`

| 옵션 | 변수 | 기본값 |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (제한 없음) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | 봇이 참여하는 모든 그룹 |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | 꺼짐 |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline`은 로컬이 아닌 모델과 MCP 엔드포인트를 거부하고, 인터넷 공유와 Telegram 봇을 끕니다([오프라인과 개인정보 보호](../guide/offline)). `--relay-domain`과 함께 쓸 수 없습니다. 각각이 하는 일: [설정](./configuration).

## `parse`와 `convert`

```sh
rooftop parse   ./examples/telegram                          # 정규화된 JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # 모델이 받는 것
```

| `convert` 옵션 | 기본값 | |
|---|---|---|
| `--persona` | 채팅 제목 / 상대방 | LLM이 누구의 이름으로 말할지 |
| `--user` | 다른 참여자 | 사람을 연기하는 쪽 |
| `--budget` | `120000` | 문자 단위의 기록 예산 |

앱에서는 `{ }` 버튼이 현재 채팅에 대해 같은 JSON을 보여 줍니다.
