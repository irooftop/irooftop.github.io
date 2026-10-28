# Nasıl çalışır

<div class="wide">

![iRoof.top nasıl çalışır](/how-it-works.svg)

</div>

Her dışa aktarım aynı normalleştirilmiş mesajlara dönüşür. Ardından karakterin her eylemi modele bir **araç çağrısı** olarak yeniden oynatılır;
böylece model yalnızca ne yazdığını değil, kişinin *nasıl* etkileşim kurduğunu öğrenir ve aynı şekilde yanıt verir.

## Eylemler araç çağrısı olarak

| Karakterin yaptığı | Geçmişte ve canlı yanıtlarda araç çağrısı |
|---|---|
| metin balonu, belki bir yanıt ya da kısmi alıntı | `send_message {text, reply_to?, quote?}` |
| çıkartma | `send_sticker {sticker_id, reply_to?}` |
| kitaplıktan GIF, ya da bir MCP aracından URL | `send_gif {gif_id \| url, caption?}` |
| fotoğraf, video, ses, ses dosyası, dosya | `send_media {media_id, caption?}` |
| iletilmiş gönderi | `forward_message {message_id}` |
| tepki | `react {message_id, emoji}` |
| *(eski geçmişi hatırlama)* | `search_history {query}` |

Bir turda birden çok çağrı birden çok balon olur. Diğer taraftan gelen mesajlar, kimliklerin işaret ettiği kısa satırlara dönüşür:

```text
#52108 19:08 ↩ #52107'ye yanıt (sen: "büyükannenin lazanyası 🍝"): Hayatında hiç lazanya yapmadın.
<sticker stk_156dbb381a>: aşçı şapkalı bir kedi, bir tencereyi karıştırıyor
#52107'ye ("büyükannenin lazanyası 🍝") 😂 tepkisi verdi
```

## Sistem istemi

| Bölüm | |
|---|---|
| Kim olmalı | karakterin bilgisini ve tarzını tahmin etmek; onun bilebileceğinden fazlasını asla bilmemek |
| Stil profili | *tüm* dışa aktarımdan: mesaj uzunluğu, büyük harf, noktalama, emoji ve çıkartma kullanımı, yanıt ve tepki alışkanlıkları, tur başına balon, kelimesi kelimesine örnekler |
| Kitaplık | çıkartmalar, GIF'ler ve medya ve nasıl kullanıldıkları |
| Notlar | kişi hakkında yazdıklarınız |

İstem bir sohbet için **statiktir**: saat yok, sayaç yok. Model zamanı `— gün —` ayraçlarından ve `HH:MM` damgalarından okur;
her istek bir sonrakinin bayt bayt aynı önekidir, bu yüzden sağlayıcıların istem önbellekleri isabet etmeye devam eder.

## Uzun sohbetler {#long-chats}

```
 geçmiş bütçesi ───────────────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ bellek (≤ 350 kelime)│ son turlar, bütçenin %60'ına kırpılır   │
 └──────────────────────┴────────────────────────────────────────┘
   ilişki, gerçekler,     kesme noktası uzun süre yerinde kalır,
   konular, şakalar       önbelleğe alınmış önek de öyle
```

Yeniden oynatılan geçmiş bütçeyi aştığında, bir sonraki yanıt önce en eski turları (ve önceki belleği)
kısa bir özete dönüştürür. İçe aktarırken ya da bir sohbeti açarken hiçbir şey harcanmaz. Stil profili yine tüm
dışa aktarımdan gelir ve `search_history` her eski mesaja ulaşır. Belirteç `usage` değeri (istem, önbellek, tamamlama) `{ }` içinde gösterilir.

## Medya kitaplığı

Sohbet modeli metin okur; bu yüzden bir çıkartma, açıklanana kadar yalnızca `<sticker stk_…>`'dir. **YZ ile açıkla**, eksik öğelerin
görüntülerini görme desteği olması gereken medya modeline gönderir.

* GIF'ler, video çıkartmaları ve videolar **sırayla 4 kare** olarak gönderilir; böylece model hareketi görür. Bunun için
  [ffmpeg](https://ffmpeg.org) gerekir (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`); yoksa küçük resim kullanılır.
* **Yeniden yap** bir öğeyi yeniden açıklar. Her açıklama elle düzenlenebilir.
* Açıklamalar dışa aktarıma aittir ve tüm sohbetlerine hizmet eder.

[CLI](../reference/cli) ile kendiniz görün: `rooftop convert <dışa aktarım> --persona "Jonas Weber"`.
