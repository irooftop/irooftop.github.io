# Zdjęcia i głos

Niektórzy ludzie wysyłają głównie zdjęcia, inni rozmawiają głównie w wiadomościach głosowych. iRoof.top zachowuje oba nawyki.

## Rozumienie

W bibliotece mediów **Opisz z AI** opisuje naklejki, GIF-y i zdjęcia oraz **transkrybuje wiadomości głosowe** za pomocą
*modelu mediów*, który musi przyjmować obrazy i audio. Ustaw go w Ustawieniach albo przez `OPENAI_MEDIA_MODEL`, na przykład
`google/gemini-3.5-flash-lite` na OpenRouterze. Opisy powstają tylko wtedy, gdy naciśniesz przycisk, a z lokalnym
modelem i [trybem offline](../guide/offline) zdjęcia nigdy nie opuszczają twojego komputera.

```text
<wiadomość głosowa 0:05: «co zostało powiedziane»>
```

Gdy dominuje jeden rodzaj, profil stylu to mówi, np. „mówi głównie wiadomościami głosowymi (10 z 10)”.

### Duże biblioteki

Długi czat może mieć dziesiątki tysięcy naklejek, GIF-ów i zdjęć. Biblioteka mediów pomaga wydać tokeny modelu
tam, gdzie mają największe znaczenie:

| Element | Co robi |
|---|---|
| Karty rodzajów | Wszystkie, Brakujące, Opisane, Naklejki, GIF-y, Zdjęcia, Wideo, Głos, z liczbami |
| Sortowanie | najczęściej używane (domyślnie), najrzadziej używane, ostatnio użyte, najdawniej użyte |
| Liczba użyć | ukrywa elementy użyte mniej niż 2, 3, 5, 10 lub 25 razy |
| Wyszukiwanie | w opisach i identyfikatorach |

**Opisz N z AI** opisuje dokładnie to, co jest pokazane i jeszcze nieopisane, **od góry do dołu w wybranej kolejności**,
po cztery naraz. Każdy opis jest zapisywany, gdy tylko nadejdzie. Wiersz postępu pokazuje, ile jest gotowych, błędy,
tempo i pozostały czas. Ten sam przycisk zmienia się w **Zatrzymaj**: możesz zatrzymać w każdej chwili, a następne uruchomienie
kontynuuje z resztą. Dobry start dla dużego czatu: *Najczęściej używane najpierw* i *Użyte 3 razy lub więcej*.

## Twoje wiadomości głosowe

Gdy pole pisania jest puste, przycisk wysyłania staje się **mikrofonem**, jak w Telegramie. Nagranie jest konwertowane do WAV w
przeglądarce, wysyłane i transkrybowane. Odwiedzający linków udostępniania też mogą nagrywać.

::: info
Przeglądarki zezwalają na nagrywanie tylko na `https://` lub `localhost`.
:::

## Zdjęcia i głos postaci

Podłącz serwer MCP, który tworzy obrazy, i ten, który mówi:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

Postać dostaje wtedy dwie kolejne akcje:

| Akcja | Co robi |
|---|---|
| `send_voice {text}` | wywołuje narzędzie mowy (WAV, przy błędzie ponawiane w mp3) i wysyła wiadomość głosową |
| `send_photo {prompt, caption?}` | wywołuje narzędzie obrazów i wysyła zdjęcie |

* Gdy podłączone jest narzędzie mowy, transkrybowane wiadomości głosowe samej postaci są odtwarzane jako `send_voice`, żeby model widział
  nawyk w formie, którą może kontynuować.
* **Głos** w *Szczegółach czatu* (na przykład `Puck`) nadaje postaci jej własny głos.
* Każdy inny obraz lub dźwięk zwrócony przez narzędzie MCP staje się medium czatu `gen_…` (sprawdzanym po zawartości, do 25 MB, usuwanym
  razem z czatem).

::: tip Koszty
Każde zdjęcie lub wiadomość głosowa to dodatkowe płatne wywołanie: około 0,01 $ za obraz z `meta/muse-image` i kilka sekund TTS.
:::
