# Cómo funciona

<div class="wide">

![Cómo funciona iRoof.top](/how-it-works.svg)

</div>

Cada exportación se convierte en los mismos mensajes normalizados. Después, cada acción de la persona se reproduce ante el modelo como una
**llamada a herramienta**, para que aprenda *cómo* interactúa la persona, no solo lo que escribe, y responda de la misma manera.

## Acciones como llamadas a herramientas

| Lo que hizo la persona | Llamada a herramienta en el historial y en las respuestas en vivo |
|---|---|
| burbuja de texto, quizá una respuesta o una cita parcial | `send_message {text, reply_to?, quote?}` |
| sticker | `send_sticker {sticker_id, reply_to?}` |
| GIF de la biblioteca, o una URL de una herramienta MCP | `send_gif {gif_id \| url, caption?}` |
| foto, vídeo, voz, audio, archivo | `send_media {media_id, caption?}` |
| publicación reenviada | `forward_message {message_id}` |
| reacción | `react {message_id, emoji}` |
| *(recordar historial antiguo)* | `search_history {query}` |

Varias llamadas en un turno se convierten en varias burbujas. Los mensajes del otro lado se convierten en líneas compactas a las que se refieren los ids:

```text
#52108 19:08 ↩ respuesta a #52107 (tuyo: "lasaña de la abuela 🍝"): Nunca has hecho lasaña ni una sola vez.
<sticker stk_156dbb381a>: un gato con gorro de cocinero, removiendo una olla
reaccionó 😂 a #52107 ("lasaña de la abuela 🍝")
```

## El prompt del sistema

| Parte | |
|---|---|
| Quién ser | estima los conocimientos y el estilo de la persona, y nunca sabe más de lo que ella sabría |
| Perfil de estilo | de la exportación *completa*: longitud de los mensajes, mayúsculas, puntuación, uso de emoji y stickers, hábitos de respuesta y reacción, burbujas por turno, muestras textuales |
| Biblioteca | stickers, GIF y medios con cómo se usaron |
| Notas | lo que escribiste sobre la persona |

El prompt es **estático** para un chat: sin reloj, sin contadores. El modelo lee la hora de los separadores `— día —` y de las marcas `HH:MM`,
y cada petición es un prefijo idéntico byte a byte de la siguiente, así que las cachés de prompts de los proveedores siguen acertando.

## Chats largos {#long-chats}

```
 presupuesto de historial ─────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ memoria (≤ 350 pal.) │ turnos recientes, recortados al 60 %   │
 └──────────────────────┴────────────────────────────────────────┘
   relación, datos,        el punto de corte se mantiene durante
   temas, bromas          mucho tiempo, así que el prefijo en caché también
```

Cuando el historial reproducido supera el presupuesto, la siguiente respuesta primero resume los turnos más antiguos (y la memoria anterior)
en un resumen corto. Nada se gasta al importar ni al abrir un chat. El perfil de estilo sigue viniendo de toda la
exportación, y `search_history` alcanza cada mensaje antiguo. El `usage` de tokens (prompt, en caché, completado) se muestra en `{ }`.

## Biblioteca de medios

El modelo de chat lee texto, así que un sticker es solo `<sticker stk_…>` hasta que se describe. **Describir con IA** envía
las imágenes de los elementos que faltan al modelo de medios, que debe admitir visión.

* Los GIF, los stickers de vídeo y los vídeos se envían como **4 fotogramas en orden**, para que el modelo vea el movimiento. Esto requiere
  [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`); si no, se usa la miniatura.
* **Rehacer** describe un elemento de nuevo. Cualquier descripción se puede editar a mano.
* Las descripciones pertenecen a la exportación y sirven a todos sus chats.

Compruébalo tú mismo con la [CLI](../reference/cli): `rooftop convert <exportación> --persona "Jonas Weber"`.
