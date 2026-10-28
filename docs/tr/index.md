---
layout: home

hero:
  name: iRoof.top
  text: Özlediğin insanlarla konuş
  tagline: Bir Telegram ya da WhatsApp sohbetini dışa aktar; bir LLM onu bir insanın tarzında sürdürsün, balonları, çıkartmaları, GIF'leri, tepkileri ve sesiyle birlikte. Bilgisayarında, istediğin modelle, istersen çevrimdışı.
  actions:
    - theme: brand
      text: Başla
      link: /guide/getting-started
    - theme: alt
      text: Uygulamayı indir
      link: /guide/desktop
    - theme: alt
      text: Nasıl çalışır
      link: /features/how-it-works

features:
  - title: Sadece sözleri değil, tarzı
    details: Tüm dışa aktarımdan çıkarılan bir stil profili; her balon, çıkartma, GIF, yanıt ve tepki modele bir araç çağrısı olarak yeniden oynatılır.
    link: /features/how-it-works
    linkText: Nasıl çalışır
  - title: Özel, istersen çevrimdışı
    details: Sohbetler veri klasöründe kalır. Yerel bir model ve çevrimdışı mod açıkken uygulama bilgisayarından çıkacak her isteği reddeder.
    link: /guide/offline
    linkText: Çevrimdışı ve gizlilik
  - title: Yıllarca sohbet, gigabaytlarca medya
    details: 120.000'den fazla mesaj ve 30.000 dosya, canlı ilerleme göstererek içe aktarılır. Yinelenen bir içe aktarma, medya yüklenmeden önce mesajlardan anlaşılır.
    link: /guide/export#large-exports
    linkText: Büyük dışa aktarımlar
  - title: Fotoğraf, çıkartma ve ses
    details: Gönderilenleri tanımlayan ve sesi yazıya döken bir medya kütüphanesi; sırayı sen seçersin ve istediğin an durdurabilirsin.
    link: /features/media
    linkText: Fotoğraf ve ses
  - title: Paylaşım bağlantıları
    details: Bir arkadaşın /s/ad adresinde karakterle konuşmasına izin ver; PIN ve sınırlarla, Wi‑Fi'nda ya da ad.iroof.top üzerinden.
    link: /features/share-links
    linkText: Paylaşım bağlantıları
  - title: Telegram'dan yanıtla
    details: Ziyaretçilerin mesajları Telegram grubuna düşer. Kendin yanıtla ya da yapay zekânın geri sayımdan sonra cevap vermesine izin ver.
    link: /features/telegram
    linkText: Telegram
  - title: Her model, her MCP sunucusu
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… ve Streamable HTTP ya da stdio üzerinden MCP araçları.
    link: /features/mcp
    linkText: MCP araçları
  - title: Gizli hiçbir şey yok
    details: Modele giden tam JSON bir tık uzakta; boyutu, geçmiş bütçesi ve harcanan token sayısıyla birlikte.
    link: /guide/getting-started#what-s-in-the-window
    linkText: Pencerede ne var
  - title: Küçük tek bir ikili dosya
    details: İçinde web arayüzü olan bir Rust sunucusu; macOS, Windows ve Linux için masaüstü uygulamaları, Homebrew ve bir Docker imajı.
    link: /guide/getting-started
    linkText: Kur
---

<div class="home-demo">

![Bir sohbet gerçek bir insanın tarzında sürer, sonra bir arkadaş paylaşılan bağlantıyı telefonunda açar](/img/demo.svg)

</div>

## Bir dakikada başla

::: code-group

```sh [Masaüstü uygulaması]
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

```sh [Tamamen çevrimdışı]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Sonra üç adım: Telegram Desktop ya da WhatsApp'tan **[sohbeti dışa aktar](/tr/guide/export)**, klasörü, `.zip`'i ya da `.txt`'yi sayfaya **sürükle** ve yapay zekâyı kimin oynayacağını seçmek için **New chat**'e bas: diğer kişi mi, yoksa sen mi.
Elinde sohbet yok mu? Kurgusal olanları dene: `rooftop --import ./examples/telegram`.
(Uygulamanın düğme adları, uygulamanın kendisi gibi İngilizce.)

