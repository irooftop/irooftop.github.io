# Menjawab dari Telegram

Tautan berbagi dapat memposting pesan pengunjungnya ke grup Telegram. Anda menjawab di sana sendiri, atau AI menjawab saat hitung mundur berakhir.
Pengunjung melihat "sedang mengetik…" yang sama dalam kedua kasus dan tidak dapat tahu siapa yang menjawab: permainan "manusia atau AI?", atau
meja bantuan tempat AI menangani pertanyaan yang jelas.

```
 pengunjung ──▶ tautan berbagi ──▶ 🤖 bot ──▶ grup Telegram Anda
                                            ├─ ✍️ Balas          Anda yang menjawab
                                            └─ 🤖 Balasan AI (10 dtk) AI menjawab sekarang, atau saat hitung mundur berakhir
```

## Pengaturan

**Pengaturan → Telegram** menampilkan bot, apakah terhubung, dan setiap grup tempat ia berada.

| Mode | Pengaturan | Pesan pergi ke |
|---|---|---|
| **Bot bersama** | tidak ada | melalui relai (iroof.top), dalam teks biasa seperti bot lainnya |
| **Bot milik sendiri** | buat dengan [@BotFather](https://t.me/BotFather), tempel token, dan **Hubungkan** | langsung antara aplikasi Anda dan Telegram |
| `TELEGRAM_BOT_TOKEN` | di server; `TELEGRAM_CHAT_ID` membatasi grup | langsung; mengalahkan Pengaturan |

Lalu tekan **Tambahkan ke grup**:

1. Buka tautan di **aplikasi Telegram**, di **Telegram Web**, atau pindai kode QR dengan ponsel Anda. Kedua tautan dapat disalin.
2. Pilih grup (atau buat satu) dan konfirmasi.
3. Dialog berubah hijau, dan grup muncul di Pengaturan dan di setiap tautan berbagi.

Dengan bot bersama, tautan membawa kode sekali pakai, berlaku satu jam, yang hanya mengikat grup ke aplikasi Anda.

Terakhir, pilih grup di bawah **Grup Telegram** dalam tautan berbagi, dan atur setelah berapa detik AI menjawab
(`0` = hanya saat Anda menekan **Balasan AI**).

::: tip Privasi
Hanya pesan pengunjung baru dan jawaban AI yang diposting ke grup, tidak pernah riwayat yang diekspor. Mode offline mematikan
bot. Rinciannya: [Offline dan privasi](../guide/offline#the-telegram-bot).
:::

::: tip Tidak perlu alamat publik
Kedua jenis bot menggunakan long polling, sehingga ini berfungsi dari laptop. Sebuah token bot hanya berfungsi di satu aplikasi dalam satu waktu.
:::

## Tiga cara menjawab

1. Balas prompt "✍️ … balas pesan ini" dari bot.
2. Balas pesan pengunjung (atau jawaban AI) kapan saja, tanpa menekan **Balas**.
3. Tekan **Balas**, lalu tulis saja. Selama 15 menit pesan Anda pergi ke pengunjung itu, dan 2 menit lagi setelah setiap
   jawaban, sehingga satu jawaban dapat mencakup beberapa pesan.

Cara ketiga memerlukan bot untuk melihat pesan grup biasa: matikan mode privasi (@BotFather → `/setprivacy` → Disable, lalu
tambahkan bot lagi) atau jadikan admin. Cara 1 dan 2 selalu berfungsi.

::: warning Gunakan grup yang Anda percaya
Siapa pun di grup dapat menjawab. Hanya jawaban teks yang diteruskan, dan jawaban AI dihitung terhadap batas tautan.
:::
