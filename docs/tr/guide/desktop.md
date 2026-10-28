# Masaüstü uygulaması

Masaüstü uygulaması ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`), `rooftop serve` ile aynı sunucuyu rastgele bir
`127.0.0.1` bağlantı noktasında çalıştırır ve yerel bir pencerede gösterir.

| Platform | Kurulum |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, ya da [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) veya [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) için `.dmg` |
| Windows 10 ve 11 | [Yükleyici (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) veya [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (her dağıtım), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) veya [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

İndirme bağlantıları her zaman en yeni sürüme işaret eder.

::: warning Derlemeler henüz imzalanmadı
macOS'ta uygulamayı bir kez açın, ardından **Sistem Ayarları → Gizlilik ve Güvenlik → Yine de Aç**. Windows'ta SmartScreen'de
**Diğer bilgiler → Yine de çalıştır** seçin. Animasyonlu adım adım anlatım: [İmzasız bir uygulamayı açma](./unsigned-apps).
:::

## İlk açılış

Uygulama kabuğunuzu ya da `.env` dosyanızı okumaz, bu yüzden size **Bir model bağla** ekranıyla karşılar: **Ayarlar**'ı açın, uç noktayı,
anahtarı ve modeli girin ve **Test**'e basın. `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` veya
`OPENAI_TEMPERATURE` ayarlıysa, bunlar başlangıç varsayılanları olur.

| | |
|---|---|
| Veri | işletim sisteminin uygulama veri klasörü, ör. macOS'ta `~/Library/Application Support/top.iroof.desktop` |
| Paylaşım bağlantıları | aynı Wi‑Fi'de ya da internet üzerinden: [Bağlantıları diğer cihazlarda açma](../features/share-links#open-links-on-other-devices) |
| Diğer siteler | `t.me` gibi bağlantılar tarayıcınızda açılır |
| macOS penceresi | sistem başlık çubuğu yok: uygulamanın üstbilgileri trafik ışıklarının altından devam eder ve pencereyi sürükler |
| İçe aktarma | uygulama dışa aktarımı kendisi okur: **Klasör seç…** sistem seçicisini açar ve bırakılan bir klasör, `.zip` ya da `.txt` olduğu yerden içe aktarılır. Hiçbir şey yüklenmez, orijinal olduğu gibi kalır ve APFS'te medya kopyalanmak yerine klonlanır; bu yüzden 13 GB'lık bir dışa aktarım bile neredeyse ek yer kaplamaz |

## Kendiniz derleyin {#build-it-yourself}

Rust ≥ 1.95 ve Node.js gerekir; Linux'ta ayrıca [Tauri ön koşulları](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # yükleyiciler desktop/target/release/bundle/ içinde
npm run build -- --debug --no-bundle   # yalnızca ikili dosya
```

macOS'ta `npm run build` ayrıca `.dmg` dosyasını oluşturur ve yalnızca DMG penceresini düzenleyen Finder AppleScript'ini atlar
(*Otomasyon* izni olmadan başarısız olur). Yayımlanan DMG'lerdeki gibi Finder düzenini korumak için `ROOFTOP_DMG_FINDER=1` ayarlayın:
uygulamadan *Uygulamalar*'a bir ok içeren `desktop/dmg/` arka planı ve birimin gizli dosyaları görünmez yerde. `desktop/dmg/background.svg` dosyasını düzenledikten sonra `desktop/dmg/make-background.sh` çalıştırın.
