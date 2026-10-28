# Çevrimdışı mod ve gizlilik

iRoof.top sohbetlerinizi bilgisayarınızda tutar. Bilgisayarınızda da çalışan bir modelle **hiçbir şeyin bilgisayarınızdan çıkması gerekmez**.
**Çevrimdışı mod**, bunu alışkanlık değil, uygulamanın zorunlu kıldığı bir kurala dönüştürür.

## Yerelde neler olur

| Adım | Nerede çalışır | Ağ |
|---|---|---|
| İçe aktarma, ayrıştırma, stil profili | bilgisayarınız | yok |
| Depolama | veri klasöründeki JSON dosyaları ve medya | yok |
| Geçmişte arama, bağlantı PIN'leri, medya kitaplığı | bilgisayarınız | yok |
| Fotoğraf, çıkartma, GIF, video açıklamaları | **medya modeli**, yalnızca **YZ ile açıkla**'ya bastığınızda | öğe başına bir istek, model uç noktasına |
| Ses dökümü | medya modeli, bir sesli mesajda **YZ ile açıkla**'ya bastığınızda ya da bir tane kaydettiğinizde | model uç noktasına bir istek |
| Bir yanıt | **sohbet modeli**, bir mesaj gönderdiğinizde (ya da bir ziyaretçi gönderdiğinde) | model uç noktasına istekler |
| Uzun geçmişi sıkıştırma | sohbet modeli, bir yanıtın parçası olarak, geçmiş bütçeyi aştığında | model uç noktasına bir ek istek |

