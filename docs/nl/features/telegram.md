# Antwoorden vanuit Telegram

Een sharelink kan de berichten van zijn bezoekers in een Telegram-groep plaatsen. Je antwoordt daar zelf, of de AI antwoordt wanneer
een aftelling afloopt. Bezoekers zien in beide gevallen hetzelfde "typt…" en kunnen niet zien wie er heeft geantwoord: een spel "mens of AI?", of een
helpdesk waar de AI de voor de hand liggende vragen afhandelt.

```
 bezoeker ──▶ sharelink ──▶ 🤖 bot ──▶ je Telegram-groep
                                        ├─ ✍️ Antwoorden       jij antwoordt
                                        └─ 🤖 AI-antwoord (10 s) de AI antwoordt nu, of wanneer de aftelling eindigt
```

## Instellen

**Instellingen → Telegram** toont de bot, of hij verbonden is, en elke groep waarin hij zit.

| Modus | Instelling | Berichten gaan |
|---|---|---|
| **Gedeelde bot** | geen | via de relay (iroof.top), in platte tekst zoals elke bot |
| **Eigen bot** | maak er een aan bij [@BotFather](https://t.me/BotFather), plak het token en **Verbinden** | rechtstreeks tussen je app en Telegram |
| `TELEGRAM_BOT_TOKEN` | op een server; `TELEGRAM_CHAT_ID` beperkt de groepen | rechtstreeks; wint van Instellingen |

Druk daarna op **Toevoegen aan een groep**:

1. Open de link in de **Telegram-app**, in **Telegram Web**, of scan de QR-code met je telefoon. Beide links kunnen worden gekopieerd.
2. Kies een groep (of maak er een) en bevestig.
3. Het dialoogvenster wordt groen, en de groep verschijnt in Instellingen en in elke sharelink.

Met de gedeelde bot bevat de link een eenmalige code, een uur geldig, die de groep alleen aan jouw app koppelt.

Kies ten slotte de groep onder **Telegram-groep** in een sharelink, en stel in na hoeveel seconden de AI antwoordt
(`0` = alleen wanneer je op **AI-antwoord** drukt).

::: tip Privacy
Alleen nieuwe berichten van bezoekers en de antwoorden van de AI worden in de groep geplaatst, nooit de geëxporteerde geschiedenis. De Offline-modus zet de
bot uit. Details: [Offline en privacy](../guide/offline#the-telegram-bot).
:::

::: tip Geen openbaar adres nodig
Beide soorten bots gebruiken long polling, dus dit werkt ook vanaf een laptop. Een bottoken werkt in één app tegelijk.
:::

## Drie manieren om te antwoorden

1. Antwoord op de prompt "✍️ … antwoord op dit bericht" van de bot.
2. Antwoord op het bericht van de bezoeker (of op een AI-antwoord) op elk moment, zonder op **Antwoorden** te drukken.
3. Druk op **Antwoorden** en typ gewoon. Gedurende 15 minuten gaan je berichten naar die bezoeker, en nog 2 minuten na elk
   antwoord, zodat een antwoord uit meerdere berichten kan bestaan.

De derde manier vereist dat de bot gewone groepsberichten ziet: zet de privacymodus uit (@BotFather → `/setprivacy` → Disable, en voeg de
bot daarna opnieuw toe) of maak hem beheerder. Manier 1 en 2 werken altijd.

::: warning Gebruik een groep die je vertrouwt
Iedereen in de groep kan antwoorden. Alleen tekstantwoorden worden doorgestuurd, en AI-antwoorden tellen mee voor de limiet van de link.
:::
