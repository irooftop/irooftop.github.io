# 시작하기

## 설치 {#install}

| | 명령 |
|---|---|
| **데스크톱 앱**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **데스크톱 앱**, Windows | [설치 프로그램 (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) 또는 [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **데스크톱 앱**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) 또는 [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **서버**, macOS 및 Linux | `brew install irooftop/tap/rooftop` (이후 `brew services start rooftop`) |
| **서버**, Rust ≥ 1.88이 있는 곳 어디서나 | `cargo install rooftop` |
| **서버**, 컨테이너 | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

데스크톱 앱은 터미널이 필요 없습니다. [데스크톱 앱](./desktop)을 참고하세요.

## 실행

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # 기본값; OpenAI 호환 API라면 무엇이든 동작합니다
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # 도구 호출을 지원해야 합니다
rooftop                                               # http://127.0.0.1:8080
```

변수는 `rooftop`을 실행하는 위치의 `.env` 파일에 두거나, 나중에 **설정**에서 지정할 수도 있습니다.
설정의 **테스트**는 작은 요청을 보내고, 무엇이 잘못됐는지 쉬운 말로 알려 줍니다. 예를 들어
"openrouter.ai가 API 키를 거부했습니다 (401)".

아무것도 컴퓨터 밖으로 나가지 않기를 원하면 로컬 모델과 [오프라인 모드](./offline)를 사용하세요.

## 첫 번째 채팅

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. 채팅 내보내기│ ──▶ │ 2. 페이지에        │ ──▶ │ 3. 새 채팅: AI가     │
 │              │     │    끌어다 놓기     │     │ 누구를 연기할지 선택 │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. Telegram Desktop 또는 WhatsApp에서 [채팅을 내보내세요](./export).
2. 폴더, `.zip`, 또는 WhatsApp `.txt`를 페이지에 끌어다 놓으세요(또는 `rooftop --import <폴더>`로 시작하세요).
3. **새 채팅**을 누르고 페르소나를 고르세요. 상대방이거나, 자기 자신("내 말투로 나와 대화하기")입니다.

::: tip 내 채팅 없이 시험해 보기
저장소에는 [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples)에 가상의 내보내기가 두 개 있습니다.
Telegram에서는 조나스와 프리야가 라자냐를 만들고, WhatsApp에서는 소피아와 다니엘이 주말을 보냅니다.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### 내보내기가 없나요? 메모에서 시작하세요

**새 채팅 → 메모에서**는 그 사람의 이름(본인 이름은 선택 사항)과 그 사람에 대한 몇 줄만 있으면 됩니다. 어떤 사람인지, 무엇을 함께하는지, 어떻게 말하는지("나를 자기라고 부름, 짧은 이탈리아어 메시지, ❤️ 많이"). AI는 그 메모만을 바탕으로 그 사람처럼 씁니다. 기록이 없으면 말투 프로필도 미디어 라이브러리도 없으므로, 메모가 말투를 자세히 설명할수록 더 가까워집니다. 채팅에서 메모를 언제든 편집할 수 있고(✎), 다른 채팅처럼 링크로 공유할 수 있습니다. 채팅을 삭제하면 그 안의 모든 내용이 삭제됩니다.

## 창에 있는 것

| 버튼 | 기능 |
|---|---|
| **공유** | 친구들이 페르소나와 대화할 수 있는 [링크](../features/share-links) |
| **미디어 라이브러리** | 모든 스티커, GIF, 사진, 음성 메시지와 AI가 그것에 대해 아는 내용 |
| **메모** | 내보내기에 없는, 그 사람에 대한 내용. 페르소나는 읽고, 방문자는 절대 읽지 못합니다 |
| **`{ }`** | 모델로 보내지는 정확한 JSON과 사용된 토큰 |
| **다시 쓰기** | 페르소나의 마지막 답변을 버리고 다시 씁니다 |
| **먼저 말 걸기** | 페르소나가 대화를 시작합니다 |
