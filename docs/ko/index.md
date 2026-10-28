---
layout: home

hero:
  name: iRoof.top
  text: 그리운 사람들과 이야기하세요
  tagline: 텔레그램이나 왓츠앱 대화를 내보내면, LLM이 그 사람의 말투로 대화를 이어 갑니다. 말풍선, 스티커, GIF, 반응, 목소리까지 그대로. 내 컴퓨터에서, 원하는 모델로, 필요하면 오프라인으로.
  actions:
    - theme: brand
      text: 시작하기
      link: /guide/getting-started
    - theme: alt
      text: 앱 다운로드
      link: /guide/desktop
    - theme: alt
      text: 작동 방식
      link: /features/how-it-works

features:
  - title: 말투까지, 단어만이 아니라
    details: 전체 내보내기에서 만든 스타일 프로필과, 말풍선·스티커·GIF·답장·반응 하나하나를 도구 호출로 모델에 다시 재생합니다.
    link: /features/how-it-works
    linkText: 작동 방식
  - title: 비공개, 원하면 오프라인으로
    details: 대화는 데이터 폴더에 남습니다. 로컬 모델과 오프라인 모드를 켜면, 내 컴퓨터 밖으로 나가는 요청은 모두 거부됩니다.
    link: /guide/offline
    linkText: 오프라인과 개인정보
  - title: 수년간의 대화, 기가바이트 단위의 미디어
    details: 12만 건이 넘는 메시지와 3만 개의 파일을 실시간 진행률과 함께 가져옵니다. 미디어를 올리기 전에 메시지로 중복 가져오기를 알아봅니다.
    link: /guide/export#large-exports
    linkText: 큰 내보내기
  - title: 사진, 스티커, 음성
    details: 보낸 것을 설명하고 음성을 글로 옮기는 미디어 보관함입니다. 원하는 순서로 처리하며 언제든 멈출 수 있습니다.
    link: /features/media
    linkText: 사진과 음성
  - title: 공유 링크
    details: 친구가 /s/이름 에서 페르소나와 대화하게 하세요. PIN과 제한을 두고, 내 Wi‑Fi에서 또는 name.iroof.top 으로.
    link: /features/share-links
    linkText: 공유 링크
  - title: Telegram에서 답하기
    details: 방문자의 메시지가 내 Telegram 그룹에 도착합니다. 직접 답하거나, 카운트다운 뒤 AI가 답하게 할 수 있습니다.
    link: /features/telegram
    linkText: Telegram
  - title: 어떤 모델이든, 어떤 MCP 서버든
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… 그리고 Streamable HTTP나 stdio로 쓰는 MCP 도구.
    link: /features/mcp
    linkText: MCP 도구
  - title: 숨기는 것 없음
    details: 모델에 보낸 정확한 JSON을 한 번의 클릭으로 볼 수 있습니다. 크기, 기록 예산, 사용한 토큰 수도 함께 나옵니다.
    link: /guide/getting-started#what-s-in-the-window
    linkText: 창 안의 내용
  - title: 작은 실행 파일 하나
    details: 웹 UI가 들어 있는 Rust 서버, macOS·Windows·Linux용 데스크톱 앱, Homebrew, 그리고 Docker 이미지.
    link: /guide/getting-started
    linkText: 설치
---

<div class="home-demo">

![실제 사람의 말투로 대화가 이어지고, 친구가 휴대폰으로 공유 링크를 여는 모습](/img/demo.svg)

</div>

## 1분 만에 시작하기

::: code-group

