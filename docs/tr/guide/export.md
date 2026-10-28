# Sohbet dışa aktarma

<div class="wide">

![Telegram Desktop: sohbeti açın, sağ üstteki ⋯ öğesine tıklayın, Sohbet geçmişini dışa aktar…'ı seçin, ardından Dışa aktar](/img/telegram-export.svg)

</div>

## Telegram

**Telegram Desktop**'ta (macOS, Windows, Linux): sohbeti açın → **⋯** → **Sohbet geçmişini dışa aktar…** → **Dışa aktar**.

* Fotoğraflar, videolar, sesli mesajlar, çıkartmalar ve GIF'ler açık kalsın: karakter bunları kullanır.
* İki biçim de çalışır: **HTML** (`messages.html`) ve makine tarafından okunabilir **JSON** (`result.json`).
* Dışa aktarım klasörünü ya da bunun `.zip` dosyasını sayfaya sürükleyin.

## WhatsApp

Telefonda: sohbeti açın → **⋮ → Diğer → Sohbeti dışa aktar** (iPhone: kişi adına dokunun → **Sohbeti dışa aktar**) →
**Medyayı dahil et**. `.zip` dosyasını bilgisayarınıza gönderin ve sayfaya sürükleyin.

Medya olmadan dışa aktarılan bir sohbet tek bir `.txt` dosyasıdır ve o da çalışır.

## Büyük dışa aktarımlar

100.000'den fazla mesajlı ve birkaç gigabaytlık dışa aktarımlar da aynı şekilde çalışır: klasörü sürükleyin. Sayfa ne olduğunu gösterir:

1. **Klasör okunuyor…** dosyaları sayar (tarayıcının on binlerce dosyayı listelemesi bir an sürebilir).
2. **Sohbet önce gelir.** Mesaj sayfaları (ya da `result.json`, ya da WhatsApp `.txt`) medyadan önce yüklenir ve okunur. Bu dışa aktarım **zaten içe aktarılmışsa**, içe aktarma burada biter ve onu açar; hiçbir medya yüklenmez. Medya diske sığmıyorsa, büyük bir şey gönderilmeden önce ne kadar yer gerektiği size söylenir.
3. **1,2 GB / 3,4 GB yükleniyor (%35) · 30.905 dosyadan 9.000'i**: medya küçük gruplar hâlinde, birbiri ardına gelir. Tarayıcı asla tek bir dev istek oluşturmaz ve yarıda kalan bir grup tek başına yeniden denenir. Kendi bilgisayarınızda çalıştırdığınızda boyut sınırı yoktur.
4. **Mesajlar okunuyor: 121 sayfadan 37'si · 36.000 mesaj**: tüm sayfalar bir kez, paralel olarak okunur.
5. **Medya denetleniyor** ve **Medya taşınıyor**: dosyaların kopyaları bulunmak üzere özetlenir ve veri klasörüne taşınır (iki kez kopyalanmaz).
6. **Kaydediliyor**, ardından *Yeni sohbet* penceresi açılır.

Aynı anda yalnızca bir içe aktarma çalışır; bir hata bırakma alanında görünür kalır ve klasörü yeniden seçebilirsiniz.

[Masaüstü uygulamasında](./desktop) bu yükleme hiç olmaz: uygulama klasörü, `.zip` dosyasını ya da `.txt` dosyasını bulunduğu yerden okur
(4–6. adımlar), bu daha hızlıdır ve aşağıdaki tarayıcı sorunlarından etkilenmez.

::: details Bir dosya yüklenemediğinde (tarayıcı)
Tarayıcının artık okuyamadığı bir dosya (taşınmış, değiştirilmiş ya da indirilmemiş bir iCloud/OneDrive yer tutucusu) bulunur ve atlanır; grubunu sürekli bozan tek bir dosya da öyledir: o dosya izole edilene kadar grup bölünür. Atlanan medya sohbette eksik olarak görünür; içe aktarmadan sonraki mesaj birini adlandırır ve tarayıcı konsolu hepsini listeler. Sohbet dosyasının kendisi gönderilemezse içe aktarma durur ve onu adlandırır. Hatalar sunucunun ne aldığını gösterir, örneğin `sunucu 4.096 bayttan 1.200 bayt aldı`; böylece bağlantı sorunu ile tarayıcı sorunu kolayca ayırt edilir.
:::

Bir içe aktarma sırasında hiçbir şey bilgisayarınızdan çıkmaz ve hiçbir model çağrılmaz. Medya yalnızca medya kitaplığında **Açıkla**'ya bastığınızda açıklanır.

`rooftop --import <klasör>` ile klasör yerinde okunur ve dosyaları kopyalanır, asla taşınmaz; ilerleme günlüğe yazılır.
Aynı bilgisayardaki çok büyük bir dışa aktarım için bu en hızlı yoldur: yükleme yok ve geçici bir klasörde ikinci bir kopya yok.

## Neler tanınır

| Kaynak | Dosyalar |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (klasörde `messages.html` yoksa kullanılır) |
| WhatsApp | `WhatsApp Chat with <ad>.txt` (Android) ya da `_chat.txt` (iOS), bir klasörde, `.zip` içinde ya da tek başına |

* **Telegram**: satır sonlu metin, bağlantılar, alıntılar ve kod; yanıtlar ve kısmi alıntılar; iletilmiş mesajlar; düzenlemeler; servis mesajları;
  tepkiler; bağlantı önizlemeleri; fotoğraf, video, dairesel video, sesli mesaj, ses, dosya, çıkartma (`.webp`, `.webm`,
  `.tgs`), GIF, konum, kişi, anket ve arama.
* **WhatsApp**: Android ve iOS biçimleri, 12 ve 24 saatlik saatler ve her iki gün/ay sırası, dosya bazında algılanır.
  Çok satırlı mesajlar, düzenlemeler ve ekler korunur. Silinen mesajlar ve şifreleme bildirimi atlanır,
  `<Media omitted>` ise kullanılamıyor olarak işaretlenir.

Medya dosyaları özetlenir; bu yüzden beş kez gönderilen bir çıkartma kitaplıkta tek bir öğe olur (`stk_…`, `gif_…`, `pho_…`).

::: info HTML dışa aktarımlarındaki tepkiler
HTML dışa aktarımları kimin tepki verdiğini söylemez. Birebir sohbetlerde bir tepki diğer katılımcıya atfedilir, sayı 2 ise ikisine birden.
:::
