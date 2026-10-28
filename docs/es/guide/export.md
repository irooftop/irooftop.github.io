# Exportar un chat

<div class="wide">

![Telegram Desktop: abre el chat, haz clic en ⋯ en la esquina superior derecha, elige Exportar historial del chat…, y luego Exportar](/img/telegram-export.svg)

</div>

## Telegram

En **Telegram Desktop** (macOS, Windows, Linux): abre el chat → **⋯** → **Exportar historial del chat…** → **Exportar**.

* Mantén activados fotos, vídeos, mensajes de voz, stickers y GIF: la persona los usa.
* Ambos formatos funcionan: **HTML** (`messages.html`) y **JSON** legible por máquina (`result.json`).
* Suelta la carpeta de exportación, o un `.zip` de ella, en la página.

## WhatsApp

En el teléfono: abre el chat → **⋮ → Más → Exportar chat** (iPhone: toca el nombre del contacto → **Exportar chat**) →
**Incluir archivos multimedia**. Envía el `.zip` a tu equipo y suéltalo en la página.

Un chat exportado sin medios es un único `.txt`, y también funciona.

## Exportaciones grandes

Las exportaciones de más de 100 000 mensajes y de muchos gigabytes funcionan igual: suelta la carpeta. La página muestra lo que ocurre:

1. **Leyendo carpeta…** cuenta los archivos (el navegador puede tardar en listar decenas de miles).
2. **El chat va primero.** Las páginas de mensajes (o `result.json`, o el `.txt` de WhatsApp) se suben y leen antes que los medios. Si esta exportación **ya está importada**, la importación termina aquí y la abre, y no se sube ningún medio. Si los medios no caben en el disco, se te indica cuánto espacio hace falta antes de enviar nada grande.
3. **Subiendo 1,2 GB de 3,4 GB (35 %) · 9 000 de 30 905 archivos**: los medios siguen en lotes pequeños, uno tras otro. El navegador nunca crea una única petición gigante, y un lote que se interrumpe se reintenta por sí solo. No hay límite de tamaño si lo ejecutas en tu propio equipo.
4. **Leyendo mensajes: página 37 de 121 · 36 000 mensajes**: todas las páginas se leen una vez, en paralelo.
5. **Comprobando medios** y **Moviendo medios**: los archivos se calculan con hash para detectar duplicados y se mueven (no se copian dos veces) a la carpeta de datos.
6. **Guardando**, y después se abre el diálogo *Chat nuevo*.

Solo se ejecuta una importación a la vez; un error se mantiene visible en la zona de arrastre y puedes volver a elegir la carpeta.

En la [app de escritorio](./desktop) no ocurre nada de esta subida: la app lee la carpeta, el `.zip` o el `.txt` desde donde están
(pasos 4 a 6), lo que es más rápido y no se ve afectado por los problemas del navegador de abajo.

::: details Cuando un archivo no se puede subir (navegador)
Un archivo que el navegador ya no puede leer (movido, cambiado o un marcador de iCloud/OneDrive que no está descargado) se detecta y se omite,
y también se omite un archivo único que sigue rompiendo su lote: el lote se divide hasta aislarlo. Los medios omitidos aparecen como
no disponibles en el chat; el mensaje posterior a la importación indica uno, y la consola del navegador los lista todos. Si el propio archivo de chat no
se puede enviar, la importación se detiene y lo indica. Los errores muestran lo que recibió el servidor,
p. ej. `el servidor recibió 1 200 de 4 096 bytes`, para distinguir fácilmente un problema de conexión o del navegador.
:::

Durante una importación no sale nada de tu equipo y no se llama a ningún modelo. Los medios se describen solo cuando pulsas **Describir** en la biblioteca de medios.

Con `rooftop --import <carpeta>` la carpeta se lee en su sitio y sus archivos se copian, nunca se mueven; el progreso se registra en el log.
Para una exportación enorme en el mismo equipo es la forma más rápida: sin subida y sin segunda copia en una carpeta temporal.

## Qué se reconoce

| Origen | Archivos |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (se usa cuando la carpeta no tiene `messages.html`) |
| WhatsApp | `WhatsApp Chat with <nombre>.txt` (Android) o `_chat.txt` (iOS), en una carpeta, un `.zip` o solo |

* **Telegram**: texto con saltos de línea, enlaces, citas y código; respuestas y citas parciales; reenvíos; ediciones; mensajes de servicio;
  reacciones; vistas previas de enlaces; foto, vídeo, vídeo redondo, voz, audio, archivo, sticker (`.webp`, `.webm`,
  `.tgs`), GIF, ubicación, contacto, encuesta y llamada.
* **WhatsApp**: formatos de Android e iOS, relojes de 12 y 24 horas y ambos órdenes día/mes, detectados por archivo.
  Se conservan los mensajes de varias líneas, las ediciones y los adjuntos. Los mensajes eliminados y el aviso de cifrado se omiten,
  y `<Media omitted>` se marca como no disponible.

Los archivos multimedia se calculan con hash, así que un sticker enviado cinco veces se convierte en un único elemento de la biblioteca (`stk_…`, `gif_…`, `pho_…`).

::: info Reacciones en exportaciones HTML
Las exportaciones HTML no indican quién reaccionó. En chats uno a uno, una reacción se atribuye al otro participante, y a ambos cuando el recuento es 2.
:::
