# Fotos y voz

Algunas personas envían sobre todo fotos y otras hablan sobre todo en mensajes de voz. iRoof.top conserva ambos hábitos.

## Entenderlos

En la biblioteca de medios, **Describir con IA** describe stickers, GIF y fotos y **transcribe los mensajes de voz** con el
*modelo de medios*, que debe aceptar imágenes y audio. Configúralo en Ajustes o con `OPENAI_MEDIA_MODEL`, por ejemplo
`google/gemini-3.5-flash-lite` en OpenRouter. Las descripciones solo se generan cuando pulsas el botón, y con un modelo local y el
[Modo sin conexión](../guide/offline) las fotos nunca salen de tu equipo.

```text
<mensaje de voz 0:05: «lo que se dijo»>
```

Cuando predomina un tipo, el perfil de estilo lo indica, p. ej. «habla sobre todo en mensajes de voz (10 de 10)».

### Bibliotecas grandes

Un chat largo puede tener decenas de miles de stickers, GIF y fotos. La biblioteca de medios te ayuda a gastar los tokens del modelo
donde importan:

| Control | Qué hace |
|---|---|
| Pestañas de tipo | Todos, Pendientes, Descritos, Stickers, GIF, Fotos, Vídeos, Voz, con recuentos |
| Orden | más usados (por defecto), menos usados, usados recientemente, usados por primera vez |
| Número de usos | oculta los elementos usados menos de 2, 3, 5, 10 o 25 veces |
| Búsqueda | en descripciones e ids |

**Describir N con IA** describe exactamente lo que se muestra y aún no está descrito, **de arriba abajo en el orden elegido**,
cuatro a la vez. Cada descripción se guarda en cuanto llega. La línea de progreso muestra cuántas están hechas, los fallos,
la velocidad y el tiempo restante. El mismo botón se convierte en **Detener**: puedes parar en cualquier momento, y la siguiente ejecución continúa con
el resto. Un buen comienzo para un chat grande: *Más usados primero* y *Usados 3 o más veces*.

## Tus mensajes de voz

Con el campo de texto vacío, el botón de enviar se convierte en un **micrófono**, como en Telegram. La grabación se convierte a WAV en
el navegador, se sube y se transcribe. Los visitantes de los enlaces para compartir también pueden grabar.

::: info
Los navegadores solo permiten grabar en `https://` o `localhost`.
:::

## Las fotos y la voz de la persona

Conecta un servidor MCP que genere imágenes y otro que hable:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

La persona recibe entonces dos acciones más:

| Acción | Qué hace |
|---|---|
| `send_voice {text}` | llama a la herramienta de voz (WAV, con reintento en mp3) y envía un mensaje de voz |
| `send_photo {prompt, caption?}` | llama a la herramienta de imágenes y envía una foto |

* Con una herramienta de voz conectada, los mensajes de voz transcritos de la propia persona se reproducen como `send_voice`, para que el modelo vea
  el hábito en la forma que puede continuar.
* **Voz** en *Detalles del chat* (por ejemplo `Puck`) le da a la persona su propia voz.
* Cualquier otra imagen o audio que devuelva una herramienta MCP se convierte en medio del chat `gen_…` (se verifica por contenido, hasta 25 MB, y se borra
  con el chat).

::: tip Costes
Cada foto o mensaje de voz es una llamada de pago adicional: unos 0,01 $ por imagen con `meta/muse-image`, y unos segundos de TTS.
:::