```sh [데스크톱 앱]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [완전 오프라인]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

이제 세 단계입니다. Telegram Desktop이나 WhatsApp에서 **[대화를 내보내고](/ko/guide/export)**, 폴더나 `.zip`, `.txt`를 페이지에 **끌어다 놓은 뒤**, **New chat**을 눌러 AI 역할을 누가 맡을지 고르세요. 상대방이 할지, 내가 할지.
가진 대화가 없다면 가상의 대화로 해 보세요: `rooftop --import ./examples/telegram`.
(앱의 버튼 이름은 앱과 마찬가지로 영어입니다.)

## 작동 방식

<div class="wide">

![Telegram이나 WhatsApp 내보내기가 iRoof.top으로 들어가고, LLM이 답을 쓰며 대화가 이어지는 모습](/how-it-works.svg)

</div>

내보내기는 내 컴퓨터에서 한 번 읽힙니다. 답할 때마다 모델은 스타일 프로필, 내 메모, 미디어 설명을 담은 시스템 프롬프트를 받고, 이어서 [기록 예산](/ko/reference/configuration#settings-only)에 들어가는 가장 최근 대화 부분을 받습니다. 오래된 부분은 짧은 기억으로 접히고, 페르소나는 여전히 그것을 검색할 수 있습니다. 모델은 도구 호출(`send_message`, `send_sticker`, `react`…)로 답하고, 이것이 말풍선, 스티커, 반응이 됩니다. [더 보기 →](/ko/features/how-it-works)

## 내 대화는 어디로 갈까

| | 네트워크 |
|---|---|
| 가져오기, 스타일 프로필, 검색, 저장 | 없음: 모두 내 컴퓨터에서 이루어집니다 |
| 답 하나, 기억 요약 | 내가 고른 모델 엔드포인트, 그 밖에는 없음 |
| 미디어 설명, 음성 글로 옮기기 | 미디어 모델, **Describe**를 누를 때만 |
| 인터넷을 통한 공유 링크, Telegram | 켰을 때만; [오프라인 모드](/ko/guide/offline)에서는 꺼집니다 |

## 질문

::: details 어떤 모델을 써야 하나요?
OpenAI 호환 `/chat/completions` 엔드포인트 뒤에 있는 **도구 호출**을 지원하는 채팅 모델이면 됩니다. 큰 모델일수록 말투를 더 잘 흉내 냅니다. 미디어 보관함의 **Describe**에는 미디어 모델이 이미지를 받을 수 있어야 하고(음성 메시지에는 오디오도), 설정의 **Test**가 거부된 키나 알 수 없는 모델처럼 무엇이 잘못됐는지 쉬운 말로 알려 줍니다.
:::

::: details 비용은 얼마인가요?
로컬 모델이면 없습니다. 클라우드 모델이면 토큰 단위로 제공자에게 지불합니다. 답 하나의 입력은 대략 기록 예산 하나만큼입니다(기본값 12만 자 ≈ 3만 4천 토큰. 프롬프트는 캐시할 수 있게 만들어져서, 프롬프트 캐싱을 지원하는 제공자는 대부분을 캐시 가격으로 청구합니다). 여기에 짧은 도구 호출 몇 번이 더해집니다. 답마다 덜 내고 싶다면 설정에서 예산을 줄이세요.
:::

::: details 내보내기가 작아야 하나요?
아니요. 메시지 12만 건과 13 GB 미디어가 있는 내보내기도 브라우저에서나 `rooftop --import <폴더>`로 잘 가져옵니다. 검색과 기록 예산 덕분에 대화가 아무리 길어도 답마다 프롬프트 크기는 같게 유지됩니다.
:::

::: details 친구도 페르소나와 대화할 수 있나요?
네, [공유 링크](/ko/features/share-links)로 가능합니다. 내 Wi‑Fi에서 또는 인터넷으로 `name.iroof.top`에서, PIN과 메시지 제한을 두고 쓸 수 있습니다. 방문자는 대화만 봅니다: 설정, 메모, 프롬프트, 다른 대화는 보이지 않습니다.
:::

::: tip 돌봄에 관한 참고
이것은 멀리 있는 사람들과 가까이 있기 위한 것입니다. 페르소나는 역할을 지키지만, 내가 진지하게 AI와 대화하는지 묻는다면 솔직하게 답하고, 내가 힘들어 보이면 배려하며 응답합니다.
:::
