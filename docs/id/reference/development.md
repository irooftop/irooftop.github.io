# Pengembangan

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Pengujian mencakup | |
|---|---|
| Parser dan konversi | terhadap `examples/telegram` dan `examples/whatsapp` |
| Tautan berbagi | isolasi pengunjung, penguncian PIN, daftar media yang diizinkan, ruang, nama, pemblokiran, pelewatan autentikasi |
| Klien MCP | server tiruan dari setiap era protokol (HTTP, SSE lama, stdio) |
| Relai | hub, nama, peneruskan |

Crate desktop terpisah: `cd desktop && cargo check`.

## Tata letak

```
src/        server (axum), parser, agen LLM, klien MCP, tautan berbagi, relai, Telegram
  server/     API HTTP pemilik, satu berkas per area: aset, unggahan, ekspor, chat,
              pesan, pengaturan, media; mod.rs membangun router
  share_api/  tautan berbagi: owner.rs (mengelola tautan dan pengunjung), visitor.rs (/s/…)
web/        antarmuka: index.html, app.css, dan js/ (disajikan sebagai satu app.js), ditanamkan ke binary
  js/         satu berkas per area antarmuka, dinomori menurut urutan muat (satu skrip, satu lingkup)
desktop/    aplikasi Tauri di sekitar server yang sama
deploy/     Caddy + Docker Compose
examples/   dua ekspor fiktif
```

Dokumentasi dan halaman depan iroof.top tidak berada di repositori ini. Keduanya ada di
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (situs ini) dan `landing/`.

## Dokumentasi

Dokumentasi berada di [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Dokumentasi mengambil gambar
dan versi aplikasi dari repositori ini: klon keduanya berdampingan, lalu bangun di sana.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Situs diterbitkan di [irooftop.github.io](https://irooftop.github.io) pada setiap push ke `main` repositori itu yang mengubah `docs/`. `demo.svg` dihasilkan dengan `python3 scripts/demo-svg.py` di repositori aplikasi (SVG dan CSS murni, agar GitHub menampilkannya).

## Merilis

```
 naikkan Cargo.toml ─▶ tag vX.Y.Z ─┬─▶ Release: crates.io + image ghcr.io (amd64 + arm64, runner native)
                                   └─▶ desktop: installer ─▶ publikasikan rilis (terbaru) ─▶ Homebrew: formula + cask
```

1. Naikkan `version` di `Cargo.toml` (dan di `desktop/`), commit, dan push tag `vX.Y.Z`. Tag harus numerik untuk
   MSI Windows. Semua yang berikutnya berjalan tanpa klik tambahan.
2. *Release* menerbitkan crate (rahasia `CARGO_REGISTRY_TOKEN`, lingkungan `crates-io`) dan image Docker:
   satu job per arsitektur pada runner native (`ubuntu-latest`, `ubuntu-24.04-arm`) mendorong berdasarkan digest, dan job
   `merge` membuat tag multi-arsitektur. Jalankan secara manual dengan `dry_run` untuk memeriksa penerbitan crate.
3. *desktop* membangun installer untuk macOS (arm64, x64), Windows, dan Linux ke dalam rilis draf. Saat semuanya terlampir,
   job `publish`-nya menambahkan catatan rilis yang dihasilkan, menerbitkan rilis, dan menandainya sebagai terbaru.
4. Job `homebrew`-nya kemudian memanggil *Homebrew*, yang mendorong `Formula/rooftop.rb` dan `Casks/irooftop.rb` ke
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Ia memerlukan rahasia `HOMEBREW_TAP_TOKEN`
   (token berbutir halus, `irooftop/homebrew-tap`, Contents: baca dan tulis) atau `HOMEBREW_TAP_DEPLOY_KEY`; tanpa salah satunya
   ia dilewati dengan pemberitahuan. (Rilis yang diterbitkan dengan `GITHUB_TOKEN` tidak memicu `release: published`, itulah sebabnya pemanggilannya eksplisit;
   menerbitkan rilis secara manual tetap memicu Homebrew melalui peristiwa itu.)

Untuk menjalankan ulang pembaruan tap untuk tag yang ada, misalnya setelah menambahkan rahasia:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <checkout tap>` menghasilkan berkas yang sama secara lokal. Jika installer sebuah tag gagal,
jalankan ulang job *desktop* yang gagal: `publish` dan `homebrew` mengikuti setelah lulus.
