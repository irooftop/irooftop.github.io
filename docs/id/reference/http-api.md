# API HTTP

JSON melalui HTTP. Dengan `ROOFTOP_PASSWORD` diatur, API pemilik memerlukan autentikasi HTTP Basic.

## Pemilik

| Metode | Jalur | |
|---|---|---|
| GET | `/api/state` | ekspor, chat, tautan berbagi, info LLM |
| POST | `/api/exports` | unggahan multipart: berkas folder dengan nama relatif, atau `.zip`. Langsung membalas `202 {"id"}` dan mengimpor di latar belakang |
| POST | `/api/uploads` | memulai unggahan batch (yang digunakan antarmuka web): `{"id"}` |
| POST | `/api/uploads/{id}/files` | batch multipart berkas dengan nama relatif; mengirim ulang batch menggantikan berkasnya: `{"files", "bytes"}` |
| POST | `/api/uploads/{id}/check` | setelah berkas chat, sebelum media: `{"bytes"}` yang masih perlu dikirim → `{title, messages, existing, fits, free_bytes, needed_bytes}` (sudah diimpor? ruang disk cukup?) |
| POST | `/api/uploads/{id}/import` | mengimpor semua yang sudah diunggah sejauh ini: `202 {"id"}` dari tugas impor |
| DELETE | `/api/uploads/{id}` | membuang unggahan yang belum selesai (yang ditinggalkan dihapus setelah 24 jam dan saat mulai ulang) |
| POST | `/api/local/pick` | hanya aplikasi desktop: menampilkan pemilih native, `{"kind": "folder" \| "file"}` → `{"path"}` (`null` jika dibatalkan) |
| POST | `/api/local/import` | hanya aplikasi desktop: mengimpor dari komputer ini, `{"paths": […]}` (folder, `.zip`, atau `.txt` WhatsApp; berkas di dalam satu ekspor mewakili foldernya) → `202 {"id", "name"}` dari tugas impor; sumbernya disalin, tidak pernah diubah |
| GET | `/api/imports/{id}` | kemajuan tugas impor, lihat di bawah |
| GET · DELETE | `/api/exports/{id}` | detail dengan pustaka media · hapus bersama chatnya |
| POST | `/api/exports/{id}/describe` | mendeskripsikan pustaka media |
| POST | `/api/chats` | `{export_id, persona, user?, title?, notes?}`; tanpa `export_id`, chat hanya dari catatan: `persona` adalah nama mereka, `user` nama Anda (bawaan `Me`) |
| GET · PATCH · DELETE | `/api/chats/{id}` | linimasa (`?limit=`) · judul dan catatan · hapus |
| POST | `/api/chats/{id}/messages` | `{text?, reply_to?, quote?, sticker_id?, gif_id?}` |
| POST | `/api/chats/{id}/react` | `{message_id, emoji}` (`""` menghapus) |
| POST | `/api/chats/{id}/voice` | `file` multipart (wav, ogg, mp3, m4a, webm), `duration?`, `reply_to?` |
| POST | `/api/chats/{id}/respond` | membiarkan persona bertindak; mengembalikan pesan dan tindakan berurutan |
| POST | `/api/chats/{id}/regenerate` | membuang giliran terakhir persona dan menjawab lagi |
| GET | `/api/chats/{id}/prompt` | `{model, messages, tools}` yang persis |
| GET · POST | `/api/chats/{id}/shares` | daftar · membuat tautan berbagi |
| PATCH · DELETE | `/api/shares/{id}` | ubah (`pin: ""` menghapus PIN, `revoke_sessions`) · hapus |
| DELETE | `/api/shares/{id}/sessions/{session}` | mengakhiri satu percakapan pengunjung |
| GET · PUT | `/api/settings` | LLM, MCP, dan Telegram (`telegram: {mode: off\|shared\|own, token?}`) |
| GET · POST | `/api/mcp` · `/api/mcp/reconnect` | status MCP · sambungkan ulang |
| GET · POST | `/api/telegram` · `/api/telegram/link` | status bot dan grup · tautan `t.me` yang menambahkan bot ke grup |
| GET · PUT | `/api/sharing` | berbagi Wi‑Fi dan Internet `{lan?, internet?, name?}` (antarmuka pemilik hanya di localhost) |
| GET | `/api/qr?text=…` | kode QR (SVG) |

### Tugas impor

`GET /api/imports/{id}` mengembalikan

```json
{"id": "…", "state": "running", "stage": "parsing", "done": 37, "total": 121, "messages": 36000}
```

* `state`: `queued` (impor lain sedang berjalan; mereka berjalan satu per satu), `running`, `done`, atau `failed`.
* `stage`: `unpacking`, `reading`, `parsing` (`done` dari `total` halaman), `hashing` dan `placing` (berkas), `saving`.
* `messages`: pesan yang ditemukan sejauh ini.
* `failed` menambahkan `error`, misalnya `no messages.html, result.json or WhatsApp .txt found in the upload`.
* `done` menambahkan `created` (`false` jika ekspor yang sama sudah pernah diimpor) dan `export`, ringkasan yang juga ada di `/api/state`.

16 tugas yang selesai terakhir disimpan; id yang tidak dikenal membalas 404.

## Publik

Tanpa kata sandi, untuk pengunjung tautan berbagi:

| Metode | Jalur | |
|---|---|---|
| GET | `/s/{name}[/{token}]` | halaman pengunjung |
| GET | `/api/s/{name}` | info halaman awal |
| POST | `/api/s/{name}/sessions` | `{pin?, name?}` → `{token}` |
| GET | `/api/s/{name}/c/{token}` | linimasa |
| POST | `/api/s/{name}/c/{token}/messages` · `react` · `voice` · `respond` · `regenerate` | seperti untuk pemilik; `regenerate`, dan `respond` tanpa pesan pengunjung baru ("biarkan mereka menulis dulu"), hanya jika tautan memiliki `allow_regenerate` / `allow_nudge` (jika tidak, `403`) |
| GET | `/api/s/{name}/c/{token}/media/{path}` | media yang boleh dilihat pengunjung |

## Hub relai

| Metode | Jalur | |
|---|---|---|
| POST | `/relay/v1/register` | `{name}`, mengklaim atau mengganti nama (`Authorization: Bearer <rahasia>`) |
| GET | `/relay/v1/connect` | WebSocket aplikasi |
| GET | `/relay/v1/info` | info hub |
| * | `/relay/v1/tg/bot<rahasia>/<metode>` | proksi Bot API dari bot bersama |
