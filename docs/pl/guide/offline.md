# Tryb offline i prywatność

iRoof.top przechowuje twoje czaty na twoim komputerze. Z modelem, który również działa na twoim komputerze, **nic nie musi go opuszczać**.
**Tryb offline** zamienia to w regułę egzekwowaną przez aplikację, a nie w nawyk.

## Co dzieje się lokalnie

| Krok | Gdzie działa | Sieć |
|---|---|---|
| Import, analiza, profil stylu | twój komputer | brak |
| Przechowywanie | pliki JSON i media w katalogu danych | brak |
| Wyszukiwanie w historii, PIN-y linków, biblioteka mediów | twój komputer | brak |
| Opisywanie zdjęć, naklejek, GIF-ów, wideo | **model mediów**, tylko gdy naciśniesz **Opisz z AI** | jedno zapytanie na element do endpointu modelu |
| Transkrypcja głosu | model mediów, gdy naciśniesz **Opisz z AI** przy wiadomości głosowej lub nagrasz ją | jedno zapytanie do endpointu modelu |
| Odpowiedź | **model czatu**, gdy wyślesz wiadomość (lub wyśle ją odwiedzający) | zapytania do endpointu modelu |
| Kompresja długiej historii | model czatu, w ramach odpowiedzi, gdy historia przekracza budżet | jedno dodatkowe zapytanie do endpointu modelu |

