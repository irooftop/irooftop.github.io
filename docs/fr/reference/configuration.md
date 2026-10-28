# Configuration

Variables d'environnement, un fichier `.env` dans le répertoire de travail, ou les options `rooftop` correspondantes
([CLI](./cli)). Les valeurs définies dans **Paramètres** priment sur l'environnement pour le point d'accès LLM, le modèle, la clé, la température,
le budget d'historique, les étapes d'outils, les serveurs MCP, le bot Telegram et le mode hors ligne. `TELEGRAM_BOT_TOKEN` prime sur les Paramètres.

## Modèle

| Variable | Par défaut | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | toute API compatible OpenAI : OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | jeton porteur |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | doit prendre en charge l'appel d'outils |
| `OPENAI_TEMPERATURE` | celle du fournisseur | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | décrit les images et transcrit la voix, par ex. `xiaomi/mimo-v2.6-flash` |

## Hors ligne

| Variable | Par défaut | |
|---|---|---|
| `ROOFTOP_OFFLINE` | désactivé | `1`, `true`, `yes` ou `on` : seulement les modèles et serveurs MCP locaux (cet ordinateur ou le réseau), pas de partage sur Internet, pas de Telegram. Identique à l'interrupteur **Hors ligne** des Paramètres, mais les Paramètres ne peuvent pas le désactiver. L'application de bureau le respecte aussi. [Hors ligne et confidentialité](../guide/offline) |

## Serveur

| Variable | Par défaut | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` dans Docker) | avec `0.0.0.0:<port>`, le journal affiche l'URL du LAN |
| `ROOFTOP_DATA` | `./data` (`/data` dans Docker) | exports, chats, paramètres |
| `ROOFTOP_IMPORT` | – | exports à importer au démarrage, séparés par `:`, idempotent |
| `ROOFTOP_PASSWORD` | – | authentification HTTP Basic pour l'interface propriétaire (nom d'utilisateur quelconque). **À définir sur un serveur public** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | limite d'envoi pour le propriétaire en MiB ; `0` signifie aucune (les exports font plusieurs Go). À définir sur un serveur accessible à d'autres. Les liens de partage gardent leur propre limite de 16 MiB. L'application de bureau n'a pas de limite |
| `ROOFTOP_TRUST_PROXY` | `false` | IP du client depuis `X-Forwarded-For` / `X-Real-IP`, seulement derrière un proxy inverse |
| `ROOFTOP_FFMPEG` | `ffmpeg` dans le `PATH`, puis Homebrew, `/usr/local`, `/usr/bin` | images des GIF et vidéos (facultatif) |
| `TZ` | UTC | fuseau horaire des messages en direct |

## Telegram

| Variable | Par défaut | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | votre bot depuis [@BotFather](https://t.me/BotFather) ([Répondre depuis Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | tout groupe que le bot rejoint | identifiants de groupes autorisés, séparés par des virgules |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | par ex. un serveur Bot API auto-hébergé |

## Relais

| Variable | Par défaut | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | relais pour le partage par **Internet** et le bot partagé |
| `ROOFTOP_RELAY_DOMAIN` | – | exécute un [hub relais](./relay-hub) pour ce domaine |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | le bot partagé du hub ; doit être différent de `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | nombre maximal de noms conservés par un hub |

## Paramètres uniquement {#settings-only}

| Réglage | Par défaut | |
|---|---|---|
| Budget d'historique | `120000` caractères | quantité d'historique rejouée avant que la [mémoire](../features/how-it-works#long-chats) n'intervienne |
| Étapes d'outils maximum | `6` | tours du LLM par réponse (recherche, outil MCP, réponse…) |
