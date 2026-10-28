# Einen Chat exportieren

<div class="wide">

![Telegram Desktop: Chat öffnen, oben rechts auf ⋯ klicken, Chatverlauf exportieren… wählen, dann Exportieren](/img/telegram-export.svg)

</div>

## Telegram

In **Telegram Desktop** (macOS, Windows, Linux): Chat öffnen → **⋯** → **Chatverlauf exportieren…** → **Exportieren**.

* Lass Fotos, Videos, Sprachnachrichten, Sticker und GIFs aktiviert: Die Person nutzt sie.
* Beide Formate funktionieren: **HTML** (`messages.html`) und maschinenlesbares **JSON** (`result.json`).
* Zieh den Exportordner oder eine `.zip` davon auf die Seite.

## WhatsApp

Auf dem Telefon: Chat öffnen → **⋮ → Mehr → Chat exportieren** (iPhone: auf den Kontaktnamen tippen → **Chat exportieren**) →
**Medien einbeziehen**. Schick die `.zip` an deinen Computer und zieh sie auf die Seite.

Ein ohne Medien exportierter Chat ist eine einzelne `.txt`, auch das funktioniert.

## Große Exporte

Exporte mit mehr als 100.000 Nachrichten und vielen Gigabyte funktionieren genauso: Ordner hineinziehen. Die Seite zeigt, was passiert:

1. **Ordner wird gelesen…** zählt die Dateien (der Browser kann bei zehntausenden einen Moment brauchen).
2. **Der Chat kommt zuerst.** Die Nachrichtenseiten (oder `result.json`, oder die WhatsApp-`.txt`) werden hochgeladen und gelesen, bevor Medien folgen. Ist dieser Export **bereits importiert**, endet der Import hier und öffnet ihn, und es werden keine Medien hochgeladen. Passen die Medien nicht auf die Festplatte, wird dir vorher gesagt, wie viel Platz nötig ist.
3. **Lade 1,2 GB von 3,4 GB hoch (35 %) · 9.000 von 30.905 Dateien**: Die Medien folgen in kleinen Stapeln, nacheinander. Der Browser baut nie eine riesige Anfrage, und ein abgebrochener Stapel wird einzeln erneut versucht. Auf deinem eigenen Computer gibt es kein Größenlimit.
4. **Nachrichten werden gelesen: Seite 37 von 121 · 36.000 Nachrichten**: Alle Seiten werden einmal, parallel gelesen.
5. **Medien werden geprüft** und **Medien werden verschoben**: Dateien werden gehasht, um Duplikate zu finden, und in den Datenordner verschoben (nicht zweimal kopiert).
6. **Speichern**, danach öffnet sich der Dialog *Neuer Chat*.

Es läuft immer nur ein Import gleichzeitig; ein Fehler bleibt in der Ablagezone sichtbar, und du kannst den Ordner neu wählen.

In der [Desktop-App](./desktop) findet dieses Hochladen nicht statt: Die App liest den Ordner, die `.zip` oder die `.txt` von dort, wo sie liegen
(Schritte 4 bis 6). Das ist schneller und von den Browserproblemen unten nicht betroffen.

::: details Wenn eine Datei nicht hochgeladen werden kann (Browser)
Eine Datei, die der Browser nicht mehr lesen kann (verschoben, geändert oder ein iCloud-/OneDrive-Platzhalter, der nicht heruntergeladen ist),
wird erkannt und übersprungen, ebenso eine einzelne Datei, die ihren Stapel immer wieder zum Abbruch bringt: Der Stapel wird geteilt, bis sie isoliert ist. Übersprungene Medien erscheinen im Chat als fehlend; die Meldung nach dem Import nennt eine davon, und die Browser-Konsole listet alle auf. Kann die Chatdatei selbst nicht gesendet werden, stoppt der Import und benennt sie. Fehler zeigen, was der Server empfangen hat,
z. B. `der Server hat 1.200 von 4.096 Bytes empfangen`, damit sich ein Verbindungs- von einem Browserproblem leicht unterscheiden lässt.
:::

Während eines Imports verlässt nichts deinen Computer und es wird kein Modell aufgerufen. Medien werden nur beschrieben, wenn du in der Medienbibliothek **Beschreiben** drückst.

Mit `rooftop --import <Ordner>` wird der Ordner an Ort und Stelle gelesen und seine Dateien werden kopiert, nie verschoben; der Fortschritt wird protokolliert.
Bei einem riesigen Export auf demselben Computer ist das der schnellste Weg: kein Upload und keine zweite Kopie in einem temporären Ordner.

## Was verstanden wird

| Quelle | Dateien |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (wird genutzt, wenn ein Ordner keine `messages.html` hat) |
| WhatsApp | `WhatsApp Chat with <Name>.txt` (Android) oder `_chat.txt` (iOS), in einem Ordner, einer `.zip` oder allein |

* **Telegram**: Text mit Zeilenumbrüchen, Links, Zitaten und Code; Antworten und Teilzitate; Weiterleitungen; Bearbeitungen; Dienstnachrichten;
  Reaktionen; Link-Vorschauen; Foto, Video, Videonachricht, Sprachnachricht, Audio, Datei, Sticker (`.webp`, `.webm`,
  `.tgs`), GIF, Standort, Kontakt, Umfrage und Anruf.
* **WhatsApp**: Android- und iOS-Layouts, 12- und 24-Stunden-Uhren sowie beide Tag/Monat-Reihenfolgen, pro Datei erkannt.
  Mehrzeilige Nachrichten, Bearbeitungen und Anhänge bleiben erhalten. Gelöschte Nachrichten und der Verschlüsselungshinweis werden übersprungen,
  und `<Media omitted>` wird als nicht verfügbar markiert.

Mediendateien werden gehasht, daher wird ein Sticker, das fünfmal gesendet wurde, zu einem Eintrag in der Bibliothek (`stk_…`, `gif_…`, `pho_…`).

::: info Reaktionen in HTML-Exporten
HTML-Exporte verraten nicht, wer reagiert hat. In Einzelchats wird eine Reaktion dem anderen Teilnehmer zugeordnet, und beiden, wenn die Anzahl 2 ist.
:::
