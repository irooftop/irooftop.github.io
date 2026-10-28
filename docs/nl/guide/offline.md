# Offline en privacy

iRoof.top bewaart je chats op je computer. Met een model dat ook op je computer draait, **hoeft er niets je computer te verlaten**.
De **Offline-modus** maakt daar een regel van die de app afdwingt, geen gewoonte.

## Wat er lokaal gebeurt

| Stap | Waar het draait | Netwerk |
|---|---|---|
| Import, verwerking, het stijlprofiel | je computer | geen |
| Opslag | JSON-bestanden en media in de datamap | geen |
| Zoeken in de geschiedenis, share-link-PINs, de mediabibliotheek | je computer | geen |
| Foto's, stickers, GIF's, video's beschrijven | het **mediamodel**, alleen als je op **Beschrijven met AI** drukt | één verzoek per item naar het modelendpoint |
| Spraak transcriberen | het mediamodel, als je op een spraakbericht **Beschrijven met AI** drukt of er een opneemt | één verzoek naar het modelendpoint |
| Een antwoord | het **chatmodel**, als je een bericht stuurt (of een bezoeker) | verzoeken naar het modelendpoint |
| Een lange geschiedenis samenvatten | het chatmodel, als onderdeel van een antwoord, wanneer de geschiedenis het budget overschrijdt | één extra verzoek naar het modelendpoint |

