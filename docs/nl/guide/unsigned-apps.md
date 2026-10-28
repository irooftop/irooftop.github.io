# Een niet-ondertekende app openen

De desktopinstallers zijn nog niet ondertekend of genotariseerd, dus de eerste keer starten toont een waarschuwing op macOS en Windows.
Dit is een eenmalige stap: nadat je de app één keer hebt toegestaan, opent hij normaal, ook na updates die op dezelfde manier zijn geïnstalleerd.

::: tip Liever niet?
[Bouw de app zelf](./desktop#build-it-yourself), of draai de [server](./getting-started#install) en gebruik hem in je
browser: `brew install irooftop/tap/rooftop`, `cargo install rooftop` of [Docker](./docker).
:::

## macOS

![Een niet-geverifieerde app openen op macOS: de waarschuwing "Niet geopend", Gereed, Systeeminstellingen, Privacy en beveiliging, Toch openen, het wachtwoord, en de app opent](/how-to-open-an-unsigned-app-on-macos.svg)

Op macOS 15 Sequoia en nieuwer:

1. Open **iRoof.top**. macOS zegt *"iRoof.top" niet geopend: Apple kon het niet verifiëren…*. Klik op **Gereed**.
2. Open het **Apple-menu → Systeeminstellingen… → Privacy en beveiliging**.
3. Scroll naar **Beveiliging**: *"iRoof.top" is geblokkeerd om je Mac te beschermen*. Klik op **Toch openen**.
4. Bevestig met **Toch openen**, en voer je wachtwoord in of gebruik Touch ID.

De knop **Toch openen** verschijnt pas nadat je hebt geprobeerd de app te openen, ongeveer een uur lang. Als hij er niet is,
open de app dan opnieuw en ga terug naar Privacy en beveiliging.

Op macOS 14 Sonoma en eerder: klik met de rechtermuisknop (of Control-klik) op de app in de Finder, kies **Open** en dan nogmaals **Open**.

### Vanuit de Terminal

Het verwijderen van de quarantainevlag die de browser op de download heeft gezet werkt ook:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Het werkt niet altijd: op recente macOS-versies heeft Terminal mogelijk **App-beheer** (of **Volledige schijftoegang**) nodig onder
Privacy en beveiliging om apps in `/Applications` te wijzigen, en het mislukt met `Operation not permitted` zonder dat. De
stappen hierboven werken altijd.

::: details "iRoof.top is beschadigd en kan niet worden geopend"
Ook dit bericht betekent de quarantainevlag, geen kapotte download. Klik op **Annuleren** (niet op **Naar de prullenbak verplaatsen**) en voer
het `xattr`-commando hierboven uit, of volg de stappen in Systeeminstellingen.
:::

## Windows

SmartScreen toont **Windows heeft uw pc beschermd** voor het installatieprogramma:

1. Klik op **Meer info**.
2. Klik op **Toch uitvoeren**.

Houdt de browser de download tegen (*wordt niet vaak gedownload*), open dan de downloadlijst, kies **⋯ → Behouden**,
en daarna **Meer weergeven → Toch behouden**. Voor de `.msi` kun je ook met de rechtermuisknop klikken → **Eigenschappen** → het vinkje bij **Blokkering opheffen** zetten →
**OK** voordat je hem uitvoert.

Op Windows 11 met **Slimme app-besturing** aan worden niet-ondertekende apps geblokkeerd zonder een knop **Toch uitvoeren**. Gebruik dan de
[server](./getting-started#install), of zet Slimme app-besturing uit onder **Windows-beveiliging → App- en browserbeheer → Instellingen voor Slimme app-besturing**.

## Linux

Linux blokkeert niet-ondertekende apps niet, maar een AppImage heeft toestemming nodig om te draaien:

```sh
chmod +x iRoof.top_amd64.AppImage    # of: Eigenschappen → Rechten → Bestand als programma uitvoeren toestaan
./iRoof.top_amd64.AppImage
```

Als er een klacht over FUSE komt (`dlopen(): error loading libfuse.so.2`), installeer dan `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) of start met `--appimage-extract-and-run`.

De pakketten worden geïnstalleerd met de pakketbeheerder, die lokale niet-ondertekende pakketten accepteert:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
