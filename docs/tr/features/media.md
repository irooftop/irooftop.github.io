# Fotoğraflar ve ses

Bazı insanlar çoğunlukla fotoğraf gönderir, bazıları çoğunlukla sesli mesajla konuşur. iRoof.top her iki alışkanlığı da korur.

## Anlamak

Medya kitaplığında **YZ ile açıkla**, çıkartmaları, GIF'leri ve fotoğrafları açıklar ve **sesli mesajları döker**;
bunu, görüntü ve ses kabul etmesi gereken *medya modeli* ile yapar. Ayarlar'da ya da `OPENAI_MEDIA_MODEL` ile ayarlayın; örneğin
OpenRouter'da `google/gemini-3.5-flash-lite`. Açıklamalar yalnızca düğmeye bastığınızda üretilir ve yerel bir model ile
[çevrimdışı mod](../guide/offline) kullanıldığında fotoğraflar asla bilgisayarınızdan çıkmaz.

```text
<sesli mesaj 0:05: «söylenenler»>
```

Bir tür baskın olduğunda, stil profili bunu söyler; örneğin «çoğunlukla sesli mesajlarla konuşuyor (10 / 10)».

### Büyük kitaplıklar

Uzun bir sohbet on binlerce çıkartma, GIF ve fotoğraf içerebilir. Medya kitaplığı, modelin belirteçlerini
en çok işe yaradıkları yere harcamanıza yardımcı olur:

| Denetim | Ne yapar |
|---|---|
| Tür sekmeleri | Tümü, Eksik, Açıklanmış, Çıkartmalar, GIF'ler, Fotoğraflar, Videolar, Ses, sayılarıyla |
| Sıralama | en çok kullanılan (varsayılan), en az kullanılan, son kullanılan, ilk kullanılan |
| Kullanım sayısı | 2, 3, 5, 10 ya da 25'ten az kullanılan öğeleri gizler |
| Arama | açıklamalarda ve kimliklerde |

**N öğeyi YZ ile açıkla**, gösterilen ve henüz açıklanmamış olanların tamamını, **seçilen sırayla yukarıdan aşağıya**,
dörder dörder açıklar. Her açıklama geldiği anda kaydedilir. İlerleme satırı kaçının bittiğini, hataları,
hızı ve kalan süreyi gösterir. Aynı düğme **Durdur**'a dönüşür: istediğiniz zaman durdurabilirsiniz ve bir sonraki çalıştırma kalanla devam eder.
Büyük bir sohbet için iyi bir başlangıç: *Önce en çok kullanılanlar* ve *3 veya daha fazla kullanılanlar*.

## Sesli mesajlarınız

Yazı alanı boşken gönder düğmesi, Telegram'daki gibi bir **mikrofona** dönüşür. Kayıt tarayıcıda WAV'a dönüştürülür,
yüklenir ve dökülür. Paylaşım bağlantılarının ziyaretçileri de kayıt yapabilir.

::: info
Tarayıcılar kaydı yalnızca `https://` ya da `localhost` üzerinde izin verir.
:::

## Karakterin fotoğrafları ve sesi

Görüntü üreten bir MCP sunucusu ve konuşan bir sunucu bağlayın:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

Karakter böylece iki eylem daha kazanır:

| Eylem | Ne yapar |
|---|---|
| `send_voice {text}` | konuşma aracını çağırır (WAV, hata olursa mp3 ile yeniden dener) ve sesli mesaj gönderir |
| `send_photo {prompt, caption?}` | görüntü aracını çağırır ve fotoğraf gönderir |

* Bir konuşma aracı bağlıyken, karakterin kendi dökülmüş sesli mesajları `send_voice` olarak yeniden oynatılır; böylece model
  alışkanlığı sürdürebileceği biçimde görür.
* *Sohbet ayrıntıları* içindeki **Ses** (örneğin `Puck`) karaktere kendi sesini verir.
* Bir MCP aracının döndürdüğü diğer her görüntü ya da ses, sohbet medyası `gen_…` olur (içeriğe göre denetlenir, 25 MB'a kadar, sohbetle birlikte silinir).

::: tip Maliyetler
Her fotoğraf ya da sesli mesaj ek bir ücretli çağrıdır: `meta/muse-image` ile görüntü başına yaklaşık 0,01 $ ve birkaç saniyelik TTS.
:::
