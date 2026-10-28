# CLI

```text
rooftop [serve] [OPSI]           menjalankan server web (bawaan)
rooftop parse <FOLDER>           mencetak ekspor ternormalisasi sebagai JSON
rooftop convert [OPSI] <FOLDER>  mencetak {model, messages, tools} dari sebuah ekspor
```

## `serve`

| Opsi | Variabel | Bawaan |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (tanpa batas) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | setiap grup tempat bot bergabung |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | nonaktif |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline` menolak endpoint model dan MCP yang tidak lokal, dan mematikan berbagi internet serta bot Telegram
([Offline dan privasi](../guide/offline)). Tidak dapat dikombinasikan dengan `--relay-domain`. Fungsi masing-masing: [Konfigurasi](./configuration).

## `parse` dan `convert`

```sh
rooftop parse   ./examples/telegram                          # JSON ternormalisasi
rooftop convert ./examples/telegram --persona "Jonas Weber"  # yang diterima model
```

| Opsi `convert` | Bawaan | |
|---|---|---|
| `--persona` | judul chat / orang lain | atas nama siapa LLM berbicara |
| `--user` | peserta lainnya | siapa yang memerankan manusia |
| `--budget` | `120000` | anggaran riwayat dalam karakter |

Di aplikasi, tombol `{ }` menampilkan JSON yang sama untuk chat saat ini.
