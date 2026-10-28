# Share-Links

**Teilen** im Chat-Kopf erstellt Links, mit denen andere Menschen mit der Person sprechen können, zum Beispiel:

* ein Freund beurteilt, wie gut die KI **in deinem Stil** schreibt;
* ein Freund spricht mit **einer Kopie seiner selbst**.

Ein Link ist `https://<dein Host>/s/<name>`. Besucher sehen nur den Chat: keine Seitenleiste, Einstellungen, Notizen, Medienbeschreibungen,
Prompt, Token-Verbrauch oder andere Chats.

## Optionen

| Option | Standard | |
|---|---|---|
| Wer ihn öffnen kann | dieser Computer | Schalter **WLAN** und **Internet**, direkt im Editor ([unten](#open-links-on-other-devices)) |
| Link | zufällig | wähle einen Namen wie `alex` |
| Anzeigename | Name der Person | die echten Namen aus dem Export werden nicht gezeigt |
| PIN | keine | 4–64 Zeichen, als Argon2id-Hash gespeichert. ✨ erzeugt 6 Ziffern |
| Unterhaltungen | privat | **Privat**: eine Unterhaltung pro Besucher. **Geteilter Raum**: alle in einer Unterhaltung |
| Besucher können den Export lesen | nichts | nichts, die letzten *N* Nachrichten, oder alles |
| Limits | 50 Besucher, 200 Antworten je Besucher | jede Antwort kostet Tokens von deinem Schlüssel. `0` = unbegrenzt |
| Besucher können sie schreiben lassen | aus | zeigt die Schaltfläche 💬: die Person sendet eine Nachricht, ohne dass der Besucher etwas schreibt |
| Besucher können eine Antwort neu schreiben lassen | aus | zeigt die Schaltfläche ↻: die letzte Antwort der Person wird neu geschrieben. Beides verbraucht eine Antwort des Limits, und der Server lehnt sie ab, solange sie aus sind |
| Läuft ab / aktiv | nie / an | einen Link pausieren oder ablaufen lassen, ohne ihn zu löschen |
| Telegram-Gruppe | aus | [aus Telegram antworten](./telegram) |

Im Teilen-Dialog kannst du jede Besucherunterhaltung **Lesen**, und mit **Beenden** widerrufen. Jeder Besucher zeigt
die Adresse, von der er zuletzt geschrieben hat; beim Beenden einer Unterhaltung hält **Auch sperren** diese Adresse vom Link fern
(Startseite, neue Unterhaltungen und bereits offene) bis du sie **entsperrst**. In einem gemeinsamen Netzwerk kann
eine Adresse mehrere Personen sein. Adressen werden nur auf deinem Computer beim Link gespeichert.

## Mit wem die Person spricht

Ein Besucher bist nicht du. Wenn Mia deinen Link öffnet, weiß die Person, dass **Mia** schreibt, dass der Link
von dir kommt und dass der Verlauf und deine Notizen von dir und ihnen handeln, nicht von Mia: Sie begegnet ihr
als jemandem Neuem. Ohne Namen ist sie einfach ein Gast.

| | Die Person sieht |
|---|---|
| Privater Link | eine Unterhaltung mit dem Besucher, unter dem Namen, den er angegeben hat (oder „Gast“) |
| Geteilter Raum | ein Gruppenchat: Jede Nachricht trägt den Namen ihres Absenders, und Leute können jederzeit beitreten |
| Dein Exportverlauf | deine Nachrichten unter deinem Namen, dann die des Besuchers, damit sie nie vermischt werden |

Der Systemprompt ist für jede Unterhaltung fest, damit die Anbieter ihn cachen: Der Name des Besuchers wird beim Start
der Unterhaltung festgelegt, und in einem Raum reisen die Namen mit den Nachrichten. Ein Besucher, der sich wie die Person oder wie du nennt,
wird z. B. zu „Alex (Gast)“, ein zweites „Ann“ in einem Raum wird „Ann 2“.

## Einladungen

| Link | Öffnet |
|---|---|
| `/s/alex` | die Startseite |
| `/s/alex#pin=2468` | den Chat sofort. Die PIN steht nach `#`, sodass sie nie den Server oder die Protokolle erreicht |
| `/s/alex#name=Greg&pin=2468` | dasselbe, mit dem ausgefüllten Namen des Besuchers (`?name=Greg` funktioniert auch) |

Die Schaltfläche **QR** eines Links öffnet einen Code zum Scannen mit dem Telefon, für jede Adresse, die funktioniert. Direkt nach dem Speichern
kopiert **Einladung mit PIN kopieren** den Link mit der PIN.

## Links auf anderen Geräten öffnen {#open-links-on-other-devices}

Auf einem Server verwenden Links einfach die Adresse des Servers. Die Desktop-App (und `rooftop` auf `127.0.0.1`) läuft nur auf
deinem Computer, daher haben der Teilen-Dialog und der Link-Editor zwei Schalter. Jeder zeigt, ob er **Aktiv**,
**Verbinde…** oder **Funktioniert nicht** ist, und der Editor zeigt sofort die Adresse, die der Link haben wird.

```
                    ┌──────────── dein Computer ────────────┐
 Telefon im WLAN ───▶│ :8737  nur Besucherseiten             │
                    │                                       │
 jeder ──▶ name.iroof.top ══ eine ausgehende WebSocket ══▶ App │
                    │                                       │
                    │ 127.0.0.1  Eigentümeroberfläche,      │
                    │            Einstellungen, API         │
                    └───────────────────────────────────────┘
```

| | WLAN und lokales Netz | Internet |
|---|---|---|
| Adresse | `http://<deine IP>:8737/s/<name>` | `https://<name>.iroof.top/s/<name>` |
| Wer | Geräte im selben Netzwerk | jeder, solange die App läuft |
| Wie | ein zweiter Listener, der nur Besucherseiten ausliefert | eine ausgehende WebSocket zum Relay; nichts lauscht im Internet |
| Deine Daten | bleiben auf deinem Computer | bleiben auf deinem Computer, aber Besucher-Nachrichten laufen über das Relay |

* Der WLAN-Port bleibt über Neustarts gleich, damit gedruckte QR-Codes weiter funktionieren. Erlaube unter macOS eingehende
  Verbindungen, wenn die Firewall fragt.
* Den Internet-Namen wählst und änderst du selbst (**Ändern** neben der Adresse). Das Relay leitet nur
  `/s/…`, `/api/s/…` und Seiten-Assets weiter, verwirft Cookies in beide Richtungen und zeigt eine Seite „offline“, solange die App geschlossen ist.
* Willst du ein eigenes Relay statt iroof.top? Siehe [Relay-Hub](../reference/relay-hub).
* Der **Offline-Modus** schaltet den Internet-Schalter ab und sperrt ihn; WLAN funktioniert weiter. Was das Relay sehen kann:
  [Offline & Datenschutz](../guide/offline#share-with-friends-safely).

## Schutz

| Schutz | Limit |
|---|---|
| Falsche PINs von einer IP | nach 5: 1 Min. gesperrt, dann 2, 4… bis 1 Std. |
| Falsche PINs auf einem Link, alle IPs | 20 in 15 Min.: 5 Min. gesperrt, verdoppelt bis 24 Std. |
| Nachrichten je Besucher | 30 pro Minute, 10 Antworten pro Minute |
| Neue Unterhaltungen | 20 pro Stunde je IP |

Die Zähler liegen im Speicher. Eine 6-stellige PIN lässt sich in vernünftiger Zeit nicht erraten. Hinter einem Reverse-Proxy setze
`ROOFTOP_TRUST_PROXY=true`, damit die Zähler die echten Client-IPs sehen.

Besuchersitzungen verwenden ein zufälliges 26-Zeichen-Token in `/s/<name>/<token>`, das der Browser merkt und das durch
`Referrer-Policy: no-referrer` nicht durchsickert. Besucher können nur die Medien laden, die sie sehen dürfen.
