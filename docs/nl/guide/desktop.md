# Desktopapp

De desktopapp ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) draait dezelfde server als `rooftop serve` op een willekeurige
`127.0.0.1`-poort, en toont die in een native venster.

| Platform | Installatie |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, of het `.dmg`-bestand voor [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) of [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 en 11 | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) of [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (elke distributie), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) of [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

De downloadlinks wijzen altijd naar de nieuwste release.

::: warning De builds zijn nog niet ondertekend
Open de app op macOS één keer, en ga dan naar **Systeeminstellingen → Privacy en beveiliging → Toch openen**. Kies op Windows in SmartScreen
**Meer info → Toch uitvoeren**. Stap voor stap, met een animatie: [Een niet-ondertekende app openen](./unsigned-apps).
:::

## Eerste keer starten

De app leest je shell of `.env` niet, dus begroet hij je met **Een model verbinden**: open **Instellingen**, vul het
endpoint, de sleutel en het model in, en druk op **Testen**. Als `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` of
`OPENAI_TEMPERATURE` zijn ingesteld, worden ze de beginwaarden.

| | |
|---|---|
| Data | de app-datamap van het besturingssysteem, bijvoorbeeld `~/Library/Application Support/top.iroof.desktop` op macOS |
| Sharelinks | op hetzelfde Wi‑Fi of via internet: [Links openen op andere apparaten](../features/share-links#open-links-on-other-devices) |
| Andere sites | links zoals `t.me` openen in je browser |
| macOS-venster | geen systeemtitelbalk: de koppen van de app lopen door onder de verkeerslichten en slepen het venster |
| Importeren | de app leest de export zelf: **Map kiezen…** opent de systeemkiezer, en een neergezette map, `.zip` of `.txt` wordt geïmporteerd vanaf waar hij staat. Er wordt niets geüpload, het origineel blijft onaangeroerd, en op APFS worden de media gekloond in plaats van gekopieerd, zodat zelfs een export van 13 GB bijna geen extra ruimte kost |

## Zelf bouwen {#build-it-yourself}

Je hebt Rust ≥ 1.95 en Node.js nodig, en op Linux de [Tauri-vereisten](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # installers in desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # alleen het binaire bestand
```

Op macOS maakt `npm run build` ook het `.dmg`-bestand, en slaat het het Finder-AppleScript over dat alleen het DMG-venster ordent
(het mislukt zonder de machtiging *Automatisering*). Zet `ROOFTOP_DMG_FINDER=1` om de Finder-indeling te behouden, zoals
in de uitgebrachte DMG's: de achtergrond uit `desktop/dmg/` met een pijl van de app naar *Programma's*, en de verborgen bestanden van het volume
buiten beeld. Voer na het bewerken van `desktop/dmg/background.svg` `desktop/dmg/make-background.sh` uit.
