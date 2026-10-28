# 데스크톱 앱

데스크톱 앱([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`)은 `rooftop serve`와 같은 서버를 무작위 `127.0.0.1` 포트에서 실행하고, 네이티브 창에 보여 줍니다.

| 플랫폼 | 설치 |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, 또는 [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg)용 또는 [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg)용 `.dmg` |
| Windows 10 및 11 | [설치 프로그램 (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) 또는 [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage)(모든 배포판), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb)(Debian, Ubuntu), 또는 [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm)(Fedora) |

다운로드 링크는 항상 최신 릴리스를 가리킵니다.

::: warning 빌드가 아직 서명되지 않았습니다
macOS에서는 앱을 한 번 연 뒤 **시스템 설정 → 개인정보 보호 및 보안 → 그래도 열기**를 누르세요. Windows에서는 SmartScreen에서 **추가 정보 → 실행**을 선택하세요. 애니메이션이 있는 단계별 안내: [서명되지 않은 앱 열기](./unsigned-apps).
:::

## 첫 실행

앱은 셸이나 `.env`를 읽지 않으므로 **모델 연결**이라는 화면으로 맞이합니다. **설정**을 열어 엔드포인트, 키, 모델을 입력하고 **테스트**를 누르세요. `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`, 또는 `OPENAI_TEMPERATURE`가 설정되어 있으면, 그 값이 초기 기본값이 됩니다.

| | |
|---|---|
| 데이터 | 운영체제의 앱 데이터 폴더. 예: macOS에서는 `~/Library/Application Support/top.iroof.desktop` |
| 공유 링크 | 같은 Wi‑Fi에서 또는 인터넷을 통해: [다른 기기에서 링크 열기](../features/share-links#open-links-on-other-devices) |
| 다른 사이트 | `t.me` 같은 링크는 브라우저에서 열립니다 |
| macOS 창 | 시스템 제목 표시줄이 없습니다. 앱의 머리글이 신호등 버튼 아래까지 이어지며 창을 드래그합니다 |
| 가져오기 | 앱이 내보내기를 직접 읽습니다. **폴더 선택…**은 시스템 선택기를 열고, 놓은 폴더, `.zip`, 또는 `.txt`는 있는 곳에서 바로 가져옵니다. 아무것도 업로드되지 않으며, 원본은 그대로 남습니다. APFS에서는 미디어를 복사하지 않고 복제하므로, 13 GB 내보내기도 추가 공간을 거의 차지하지 않습니다 |

## 직접 빌드하기 {#build-it-yourself}

Rust ≥ 1.95와 Node.js가 필요하며, Linux에서는 [Tauri 필수 요건](https://v3.tauri.app/start/prerequisites/)도 필요합니다.

```sh
cd desktop
npm ci
npm run build                          # 설치 프로그램은 desktop/target/release/bundle/에 생성
npm run build -- --debug --no-bundle   # 바이너리만
```

macOS에서 `npm run build`는 `.dmg`도 만들며, DMG 창을 정리하기만 하는 Finder AppleScript는 건너뜁니다(*자동화* 권한이 없으면 실패합니다). 배포된 DMG와 같은 Finder 레이아웃을 유지하려면 `ROOFTOP_DMG_FINDER=1`을 설정하세요. `desktop/dmg/`의 배경에 앱에서 *응용 프로그램*으로 가는 화살표가 있고, 볼륨의 숨김 파일은 보이지 않는 곳으로 옮겨집니다. `desktop/dmg/background.svg`를 편집한 뒤에는 `desktop/dmg/make-background.sh`를 실행하세요.
