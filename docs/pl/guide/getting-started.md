# Pierwsze kroki

## Instalacja {#install}

| | Polecenie |
|---|---|
| **Aplikacja desktopowa**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **Aplikacja desktopowa**, Windows | [Instalator (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) lub [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **Aplikacja desktopowa**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) lub [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Serwer**, macOS i Linux | `brew install irooftop/tap/rooftop` (potem `brew services start rooftop`) |
| **Serwer**, wszędzie z Rust ≥ 1.88 | `cargo install rooftop` |
| **Serwer**, kontener | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

Aplikacja desktopowa nie wymaga terminala: zobacz [Aplikacja desktopowa](./desktop).

## Uruchomienie

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # domyślne; działa każde API zgodne z OpenAI
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # musi obsługiwać wywoływanie narzędzi
rooftop                                               # http://127.0.0.1:8080
```

Zmienne mogą też znajdować się w pliku `.env` obok miejsca, z którego uruchamiasz `rooftop`, albo zostać ustawione później w **Ustawieniach**.
**Test** w Ustawieniach wysyła małe zapytanie i prostym językiem wyjaśnia, co jest nie tak, na przykład
„openrouter.ai odrzucił klucz API (401)”.

Chcesz, żeby nic nie opuszczało twojego komputera? Użyj lokalnego modelu i [trybu offline](./offline).

## Twój pierwszy czat

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Eksport   │ ──▶ │ 2. Przeciągnij     │ ──▶ │ 3. Nowy czat: wybierz│
 │ czatu        │     │    na stronę       │     │ kogo gra AI          │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Wyeksportuj czat](./export) z Telegram Desktop lub WhatsAppa.
2. Przeciągnij folder, `.zip` lub plik `.txt` z WhatsAppa na stronę (albo uruchom `rooftop --import <folder>`).
3. Naciśnij **Nowy czat** i wybierz postać: drugą osobę albo siebie („rozmawiaj ze sobą w swoim stylu”).

::: tip Wypróbuj bez własnych czatów
Repozytorium zawiera dwa zmyślone eksporty w [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas i Priya gotują lasagne na Telegramie, Sofia i Daniel spędzają weekend na WhatsAppie.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Brak eksportu? Zacznij od notatek

**Nowy czat → Z notatek** wymaga tylko jego imienia (twoje jest opcjonalne) i kilku zdań o nim: kim jest,
co razem robicie, jak pisze („mówi do mnie skarbie, krótkie wiadomości po włosku, dużo ❤️”). AI pisze jak on
wyłącznie na podstawie tych notatek. Bez historii nie ma profilu stylu ani biblioteki mediów, więc im więcej notatki mówią o tym, jak pisze, tym bardziej będzie podobny. Notatki możesz edytować w czacie w dowolnej chwili (✎) i udostępnić czat linkiem jak każdy inny. Usunięcie czatu usuwa wszystko, co w nim było.

## Co jest w oknie

| Przycisk | Co robi |
|---|---|
| **Udostępnij** | [Linki](../features/share-links), dzięki którym znajomi mogą rozmawiać z postacią |
| **Biblioteka mediów** | Każda naklejka, GIF, zdjęcie i wiadomość głosowa z tym, co AI o nich wie |
| **Notatki** | Rzeczy o osobie, których eksport nie mówi. Postać je czyta, odwiedzający nigdy |
| **`{ }`** | Dokładny JSON wysyłany do modelu i zużyte tokeny |
| **Przepisz** | Odrzuca ostatnią odpowiedź postaci i pisze ją od nowa |
| **Niech napiszą pierwsi** | Postać rozpoczyna rozmowę |
