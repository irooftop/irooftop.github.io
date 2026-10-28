# Cara kerjanya

<div class="wide">

![Cara kerja iRoof.top](/how-it-works.svg)

</div>

Setiap ekspor menjadi pesan ternormalisasi yang sama. Kemudian setiap tindakan persona diputar ulang ke model sebagai
**pemanggilan alat (tool call)**, sehingga model belajar *bagaimana* orang itu berinteraksi, bukan hanya apa yang mereka tulis, dan menjawab dengan cara yang sama.

## Tindakan sebagai pemanggilan alat

| Yang dilakukan persona | Pemanggilan alat dalam riwayat dan jawaban langsung |
|---|---|
| balon teks, mungkin balasan atau kutipan parsial | `send_message {text, reply_to?, quote?}` |
| stiker | `send_sticker {sticker_id, reply_to?}` |
| GIF dari pustaka, atau URL dari alat MCP | `send_gif {gif_id \| url, caption?}` |
| foto, video, suara, audio, berkas | `send_media {media_id, caption?}` |
| postingan yang diteruskan | `forward_message {message_id}` |
| reaksi | `react {message_id, emoji}` |
| *(mengingat riwayat lama)* | `search_history {query}` |

Beberapa pemanggilan dalam satu giliran menjadi beberapa balon. Pesan dari pihak lain menjadi baris ringkas yang dirujuk oleh id:

```text
#52108 19:08 ↩ balasan ke #52107 (kamu: "lasagna nenek 🍝"): Kamu belum pernah membuat lasagna sekali pun.
<sticker stk_156dbb381a>: seekor kucing bertopi koki sedang mengaduk panci
bereaksi 😂 ke #52107 ("lasagna nenek 🍝")
```

## Prompt sistem

| Bagian | |
|---|---|
| Harus menjadi siapa | memperkirakan pengetahuan dan gaya persona, dan tidak pernah tahu lebih dari yang mereka ketahui |
| Profil gaya | dari *seluruh* ekspor: panjang pesan, huruf kapital, tanda baca, penggunaan emoji dan stiker, kebiasaan membalas dan bereaksi, balon per giliran, contoh kata demi kata |
| Pustaka | stiker, GIF, dan media beserta cara penggunaannya |
| Catatan | apa yang Anda tulis tentang orang itu |

Prompt bersifat **statis** untuk sebuah chat: tanpa jam, tanpa penghitung. Model membaca waktu dari pemisah `— hari —`
dan cap `HH:MM`, dan setiap permintaan adalah awalan yang identik byte demi byte dengan permintaan berikutnya, sehingga cache prompt penyedia tetap mengenai sasaran.

## Chat panjang {#long-chats}

```
 anggaran riwayat ─────────────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ memori (≤ 350 kata)  │ giliran terbaru, dipangkas ke 60 %     │
 └──────────────────────┴────────────────────────────────────────┘
   hubungan, fakta,       titik potong tetap di tempatnya lama,
   topik, candaan         sehingga awalan yang di-cache juga
```

Ketika riwayat yang diputar ulang melebihi anggaran, balasan berikutnya pertama-tama meringkas giliran terlama (dan memori sebelumnya)
menjadi ringkasan singkat. Tidak ada yang dihabiskan saat impor atau saat membuka chat. Profil gaya tetap berasal dari seluruh
ekspor, dan `search_history` menjangkau setiap pesan lama. `usage` token (prompt, cache, penyelesaian) ditampilkan di `{ }`.

## Pustaka media

Model chat membaca teks, jadi stiker hanyalah `<sticker stk_…>` sampai dideskripsikan. **Deskripsikan dengan AI** mengirim
gambar dari item yang belum ada deskripsinya ke model media, yang harus mendukung visi.

* GIF, stiker video, dan video dikirim sebagai **4 bingkai berurutan**, sehingga model melihat gerakannya. Ini memerlukan
  [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`), jika tidak thumbnail yang digunakan.
* **Ulangi** mendeskripsikan satu item lagi. Setiap deskripsi dapat diedit dengan tangan.
* Deskripsi termasuk dalam ekspor dan melayani semua chat di dalamnya.

Lihat sendiri dengan [CLI](../reference/cli): `rooftop convert <ekspor> --persona "Jonas Weber"`.
