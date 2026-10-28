# 서명되지 않은 앱 열기

데스크톱 설치 프로그램은 아직 서명이나 공증이 되어 있지 않으므로, 처음 실행하면 macOS와 Windows에서 경고가 표시됩니다. 이것은 한 번만 하는 단계입니다. 앱을 한 번 허용하면, 같은 방식으로 설치된 업데이트 이후에도 정상적으로 열립니다.

::: tip 피하고 싶다면?
[앱을 직접 빌드](./desktop#build-it-yourself)하거나, [서버](./getting-started#install)를 실행해 브라우저에서 사용하세요. `brew install irooftop/tap/rooftop`, `cargo install rooftop`, 또는 [Docker](./docker)가 있습니다.
:::

## macOS

![macOS에서 확인되지 않은 앱 열기: "열 수 없음" 경고, 완료, 시스템 설정, 개인정보 보호 및 보안, 그래도 열기, 암호, 그리고 앱이 열림](/how-to-open-an-unsigned-app-on-macos.svg)

macOS 15 Sequoia 이상에서:

1. **iRoof.top**을 엽니다. macOS가 *"iRoof.top"을 열 수 없습니다: Apple에서 확인할 수 없습니다…*라고 말합니다. **완료**를 클릭합니다.
2. **Apple 메뉴 → 시스템 설정… → 개인정보 보호 및 보안**을 엽니다.
3. **보안** 항목까지 아래로 스크롤합니다: *"iRoof.top"이(가) Mac을 보호하기 위해 차단되었습니다*. **그래도 열기**를 클릭합니다.
4. **그래도 열기**로 확인하고, 암호를 입력하거나 Touch ID를 사용합니다.

**그래도 열기** 버튼은 앱을 열려고 시도한 뒤 약 1시간 동안만 나타납니다. 보이지 않으면 앱을 다시 열고 개인정보 보호 및 보안으로 돌아가세요.

macOS 14 Sonoma 이전에서는 Finder에서 앱을 우클릭(또는 Control-클릭)하고 **열기**를 선택한 뒤, 다시 **열기**를 누르세요.

### 터미널에서

브라우저가 다운로드에 붙인 격리 플래그를 제거하는 방법도 있습니다.

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

항상 작동하지는 않습니다. 최신 macOS에서는 `/Applications`의 앱을 바꾸려면 터미널에 개인정보 보호 및 보안의 **앱 관리**(또는 **전체 디스크 접근**) 권한이 필요할 수 있으며, 그것이 없으면 `Operation not permitted`로 실패합니다. 위의 단계는 항상 작동합니다.

::: details "iRoof.top이(가) 손상되어 열 수 없습니다"
이 메시지도 깨진 다운로드가 아니라 격리 플래그를 뜻합니다. **취소**를 클릭하고(**휴지통으로 이동**이 아닙니다), 위의 `xattr` 명령을 실행하거나 시스템 설정의 단계를 따르세요.
:::

## Windows

SmartScreen은 설치 프로그램에 대해 **Windows의 보호를 받았습니다**라고 표시합니다.

1. **추가 정보**를 클릭합니다.
2. **실행**을 클릭합니다.

브라우저가 다운로드를 보류하면(*흔히 다운로드되지 않는 파일입니다*), 다운로드 목록을 열고 **⋯ → 보관**을 선택한 뒤, **더 보기 → 그래도 보관**을 누르세요. `.msi`는 우클릭 → **속성** → **차단 해제** 체크 → **확인**으로 실행 전에 해제할 수도 있습니다.

**스마트 앱 컨트롤**이 켜져 있는 Windows 11에서는, 서명되지 않은 앱이 **실행** 버튼 없이 차단됩니다. 대신 [서버](./getting-started#install)를 쓰거나, **Windows 보안 → 앱 및 브라우저 컨트롤 → 스마트 앱 컨트롤 설정**에서 스마트 앱 컨트롤을 끄세요.

## Linux

Linux는 서명되지 않은 앱을 차단하지 않지만, AppImage는 실행 권한이 필요합니다.

```sh
chmod +x iRoof.top_amd64.AppImage    # 또는: 속성 → 권한 → 파일을 프로그램으로 실행 허용
./iRoof.top_amd64.AppImage
```

FUSE에 대한 오류가 나면(`dlopen(): error loading libfuse.so.2`), `libfuse2`를 설치하거나(Ubuntu 24.04: `sudo apt install libfuse2t64`), `--appimage-extract-and-run`을 붙여 실행하세요.

패키지는 로컬의 서명되지 않은 패키지를 받는 패키지 관리자로 설치합니다.

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
