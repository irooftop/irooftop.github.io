# Otwieranie niepodpisanej aplikacji

Instalatory desktopowe nie są jeszcze podpisane ani notaryzowane, więc przy pierwszym uruchomieniu w macOS i Windows pojawia się ostrzeżenie.
To jednorazowy krok: po jednorazowym zezwoleniu aplikacja otwiera się normalnie, także po aktualizacjach zainstalowanych w ten sam sposób.

::: tip Wolisz tego uniknąć?
[Zbuduj aplikację samodzielnie](./desktop#build-it-yourself) albo uruchom [serwer](./getting-started#install) i używaj go w
przeglądarce: `brew install irooftop/tap/rooftop`, `cargo install rooftop` lub [Docker](./docker).
:::

## macOS

![Otwieranie niezweryfikowanej aplikacji w macOS: ostrzeżenie „Nie otwarto”, Gotowe, Ustawienia systemowe, Prywatność i ochrona, Otwórz mimo to, hasło, i aplikacja się otwiera](/how-to-open-an-unsigned-app-on-macos.svg)

W macOS 15 Sequoia i nowszym:

1. Otwórz **iRoof.top**. macOS powie *„iRoof.top” nie otwarto: Apple nie mogło zweryfikować…*. Kliknij **Gotowe**.
2. Otwórz **menu Apple → Ustawienia systemowe… → Prywatność i ochrona**.
3. Przewiń do **Bezpieczeństwo**: *„iRoof.top” został zablokowany, aby chronić twój Mac*. Kliknij **Otwórz mimo to**.
4. Potwierdź przyciskiem **Otwórz mimo to** i wpisz hasło albo użyj Touch ID.

Przycisk **Otwórz mimo to** pojawia się dopiero po próbie otwarcia aplikacji, przez około godzinę. Jeśli go nie ma,
otwórz aplikację ponownie i wróć do Prywatności i ochrony.

W macOS 14 Sonoma i wcześniejszych kliknij prawym przyciskiem (lub Control-klik) aplikację w Finderze, wybierz **Otwórz**, a potem znowu **Otwórz**.

### Z Terminala

Usunięcie flagi kwarantanny, którą przeglądarka dodała do pobranego pliku, także działa:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Nie zawsze działa: w nowszych wersjach macOS Terminal może potrzebować **Zarządzania aplikacjami** (lub **Pełnego dostępu do dysku**) w
Prywatności i ochronie, aby zmieniać aplikacje w `/Applications`, a bez tego kończy się błędem `Operation not permitted`. Kroki powyżej zawsze działają.

::: details „iRoof.top jest uszkodzony i nie może zostać otwarty”
Ten komunikat również oznacza flagę kwarantanny, a nie uszkodzone pobranie. Kliknij **Anuluj** (nie **Przenieś do kosza**) i uruchom
polecenie `xattr` powyżej albo postępuj według kroków w Ustawieniach systemowych.
:::

## Windows

SmartScreen pokazuje dla instalatora **Windows chronił twój komputer**:

1. Kliknij **Więcej informacji**.
2. Kliknij **Uruchom mimo to**.

Jeśli przeglądarka wstrzymuje pobieranie (*nie jest często pobierany*), otwórz listę pobrań, wybierz **⋯ → Zachowaj**,
a potem **Pokaż więcej → Zachowaj mimo to**. Dla `.msi` możesz też kliknąć prawym przyciskiem → **Właściwości** → zaznaczyć **Odblokuj** →
**OK**, zanim go uruchomisz.

W Windows 11 z włączoną **Inteligentną kontrolą aplikacji** niepodpisane aplikacje są blokowane bez przycisku **Uruchom mimo to**. Użyj wtedy
[serwera](./getting-started#install) albo wyłącz Inteligentną kontrolę aplikacji w **Zabezpieczenia Windows → Kontrola aplikacji i przeglądarki →
Ustawienia Inteligentnej kontroli aplikacji**.

## Linux

Linux nie blokuje niepodpisanych aplikacji, ale AppImage potrzebuje uprawnienia do uruchomienia:

```sh
chmod +x iRoof.top_amd64.AppImage    # albo: Właściwości → Uprawnienia → Zezwalaj na uruchamianie pliku jako programu
./iRoof.top_amd64.AppImage
```

Jeśli zgłasza problem z FUSE (`dlopen(): error loading libfuse.so.2`), zainstaluj `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) albo uruchom z `--appimage-extract-and-run`.

Pakiety instaluje menedżer pakietów, który akceptuje lokalne niepodpisane pakiety:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
