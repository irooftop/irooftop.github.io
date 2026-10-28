# Membuka aplikasi yang belum ditandatangani

Installer desktop belum ditandatangani atau dinotarisasi, jadi peluncuran pertama menampilkan peringatan di macOS dan Windows.
Ini adalah langkah satu kali: setelah Anda mengizinkan aplikasi sekali, ia terbuka secara normal, termasuk setelah pembaruan yang dipasang dengan cara yang sama.

::: tip Lebih suka menghindarinya?
[Bangun aplikasinya sendiri](./desktop#build-it-yourself), atau jalankan [server](./getting-started#install) dan gunakan di
peramban Anda: `brew install irooftop/tap/rooftop`, `cargo install rooftop`, atau [Docker](./docker).
:::

## macOS

![Membuka aplikasi yang tidak terverifikasi di macOS: peringatan "Tidak Dapat Dibuka", Selesai, Pengaturan Sistem, Privasi & Keamanan, Tetap Buka, kata sandi, dan aplikasi terbuka](/how-to-open-an-unsigned-app-on-macos.svg)

Di macOS 15 Sequoia dan yang lebih baru:

1. Buka **iRoof.top**. macOS mengatakan *"iRoof.top" tidak dapat dibuka: Apple tidak dapat memverifikasi…*. Klik **Selesai**.
2. Buka **menu Apple → Pengaturan Sistem… → Privasi & Keamanan**.
3. Gulir ke **Keamanan**: *"iRoof.top" diblokir untuk melindungi Mac Anda*. Klik **Tetap Buka**.
4. Konfirmasi dengan **Tetap Buka**, dan masukkan kata sandi Anda atau gunakan Touch ID.

Tombol **Tetap Buka** muncul hanya setelah Anda mencoba membuka aplikasi, selama sekitar satu jam. Jika tidak ada,
buka aplikasi lagi dan kembali ke Privasi & Keamanan.

Di macOS 14 Sonoma dan sebelumnya, klik kanan (atau Control-klik) aplikasi di Finder, pilih **Buka**, lalu **Buka** lagi.

### Dari Terminal

Menghapus penanda karantina yang diberikan peramban pada unduhan juga berfungsi:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Tidak selalu berhasil: di macOS terbaru, Terminal mungkin memerlukan **Manajemen Aplikasi** (atau **Akses Penuh ke Disk**) di
Privasi & Keamanan untuk mengubah aplikasi di `/Applications`, dan gagal dengan `Operation not permitted` tanpanya. Langkah-langkah di atas selalu berhasil.

::: details "iRoof.top rusak dan tidak dapat dibuka"
Pesan ini juga berarti penanda karantina, bukan unduhan yang rusak. Klik **Batal** (bukan **Pindahkan ke Sampah**) dan jalankan
perintah `xattr` di atas, atau ikuti langkah di Pengaturan Sistem.
:::

## Windows

SmartScreen menampilkan **Windows melindungi PC Anda** untuk installer:

1. Klik **Info lebih lanjut**.
2. Klik **Jalankan juga**.

Jika peramban menahan unduhan (*tidak umum diunduh*), buka daftar unduhan, pilih **⋯ → Simpan**,
lalu **Tampilkan lainnya → Tetap simpan**. Untuk `.msi`, Anda juga dapat klik kanan → **Properties** → centang **Unblock** →
**OK** sebelum menjalankannya.

Di Windows 11 dengan **Smart App Control** aktif, aplikasi yang tidak ditandatangani diblokir tanpa tombol **Jalankan juga**. Gunakan
[server](./getting-started#install) sebagai gantinya, atau matikan Smart App Control di **Windows Security → App & browser control → Smart App Control settings**.

## Linux

Linux tidak memblokir aplikasi yang tidak ditandatangani, tetapi AppImage memerlukan izin untuk berjalan:

```sh
chmod +x iRoof.top_amd64.AppImage    # atau: Properties → Permissions → Allow executing file as program
./iRoof.top_amd64.AppImage
```

Jika mengeluh tentang FUSE (`dlopen(): error loading libfuse.so.2`), pasang `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) atau jalankan dengan `--appimage-extract-and-run`.

Paket dipasang dengan manajer paket, yang menerima paket lokal yang tidak ditandatangani:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
