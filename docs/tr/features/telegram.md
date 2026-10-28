# Telegram'dan yanıtlama

Bir paylaşım bağlantısı, ziyaretçilerinin mesajlarını bir Telegram grubuna gönderebilir. Orada kendiniz yanıtlarsınız ya da bir geri sayım bittiğinde YZ yanıtlar.
Ziyaretçiler iki durumda da aynı «yazıyor…» göstergesini görür ve kimin yanıtladığını anlayamaz: «insan mı YZ mi?» oyunu ya da
YZ'nin bariz soruları yanıtladığı bir destek masası.

```
 ziyaretçi ──▶ paylaşım bağlantısı ──▶ 🤖 bot ──▶ Telegram grubunuz
                                              ├─ ✍️ Yanıtla           siz yanıtlarsınız
                                              └─ 🤖 YZ yanıtı (10 sn) YZ hemen ya da geri sayım bitince yanıtlar
```

## Kurulum

**Ayarlar → Telegram**, botu, bağlı olup olmadığını ve içinde bulunduğu her grubu gösterir.

| Mod | Kurulum | Mesajlar nereye gider |
|---|---|---|
| **Paylaşılan bot** | yok | aktarıcı üzerinden (iroof.top), her bot gibi düz metin olarak |
| **Kendi botunuz** | [@BotFather](https://t.me/BotFather) ile oluşturun, belirteci yapıştırın ve **Bağlan**'a basın | doğrudan uygulamanız ile Telegram arasında |
| `TELEGRAM_BOT_TOKEN` | bir sunucuda; `TELEGRAM_CHAT_ID` grupları sınırlar | doğrudan; Ayarlar'dan öncelikli |

Ardından **Bir gruba ekle**'ye basın:

1. Bağlantıyı **Telegram uygulamasında**, **Telegram Web**'de açın ya da QR kodu telefonunuzla tarayın. İki bağlantı da kopyalanabilir.
2. Bir grup seçin (ya da bir grup oluşturun) ve onaylayın.
3. Pencere yeşile döner ve grup Ayarlar'da ve her paylaşım bağlantısında görünür.

Paylaşılan botta bağlantı, grubu yalnızca uygulamanıza bağlayan, bir saat geçerli, tek kullanımlık bir kod taşır.

Son olarak bir paylaşım bağlantısında **Telegram grubu** altından grubu seçin ve YZ'nin kaç saniye sonra yanıt vereceğini belirleyin
(`0` = yalnızca **YZ yanıtı**'na bastığınızda).

::: tip Gizlilik
Gruba yalnızca yeni ziyaretçi mesajları ve YZ yanıtları gönderilir, asla dışa aktarılmış geçmiş. Çevrimdışı mod botu kapatır.
Ayrıntılar: [Çevrimdışı mod ve gizlilik](../guide/offline#the-telegram-bot).
:::

::: tip Herkese açık bir adres gerekmez
İki bot türü de long polling kullanır, bu yüzden bir dizüstü bilgisayardan da çalışır. Bir bot belirteci aynı anda yalnızca bir uygulamada çalışır.
:::

## Üç yanıtlama yolu

1. Botun «✍️ … bu iletiyi yanıtlayın» isteminin yanıtlayın.
2. Ziyaretçinin mesajına (ya da bir YZ yanıtına) istediğiniz zaman **Yanıtla**'ya basmadan yanıt verin.
3. **Yanıtla**'ya basın ve yazın. 15 dakika boyunca mesajlarınız o ziyaretçiye gider, her yanıttan sonra da 2 dakika daha,
   bu yüzden bir yanıt birden çok mesaja yayılabilir.

Üçüncü yol, botun normal grup mesajlarını görmesini gerektirir: gizlilik modunu kapatın (@BotFather → `/setprivacy` → Disable, sonra
botu yeniden ekleyin) ya da botu yönetici yapın. 1. ve 2. yollar her zaman çalışır.

::: warning Güvendiğiniz bir grup kullanın
Gruptaki herkes yanıtlayabilir. Yalnızca metin yanıtları iletilir ve YZ yanıtları bağlantının sınırına dahil edilir.
:::
