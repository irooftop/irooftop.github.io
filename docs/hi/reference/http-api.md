# HTTP API

HTTP पर JSON। `ROOFTOP_PASSWORD` सेट होने पर मालिक के API को HTTP Basic प्रमाणीकरण चाहिए।

## मालिक

| मेथड | पाथ | |
|---|---|---|
| GET | `/api/state` | एक्सपोर्ट, चैट, शेयर लिंक, LLM जानकारी |
| POST | `/api/exports` | मल्टीपार्ट अपलोड: सापेक्ष नामों वाली फ़ोल्डर फ़ाइलें, या `.zip`। तुरंत `202 {"id"}` देता है और पृष्ठभूमि में इम्पोर्ट करता है |
| POST | `/api/uploads` | बैच अपलोड शुरू करता है (वेब इंटरफ़ेस इसका उपयोग करता है): `{"id"}` |
| POST | `/api/uploads/{id}/files` | सापेक्ष नामों वाली फ़ाइलों का मल्टीपार्ट बैच; उसी बैच को दोबारा भेजने पर उसकी फ़ाइलें बदल जाती हैं: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | चैट फ़ाइलों के बाद, मीडिया से पहले: अभी भेजे जाने वाले `{"bytes"}` → `{title, messages, existing, fits, free_bytes, needed_bytes}` (पहले से इम्पोर्ट है? डिस्क पर जगह है?) |
| POST | `/api/uploads/{id}/import` | अब तक अपलोड की गई सब कुछ इम्पोर्ट करता है: इम्पोर्ट जॉब का `202 {"id"}` |
| DELETE | `/api/uploads/{id}` | एक अधूरे अपलोड को छोड़ता है (छोड़े गए अपलोड 24 घंटे बाद और रीस्टार्ट पर हटते हैं) |
| POST | `/api/local/pick` | केवल डेस्कटॉप ऐप: नेटिव पिकर दिखाता है, `{"kind": "folder" \| "file"}` → `{"path"}` (रद्द होने पर `null`) |
| POST | `/api/local/import` | केवल डेस्कटॉप ऐप: इस कंप्यूटर से इम्पोर्ट करता है, `{"paths": […]}` (फ़ोल्डर, `.zip`, या WhatsApp `.txt`; एक ही एक्सपोर्ट की फ़ाइलें उसके फ़ोल्डर का प्रतिनिधित्व करती हैं) → इम्पोर्ट जॉब का `202 {"id", "name"}`; स्रोत कॉपी होता है, कभी बदला नहीं जाता |
| GET | `/api/imports/{id}` | इम्पोर्ट जॉब की प्रगति, नीचे देखें |
| GET · DELETE | `/api/exports/{id}` | मीडिया लाइब्रेरी के साथ विवरण · उसकी चैट के साथ हटाएँ |
| POST | `/api/exports/{id}/describe` | मीडिया लाइब्रेरी का वर्णन करता है |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; `export_id` के बिना, केवल नोट्स से चैट: `persona` उनका नाम है, `user` आपका (डिफ़ॉल्ट `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | टाइमलाइन (`?limit=`) · शीर्षक और नोट्स · हटाएँ |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` हटाता है) |
| POST | `/api/chats/{id}/voice` | मल्टीपार्ट `file` (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | पर्सोना को कार्य करने दें; संदेश और क्रम में क्रियाएँ लौटाता है |
| POST | `/api/chats/{id}/regenerate` | पर्सोना की आख़िरी बारी हटाता है और फिर से जवाब देता है |
| GET | `/api/chats/{id}/prompt` | सटीक `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | सूची · शेयर लिंक बनाएँ |
| PATCH · DELETE | `/api/shares/{id}` | संपादित करें (`pin: ""` PIN हटाता है, `revoke_sessions`) · हटाएँ |
| DELETE | `/api/shares/{id}/sessions/{session}` | एक विज़िटर बातचीत समाप्त करता है |
| GET · PUT | `/api/settings` | LLM, MCP, और Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP स्थिति · फिर से कनेक्ट करें |
| GET · POST | `/api/telegram` · `/api/telegram/link` | बॉट स्थिति और ग्रुप · बॉट को ग्रुप में जोड़ने वाला `t.me` लिंक |
| GET · PUT | `/api/sharing` | Wi‑Fi और इंटरनेट शेयरिंग `{lan?, internet?, name?}` (मालिक का इंटरफ़ेस केवल localhost पर) |
| GET | `/api/qr?text=…` | QR कोड (SVG) |

### इम्पोर्ट जॉब

`GET /api/imports/{id}` लौटाता है

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (कोई और इम्पोर्ट चल रहा है; वे एक-एक करके चलते हैं), `running`, `done`, या `failed`।
* `stage`: `unpacking`, `reading`, `parsing` (`total` पृष्ठों में से `done`), `hashing` और `placing` (फ़ाइलें), `saving`।
* `messages`: अब तक मिले संदेश।
* `failed` `error` जोड़ता है, जैसे `no messages.html, result.json or WhatsApp .txt found in the upload`।
* `done` `created` (यदि वही एक्सपोर्ट पहले इम्पोर्ट हुआ था तो `false`) और `export` जोड़ता है, वह सारांश जो `/api/state` में भी है।

आख़िरी 16 पूरे हुए जॉब रखे जाते हैं; अज्ञात ID 404 देता है।

## सार्वजनिक

बिना पासवर्ड, शेयर लिंक के विज़िटर्स के लिए:

| मेथड | पाथ | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | विज़िटर का पेज |
| GET | `/api/s/{name}` | स्टार्ट पेज की जानकारी |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | टाइमलाइन |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | मालिक जैसा ही; `regenerate`, और बिना नए विज़िटर संदेश के `respond` ("पहले वे लिखें"), केवल जब लिंक में `allow_regenerate` / `allow_nudge` हो (वरना `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | विज़िटर जो मीडिया देख सकता है |

## रिले हब

| मेथड | पाथ | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, दावा करें या नाम बदलें (`Authorization: Bearer <सीक्रेट>`) |
| GET | `/relay/v1/connect` | ऐप का WebSocket |
| GET | `/relay/v1/info` | हब की जानकारी |
| * | `/relay/v1/tg/bot<सीक्रेट>/<मेथड>` | साझा बॉट का Bot API प्रॉक्सी |
