# Offline & Datenschutz

iRoof.top bewahrt deine Chats auf deinem Computer auf. Mit einem Modell, das ebenfalls auf deinem Computer läuft, **muss nichts ihn verlassen**.
Der **Offline-Modus** macht das zu einer Regel, die die App durchsetzt, statt zu einer Gewohnheit.

## Was lokal passiert

| Schritt | Wo es läuft | Netzwerk |
|---|---|---|
| Import, Parsen, das Stilprofil | dein Computer | keins |
| Speicherung | JSON-Dateien und Medien im Datenverzeichnis | keins |
| Suche im Verlauf, Share-Link-PINs, Medienbibliothek | dein Computer | keins |
| Fotos, Sticker, GIFs, Videos beschreiben | das **Medienmodell**, nur wenn du **Mit KI beschreiben** drückst | eine Anfrage pro Element an den Modell-Endpunkt |
| Sprache transkribieren | das Medienmodell, wenn du bei einer Sprachnachricht **Mit KI beschreiben** drückst oder eine aufnimmst | eine Anfrage an den Modell-Endpunkt |
| Eine Antwort | das **Chatmodell**, wenn du eine Nachricht sendest (oder ein Besucher) | Anfragen an den Modell-Endpunkt |
| Einen langen Verlauf verdichten | das Chatmodell, als Teil einer Antwort, wenn der Verlauf das Budget überschreitet | eine zusätzliche Anfrage an den Modell-Endpunkt |

