# Eksport czatu

<div class="wide">

![Telegram Desktop: otwórz czat, kliknij ⋯ w prawym górnym rogu, wybierz Eksportuj historię czatu…, a następnie Eksportuj](/img/telegram-export.svg)

</div>

## Telegram

W **Telegram Desktop** (macOS, Windows, Linux): otwórz czat → **⋯** → **Eksportuj historię czatu…** → **Eksportuj**.

* Zostaw włączone zdjęcia, wideo, wiadomości głosowe, naklejki i GIF-y: postać ich używa.
* Działają oba formaty: **HTML** (`messages.html`) i czytelny maszynowo **JSON** (`result.json`).
* Przeciągnij folder eksportu albo jego `.zip` na stronę.

## WhatsApp

W telefonie: otwórz czat → **⋮ → Więcej → Eksportuj czat** (iPhone: dotknij nazwy kontaktu → **Eksportuj czat**) →
**Dołącz multimedia**. Wyślij `.zip` na komputer i przeciągnij go na stronę.

Czat wyeksportowany bez multimediów to pojedynczy plik `.txt` i to też działa.

## Duże eksporty

Eksporty ze 100 000+ wiadomościami i wieloma gigabajtami działają tak samo: przeciągnij folder. Strona pokazuje, co się dzieje:

1. **Odczytywanie folderu…** liczy pliki (przeglądarka może potrzebować chwili, by wylistować dziesiątki tysięcy).
2. **Czat idzie pierwszy.** Strony wiadomości (albo `result.json`, albo `.txt` z WhatsAppa) są wysyłane i odczytywane przed multimediami. Jeśli ten eksport **jest już zaimportowany**, import kończy się tutaj i go otwiera, a żadne multimedia nie są wysyłane. Jeśli multimedia nie zmieszczą się na dysku, dostajesz informację, ile miejsca trzeba, zanim cokolwiek dużego zostanie wysłane.
3. **Wysyłanie 1,2 GB z 3,4 GB (35%) · 9 000 z 30 905 plików**: multimedia idą małymi partiami, jedna po drugiej. Przeglądarka nigdy nie buduje jednego ogromnego żądania, a przerwana partia jest ponawiana osobno. Nie ma limitu rozmiaru, gdy uruchamiasz to na własnym komputerze.
4. **Odczyt wiadomości: strona 37 z 121 · 36 000 wiadomości**: wszystkie strony są czytane raz, równolegle.
5. **Sprawdzanie multimediów** i **Przenoszenie multimediów**: pliki są hashowane, żeby znaleźć duplikaty, i przenoszone (a nie kopiowane dwa razy) do folderu danych.
6. **Zapisywanie**, po czym otwiera się okno *Nowy czat*.

Działa tylko jeden import naraz; błąd pozostaje widoczny w strefie upuszczania, a folder można wybrać ponownie.

W [aplikacji desktopowej](./desktop) to wysyłanie w ogóle nie zachodzi: aplikacja czyta folder, `.zip` albo `.txt` tam, gdzie się znajdują
(kroki 4–6), co jest szybsze i nie dotyczą jej problemy przeglądarki poniżej.

::: details Gdy pliku nie da się wysłać (przeglądarka)
Plik, którego przeglądarka nie może już odczytać (przeniesiony, zmieniony lub symbol zastępczy iCloud/OneDrive, który nie został pobrany), jest wykrywany i pomijany, podobnie jak pojedynczy plik, który ciągle psuje swoją partię: partia jest dzielona, aż ten plik zostanie odizolowany. Pominięte multimedia pojawiają się w czacie jako brakujące; komunikat po imporcie wymienia jeden z nich, a konsola przeglądarki wypisuje wszystkie. Gdy sam plik czatu nie może zostać wysłany, import się zatrzymuje i go wskazuje. Błędy pokazują, co otrzymał serwer, na przykład `serwer otrzymał 1 200 z 4 096 bajtów`, dzięki czemu łatwo odróżnić problem z połączeniem od problemu przeglądarki.
:::

Podczas importu nic nie opuszcza twojego komputera i żaden model nie jest wywoływany. Multimedia są opisywane tylko wtedy, gdy naciśniesz **Opisz** w bibliotece mediów.

Przy `rooftop --import <folder>` folder jest czytany na miejscu, a jego pliki są kopiowane, nigdy przenoszone; postęp jest zapisywany w logu.
Przy ogromnym eksporcie na tym samym komputerze to najszybsza droga: bez wysyłania i bez drugiej kopii w folderze tymczasowym.

## Co jest rozpoznawane

| Źródło | Pliki |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (używany, gdy folder nie ma `messages.html`) |
| WhatsApp | `WhatsApp Chat with <nazwa>.txt` (Android) lub `_chat.txt` (iOS), w folderze, `.zip` albo samodzielnie |

* **Telegram**: tekst z podziałami wiersza, linki, cytaty i kod; odpowiedzi i częściowe cytaty; przekazane wiadomości; edycje; wiadomości serwisowe;
  reakcje; podglądy linków; zdjęcie, wideo, okrągłe wideo, wiadomość głosowa, audio, plik, naklejka (`.webp`, `.webm`,
  `.tgs`), GIF, lokalizacja, kontakt, ankieta i połączenie.
* **WhatsApp**: układy Androida i iOS, zegary 12- i 24-godzinne oraz oba porządki dzień/miesiąc, wykrywane dla każdego pliku.
  Wieloliniowe wiadomości, edycje i załączniki są zachowywane. Usunięte wiadomości i powiadomienie o szyfrowaniu są pomijane,
  a `<Media omitted>` jest oznaczane jako niedostępne.

Pliki multimediów są hashowane, więc naklejka wysłana pięć razy staje się jednym elementem biblioteki (`stk_…`, `gif_…`, `pho_…`).

::: info Reakcje w eksportach HTML
Eksporty HTML nie mówią, kto zareagował. W czatach jeden na jeden reakcja jest przypisywana drugiemu uczestnikowi, a obojgu, gdy liczba wynosi 2.
:::
