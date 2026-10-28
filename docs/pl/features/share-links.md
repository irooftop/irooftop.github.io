# Linki udostępniania

**Udostępnij** w nagłówku czatu tworzy linki, dzięki którym inni ludzie mogą rozmawiać z postacią, na przykład:

* znajomy ocenia, jak dobrze AI pisze **w twoim stylu**;
* znajomy rozmawia z **kopią samego siebie**.

Link ma postać `https://<twój host>/s/<nazwa>`. Odwiedzający widzą tylko czat: bez paska bocznego, ustawień, notatek, opisów mediów,
promptu, zużycia tokenów ani innych czatów.

## Opcje

| Opcja | Domyślnie | |
|---|---|---|
| Kto może otworzyć | ten komputer | przełączniki **Wi‑Fi** i **Internet**, bezpośrednio w edytorze ([poniżej](#open-links-on-other-devices)) |
| Link | losowy | wybierz nazwę, np. `alex` |
| Wyświetlana nazwa | nazwa postaci | prawdziwe nazwiska z eksportu nie są pokazywane |
| PIN | brak | 4–64 znaki, przechowywane jako skrót Argon2id. ✨ generuje 6 cyfr |
| Rozmowy | prywatne | **Prywatne**: jedna rozmowa na odwiedzającego. **Wspólny pokój**: wszyscy w jednej rozmowie |
| Odwiedzający mogą czytać eksport | nic | nic, ostatnie *N* wiadomości albo wszystko |
| Limity | 50 odwiedzających, 200 odpowiedzi każdy | każda odpowiedź kosztuje tokeny z twojego klucza. `0` = bez limitu |
| Odwiedzający mogą kazać zacząć pierwszym | wyłączone | pokazuje przycisk 💬: postać wysyła wiadomość bez wiadomości od odwiedzającego |
| Odwiedzający mogą przepisać odpowiedź | wyłączone | pokazuje przycisk ↻: ostatnia odpowiedź postaci jest pisana od nowa. Oba zużywają jedną odpowiedź z limitu, a serwer je odrzuca, dopóki są wyłączone |
| Wygasa / aktywny | nigdy / tak | wstrzymaj lub wygaś link bez jego usuwania |
| Grupa Telegrama | wyłączona | [odpowiadanie z Telegrama](./telegram) |

W oknie Udostępnij możesz **Czytać** każdą rozmowę odwiedzającego i **Zakończyć** ją, aby ją unieważnić. Każdy odwiedzający pokazuje
adres, z którego pisał ostatnio; przy zakończeniu rozmowy **Zablokuj także** trzyma ten adres z dala od linku
(strona startowa, nowe rozmowy i te już otwarte), dopóki go nie **odblokujesz**. We wspólnej sieci
jeden adres może oznaczać kilka osób. Adresy są przechowywane razem z linkiem, tylko na twoim komputerze.

## Z kim rozmawia postać

Odwiedzający to nie ty. Gdy Mia otwiera twój link, postać wie, że pisze **Mia**, że link
pochodzi od ciebie i że historia oraz twoje notatki dotyczą ciebie i ich, a nie Mii: spotyka ją
jak kogoś nowego. Bez imienia jest tylko gościem.

| | Postać widzi |
|---|---|
| Link prywatny | jedną rozmowę z odwiedzającym, pod imieniem, które podał (albo „Gość”) |
| Wspólny pokój | czat grupowy: każda wiadomość ma nazwę nadawcy, a ludzie mogą dołączyć w każdej chwili |
| Twoją historię z eksportu | twoje wiadomości pod twoim imieniem, potem wiadomości odwiedzającego, żeby nigdy się nie myliły |

Prompt systemowy jest stały dla każdej rozmowy, więc dostawcy go buforują: imię odwiedzającego ustala się
na początku rozmowy, a w pokoju imiona podróżują razem z wiadomościami. Odwiedzający, który nazywa się jak postać albo jak ty,
staje się np. „Alex (gość)”, a druga „Ann” w pokoju — „Ann 2”.

## Zaproszenia

| Link | Otwiera |
|---|---|
| `/s/alex` | stronę startową |
| `/s/alex#pin=2468` | czat od razu. PIN jest po `#`, więc nigdy nie trafia na serwer ani do logów |
| `/s/alex#name=Greg&pin=2468` | to samo, z już wypełnionym imieniem odwiedzającego (działa też `?name=Greg`) |

Przycisk **QR** przy linku otwiera kod do zeskanowania telefonem, dla każdego adresu, który działa. Zaraz po zapisaniu
**Kopiuj zaproszenie z PIN** kopiuje link razem z PIN-em.

## Otwieranie linków na innych urządzeniach {#open-links-on-other-devices}

Na serwerze linki po prostu używają adresu serwera. Aplikacja desktopowa (i `rooftop` na `127.0.0.1`) działa tylko na
twoim komputerze, więc okno Udostępnij i edytor linków mają dwa przełączniki. Każdy pokazuje, czy jest **Aktywny**,
**Łączenie** czy **Nie działa**, a edytor od razu pokazuje adres, jaki będzie miał link.

```
                    ┌──────────── twój komputer ────────────┐
 telefon w Wi‑Fi ───▶│ :8737  tylko strony odwiedzających     │
                    │                                       │
 ktokolwiek ──▶ nazwa.iroof.top ══ jedno wychodzące WebSocket ══▶ aplikacja │
                    │                                       │
                    │ 127.0.0.1  interfejs właściciela,     │
                    │            ustawienia i API           │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi i sieć lokalna | Internet |
|---|---|---|
| Adres | `http://<twój IP>:8737/s/<nazwa>` | `https://<nazwa>.iroof.top/s/<nazwa>` |
| Kto | urządzenia w tej samej sieci | ktokolwiek, dopóki aplikacja działa |
| Jak | drugi nasłuchujący, który obsługuje tylko strony odwiedzających | jedno wychodzące WebSocket do przekaźnika; w internecie nic nie nasłuchuje |
| Twoje dane | zostają na twoim komputerze | zostają na twoim komputerze, ale wiadomości odwiedzających przechodzą przez przekaźnik |

* Port Wi‑Fi pozostaje ten sam po ponownych uruchomieniach, więc wydrukowane kody QR nadal działają. W macOS zezwól na
  połączenia przychodzące, jeśli zapora o to zapyta.
* Nazwę dla internetu wybierasz i zmieniasz sam (**Zmień** obok adresu). Przekaźnik przekazuje tylko
  `/s/…`, `/api/s/…` i zasoby stron, odrzuca ciasteczka w obu kierunkach i pokazuje stronę „offline”, gdy aplikacja jest zamknięta.
* Chcesz własny przekaźnik zamiast iroof.top? Zobacz [Hub przekaźnika](../reference/relay-hub).
* **Tryb offline** wyłącza i blokuje przełącznik internetu; Wi‑Fi nadal działa. Co może zobaczyć przekaźnik:
  [Tryb offline i prywatność](../guide/offline#share-with-friends-safely).

## Ochrona

| Zabezpieczenie | Limit |
|---|---|
| Błędne PIN-y z jednego IP | po 5: blokada na 1 min, potem 2, 4… do 1 h |
| Błędne PIN-y na jednym linku, wszystkie IP | 20 w 15 min: blokada na 5 min, podwajana do 24 h |
| Wiadomości na odwiedzającego | 30 na minutę, 10 odpowiedzi na minutę |
| Nowe rozmowy | 20 na godzinę na IP |

Liczniki są w pamięci. 6-cyfrowego PIN-u nie da się odgadnąć w rozsądnym czasie. Za odwrotnym proxy ustaw
`ROOFTOP_TRUST_PROXY=true`, aby liczniki widziały prawdziwe IP klientów.

Sesje odwiedzających używają losowego tokenu z 26 znaków w `/s/<nazwa>/<token>`, zapamiętanego przez przeglądarkę i chronionego
przed wyciekiem nagłówkiem `Referrer-Policy: no-referrer`. Odwiedzający mogą ładować tylko media, które mogą zobaczyć.
