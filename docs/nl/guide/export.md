# Een chat exporteren

<div class="wide">

![Telegram Desktop: open de chat, klik op ⋯ rechtsboven, kies Chatgeschiedenis exporteren…, en dan Exporteren](/img/telegram-export.svg)

</div>

## Telegram

In **Telegram Desktop** (macOS, Windows, Linux): open de chat → **⋯** → **Chatgeschiedenis exporteren…** → **Exporteren**.

* Laat foto's, video's, spraakberichten, stickers en GIF's aan: de persoon gebruikt ze.
* Beide formaten werken: **HTML** (`messages.html`) en machineleesbaar **JSON** (`result.json`).
* Zet de exportmap, of een `.zip` daarvan, op de pagina.

## WhatsApp

Op de telefoon: open de chat → **⋮ → Meer → Chat exporteren** (iPhone: tik op de naam van het contact → **Chat exporteren**) →
**Media opnemen**. Stuur het `.zip`-bestand naar je computer en zet het op de pagina.

Een chat die zonder media is geëxporteerd is één `.txt`-bestand, en dat werkt ook.

## Grote exports

Exports van 100.000+ berichten en vele gigabytes werken hetzelfde: zet de map erop. De pagina toont wat er gebeurt:

1. **Map lezen…** telt de bestanden (de browser kan even nodig hebben om tienduizenden bestanden op te sommen).
2. **De chat gaat eerst.** De berichtenpagina's (of `result.json`, of het WhatsApp-`.txt`-bestand) worden geüpload en gelezen voordat de media komen. Als deze export **al is geïmporteerd**, stopt de import hier en opent hij die, en wordt er geen media geüpload. Past de media niet op de schijf, dan krijg je te horen hoeveel ruimte er nodig is voordat er iets groots wordt verzonden.
3. **Uploaden 1,2 GB van 3,4 GB (35%) · 9.000 van 30.905 bestanden**: de media volgen in kleine batches, één na de ander. De browser bouwt nooit één gigantisch verzoek, en een batch die afbreekt wordt apart opnieuw geprobeerd. Er is geen groottelimiet als je het op je eigen computer draait.
4. **Berichten lezen: pagina 37 van 121 · 36.000 berichten**: alle pagina's worden één keer gelezen, parallel.
5. **Media controleren** en **Media verplaatsen**: bestanden worden gehasht om duplicaten te vinden en verplaatst (niet twee keer gekopieerd) naar de datamap.
6. **Opslaan**, daarna opent het dialoogvenster *Nieuwe chat*.

Er draait maar één import tegelijk; een fout blijft zichtbaar in de dropzone en je kunt de map opnieuw kiezen.

In de [desktopapp](./desktop) gebeurt dit uploaden niet: de app leest de map, het `.zip`-bestand of het `.txt`-bestand waar het staat
(stappen 4 tot 6), wat sneller is en niet wordt gehinderd door de browserproblemen hieronder.

::: details Wanneer een bestand niet kan worden geüpload (browser)
Een bestand dat de browser niet meer kan lezen (verplaatst, gewijzigd, of een iCloud/OneDrive-plaatsaanduiding die niet is gedownload) wordt gevonden en overgeslagen, net als een enkel bestand dat zijn batch blijft breken: de batch wordt gesplitst tot dat bestand is geïsoleerd. Overgeslagen media verschijnt als ontbrekend in de chat; het bericht na de import noemt er één, en de browserconsole geeft ze allemaal. Als het chatbestand zelf niet kan worden verzonden, stopt de import en noemt hij het. Fouten laten zien wat de server heeft ontvangen, bijvoorbeeld `de server heeft 1.200 van 4.096 bytes ontvangen`, zodat een verbindings- van een browserprobleem gemakkelijk te onderscheiden is.
:::

Tijdens een import verlaat niets je computer en wordt er geen model aangeroepen. Media worden alleen beschreven als je in de mediabibliotheek op **Beschrijven** drukt.

Met `rooftop --import <map>` wordt de map op zijn plek gelezen en worden de bestanden gekopieerd, nooit verplaatst; de voortgang wordt gelogd.
Voor een enorme export op dezelfde computer is dit de snelste weg: geen upload en geen tweede kopie in een tijdelijke map.

## Wat wordt herkend

| Bron | Bestanden |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (gebruikt als een map geen `messages.html` heeft) |
| WhatsApp | `WhatsApp Chat with <naam>.txt` (Android) of `_chat.txt` (iOS), in een map, een `.zip` of alleen |

* **Telegram**: tekst met regeleinden, links, citaten en code; antwoorden en gedeeltelijke citaten; doorgestuurde berichten; bewerkingen; systeemberichten;
  reacties; linkvoorvertoningen; foto, video, ronde video, spraak, audio, bestand, sticker (`.webp`, `.webm`,
  `.tgs`), GIF, locatie, contact, poll en oproep.
* **WhatsApp**: Android- en iOS-indelingen, klokken van 12 en 24 uur en beide dag/maand-volgordes, per bestand gedetecteerd.
  Berichten over meerdere regels, bewerkingen en bijlagen blijven behouden. Verwijderde berichten en de versleutelingsmelding worden overgeslagen,
  en `<Media omitted>` wordt gemarkeerd als niet beschikbaar.

Mediabestanden worden gehasht, dus een sticker die vijf keer is verstuurd wordt één item in de bibliotheek (`stk_…`, `gif_…`, `pho_…`).

::: info Reacties in HTML-exports
HTML-exports vertellen niet wie heeft gereageerd. In één-op-één-chats wordt een reactie toegeschreven aan de andere deelnemer, en aan beiden als het aantal 2 is.
:::
