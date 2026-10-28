# Tautan berbagi

**Bagikan** di header chat membuat tautan agar orang lain dapat berbicara dengan persona, misalnya:

* seorang teman menilai seberapa baik AI menulis **dengan gaya Anda**;
* seorang teman berbicara dengan **salinan dirinya sendiri**.

Tautan berbentuk `https://<host Anda>/s/<nama>`. Pengunjung hanya melihat chat: tanpa bilah sisi, pengaturan, catatan, deskripsi media,
prompt, penggunaan token, atau chat lain.

## Opsi

| Opsi | Bawaan | |
|---|---|---|
| Siapa yang dapat membukanya | komputer ini | sakelar **Wi‑Fi** dan **Internet**, langsung di editor ([di bawah](#open-links-on-other-devices)) |
| Tautan | acak | pilih nama seperti `alex` |
| Nama tampilan | nama persona | nama asli dari ekspor tidak ditampilkan |
| PIN | tidak ada | 4–64 karakter, disimpan sebagai hash Argon2id. ✨ membuat 6 digit |
| Percakapan | privat | **Privat**: satu percakapan per pengunjung. **Ruang bersama**: semua orang dalam satu percakapan |
| Pengunjung dapat membaca ekspor | tidak ada | tidak ada, *N* pesan terakhir, atau semuanya |
| Batas | 50 pengunjung, 200 jawaban masing-masing | setiap jawaban memakan token dari kunci Anda. `0` = tanpa batas |
| Pengunjung dapat membuat mereka menulis lebih dulu | nonaktif | menampilkan tombol 💬: persona mengirim pesan tanpa pengunjung menulis apa pun |
| Pengunjung dapat menulis ulang jawaban | nonaktif | menampilkan tombol ↻: jawaban terakhir persona ditulis ulang. Keduanya memakai satu jawaban dari batas, dan server menolaknya selama nonaktif |
| Kedaluwarsa / aktif | tidak pernah / aktif | jeda atau kedaluwarsakan tautan tanpa menghapusnya |
| Grup Telegram | nonaktif | [menjawab dari Telegram](./telegram) |

Di dialog Bagikan, Anda dapat **Baca** setiap percakapan pengunjung, dan **Akhiri** satu untuk mencabutnya. Setiap pengunjung menampilkan
alamat tempat ia terakhir menulis; saat mengakhiri percakapan, **Blokir juga** menjaga alamat itu tetap di luar tautan
(halaman awal, percakapan baru, dan yang sudah terbuka) sampai Anda **Buka blokir**. Di jaringan bersama,
satu alamat dapat berarti beberapa orang. Alamat disimpan bersama tautan, hanya di komputer Anda.

## Dengan siapa persona berbicara

Pengunjung bukanlah Anda. Saat Mia membuka tautan Anda, persona tahu bahwa **Mia** sedang menulis, bahwa tautan itu
berasal dari Anda, dan bahwa riwayat dan catatan Anda tentang Anda dan mereka, bukan tentang Mia: persona menemuinya
sebagai orang baru. Tanpa nama, ia hanyalah tamu.

| | Yang dilihat persona |
|---|---|
| Tautan privat | satu percakapan dengan pengunjung, di bawah nama yang mereka berikan (atau "Tamu") |
| Ruang bersama | chat grup: setiap pesan membawa nama pengirimnya, dan orang dapat bergabung kapan saja |
| Riwayat ekspor Anda | pesan Anda dengan nama Anda, lalu pesan pengunjung, sehingga tidak pernah tercampur |

Prompt sistem tetap untuk setiap percakapan, sehingga penyedia menyimpannya di cache: nama pengunjung ditetapkan
saat percakapan dimulai, dan di ruang, nama ikut bersama pesan. Pengunjung yang menyebut dirinya seperti persona atau seperti Anda
menjadi, misalnya, "Alex (tamu)", dan "Ann" kedua di sebuah ruang menjadi "Ann 2".

## Undangan

| Tautan | Membuka |
|---|---|
| `/s/alex` | halaman awal |
| `/s/alex#pin=2468` | chat langsung. PIN berada setelah `#`, jadi tidak pernah sampai ke server atau log |
| `/s/alex#name=Greg&pin=2468` | sama, dengan nama pengunjung sudah terisi (`?name=Greg` juga berfungsi) |

Tombol **QR** pada tautan membuka kode untuk dipindai dengan ponsel, untuk setiap alamat yang berfungsi. Tepat setelah menyimpan,
**Salin undangan dengan PIN** menyalin tautan beserta PIN-nya.

## Membuka tautan di perangkat lain {#open-links-on-other-devices}

Di server, tautan cukup menggunakan alamat server. Aplikasi desktop (dan `rooftop` di `127.0.0.1`) hanya berjalan di
komputer Anda, sehingga dialog Bagikan dan editor tautan memiliki dua sakelar. Masing-masing menunjukkan apakah ia **Aktif**,
**Menghubungkan**, atau **Tidak berfungsi**, dan editor langsung menampilkan alamat yang akan dimiliki tautan.

```
                    ┌──────────── komputer Anda ────────────┐
 ponsel di Wi‑Fi ───▶│ :8737  hanya halaman pengunjung       │
                    │                                       │
 siapa pun ──▶ nama.iroof.top ══ satu WebSocket keluar ══▶ aplikasi │
                    │                                       │
                    │ 127.0.0.1  antarmuka pemilik,         │
                    │            pengaturan, dan API        │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi dan jaringan lokal | Internet |
|---|---|---|
| Alamat | `http://<IP Anda>:8737/s/<nama>` | `https://<nama>.iroof.top/s/<nama>` |
| Siapa | perangkat di jaringan yang sama | siapa pun, selama aplikasi berjalan |
| Cara | pendengar kedua yang hanya melayani halaman pengunjung | satu WebSocket keluar ke relai; tidak ada yang mendengarkan di internet |
| Data Anda | tetap di komputer Anda | tetap di komputer Anda, tetapi pesan pengunjung melewati relai |

* Port Wi‑Fi tetap sama di antara restart, sehingga kode QR yang dicetak tetap berfungsi. Di macOS, izinkan
  koneksi masuk jika firewall meminta.
* Nama internet dipilih dan diubah oleh Anda (**Ubah** di samping alamat). Relai hanya meneruskan
  `/s/…`, `/api/s/…`, dan aset halaman, membuang cookie di kedua arah, dan menampilkan halaman "offline" saat aplikasi ditutup.
* Ingin relai Anda sendiri alih-alih iroof.top? Lihat [Hub relai](../reference/relay-hub).
* **Mode offline** mematikan dan mengunci sakelar internet; Wi‑Fi tetap berfungsi. Apa yang dapat dilihat relai:
  [Offline dan privasi](../guide/offline#share-with-friends-safely).

## Perlindungan

| Perlindungan | Batas |
|---|---|
| PIN salah dari satu IP | setelah 5: terkunci 1 menit, lalu 2, 4… hingga 1 jam |
| PIN salah pada satu tautan, semua IP | 20 dalam 15 menit: terkunci 5 menit, berlipat hingga 24 jam |
| Pesan per pengunjung | 30 per menit, 10 jawaban per menit |
| Percakapan baru | 20 per jam per IP |

Penghitung tersimpan di memori. PIN 6 digit tidak dapat ditebak dalam waktu yang wajar. Di belakang reverse proxy, atur
`ROOFTOP_TRUST_PROXY=true`, sehingga penghitung melihat IP klien yang sebenarnya.

Sesi pengunjung menggunakan token acak 26 karakter di `/s/<nama>/<token>`, yang diingat peramban dan dijaga agar tidak bocor oleh
`Referrer-Policy: no-referrer`. Pengunjung hanya dapat memuat media yang boleh mereka lihat.
