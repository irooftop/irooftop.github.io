# HTTP API

HTTP پر JSON۔ `ROOFTOP_PASSWORD` سیٹ ہو تو مالک کے API کو HTTP Basic auth درکار ہے۔

## مالک

| طریقہ | راستہ | |
|---|---|---|
| GET | `/api/state` | ایکسپورٹس، چیٹس، شیئر لنکس، LLM کی معلومات |
| POST | `/api/exports` | multipart اپ لوڈ: فولڈر کی فائلیں رشتہ دار ناموں کے ساتھ، یا ایک `.zip`۔ فوراً `202 {"id"}` دیتا ہے اور پس منظر میں درآمد کرتا ہے |
| POST | `/api/uploads` | بیچ اپ لوڈ شروع کریں (ویب UI یہی استعمال کرتا ہے): `{"id"}` |
| POST | `/api/uploads/{id}/files` | رشتہ دار ناموں والی فائلوں کا multipart بیچ؛ کسی بیچ کو دوبارہ بھیجنے سے اس کی فائلیں بدل جاتی ہیں: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | چیٹ فائلوں کے بعد، میڈیا سے پہلے: `{"bytes"}` ابھی بھیجنے کو باقی ← `{title, messages, existing, fits, free_bytes, needed_bytes}` (پہلے سے درآمد ہو چکی؟ ڈسک میں کافی جگہ؟) |
| POST | `/api/uploads/{id}/import` | اب تک اپ لوڈ شدہ سب کچھ درآمد کریں: درآمد کے کام کا `202 {"id"}` |
| DELETE | `/api/uploads/{id}` | نامکمل اپ لوڈ ہٹائیں (چھوڑے ہوئے 24 گھنٹے بعد اور دوبارہ شروع ہونے پر ہٹ جاتے ہیں) |
| POST | `/api/local/pick` | صرف ڈیسک ٹاپ ایپ: مقامی پکر دکھاتا ہے، `{"kind": "folder" \| "file"}` ← `{"path"}` (منسوخ ہونے پر `null`) |
| POST | `/api/local/import` | صرف ڈیسک ٹاپ ایپ: اس کمپیوٹر سے درآمد، `{"paths": […]}` (فولڈر، `.zip` یا WhatsApp `.txt`؛ ایک ایکسپورٹ کے اندر کی فائلیں اس کے فولڈر کی نمائندگی کرتی ہیں) ← درآمد کے کام کا `202 {"id", "name"}`؛ ماخذ کاپی ہوتا ہے، کبھی بدلا نہیں جاتا |
| GET | `/api/imports/{id}` | درآمد کے کام کی پیش رفت، نیچے دیکھیں |
| GET · DELETE | `/api/exports/{id}` | میڈیا لائبریری کے ساتھ تفصیلات · چیٹس سمیت حذف |
| POST | `/api/exports/{id}/describe` | میڈیا لائبریری کی تفصیل بنائیں |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`؛ `export_id` کے بغیر، صرف نوٹس سے چیٹ: `persona` ان کا نام ہے، `user` آپ کا (ڈیفالٹ `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | ٹائم لائن (`?limit=`) · عنوان اور نوٹس · حذف |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` ہٹاتا ہے) |
| POST | `/api/chats/{id}/voice` | multipart `file` (wav، ogg، mp3، m4a، webm)، `duration?`، `reply_to?` |
| POST | `/api/chats/{id}/respond` | کردار کو عمل کرنے دیں؛ پیغامات اور ترتیب شدہ اعمال لوٹاتا ہے |
| POST | `/api/chats/{id}/regenerate` | کردار کی آخری نوبت ہٹائیں اور دوبارہ جواب دیں |
| GET | `/api/chats/{id}/prompt` | بالکل درست `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | فہرست · شیئر لنکس بنائیں |
| PATCH · DELETE | `/api/shares/{id}` | ترمیم (`pin: ""` PIN ہٹاتا ہے، `revoke_sessions`) · حذف |
| DELETE | `/api/shares/{id}/sessions/{session}` | ایک وزیٹر کی گفتگو ختم کریں |
| GET · PUT | `/api/settings` | LLM، MCP اور Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP کی حالت · دوبارہ کنکٹ |
| GET · POST | `/api/telegram` · `/api/telegram/link` | بوٹ کی حالت اور گروپس · `t.me` لنک جو بوٹ کو گروپ میں شامل کرتا ہے |
| GET · PUT | `/api/sharing` | Wi‑Fi اور انٹرنیٹ شیئرنگ `{lan?, internet?, name?}` (مالک کا UI صرف localhost پر) |
| GET | `/api/qr?text=…` | QR کوڈ (SVG) |

### درآمد کے کام

`GET /api/imports/{id}` یہ لوٹاتا ہے

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (ایک اور درآمد چل رہی ہے؛ وہ ایک ایک کر کے چلتی ہیں)، `running`، `done` یا `failed`۔
* `stage`: `unpacking`، `reading`، `parsing` (`total` میں سے `done` صفحات)، `hashing` اور `placing` (فائلیں)، `saving`۔
* `messages`: اب تک ملے ہوئے پیغامات۔
* `failed` میں `error` شامل ہوتا ہے، مثلاً `no messages.html, result.json or WhatsApp .txt found in the upload`۔
* `done` میں `created` (اگر یہی ایکسپورٹ پہلے درآمد ہو چکی ہو تو `false`) اور `export` شامل ہوتے ہیں، وہی خلاصہ جو `/api/state` میں بھی ہے۔

آخری 16 مکمل شدہ کام محفوظ رہتے ہیں؛ نامعلوم ID پر 404 آتا ہے۔

## عوامی

پاس ورڈ کے بغیر، شیئر لنک کے وزیٹرز کے لیے:

| طریقہ | راستہ | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | وزیٹر کا صفحہ |
| GET | `/api/s/{name}` | ابتدائی صفحے کی معلومات |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | ٹائم لائن |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | مالک کی طرح؛ `regenerate`، اور نئے وزیٹر پیغام کے بغیر `respond` ("پہلے لکھوائیں")، صرف وہاں جہاں لنک میں `allow_regenerate` / `allow_nudge` ہو (ورنہ `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | وہ میڈیا جو وزیٹر دیکھ سکتا ہے |

## ریلے ہب

| طریقہ | راستہ | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`، نام پر دعویٰ یا تبدیلی (`Authorization: Bearer <secret>`) |
| GET | `/relay/v1/connect` | ایپ کا WebSocket |
| GET | `/relay/v1/info` | ہب کی معلومات |
| * | `/relay/v1/tg/bot<secret>/<method>` | مشترکہ بوٹ کا Bot API proxy |
