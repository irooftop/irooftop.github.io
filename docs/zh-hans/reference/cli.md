# CLI

```text
rooftop [serve] [选项]            运行 Web 服务器（默认）
rooftop parse <文件夹>            将规范化的导出内容以 JSON 打印
rooftop convert [选项] <文件夹>   打印导出的 {model, messages, tools}
```

## `serve`

| 选项 | 变量 | 默认 |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0`（无限制） |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | 机器人加入的每个群组 |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | 关闭 |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` 会拒绝非本地的模型和 MCP 端点，并关闭互联网分享和 Telegram 机器人（[离线与隐私](../guide/offline)）。它不能与 `--relay-domain` 同时使用。每个选项的作用：[配置](./configuration)。

## `parse` 和 `convert`

```sh
rooftop parse   ./examples/telegram                          # 规范化的 JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # 模型接收到的内容
```

| `convert` 选项 | 默认 | |
|---|---|---|
| `--persona` | 聊天标题 / 对方 | LLM 以谁的身份说话 |
| `--user` | 另一位参与者 | 由谁扮演真人 |
| `--budget` | `120000` | 历史预算（字符数） |

在应用中，`{ }` 按钮会显示当前聊天的相同 JSON。
