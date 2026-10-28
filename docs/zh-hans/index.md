---
layout: home

hero:
  name: iRoof.top
  text: 和你想念的人聊聊
  tagline: 导出一段 Telegram 或 WhatsApp 聊天记录，LLM 会以某个人的风格继续下去，包括他的气泡、贴纸、GIF、回应和语音。在你的电脑上，使用任意模型，也可以离线使用。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh-hans/guide/getting-started
    - theme: alt
      text: 下载应用
      link: /zh-hans/guide/desktop
    - theme: alt
      text: 工作原理
      link: /zh-hans/features/how-it-works

features:
  - title: 学的是他的风格，而不只是他的话
    details: 从整个导出文件中生成风格档案，每个气泡、贴纸、GIF、回复和表情回应，都会作为工具调用重放给模型。
    link: /zh-hans/features/how-it-works
    linkText: 工作原理
  - title: 私密，想离线也可以
    details: 聊天记录保存在你的数据文件夹中。使用本地模型并开启离线模式后，应用会拒绝每一个会离开你电脑的请求。
    link: /zh-hans/guide/offline
    linkText: 离线与隐私
  - title: 多年的聊天，数GB的媒体
    details: 可导入 12 万条以上消息和 3 万个文件，并显示实时进度。重复导入会在上传任何媒体之前，根据消息识别出来。
    link: /zh-hans/guide/export#large-exports
    linkText: 大型导出
  - title: 照片、贴纸与语音
    details: 媒体库会按你选择的顺序描述发送的内容并转写语音，随时可以停止。
    link: /zh-hans/features/media
    linkText: 照片与语音
  - title: 分享链接
    details: 让朋友在 /s/名称 与角色对话，可设置 PIN 和限制，可在你的 Wi‑Fi 上使用，也可通过 名称.iroof.top 访问。
    link: /zh-hans/features/share-links
    linkText: 分享链接
  - title: 从 Telegram 回复
    details: 访客的消息会进入你的 Telegram 群组。你可以自己回复，也可以让 AI 在倒计时后回答。
    link: /zh-hans/features/telegram
    linkText: Telegram
  - title: 任意模型，任意 MCP 服务器
    details: OpenAI、OpenRouter、Gemini、Ollama、LM Studio、llama.cpp……以及通过 Streamable HTTP 或 stdio 使用的 MCP 工具。
    link: /zh-hans/features/mcp
    linkText: MCP 工具
  - title: 没有隐藏的内容
    details: 发送给模型的完整 JSON 只需一次点击即可查看，还包括其大小、历史预算和使用的 tokens。
    link: /zh-hans/guide/getting-started#what-s-in-the-window
    linkText: 上下文里有什么
  - title: 一个小巧的二进制文件
    details: 一个内置 Web 界面的 Rust 服务器，提供适用于 macOS、Windows 和 Linux 的桌面应用，以及 Homebrew 和 Docker 镜像。
    link: /zh-hans/guide/getting-started
    linkText: 安装
---

<div class="home-demo">

![聊天以真实人物的风格继续，然后朋友在手机上打开分享的链接](/img/demo.svg)

</div>

## 一分钟上手

::: code-group

```sh [桌面应用]
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

```sh [完全离线]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

接下来三步：从 Telegram Desktop 或 WhatsApp **[导出聊天](/zh-hans/guide/export)**，把文件夹、`.zip` 或 `.txt` **拖到**页面上，然后点击 **New chat**，选择由谁扮演 AI：对方，或者你自己。
手边没有自己的聊天记录？可以试试虚构的示例：`rooftop --import ./examples/telegram`。
（应用中的按钮名称保持英文，与应用本身一致。）

## 工作原理

<div class="wide">

![Telegram 或 WhatsApp 的导出文件进入 iRoof.top，LLM 写出回复，对话继续下去](/how-it-works.svg)

</div>

导出文件只在你的电脑上读取一次。每次回复时，模型会收到一段系统提示，其中包含风格档案、你的笔记和媒体描述，然后是能放进[历史预算](/zh-hans/reference/configuration#settings-only)的最近一段聊天。较早的部分会被压缩成一段简短的记忆，角色仍可以搜索它们。模型通过工具调用（`send_message`、`send_sticker`、`react`……）作答，这些调用会变成气泡、贴纸和回应。[更多 →](/zh-hans/features/how-it-works)

## 你的聊天去向何处

| | 网络 |
|---|---|
| 导入、风格档案、搜索、存储 | 无：全部在你的电脑上完成 |
| 一次回复、记忆摘要 | 你选择的模型端点，仅此而已 |
| 描述媒体、转写语音 | 媒体模型，仅在你点击 **Describe** 时使用 |
| 通过互联网的分享链接、Telegram | 仅当你开启时；[离线模式](/zh-hans/guide/offline)会将它们关闭 |

## 常见问题

::: details 应该使用哪个模型？
任何支持**工具调用**、并兼容 OpenAI `/chat/completions` 接口的聊天模型。模型越大，越能模仿一种风格。若要在媒体库中使用 **Describe**，媒体模型还必须支持图像（语音消息还需要音频）。设置中的 **Test** 会用通俗的话告诉你问题所在，例如密钥被拒绝或模型不存在。
:::

::: details 需要花费多少？
使用本地模型完全免费。使用云端模型时，你需要按 token 向服务商付费：一次回复的输入大约相当于一个历史预算（默认 12 万字符 ≈ 3.4 万 tokens；提示词经过设计可以缓存，因此支持提示缓存的服务商大部分按缓存价格计费），再加上几次简短的工具调用。在设置中降低预算即可减少每次回复的费用。
:::

::: details 导出文件必须很小吗？
不必。12 万条以上消息、13 GB 媒体的导出都能正常导入，可以在浏览器中导入，也可以使用 `rooftop --import <文件夹>`。搜索和历史预算会让每次回复的提示词大小保持不变，无论聊天记录多长。
:::

::: details 朋友可以和角色聊天吗？
可以，通过[分享链接](/zh-hans/features/share-links)：可在你的 Wi‑Fi 上使用，或通过互联网在 `name.iroof.top` 访问，并可设置 PIN 和消息限制。访客只能看到聊天：没有设置、笔记、提示词或其他聊天记录。
:::

::: tip 关于照顾
这是为了与远方的人保持亲近。角色会保持人设，但如果你真诚地询问是否在与 AI 对话，它会如实回答；如果你似乎身处困境，它会给予关怀。
:::
