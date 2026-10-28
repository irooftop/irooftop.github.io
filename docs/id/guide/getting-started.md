# Memulai

## Instalasi {#install}

| | Perintah |
|---|---|
| **Aplikasi desktop**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **Aplikasi desktop**, Windows | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) atau [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **Aplikasi desktop**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) atau [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Server**, macOS dan Linux | `brew install irooftop/tap/rooftop` (lalu `brew services start rooftop`) |
| **Server**, di mana saja dengan Rust ≥ 1.88 | `cargo install rooftop` |
| **Server**, kontainer | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

Aplikasi desktop tidak memerlukan terminal: lihat [Aplikasi desktop](./desktop).

## Menjalankan

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # bawaan; API apa pun yang kompatibel dengan OpenAI juga bisa
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # harus mendukung pemanggilan alat (tool calling)
rooftop                                               # http://127.0.0.1:8080
```

Variabel juga bisa berada di berkas `.env` di tempat Anda menjalankan `rooftop`, atau diatur nanti di **Pengaturan**.
**Uji** di Pengaturan mengirim permintaan kecil dan memberi tahu dengan kata-kata sederhana apa yang salah, misalnya
"openrouter.ai menolak kunci API (401)".

Ingin tidak ada yang meninggalkan komputer Anda? Gunakan model lokal dan [Mode offline](./offline).

## Chat pertama Anda

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Ekspor    │ ──▶ │ 2. Seret ke        │ ──▶ │ 3. Chat baru: pilih │
 │ chat         │     │    halaman         │     │ siapa yang diperankan│
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Ekspor sebuah chat](./export) dari Telegram Desktop atau WhatsApp.
2. Seret folder, `.zip`, atau `.txt` WhatsApp ke halaman (atau mulai dengan `rooftop --import <folder>`).
3. Tekan **Chat baru** dan pilih persona: orang lain, atau diri Anda sendiri ("chat dengan diri sendiri dengan gaya Anda").

::: tip Coba tanpa chat Anda sendiri
Repositori ini memiliki dua ekspor fiktif di [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas dan Priya memasak lasagna di Telegram, Sofia dan Daniel menghabiskan akhir pekan di WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Tidak ada ekspor? Mulai dari catatan

**Chat baru → Dari catatan** hanya memerlukan nama mereka (nama Anda opsional) dan beberapa baris tentang mereka: siapa mereka,
apa yang Anda bagi, bagaimana mereka menulis ("memanggil saya sayang, pesan pendek dalam bahasa Italia, banyak ❤️"). AI menulis seperti mereka
hanya dari catatan itu. Tanpa riwayat tidak ada profil gaya atau pustaka media, jadi semakin catatan menjelaskan cara mereka menulis, semakin mirip hasilnya. Anda bisa mengedit catatan di chat kapan saja (✎), dan membagikan chat lewat tautan seperti yang lain. Menghapus chat akan menghapus semua yang ada di dalamnya.

## Isi jendela

| Tombol | Fungsinya |
|---|---|
| **Bagikan** | [Tautan](../features/share-links) agar teman bisa berbicara dengan persona |
| **Pustaka media** | Setiap stiker, GIF, foto, dan pesan suara beserta apa yang AI ketahui tentangnya |
| **Catatan** | Hal-hal tentang orang itu yang tidak ada di ekspor. Persona membacanya, pengunjung tidak pernah |
| **`{ }`** | JSON persis yang dikirim ke model, dan token yang dipakai |
| **Tulis ulang** | Membuang jawaban terakhir persona dan menulisnya kembali |
| **Biarkan mereka menulis dulu** | Persona memulai percakapan |
