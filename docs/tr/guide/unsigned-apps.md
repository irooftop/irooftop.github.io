# İmzasız bir uygulamayı açma

Masaüstü yükleyicileri henüz imzalanmadı ya da notarize edilmedi; bu yüzden ilk açılışta macOS ve Windows'ta bir uyarı çıkar.
Bu tek seferlik bir adımdır: uygulamaya bir kez izin verdikten sonra, aynı yolla kurulan güncellemelerden sonra bile normal açılır.

::: tip Bunu yapmak istemiyor musunuz?
[Uygulamayı kendiniz derleyin](./desktop#build-it-yourself) ya da [sunucuyu](./getting-started#install) çalıştırıp tarayıcınızda kullanın:
`brew install irooftop/tap/rooftop`, `cargo install rooftop` veya [Docker](./docker).
:::

## macOS

![macOS'ta doğrulanmamış bir uygulamayı açma: «Açılmadı» uyarısı, Bitti, Sistem Ayarları, Gizlilik ve Güvenlik, Yine de Aç, parola ve uygulama açılır](/how-to-open-an-unsigned-app-on-macos.svg)

macOS 15 Sequoia ve sonrasında:

1. **iRoof.top**'u açın. macOS *“iRoof.top” açılmadı: Apple doğrulayamadı…* der. **Bitti**'ye tıklayın.
2. **Apple menüsü → Sistem Ayarları… → Gizlilik ve Güvenlik**'i açın.
3. **Güvenlik** bölümüne kaydırın: *“iRoof.top” Mac'inizi korumak için engellendi*. **Yine de Aç**'a tıklayın.
4. **Yine de Aç** ile onaylayın ve parolanızı girin ya da Touch ID kullanın.

**Yine de Aç** düğmesi, uygulamayı açmayı denedikten sonra yaklaşık bir saat boyunca görünür. Yoksa,
uygulamayı yeniden açın ve Gizlilik ve Güvenlik'e geri dönün.

macOS 14 Sonoma ve öncesinde, Finder'da uygulamaya sağ tıklayın (ya da Control-tıklama yapın), **Aç**'ı seçin, sonra yine **Aç**'a basın.

### Terminal'den

Tarayıcının indirmeye koyduğu karantina işaretini kaldırmak da işe yarar:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Her zaman işe yaramaz: yeni macOS sürümlerinde `/Applications` içindeki uygulamaları değiştirmek için Terminal'in Gizlilik ve Güvenlik'te **Uygulama Yönetimi** (ya da **Tam Disk Erişimi**) iznine ihtiyacı olabilir; bu olmadan `Operation not permitted` hatası verir. Yukarıdaki adımlar her zaman çalışır.

::: details “iRoof.top hasarlı ve açılamıyor”
Bu mesaj da bozuk bir indirme değil, karantina işaretini belirtir. **İptal**'e tıklayın (**Çöp Kutusuna Taşı**'na değil) ve yukarıdaki `xattr` komutunu çalıştırın ya da Sistem Ayarları adımlarını izleyin.
:::

## Windows

SmartScreen yükleyici için **Windows bilgisayarınızı korudu** gösterir:

1. **Diğer bilgiler**'e tıklayın.
2. **Yine de çalıştır**'a tıklayın.

Tarayıcı indirmeyi tutarsa (*yaygın olarak indirilmez*), indirilenler listesini açın, **⋯ → Sakla**'yı seçin,
ardından **Daha fazla göster → Yine de sakla**. `.msi` için sağ tıklayıp **Özellikler** → **Engellemeyi kaldır** kutusunu işaretleyip
**Tamam**'a da basabilirsiniz; çalıştırmadan önce.

**Akıllı Uygulama Denetimi** açık olan Windows 11'de imzasız uygulamalar **Yine de çalıştır** düğmesi olmadan engellenir. Bunun yerine
[sunucuyu](./getting-started#install) kullanın ya da **Windows Güvenliği → Uygulama ve tarayıcı denetimi → Akıllı Uygulama Denetimi ayarları**'ndan Akıllı Uygulama Denetimi'ni kapatın.

## Linux

Linux imzasız uygulamaları engellemez, ama bir AppImage'in çalışması için izin gerekir:

```sh
chmod +x iRoof.top_amd64.AppImage    # ya da: Özellikler → İzinler → Dosyanın program olarak çalışmasına izin ver
./iRoof.top_amd64.AppImage
```

FUSE ile ilgili bir şikâyet alırsanız (`dlopen(): error loading libfuse.so.2`), `libfuse2` kurun (Ubuntu 24.04:
`sudo apt install libfuse2t64`) ya da `--appimage-extract-and-run` ile çalıştırın.

Paketler, yerel imzasız paketleri kabul eden paket yöneticisiyle kurulur:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
