---
layout: home

hero:
  name: iRoof.top
  text: Praat met de mensen die je mist
  tagline: Exporteer een Telegram- of WhatsApp-chat, en een LLM zet die voort in de stijl van iemand, met diens bubbels, stickers, GIF's, reacties en stem. Op je eigen computer, met elk model, en offline als je wilt.
  actions:
    - theme: brand
      text: Aan de slag
      link: /guide/getting-started
    - theme: alt
      text: Download de app
      link: /guide/desktop
    - theme: alt
      text: Zo werkt het
      link: /features/how-it-works

features:
  - title: Zijn stijl, niet alleen zijn woorden
    details: Een stijlprofiel uit de hele export, en elke bubbel, sticker, GIF, antwoord en reactie wordt aan het model opnieuw afgespeeld als toolaanroep.
    link: /features/how-it-works
    linkText: Zo werkt het
  - title: Privé, en offline als je wilt
    details: Chats blijven in je datamap. Met een lokaal model en de offlinemodus aan, weigert de app elk verzoek dat je computer zou verlaten.
    link: /guide/offline
    linkText: Offline en privacy
  - title: Jaren aan chats, gigabytes aan media
    details: Meer dan 120.000 berichten en 30.000 bestanden worden met live voortgang geïmporteerd. Een herhaalde import wordt herkend aan de berichten, voordat er media wordt geüpload.
    link: /guide/export#large-exports
    linkText: Grote exports
  - title: Foto's, stickers en stem
    details: Een mediabibliotheek die beschrijft wat er is verstuurd en spraak transcribeert, in de volgorde die je kiest, en op elk moment te stoppen.
    link: /features/media
    linkText: Foto's en stem
  - title: Deellinks
    details: Laat een vriend met de persona praten op /s/naam, met pincode en limieten, op je wifi of op naam.iroof.top.
    link: /features/share-links
    linkText: Deellinks
  - title: Antwoorden vanuit Telegram
    details: Berichten van bezoekers komen in je Telegram-groep. Antwoord zelf, of laat de AI antwoorden na een aftelling.
    link: /features/telegram
    linkText: Telegram
  - title: Elk model, elke MCP-server
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… plus MCP-tools via Streamable HTTP of stdio.
    link: /features/mcp
    linkText: MCP-tools
  - title: Niets verborgen
    details: Het exacte JSON naar het model is één klik verwijderd, met de grootte, het geschiedenisbudget en de gebruikte tokens.
    link: /guide/getting-started#what-s-in-the-window
    linkText: Wat er in het venster zit
  - title: Eén klein binair bestand
    details: Een Rust-server met de webinterface erin, desktopapps voor macOS, Windows en Linux, Homebrew en een Docker-image.
    link: /guide/getting-started
    linkText: Installeren
---

<div class="home-demo">

![Een chat gaat verder in de stijl van een echt mens, en dan opent een vriend de gedeelde link op zijn telefoon](/img/demo.svg)

</div>

## Binnen een minuut aan de slag

::: code-group

```sh [Desktopapp]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [Volledig offline]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Dan drie stappen: **[exporteer een chat](/guide/export)** uit Telegram Desktop of WhatsApp, **sleep** de map, het `.zip`- of `.txt`-bestand op de pagina en druk op **New chat** om te kiezen wie de AI speelt: de ander, of jijzelf.
Geen eigen chat bij de hand? Probeer de fictieve: `rooftop --import ./examples/telegram`.
(De knoppen van de app staan in het Engels, net als de app zelf.)

## Zo werkt het

<div class="wide">

![Een Telegram- of WhatsApp-export gaat naar iRoof.top, een LLM schrijft de antwoorden en de chat gaat verder](/how-it-works.svg)

</div>

De export wordt één keer op je eigen computer gelezen. Bij elk antwoord krijgt het model een systeemprompt met het stijlprofiel, je notities en de mediabeschrijvingen, daarna het meest recente deel van de chat dat past in het [geschiedenisbudget](/reference/configuration#settings-only). Oudere delen worden samengevat in een korte herinnering, en de persona kan die nog steeds doorzoeken. Het model antwoordt met toolaanroepen (`send_message`, `send_sticker`, `react`…), die bubbels, stickers en reacties worden. [Meer →](/features/how-it-works)

## Waar je chat naartoe gaat

| | Netwerk |
|---|---|
| Importeren, stijlprofiel, zoeken, opslag | geen: alles gebeurt op je eigen computer |
| Eén antwoord, een geheugensamenvatting | alleen het modeleindpunt dat je kiest, en niets anders |
| Media beschrijven, spraak transcriberen | het mediamodel, alleen als je op **Describe** drukt |
| Deellinks via internet, Telegram | alleen als je ze aanzet; de [offlinemodus](/guide/offline) zet ze uit |

## Vragen

::: details Welk model moet ik gebruiken?
Elk chatmodel met **toolaanroepen** achter een OpenAI-compatibel `/chat/completions`-eindpunt. Grotere modellen imiteren een stijl beter. Voor **Describe** in de mediabibliotheek moet het mediamodel ook afbeeldingen accepteren (en audio voor spraakberichten). **Test** in de instellingen vertelt in begrijpelijke taal wat er misgaat, zoals een geweigerde sleutel of een onbekend model.
:::

::: details Wat kost het?
Niets met een lokaal model. Met een cloudmodel betaal je je provider per token: een antwoord kost ongeveer één geschiedenisbudget aan invoer (standaard 120.000 tekens ≈ 34.000 tokens; de prompt is zo opgebouwd dat hij gecachet kan worden, dus providers met promptcaching rekenen het grootste deel tegen het gecachete tarief), plus een paar korte toolaanroepen. Verlaag het budget in de instellingen om minder per antwoord te betalen.
:::

::: details Moet mijn export klein zijn?
Nee. Exports met meer dan 120.000 berichten en 13 GB media importeren prima, vanuit de browser of met `rooftop --import <map>`. Zoeken en het geschiedenisbudget houden de promptgrootte van elk antwoord gelijk, hoe lang de chat ook is.
:::

::: details Kan een vriend met de persona praten?
Ja, met een [deellink](/features/share-links): op je wifi, of via internet op `naam.iroof.top`, met pincode en berichtlimieten. Bezoekers zien alleen de chat: geen instellingen, notities, prompts of andere chats.
:::

::: tip Een opmerking over zorg
Dit is bedoeld om dichtbij mensen te blijven die ver weg zijn. De persona blijft in haar rol, maar antwoordt eerlijk als je oprecht vraagt of je met een AI praat, en reageert zorgzaam als je in nood lijkt.
:::
