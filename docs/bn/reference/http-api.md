# HTTP API

HTTP-এর উপর JSON। `ROOFTOP_PASSWORD` সেট থাকলে মালিকের API-তে HTTP Basic প্রমাণীকরণ লাগে।

## মালিক

| পদ্ধতি | পাথ | |
|---|---|---|
| GET | `/api/state` | এক্সপোর্ট, চ্যাট, শেয়ার লিংক, LLM তথ্য |
| POST | `/api/exports` | multipart আপলোড: আপেক্ষিক নামের ফোল্ডার ফাইল, বা একটি `.zip`। তাৎক্ষণিক `202 {"id"}` দেয় এবং পটভূমিতে ইমপোর্ট করে |
| POST | `/api/uploads` | ব্যাচ আপলোড শুরু করে (ওয়েব ইন্টারফেস ব্যবহার করে): `{"id"}` |
| POST | `/api/uploads/{id}/files` | আপেক্ষিক নামের ফাইলের multipart ব্যাচ; একই ব্যাচ আবার পাঠালে তার ফাইলগুলো প্রতিস্থাপিত হয়: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | চ্যাট ফাইলের পরে, মিডিয়ার আগে: এখনো পাঠাতে হবে এমন `{"bytes"}` → `{title, messages, existing, fits, free_bytes, needed_bytes}` (আগে ইমপোর্ট হয়েছে? ডিস্কে জায়গা আছে?) |
| POST | `/api/uploads/{id}/import` | এখন পর্যন্ত যা আপলোড হয়েছে সবকিছু ইমপোর্ট করে: ইমপোর্ট জবের `202 {"id"}` |
| DELETE | `/api/uploads/{id}` | একটি অসম্পূর্ণ আপলোড বাতিল করে (পরিত্যক্তগুলো ২৪ ঘণ্টা পরে ও রিস্টার্টে মুছে যায়) |
| POST | `/api/local/pick` | শুধু ডেস্কটপ অ্যাপ: নেটিভ পিকার দেখায়, `{"kind": "folder" \| "file"}` → `{"path"}` (বাতিল হলে `null`) |
| POST | `/api/local/import` | শুধু ডেস্কটপ অ্যাপ: এই কম্পিউটার থেকে ইমপোর্ট করে, `{"paths": […]}` (একটি ফোল্ডার, `.zip`, বা WhatsApp `.txt`; একটি এক্সপোর্টের ভেতরের ফাইলগুলো তার ফোল্ডারের প্রতিনিধিত্ব করে) → ইমপোর্ট জবের `202 {"id", "name"}`; উৎসটি কপি হয়, কখনো বদলায় না |
| GET | `/api/imports/{id}` | একটি ইমপোর্ট জবের অগ্রগতি, নিচে দেখুন |
| GET · DELETE | `/api/exports/{id}` | মিডিয়া লাইব্রেরিসহ বিবরণ · চ্যাটসহ মুছে ফেলা |
| POST | `/api/exports/{id}/describe` | মিডিয়া লাইব্রেরি বর্ণনা করে |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; `export_id` ছাড়া, শুধু নোট থেকে একটি চ্যাট: `persona` তাদের নাম, `user` আপনার (ডিফল্ট `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | টাইমলাইন (`?limit=`) · শিরোনাম ও নোট · মুছুন |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` সরিয়ে দেয়) |
| POST | `/api/chats/{id}/voice` | multipart `file` (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | পার্সোনাকে কাজ করতে দেয়; বার্তা ও ক্রমানুসারে কাজ ফেরত দেয় |
| POST | `/api/chats/{id}/regenerate` | পার্সোনার শেষ পালা বাদ দিয়ে আবার উত্তর দেয় |
| GET | `/api/chats/{id}/prompt` | সঠিক `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | তালিকা · শেয়ার লিংক তৈরি |
| PATCH · DELETE | `/api/shares/{id}` | সম্পাদনা (`pin: ""` PIN সরায়, `revoke_sessions`) · মুছুন |
| DELETE | `/api/shares/{id}/sessions/{session}` | একটি ভিজিটর কথোপকথন শেষ করে |
| GET · PUT | `/api/settings` | LLM, MCP, ও Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP স্ট্যাটাস · পুনরায় সংযোগ |
| GET · POST | `/api/telegram` · `/api/telegram/link` | বটের স্ট্যাটাস ও গ্রুপ · বটকে একটি গ্রুপে যোগ করার `t.me` লিংক |
| GET · PUT | `/api/sharing` | Wi‑Fi ও ইন্টারনেট শেয়ারিং `{lan?, internet?, name?}` (মালিকের ইন্টারফেস শুধু localhost-এ) |
| GET | `/api/qr?text=…` | একটি QR কোড (SVG) |

### ইমপোর্ট জব

`GET /api/imports/{id}` ফেরত দেয়

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (অন্য একটি ইমপোর্ট চলছে; একবারে একটি করে চলে), `running`, `done`, বা `failed`।
* `stage`: `unpacking`, `reading`, `parsing` (`total` পৃষ্ঠার মধ্যে `done`), `hashing` ও `placing` (ফাইল), `saving`।
* `messages`: এখন পর্যন্ত পাওয়া বার্তা।
* `failed` `error` যোগ করে, যেমন `no messages.html, result.json or WhatsApp .txt found in the upload`।
* `done` `created` (একই এক্সপোর্ট আগে ইমপোর্ট হয়ে থাকলে `false`) ও `export` যোগ করে, যে সারসংক্ষেপ `/api/state`-এও আছে।

সর্বশেষ ১৬টি সম্পন্ন জব রাখা হয়; অজানা আইডি ৪০৪ দেয়।

## পাবলিক

পাসওয়ার্ড ছাড়া, শেয়ার লিংকের ভিজিটরদের জন্য:

| পদ্ধতি | পাথ | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | ভিজিটরের পেজ |
| GET | `/api/s/{name}` | স্টার্ট পেজের তথ্য |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | টাইমলাইন |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | মালিকের মতোই; `regenerate`, এবং নতুন ভিজিটর বার্তা ছাড়া `respond` ("আগে তাঁকে লিখতে দিন"), শুধু যেখানে লিংকে `allow_regenerate` / `allow_nudge` আছে (নইলে `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | ভিজিটর যে মিডিয়া দেখতে পারে |

## রিলে হাব

| পদ্ধতি | পাথ | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, দাবি বা নাম পরিবর্তন (`Authorization: Bearer <সিক্রেট>`) |
| GET | `/relay/v1/connect` | অ্যাপের WebSocket |
| GET | `/relay/v1/info` | হাবের তথ্য |
| * | `/relay/v1/tg/bot<সিক্রেট>/<পদ্ধতি>` | শেয়ার করা বটের Bot API প্রক্সি |
