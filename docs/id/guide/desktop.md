# Aplikasi desktop

Aplikasi desktop ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) menjalankan server yang sama dengan `rooftop serve` pada port
`127.0.0.1` acak, dan menampilkannya di jendela native.

| Platform | Instalasi |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, atau `.dmg` untuk [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) atau [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 dan 11 | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) atau [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (distribusi apa pun), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu), atau [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Tautan unduhan selalu mengarah ke rilis terbaru.

::: warning Paket belum ditandatangani
Di macOS, buka aplikasi sekali, lalu **Pengaturan Sistem → Privasi & Keamanan → Tetap Buka**. Di Windows, pilih
**Info lebih lanjut → Jalankan juga** di SmartScreen. Langkah demi langkah, dengan animasi: [Membuka aplikasi yang belum ditandatangani](./unsigned-apps).
:::

## Peluncuran pertama

Aplikasi tidak membaca shell atau `.env` Anda, jadi ia menyambut Anda dengan **Hubungkan model**: buka **Pengaturan**, masukkan
endpoint, kunci, dan model, lalu tekan **Uji**. Jika `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`, atau
`OPENAI_TEMPERATURE` diatur, nilai tersebut menjadi nilai awal.

| | |
|---|---|
| Data | folder data aplikasi sistem, misalnya `~/Library/Application Support/top.iroof.desktop` di macOS |
| Tautan berbagi | di Wi‑Fi yang sama atau lewat internet: [Membuka tautan di perangkat lain](../features/share-links#open-links-on-other-devices) |
| Situs lain | tautan seperti `t.me` terbuka di peramban Anda |
| Jendela macOS | tanpa bilah judul sistem: header aplikasi berlanjut di bawah tombol lampu lalu lintas dan menyeret jendela |
| Impor | aplikasi membaca ekspor sendiri: **Pilih folder…** membuka pemilih sistem, dan folder, `.zip`, atau `.txt` yang diseret diimpor dari tempatnya berada. Tidak ada yang diunggah, aslinya tetap utuh, dan di APFS media diklon alih-alih disalin, sehingga bahkan ekspor 13 GB hampir tidak memakan ruang tambahan |

## Bangun sendiri {#build-it-yourself}

Anda memerlukan Rust ≥ 1.95 dan Node.js, dan di Linux [prasyarat Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # installer di desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # hanya binary
```

Di macOS, `npm run build` juga membuat `.dmg`, dan melewati AppleScript Finder yang hanya mengatur jendela DMG
(ia gagal tanpa izin *Otomasi*). Atur `ROOFTOP_DMG_FINDER=1` untuk mempertahankan tata letak Finder, seperti
DMG yang dirilis: latar dari `desktop/dmg/` dengan panah dari aplikasi ke *Applications*, dan berkas tersembunyi volume
disembunyikan dari pandangan. Setelah mengedit `desktop/dmg/background.svg`, jalankan `desktop/dmg/make-background.sh`.
