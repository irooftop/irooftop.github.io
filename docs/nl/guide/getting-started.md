# Aan de slag

## Installatie {#install}

| | Opdracht |
|---|---|
| **Desktopapp**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **Desktopapp**, Windows | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) of [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **Desktopapp**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) of [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Server**, macOS en Linux | `brew install irooftop/tap/rooftop` (daarna `brew services start rooftop`) |
| **Server**, overal met Rust ≥ 1.88 | `cargo install rooftop` |
| **Server**, container | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

De desktopapp heeft geen terminal nodig: zie [Desktopapp](./desktop).

## Uitvoeren

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # de standaard; elke OpenAI-compatibele API werkt
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # moet tool calling ondersteunen
rooftop                                               # http://127.0.0.1:8080
```

De variabelen kunnen ook in een `.env`-bestand staan naast de map waarin je `rooftop` start, of later worden ingesteld in **Instellingen**.
**Testen** in Instellingen stuurt een klein verzoek en vertelt in gewone woorden wat er misgaat, bijvoorbeeld
"openrouter.ai heeft de API-sleutel geweigerd (401)".

Wil je dat er niets je computer verlaat? Gebruik een lokaal model en de [Offline-modus](./offline).

## Je eerste chat

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Exporteren│ ──▶ │ 2. Op de pagina    │ ──▶ │ 3. Nieuwe chat: kies │
 │ de chat      │     │    zetten          │     │ wie de AI speelt     │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Exporteer een chat](./export) uit Telegram Desktop of WhatsApp.
2. Zet de map, het `.zip`-bestand of het WhatsApp-`.txt`-bestand op de pagina (of start met `rooftop --import <map>`).
3. Druk op **Nieuwe chat** en kies de persoon: de ander, of jezelf ("met mezelf chatten in mijn stijl").

::: tip Probeer het zonder je eigen chats
De repository bevat twee fictieve exports in [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas en Priya koken lasagne op Telegram, Sofia en Daniel brengen een weekend door op WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Geen export? Begin met notities

**Nieuwe chat → Uit notities** heeft alleen hun naam nodig (die van jou is optioneel) en een paar regels over hen: wie ze zijn,
wat jullie delen, hoe ze schrijven ("noemt me schatje, korte Italiaanse berichtjes, veel ❤️"). De AI schrijft alleen aan de hand
van die notities als zij. Zonder geschiedenis is er geen stijlprofiel en geen mediabibliotheek, dus hoe meer de notities zeggen over
hoe ze schrijven, hoe dichter het in de buurt komt. Je kunt de notities op elk moment in de chat bewerken (✎), en de chat delen via een link zoals elke andere. Een chat verwijderen verwijdert alles wat erin zat.

## Wat er in het venster zit

| Knop | Wat hij doet |
|---|---|
| **Delen** | [Links](../features/share-links) waarmee vrienden met de persoon kunnen praten |
| **Mediabibliotheek** | Elke sticker, GIF, foto en spraakbericht met wat de AI erover weet |
| **Notities** | Dingen over de persoon die de export niet vertelt. De persoon leest ze, bezoekers nooit |
| **`{ }`** | De exacte JSON die naar het model gaat, en de gebruikte tokens |
| **Opnieuw schrijven** | Verwijdert het laatste antwoord van de persoon en schrijft het opnieuw |
| **Laat hen eerst schrijven** | De persoon begint het gesprek |
