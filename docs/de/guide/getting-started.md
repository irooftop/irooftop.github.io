# Erste Schritte

## Installation {#install}

| | Befehl |
|---|---|
| **Desktop-App**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **Desktop-App**, Windows | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) oder [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **Desktop-App**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) oder [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Server**, macOS und Linux | `brew install irooftop/tap/rooftop` (danach `brew services start rooftop`) |
| **Server**, überall mit Rust ≥ 1.88 | `cargo install rooftop` |
| **Server**, Container | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

Die Desktop-App braucht kein Terminal: siehe [Desktop-App](./desktop).

## Ausführen

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # der Standard; jede OpenAI-kompatible API funktioniert
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # muss Tool-Aufrufe unterstützen
rooftop                                               # http://127.0.0.1:8080
```

Die Variablen können auch in einer `.env`-Datei neben dem Startverzeichnis von `rooftop` stehen oder später in den **Einstellungen** gesetzt werden.
**Testen** in den Einstellungen sendet eine winzige Anfrage und erklärt in einfachen Worten, was nicht stimmt, zum Beispiel
„openrouter.ai hat den API-Schlüssel abgelehnt (401)“.

Soll nichts deinen Computer verlassen? Verwende ein lokales Modell und den [Offline-Modus](./offline).

## Dein erster Chat

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Exportieren│ ──▶ │ 2. Auf die Seite   │ ──▶ │ 3. Neuer Chat: wer   │
 │ den Chat     │     │    ziehen          │     │ die KI spielt        │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Exportiere einen Chat](./export) aus Telegram Desktop oder WhatsApp.
2. Zieh den Ordner, die `.zip` oder die WhatsApp-`.txt` auf die Seite (oder starte mit `rooftop --import <Ordner>`).
3. Drück **Neuer Chat** und wähle die Person: die andere Person oder dich selbst („mit mir selbst in ihrem Stil chatten“).

::: tip Ohne eigene Chats ausprobieren
Das Repository enthält zwei fiktive Exporte in [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas und Priya kochen auf Telegram eine Lasagne, Sofia und Daniel verbringen auf WhatsApp ein Wochenende.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Kein Export? Starte mit Notizen

**Neuer Chat → Aus Notizen** braucht nur ihren Namen (deinen optional) und ein paar Zeilen über die Person: wer sie ist,
was ihr teilt, wie sie schreibt („nennt mich Schatz, kurze italienische Nachrichten, viele ❤️“). Die KI schreibt allein
aus diesen Notizen wie sie. Ohne Verlauf gibt es kein Stilprofil und keine Medienbibliothek, also gilt: Je mehr die Notizen über
die Schreibweise sagen, desto näher kommt es heran. Du kannst die Notizen jederzeit im Chat bearbeiten (✎) und den Chat wie jeden anderen per Link teilen.
Wenn du den Chat löschst, wird alles gelöscht, was er enthielt.

## Was im Fenster ist

| Schaltfläche | Was sie tut |
|---|---|
| **Teilen** | [Links](../features/share-links), mit denen Freunde mit der Person sprechen können |
| **Medienbibliothek** | Jeder Sticker, jedes GIF, Foto und jede Sprachnachricht mit dem, was die KI darüber weiß |
| **Notizen** | Dinge über die Person, die der Export nicht verrät. Die Person liest sie, Besucher nie |
| **`{ }`** | Das exakte JSON, das an das Modell geht, und die verbrauchten Tokens |
| **Neu schreiben** | Verwirft die letzte Antwort der Person und schreibt sie neu |
| **Sie schreiben zuerst lassen** | Die Person beginnt das Gespräch |
