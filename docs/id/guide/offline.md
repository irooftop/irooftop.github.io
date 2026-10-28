# Offline dan privasi

iRoof.top menyimpan chat Anda di komputer Anda. Dengan model yang juga berjalan di komputer Anda, **tidak ada yang harus meninggalkannya**.
**Mode offline** menjadikan itu aturan yang ditegakkan aplikasi, bukan kebiasaan.

## Apa yang terjadi secara lokal

| Langkah | Berjalan di | Jaringan |
|---|---|---|
| Impor, parsing, profil gaya | komputer Anda | tidak ada |
| Penyimpanan | berkas JSON dan media di folder data | tidak ada |
| Pencarian riwayat, PIN tautan, pustaka media | komputer Anda | tidak ada |
| Mendeskripsikan foto, stiker, GIF, video | **model media**, hanya saat Anda menekan **Deskripsikan dengan AI** | satu permintaan per item ke endpoint model |
| Mentranskripsikan suara | model media, saat Anda menekan **Deskripsikan dengan AI** pada pesan suara atau merekam satu | satu permintaan ke endpoint model |
| Sebuah balasan | **model chat**, saat Anda mengirim pesan (atau pengunjung mengirim) | permintaan ke endpoint model |
| Meringkas riwayat panjang | model chat, sebagai bagian dari balasan, saat riwayat melebihi anggaran | satu permintaan tambahan ke endpoint model |

