# 설정

환경 변수, 작업 디렉터리의 `.env` 파일, 또는 해당하는 `rooftop` 옵션([CLI](./cli))으로 지정합니다. **설정**에서 정한 값은 LLM 엔드포인트, 모델, 키, 온도, 기록 예산, 도구 단계, MCP 서버, Telegram 봇, 오프라인 모드에 대해 환경보다 우선합니다. `TELEGRAM_BOT_TOKEN`은 설정보다 우선합니다.

## 모델

| 변수 | 기본값 | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | OpenAI 호환 API라면 무엇이든: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama(`http://localhost:11434/v1`), LM Studio(`http://localhost:1234/v1`), llama.cpp(`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | Bearer 토큰 |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | 도구 호출을 지원해야 함 |
| `OPENAI_TEMPERATURE` | 공급자 기본값 | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | 이미지를 설명하고 음성을 텍스트로 변환. 예: `xiaomi/mimo-v2.6-flash` |

## 오프라인

| 변수 | 기본값 | |
|---|---|---|
| `ROOFTOP_OFFLINE` | 꺼짐 | `1`, `true`, `yes`, `on`: 로컬 모델과 MCP 서버(이 컴퓨터 또는 네트워크)만, 인터넷 공유 없음, Telegram 없음. 설정의 **오프라인** 스위치와 같지만, 설정에서는 끌 수 없습니다. 데스크톱 앱도 이것을 따릅니다. [오프라인과 개인정보 보호](../guide/offline) |

## 서버

| 변수 | 기본값 | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (Docker에서는 `0.0.0.0:8080`) | `0.0.0.0:<포트>`이면 로그에 LAN 주소가 표시됨 |
| `ROOFTOP_DATA` | `./data` (Docker에서는 `/data`) | 내보내기, 채팅, 설정 |
| `ROOFTOP_IMPORT` | – | 시작할 때 가져올 내보내기. `:`로 구분, 멱등 |
| `ROOFTOP_PASSWORD` | – | 소유자 화면용 HTTP Basic 인증(사용자 이름은 아무거나). **공개 서버에서는 설정하세요** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | 소유자의 업로드 제한(MiB). `0`은 제한 없음(내보내기는 수 GB입니다). 다른 사람이 접근할 수 있는 서버에서는 설정하세요. 공유 링크는 자체 16 MiB 제한을 유지합니다. 데스크톱 앱에는 제한이 없습니다 |
| `ROOFTOP_TRUST_PROXY` | `false` | `X-Forwarded-For` / `X-Real-IP`에서 클라이언트 IP를 읽음. 리버스 프록시 뒤에서만 |
| `ROOFTOP_FFMPEG` | `PATH`의 `ffmpeg`, 다음으로 Homebrew, `/usr/local`, `/usr/bin` | GIF와 동영상의 프레임(선택 사항) |
| `TZ` | UTC | 실시간 메시지의 시간대 |

## Telegram

| 변수 | 기본값 | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | [@BotFather](https://t.me/BotFather)에서 받은 봇([Telegram에서 답변하기](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | 봇이 참여하는 모든 그룹 | 허용할 그룹 ID, 쉼표로 구분 |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | 예: 자체 호스팅한 Bot API 서버 |

## 릴레이

| 변수 | 기본값 | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | **인터넷** 공유와 공유 봇을 위한 릴레이 |
| `ROOFTOP_RELAY_DOMAIN` | – | 이 도메인의 [릴레이 허브](./relay-hub)를 실행 |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | 허브의 공유 봇. `TELEGRAM_BOT_TOKEN`과 달라야 함 |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | 허브가 보관하는 최대 이름 수 |

## 설정에서만 {#settings-only}

| 설정 | 기본값 | |
|---|---|---|
| 기록 예산 | `120000`자 | [메모리](../features/how-it-works#long-chats)가 개입하기 전에 재생되는 기록의 양 |
| 최대 도구 단계 | `6` | 답변당 LLM 라운드(검색, MCP 도구, 응답…) |
