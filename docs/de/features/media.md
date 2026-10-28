# Fotos & Sprache

Manche Menschen schicken vor allem Fotos, andere reden vor allem in Sprachnachrichten. iRoof.top bewahrt beide Gewohnheiten.

## Sie verstehen

In der Medienbibliothek beschreibt **Mit KI beschreiben** Sticker, GIFs und Fotos und **transkribiert Sprachnachrichten** mit dem
*Medienmodell*, das Bilder und Audio annehmen muss. Stelle es in den Einstellungen oder mit `OPENAI_MEDIA_MODEL` ein, zum Beispiel
`google/gemini-3.5-flash-lite` bei OpenRouter. Beschreibungen entstehen nur, wenn du den Knopf drückst, und mit einem lokalen
Modell und dem [Offline-Modus](../guide/offline) verlassen die Fotos nie deinen Computer.

```text
<Sprachnachricht 0:05: «was gesagt wurde»>
```

Wenn eine Art dominiert, sagt das Stilprofil es, z. B. „redet meist in Sprachnachrichten (10 von 10)“.

### Große Bibliotheken

Ein langer Chat kann Zehntausende Sticker, GIFs und Fotos enthalten. Die Medienbibliothek hilft dir, die Tokens des Modells dort
auszugeben, wo sie zählen:

| Bedienelement | Was es tut |
|---|---|
| Art-Reiter | Alle, Fehlend, Beschrieben, Sticker, GIFs, Fotos, Videos, Sprache, mit Anzahl |
| Sortierung | am häufigsten genutzt (Standard), am seltensten, zuletzt genutzt, zuerst genutzt |
| Nutzungsanzahl | blendet Elemente aus, die weniger als 2, 3, 5, 10 oder 25 Mal genutzt wurden |
| Suche | in Beschreibungen und IDs |

**N mit KI beschreiben** beschreibt genau das, was angezeigt und noch nicht beschrieben ist, **von oben nach unten in der gewählten Reihenfolge**,
vier auf einmal. Jede Beschreibung wird gespeichert, sobald sie eintrifft. Die Fortschrittszeile zeigt, wie viele fertig sind, Fehler,
die Geschwindigkeit und die verbleibende Zeit. Derselbe Knopf wird zu **Stopp**: Du kannst jederzeit anhalten, und der nächste Lauf macht
mit dem Rest weiter. Ein guter Start für einen großen Chat: *Meistgenutzte zuerst* und *3 oder mehr Nutzungen*.

## Deine Sprachnachrichten

Bei leerem Eingabefeld wird der Senden-Knopf zu einem **Mikrofon**, wie bei Telegram. Die Aufnahme wird im Browser in WAV umgewandelt, hochgeladen und transkribiert. Besucher von Share-Links können ebenfalls aufnehmen.

::: info
Browser erlauben Aufnahmen nur auf `https://` oder `localhost`.
:::

## Die Fotos und Sprache der Person

Verbinde einen MCP-Server, der Bilder erzeugt, und einen, der spricht:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

Die Person erhält dann zwei weitere Aktionen:

| Aktion | Was sie tut |
|---|---|
| `send_voice {text}` | ruft das Sprach-Tool auf (WAV, bei Fehler erneut als mp3) und sendet eine Sprachnachricht |
| `send_photo {prompt, caption?}` | ruft das Bild-Tool auf und sendet ein Foto |

* Mit einem verbundenen Sprach-Tool werden die transkribierten Sprachnachrichten der Person selbst als `send_voice` wiedergegeben, damit das Modell
  die Gewohnheit in der Form sieht, die es fortsetzen kann.
* **Stimme** in *Chat-Details* (z. B. `Puck`) gibt der Person ihre eigene Stimme.
* Jedes andere Bild oder Audio, das ein MCP-Tool zurückgibt, wird zu Chat-Medium `gen_…` (nach Inhalt geprüft, bis 25 MB, und mit dem Chat gelöscht).

::: tip Kosten
Jedes Foto oder jede Sprachnachricht ist ein zusätzlicher kostenpflichtiger Aufruf: etwa 0,01 $ pro Bild mit `meta/muse-image`, und ein paar Sekunden TTS.
:::
