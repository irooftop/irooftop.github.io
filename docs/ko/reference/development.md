# 개발

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| 테스트 범위 | |
|---|---|
| 파서와 변환 | `examples/telegram`과 `examples/whatsapp` 기준 |
| 공유 링크 | 방문자 격리, PIN 잠금, 미디어 허용 목록, 방, 이름, 차단, 인증 우회 |
| MCP 클라이언트 | 모든 프로토콜 세대의 모의 서버(HTTP, 이전 SSE, stdio) |
| 릴레이 | 허브, 이름, 전달 |

데스크톱 크레이트는 별도입니다: `cd desktop && cargo check`.

## 구조

```
src/        서버(axum), 파서, LLM 에이전트, MCP 클라이언트, 공유 링크, 릴레이, Telegram
  server/     소유자 HTTP API, 영역마다 파일 하나: 에셋, 업로드, 내보내기, 채팅,
              메시지, 설정, 미디어. mod.rs가 라우터를 구성
  share_api/  공유 링크: owner.rs(링크와 방문자 관리), visitor.rs(/s/…)
web/        UI: index.html, app.css, js/(하나의 app.js로 제공되며 바이너리에 포함)
  js/         UI 영역마다 파일 하나, 로드 순서대로 번호가 매겨짐(하나의 스크립트, 하나의 범위)
desktop/    같은 서버를 감싸는 Tauri 앱
deploy/     Caddy + Docker Compose
examples/   가상의 내보내기 두 개
```

문서와 iroof.top의 랜딩 페이지는 이 저장소에 없습니다. [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io)에 있습니다: `docs/`(이 사이트)와 `landing/`.

## 문서

문서는 [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io)에 있습니다. 이미지와 앱 버전은 이 저장소에서 가져옵니다. 두 저장소를 나란히 클론한 뒤 거기서 빌드하세요.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

사이트는 `docs/`를 바꾸는 그 저장소의 `main`에 push할 때마다 [irooftop.github.io](https://irooftop.github.io)에 게시됩니다. `demo.svg`는 앱 저장소에서 `python3 scripts/demo-svg.py`로 생성됩니다(GitHub가 표시할 수 있도록 순수 SVG와 CSS입니다).

## 릴리스

```
 Cargo.toml 올리기 ─▶ 태그 vX.Y.Z ─┬─▶ Release: crates.io + ghcr.io 이미지 (amd64 + arm64, 네이티브 러너)
                                   └─▶ desktop: 설치 프로그램 ─▶ 릴리스 게시(최신) ─▶ Homebrew: formula + cask
```

1. `Cargo.toml`(과 `desktop/`)의 `version`을 올리고, 커밋한 뒤 `vX.Y.Z` 태그를 push하세요. Windows MSI를 위해 태그는 숫자로만 이루어져야 합니다. 그 이후의 모든 것은 추가 클릭 없이 실행됩니다.
2. *Release*는 크레이트(`CARGO_REGISTRY_TOKEN` 시크릿, `crates-io` 환경)와 Docker 이미지를 게시합니다. 아키텍처마다 네이티브 러너(`ubuntu-latest`, `ubuntu-24.04-arm`)에서 하나의 작업이 digest로 push하고, `merge` 작업이 다중 아키텍처 태그를 만듭니다. 크레이트 게시를 확인하려면 `dry_run`과 함께 수동으로 실행하세요.
3. *desktop*은 macOS(arm64, x64), Windows, Linux용 설치 프로그램을 초안 릴리스에 빌드합니다. 모두 첨부되면, 그 `publish` 작업이 생성된 릴리스 노트를 추가하고, 릴리스를 게시하며, 최신으로 표시합니다.
4. 그 `homebrew` 작업은 이후 *Homebrew*를 호출하고, 이것이 `Formula/rooftop.rb`와 `Casks/irooftop.rb`를 [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap)에 push합니다. `HOMEBREW_TAP_TOKEN` 시크릿(세분화된 토큰, `irooftop/homebrew-tap`, Contents: 읽기 및 쓰기) 또는 `HOMEBREW_TAP_DEPLOY_KEY`가 필요합니다. 둘 중 어느 것도 없으면 알림과 함께 건너뜁니다. (`GITHUB_TOKEN`으로 게시된 릴리스는 `release: published`를 발생시키지 않으므로, 호출은 명시적으로 이루어집니다. 릴리스를 수동으로 게시하면 여전히 그 이벤트를 통해 Homebrew가 실행됩니다.)

기존 태그에 대해 tap 업데이트를 다시 실행하려면(예: 시크릿을 추가한 뒤):

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap 체크아웃>`은 같은 파일을 로컬에서 만듭니다. 태그의 설치 프로그램이 실패했다면, 실패한 *desktop* 작업을 다시 실행하세요. `publish`와 `homebrew`는 통과하면 이어서 진행됩니다.
