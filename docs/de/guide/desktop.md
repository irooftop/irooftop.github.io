# Desktop-App

Die Desktop-App ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) betreibt denselben Server wie `rooftop serve` auf einem zufälligen
`127.0.0.1`-Port und zeigt ihn in einem nativen Fenster.

| Plattform | Installation |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, oder die `.dmg` für [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) oder [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 und 11 | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) oder [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (jede Distribution), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) oder [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Die Download-Links zeigen immer auf die neueste Version.

::: warning Die Builds sind noch nicht signiert
Unter macOS öffne die App einmal und dann **Systemeinstellungen → Datenschutz & Sicherheit → Dennoch öffnen**. Unter Windows wähle in der SmartScreen
**Weitere Informationen → Trotzdem ausführen**. Schritt für Schritt, mit Animation: [Eine unsignierte App öffnen](./unsigned-apps).
:::

## Erster Start

Die App liest weder deine Shell noch deine `.env`, daher begrüßt sie dich mit **Modell verbinden**: Öffne **Einstellungen**, gib
Endpunkt, Schlüssel und Modell ein und drück **Testen**. Sind `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` oder
`OPENAI_TEMPERATURE` gesetzt, werden sie zu den Anfangswerten.

| | |
|---|---|
| Daten | das App-Datenverzeichnis des Systems, z. B. `~/Library/Application Support/top.iroof.desktop` unter macOS |
| Share-Links | im selben WLAN oder über das Internet: [Links auf anderen Geräten öffnen](../features/share-links#open-links-on-other-devices) |
| Andere Seiten | Links wie `t.me` öffnen sich in deinem Browser |
| macOS-Fenster | keine Systemtitelleiste: die Kopfzeilen der App laufen unter den Ampelknöpfen weiter und ziehen das Fenster |
| Import | die App liest den Export selbst: **Ordner wählen…** öffnet den Systemdialog, und ein abgelegter Ordner, eine `.zip` oder `.txt` wird von dort importiert, wo er liegt. Nichts wird hochgeladen, das Original bleibt unberührt, und auf APFS werden die Medien geklont statt kopiert, sodass selbst ein 13-GB-Export kaum zusätzlichen Platz braucht |

## Selbst bauen {#build-it-yourself}

Du brauchst Rust ≥ 1.95 und Node.js, unter Linux die [Tauri-Voraussetzungen](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # Installer in desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # nur das Binary
```

Unter macOS erstellt `npm run build` auch die `.dmg` und überspringt das Finder-AppleScript, das nur das DMG-Fenster anordnet
(es schlägt ohne die Berechtigung *Automation* fehl). Setze `ROOFTOP_DMG_FINDER=1`, um das Finder-Layout beizubehalten, wie es die
veröffentlichten DMGs haben: den Hintergrund aus `desktop/dmg/` mit einem Pfeil von der App zu *Programme*, und die versteckten Dateien
des Volumes außer Sicht. Nach einer Änderung an `desktop/dmg/background.svg` führe `desktop/dmg/make-background.sh` aus.
