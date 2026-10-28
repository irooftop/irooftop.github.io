# Eine unsignierte App öffnen

Die Desktop-Installer sind noch nicht signiert oder notarisiert, daher zeigt der erste Start unter macOS und Windows eine Warnung.
Das ist ein einmaliger Schritt: Nachdem du die App einmal freigegeben hast, öffnet sie sich normal, auch nach Updates, die auf dieselbe Weise installiert wurden.

::: tip Lieber nicht?
[Baue die App selbst](./desktop#build-it-yourself), oder betreibe den [Server](./getting-started#install) und nutze ihn im
Browser: `brew install irooftop/tap/rooftop`, `cargo install rooftop` oder [Docker](./docker).
:::

## macOS

![Eine nicht verifizierte App unter macOS öffnen: die Warnung „Nicht geöffnet“, Fertig, Systemeinstellungen, Datenschutz & Sicherheit, Dennoch öffnen, das Passwort, und die App öffnet sich](/how-to-open-an-unsigned-app-on-macos.svg)

Unter macOS 15 Sequoia und neuer:

1. Öffne **iRoof.top**. macOS meldet *„iRoof.top“ nicht geöffnet: Apple konnte nicht überprüfen…*. Klicke auf **Fertig**.
2. Öffne das **Apple-Menü → Systemeinstellungen… → Datenschutz & Sicherheit**.
3. Scrolle zu **Sicherheit**: *„iRoof.top“ wurde blockiert, um deinen Mac zu schützen*. Klicke auf **Dennoch öffnen**.
4. Bestätige mit **Dennoch öffnen**, und gib dein Passwort ein oder nutze Touch ID.

Die Schaltfläche **Dennoch öffnen** erscheint erst, nachdem du versucht hast, die App zu öffnen, und zwar für etwa eine Stunde. Fehlt sie,
öffne die App erneut und geh zurück zu Datenschutz & Sicherheit.

Unter macOS 14 Sonoma und älter: Rechtsklick (oder Control-Klick) auf die App im Finder, **Öffnen** wählen und dann nochmals **Öffnen**.

### Aus dem Terminal

Das Entfernen der Quarantäne-Markierung, die der Browser auf den Download gesetzt hat, funktioniert ebenfalls:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Es klappt nicht immer: Unter neueren macOS-Versionen braucht das Terminal möglicherweise **App-Verwaltung** (oder **Vollzugriff auf die Festplatte**) unter
Datenschutz & Sicherheit, um Apps in `/Applications` zu ändern, und schlägt ohne das mit `Operation not permitted` fehl. Die Schritte oben funktionieren immer.

::: details „iRoof.top ist beschädigt und kann nicht geöffnet werden“
Auch diese Meldung bedeutet die Quarantäne-Markierung, nicht einen kaputten Download. Klicke auf **Abbrechen** (nicht auf **In den Papierkorb**) und führe
den `xattr`-Befehl oben aus, oder folge den Schritten in den Systemeinstellungen.
:::

## Windows

SmartScreen zeigt für den Installer **Windows hat deinen PC geschützt**:

1. Klicke auf **Weitere Informationen**.
2. Klicke auf **Trotzdem ausführen**.

Hält der Browser den Download zurück (*wird normalerweise nicht heruntergeladen*), öffne die Downloadliste, wähle **⋯ → Behalten**,
dann **Mehr anzeigen → Trotzdem behalten**. Für die `.msi` kannst du auch Rechtsklick → **Eigenschaften** → **Zulassen** ankreuzen →
**OK**, bevor du sie ausführst.

Unter Windows 11 mit eingeschalteter **Intelligenter App-Steuerung** werden unsignierte Apps ohne Schaltfläche **Trotzdem ausführen** blockiert. Nutze stattdessen den
[Server](./getting-started#install), oder schalte die intelligente App-Steuerung unter **Windows-Sicherheit → App- und Browsersteuerung →
Einstellungen der intelligenten App-Steuerung** aus.

## Linux

Linux blockiert unsignierte Apps nicht, aber ein AppImage braucht die Erlaubnis zum Ausführen:

```sh
chmod +x iRoof.top_amd64.AppImage    # oder: Eigenschaften → Berechtigungen → Datei als Programm ausführen erlauben
./iRoof.top_amd64.AppImage
```

Meldet es einen Fehler zu FUSE (`dlopen(): error loading libfuse.so.2`), installiere `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) oder starte es mit `--appimage-extract-and-run`.

Die Pakete werden mit dem Paketmanager installiert, der lokale unsignierte Pakete akzeptiert:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
