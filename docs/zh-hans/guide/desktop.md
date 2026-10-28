# 桌面应用

桌面应用（[Tauri](https://v3.tauri.app) `3.0.0-alpha.5`）在随机的 `127.0.0.1` 端口上运行与 `rooftop serve` 相同的服务器，并在原生窗口中显示。

| 平台 | 安装 |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`，或下载 [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) 或 [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) 版本的 `.dmg` |
| Windows 10 和 11 | [安装程序 (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) 或 [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage)（任何发行版）、[.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb)（Debian、Ubuntu）或 [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm)（Fedora） |

下载链接始终指向最新版本。

::: warning 安装包尚未签名
在 macOS 上，先打开一次应用，然后前往**系统设置 → 隐私与安全性 → 仍要打开**。在 Windows 上，在 SmartScreen 中选择**更多信息 → 仍要运行**。带动画的分步说明：[打开未签名的应用](./unsigned-apps)。
:::

## 首次启动

应用不会读取你的 shell 或 `.env`，所以它会以**连接模型**的界面迎接你：打开**设置**，输入端点、密钥和模型，然后点击**测试**。如果设置了 `OPENAI_BASE_URL`、`OPENAI_API_KEY`、`OPENAI_MODEL` 或 `OPENAI_TEMPERATURE`，它们会成为初始默认值。

| | |
|---|---|
| 数据 | 系统的应用数据目录，例如 macOS 上的 `~/Library/Application Support/top.iroof.desktop` |
| 分享链接 | 在同一 Wi‑Fi 上，或通过互联网：[在其他设备上打开链接](../features/share-links#open-links-on-other-devices) |
| 其他网站 | `t.me` 等链接会在你的浏览器中打开 |
| macOS 窗口 | 没有系统标题栏：应用的页眉延伸到交通灯按钮下方，并可拖动窗口 |
| 导入 | 应用自己读取导出内容：**选择文件夹…**会打开系统选择器，拖入的文件夹、`.zip` 或 `.txt` 会从它所在的位置导入。不会上传任何内容，原件保持不变；在 APFS 上媒体会被克隆而不是复制，因此即使是 13 GB 的导出也几乎不占用额外空间 |

## 自己构建 {#build-it-yourself}

需要 Rust ≥ 1.95 和 Node.js；在 Linux 上还需要 [Tauri 的前置条件](https://v3.tauri.app/start/prerequisites/)。

```sh
cd desktop
npm ci
npm run build                          # 安装程序位于 desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # 仅二进制文件
```

在 macOS 上，`npm run build` 还会生成 `.dmg`，并跳过仅用于整理 DMG 窗口的 Finder AppleScript（没有*自动化*权限时它会失败）。设置 `ROOFTOP_DMG_FINDER=1` 可以保留 Finder 的布局，与已发布的 DMG 一致：`desktop/dmg/` 中的背景上有一个从应用指向*应用程序*的箭头，并且卷中的隐藏文件会被移到看不见的地方。编辑 `desktop/dmg/background.svg` 后，请运行 `desktop/dmg/make-background.sh`。
