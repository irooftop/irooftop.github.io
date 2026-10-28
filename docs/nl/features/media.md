# Foto's en spraak

Sommige mensen sturen vooral foto's, andere praten vooral met spraakberichten. iRoof.top houdt beide gewoonten bij.

## Begrijpen

In de mediabibliotheek beschrijft **Beschrijven met AI** stickers, GIF's en foto's en **transcribeert spraakberichten** met het
*mediamodel*, dat afbeeldingen en audio moet accepteren. Stel het in bij Instellingen of met `OPENAI_MEDIA_MODEL`, bijvoorbeeld
`google/gemini-3.5-flash-lite` op OpenRouter. Beschrijvingen worden alleen gemaakt als je op de knop drukt, en met een lokaal
model en de [Offline-modus](../guide/offline) verlaten de foto's nooit je computer.

```text
<spraakbericht 0:05: «wat er gezegd is»>
```

Wanneer één soort overheerst, zegt het stijlprofiel dat, bijvoorbeeld "praat vooral met spraakberichten (10 van 10)".

### Grote bibliotheken

Een lange chat kan tienduizenden stickers, GIF's en foto's bevatten. De mediabibliotheek helpt je de tokens van het model
te besteden waar ze het meest uitmaken:

| Bediening | Wat het doet |
|---|---|
| Tabbladen per soort | Alle, Ontbrekend, Beschreven, Stickers, GIF's, Foto's, Video's, Spraak, met aantallen |
| Sorteren | meest gebruikt (standaard), minst gebruikt, recent gebruikt, het eerst gebruikt |
| Gebruiksaantal | verbergt items die minder dan 2, 3, 5, 10 of 25 keer zijn gebruikt |
| Zoeken | in beschrijvingen en id's |

**N beschrijven met AI** beschrijft precies wat wordt getoond en nog niet is beschreven, **van boven naar beneden in de gekozen volgorde**,
vier tegelijk. Elke beschrijving wordt opgeslagen zodra hij binnenkomt. De voortgangsregel toont hoeveel er klaar zijn, de fouten,
de snelheid en de resterende tijd. Dezelfde knop wordt **Stoppen**: je kunt op elk moment stoppen, en de volgende run gaat verder met de rest.
Een goed begin voor een grote chat: *Meest gebruikt eerst* en *Gebruikt 3 keer of meer*.

## Je spraakberichten

Met een leeg invoerveld wordt de verzendknop een **microfoon**, zoals in Telegram. De opname wordt in de browser naar WAV omgezet,
geüpload en getranscribeerd. Bezoekers van sharelinks kunnen ook opnemen.

::: info
Browsers staan opnemen alleen toe op `https://` of `localhost`.
:::

## De foto's en stem van de persoon

Verbind een MCP-server die afbeeldingen maakt en een die spreekt:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

De persoon krijgt dan twee extra acties:

| Actie | Wat het doet |
|---|---|
| `send_voice {text}` | roept de spraaktool aan (WAV, bij een fout opnieuw als mp3) en stuurt een spraakbericht |
| `send_photo {prompt, caption?}` | roept de afbeeldingstool aan en stuurt een foto |

* Met een verbonden spraaktool worden de getranscribeerde spraakberichten van de persoon zelf afgespeeld als `send_voice`, zodat het model de
  gewoonte ziet in de vorm die het kan voortzetten.
* **Stem** in *Chatdetails* (bijvoorbeeld `Puck`) geeft de persoon een eigen stem.
* Elk ander beeld of audio dat een MCP-tool teruggeeft, wordt chatmedia `gen_…` (gecontroleerd op inhoud, tot 25 MB, verwijderd
  met de chat).

::: tip Kosten
Elke foto of elk spraakbericht is een extra betaalde aanroep: ongeveer $0,01 per afbeelding met `meta/muse-image`, en een paar seconden TTS.
:::
