# Configuración

Variables de entorno, un archivo `.env` en el directorio de trabajo, o las opciones correspondientes de `rooftop`
([CLI](./cli)). Los valores definidos en **Ajustes** tienen prioridad sobre el entorno para el endpoint del LLM, el modelo, la clave, la temperatura,
el presupuesto de historial, los pasos de herramientas, los servidores MCP, el bot de Telegram y el Modo sin conexión. `TELEGRAM_BOT_TOKEN` tiene prioridad sobre Ajustes.

## Modelo

| Variable | Por defecto | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | cualquier API compatible con OpenAI: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | token de portador |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | debe admitir llamadas a herramientas |
| `OPENAI_TEMPERATURE` | el del proveedor | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | describe imágenes y transcribe voz, p. ej. `xiaomi/mimo-v2.6-flash` |

## Modo sin conexión

| Variable | Por defecto | |
|---|---|---|
| `ROOFTOP_OFFLINE` | desactivado | `1`, `true`, `yes` u `on`: solo modelos y servidores MCP locales (este equipo o la red), sin compartir por internet, sin Telegram. Igual que el interruptor **Sin conexión** de Ajustes, pero Ajustes no puede desactivarlo. La app de escritorio también lo respeta. [Sin conexión y privacidad](../guide/offline) |

## Servidor

| Variable | Por defecto | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` en Docker) | con `0.0.0.0:<puerto>` el log muestra la URL de la LAN |
| `ROOFTOP_DATA` | `./data` (`/data` en Docker) | exportaciones, chats, ajustes |
| `ROOFTOP_IMPORT` | – | exportaciones a importar al iniciar, separadas por `:`, idempotente |
| `ROOFTOP_PASSWORD` | – | autenticación HTTP Basic para la interfaz del propietario (cualquier nombre de usuario). **Defínela en un servidor público** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | límite de subida para el propietario en MiB; `0` significa ninguno (las exportaciones son de muchos GB). Defínelo en un servidor al que otros puedan acceder. Los enlaces para compartir mantienen su propio límite de 16 MiB. La app de escritorio no tiene límite |
| `ROOFTOP_TRUST_PROXY` | `false` | IP del cliente desde `X-Forwarded-For` / `X-Real-IP`, solo detrás de un proxy inverso |
| `ROOFTOP_FFMPEG` | `ffmpeg` en el `PATH`, luego Homebrew, `/usr/local`, `/usr/bin` | fotogramas de GIF y vídeos (opcional) |
| `TZ` | UTC | zona horaria de los mensajes en vivo |

## Telegram

| Variable | Por defecto | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | tu bot de [@BotFather](https://t.me/BotFather) ([Responder desde Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | cualquier grupo al que se una el bot | ids de grupos permitidos, separados por comas |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | p. ej. un servidor Bot API propio |

## Relé

| Variable | Por defecto | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | relé para compartir por **Internet** y el bot compartido |
| `ROOFTOP_RELAY_DOMAIN` | – | ejecuta un [hub de relé](./relay-hub) para este dominio |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | el bot compartido del hub; debe ser distinto de `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | nombres máximos que guarda un hub |

## Solo en Ajustes {#settings-only}

| Ajuste | Por defecto | |
|---|---|---|
| Presupuesto de historial | `120000` caracteres | cuánto historial se reproduce antes de que entre la [memoria](../features/how-it-works#long-chats) |
| Pasos máximos de herramientas | `6` | rondas del LLM por respuesta (búsqueda, herramienta MCP, respuesta…) |