Import nigdy nie wywołuje modelu. Pierwsze wywołanie następuje, gdy wyślesz wiadomość, naciśniesz **Opisz** lub nagrasz
wiadomość głosową. Odpowiedź wysyła modelowi twoją wyeksportowaną historię (do [budżetu historii](../reference/configuration#settings-only)),
profil stylu i opisy mediów. **Więc to, gdzie działa model, decyduje, dokąd trafia twój czat**: endpoint w chmurze go otrzymuje, model na twoim komputerze — nie.

## Działanie wyłącznie offline

1. Zainstaluj [Ollama](https://ollama.com) lub [LM Studio](https://lmstudio.ai), albo uruchom `llama-server` z llama.cpp.
2. Pobierz **model czatu obsługujący wywoływanie narzędzi** oraz **model wizyjny**, jeśli chcesz, żeby zdjęcia i naklejki były opisywane.
3. W **Ustawieniach** wybierz endpoint i model, a następnie włącz **Offline**:

| Serwer | Bazowy URL |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| `llama-server` z llama.cpp | `http://localhost:8081/v1` (jego domyślny port `8080` należy do iRoof.top: uruchom go z `llama-server --port 8081`) |

4. Naciśnij **Test**. Wysyła on małe zapytanie i pokazuje model oraz host, które odpowiedziały. Możesz wyłączyć sieć i dalej rozmawiać.

**Aplikacja desktopowa** jest konfigurowana w Ustawieniach. Nie czyta twojej powłoki ani pliku `.env` (zobacz [Aplikacja desktopowa](./desktop)),
ale respektuje `ROOFTOP_OFFLINE` i `OPENAI_*`, jeśli są w środowisku, w którym została uruchomiona. Serwer
czyta środowisko (i `.env`):

::: code-group

```sh [Homebrew / serwer cargo]
# --offline to to samo co ROOFTOP_OFFLINE=1
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

W Dockerze `localhost` to sam kontener, więc użyj `host.docker.internal` (opcja `--add-host` jest potrzebna tylko w Linuksie).
Jeśli Ollama odrzuca połączenie, ustaw nasłuch na wszystkich interfejsach (`OLLAMA_HOST=0.0.0.0`).

### Co egzekwuje tryb offline

| | Tryb offline |
|---|---|
| Czat, podsumowanie historii, opis mediów, transkrypcja głosu | odrzucane, chyba że endpoint jest [lokalny](#local-means) |
| Serwery MCP przez HTTP | odrzucane, jeśli nie są lokalne; błąd widoczny w Ustawieniach |
| Udostępnianie przez internet (`<nazwa>.iroof.top`) | wyłączone: klient przekaźnika nie startuje, a przełącznik jest zablokowany |
| Bot Telegrama, własny lub wspólny | nie uruchamia się |
| GIF-y z URL | AI nie może wysłać GIF-a z nielokalnego URL |
| Linki Wi‑Fi | działają |

Odrzucone zapytanie kończy się, zanim nawiąże się jakiekolwiek połączenie, a komunikat mówi dlaczego: `Tryb offline: https://openrouter.ai
nie jest lokalnym endpointem`. Przekierowanie z lokalnego endpointu na inny host także jest odrzucane. Mała odznaka **Offline**
pojawia się w nagłówku paska bocznego, gdy tryb jest włączony. Ustawienie jest zapisywane. `--offline` / `ROOFTOP_OFFLINE=1`
włączają tryb niezależnie od Ustawień, a Ustawienia nie mogą go wyłączyć.

#### Co oznacza „lokalny” {#local-means}

`localhost`, pętla zwrotna (`127.0.0.0/8`, `::1`), adresy sieci prywatnych (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
adresy link-local oraz nazwy `*.local` i `*.internal` (jak `host.docker.internal`). Model na innym
komputerze w twojej domowej sieci liczy się jako lokalny, bo nigdy nie opuszcza twojej sieci. Nazwy ocenia się po tym, jak są zapisane;
nie są rozwiązywane.

### Czego tryb offline nie może sprawdzić

* **Serwery MCP stdio** to programy na twoim komputerze. iRoof.top je uruchamia, ale nie widzi, z czym się łączą,
  więc dodawaj tylko te, którym ufasz, że pozostaną lokalne.
* **Transkrypcja głosu** korzysta z API czatu (część `input_audio`), a nie z API Whisper `/audio/transcriptions`.
  Potrzebuje lokalnego serwera i modelu, które akceptują tam audio. Jeśli twój nie akceptuje, wiadomość głosowa mimo to jest zapisywana i
  wysyłana; brakuje tylko jej tekstu.
* **Generowanie obrazów i mowy** istnieje tylko jako [narzędzia MCP](../features/mcp). Offline użyj do tego lokalnego serwera MCP.
* Osoby, z którymi się dzielisz, otwierają twoje linki Wi‑Fi we własnych przeglądarkach. Tryb offline dotyczy tej aplikacji, nie ich urządzeń.

## Bezpieczne udostępnianie znajomym {#share-with-friends-safely}

| Link | Co się dzieje |
|---|---|
| **Wi‑Fi** `http://<twój IP>:8737/s/<nazwa>` | nigdy nie opuszcza twojej sieci lokalnej |
| **Internet** `https://<nazwa>.iroof.top/s/<nazwa>` | aplikacja otwiera jedno wychodzące połączenie WebSocket z hubem, który przez nie przekazuje żądania HTTP odwiedzającego i odpowiedzi twojej aplikacji |

Przy linku internetowym twój eksport, czaty i model zostają na twoim komputerze, a hub nie przechowuje żadnego z nich.
Hub zachowuje tylko rekord konta: twoje imię, skrót twojego sekretu i czas, kiedy ostatnio cię widział.

Bądź jasny co do tego, czego to *nie* daje. Hub kończy TLS, więc jak każde odwrotne proxy technicznie widzi ruch, który przez niego przechodzi:
to, co wpisuje odwiedzający, odpowiedzi postaci oraz historię, którą link pozwala odwiedzającym czytać
(**Odwiedzający mogą czytać eksport**, domyślnie **nic**). Przekazuje tylko strony odwiedzających (`/s/…`,
`/api/s/…`, zasoby stron) i odrzuca ciasteczka w obu kierunkach; twój interfejs właściciela i ustawienia nigdy nie są przez niego dostępne. Jeśli to zbyt duże zaufanie, użyj linków Wi‑Fi lub [uruchom własny hub przekaźnika](../reference/relay-hub).
[Więcej o linkach udostępniania](../features/share-links).

W **trybie offline** przekaźnik iroof.top jest wyłączony. Linki Wi‑Fi nadal działają.

## Bot Telegrama {#the-telegram-bot}

[Odpowiadanie z Telegrama](../features/telegram) publikuje w twojej grupie:

* nowe **wiadomości odwiedzających** (imię, nazwę linku, tekst lub etykietę mediów z opisem albo transkrypcją oraz krótki
  podgląd wiadomości, na którą odpowiadają) i **odpowiedzi** AI;
* nigdy wyeksportowanej historii. Stare wiadomości nie są przesyłane.

Boty nie mają szyfrowania end-to-end: tekst przechodzi przez Telegram jawnie. Przy **wspólnym bocie** przechodzi także
przez hub, który przechowuje tylko to, która grupa należy do którego konta. **Własny bot** rozmawia bezpośrednio z
Telegramem, bez huba. Tryb offline wyłącza oba.

## Dokąd trafiają twoje dane

| Dane | Dokąd trafiają |
|---|---|
| Eksporty, czaty, ustawienia, klucz API | katalog danych na twoim komputerze |
| Import i profil stylu | nigdzie |
| Historia, profil stylu, twoje wiadomości | wybrany przez ciebie endpoint modelu, przy każdej odpowiedzi |
| Zdjęcia i głos | endpoint modelu mediów, przy **Opisz** lub nagraniu wiadomości głosowej |
| Wiadomości odwiedzających przez link Wi‑Fi | twój komputer i twój endpoint modelu |
| Wiadomości odwiedzających przez link internetowy | hub (w tranzycie), twój komputer, twój endpoint modelu |
| Wiadomości odwiedzających przez Telegram | dodatkowo Telegram, a dla wspólnego bota także hub |
| Tryb offline | tylko lokalny endpoint modelu, tylko linki Wi‑Fi, bez Telegrama |
