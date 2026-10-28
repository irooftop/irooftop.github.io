# 开发

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| 测试覆盖 | |
|---|---|
| 解析器与转换 | 针对 `examples/telegram` 和 `examples/whatsapp` |
| 分享链接 | 访客隔离、PIN 锁定、媒体白名单、房间、名称、屏蔽、认证绕过 |
| MCP 客户端 | 每个协议时代的模拟服务器（HTTP、旧版 SSE、stdio） |
| 中继 | 服务器、名称、转发 |

桌面 crate 是独立的：`cd desktop && cargo check`。

## 结构

```
src/        服务器（axum）、解析器、LLM 代理、MCP 客户端、分享链接、中继、Telegram
  server/     所有者的 HTTP API，每个领域一个文件：资源、上传、导出、聊天、
              消息、设置、媒体；mod.rs 构建路由
  share_api/  分享链接：owner.rs（管理链接和访客）、visitor.rs（/s/…）
web/        界面：index.html、app.css 和 js/（作为单个 app.js 提供，嵌入二进制文件）
  js/         界面的每个领域一个文件，按加载顺序编号（一个脚本，一个作用域）
desktop/    围绕同一服务器的 Tauri 应用
deploy/     Caddy + Docker Compose
examples/   两个虚构的导出
```

文档和 iroof.top 的落地页不在本仓库中。它们位于 [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io)：`docs/`（本站）和 `landing/`。

## 文档

文档位于 [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io)。它从本仓库获取图片和应用版本：请并排克隆两个仓库，然后在那里构建。

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

每次推送到该仓库的 `main` 分支且修改了 `docs/` 时，本站都会发布到 [irooftop.github.io](https://irooftop.github.io)。`demo.svg` 由应用仓库中的 `python3 scripts/demo-svg.py` 生成（纯 SVG 和 CSS，以便 GitHub 能够显示）。

## 发布

```
 提升 Cargo.toml ─▶ 标签 vX.Y.Z ─┬─▶ Release：crates.io + ghcr.io 镜像（amd64 + arm64，原生运行器）
                                 └─▶ desktop：安装程序 ─▶ 发布版本（最新）─▶ Homebrew：formula + cask
```

1. 提升 `Cargo.toml`（以及 `desktop/`）中的 `version`，提交，然后推送标签 `vX.Y.Z`。该标签必须是纯数字，以供 Windows MSI 使用。之后的所有步骤都会自动运行，无需额外点击。
2. *Release* 发布 crate（密钥 `CARGO_REGISTRY_TOKEN`，环境 `crates-io`）和 Docker 镜像：每个架构在原生运行器（`ubuntu-latest`、`ubuntu-24.04-arm`）上由一个作业按 digest 推送，然后 `merge` 作业创建多架构标签。若要检查 crate 发布，请使用 `dry_run` 手动运行。
3. *desktop* 为 macOS（arm64、x64）、Windows 和 Linux 构建安装程序，并放入一个草稿版本。所有安装程序都附加完成后，其 `publish` 作业会添加自动生成的发布说明，发布该版本，并将其标记为最新。
4. 其 `homebrew` 作业随后调用 *Homebrew*，它会把 `Formula/rooftop.rb` 和 `Casks/irooftop.rb` 推送到 [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap)。它需要密钥 `HOMEBREW_TAP_TOKEN`（细粒度令牌，`irooftop/homebrew-tap`，Contents：读取和写入）或 `HOMEBREW_TAP_DEPLOY_KEY`；如果两者都没有，它会跳过并给出通知。（使用 `GITHUB_TOKEN` 发布的版本不会触发 `release: published`，因此调用是显式的；手动发布版本仍会通过该事件触发 Homebrew。）

要为已有标签重新运行 tap 更新，例如在添加密钥之后：

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap 检出目录>` 会在本地生成相同的文件。如果某个标签的安装程序失败，请重新运行失败的 *desktop* 作业：`publish` 和 `homebrew` 会在它们通过后继续。
