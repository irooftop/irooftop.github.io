# Jak to działa

<div class="wide">

![Jak działa iRoof.top](/how-it-works.svg)

</div>

Każdy eksport staje się tymi samymi znormalizowanymi wiadomościami. Następnie każde działanie postaci jest odtwarzane modelowi jako
**wywołanie narzędzia**, aby uczył się *jak* ta osoba się zachowuje, a nie tylko co pisze, i odpowiadał tak samo.

## Działania jako wywołania narzędzi

| Co zrobiła postać | Wywołanie narzędzia w historii i w odpowiedziach na żywo |
|---|---|
| dymek tekstowy, być może odpowiedź lub częściowy cytat | `send_message {text, reply_to?, quote?}` |
| naklejka | `send_sticker {sticker_id, reply_to?}` |
| GIF z biblioteki lub URL z narzędzia MCP | `send_gif {gif_id \| url, caption?}` |
| zdjęcie, wideo, głos, audio, plik | `send_media {media_id, caption?}` |
| przesłany wpis | `forward_message {message_id}` |
| reakcja | `react {message_id, emoji}` |
| *(przypomnij sobie starszą historię)* | `search_history {query}` |

Kilka wywołań w jednej turze staje się kilkoma dymkami. Wiadomości drugiej strony stają się zwartymi wierszami, do których odnoszą się identyfikatory:

```text
#52108 19:08 ↩ odpowiedź na #52107 (ty: „lasagne babci 🍝”): Nigdy w życiu nie zrobiłeś lasagne.
<sticker stk_156dbb381a>: kot w czapce kucharza mieszający garnek
zareagował 😂 na #52107 („lasagne babci 🍝”)
```

## Prompt systemowy

| Część | |
|---|---|
| Kim być | oszacować wiedzę i styl postaci i nigdy nie wiedzieć więcej, niż ona by wiedziała |
| Profil stylu | z *całego* eksportu: długość wiadomości, wielkie litery, interpunkcja, użycie emoji i naklejek, nawyki odpowiedzi i reakcji, dymki w turze, dosłowne próbki |
| Biblioteka | naklejki, GIF-y i media z tym, jak były używane |
| Notatki | to, co napisałeś o tej osobie |

Prompt jest dla czatu **statyczny**: bez zegara, bez liczników. Model czyta czas z separatorów `— dzień —`
i znaczników `HH:MM`, a każde zapytanie jest bajt w bajt prefiksem następnego, więc pamięci podręczne promptów dostawców nadal trafiają.

## Długie czaty {#long-chats}

```
 budżet historii ──────────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ pamięć (≤ 350 sł.)   │ najnowsze tury, przycięte do 60 %      │
 └──────────────────────┴────────────────────────────────────────┘
   relacja, fakty,        punkt cięcia długo pozostaje w miejscu,
   tematy, żarty          więc zbuforowany prefiks też
```

Gdy odtwarzana historia przekracza budżet, następna odpowiedź najpierw zwija najstarsze tury (i poprzednią pamięć)
w krótkie podsumowanie. Nic nie jest zużywane przy imporcie ani przy otwieraniu czatu. Profil stylu nadal pochodzi z całego
eksportu, a `search_history` sięga do każdej starej wiadomości. `usage` tokenów (prompt, z pamięci podręcznej, uzupełnienie) jest pokazywane w `{ }`.

## Biblioteka mediów

Model czatu czyta tekst, więc naklejka to tylko `<sticker stk_…>`, dopóki nie zostanie opisana. **Opisz z AI** wysyła
obrazy brakujących elementów do modelu mediów, który musi obsługiwać wizję.

* GIF-y, naklejki wideo i wideo są wysyłane jako **4 klatki po kolei**, żeby model widział ruch. Wymaga to
  [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`); w przeciwnym razie używana jest miniatura.
* **Zrób ponownie** opisuje element jeszcze raz. Każdy opis można edytować ręcznie.
* Opisy należą do eksportu i służą wszystkim jego czatom.

Zobacz sam w [CLI](../reference/cli): `rooftop convert <eksport> --persona "Jonas Weber"`.