İçe aktarma hiçbir zaman bir model çağırmaz. İlk çağrı, bir mesaj gönderdiğinizde, **Açıkla**'ya bastığınızda ya da bir
sesli mesaj kaydettiğinizde gerçekleşir. Bir yanıt, modele dışa aktarılmış geçmişinizi ([geçmiş bütçesine](../reference/configuration#settings-only) kadar),
stil profilini ve medya açıklamalarını gönderir. **Yani modelin nerede çalıştığı, sohbetinizin nereye gideceğini belirler**: bulut uç noktası onu alır, bilgisayarınızdaki bir model almaz.

## Yalnızca çevrimdışı çalıştırma

1. [Ollama](https://ollama.com) veya [LM Studio](https://lmstudio.ai) kurun ya da llama.cpp'nin `llama-server` programını çalıştırın.
2. **Araç çağrısını destekleyen bir sohbet modeli** indirin; fotoğraf ve çıkartmaların açıklanmasını istiyorsanız bir **görme modeli** de indirin.
3. **Ayarlar**'da uç noktayı ve modeli seçin, ardından **Çevrimdışı**'yı açın:

| Sunucu | Temel URL |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| llama.cpp `llama-server` | `http://localhost:8081/v1` (varsayılan bağlantı noktası `8080`, iRoof.top'ın: `llama-server --port 8081` ile başlatın) |

4. **Test**'e basın. Küçük bir istek gönderir ve yanıt veren modeli ve sunucuyu gösterir. Ağı kapatıp sohbete devam edebilirsiniz.

**Masaüstü uygulaması** Ayarlar'da yapılandırılır. Kabuğunuzu ya da bir `.env` dosyasını okumaz (bkz. [Masaüstü uygulaması](./desktop)),
ama başlatıldığı ortamda `ROOFTOP_OFFLINE` ve `OPENAI_*` varsa bunlara uyar. Bir sunucu ortamı
(ve `.env`'i) okur:

::: code-group

```sh [Homebrew / cargo sunucusu]
# --offline, ROOFTOP_OFFLINE=1 ile aynıdır
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=llama3.1 rooftop --offline
```

```sh [Docker]
docker run -p 8080:8080 -v rooftop-data:/data \
  --add-host=host.docker.internal:host-gateway \
  -e ROOFTOP_OFFLINE=1 \
  -e OPENAI_BASE_URL=http://host.docker.internal:11434/v1 -e OPENAI_MODEL=llama3.1 \
  ghcr.io/irooftop/rooftop
```

:::

Docker'da `localhost` konteynerin kendisidir, bu yüzden `host.docker.internal` kullanın (`--add-host` seçeneği yalnızca Linux'ta gerekir).
Ollama bağlantıyı reddederse, tüm arayüzlerde dinlemesini sağlayın (`OLLAMA_HOST=0.0.0.0`).

### Çevrimdışı modun zorunlu kıldıkları

| | Çevrimdışı mod |
|---|---|
| Sohbet, geçmiş özeti, medya açıklaması, ses dökümü | uç nokta [yerel](#local-means) değilse reddedilir |
| HTTP üzerinden erişilen MCP sunucuları | yerel değilse reddedilir; Ayarlar'da hata olarak gösterilir |
| İnternet üzerinden paylaşım (`<ad>.iroof.top`) | kapalı: aktarıcı istemcisi başlamaz ve anahtar kilitlenir |
| Telegram botu, kendi ya da paylaşılan | başlamaz |
| URL üzerinden GIF'ler | YZ, yerel olmayan bir URL'den GIF gönderemez |
| Wi‑Fi paylaşım bağlantıları | çalışır |

Reddedilen bir istek hiçbir bağlantı kurulmadan başarısız olur ve mesaj nedenini söyler: `Çevrimdışı mod: https://openrouter.ai
yerel bir uç nokta değil`. Yerel bir uç noktadan başka bir ana bilgisayara yönlendirme de reddedilir. Mod açıkken kenar çubuğu başlığında küçük bir **Çevrimdışı** rozeti görünür.
Ayar kaydedilir. `--offline` / `ROOFTOP_OFFLINE=1` modu Ayarlar'dan bağımsız olarak açar ve Ayarlar onu kapatamaz.

#### Yerel ne anlama gelir {#local-means}

`localhost`, döngü geri (`127.0.0.0/8`, `::1`), özel ağ adresleri (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
link-local adresleri ve `*.local` ile `*.internal` adları (`host.docker.internal` gibi). Ev ağınızdaki başka bir bilgisayardaki bir model,
ağınızdan asla çıkmadığı için yerel sayılır. Adlar yazılışlarına göre değerlendirilir, sorgulanmazlar.

### Çevrimdışı mod neyi denetleyemez

* **stdio MCP sunucuları** bilgisayarınızdaki programlardır. iRoof.top bunları başlatır ama neye bağlandıklarını göremez,
  bu yüzden yalnızca yerel kalacaklarına güvendiklerinizi ekleyin.
* **Ses dökümü** Whisper `/audio/transcriptions` API'sini değil, sohbet API'sini (bir `input_audio` parçası) kullanır.
  Orada sesi kabul eden yerel bir sunucu ve model gerekir. Sizinki kabul etmiyorsa, sesli mesaj yine kaydedilir ve gönderilir;
  yalnızca metni eksik kalır.
* **Görüntü ve konuşma üretimi** yalnızca [MCP araçları](../features/mcp) olarak vardır. Çevrimdışıyken bunun için yerel bir MCP sunucusu kullanın.
* Paylaştığınız kişiler Wi‑Fi bağlantılarınızı kendi tarayıcılarında açar. Çevrimdışı mod bu uygulamayı yönetir, onların cihazlarını değil.

## Arkadaşlarınızla güvenle paylaşın {#share-with-friends-safely}

| Bağlantı | Ne olur |
|---|---|
| **Wi‑Fi** `http://<IP adresiniz>:8737/s/<ad>` | yerel ağınızdan asla çıkmaz |
| **İnternet** `https://<ad>.iroof.top/s/<ad>` | uygulama, merkeze tek bir giden WebSocket bağlantısı açar; merkez bu bağlantı üzerinden ziyaretçinin HTTP isteklerini ve uygulamanızın yanıtlarını iletir |

İnternet bağlantısıyla dışa aktarımınız, sohbetleriniz ve model bilgisayarınızda kalır; merkez bunların hiçbirini saklamaz.
Merkez yalnızca bir hesap kaydı tutar: adınız, sırrınızın bir özeti ve sizi en son ne zaman gördüğü.

Bunun *sağlamadığı* şeyler konusunda net olun. Merkez TLS'yi sonlandırır; bu yüzden herhangi bir ters vekil gibi, içinden geçen trafiği teknik olarak görebilir:
ziyaretçinin yazdıklarını, karakterin yanıtlarını ve bağlantının ziyaretçilerin okumasına izin verdiği geçmişi
(**Ziyaretçiler dışa aktarımı okuyabilir**, varsayılan **hiçbiri**). Yalnızca ziyaretçi sayfalarını (`/s/…`,
`/api/s/…`, sayfa varlıkları) iletir ve çerezleri iki yönde de atar; sahip arayüzünüz ve ayarlarınız ona üzerinden hiçbir zaman erişilemez. Bu kadar güven fazlaysa Wi‑Fi bağlantılarını kullanın ya da [kendi aktarıcı merkezinizi çalıştırın](../reference/relay-hub).
[Paylaşım bağlantıları hakkında daha fazlası](../features/share-links).

**Çevrimdışı mod** açıkken iroof.top aktarıcısı kapalıdır. Wi‑Fi bağlantıları çalışmaya devam eder.

## Telegram botu {#the-telegram-bot}

[Telegram'dan yanıtlama](../features/telegram) grubunuza şunları gönderir:

* yeni **ziyaretçi mesajları** (ad, bağlantı adı, metin ya da açıklaması veya dökümüyle bir medya etiketi ve yanıtladıkları mesajın kısa
  önizlemesi) ve YZ'nin **yanıtları**;
* asla dışa aktarılmış geçmişi. Eski mesajlar iletilmez.

Botların uçtan uca şifrelemesi yoktur: metin Telegram'dan düz metin olarak geçer. **Paylaşılan bot** ile metin ayrıca
merkezden geçer; merkez yalnızca hangi grubun hangi hesaba ait olduğunu saklar. **Kendi botunuz** Telegram ile
doğrudan konuşur, merkez olmadan. Çevrimdışı mod ikisini de kapatır.

## Verileriniz nereye gider

| Veri | Nereye gider |
|---|---|
| Dışa aktarımlar, sohbetler, ayarlar, API anahtarı | bilgisayarınızdaki veri klasörü |
| İçe aktarma ve stil profili | hiçbir yere |
| Geçmiş, stil profili, mesajlarınız | seçtiğiniz model uç noktası, her yanıtta |
| Fotoğraflar ve ses | medya modeli uç noktası, **Açıkla**'da ya da bir sesli mesaj kaydettiğinizde |
| Wi‑Fi bağlantısındaki ziyaretçi mesajları | bilgisayarınız ve model uç noktanız |
| İnternet bağlantısındaki ziyaretçi mesajları | merkez (aktarım sırasında), bilgisayarınız, model uç noktanız |
| Telegram ile ziyaretçi mesajları | ek olarak Telegram ve paylaşılan bot için merkez |
| Çevrimdışı mod | yalnızca yerel model uç noktası, yalnızca Wi‑Fi bağlantıları, Telegram yok |
