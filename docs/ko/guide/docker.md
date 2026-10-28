# Docker와 서버

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Seoul \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| 이미지 | `ghcr.io/irooftop/rooftop`, linux/amd64 및 linux/arm64 |
| 태그 | `latest`, `X.Y.Z`, `X.Y` |
| 데이터 | `/data` (내보내기, 채팅, 설정) |
| 시작 시 가져오기 | 폴더를 마운트하고 `ROOFTOP_IMPORT=/import/chat`을 설정 |

::: tip Node.js와 ffmpeg
이미지에는 둘 다 들어 있지 않습니다. `npx`로 시작하는 stdio MCP 서버에는 이미지를 확장하세요.

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg는 AI가 GIF와 동영상을 프레임 단위로 보게 합니다
```

또는 원격(HTTP) MCP 서버를 사용하세요.
:::

## HTTPS가 있는 서버

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy)는 인증서를 받아 갱신하는 [Caddy](https://caddyserver.com) 뒤에서 iRoof.top을 실행합니다.

```sh
cd deploy
sed -i 's/example.com/your.domain/g' Caddyfile        # 도메인이 이미 서버를 가리켜야 합니다
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  방문자 ──https──▶ Caddy :443 ──▶ iroof:8080
                     │               ├─ /s/…, /api/s/…, 리소스   공개
                     │               └─ 나머지                    비밀번호
                     └─ TLS 인증서, 자동으로 갱신
```

* 공유 링크는 사용자의 도메인을 씁니다: `https://your.domain/s/<이름>`.
* 컨테이너는 읽기 전용으로, 기능(capability) 없이, 메모리 제한과 함께 실행됩니다.
* Caddy가 방문자의 IP를 전달하므로 `ROOFTOP_TRUST_PROXY`가 켜져 있습니다.
* 업데이트는 `docker compose pull && docker compose up -d`. `iroof-data` 볼륨을 백업하세요.

::: danger 공개 서버에는 비밀번호를 설정하세요
`ROOFTOP_PASSWORD`는 소유자 화면과 API를 보호합니다. 없으면 주소를 찾은 누구나 채팅을 읽을 수 있습니다.
:::