## Nasıl çalışır

<div class="wide">

![Telegram ya da WhatsApp dışa aktarımı iRoof.top'a girer, bir LLM yanıtları yazar ve sohbet devam eder](/how-it-works.svg)

</div>

Dışa aktarım bilgisayarında bir kez okunur. Her yanıtta model; stil profilini, notlarını ve medya açıklamalarını içeren bir sistem istemi alır, ardından [geçmiş bütçesine](/tr/reference/configuration#settings-only) sığan sohbetin en yeni kısmını alır. Eski kısımlar kısa bir belleğe sıkıştırılır ve karakter bunları yine arayabilir. Model, balonlara, çıkartmalara ve tepkilere dönüşen araç çağrılarıyla (`send_message`, `send_sticker`, `react`…) yanıt verir. [Devamı →](/tr/features/how-it-works)

## Sohbetin nereye gider

| | Ağ |
|---|---|
| İçe aktarma, stil profili, arama, depolama | yok: hepsi bilgisayarında olur |
| Bir yanıt, bellek özeti | seçtiğin model uç noktası, başka hiçbir şey |
| Medyayı açıklama, sesi yazıya dökme | medya modeli, yalnızca **Describe**'a bastığında |
| İnternet üzerinden paylaşım bağlantıları, Telegram | yalnızca açarsan; [çevrimdışı mod](/tr/guide/offline) bunları kapatır |

## Sorular

::: details Hangi modeli kullanmalıyım?
OpenAI uyumlu bir `/chat/completions` uç noktasının arkasında **araç çağırma** destekleyen herhangi bir sohbet modeli. Daha büyük modeller bir tarzı daha iyi taklit eder. Medya kütüphanesindeki **Describe** için medya modelinin resimleri (sesli mesajlar için de sesi) kabul etmesi gerekir. Ayarlardaki **Test**, reddedilen bir anahtar ya da bilinmeyen bir model gibi sorunu sade bir dille söyler.
:::

::: details Ne kadara mal olur?
Yerel bir modelle hiçbir şey. Bulut modeliyle sağlayıcına token başına ödersin: bir yanıt, girdi olarak kabaca bir geçmiş bütçesine denk gelir (varsayılan olarak 120.000 karakter ≈ 34 bin token; istem önbelleğe alınabilecek şekilde kurulduğundan, istem önbelleği destekleyen sağlayıcılar çoğunu önbellek fiyatından alır), üstüne birkaç kısa araç çağrısı gelir. Yanıt başına daha az ödemek için ayarlardan bütçeyi düşür.
:::

::: details Dışa aktarımım küçük olmak zorunda mı?
Hayır. 120.000'den fazla mesaj ve 13 GB medya içeren dışa aktarımlar tarayıcıdan ya da `rooftop --import <klasör>` ile sorunsuz içe aktarılır. Arama ve geçmiş bütçesi, sohbet ne kadar uzun olursa olsun her yanıtın istem boyutunu aynı tutar.
:::

::: details Bir arkadaş karakterle konuşabilir mi?
Evet, bir [paylaşım bağlantısıyla](/tr/features/share-links): Wi‑Fi'nda ya da internet üzerinden `ad.iroof.top` adresinde, PIN ve mesaj sınırlarıyla. Ziyaretçiler yalnızca sohbeti görür: ayar, not, istem ya da diğer sohbetler görünmez.
:::

::: tip Özen hakkında bir not
Bu, uzakta olan insanlara yakın kalmak içindir. Karakter rolünde kalır, ama gerçekten bir yapay zekâyla konuşup konuşmadığını içtenlikle sorarsan dürüstçe yanıtlar; sıkıntıda göründüğün anlarda da özenle karşılık verir.
:::
