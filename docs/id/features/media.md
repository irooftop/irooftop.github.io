# Foto dan suara

Sebagian orang terutama mengirim foto, yang lain terutama berbicara lewat pesan suara. iRoof.top menjaga kedua kebiasaan itu.

## Memahaminya

Di pustaka media, **Deskripsikan dengan AI** mendeskripsikan stiker, GIF, dan foto serta **mentranskripsikan pesan suara** dengan
*model media*, yang harus menerima gambar dan audio. Atur di Pengaturan atau dengan `OPENAI_MEDIA_MODEL`, misalnya
`google/gemini-3.5-flash-lite` di OpenRouter. Deskripsi hanya dibuat saat Anda menekan tombol, dan dengan model lokal serta
[Mode offline](../guide/offline) foto tidak pernah meninggalkan komputer Anda.

```text
<pesan suara 0:05: «apa yang dikatakan»>
```

Saat satu jenis mendominasi, profil gaya mengatakannya, misalnya "terutama berbicara lewat pesan suara (10 dari 10)".

### Pustaka besar

Chat yang panjang dapat berisi puluhan ribu stiker, GIF, dan foto. Pustaka media membantu Anda membelanjakan token model
di tempat yang paling penting:

| Kontrol | Fungsinya |
|---|---|
| Tab jenis | Semua, Belum ada, Sudah dideskripsikan, Stiker, GIF, Foto, Video, Suara, dengan jumlah |
| Urutan | paling sering dipakai (bawaan), paling jarang, baru dipakai, pertama kali dipakai |
| Jumlah pemakaian | menyembunyikan item yang dipakai kurang dari 2, 3, 5, 10, atau 25 kali |
| Pencarian | dalam deskripsi dan id |

**Deskripsikan N dengan AI** mendeskripsikan tepat apa yang ditampilkan dan belum dideskripsikan, **dari atas ke bawah sesuai urutan yang dipilih**,
empat sekaligus. Setiap deskripsi disimpan segera setelah tiba. Baris kemajuan menampilkan berapa yang sudah selesai, kegagalan,
kecepatan, dan sisa waktu. Tombol yang sama berubah menjadi **Hentikan**: Anda dapat berhenti kapan saja, dan proses berikutnya melanjutkan dengan sisanya.
Awal yang baik untuk chat besar: *Paling sering dipakai dulu* dan *Dipakai 3 kali atau lebih*.

## Pesan suara Anda

Dengan kolom tulis kosong, tombol kirim berubah menjadi **mikrofon**, seperti di Telegram. Rekaman dikonversi ke WAV di
peramban, diunggah, dan ditranskripsikan. Pengunjung tautan berbagi juga dapat merekam.

::: info
Peramban hanya mengizinkan perekaman di `https://` atau `localhost`.
:::

## Foto dan suara persona

Hubungkan server MCP yang membuat gambar dan yang berbicara:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

Persona kemudian mendapat dua tindakan lagi:

| Tindakan | Fungsinya |
|---|---|
| `send_voice {text}` | memanggil alat suara (WAV, dicoba ulang sebagai mp3) dan mengirim pesan suara |
| `send_photo {prompt, caption?}` | memanggil alat gambar dan mengirim foto |

* Dengan alat suara terhubung, pesan suara persona sendiri yang sudah ditranskripsikan diputar ulang sebagai `send_voice`, sehingga model melihat
  kebiasaan itu dalam bentuk yang dapat ia lanjutkan.
* **Suara** di *Detail chat* (misalnya `Puck`) memberi persona suaranya sendiri.
* Gambar atau audio lain yang dikembalikan alat MCP menjadi media chat `gen_…` (diperiksa berdasarkan isi, hingga 25 MB, dan dihapus
  bersama chat).

::: tip Biaya
Setiap foto atau pesan suara adalah panggilan berbayar tambahan: sekitar $0,01 per gambar dengan `meta/muse-image`, dan beberapa detik TTS.
:::
