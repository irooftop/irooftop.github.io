# Sharelinks

**Delen** in de chatkop maakt links zodat andere mensen met de persoon kunnen praten, bijvoorbeeld:

* een vriend beoordeelt hoe goed de AI **in jouw stijl** schrijft;
* een vriend praat met **een kopie van zichzelf**.

Een link is `https://<jouw host>/s/<naam>`. Bezoekers zien alleen de chat: geen zijbalk, instellingen, notities, mediabeschrijvingen,
prompt, tokengebruik of andere chats.

## Opties

| Optie | Standaard | |
|---|---|---|
| Wie hem kan openen | deze computer | de schakelaars **Wi‑Fi** en **Internet**, direct in de editor ([hieronder](#open-links-on-other-devices)) |
| Link | willekeurig | kies een naam zoals `alex` |
| Weergavenaam | naam van de persoon | de echte namen uit de export worden niet getoond |
| PIN | geen | 4–64 tekens, opgeslagen als Argon2id-hash. ✨ genereert 6 cijfers |
| Gesprekken | privé | **Privé**: één gesprek per bezoeker. **Gedeelde kamer**: iedereen in één gesprek |
| Bezoekers kunnen de export lezen | niets | niets, de laatste *N* berichten, of alles |
| Limieten | 50 bezoekers, 200 antwoorden elk | elk antwoord kost tokens van je sleutel. `0` = onbeperkt |
| Bezoekers kunnen laten schrijven | uit | toont de knop 💬: de persoon stuurt een bericht zonder dat de bezoeker iets schrijft |
| Bezoekers kunnen een antwoord herschrijven | uit | toont de knop ↻: het laatste antwoord van de persoon wordt opnieuw geschreven. Beide gebruiken een antwoord van de limiet, en de server weigert ze zolang ze uit staan |
| Verloopt / actief | nooit / aan | een link pauzeren of laten verlopen zonder hem te verwijderen |
| Telegram-groep | uit | [antwoorden vanuit Telegram](./telegram) |

In het deelvenster kun je elk bezoekersgesprek **Lezen**, en één **Beëindigen** om het in te trekken. Elke bezoeker toont
het adres waarvandaan hij het laatst schreef; bij het beëindigen van een gesprek houdt **Ook blokkeren** dat adres buiten de link
(de startpagina, nieuwe gesprekken en de al geopende) totdat je **Deblokkeren** kiest. Op een gedeeld netwerk
kan één adres meerdere mensen zijn. Adressen worden bij de link opgeslagen, alleen op je computer.

## Met wie de persoon praat

Een bezoeker ben jij niet. Wanneer Mia je link opent, weet de persoon dat **Mia** schrijft, dat de link
van jou komt, en dat de geschiedenis en jouw notities over jou en hen gaan, niet over Mia: ze ontmoet haar
als iemand nieuw. Zonder naam is ze gewoon een gast.

| | De persoon ziet |
|---|---|
| Privélink | één gesprek met de bezoeker, onder de naam die die opgaf (of "Gast") |
| Gedeelde kamer | een groepschat: elk bericht draagt de naam van de afzender, en mensen kunnen op elk moment aansluiten |
| Je exportgeschiedenis | jouw berichten onder jouw naam, dan die van de bezoeker, zodat ze nooit door elkaar lopen |

De systeemprompt is vast voor elk gesprek, zodat aanbieders hem cachen: de naam van de bezoeker wordt ingesteld
wanneer het gesprek begint, en in een kamer reizen de namen mee met de berichten. Een bezoeker die zich noemt als de persoon of als jij
wordt bijvoorbeeld "Alex (gast)", en een tweede "Ann" in een kamer wordt "Ann 2".

## Uitnodigingen

| Link | Opent |
|---|---|
| `/s/alex` | de startpagina |
| `/s/alex#pin=2468` | de chat meteen. De PIN staat na `#`, dus die bereikt nooit de server of de logs |
| `/s/alex#name=Greg&pin=2468` | hetzelfde, met de naam van de bezoeker al ingevuld (`?name=Greg` werkt ook) |

De knop **QR** van een link opent een code om met een telefoon te scannen, voor elk adres dat werkt. Direct na het opslaan
kopieert **Uitnodiging met PIN kopiëren** de link met de PIN.

## Links openen op andere apparaten {#open-links-on-other-devices}

Op een server gebruiken links gewoon het adres van de server. De desktopapp (en `rooftop` op `127.0.0.1`) draait alleen op
jouw computer, dus het deelvenster en de linkeditor hebben twee schakelaars. Elk laat zien of hij **Actief**,
**Verbinden** of **Werkt niet** is, en de editor toont meteen het adres dat de link zal hebben.

```
                    ┌──────────── jouw computer ────────────┐
 telefoon op Wi‑Fi ─▶│ :8737  alleen bezoekerspagina's       │
                    │                                       │
 iedereen ──▶ naam.iroof.top ══ één uitgaande WebSocket ══▶ app │
                    │                                       │
                    │ 127.0.0.1  eigenaarsinterface,        │
                    │            instellingen en API        │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi en lokaal netwerk | Internet |
|---|---|---|
| Adres | `http://<jouw IP>:8737/s/<naam>` | `https://<naam>.iroof.top/s/<naam>` |
| Wie | apparaten op hetzelfde netwerk | iedereen, zolang de app draait |
| Hoe | een tweede luisteraar die alleen bezoekerspagina's serveert | één uitgaande WebSocket naar de relay; niets luistert op internet |
| Je gegevens | blijven op je computer | blijven op je computer, maar berichten van bezoekers gaan via de relay |

* De Wi‑Fi-poort blijft bij herstarts hetzelfde, dus afgedrukte QR-codes blijven werken. Sta op macOS inkomende
  verbindingen toe als de firewall vraagt.
* De internetnaam kies en wijzig je zelf (**Wijzigen** naast het adres). De relay stuurt alleen
  `/s/…`, `/api/s/…` en paginabestanden door, gooit cookies in beide richtingen weg, en toont een "offline"-pagina terwijl de app dicht is.
* Wil je je eigen relay in plaats van iroof.top? Zie [Relayhub](../reference/relay-hub).
* De **Offline-modus** zet de internetschakelaar uit en vergrendelt hem; Wi‑Fi blijft werken. Wat de relay kan zien:
  [Offline en privacy](../guide/offline#share-with-friends-safely).

## Bescherming

| Bescherming | Limiet |
|---|---|
| Foute PINs van één IP | na 5: 1 min geblokkeerd, dan 2, 4… tot 1 u |
| Foute PINs op één link, alle IP's | 20 in 15 min: 5 min geblokkeerd, verdubbelt tot 24 u |
| Berichten per bezoeker | 30 per minuut, 10 antwoorden per minuut |
| Nieuwe gesprekken | 20 per uur per IP |

De tellers staan in het geheugen. Een 6-cijferige PIN is binnen een redelijke tijd niet te raden. Stel achter een reverse proxy
`ROOFTOP_TRUST_PROXY=true` in, zodat de tellers de echte client-IP's zien.

Bezoekerssessies gebruiken een willekeurig token van 26 tekens in `/s/<naam>/<token>`, dat de browser onthoudt en dat door
`Referrer-Policy: no-referrer` niet lekt. Bezoekers kunnen alleen de media laden die ze mogen zien.
