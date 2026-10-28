# Odpowiadanie z Telegrama

Link udostępniania może publikować wiadomości swoich odwiedzających w grupie Telegrama. Odpowiadasz tam sam albo AI odpowiada, gdy
skończy się odliczanie. Odwiedzający widzą to samo „pisze…” w obu przypadkach i nie mogą wiedzieć, kto odpowiedział: gra „człowiek czy AI?”, albo
biuro obsługi, w którym AI przejmuje oczywiste pytania.

```
 odwiedzający ──▶ link udostępniania ──▶ 🤖 bot ──▶ twoja grupa Telegrama
                                                  ├─ ✍️ Odpowiedz          odpowiadasz ty
                                                  └─ 🤖 Odpowiedź AI (10 s) AI odpowiada od razu lub gdy minie odliczanie
```

## Konfiguracja

**Ustawienia → Telegram** pokazuje bota, czy jest połączony, i każdą grupę, w której się znajduje.

| Tryb | Konfiguracja | Wiadomości idą |
|---|---|---|
| **Wspólny bot** | brak | przez przekaźnik (iroof.top), jawnym tekstem jak każdy bot |
| **Własny bot** | utwórz go w [@BotFather](https://t.me/BotFather), wklej token i **Połącz** | bezpośrednio między twoją aplikacją a Telegramem |
| `TELEGRAM_BOT_TOKEN` | na serwerze; `TELEGRAM_CHAT_ID` ogranicza grupy | bezpośrednio; ma pierwszeństwo przed Ustawieniami |

Następnie naciśnij **Dodaj do grupy**:

1. Otwórz link w **aplikacji Telegram**, w **Telegram Web** albo zeskanuj kod QR telefonem. Oba linki można skopiować.
2. Wybierz grupę (albo utwórz nową) i potwierdź.
3. Okno zrobi się zielone, a grupa pojawi się w Ustawieniach i w każdym linku udostępniania.

Przy wspólnym bocie link zawiera jednorazowy kod, ważny godzinę, który wiąże grupę tylko z twoją aplikacją.

Na koniec wybierz grupę w polu **Grupa Telegrama** w linku udostępniania i ustaw, po ilu sekundach AI odpowiada
(`0` = tylko gdy naciśniesz **Odpowiedź AI**).

::: tip Prywatność
Do grupy są publikowane tylko nowe wiadomości odwiedzających i odpowiedzi AI, nigdy wyeksportowana historia. Tryb offline wyłącza
bota. Szczegóły: [Tryb offline i prywatność](../guide/offline#the-telegram-bot).
:::

::: tip Nie potrzeba publicznego adresu
Oba typy botów używają long pollingu, więc działa to nawet z laptopa. Token bota działa w jednej aplikacji naraz.
:::

## Trzy sposoby odpowiedzi

1. Odpowiedz na podpowiedź bota „✍️ … odpowiedz na tę wiadomość”.
2. Odpowiedz na wiadomość odwiedzającego (albo na odpowiedź AI) w dowolnym momencie, bez naciskania **Odpowiedz**.
3. Naciśnij **Odpowiedz** i po prostu pisz. Przez 15 minut twoje wiadomości idą do tego odwiedzającego, a przez kolejne 2 minuty po każdej
   odpowiedzi, więc jedna odpowiedź może obejmować kilka wiadomości.

Trzeci sposób wymaga, aby bot widział zwykłe wiadomości grupy: wyłącz tryb prywatności (@BotFather → `/setprivacy` → Disable, a potem
dodaj bota ponownie) albo uczyń go administratorem. Sposoby 1 i 2 działają zawsze.

::: warning Używaj grupy, której ufasz
Odpowiedzieć może każdy w grupie. Przekazywane są tylko odpowiedzi tekstowe, a odpowiedzi AI liczą się do limitu linku.
:::
