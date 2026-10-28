# HTTP API

HTTP üzerinden JSON. `ROOFTOP_PASSWORD` ayarlıyken sahip API'si HTTP Basic kimlik doğrulaması gerektirir.

## Sahip

| Yöntem | Yol | |
|---|---|---|
| GET | `/api/state` | dışa aktarımlar, sohbetler, paylaşım bağlantıları, LLM bilgisi |
| POST | `/api/exports` | çok parçalı yükleme: göreli adlı klasör dosyaları ya da bir `.zip`. Hemen `202 {"id"}` yanıtlar ve arka planda içe aktarır |
| POST | `/api/uploads` | toplu yüklemeyi başlatır (web arayüzünün kullandığı): `{"id"}` |
| POST | `/api/uploads/{id}/files` | göreli adlı dosyaların çok parçalı grubu; bir grubu yeniden göndermek dosyalarını değiştirir: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | sohbet dosyalarından sonra, medyadan önce: gönderilmesi kalan `{"bytes"}` → `{title, messages, existing, fits, free_bytes, needed_bytes}` (zaten içe aktarıldı mı? diskte yer var mı?) |
| POST | `/api/uploads/{id}/import` | şimdiye kadar yüklenen her şeyi içe aktarır: içe aktarma işinin `202 {"id"}` yanıtı |
| DELETE | `/api/uploads/{id}` | tamamlanmamış bir yüklemeyi iptal eder (terk edilenler 24 saat sonra ve yeniden başlatmada silinir) |
| POST | `/api/local/pick` | yalnızca masaüstü uygulaması: yerel seçiciyi gösterir, `{"kind": "folder" \| "file"}` → `{"path"}` (iptal edilirse `null`) |
| POST | `/api/local/import` | yalnızca masaüstü uygulaması: bu bilgisayardan içe aktarır, `{"paths": […]}` (bir klasör, `.zip` ya da WhatsApp `.txt`; bir dışa aktarımın içindeki dosyalar onun klasörünü temsil eder) → içe aktarma işinin `202 {"id", "name"}` yanıtı; kaynak kopyalanır, asla değiştirilmez |
| GET | `/api/imports/{id}` | bir içe aktarma işinin ilerlemesi, aşağıya bakın |
| GET · DELETE | `/api/exports/{id}` | medya kitaplığıyla ayrıntılar · sohbetleriyle birlikte silme |
| POST | `/api/exports/{id}/describe` | medya kitaplığını açıklar |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; `export_id` olmadan yalnızca notlardan bir sohbet: `persona` onun adı, `user` sizin adınız (varsayılan `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | zaman çizelgesi (`?limit=`) · başlık ve notlar · silme |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` kaldırır) |
| POST | `/api/chats/{id}/voice` | çok parçalı `file` (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | karakterin harekete geçmesine izin verir; mesajları ve sıralı eylemleri döndürür |
| POST | `/api/chats/{id}/regenerate` | karakterin son turunu atar ve yeniden yanıt verir |
| GET | `/api/chats/{id}/prompt` | tam `{model, messages, tools}` |
| GET · POST | `/api/chats/{id}/shares` | listele · paylaşım bağlantıları oluştur |
| PATCH · DELETE | `/api/shares/{id}` | düzenle (`pin: ""` PIN'i kaldırır, `revoke_sessions`) · sil |
| DELETE | `/api/shares/{id}/sessions/{session}` | bir ziyaretçi konuşmasını sonlandırır |
| GET · PUT | `/api/settings` | LLM, MCP ve Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | MCP durumu · yeniden bağlan |
| GET · POST | `/api/telegram` · `/api/telegram/link` | bot durumu ve gruplar · botu bir gruba ekleyen bir `t.me` bağlantısı |
| GET · PUT | `/api/sharing` | Wi‑Fi ve İnternet paylaşımı `{lan?, internet?, name?}` (sahip arayüzü yalnızca localhost'ta) |
| GET | `/api/qr?text=…` | bir QR kodu (SVG) |

### İçe aktarma işleri

`GET /api/imports/{id}` şunu döndürür:

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (başka bir içe aktarma çalışıyor; bunlar sırayla çalışır), `running`, `done` ya da `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`total` sayfanın `done` tanesi), `hashing` ve `placing` (dosyalar), `saving`.
* `messages`: şimdiye kadar bulunan mesajlar.
* `failed`, `error` ekler; örneğin `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done`, `created` (aynı dışa aktarım daha önce içe aktarıldıysa `false`) ve `export` ekler; `/api/state` içinde de bulunan özet.

Son 16 tamamlanmış iş saklanır; bilinmeyen bir kimlik 404 yanıtı verir.

## Herkese açık

Parola yok; paylaşım bağlantısı ziyaretçileri için:

| Yöntem | Yol | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | ziyaretçi sayfası |
| GET | `/api/s/{name}` | başlangıç sayfası bilgisi |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | zaman çizelgesi |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | sahip için olduğu gibi; `regenerate` ve yeni bir ziyaretçi mesajı olmadan `respond` («önce onlar yazsın»), yalnızca bağlantıda `allow_regenerate` / `allow_nudge` varsa (aksi halde `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | ziyaretçinin görebileceği medya |

## Aktarıcı merkezi

| Yöntem | Yol | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, almak ya da yeniden adlandırmak (`Authorization: Bearer <sır>`) |
| GET | `/relay/v1/connect` | uygulamanın WebSocket'i |
| GET | `/relay/v1/info` | merkez bilgisi |
| * | `/relay/v1/tg/bot<sır>/<yöntem>` | paylaşılan botun Bot API vekili |
