# 配置

环境变量、工作目录中的 `.env` 文件，或对应的 `rooftop` 选项（[CLI](./cli)）。在**设置**中设置的值，对于 LLM 端点、模型、密钥、温度、历史预算、工具步数、MCP 服务器、Telegram 机器人和离线模式，优先于环境变量。`TELEGRAM_BOT_TOKEN` 优先于设置。

## 模型

| 变量 | 默认 | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | 任何兼容 OpenAI 的 API：OpenAI、OpenRouter、Gemini、Mistral、DeepSeek、Groq、Ollama（`http://localhost:11434/v1`）、LM Studio（`http://localhost:1234/v1`）、llama.cpp（`http://localhost:8080/v1`）、vLLM… |
| `OPENAI_API_KEY` | – | Bearer 令牌 |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | 必须支持工具调用 |
| `OPENAI_TEMPERATURE` | 提供商的默认值 | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | 描述图像并转写语音，例如 `xiaomi/mimo-v2.6-flash` |

## 离线

| 变量 | 默认 | |
|---|---|---|
| `ROOFTOP_OFFLINE` | 关闭 | `1`、`true`、`yes` 或 `on`：只允许本地的模型和 MCP 服务器（本机或网络），不允许互联网分享，不允许 Telegram。与设置中的**离线**开关相同，但设置无法将其关闭。桌面应用也会遵循此设置。[离线与隐私](../guide/offline) |

## 服务器

| 变量 | 默认 | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080`（Docker 中为 `0.0.0.0:8080`） | 设为 `0.0.0.0:<端口>` 时，日志会显示局域网 URL |
| `ROOFTOP_DATA` | `./data`（Docker 中为 `/data`） | 导出、聊天、设置 |
| `ROOFTOP_IMPORT` | – | 启动时要导入的导出，以 `:` 分隔，幂等 |
| `ROOFTOP_PASSWORD` | – | 所有者界面的 HTTP Basic 认证（用户名任意）。**在公开服务器上务必设置** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | 所有者的上传上限，单位为 MiB；`0` 表示不限制（导出可能有数 GB）。在其他人可以访问的服务器上请设置。分享链接有自己的 16 MiB 上限。桌面应用没有上限 |
| `ROOFTOP_TRUST_PROXY` | `false` | 从 `X-Forwarded-For` / `X-Real-IP` 获取客户端 IP，仅在反向代理之后使用 |
| `ROOFTOP_FFMPEG` | `PATH` 中的 `ffmpeg`，然后是 Homebrew、`/usr/local`、`/usr/bin` | GIF 和视频的帧（可选） |
| `TZ` | UTC | 实时消息的时区 |

## Telegram

| 变量 | 默认 | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | 你从 [@BotFather](https://t.me/BotFather) 获得的机器人（[从 Telegram 回复](../features/telegram)） |
| `TELEGRAM_CHAT_ID` | 机器人加入的每个群组 | 允许的群组 ID，以逗号分隔 |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | 例如自托管的 Bot API 服务器 |

## 中继

| 变量 | 默认 | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | 用于**互联网**分享和共享机器人的中继 |
| `ROOFTOP_RELAY_DOMAIN` | – | 为此域名运行一个[中继服务器](./relay-hub) |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | 服务器的共享机器人；必须与 `TELEGRAM_BOT_TOKEN` 不同 |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | 服务器最多保留的名称数 |

## 仅设置 {#settings-only}

| 设置 | 默认 | |
|---|---|---|
| 历史预算 | `120000` 字符 | 在[记忆](../features/how-it-works#long-chats)介入之前，会重放多少历史 |
| 最大工具步数 | `6` | 每次回答的 LLM 轮数（搜索、MCP 工具、回复…） |
