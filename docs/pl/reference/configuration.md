# Konfiguracja

Zmienne środowiskowe, plik `.env` w katalogu roboczym albo odpowiadające im opcje `rooftop`
([CLI](./cli)). Wartości ustawione w **Ustawieniach** mają pierwszeństwo przed środowiskiem dla endpointu LLM, modelu, klucza, temperatury,
budżetu historii, kroków narzędzi, serwerów MCP, bota Telegrama i trybu offline. `TELEGRAM_BOT_TOKEN` ma pierwszeństwo przed Ustawieniami.

## Model

| Zmienna | Domyślnie | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | dowolne API zgodne z OpenAI: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | token bearer |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | musi obsługiwać wywoływanie narzędzi |
| `OPENAI_TEMPERATURE` | domyślna dostawcy | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | opisuje obrazy i transkrybuje głos, np. `xiaomi/mimo-v2.6-flash` |

## Offline

| Zmienna | Domyślnie | |
|---|---|---|
| `ROOFTOP_OFFLINE` | wyłączone | `1`, `true`, `yes` lub `on`: tylko lokalne modele i serwery MCP (ten komputer lub sieć), bez udostępniania przez internet, bez Telegrama. Tak samo jak przełącznik **Offline** w Ustawieniach, ale Ustawienia nie mogą go wyłączyć. Aplikacja desktopowa też go respektuje. [Tryb offline i prywatność](../guide/offline) |

## Serwer

| Zmienna | Domyślnie | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` w Dockerze) | przy `0.0.0.0:<port>` log pokazuje adres LAN |
| `ROOFTOP_DATA` | `./data` (`/data` w Dockerze) | eksporty, czaty, ustawienia |
| `ROOFTOP_IMPORT` | – | eksporty do zaimportowania przy starcie, oddzielone `:`, idempotentne |
| `ROOFTOP_PASSWORD` | – | uwierzytelnianie HTTP Basic dla interfejsu właściciela (dowolna nazwa użytkownika). **Ustaw na publicznym serwerze** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | limit wysyłania dla właściciela w MiB; `0` oznacza brak (eksporty mają wiele GB). Ustaw na serwerze, do którego mają dostęp inni. Linki udostępniania mają własny limit 16 MiB. Aplikacja desktopowa nie ma limitu |
| `ROOFTOP_TRUST_PROXY` | `false` | IP klienta z `X-Forwarded-For` / `X-Real-IP`, tylko za odwrotnym proxy |
| `ROOFTOP_FFMPEG` | `ffmpeg` w `PATH`, potem Homebrew, `/usr/local`, `/usr/bin` | klatki GIF-ów i wideo (opcjonalnie) |
| `TZ` | UTC | strefa czasowa wiadomości na żywo |

## Telegram

| Zmienna | Domyślnie | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | twój bot z [@BotFather](https://t.me/BotFather) ([Odpowiadanie z Telegrama](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | każda grupa, do której dołączy bot | dozwolone identyfikatory grup, rozdzielone przecinkami |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | np. własny serwer Bot API |

## Przekaźnik

| Zmienna | Domyślnie | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | przekaźnik dla udostępniania przez **Internet** i wspólnego bota |
| `ROOFTOP_RELAY_DOMAIN` | – | uruchamia [hub przekaźnika](./relay-hub) dla tej domeny |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | wspólny bot huba; musi być inny niż `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | maksymalna liczba nazw, jaką przechowuje hub |

## Tylko w Ustawieniach {#settings-only}

| Ustawienie | Domyślnie | |
|---|---|---|
| Budżet historii | `120000` znaków | ile historii jest odtwarzane, zanim wejdzie [pamięć](../features/how-it-works#long-chats) |
| Maks. kroków narzędzi | `6` | rund LLM na odpowiedź (wyszukiwanie, narzędzie MCP, odpowiedź…) |
