# Aus Telegram antworten

Ein Share-Link kann die Nachrichten seiner Besucher in eine Telegram-Gruppe posten. Du antwortest dort selbst, oder die KI antwortet, wenn
ein Countdown endet. Besucher sehen in beiden Fällen dasselbe „schreibt…“ und können nicht erkennen, wer geantwortet hat: ein Spiel „Mensch oder KI?“, oder ein
Support-Desk, an dem die KI die offensichtlichen Fragen übernimmt.

```
 Besucher ──▶ Share-Link ──▶ 🤖 Bot ──▶ deine Telegram-Gruppe
                                        ├─ ✍️ Antworten       du antwortest
                                        └─ 🤖 KI-Antwort (10 s) die KI antwortet sofort oder wenn der Countdown endet
```

## Einrichtung

**Einstellungen → Telegram** zeigt den Bot, ob er verbunden ist, und jede Gruppe, in der er ist.

| Modus | Einrichtung | Nachrichten gehen |
|---|---|---|
| **Geteilter Bot** | keine | über das Relay (iroof.top), im Klartext wie jeder Bot |
| **Eigener Bot** | erstelle einen mit [@BotFather](https://t.me/BotFather), füge das Token ein und **Verbinden** | direkt zwischen deiner App und Telegram |
| `TELEGRAM_BOT_TOKEN` | auf einem Server; `TELEGRAM_CHAT_ID` begrenzt die Gruppen | direkt; hat Vorrang vor den Einstellungen |

Drück dann **Zu einer Gruppe hinzufügen**:

1. Öffne den Link in der **Telegram-App**, in **Telegram Web**, oder scanne den QR-Code mit dem Telefon. Beide Links lassen sich kopieren.
2. Wähle eine Gruppe (oder erstelle eine) und bestätige.
3. Der Dialog wird grün, und die Gruppe erscheint in den Einstellungen und in jedem Share-Link.

Beim geteilten Bot trägt der Link einen einmaligen Code, der eine Stunde gültig ist und die Gruppe nur mit deiner App verknüpft.

Wähle zum Schluss die Gruppe unter **Telegram-Gruppe** in einem Share-Link und lege fest, nach wie vielen Sekunden die KI antwortet
(`0` = nur wenn du **KI-Antwort** drückst).

::: tip Datenschutz
Nur neue Besucher-Nachrichten und die Antworten der KI werden in die Gruppe gepostet, nie der exportierte Verlauf. Der Offline-Modus schaltet den
Bot aus. Details: [Offline & Datenschutz](../guide/offline#the-telegram-bot).
:::

::: tip Keine öffentliche Adresse nötig
Beide Bot-Arten nutzen Long Polling, daher funktioniert es auch von einem Laptop. Ein Bot-Token funktioniert jeweils nur in einer App.
:::

## Drei Arten zu antworten

1. Antworte auf die Aufforderung „✍️ … auf diese Nachricht antworten“ des Bots.
2. Antworte jederzeit auf die Nachricht des Besuchers (oder auf eine KI-Antwort), ohne **Antworten** zu drücken.
3. Drück **Antworten** und schreib einfach los. 15 Minuten lang gehen deine Nachrichten an diesen Besucher, und nach jeder
   Antwort noch 2 Minuten, sodass eine Antwort mehrere Nachrichten umfassen kann.

Die dritte Art braucht, dass der Bot normale Gruppennachrichten sieht: Schalte den Datenschutzmodus aus (@BotFather → `/setprivacy` → Disable, dann
den Bot erneut hinzufügen) oder mach ihn zum Admin. Die Arten 1 und 2 funktionieren immer.

::: warning Verwende eine Gruppe, der du vertraust
Jeder in der Gruppe kann antworten. Nur Textantworten werden weitergeleitet, und KI-Antworten zählen auf das Limit des Links.
:::
