# Mengekspor chat

<div class="wide">

![Telegram Desktop: buka chat, klik ⋯ di pojok kanan atas, pilih Ekspor riwayat chat…, lalu Ekspor](/img/telegram-export.svg)

</div>

## Telegram

Di **Telegram Desktop** (macOS, Windows, Linux): buka chat → **⋯** → **Ekspor riwayat chat…** → **Ekspor**.

* Biarkan foto, video, pesan suara, stiker, dan GIF aktif: persona menggunakannya.
* Kedua format berfungsi: **HTML** (`messages.html`) dan **JSON** yang dapat dibaca mesin (`result.json`).
* Seret folder ekspor, atau `.zip`-nya, ke halaman.

## WhatsApp

Di ponsel: buka chat → **⋮ → Lainnya → Ekspor chat** (iPhone: ketuk nama kontak → **Ekspor chat**) →
**Sertakan media**. Kirim `.zip` ke komputer Anda dan seret ke halaman.

Chat yang diekspor tanpa media berupa satu `.txt`, dan itu juga berfungsi.

## Ekspor besar

Ekspor dengan 100.000+ pesan dan banyak gigabyte bekerja dengan cara yang sama: seret folder. Halaman menampilkan apa yang sedang terjadi:

1. **Membaca folder…** menghitung berkas (peramban mungkin membutuhkan waktu untuk mendaftar puluhan ribu berkas).
2. **Chat didahulukan.** Halaman pesan (atau `result.json`, atau `.txt` WhatsApp) diunggah dan dibaca sebelum media. Jika ekspor ini **sudah diimpor**, impor berakhir di sini dan membukanya, dan tidak ada media yang diunggah. Jika media tidak muat di disk, Anda diberi tahu berapa ruang yang dibutuhkan sebelum mengirim sesuatu yang besar.
3. **Mengunggah 1,2 GB dari 3,4 GB (35%) · 9.000 dari 30.905 berkas**: media mengikuti dalam kelompok kecil, satu demi satu. Peramban tidak pernah membuat satu permintaan raksasa, dan kelompok yang terputus dicoba ulang sendiri. Tidak ada batas ukuran saat Anda menjalankannya di komputer Anda sendiri.
4. **Membaca pesan: halaman 37 dari 121 · 36.000 pesan**: semua halaman dibaca sekali, secara paralel.
5. **Memeriksa media** dan **Memindahkan media**: berkas di-hash untuk menemukan duplikat dan dipindahkan (tidak disalin dua kali) ke folder data.
6. **Menyimpan**, lalu dialog *Chat baru* terbuka.

Hanya satu impor yang berjalan dalam satu waktu; galat tetap terlihat di area seret dan Anda dapat memilih folder lagi.

Di [aplikasi desktop](./desktop) pengunggahan ini tidak terjadi: aplikasi membaca folder, `.zip`, atau `.txt` dari tempat mereka berada
(langkah 4 sampai 6), yang lebih cepat dan tidak terpengaruh masalah peramban di bawah.

::: details Saat berkas tidak dapat diunggah (peramban)
Berkas yang tidak lagi dapat dibaca peramban (dipindahkan, diubah, atau placeholder iCloud/OneDrive yang belum diunduh) ditemukan dan dilewati, begitu pula berkas tunggal yang terus merusak kelompoknya: kelompok dibagi hingga berkas itu terisolasi. Media yang dilewati tampak hilang di chat; pesan setelah impor menyebut salah satunya, dan konsol peramban mencantumkan semuanya. Ketika berkas chat itu sendiri tidak dapat dikirim, impor berhenti dan menyebutnya. Galat menunjukkan apa yang diterima server, misalnya `server menerima 1.200 dari 4.096 byte`, sehingga masalah koneksi atau peramban mudah dibedakan.
:::

Selama impor, tidak ada yang meninggalkan komputer Anda dan tidak ada model yang dipanggil. Media hanya dideskripsikan saat Anda menekan **Deskripsikan** di pustaka media.

Dengan `rooftop --import <folder>`, folder dibaca di tempatnya dan berkasnya disalin, tidak pernah dipindahkan; kemajuannya dicatat.
Untuk ekspor yang sangat besar di komputer yang sama, ini adalah cara tercepat: tanpa unggahan dan tanpa salinan kedua di folder sementara.

## Yang dikenali

| Sumber | Berkas |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (dipakai saat folder tidak memiliki `messages.html`) |
| WhatsApp | `WhatsApp Chat with <nama>.txt` (Android) atau `_chat.txt` (iOS), dalam folder, `.zip`, atau sendiri |

* **Telegram**: teks dengan baris baru, tautan, kutipan, dan kode; balasan dan kutipan parsial; teruskan; suntingan; pesan layanan;
  reaksi; pratinjau tautan; foto, video, video bulat, pesan suara, audio, berkas, stiker (`.webp`, `.webm`,
  `.tgs`), GIF, lokasi, kontak, jajak pendapat, dan panggilan.
* **WhatsApp**: tata letak Android dan iOS, jam 12 dan 24 jam, serta kedua urutan hari/bulan, dideteksi per berkas.
  Pesan multi-baris, suntingan, dan lampiran dipertahankan. Pesan yang dihapus dan pemberitahuan enkripsi dilewati,
  dan `<Media omitted>` ditandai sebagai tidak tersedia.

Berkas media di-hash, jadi stiker yang dikirim lima kali menjadi satu item pustaka (`stk_…`, `gif_…`, `pho_…`).

::: info Reaksi di ekspor HTML
Ekspor HTML tidak menyebutkan siapa yang bereaksi. Dalam chat satu-lawan-satu, reaksi dikaitkan dengan peserta lainnya, dan dengan keduanya saat jumlahnya 2.
:::
