# Başlarken

## Kurulum {#install}

| | Komut |
|---|---|
| **Masaüstü uygulaması**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **Masaüstü uygulaması**, Windows | [Yükleyici (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) veya [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **Masaüstü uygulaması**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) veya [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Sunucu**, macOS ve Linux | `brew install irooftop/tap/rooftop` (ardından `brew services start rooftop`) |
| **Sunucu**, Rust ≥ 1.88 olan her yerde | `cargo install rooftop` |
| **Sunucu**, konteyner | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

Masaüstü uygulaması terminal gerektirmez: bkz. [Masaüstü uygulaması](./desktop).

## Çalıştırma

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # varsayılan; OpenAI uyumlu her API çalışır
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # araç çağrısını desteklemelidir
rooftop                                               # http://127.0.0.1:8080
```

Değişkenler, `rooftop`'u başlattığınız yerdeki bir `.env` dosyasında da bulunabilir ya da daha sonra **Ayarlar**'dan ayarlanabilir.
Ayarlar'daki **Test**, küçük bir istek gönderir ve neyin yanlış olduğunu sade bir dille söyler; örneğin
"openrouter.ai API anahtarını reddetti (401)".

Hiçbir şeyin bilgisayarınızdan çıkmamasını mı istiyorsunuz? Yerel bir model ve [Çevrimdışı mod](./offline) kullanın.

## İlk sohbetiniz

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Sohbeti   │ ──▶ │ 2. Sayfaya         │ ──▶ │ 3. Yeni sohbet: YZ'nin│
 │ dışa aktar   │     │    sürükleyin      │     │ kimi oynayacağını seçin│
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. Telegram Desktop veya WhatsApp'tan [bir sohbeti dışa aktarın](./export).
2. Klasörü, `.zip` dosyasını veya WhatsApp `.txt` dosyasını sayfaya sürükleyin (ya da `rooftop --import <klasör>` ile başlatın).
3. **Yeni sohbet**'e basın ve karakteri seçin: diğer kişiyi ya da kendinizi („kendi tarzınızda kendinizle konuşun”).

::: tip Kendi sohbetleriniz olmadan deneyin
Depoda [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples) içinde iki kurgusal dışa aktarım bulunur:
Jonas ve Priya Telegram'da lazanya pişirir, Sofia ve Daniel WhatsApp'ta bir hafta sonu geçirir.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Dışa aktarım yok mu? Notlardan başlayın

**Yeni sohbet → Notlardan**, yalnızca onun adını (sizinki isteğe bağlı) ve onun hakkında birkaç satırı ister: kim olduğu,
neleri paylaştığınız, nasıl yazdığı („bana tatlım diye hitap eder, kısa İtalyanca mesajlar, çok ❤️”). YZ onu yalnızca
bu notlara dayanarak yazar. Geçmiş olmadan stil profili ve medya kitaplığı olmaz; bu yüzden notlar nasıl yazdığını ne kadar
anlatırsa, o kadar yakın olur. Notları sohbette istediğiniz zaman düzenleyebilirsiniz (✎) ve sohbeti diğerleri gibi bir bağlantıyla paylaşabilirsiniz. Sohbeti silmek, içindeki her şeyi siler.

## Pencerede neler var

| Düğme | Ne yapar |
|---|---|
| **Paylaş** | Arkadaşların karakterle konuşması için [bağlantılar](../features/share-links) |
| **Medya kitaplığı** | Her çıkartma, GIF, fotoğraf ve sesli mesaj ile YZ'nin onlar hakkında bildikleri |
| **Notlar** | Dışa aktarımın söylemediği kişi hakkındaki şeyler. Karakter okur, ziyaretçiler asla |
| **`{ }`** | Modele gönderilen tam JSON ve kullanılan belirteçler |
| **Yeniden yaz** | Karakterin son yanıtını atar ve yeniden yazar |
| **Önce onlar yazsın** | Karakter sohbeti başlatır |
