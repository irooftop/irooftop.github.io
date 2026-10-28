# Aplikacja desktopowa

Aplikacja desktopowa ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) uruchamia ten sam serwer co `rooftop serve` na losowym
porcie `127.0.0.1` i pokazuje go w natywnym oknie.

| Platforma | Instalacja |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, albo `.dmg` dla [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) lub [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 i 11 | [Instalator (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) lub [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (dowolna dystrybucja), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) lub [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Linki do pobrania zawsze wskazują najnowszą wersję.

::: warning Pakiety nie są jeszcze podpisane
Na macOS otwórz aplikację raz, a potem **Ustawienia systemowe → Prywatność i ochrona → Otwórz mimo to**. W Windows wybierz w SmartScreen
**Więcej informacji → Uruchom mimo to**. Krok po kroku, z animacją: [Otwieranie niepodpisanej aplikacji](./unsigned-apps).
:::

## Pierwsze uruchomienie

Aplikacja nie czyta twojej powłoki ani `.env`, więc wita cię ekranem **Połącz model**: otwórz **Ustawienia**, wpisz
endpoint, klucz i model, i naciśnij **Test**. Jeśli ustawione są `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` lub
`OPENAI_TEMPERATURE`, stają się wartościami początkowymi.

| | |
|---|---|
| Dane | katalog danych aplikacji systemu, np. `~/Library/Application Support/top.iroof.desktop` w macOS |
| Linki udostępniania | w tej samej sieci Wi‑Fi lub przez internet: [Otwieranie linków na innych urządzeniach](../features/share-links#open-links-on-other-devices) |
| Inne strony | linki takie jak `t.me` otwierają się w przeglądarce |
| Okno macOS | bez systemowego paska tytułu: nagłówki aplikacji sięgają pod sygnalizatory i przeciągają okno |
| Import | aplikacja sama czyta eksport: **Wybierz folder…** otwiera systemowy wybór, a upuszczony folder, `.zip` lub `.txt` jest importowany z miejsca, w którym się znajduje. Nic nie jest wysyłane, oryginał pozostaje nietknięty, a na APFS multimedia są klonowane zamiast kopiowane, więc nawet eksport 13 GB prawie nie zajmuje dodatkowego miejsca |

## Zbuduj samodzielnie {#build-it-yourself}

Potrzebujesz Rust ≥ 1.95 i Node.js, a w Linuksie [wymagań Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # instalatory w desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # sam plik binarny
```

W macOS `npm run build` tworzy też `.dmg` i pomija skrypt AppleScript Findera, który tylko układa okno DMG
(nie działa bez uprawnienia *Automatyzacja*). Ustaw `ROOFTOP_DMG_FINDER=1`, by zachować układ Findera, jak
w opublikowanych DMG: tło z `desktop/dmg/` ze strzałką od aplikacji do *Aplikacji*, a ukryte pliki wolumenu
poza widokiem. Po edycji `desktop/dmg/background.svg` uruchom `desktop/dmg/make-background.sh`.
