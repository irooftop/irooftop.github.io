# 快速开始

## 安装 {#install}

| | 命令 |
|---|---|
| **桌面应用**，macOS | `brew install --cask irooftop/tap/irooftop` |
| **桌面应用**，Windows | [安装程序 (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) 或 [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **桌面应用**，Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage)、[.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) 或 [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **服务器**，macOS 和 Linux | `brew install irooftop/tap/rooftop`（然后 `brew services start rooftop`） |
| **服务器**，任何装有 Rust ≥ 1.88 的地方 | `cargo install rooftop` |
| **服务器**，容器 | `docker pull ghcr.io/irooftop/rooftop` （[Docker](./docker)） |

桌面应用不需要终端。参见[桌面应用](./desktop)。

## 运行

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # 默认值；任何兼容 OpenAI 的 API 都可以
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # 必须支持工具调用
rooftop                                               # http://127.0.0.1:8080
```

这些变量也可以放在你运行 `rooftop` 的目录中的 `.env` 文件里，或之后在**设置**中配置。
设置中的**测试**会发送一个很小的请求，并用简单的语言告诉你哪里出了问题，例如
“openrouter.ai 拒绝了 API 密钥 (401)”。

想让任何内容都不离开你的电脑？请使用本地模型和[离线模式](./offline)。

## 你的第一个聊天

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. 导出聊天  │ ──▶ │ 2. 拖到页面上      │ ──▶ │ 3. 新建聊天：选择    │
 │              │     │                    │     │ AI 扮演的人          │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. 从 Telegram Desktop 或 WhatsApp [导出一个聊天](./export)。
2. 把文件夹、`.zip` 或 WhatsApp 的 `.txt` 拖到页面上（或使用 `rooftop --import <文件夹>` 启动）。
3. 点击**新建聊天**，选择角色：对方，或你自己（“以你自己的风格与自己聊天”）。

::: tip 没有自己的聊天也能试用
仓库在 [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples) 中提供了两个虚构的导出：
Jonas 和 Priya 在 Telegram 上做千层面，Sofia 和 Daniel 在 WhatsApp 上度过一个周末。

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### 没有导出？从笔记开始

**新建聊天 → 从笔记**只需要对方的名字（你的名字可选）以及关于对方的几行文字：他是谁，你们分享什么，他怎么说话（“叫我宝贝，短的意大利语消息，很多 ❤️”）。AI 仅根据这些笔记，以他的方式写作。没有历史记录就没有风格档案和媒体库，所以笔记对说话方式描述得越详细，效果就越接近。你可以随时在聊天中编辑笔记（✎），并像其他聊天一样通过链接分享。删除聊天会删除其中的所有内容。

## 窗口里有什么

| 按钮 | 作用 |
|---|---|
| **分享** | 让朋友与角色对话的[链接](../features/share-links) |
| **媒体库** | 每个贴纸、GIF、照片和语音消息，以及 AI 对它们的了解 |
| **笔记** | 导出中没有写到的关于对方的信息。角色会读取，访客从不会 |
| **`{ }`** | 发送给模型的确切 JSON，以及所用的 token |
| **重写** | 丢弃角色的上一条回复并重新生成 |
| **让他们先说** | 由角色发起对话 |
