# HTTP API

基于 HTTP 的 JSON。设置了 `ROOFTOP_PASSWORD` 后，所有者 API 需要 HTTP Basic 认证。

## 所有者

| 方法 | 路径 | |
|---|---|---|
| GET | `/api/state` | 导出、聊天、分享链接、LLM 信息 |
| POST | `/api/exports` | 多部分上传：带相对名称的文件夹文件，或一个 `.zip`。立即返回 `202 {"id"}`，并在后台导入 |
| POST | `/api/uploads` | 开始分批上传（网页界面使用）：`{"id"}` |
| POST | `/api/uploads/{id}/files` | 带相对名称的文件的多部分批次；重新发送某个批次会替换它的文件：`{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | 在聊天文件之后、媒体之前：仍需发送的 `{"bytes"}` → `{title, messages, existing, fits, free_bytes, needed_bytes}`（是否已导入？磁盘空间是否足够？） |
| POST | `/api/uploads/{id}/import` | 导入到目前为止上传的全部内容：导入任务的 `202 {"id"}` |
| DELETE | `/api/uploads/{id}` | 丢弃未完成的上传（被放弃的上传会在 24 小时后以及重启时被删除） |
| POST | `/api/local/pick` | 仅桌面应用：显示原生选择器，`{"kind": "folder" \| "file"}` → `{"path"}`（取消时为 `null`） |
| POST | `/api/local/import` | 仅桌面应用：从本机导入，`{"paths": […]}`（文件夹、`.zip` 或 WhatsApp `.txt`；同一导出中的文件代表其文件夹）→ 导入任务的 `202 {"id", "name"}`；源会被复制，绝不会被修改 |
| GET | `/api/imports/{id}` | 导入任务的进度，见下文 |
| GET · DELETE | `/api/exports/{id}` | 包含媒体库的详情 · 连同其聊天一起删除 |
| POST | `/api/exports/{id}/describe` | 描述媒体库 |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`；没有 `export_id` 时，是仅从笔记创建的聊天：`persona` 是对方的名字，`user` 是你的名字（默认 `Me`） |
| GET · PATCH · DELETE | `/api/chats/{id}` | 时间线（`?limit=`）· 标题和笔记 · 删除 |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}`（`""` 表示移除） |
| POST | `/api/chats/{id}/voice` | 多部分 `file`（wav、ogg、mp3、m4a、webm），`duration?`、`reply_to?` |
| POST | `/api/chats/{id}/respond` | 让角色采取行动；返回消息和有序的动作 |
| POST | `/api/chats/{id}/regenerate` | 丢弃角色的上一个回合并重新回复 |
| GET | `/api/chats/{id}/prompt` | 精确的 `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | 列出 · 创建分享链接 |
| PATCH · DELETE | `/api/shares/{id}` | 编辑（`pin: ""` 移除 PIN，`revoke_sessions`）· 删除 |
| DELETE | `/api/shares/{id}/sessions/{session}` | 结束一次访客对话 |
| GET · PUT | `/api/settings` | LLM、MCP 和 Telegram（`telegram: {mode: off\|shared\|own, token?}`） |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP 状态 · 重新连接 |
| GET · POST | `/api/telegram` · `/api/telegram/link` | 机器人状态和群组 · 将机器人添加到群组的 `t.me` 链接 |
| GET · PUT | `/api/sharing` | Wi‑Fi 和互联网分享 `{lan?, internet?, name?}`（所有者界面仅限 localhost） |
| GET | `/api/qr?text=…` | 二维码（SVG） |

### 导入任务

`GET /api/imports/{id}` 返回

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`：`queued`（另一个导入正在运行；它们逐个运行）、`running`、`done` 或 `failed`。
* `stage`：`unpacking`、`reading`、`parsing`（`total` 页中的 `done`）、`hashing` 和 `placing`（文件）、`saving`。
* `messages`：到目前为止找到的消息数。
* `failed` 会添加 `error`，例如 `no messages.html, result.json or WhatsApp .txt found in the upload`。
* `done` 会添加 `created`（如果同一导出之前已导入过，则为 `false`）和 `export`，即 `/api/state` 中也有的摘要。

保留最近完成的 16 个任务；未知的 id 返回 404。

## 公开

无需密码，供分享链接的访客使用：

| 方法 | 路径 | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | 访客页面 |
| GET | `/api/s/{name}` | 起始页信息 |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | 时间线 |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | 与所有者相同；`regenerate` 以及没有新访客消息的 `respond`（“让对方先说”）仅在链接具有 `allow_regenerate` / `allow_nudge` 时可用（否则返回 `403`） |
| GET | `/api/s/{name}/c/{token}/media/{path}` | 访客可以看到的媒体 |

## 中继服务器

| 方法 | 路径 | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`，认领或重命名（`Authorization: Bearer <密钥>`） |
| GET | `/relay/v1/connect` | 应用的 WebSocket |
| GET | `/relay/v1/info` | 服务器信息 |
| * | `/relay/v1/tg/bot<密钥>/<方法>` | 共享机器人的 Bot API 代理 |
