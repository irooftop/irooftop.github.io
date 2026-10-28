---
layout: home

hero:
  name: iRoof.top
  text: Bicaralah dengan orang yang kamu rindukan
  tagline: Ekspor chat Telegram atau WhatsApp, dan LLM akan melanjutkannya dengan gaya seseorang, lengkap dengan balon chat, stiker, GIF, reaksi, dan suaranya. Di komputermu, dengan model pilihanmu, dan bisa offline jika kamu mau.
  actions:
    - theme: brand
      text: Mulai
      link: /guide/getting-started
    - theme: alt
      text: Unduh aplikasi
      link: /guide/desktop
    - theme: alt
      text: Cara kerjanya
      link: /features/how-it-works

features:
  - title: Gayanya, bukan hanya kata-katanya
    details: Profil gaya dari seluruh ekspor, dan setiap balon, stiker, GIF, balasan, dan reaksi diputar ulang ke model sebagai pemanggilan alat.
    link: /features/how-it-works
    linkText: Cara kerjanya
  - title: Pribadi, dan offline jika mau
    details: Chat tetap berada di folder datamu. Dengan model lokal dan mode offline aktif, aplikasi menolak setiap permintaan yang akan keluar dari komputermu.
    link: /guide/offline
    linkText: Offline & privasi
  - title: Bertahun-tahun chat, gigabyte media
    details: Lebih dari 120.000 pesan dan 30.000 file diimpor dengan progres langsung. Impor ulang dikenali dari pesannya, sebelum media apa pun diunggah.
    link: /guide/export#large-exports
    linkText: Ekspor besar
  - title: Foto, stiker, dan suara
    details: Pustaka media yang mendeskripsikan apa yang dikirim dan mentranskripsikan suara, sesuai urutan yang kamu pilih, dan bisa dihentikan kapan saja.
    link: /features/media
    linkText: Foto & suara
  - title: Tautan berbagi
    details: Biarkan teman berbicara dengan persona di /s/nama, dengan PIN dan batasan, di Wi‑Fi-mu atau di nama.iroof.top.
    link: /features/share-links
    linkText: Tautan berbagi
  - title: Balas dari Telegram
    details: Pesan pengunjung masuk ke grup Telegram-mu. Balas sendiri, atau biarkan AI menjawab setelah hitung mundur.
    link: /features/telegram
    linkText: Telegram
  - title: Model apa pun, server MCP apa pun
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… plus alat MCP lewat Streamable HTTP atau stdio.
    link: /features/mcp
    linkText: Alat MCP
  - title: Tidak ada yang disembunyikan
    details: JSON persis yang dikirim ke model tersedia dengan satu klik, lengkap dengan ukurannya, anggaran riwayat, dan token yang dipakai.
    link: /guide/getting-started#what-s-in-the-window
    linkText: Isi jendela konteks
  - title: Satu biner kecil
    details: Server Rust dengan antarmuka web di dalamnya, aplikasi desktop untuk macOS, Windows, dan Linux, Homebrew, dan image Docker.
    link: /guide/getting-started
    linkText: Pasang
---

<div class="home-demo">

![Sebuah chat berlanjut dengan gaya orang sungguhan, lalu seorang teman membuka tautan yang dibagikan di ponselnya](/img/demo.svg)

</div>

## Mulai dalam semenit

::: code-group

```sh [Aplikasi desktop]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [Sepenuhnya offline]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Lalu tiga langkah: **[ekspor chat](/guide/export)** dari Telegram Desktop atau WhatsApp, **seret** folder, `.zip`, atau `.txt` ke halaman, lalu tekan **New chat** untuk memilih siapa yang memerankan AI: orang lain, atau dirimu sendiri.
Tidak punya chat sendiri? Coba yang fiktif: `rooftop --import ./examples/telegram`.
(Label tombol di aplikasi berbahasa Inggris, seperti aplikasinya.)

## Cara kerjanya

<div class="wide">

![Ekspor dari Telegram atau WhatsApp masuk ke iRoof.top, LLM menulis balasan, dan chat terus berjalan](/how-it-works.svg)

</div>

Ekspor dibaca sekali, di komputermu. Setiap balasan, model menerima prompt sistem berisi profil gaya, catatanmu, dan deskripsi media, lalu bagian chat terbaru yang muat dalam [anggaran riwayat](/reference/configuration#settings-only). Bagian yang lebih lama dilipat menjadi ingatan singkat, dan persona tetap bisa mencarinya. Model menjawab dengan pemanggilan alat (`send_message`, `send_sticker`, `react`…), yang menjadi balon, stiker, dan reaksi. [Selengkapnya →](/features/how-it-works)

## Ke mana chatmu pergi

| | Jaringan |
|---|---|
| Impor, profil gaya, pencarian, penyimpanan | tidak ada: semuanya terjadi di komputermu |
| Satu balasan, ringkasan memori | endpoint model yang kamu pilih, dan tidak ada yang lain |
| Mendeskripsikan media, mentranskripsikan suara | model media, hanya saat kamu menekan **Describe** |
| Tautan berbagi lewat internet, Telegram | hanya jika kamu mengaktifkannya; [mode offline](/guide/offline) mematikannya |

## Pertanyaan

::: details Model apa yang sebaiknya saya pakai?
Model chat apa pun dengan **pemanggilan alat** di balik endpoint `/chat/completions` yang kompatibel dengan OpenAI. Model yang lebih besar lebih baik meniru gaya. Untuk **Describe** di pustaka media, model media juga harus menerima gambar (dan audio untuk pesan suara). **Test** di Settings memberi tahu dengan bahasa sederhana apa yang salah, misalnya kunci yang ditolak atau model yang tidak dikenal.
:::

::: details Berapa biayanya?
Tidak ada dengan model lokal. Dengan model cloud, kamu membayar penyedia per token: satu balasan kira-kira sebesar satu anggaran riwayat sebagai input (120.000 karakter ≈ 34 ribu token secara default; prompt dibuat agar bisa di-cache, jadi penyedia yang mendukung prompt caching menagih sebagian besar dengan tarif cache), ditambah beberapa pemanggilan alat yang singkat. Kurangi anggaran di Settings untuk membayar lebih sedikit per balasan.
:::

::: details Apakah ekspor saya harus kecil?
Tidak. Ekspor dengan lebih dari 120.000 pesan dan 13 GB media bisa diimpor dengan baik, dari browser atau dengan `rooftop --import <folder>`. Pencarian dan anggaran riwayat menjaga ukuran prompt setiap balasan tetap sama, berapa pun panjang chatnya.
:::

::: details Bisakah teman berbicara dengan persona?
Bisa, dengan [tautan berbagi](/features/share-links): di Wi‑Fi-mu, atau lewat internet di `nama.iroof.top`, dengan PIN dan batas pesan. Pengunjung hanya melihat chat: tidak ada pengaturan, catatan, prompt, atau chat lain.
:::

::: tip Catatan tentang kepedulian
Ini untuk tetap dekat dengan orang-orang yang jauh. Persona tetap dalam perannya, tetapi ia menjawab dengan jujur jika kamu sungguh-sungguh bertanya apakah kamu sedang berbicara dengan AI, dan merespons dengan peduli jika kamu tampak sedang kesulitan.
:::
