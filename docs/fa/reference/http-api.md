# API HTTP

JSON روی HTTP. وقتی `ROOFTOP_PASSWORD` تنظیم شده باشد، API مالک به احراز هویت HTTP Basic نیاز دارد.

## مالک

| روش | مسیر | |
|---|---|---|
| GET | `/api/state` | صادرات‌ها، گفتگوها، پیوندهای اشتراک‌گذاری، اطلاعات LLM |
| POST | `/api/exports` | آپلود multipart: فایل‌های یک پوشه با نام‌های نسبی، یا یک `.zip`. فوراً `202 {"id"}` پاسخ می‌دهد و در پس‌زمینه وارد می‌کند |
| POST | `/api/uploads` | شروع آپلود دسته‌ای (رابط وب از آن استفاده می‌کند): `{"id"}` |
| POST | `/api/uploads/{id}/files` | دسته‌ی multipart از فایل‌ها با نام‌های نسبی؛ فرستادن دوباره‌ی یک دسته فایل‌هایش را جایگزین می‌کند: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | بعد از فایل‌های گفتگو، پیش از رسانه: `{"bytes"}` هنوز برای ارسال ← `{title, messages, existing, fits, free_bytes, needed_bytes}` (از قبل وارد شده؟ فضای دیسک کافی است؟) |
| POST | `/api/uploads/{id}/import` | هر آنچه تاکنون بارگذاری شده را وارد می‌کند: `202 {"id"}` کار وارد کردن |
| DELETE | `/api/uploads/{id}` | یک بارگذاری ناتمام را دور می‌ریزد (بارگذاری‌های رهاشده پس از ۲۴ ساعت و در راه‌اندازی مجدد حذف می‌شوند) |
| POST | `/api/local/pick` | فقط برنامه‌ی دسکتاپ: گزینش‌گر بومی را نشان می‌دهد، `{"kind": "folder" \| "file"}` ← `{"path"}` (در صورت لغو `null`) |
| POST | `/api/local/import` | فقط برنامه‌ی دسکتاپ: از این رایانه وارد می‌کند، `{"paths": […]}` (پوشه، `.zip` یا `.txt` واتس‌اپ؛ فایل‌های داخل یک صادرات نماینده‌ی پوشه‌ی آن هستند) ← `202 {"id", "name"}` کار وارد کردن؛ منبع کپی می‌شود و هرگز تغییر نمی‌کند |
| GET | `/api/imports/{id}` | پیشرفت یک کار وارد کردن، پایین را ببینید |
| GET · DELETE | `/api/exports/{id}` | جزئیات با کتابخانه‌ی رسانه · حذف همراه گفتگوهایش |
| POST | `/api/exports/{id}/describe` | کتابخانه‌ی رسانه را توصیف می‌کند |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`؛ بدون `export_id`، گفتگو فقط از یادداشت‌ها: `persona` نام آن‌هاست، `user` نام شما (پیش‌فرض `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | خط زمانی (`?limit=`) · عنوان و یادداشت‌ها · حذف |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` حذف می‌کند) |
| POST | `/api/chats/{id}/voice` | `file` از نوع multipart (wav، ogg، mp3، m4a، webm)، `duration?`، `reply_to?` |
| POST | `/api/chats/{id}/respond` | اجازه می‌دهد شخصیت عمل کند؛ پیام‌ها و کنش‌های مرتب‌شده را برمی‌گرداند |
| POST | `/api/chats/{id}/regenerate` | آخرین نوبت شخصیت را حذف می‌کند و دوباره پاسخ می‌دهد |
| GET | `/api/chats/{id}/prompt` | `{model, messages, tools}` دقیق |
| GET · POST | `/api/chats/{id}/shares` | فهرست · ساختن پیوندهای اشتراک‌گذاری |
| PATCH · DELETE | `/api/shares/{id}` | ویرایش (`pin: ""` PIN را حذف می‌کند، `revoke_sessions`) · حذف |
| DELETE | `/api/shares/{id}/sessions/{session}` | یک گفتگوی بازدیدکننده را پایان می‌دهد |
| GET · PUT | `/api/settings` | LLM، MCP و تلگرام (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | وضعیت MCP · اتصال مجدد |
| GET · POST | `/api/telegram` · `/api/telegram/link` | وضعیت ربات و گروه‌ها · پیوند `t.me` که ربات را به یک گروه اضافه می‌کند |
| GET · PUT | `/api/sharing` | اشتراک‌گذاری Wi‑Fi و اینترنت `{lan?, internet?, name?}` (رابط مالک فقط روی localhost) |
| GET | `/api/qr?text=…` | یک کد QR (SVG) |

### کارهای وارد کردن

`GET /api/imports/{id}` برمی‌گرداند

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (وارد کردن دیگری در حال اجراست؛ آن‌ها یکی‌یکی اجرا می‌شوند)، `running`، `done` یا `failed`.
* `stage`: `unpacking`، `reading`، `parsing` (`done` از `total` صفحه)، `hashing` و `placing` (فایل‌ها)، `saving`.
* `messages`: پیام‌های یافت‌شده تاکنون.
* `failed` فیلد `error` را اضافه می‌کند، مثلاً `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` فیلدهای `created` (اگر همان صادرات قبلاً وارد شده باشد `false`) و `export` را اضافه می‌کند، خلاصه‌ای که در `/api/state` هم هست.

۱۶ کار تکمیل‌شده‌ی آخر نگه داشته می‌شوند؛ شناسه‌ی ناشناخته پاسخ ۴۰۴ می‌دهد.

## عمومی

بدون رمز عبور، برای بازدیدکنندگان پیوندهای اشتراک‌گذاری:

| روش | مسیر | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | صفحه‌ی بازدیدکننده |
| GET | `/api/s/{name}` | اطلاعات صفحه‌ی شروع |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` ← `{token}` |
| GET | `/api/s/{name}/c/{token}` | خط زمانی |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | مانند مالک؛ `regenerate` و همچنین `respond` بدون پیام جدید بازدیدکننده («بگذار اول بنویسند»)، فقط وقتی پیوند `allow_regenerate` / `allow_nudge` دارد (وگرنه `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | رسانه‌هایی که بازدیدکننده اجازه‌ی دیدنشان را دارد |

## هاب رله

| روش | مسیر | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`، ادعای نام یا تغییر آن (`Authorization: Bearer <رمز>`) |
| GET | `/relay/v1/connect` | WebSocket برنامه |
| GET | `/relay/v1/info` | اطلاعات هاب |
| * | `/relay/v1/tg/bot<رمز>/<روش>` | پروکسی Bot API ربات مشترک |
