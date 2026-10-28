---
layout: home

hero:
  name: iRoof.top
  text: Rozmawiaj z ludźmi, za którymi tęsknisz
  tagline: Wyeksportuj czat z Telegrama lub WhatsAppa, a LLM poprowadzi go dalej w stylu danej osoby, z jej dymkami, naklejkami, GIF-ami, reakcjami i głosem. Na Twoim komputerze, z dowolnym modelem, a jeśli chcesz – offline.
  actions:
    - theme: brand
      text: Zacznij
      link: /pl/guide/getting-started
    - theme: alt
      text: Pobierz aplikację
      link: /pl/guide/desktop
    - theme: alt
      text: Jak to działa
      link: /pl/features/how-it-works

features:
  - title: Jej styl, nie tylko słowa
    details: Profil stylu zbudowany z całego eksportu; każdy dymek, naklejka, GIF, odpowiedź i reakcja jest odtwarzana modelowi jako wywołanie narzędzia.
    link: /pl/features/how-it-works
    linkText: Jak to działa
  - title: Prywatnie, a jeśli chcesz – offline
    details: Czaty zostają w Twoim folderze danych. Z lokalnym modelem i włączonym trybem offline aplikacja odrzuca każde żądanie, które opuściłoby Twój komputer.
    link: /pl/guide/offline
    linkText: Offline i prywatność
  - title: Lata rozmów, gigabajty mediów
    details: Ponad 120 000 wiadomości i 30 000 plików importowanych z podglądem postępu na żywo. Ponowny import jest rozpoznawany po wiadomościach, zanim zostanie przesłane jakiekolwiek medium.
    link: /pl/guide/export#large-exports
    linkText: Duże eksporty
  - title: Zdjęcia, naklejki i głos
    details: Biblioteka mediów opisuje wysłane rzeczy i transkrybuje głos, w kolejności, którą wybierzesz, z możliwością zatrzymania w dowolnym momencie.
    link: /pl/features/media
    linkText: Zdjęcia i głos
  - title: Linki udostępniania
    details: Pozwól przyjacielowi rozmawiać z personą pod /s/nazwa, z PIN-em i limitami, w Twojej sieci Wi‑Fi lub pod nazwa.iroof.top.
    link: /pl/features/share-links
    linkText: Linki udostępniania
  - title: Odpowiedzi z Telegrama
    details: Wiadomości od odwiedzających trafiają do Twojej grupy na Telegramie. Odpowiadaj sam albo pozwól AI odpowiedzieć po odliczaniu.
    link: /pl/features/telegram
    linkText: Telegram
  - title: Każdy model, każdy serwer MCP
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… oraz narzędzia MCP przez Streamable HTTP lub stdio.
    link: /pl/features/mcp
    linkText: Narzędzia MCP
  - title: Nic nie jest ukryte
    details: Dokładny JSON wysłany do modelu jest o jedno kliknięcie dalej, z rozmiarem, budżetem historii i zużytymi tokenami.
    link: /pl/guide/getting-started#what-s-in-the-window
    linkText: Co jest w oknie
  - title: Jeden mały plik binarny
    details: Serwer w Rust z wbudowanym interfejsem webowym, aplikacje desktopowe dla macOS, Windows i Linux, Homebrew oraz obraz Docker.
    link: /pl/guide/getting-started
    linkText: Instalacja
---

<div class="home-demo">

![Rozmowa toczy się w stylu prawdziwego człowieka, a potem przyjaciel otwiera udostępniony link w telefonie](/img/demo.svg)

</div>

## Zacznij w minutę

::: code-group

```sh [Aplikacja desktopowa]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [Całkowicie offline]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Potem trzy kroki: **[wyeksportuj czat](/pl/guide/export)** z Telegram Desktop lub WhatsAppa, **przeciągnij** folder, `.zip` albo `.txt` na stronę i naciśnij **New chat**, aby wybrać, kto gra AI: druga osoba czy Ty sam.
Nie masz pod ręką własnego czatu? Wypróbuj fikcyjne: `rooftop --import ./examples/telegram`.
(Nazwy przycisków w aplikacji są po angielsku, tak jak sama aplikacja.)

## Jak to działa

<div class="wide">

![Eksport z Telegrama lub WhatsAppa trafia do iRoof.top, LLM pisze odpowiedzi, a rozmowa toczy się dalej](/how-it-works.svg)

</div>

Eksport jest czytany raz, na Twoim komputerze. Przy każdej odpowiedzi model dostaje prompt systemowy z profilem stylu, Twoimi notatkami i opisami mediów, a potem najnowszą część czatu, która mieści się w [budżecie historii](/pl/reference/configuration#settings-only). Starsze części są zwijane w krótką pamięć, a persona nadal może ich szukać. Model odpowiada wywołaniami narzędzi (`send_message`, `send_sticker`, `react`…), które stają się dymkami, naklejkami i reakcjami. [Więcej →](/pl/features/how-it-works)

## Dokąd trafia Twój czat

| | Sieć |
|---|---|
| Import, profil stylu, wyszukiwanie, przechowywanie | brak: wszystko dzieje się na Twoim komputerze |
| Jedna odpowiedź, podsumowanie pamięci | wyłącznie endpoint modelu, który wybierzesz |
| Opisywanie mediów, transkrypcja głosu | model mediów, tylko gdy naciśniesz **Describe** |
| Linki udostępniania przez internet, Telegram | tylko jeśli je włączysz; [tryb offline](/pl/guide/offline) je wyłącza |

## Pytania

::: details Którego modelu użyć?
Dowolnego modelu czatu z **wywoływaniem narzędzi** za endpointem `/chat/completions` zgodnym z OpenAI. Większe modele lepiej naśladują styl. Do **Describe** w bibliotece mediów model mediów musi też przyjmować obrazy (a do wiadomości głosowych – dźwięk). **Test** w ustawieniach prostymi słowami mówi, co jest nie tak, np. odrzucony klucz albo nieznany model.
:::

::: details Ile to kosztuje?
Nic przy lokalnym modelu. Przy modelu w chmurze płacisz dostawcy za tokeny: jedna odpowiedź kosztuje mniej więcej tyle, ile budżet historii na wejściu (domyślnie 120 000 znaków ≈ 34 tys. tokenów; prompt jest zbudowany tak, by mógł być buforowany, więc dostawcy z buforowaniem promptów większość rozliczają po cenie z bufora), plus kilka krótkich wywołań narzędzi. Zmniejsz budżet w ustawieniach, aby płacić mniej za odpowiedź.
:::

::: details Czy eksport musi być mały?
Nie. Eksporty z ponad 120 000 wiadomości i 13 GB mediów importują się bez problemu, z przeglądarki albo poleceniem `rooftop --import <folder>`. Wyszukiwanie i budżet historii utrzymują rozmiar promptu każdej odpowiedzi na tym samym poziomie, bez względu na długość czatu.
:::

::: details Czy przyjaciel może rozmawiać z personą?
Tak, przez [link udostępniania](/pl/features/share-links): w Twojej sieci Wi‑Fi albo przez internet pod `nazwa.iroof.top`, z PIN-em i limitami wiadomości. Odwiedzający widzą tylko czat: bez ustawień, notatek, promptów i innych czatów.
:::

::: tip Słowo o trosce
To ma pomagać być blisko ludzi, którzy są daleko. Persona zostaje w roli, ale odpowie szczerze, jeśli naprawdę zapytasz, czy rozmawiasz z AI, a gdy wydasz się w potrzebie, odpowie z troską.
:::
