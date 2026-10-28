# Hub relai

Sebuah server dapat menjadi relai yang digunakan aplikasi untuk berbagi **Internet**, seperti iroof.top.

```
 pengunjung ──▶ https://alex.domain.anda/s/… ──▶ hub ══ WebSocket ══▶ aplikasi Alex
                                                │
 aplikasi ── POST /relay/v1/register {name} ───▶│  nama: siapa cepat, dia dapat
 aplikasi ── GET  /relay/v1/connect ═══════════▶│  satu koneksi keluar per aplikasi
```

| Sisi | Pengaturan |
|---|---|
| Hub | `ROOFTOP_RELAY_DOMAIN=domain.anda` (bot bersama opsional: `ROOFTOP_RELAY_BOT_TOKEN`) |
| Aplikasi | `ROOFTOP_RELAY_URL=https://domain.anda`: tautan di `https://<nama>.domain.anda` |

## Persyaratan

* Rekaman DNS wildcard `*.domain.anda` yang mengarah ke server.
* Sertifikat wildcard. Dengan Caddy, ini memerlukan tantangan DNS-01 dan
  [modul penyedia DNS](https://caddyserver.com/docs/modules/) (`xcaddy build --with github.com/caddy-dns/<penyedia>`).
* Reverse proxy yang meneruskan `Host` (Caddy melakukannya secara bawaan):

```nginx
*.domain.anda {
	tls {
		dns <penyedia> …
	}
	reverse_proxy iroof:8080
}
```

## Halaman awal di domain utama {#a-splash-page-on-the-main-domain}

Di domain utama, hub melayani API relai, tautan berbagi miliknya sendiri, dan aplikasi pemilik (di belakang `ROOFTOP_PASSWORD`).
iroof.top menampilkan halaman awal kecil di `/`, dengan tautan ke dokumentasi dan GitHub, dalam bahasa Inggris dan 20 bahasa lainnya
(`/es/`, `/zh-hans/`, `/ja/`, …; daftarnya ada di setiap halaman, dan `sitemap.xml` mencantumkannya dengan alternatif hreflang).
[`landing/index.html`](https://github.com/irooftop/irooftop.github.io/blob/main/landing/index.html) adalah halaman bahasa Inggris;
`python3 scripts/landing-i18n.py` membuat yang lain darinya, dengan terjemahan dari `scripts/landing-i18n/`. Setiap halaman adalah
satu berkas mandiri (tanpa skrip, font, atau permintaan pihak ketiga); pertanyaannya adalah elemen `<details>` native.
Tautan `<nama>.domain.anda` yang tidak dikenal juga mendarat di sana. Demo aplikasi di dalamnya adalah [`demo.svg`](https://github.com/irooftop/rooftop/blob/main/demo.svg),
disisipkan sebagai gambar `data:` oleh `python3 scripts/landing-demo.py` (jalankan setelah mengubah `demo.svg`, lalu `scripts/landing-i18n.py`).
Pasang folder ke Caddy (`./landing:/srv/landing:ro`) dan arahkan `/`, folder bahasa, dan `sitemap.xml`:

```nginx
domain.anda {
	# Pengunjung: halaman awal. Peramban yang sudah mengirim kata sandi pemilik mendapatkan aplikasi.
	@landing {
		method GET HEAD
		path / /index.html
		not header Authorization *
	}
	handle @landing {
		root * /srv/landing
		rewrite * /index.html
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	# Bahasa lainnya: /es/, /zh-hans/, … (folder yang ditulis oleh scripts/landing-i18n.py).
	@languages {
		method GET HEAD
		path_regexp lang ^/(es|zh-hans|hi|ar|fr|bn|pt-br|ru|ur|id|de|ja|tr|ko|vi|it|pl|uk|nl|fa)(/|/index\.html)?$
		not header Authorization *
	}
	handle @languages {
		root * /srv/landing
		header Content-Security-Policy "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
		file_server
	}
	handle /sitemap.xml {
		root * /srv/landing
		file_server
	}
	# Pemilik masuk di /owner: peramban meminta kata sandi, terus mengirimnya, dan / membuka aplikasi.
	handle /owner {
		@anon not header Authorization *
		handle @anon {
			header WWW-Authenticate "Basic realm=\"iRoof.top\""
			respond "Sign in to open the app" 401
		}
		handle {
			redir * / 302
		}
	}
	handle {
		reverse_proxy iroof:8080
	}
}
```

Aplikasi tetap memeriksa kata sandi di setiap permintaan pemilik; pencocokan hanya menentukan siapa yang melihat halaman awal.

## Aturan

| | |
|---|---|
| API hub | `/relay/v1/…` di domain utama |
| `<nama>.domain.anda` | selalu menuju aplikasi yang memiliki nama itu, tidak pernah ke antarmuka pemilik hub |
| Nama | 3–32 huruf kecil, angka, dan tanda hubung; beberapa (`www`, `api`, `admin`…) dicadangkan |
| Pelepasan | setelah 180 hari tanpa koneksi |
| Nama baru | dibatasi laju per IP |
| Kepemilikan | rahasia acak di `settings.json` aplikasi; hub hanya menyimpan SHA-256-nya |
| Status | `relay.json` dan `relay-telegram.json` di direktori data |
