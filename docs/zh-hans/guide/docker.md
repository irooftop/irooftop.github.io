# Docker 与服务器

## Docker

```sh
docker run -d --name rooftop -p 8080:8080 \
  -e OPENAI_API_KEY=… -e OPENAI_MODEL=… \
  -e ROOFTOP_PASSWORD=change-me -e TZ=Asia/Shanghai \
  -v rooftop-data:/data \
  ghcr.io/irooftop/rooftop:latest
```

| | |
|---|---|
| 镜像 | `ghcr.io/irooftop/rooftop`，linux/amd64 和 linux/arm64 |
| 标签 | `latest`、`X.Y.Z`、`X.Y` |
| 数据 | `/data`（导出、聊天、设置） |
| 启动时导入 | 挂载一个文件夹并设置 `ROOFTOP_IMPORT=/import/chat` |

::: tip Node.js 和 ffmpeg
镜像中两者都没有。对于用 `npx` 启动的 stdio MCP 服务器，请扩展镜像：

```dockerfile
FROM ghcr.io/irooftop/rooftop
RUN apk add nodejs npm ffmpeg   # ffmpeg 让 AI 能逐帧看到 GIF 和视频
```

或者使用远程（HTTP）MCP 服务器。
:::

## 带 HTTPS 的服务器

[`deploy/`](https://github.com/irooftop/rooftop/tree/main/deploy) 在 [Caddy](https://caddyserver.com) 后面运行 iRoof.top，Caddy 会自动获取并续期证书：

```sh
cd deploy
sed -i 's/example.com/你的域名/g' Caddyfile        # 域名必须已经指向该服务器
printf 'ROOFTOP_PASSWORD=%s\n' "$(openssl rand -base64 24)" > iroof.env && chmod 600 iroof.env
docker compose up -d
```

```
  访客 ──https──▶ Caddy :443 ──▶ iroof:8080
                    │               ├─ /s/…、/api/s/…、资源   公开
                    │               └─ 其余                    密码
                    └─ TLS 证书，自动续期
```

* 分享链接使用你的域名：`https://你的域名/s/<名称>`。
* 容器以只读方式运行，没有任何 capability，并且有内存限制。
* `ROOFTOP_TRUST_PROXY` 已启用，因为 Caddy 会传递访客的 IP。
* 更新命令：`docker compose pull && docker compose up -d`。请备份 `iroof-data` 卷。

::: danger 在公开服务器上设置密码
`ROOFTOP_PASSWORD` 保护所有者界面和 API。没有它，任何找到该地址的人都可以读取你的聊天。
:::
