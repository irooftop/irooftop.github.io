# Paylaşım bağlantıları

Sohbet üstbilgisindeki **Paylaş**, diğer kişilerin karakterle konuşabilmesi için bağlantılar oluşturur, örneğin:

* bir arkadaş YZ'nin **sizin tarzınızda** ne kadar iyi yazdığını değerlendirir;
* bir arkadaş **kendisinin bir kopyasıyla** konuşur.

Bağlantı `https://<sunucunuz>/s/<ad>` biçimindedir. Ziyaretçiler yalnızca sohbeti görür: kenar çubuğu, ayarlar, notlar, medya açıklamaları,
istem, belirteç kullanımı ya da diğer sohbetler görünmez.

## Seçenekler

| Seçenek | Varsayılan | |
|---|---|---|
| Kim açabilir | bu bilgisayar | düzenleyicinin içindeki **Wi‑Fi** ve **İnternet** anahtarları ([aşağıda](#open-links-on-other-devices)) |
| Bağlantı | rastgele | `alex` gibi bir ad seçin |
| Görünen ad | karakterin adı | dışa aktarımdaki gerçek adlar gösterilmez |
| PIN | yok | 4–64 karakter, Argon2id özeti olarak saklanır. ✨ 6 basamak üretir |
| Konuşmalar | özel | **Özel**: ziyaretçi başına bir konuşma. **Ortak oda**: herkes tek bir konuşmada |
| Ziyaretçiler dışa aktarımı okuyabilir | hiçbiri | hiçbiri, son *N* mesaj ya da hepsi |
| Sınırlar | 50 ziyaretçi, her biri 200 yanıt | her yanıt anahtarınızdan belirteç harcar. `0` = sınırsız |
| Ziyaretçiler önce onların yazmasını isteyebilir | kapalı | 💬 düğmesini gösterir: karakter, ziyaretçinin bir şey yazmasına gerek kalmadan mesaj gönderir |
| Ziyaretçiler bir yanıtı yeniden yazdırabilir | kapalı | ↻ düğmesini gösterir: karakterin son yanıtı yeniden yazılır. İkisi de sınırdan bir yanıt kullanır ve kapalıyken sunucu bunları reddeder |
| Sona erer / etkin | asla / açık | bir bağlantıyı silmeden duraklatın ya da süresini bitirin |
| Telegram grubu | kapalı | [Telegram'dan yanıtlama](./telegram) |

Paylaş penceresinde her ziyaretçi konuşmasını **Oku** ve birini iptal etmek için **Sonlandır** diyebilirsiniz. Her ziyaretçi,
en son yazdığı adresi gösterir; bir konuşmayı sonlandırırken **Ayrıca engelle**, siz **Engeli kaldır** diyene kadar o adresi
bağlantıdan uzak tutar (başlangıç sayfası, yeni konuşmalar ve açık olanlar). Paylaşılan bir ağda bir adres birden çok kişi olabilir.
Adresler yalnızca bilgisayarınızda, bağlantıyla birlikte saklanır.

## Karakter kiminle konuşuyor

Ziyaretçi siz değilsiniz. Mia bağlantınızı açtığında, karakter **Mia**'nın yazdığını, bağlantının
sizden geldiğini ve geçmişin ve notlarınızın sizinle onlar hakkında olduğunu, Mia hakkında olmadığını bilir: onu
yeni biri gibi karşılar. Adı yoksa o sadece bir misafirdir.

| | Karakterin gördükleri |
|---|---|
| Özel bağlantı | ziyaretçiyle tek bir konuşma; verdiği adla (ya da «Misafir») |
| Ortak oda | bir grup sohbeti: her mesaj gönderenin adını taşır ve insanlar istediği zaman katılabilir |
| Dışa aktarım geçmişiniz | sizin mesajlarınız sizin adınızla, ardından ziyaretçinin mesajları; asla karışmazlar |

Sistem istemi her konuşma için sabittir, bu yüzden sağlayıcılar onu önbelleğe alır: ziyaretçinin adı konuşma başladığında belirlenir
ve bir odada adlar mesajlarla birlikte taşınır. Karakterin ya da sizin adınızı kullanan bir ziyaretçi
örneğin «Alex (misafir)» olur, bir odadaki ikinci bir «Ann» ise «Ann 2» olur.

## Davetler

| Bağlantı | Açılan |
|---|---|
| `/s/alex` | başlangıç sayfası |
| `/s/alex#pin=2468` | sohbet hemen açılır. PIN `#` işaretinden sonra gelir, bu yüzden asla sunucuya ya da günlüklere ulaşmaz |
| `/s/alex#name=Greg&pin=2468` | aynısı, ziyaretçinin adı doldurulmuş olarak (`?name=Greg` de çalışır) |

Bir bağlantının **QR** düğmesi, çalışan her adres için bir telefonla taranacak bir kod açar. Kaydettikten hemen sonra,
**PIN'li davet kopyala** bağlantıyı PIN ile birlikte kopyalar.

## Bağlantıları diğer cihazlarda açma {#open-links-on-other-devices}

Bir sunucuda bağlantılar doğrudan sunucunun adresini kullanır. Masaüstü uygulaması (ve `127.0.0.1` üzerindeki `rooftop`) yalnızca
bilgisayarınızda çalışır, bu yüzden Paylaş penceresinin ve bağlantı düzenleyicisinin iki anahtarı vardır. Her biri **Etkin**,
**Bağlanıyor** ya da **Çalışmıyor** durumunu gösterir ve düzenleyici bağlantının sahip olacağı adresi hemen gösterir.

```
                    ┌──────────── bilgisayarınız ───────────┐
 Wi‑Fi'deki telefon ─▶│ :8737  yalnızca ziyaretçi sayfaları   │
                    │                                       │
 herkes ──▶ ad.iroof.top ══ tek bir giden WebSocket ══▶ uygulama │
                    │                                       │
                    │ 127.0.0.1  sahip arayüzü, ayarlar, API │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi ve yerel ağ | İnternet |
|---|---|---|
| Adres | `http://<IP adresiniz>:8737/s/<ad>` | `https://<ad>.iroof.top/s/<ad>` |
| Kim | aynı ağdaki cihazlar | uygulama çalıştığı sürece herkes |
| Nasıl | yalnızca ziyaretçi sayfalarını sunan ikinci bir dinleyici | aktarıcıya tek bir giden WebSocket; internette hiçbir şey dinlemez |
| Verileriniz | bilgisayarınızda kalır | bilgisayarınızda kalır, ama ziyaretçi mesajları aktarıcıdan geçer |

* Wi‑Fi bağlantı noktası yeniden başlatmalarda aynı kalır, bu yüzden basılı QR kodlar çalışmaya devam eder. macOS'ta güvenlik duvarı sorarsa
  gelen bağlantılara izin verin.
* İnternet adını siz seçersiniz ve değiştirebilirsiniz (adresin yanındaki **Değiştir**). Aktarıcı yalnızca
  `/s/…`, `/api/s/…` ve sayfa varlıklarını iletir, çerezleri iki yönde de atar ve uygulama kapalıyken bir "çevrimdışı" sayfası gösterir.
* iroof.top yerine kendi aktarıcınızı mı istiyorsunuz? Bkz. [Aktarıcı merkezi](../reference/relay-hub).
* **Çevrimdışı mod** internet anahtarını kapatır ve kilitler; Wi‑Fi çalışmaya devam eder. Aktarıcının neyi görebildiği:
  [Çevrimdışı mod ve gizlilik](../guide/offline#share-with-friends-safely).

## Koruma

| Koruma | Sınır |
|---|---|
| Bir IP'den yanlış PIN'ler | 5'ten sonra: 1 dk kilit, sonra 2, 4… en fazla 1 sa |
| Bir bağlantıda yanlış PIN'ler, tüm IP'ler | 15 dk'da 20: 5 dk kilit, 24 saate kadar iki katına çıkar |
| Ziyaretçi başına mesajlar | dakikada 30, dakikada 10 yanıt |
| Yeni konuşmalar | IP başına saatte 20 |

Sayaçlar bellekte tutulur. 6 basamaklı bir PIN makul bir sürede tahmin edilemez. Bir ters vekilin arkasında `ROOFTOP_TRUST_PROXY=true` ayarlayın,
böylece sayaçlar gerçek istemci IP'lerini görür.

Ziyaretçi oturumları `/s/<ad>/<belirteç>` içinde rastgele 26 karakterlik bir belirteç kullanır; tarayıcı bunu hatırlar ve
`Referrer-Policy: no-referrer` sızmasını önler. Ziyaretçiler yalnızca görebilecekleri medyayı yükleyebilir.