Import ruft nie ein Modell auf. Der erste Aufruf passiert, wenn du eine Nachricht sendest, **Beschreiben** drückst oder eine
Sprachnachricht aufnimmst. Eine Antwort schickt dem Modell deinen exportierten Verlauf (bis zum [Verlaufsbudget](../reference/configuration#settings-only)),
das Stilprofil und die Medienbeschreibungen. **Wo das Modell läuft, entscheidet also, wohin dein Chat geht**: Ein Cloud-Endpunkt
bekommt ihn, ein Modell auf deinem Computer nicht.

## Nur offline betreiben

1. Installiere [Ollama](https://ollama.com) oder [LM Studio](https://lmstudio.ai), oder starte llama.cpps `llama-server`.
2. Lade ein **Chatmodell mit Tool-Unterstützung** und, falls du Fotos und Sticker beschrieben haben willst, ein **Vision-Modell** herunter.
3. Wähle in den **Einstellungen** Endpunkt und Modell und schalte dann **Offline** ein:

| Server | Basis-URL |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| llama.cpp `llama-server` | `http://localhost:8081/v1` (sein Standardport `8080` gehört iRoof.top: starte es mit `llama-server --port 8081`) |

4. Drück **Testen**. Es sendet eine winzige Anfrage und zeigt das Modell und den Host, die geantwortet haben. Du kannst das Netzwerk abschalten
   und weiter chatten.

Die **Desktop-App** wird in den Einstellungen eingerichtet. Sie liest weder deine Shell noch eine `.env`-Datei (siehe [Desktop-App](./desktop)),
respektiert aber `ROOFTOP_OFFLINE` und `OPENAI_*`, falls diese in der Umgebung stehen, mit der sie gestartet wurde. Ein Server
liest die Umgebung (und `.env`):

::: code-group

```sh [Homebrew / cargo-Server]
# --offline ist dasselbe wie ROOFTOP_OFFLINE=1
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

In Docker ist `localhost` der Container selbst, also verwende `host.docker.internal` (die Option `--add-host` ist nur unter Linux nötig).
Wenn Ollama die Verbindung ablehnt, lass es auf allen Schnittstellen lauschen (`OLLAMA_HOST=0.0.0.0`).

### Was der Offline-Modus durchsetzt

| | Offline-Modus |
|---|---|
| Chat, Verlaufszusammenfassung, Medienbeschreibung, Sprachtranskription | abgelehnt, außer der Endpunkt ist [lokal](#local-means) |
| MCP-Server über HTTP | abgelehnt, außer lokal; wird in den Einstellungen als Fehler angezeigt |
| Teilen über das Internet (`<name>.iroof.top`) | aus: der Relay-Client startet nicht, und der Schalter ist gesperrt |
| Telegram-Bot, eigener oder geteilter | wird nicht gestartet |
| GIFs per URL | die KI kann kein GIF von einer nicht-lokalen URL senden |
| Share-Links im WLAN | funktionieren |

Eine abgelehnte Anfrage scheitert, bevor überhaupt eine Verbindung aufgebaut wird, und die Meldung sagt warum: `Offline-Modus: https://openrouter.ai
ist kein lokaler Endpunkt`. Auch eine Weiterleitung von einem lokalen Endpunkt auf einen anderen Host wird abgelehnt. Ein kleines **Offline**-
Abzeichen sitzt im Seitenleisten-Kopf, solange der Modus aktiv ist. Die Einstellung wird gespeichert. `--offline` / `ROOFTOP_OFFLINE=1`
schalten ihn unabhängig von den Einstellungen ein, und die Einstellungen können ihn nicht ausschalten.

#### Lokal bedeutet {#local-means}

`localhost`, Loopback (`127.0.0.0/8`, `::1`), private Netzwerkadressen (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
Link-Local-Adressen und die Namen `*.local` und `*.internal` (etwa `host.docker.internal`). Ein Modell auf einem anderen
Computer in deinem Heimnetz zählt als lokal, weil es dein Netzwerk nie verlässt. Namen werden nach ihrer Schreibweise beurteilt,
sie werden nicht nachgeschlagen.

### Was der Offline-Modus nicht prüfen kann

* **stdio-MCP-Server** sind Programme auf deinem Computer. iRoof.top startet sie, kann aber nicht sehen, mit wem sie sich verbinden, also
  füge nur solche hinzu, denen du zutraust, lokal zu bleiben.
* **Sprachtranskription** nutzt die Chat-API (ein `input_audio`-Teil), nicht die Whisper-API `/audio/transcriptions`.
  Dafür braucht es einen lokalen Server und ein Modell, die dort Audio annehmen. Wenn deins das nicht tut, wird die Sprachnachricht trotzdem gespeichert
  und gesendet, nur ihr Text fehlt.
* **Bild- und Sprachgenerierung** gibt es nur als [MCP-Tools](../features/mcp). Verwende offline dafür einen lokalen MCP-Server.
* Die Personen, mit denen du teilst, öffnen deine WLAN-Links in ihren eigenen Browsern. Der Offline-Modus regelt diese App, nicht ihre Geräte.

## Sicher mit Freunden teilen {#share-with-friends-safely}

| Link | Was passiert |
|---|---|
| **WLAN** `http://<deine IP>:8737/s/<name>` | verlässt nie dein lokales Netzwerk |
| **Internet** `https://<name>.iroof.top/s/<name>` | die App öffnet eine ausgehende WebSocket-Verbindung zum Hub, der darüber die HTTP-Anfragen des Besuchers und die Antworten deiner App weiterleitet |

Bei einem Internet-Link bleiben dein Export, deine Chats und das Modell auf deinem Computer, und der Hub speichert keines davon.
Der Hub behält nur einen Kontodatensatz: deinen Namen, einen Hash deines Geheimnisses und wann er dich zuletzt gesehen hat.

Sei dir klar, was das *nicht* leistet. Der Hub beendet TLS, also sieht er wie jeder Reverse-Proxy technisch den Datenverkehr,
der durchläuft: was der Besucher eintippt, die Antworten der Person und den Verlauf, den der Link Besuchern zum Lesen erlaubt
(**Besucher können den Export lesen**, Standard **nichts**). Er leitet nur die Besucherseiten weiter (`/s/…`,
`/api/s/…`, Seiten-Assets) und verwirft Cookies in beide Richtungen; deine Eigentümeroberfläche und deine Einstellungen sind darüber nie erreichbar. Ist dir das zu viel
Vertrauen, nutze WLAN-Links oder [betreibe deinen eigenen Relay-Hub](../reference/relay-hub).
[Mehr zu Share-Links](../features/share-links).

Mit dem **Offline-Modus** ist das iroof.top-Relay aus. WLAN-Links funktionieren weiter.

## Der Telegram-Bot {#the-telegram-bot}

[Aus Telegram antworten](../features/telegram) postet in deine Gruppe:

* neue **Besucher-Nachrichten** (Name, Link-Name, Text oder ein Medienlabel mit Beschreibung oder Transkript sowie eine kurze
  Vorschau der Nachricht, auf die geantwortet wurde), und die **Antworten** der KI;
* nie den exportierten Verlauf. Alte Nachrichten werden nicht übertragen.

Bots haben keine Ende-zu-Ende-Verschlüsselung: Der Text läuft im Klartext über Telegram. Beim **geteilten Bot** läuft er auch
über den Hub, der nur speichert, welche Gruppe zu welchem Konto gehört. Ein **eigener Bot** spricht direkt mit
Telegram, ohne den Hub. Der Offline-Modus schaltet beides ab.

## Wohin deine Daten gehen

| Daten | Wohin sie gehen |
|---|---|
| Exporte, Chats, Einstellungen, API-Schlüssel | das Datenverzeichnis auf deinem Computer |
| Import und Stilprofil | nirgendwohin |
| Verlauf, Stilprofil, deine Nachrichten | der von dir gewählte Modell-Endpunkt, bei jeder Antwort |
| Fotos und Sprache | der Medienmodell-Endpunkt, bei **Beschreiben** oder wenn du eine Sprachnachricht aufnimmst |
| Besucher-Nachrichten über einen WLAN-Link | dein Computer und dein Modell-Endpunkt |
| Besucher-Nachrichten über einen Internet-Link | der Hub (auf dem Weg), dein Computer, dein Modell-Endpunkt |
| Besucher-Nachrichten mit Telegram | zusätzlich Telegram, und der Hub beim geteilten Bot |
| Offline-Modus | nur lokaler Modell-Endpunkt, nur WLAN-Links, kein Telegram |
