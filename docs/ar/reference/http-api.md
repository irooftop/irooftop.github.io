# واجهة HTTP API

JSON عبر HTTP. مع ضبط `ROOFTOP_PASSWORD`، تتطلب واجهة المالك مصادقة HTTP Basic.

## المالك

| الطريقة | المسار | |
|---|---|---|
| GET | `/api/state` | التصديرات، والمحادثات، وروابط المشاركة، ومعلومات LLM |
| POST | `/api/exports` | رفع multipart: ملفات مجلد بأسماء نسبية، أو `.zip`. يردّ فورًا بـ`202 {"id"}` ويستورد في الخلفية |
| POST | `/api/uploads` | يبدأ رفعًا دفعيًا (تستخدمه واجهة الويب): `{"id"}` |
| POST | `/api/uploads/{id}/files` | دفعة multipart من الملفات بأسماء نسبية؛ إعادة إرسال دفعة تستبدل ملفاتها: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | بعد ملفات المحادثة، وقبل الوسائط: `{"bytes"}` ما زال للإرسال ← `{title, messages, existing, fits, free_bytes, needed_bytes}` (مستوردة بالفعل؟ هل تتسع المساحة على القرص؟) |
| POST | `/api/uploads/{id}/import` | يستورد كل ما رُفع حتى الآن: `202 {"id"}` لمهمة الاستيراد |
| DELETE | `/api/uploads/{id}` | يتخلص من رفع غير مكتمل (تُحذف المتروكة بعد 24 ساعة وعند إعادة التشغيل) |
| POST | `/api/local/pick` | تطبيق سطح المكتب فقط: يعرض المنتقي الأصلي، `{"kind": "folder" \| "file"}` ← `{"path"}` (`null` عند الإلغاء) |
| POST | `/api/local/import` | تطبيق سطح المكتب فقط: يستورد من هذا الجهاز، `{"paths": […]}` (مجلد، أو `.zip`، أو `.txt` من WhatsApp؛ الملفات داخل تصدير واحد تمثل مجلده) ← `202 {"id", "name"}` لمهمة الاستيراد؛ يُنسخ المصدر، ولا يُغيَّر أبدًا |
| GET | `/api/imports/{id}` | تقدم مهمة استيراد، انظر أدناه |
| GET · DELETE | `/api/exports/{id}` | التفاصيل مع مكتبة الوسائط · الحذف مع محادثاته |
| POST | `/api/exports/{id}/describe` | يصف مكتبة الوسائط |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`؛ دون `export_id` تكون المحادثة من الملاحظات فقط: `persona` هو اسمها، و`user` اسمك (الافتراضي `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | الخط الزمني (`?limit=`) · العنوان والملاحظات · الحذف |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` يزيل) |
| POST | `/api/chats/{id}/voice` | `file` بصيغة multipart (wav، وogg، وmp3، وm4a، وwebm)، و`duration?`، و`reply_to?` |
| POST | `/api/chats/{id}/respond` | يدع الشخصية تتصرف؛ يعيد الرسائل والإجراءات مرتبة |
| POST | `/api/chats/{id}/regenerate` | يحذف آخر دور للشخصية ويرد من جديد |
| GET | `/api/chats/{id}/prompt` | `{model, messages, tools}` بالضبط |
| GET · POST | `/api/chats/{id}/shares` | القائمة · إنشاء روابط مشاركة |
| PATCH · DELETE | `/api/shares/{id}` | التحرير (`pin: ""` يزيل PIN، و`revoke_sessions`) · الحذف |
| DELETE | `/api/shares/{id}/sessions/{session}` | ينهي محادثة زائر واحدة |
| GET · PUT | `/api/settings` | LLM وMCP وTelegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | حالة MCP · إعادة الاتصال |
| GET · POST | `/api/telegram` · `/api/telegram/link` | حالة البوت والمجموعات · رابط `t.me` يضيف البوت إلى مجموعة |
| GET · PUT | `/api/sharing` | مشاركة Wi‑Fi والإنترنت `{lan?, internet?, name?}` (واجهة المالك على localhost فقط) |
| GET | `/api/qr?text=…` | رمز QR (SVG) |

### مهام الاستيراد

يعيد `GET /api/imports/{id}`

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (يعمل استيراد آخر؛ وتعمل الاستيرادات واحدًا تلو الآخر)، أو `running`، أو `done`، أو `failed`.
* `stage`: `unpacking`، و`reading`، و`parsing` (`done` من `total` صفحة)، و`hashing` و`placing` (الملفات)، و`saving`.
* `messages`: الرسائل التي وُجدت حتى الآن.
* `failed` يضيف `error`، مثل `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` يضيف `created` (`false` إذا سبق استيراد التصدير نفسه) و`export`، وهو الملخص الموجود أيضًا في `/api/state`.

يُحتفظ بآخر 16 مهمة مكتملة؛ ويعيد المعرّف غير المعروف 404.

## العامة

دون كلمة مرور، لزوار روابط المشاركة:

| الطريقة | المسار | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | صفحة الزائر |
| GET | `/api/s/{name}` | معلومات الصفحة الرئيسية |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` ← `{token}` |
| GET | `/api/s/{name}/c/{token}` | الخط الزمني |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | كما للمالك؛ و`regenerate`، وكذلك `respond` دون رسالة جديدة من الزائر ("دعهم يكتبون أولًا")، لا تعمل إلا حين يملك الرابط `allow_regenerate` / `allow_nudge` (وإلا `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | الوسائط التي يحق للزائر رؤيتها |

## محور الترحيل

| الطريقة | المسار | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`، للمطالبة بالاسم أو تغييره (`Authorization: Bearer <السر>`) |
| GET | `/relay/v1/connect` | WebSocket الخاص بالتطبيق |
| GET | `/relay/v1/info` | معلومات المحور |
| * | `/relay/v1/tg/bot<السر>/<الطريقة>` | وكيل Bot API للبوت المشترك |