Importeren roept nooit een model aan. De eerste aanroep gebeurt wanneer je een bericht stuurt, op **Beschrijven** drukt of een
spraakbericht opneemt. Een antwoord stuurt het model je geëxporteerde geschiedenis (tot het [geschiedenisbudget](../reference/configuration#settings-only)),
het stijlprofiel en de mediabeschrijvingen. **Waar het model draait, bepaalt dus waar je chat naartoe gaat**: een cloudendpoint
krijgt hem, een model op je computer niet.

## Volledig offline werken

1. Installeer [Ollama](https://ollama.com) of [LM Studio](https://lmstudio.ai), of draai `llama-server` van llama.cpp.
2. Download een **chatmodel dat tool calling ondersteunt**, en een **visionmodel** als je wilt dat foto's en stickers worden beschreven.
3. Kies in **Instellingen** het endpoint en het model, en zet daarna **Offline** aan:

| Server | Basis-URL |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| llama.cpp `llama-server` | `http://localhost:8081/v1` (de standaardpoort `8080` is die van iRoof.top: start hem met `llama-server --port 8081`) |

4. Druk op **Testen**. Er wordt een klein verzoek gestuurd en getoond welk model en welke host hebben geantwoord. Je kunt het netwerk uitzetten en gewoon doorchatten.

De **desktopapp** wordt ingesteld in Instellingen. Hij leest je shell of een `.env`-bestand niet (zie [Desktopapp](./desktop)),
maar hij respecteert `ROOFTOP_OFFLINE` en `OPENAI_*` als die in de omgeving staan waarmee hij is gestart. Een server
leest de omgeving (en `.env`):

::: code-group

```sh [Homebrew / cargo-server]
# --offline is hetzelfde als ROOFTOP_OFFLINE=1
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=llama3.1 rooftop --offline
```

```sh [Docker]
docker run -p 8080:8080 -v rooftop-data:/data \
  --add-host=host.docker.internal:host-gateway \
  -e ROOFTOP_OFFLINE=1 \
  -e OPENAI_BASE_URL=http://host.docker.internal:11434/v1 -e OPENAI_MODEL=llama3.1 \
  ghcr.io/irooftop/rooftop
```

:::

In Docker is `localhost` de container zelf, gebruik dus `host.docker.internal` (de optie `--add-host` is alleen op Linux nodig).
Als Ollama de verbinding weigert, laat het op alle interfaces luisteren (`OLLAMA_HOST=0.0.0.0`).

### Wat de Offline-modus afdwingt

| | Offline-modus |
|---|---|
| Chat, geschiedenissamenvatting, mediabeschrijving, spraaktranscriptie | geweigerd, tenzij het endpoint [lokaal](#local-means) is |
| MCP-servers via HTTP | geweigerd tenzij lokaal; wordt als fout getoond in Instellingen |
| Delen via internet (`<naam>.iroof.top`) | uit: de relayclient start niet en de schakelaar is vergrendeld |
| Telegram-bot, eigen of gedeeld | niet gestart |
| GIF's via URL | de AI kan geen GIF sturen van een niet-lokale URL |
| Wi‑Fi-sharelinks | werken |

Een geweigerd verzoek mislukt voordat er verbinding wordt gemaakt, en het bericht zegt waarom: `Offline-modus: https://openrouter.ai
is geen lokaal endpoint`. Ook een doorverwijzing van een lokaal endpoint naar een andere host wordt geweigerd. Een klein **Offline**-
badge staat in de kop van de zijbalk zolang de modus aan staat. De instelling wordt opgeslagen. `--offline` / `ROOFTOP_OFFLINE=1` zetten hem aan, ongeacht Instellingen, en Instellingen kunnen hem niet uitzetten.

#### Lokaal betekent {#local-means}

`localhost`, loopback (`127.0.0.0/8`, `::1`), privénetwerkadressen (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
link-local-adressen, en de namen `*.local` en `*.internal` (zoals `host.docker.internal`). Een model op een andere
computer in je thuisnetwerk telt als lokaal, omdat het je netwerk nooit verlaat. Namen worden beoordeeld op hoe ze
geschreven zijn, ze worden niet opgezocht.

### Wat de Offline-modus niet kan controleren

* **stdio-MCP-servers** zijn programma's op je computer. iRoof.top start ze, maar kan niet zien waarmee ze verbinding maken,
  dus voeg alleen toe wat je vertrouwt om lokaal te blijven.
* **Spraaktranscriptie** gebruikt de chat-API (een `input_audio`-deel), niet de Whisper-API `/audio/transcriptions`.
  Daarvoor is een lokale server en een model nodig die daar audio accepteren. Als die dat niet doet, wordt het spraakbericht wel opgeslagen en
  verstuurd; alleen de tekst ervan ontbreekt.
* **Beeld- en spraakgeneratie** bestaat alleen als [MCP-tools](../features/mcp). Gebruik offline daarvoor een lokale MCP-server.
* De mensen met wie je deelt openen je Wi‑Fi-links in hun eigen browsers. De Offline-modus geldt voor deze app, niet voor hun apparaten.

## Veilig delen met vrienden {#share-with-friends-safely}

| Link | Wat er gebeurt |
|---|---|
| **Wi‑Fi** `http://<je IP>:8737/s/<naam>` | verlaat nooit je lokale netwerk |
| **Internet** `https://<naam>.iroof.top/s/<naam>` | de app opent één uitgaande WebSocket-verbinding met de hub, die daarover de HTTP-verzoeken van de bezoeker en de antwoorden van je app doorstuurt |

Met een internetlink blijven je export, je chats en het model op je computer, en slaat de hub er geen op.
De hub bewaart alleen een accountgegeven: je naam, een hash van je geheim en wanneer hij je voor het laatst zag.

Wees eerlijk over wat dit *niet* geeft. De hub beëindigt TLS, dus net als elke reverse proxy ziet hij technisch het verkeer dat erdoor gaat:
wat de bezoeker typt, de antwoorden van de persoon, en de geschiedenis die de link bezoekers laat lezen
(**Bezoekers kunnen de export lezen**, standaard **niets**). Hij stuurt alleen de bezoekerspagina's door (`/s/…`,
`/api/s/…`, paginabestanden) en gooit cookies in beide richtingen weg; je eigenaarsinterface en instellingen zijn er nooit bereikbaar. Is dat te veel vertrouwen, gebruik dan Wi‑Fi-links, of [draai je eigen relayhub](../reference/relay-hub).
[Meer over sharelinks](../features/share-links).

Met de **Offline-modus** staat de iroof.top-relay uit. Wi‑Fi-links blijven werken.

## De Telegram-bot {#the-telegram-bot}

[Antwoorden vanuit Telegram](../features/telegram) plaatst in je groep:

* nieuwe **berichten van bezoekers** (naam, linknaam, tekst, of een medialabel met de beschrijving of transcriptie, en een korte
  voorvertoning van het bericht waarop ze antwoorden), en de **antwoorden** van de AI;
* nooit de geëxporteerde geschiedenis. Oude berichten worden niet verzonden.

Bots hebben geen end-to-endversleuteling: de tekst gaat in platte tekst via Telegram. Met de **gedeelde bot** gaat hij ook
via de hub, die alleen bewaart welke groep bij welk account hoort. Een **eigen bot** praat rechtstreeks met
Telegram, zonder de hub. De Offline-modus zet beide uit.

## Waar je gegevens naartoe gaan

| Gegevens | Waar ze naartoe gaan |
|---|---|
| Exports, chats, instellingen, API-sleutel | de datamap op je computer |
| Import en stijlprofiel | nergens naartoe |
| Geschiedenis, stijlprofiel, je berichten | het modelendpoint dat je koos, bij elk antwoord |
| Foto's en spraak | het mediamodelendpoint, bij **Beschrijven** of als je een spraakbericht opneemt |
| Berichten van bezoekers op een Wi‑Fi-link | je computer en je modelendpoint |
| Berichten van bezoekers op een internetlink | de hub (onderweg), je computer, je modelendpoint |
| Berichten van bezoekers met Telegram | daarnaast Telegram, en de hub voor de gedeelde bot |
| Offline-modus | alleen het lokale modelendpoint, alleen Wi‑Fi-links, geen Telegram |
