# Responder desde Telegram

Un enlace para compartir puede publicar los mensajes de sus visitantes en un grupo de Telegram. Respondes allí tú mismo, o la IA responde cuando
termina una cuenta atrás. Los visitantes ven el mismo «escribiendo…» en ambos casos y no pueden saber quién respondió: un juego de «¿humano o IA?», o una
mesa de soporte en la que la IA atiende las preguntas obvias.

```
 visitante ──▶ enlace para compartir ──▶ 🤖 bot ──▶ tu grupo de Telegram
                                        ├─ ✍️ Responder      respondes tú
                                        └─ 🤖 Respuesta IA (10 s) la IA responde ahora, o al terminar la cuenta atrás
```

## Configuración

**Ajustes → Telegram** muestra el bot, si está conectado, y cada grupo en el que está.

| Modo | Configuración | Los mensajes van |
|---|---|---|
| **Bot compartido** | ninguna | a través del relé (iroof.top), en texto plano como cualquier bot |
| **Bot propio** | crea uno con [@BotFather](https://t.me/BotFather), pega el token y **Conectar** | directamente entre tu app y Telegram |
| `TELEGRAM_BOT_TOKEN` | en un servidor; `TELEGRAM_CHAT_ID` limita los grupos | directamente; tiene prioridad sobre Ajustes |

Después pulsa **Añadir a un grupo**:

1. Abre el enlace en la **app de Telegram**, en **Telegram Web**, o escanea el código QR con tu teléfono. Ambos enlaces se pueden copiar.
2. Elige un grupo (o crea uno) y confirma.
3. El diálogo se pone verde, y el grupo aparece en Ajustes y en cada enlace para compartir.

Con el bot compartido, el enlace lleva un código de un solo uso, válido durante una hora, que vincula el grupo solo a tu app.

Por último, elige el grupo en **Grupo de Telegram** dentro de un enlace para compartir, y define cuántos segundos después la IA responde
(`0` = solo cuando pulsas **Respuesta IA**).

::: tip Privacidad
Solo se publican en el grupo los mensajes nuevos de visitantes y las respuestas de la IA, nunca el historial exportado. El Modo sin conexión desactiva
el bot. Detalles: [Sin conexión y privacidad](../guide/offline#the-telegram-bot).
:::

::: tip No hace falta una dirección pública
Ambos tipos de bot usan long polling, así que funciona desde un portátil. Un token de bot funciona en una sola app a la vez.
:::

## Tres formas de responder

1. Responde a la indicación «✍️ … responde a este mensaje» del bot.
2. Responde al mensaje del visitante (o a una respuesta de la IA) en cualquier momento, sin pulsar **Responder**.
3. Pulsa **Responder** y escribe. Durante 15 minutos tus mensajes van a ese visitante, y 2 minutos más después de cada
   respuesta, así que una respuesta puede abarcar varios mensajes.

La tercera forma necesita que el bot vea los mensajes normales del grupo: desactiva el modo de privacidad (@BotFather → `/setprivacy` → Disable, y luego
vuelve a añadir el bot) o hazlo administrador. Las formas 1 y 2 siempre funcionan.

::: warning Usa un grupo de confianza
Cualquiera del grupo puede responder. Solo se retransmiten las respuestas de texto, y las respuestas de la IA cuentan contra el límite del enlace.
:::
