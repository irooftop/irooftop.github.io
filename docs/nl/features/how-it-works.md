# Hoe het werkt

<div class="wide">

![Hoe iRoof.top werkt](/how-it-works.svg)

</div>

Elke export wordt dezelfde genormaliseerde berichten. Daarna wordt elke handeling van de persoon als een **tool call** aan het model
herhaald, zodat het leert *hoe* de persoon omgaat met anderen, niet alleen wat die schrijft, en op dezelfde manier antwoordt.

## Handelingen als tool calls

| Wat de persoon deed | Tool call in de geschiedenis en in live antwoorden |
|---|---|
| tekstbubbel, misschien een antwoord of een gedeeltelijk citaat | `send_message {text, reply_to?, quote?}` |
| sticker | `send_sticker {sticker_id, reply_to?}` |
| GIF uit de bibliotheek, of een URL van een MCP-tool | `send_gif {gif_id \| url, caption?}` |
| foto, video, spraak, audio, bestand | `send_media {media_id, caption?}` |
| doorgestuurd bericht | `forward_message {message_id}` |
| reactie | `react {message_id, emoji}` |
| *(oudere geschiedenis ophalen)* | `search_history {query}` |

Meerdere calls in één beurt worden meerdere bubbels. De berichten van de andere kant worden compacte regels waarnaar de id's verwijzen:

```text
#52108 19:08 ↩ antwoord op #52107 (jij: "oma's lasagne 🍝"): Je hebt nog nooit lasagne gemaakt.
<sticker stk_156dbb381a>: een kat met een koksmuts die in een pan roert
reageerde 😂 op #52107 ("oma's lasagne 🍝")
```

## De systeemprompt

| Onderdeel | |
|---|---|
| Wie te zijn | de kennis en stijl van de persoon inschatten, en nooit meer weten dan zij zouden weten |
| Stijlprofiel | uit de *hele* export: berichtlengte, hoofdletters, leestekens, gebruik van emoji en stickers, antwoord- en reactiegewoonten, bubbels per beurt, letterlijke voorbeelden |
| Bibliotheek | stickers, GIF's en media met hoe ze zijn gebruikt |
| Notities | wat je over de persoon hebt geschreven |

De prompt is voor een chat **statisch**: geen klok, geen tellers. Het model leest de tijd uit de `— dag —`-scheidingen
en de `HH:MM`-tijdstempels, en elk verzoek is een byte-identiek voorvoegsel van het volgende, zodat de promptcaches van de aanbieders blijven treffen.

## Lange chats {#long-chats}

```
 geschiedenisbudget ───────────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ geheugen (≤ 350 w.)  │ recente beurten, afgekapt op 60 %      │
 └──────────────────────┴────────────────────────────────────────┘
   relatie, feiten,       het afkappunt blijft lang staan,
   onderwerpen, grapjes   dus het gecachete voorvoegsel ook
```

Wanneer de herhaalde geschiedenis het budget overschrijdt, vouwt het volgende antwoord eerst de oudste beurten (en het vorige geheugen)
samen tot een korte samenvatting. Er wordt niets uitgegeven bij het importeren of bij het openen van een chat. Het stijlprofiel komt nog steeds uit de hele
export, en `search_history` bereikt elk oud bericht. De `usage` van tokens (prompt, cache, voltooiing) wordt getoond in `{ }`.

## Mediabibliotheek

Het chatmodel leest tekst, dus een sticker is alleen `<sticker stk_…>` totdat hij is beschreven. **Beschrijven met AI** stuurt
de afbeeldingen van de ontbrekende items naar het mediamodel, dat visie moet ondersteunen.

* GIF's, videostickers en video's gaan als **4 frames in volgorde**, zodat het model de beweging ziet. Dit vereist
  [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`), anders wordt de miniatuur gebruikt.
* **Opnieuw** beschrijft één item opnieuw. Elke beschrijving kan met de hand worden bewerkt.
* Beschrijvingen horen bij de export en gelden voor al zijn chats.

Bekijk het zelf met de [CLI](../reference/cli): `rooftop convert <export> --persona "Jonas Weber"`.
