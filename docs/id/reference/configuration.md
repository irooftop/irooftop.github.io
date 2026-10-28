# Konfigurasi

Variabel lingkungan, berkas `.env` di direktori kerja, atau opsi `rooftop` yang sesuai
([CLI](./cli)). Nilai yang diatur di **Pengaturan** mengalahkan lingkungan untuk endpoint LLM, model, kunci, temperatur,
anggaran riwayat, langkah alat, server MCP, bot Telegram, dan Mode offline. `TELEGRAM_BOT_TOKEN` mengalahkan Pengaturan.

## Model

| Variabel | Bawaan | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | API apa pun yang kompatibel dengan OpenAI: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | token bearer |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | harus mendukung pemanggilan alat |
| `OPENAI_TEMPERATURE` | bawaan penyedia | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | mendeskripsikan gambar dan mentranskripsikan suara, misalnya `xiaomi/mimo-v2.6-flash` |

## Offline

| Variabel | Bawaan | |
|---|---|---|
| `ROOFTOP_OFFLINE` | nonaktif | `1`, `true`, `yes`, atau `on`: hanya model dan server MCP lokal (komputer ini atau jaringan), tanpa berbagi internet, tanpa Telegram. Sama dengan sakelar **Offline** di Pengaturan, tetapi Pengaturan tidak dapat mematikannya. Aplikasi desktop juga menghormatinya. [Offline dan privasi](../guide/offline) |

## Server

| Variabel | Bawaan | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` di Docker) | dengan `0.0.0.0:<port>` log menampilkan URL LAN |
| `ROOFTOP_DATA` | `./data` (`/data` di Docker) | ekspor, chat, pengaturan |
| `ROOFTOP_IMPORT` | – | ekspor untuk diimpor saat mulai, dipisahkan `:`, idempoten |
| `ROOFTOP_PASSWORD` | – | autentikasi HTTP Basic untuk antarmuka pemilik (nama pengguna apa pun). **Atur di server publik** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | batas unggah untuk pemilik dalam MiB; `0` berarti tidak ada (ekspor berukuran banyak GB). Atur di server yang dapat dijangkau orang lain. Tautan berbagi memiliki batas 16 MiB sendiri. Aplikasi desktop tanpa batas |
| `ROOFTOP_TRUST_PROXY` | `false` | IP klien dari `X-Forwarded-For` / `X-Real-IP`, hanya di belakang reverse proxy |
| `ROOFTOP_FFMPEG` | `ffmpeg` di `PATH`, lalu Homebrew, `/usr/local`, `/usr/bin` | bingkai GIF dan video (opsional) |
| `TZ` | UTC | zona waktu pesan langsung |

## Telegram

| Variabel | Bawaan | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | bot Anda dari [@BotFather](https://t.me/BotFather) ([Menjawab dari Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | setiap grup tempat bot bergabung | id grup yang diizinkan, dipisahkan koma |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | misalnya server Bot API yang di-hosting sendiri |

## Relai

| Variabel | Bawaan | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | relai untuk berbagi **Internet** dan bot bersama |
| `ROOFTOP_RELAY_DOMAIN` | – | menjalankan [hub relai](./relay-hub) untuk domain ini |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | bot bersama hub; harus berbeda dari `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | jumlah nama terbanyak yang disimpan hub |

## Hanya Pengaturan {#settings-only}

| Pengaturan | Bawaan | |
|---|---|---|
| Anggaran riwayat | `120000` karakter | berapa banyak riwayat yang diputar ulang sebelum [memori](../features/how-it-works#long-chats) berlaku |
| Langkah alat maksimum | `6` | putaran LLM per jawaban (pencarian, alat MCP, balasan…) |
