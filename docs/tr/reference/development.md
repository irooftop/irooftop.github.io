# Geliştirme

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Testlerin kapsadığı | |
|---|---|
| Ayrıştırıcı ve dönüşüm | `examples/telegram` ve `examples/whatsapp` üzerinde |
| Paylaşım bağlantıları | ziyaretçi yalıtımı, PIN kilidi, medya izin listesi, odalar, adlar, engelleme, kimlik doğrulama atlatma |
| MCP istemcisi | her protokol döneminin sahte sunucuları (HTTP, eski SSE, stdio) |
| Aktarıcı | merkez, adlar, iletme |

Masaüstü crate'i ayrıdır: `cd desktop && cargo check`.

## Düzen

```
src/        sunucu (axum), ayrıştırıcılar, LLM ajanı, MCP istemcisi, paylaşım bağlantıları, aktarıcı, Telegram
  server/     sahibin HTTP API'si, alan başına bir dosya: varlıklar, yüklemeler, dışa aktarımlar, sohbetler,
              mesajlar, ayarlar, medya; mod.rs yönlendiricileri oluşturur
  share_api/  paylaşım bağlantıları: owner.rs (bağlantıları ve ziyaretçileri yönetme), visitor.rs (/s/…)
web/        arayüz: index.html, app.css ve js/ (tek bir app.js olarak sunulur), ikiliye gömülü
  js/         arayüzün her alanı için bir dosya, yükleme sırasına göre numaralı (tek betik, tek kapsam)
desktop/    aynı sunucunun etrafındaki Tauri uygulaması
deploy/     Caddy + Docker Compose
examples/   iki kurgusal dışa aktarım
```

Belgeler ve iroof.top'ın karşılama sayfası bu depoda değildir. Şurada bulunurlar:
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (bu site) ve `landing/`.

## Belgeler

Belgeler [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) içindedir. Görselleri ve uygulama sürümünü bu depodan alır:
ikisini yan yana klonlayın ve oradan derleyin.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Site, `docs/` dizinini değiştiren bu deponun `main` dalına her push'ta [irooftop.github.io](https://irooftop.github.io) adresinde yayımlanır. `demo.svg` uygulama deposunda `python3 scripts/demo-svg.py` ile üretilir (GitHub'ın gösterebilmesi için saf SVG ve CSS).

## Sürüm yayımlama

```
 Cargo.toml'u artır ─▶ vX.Y.Z etiketi ─┬─▶ Release: crates.io + ghcr.io imajı (amd64 + arm64, yerel çalıştırıcılar)
                                       └─▶ desktop: yükleyiciler ─▶ sürümü yayımla (en yeni) ─▶ Homebrew: formül + cask
```

1. `Cargo.toml` (ve `desktop/`) içindeki `version` değerini artırın, commit yapın ve `vX.Y.Z` etiketini gönderin. Etiket Windows MSI için sayısal olmalıdır.
   Aşağıdakilerin tamamı ek tıklama gerektirmeden çalışır.
2. *Release*, crate'i (`CARGO_REGISTRY_TOKEN` sırrı, `crates-io` ortamı) ve Docker imajını yayımlar:
   her mimari için yerel bir çalıştırıcıda (`ubuntu-latest`, `ubuntu-24.04-arm`) bir iş özetle gönderir ve bir
   `merge` işi çok mimarili etiketleri oluşturur. Crate yayımını denetlemek için `dry_run` ile elle çalıştırın.
3. *desktop*, macOS (arm64, x64), Windows ve Linux için yükleyicileri bir taslak sürüme derler. Hepsi eklendiğinde,
   `publish` işi oluşturulmuş sürüm notlarını ekler, sürümü yayımlar ve en yeni olarak işaretler.
4. Ardından `homebrew` işi *Homebrew*'u çağırır; bu da `Formula/rooftop.rb` ve `Casks/irooftop.rb` dosyalarını
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap) deposuna gönderir. `HOMEBREW_TAP_TOKEN` sırrı
   (ince taneli belirteç, `irooftop/homebrew-tap`, Contents: okuma ve yazma) ya da `HOMEBREW_TAP_DEPLOY_KEY` gerekir; ikisi de yoksa
   bir bildirimle atlanır. (`GITHUB_TOKEN` ile yayımlanan bir sürüm `release: published` olayını tetiklemez; bu yüzden çağrı açıkça yapılır.
   Bir sürümü elle yayımlamak yine de bu olay üzerinden Homebrew'u tetikler.)

Örneğin sırrı ekledikten sonra, mevcut bir etiket için tap güncellemesini yeniden çalıştırmak için:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap kopyası>` aynı dosyaları yerelde üretir. Bir etiketin yükleyicileri başarısız olduysa,
başarısız *desktop* işlerini yeniden çalıştırın: `publish` ve `homebrew` geçtiklerinde devam eder.