Impor tidak pernah memanggil model. Panggilan pertama terjadi saat Anda mengirim pesan, menekan **Deskripsikan**, atau merekam
pesan suara. Sebuah balasan mengirim ke model riwayat yang diekspor (hingga [anggaran riwayat](../reference/configuration#settings-only)),
profil gaya, dan deskripsi media. Jadi **tempat model berjalan menentukan ke mana chat Anda pergi**: endpoint cloud menerimanya, model di komputer Anda tidak.

## Berjalan sepenuhnya offline

1. Pasang [Ollama](https://ollama.com) atau [LM Studio](https://lmstudio.ai), atau jalankan `llama-server` dari llama.cpp.
2. Unduh **model chat yang mendukung pemanggilan alat**, dan **model visi** jika Anda ingin foto dan stiker dideskripsikan.
3. Di **Pengaturan**, pilih endpoint dan model, lalu aktifkan **Offline**:

| Server | URL dasar |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| `llama-server` llama.cpp | `http://localhost:8081/v1` (port bawaannya `8080` milik iRoof.top: jalankan dengan `llama-server --port 8081`) |

4. Tekan **Uji**. Ini mengirim permintaan kecil dan menampilkan model serta host yang menjawab. Anda bisa mematikan jaringan dan tetap mengobrol.

**Aplikasi desktop** diatur di Pengaturan. Ia tidak membaca shell atau berkas `.env` Anda (lihat [Aplikasi desktop](./desktop)),
tetapi tetap menghormati `ROOFTOP_OFFLINE` dan `OPENAI_*` jika ada di lingkungan tempat ia dijalankan. Sebuah server
membaca lingkungan (dan `.env`):

::: code-group

```sh [Homebrew / server cargo]
# --offline sama dengan ROOFTOP_OFFLINE=1
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=llama3.1 rooftop --offline
```

```sh [Docker]
docker run -p 8080:8080 -v rooftop-data:/data \
  --add-host=host.docker.internal:host-gateway \
  -e ROOFTOP_OFFLINE=1 \
  -e OPENAI_BASE_URL=http://host.docker.internal:11434/v1 -e OPENAI_MODEL=llama3.1 \
  ghcr.io/irooftop/rooftop
```

:::

Di Docker, `localhost` adalah kontainernya sendiri, jadi gunakan `host.docker.internal` (opsi `--add-host` hanya diperlukan di Linux).
Jika Ollama menolak koneksi, buat ia mendengarkan di semua antarmuka (`OLLAMA_HOST=0.0.0.0`).

### Yang ditegakkan Mode offline

| | Mode offline |
|---|---|
| Chat, ringkasan riwayat, deskripsi media, transkripsi suara | ditolak kecuali endpoint [lokal](#local-means) |
| Server MCP lewat HTTP | ditolak kecuali lokal; ditampilkan sebagai galat di Pengaturan |
| Berbagi lewat internet (`<nama>.iroof.top`) | mati: klien relai tidak berjalan dan sakelarnya terkunci |
| Bot Telegram, milik sendiri atau bersama | tidak berjalan |
| GIF lewat URL | AI tidak dapat mengirim GIF dari URL yang tidak lokal |
| Tautan Wi‑Fi | berfungsi |

Permintaan yang ditolak gagal sebelum koneksi apa pun dibuat, dan pesannya menjelaskan alasannya: `Mode offline: https://openrouter.ai
bukan endpoint lokal`. Pengalihan dari endpoint lokal ke host lain juga ditolak. Lencana **Offline** kecil
muncul di header bilah sisi selama mode aktif. Pengaturan disimpan. `--offline` / `ROOFTOP_OFFLINE=1` menyalakannya terlepas dari Pengaturan, dan Pengaturan tidak dapat mematikannya.

#### Arti "lokal" {#local-means}

`localhost`, loopback (`127.0.0.0/8`, `::1`), alamat jaringan privat (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
alamat link-local, dan nama `*.local` serta `*.internal` (seperti `host.docker.internal`). Model di komputer lain
di jaringan rumah Anda dihitung sebagai lokal, karena tidak pernah meninggalkan jaringan Anda. Nama dinilai dari cara penulisannya, tidak diselesaikan melalui pencarian.

### Yang tidak dapat diperiksa Mode offline

* **Server MCP stdio** adalah program di komputer Anda. iRoof.top menjalankannya tetapi tidak dapat melihat apa yang mereka hubungi,
  jadi tambahkan hanya yang Anda percaya akan tetap lokal.
* **Transkripsi suara** memakai API chat (bagian `input_audio`), bukan API Whisper `/audio/transcriptions`.
  Itu memerlukan server dan model lokal yang menerima audio di sana. Jika milik Anda tidak menerima, pesan suara tetap disimpan dan dikirim;
  hanya teksnya yang tidak ada.
* **Pembuatan gambar dan suara** hanya ada sebagai [alat MCP](../features/mcp). Saat offline, gunakan server MCP lokal untuk itu.
* Orang yang Anda bagi membuka tautan Wi‑Fi Anda di peramban mereka sendiri. Mode offline mengatur aplikasi ini, bukan perangkat mereka.

## Berbagi dengan teman dengan aman {#share-with-friends-safely}

| Tautan | Yang terjadi |
|---|---|
| **Wi‑Fi** `http://<IP Anda>:8737/s/<nama>` | tidak pernah meninggalkan jaringan lokal Anda |
| **Internet** `https://<nama>.iroof.top/s/<nama>` | aplikasi membuka satu koneksi WebSocket keluar ke hub, yang meneruskan lewat koneksi itu permintaan HTTP pengunjung dan balasan aplikasi Anda |

Dengan tautan internet, ekspor, chat, dan model Anda tetap di komputer Anda, dan hub tidak menyimpan satu pun darinya.
Hub hanya menyimpan catatan akun: nama Anda, hash rahasia Anda, dan kapan terakhir melihat Anda.

Jujurlah tentang apa yang *tidak* ini berikan. Hub mengakhiri TLS, jadi seperti reverse proxy mana pun, secara teknis ia melihat lalu lintas yang melewatinya:
apa yang diketik pengunjung, balasan persona, dan riwayat yang diizinkan tautan untuk dibaca pengunjung
(**Pengunjung dapat membaca ekspor**, bawaan **tidak ada**). Ia hanya meneruskan halaman pengunjung (`/s/…`,
`/api/s/…`, aset halaman) dan membuang cookie di kedua arah; antarmuka pemilik dan pengaturan Anda tidak pernah dapat diakses melaluinya. Jika itu terlalu banyak kepercayaan, gunakan tautan Wi‑Fi, atau [jalankan hub relai Anda sendiri](../reference/relay-hub).
[Selengkapnya tentang tautan berbagi](../features/share-links).

Dengan **Mode offline**, relai iroof.top dimatikan. Tautan Wi‑Fi tetap berfungsi.

## Bot Telegram {#the-telegram-bot}

[Menjawab dari Telegram](../features/telegram) memposting ke grup Anda:

* **pesan pengunjung** baru (nama, nama tautan, teks, atau label media dengan deskripsi atau transkripsinya, dan pratinjau singkat
  pesan yang mereka balas), dan **balasan** AI;
* tidak pernah riwayat yang diekspor. Pesan lama tidak dikirim.

Bot tidak memiliki enkripsi ujung-ke-ujung: teks melewati Telegram dalam bentuk polos. Dengan **bot bersama**, ia juga melewati
hub, yang hanya menyimpan grup mana milik akun mana. **Bot milik sendiri** berbicara langsung dengan
Telegram, tanpa hub. Mode offline mematikan keduanya.

## Ke mana data Anda pergi

| Data | Ke mana |
|---|---|
| Ekspor, chat, pengaturan, kunci API | folder data di komputer Anda |
| Impor dan profil gaya | tidak ke mana pun |
| Riwayat, profil gaya, pesan Anda | endpoint model yang Anda pilih, pada setiap balasan |
| Foto dan suara | endpoint model media, saat **Deskripsikan** atau saat Anda merekam pesan suara |
| Pesan pengunjung lewat tautan Wi‑Fi | komputer Anda dan endpoint model Anda |
| Pesan pengunjung lewat tautan internet | hub (dalam perjalanan), komputer Anda, endpoint model Anda |
| Pesan pengunjung dengan Telegram | tambahan Telegram, dan hub untuk bot bersama |
| Mode offline | hanya endpoint model lokal, hanya tautan Wi‑Fi, tanpa Telegram |
