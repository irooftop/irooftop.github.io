# Enlaces para compartir

**Compartir** en la cabecera del chat crea enlaces para que otras personas hablen con la persona, por ejemplo:

* un amigo juzga lo bien que la IA escribe **a tu estilo**;
* un amigo habla con **una copia de sí mismo**.

Un enlace es `https://<tu host>/s/<nombre>`. Los visitantes ven solo el chat: sin barra lateral, ajustes, notas, descripciones de medios,
prompt, uso de tokens ni otros chats.

## Opciones

| Opción | Por defecto | |
|---|---|---|
| Quién puede abrirlo | este equipo | interruptores **Wi‑Fi** e **Internet**, en el propio editor ([abajo](#open-links-on-other-devices)) |
| Enlace | aleatorio | elige un nombre como `alex` |
| Nombre visible | nombre de la persona | los nombres reales de la exportación no se muestran |
| PIN | ninguno | 4–64 caracteres, guardado como hash Argon2id. ✨ genera 6 dígitos |
| Conversaciones | privadas | **Privada**: una conversación por visitante. **Sala compartida**: todos en una misma conversación |
| Los visitantes pueden leer la exportación | nada | nada, los últimos *N* mensajes, o todo |
| Límites | 50 visitantes, 200 respuestas cada uno | cada respuesta cuesta tokens de tu clave. `0` = sin límite |
| Los visitantes pueden hacer que escriban primero | desactivado | muestra el botón 💬: la persona envía un mensaje sin que el visitante escriba nada |
| Los visitantes pueden reescribir una respuesta | desactivado | muestra el botón ↻: la última respuesta de la persona se vuelve a escribir. Ambos usan una respuesta del límite, y el servidor los rechaza mientras estén desactivados |
| Caduca / activo | nunca / activo | pausa o caduca un enlace sin borrarlo |
| Grupo de Telegram | desactivado | [responder desde Telegram](./telegram) |

En el diálogo Compartir puedes **Leer** cada conversación de visitante, y **Terminar** una para revocarla. Cada visitante muestra
la dirección desde la que escribió por última vez; al terminar una conversación, **Bloquear también** mantiene esa dirección fuera del enlace
(la página de inicio, las conversaciones nuevas y las que ya están abiertas) hasta que la **desbloquees**. En una red compartida
una dirección puede corresponder a varias personas. Las direcciones se guardan junto al enlace solo en tu equipo.

## A quién habla la persona

Un visitante no eres tú. Cuando Mia abre tu enlace, la persona sabe que **Mia** escribe, que el enlace
viene de ti, y que el historial y tus notas son sobre ti y sobre ellos, no sobre Mia: la conoce
como alguien nuevo. Sin nombre, es solo una invitada.

| | La persona ve |
|---|---|
| Enlace privado | una conversación con el visitante, con el nombre que dio (o «Invitado») |
| Sala compartida | un chat grupal: cada mensaje lleva el nombre de su autor, y la gente puede unirse en cualquier momento |
| Tu historial de exportación | tus mensajes con tu nombre, y después los del visitante, para que nunca se mezclen |

El prompt del sistema es fijo para cada conversación, así que los proveedores lo siguen guardando en caché: el nombre del visitante se fija
cuando empieza la conversación, y en una sala los nombres viajan con los mensajes. Un visitante que se llame como la persona o como tú
pasa a ser, p. ej., «Alex (invitado)», y una segunda «Ann» en una sala pasa a ser «Ann 2».

## Invitaciones

| Enlace | Abre |
|---|---|
| `/s/alex` | la página de inicio |
| `/s/alex#pin=2468` | el chat de inmediato. El PIN va después de `#`, así que nunca llega al servidor ni a los registros |
| `/s/alex#name=Greg&pin=2468` | lo mismo, con el nombre del visitante ya rellenado (`?name=Greg` también funciona) |

El botón **QR** de un enlace abre un código para escanear con un teléfono, para cada dirección que funcione. Justo después de guardar,
**Copiar invitación con PIN** copia el enlace con el PIN.

## Abrir enlaces en otros dispositivos {#open-links-on-other-devices}

En un servidor, los enlaces usan simplemente la dirección del servidor. La app de escritorio (y `rooftop` en `127.0.0.1`) se ejecuta solo en
tu equipo, así que el diálogo Compartir y el editor de enlaces tienen dos interruptores. Cada uno indica si está **Activo**,
**Conectando** o **No funciona**, y el editor muestra de inmediato la dirección que tendrá el enlace.

```
                    ┌──────────── tu equipo ────────────────┐
 teléfono en Wi‑Fi ─▶│ :8737  solo páginas de visitante      │
                    │                                       │
 cualquiera ──▶ nombre.iroof.top ══ una WebSocket saliente ══▶ app │
                    │                                       │
                    │ 127.0.0.1  interfaz del propietario,  │
                    │            ajustes y API              │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi y red local | Internet |
|---|---|---|
| Dirección | `http://<tu IP>:8737/s/<nombre>` | `https://<nombre>.iroof.top/s/<nombre>` |
| Quién | dispositivos de la misma red | cualquiera, mientras la app esté en marcha |
| Cómo | un segundo receptor que solo sirve páginas de visitante | una WebSocket saliente al relé; nada escucha en internet |
| Tus datos | se quedan en tu equipo | se quedan en tu equipo, pero los mensajes de visitantes pasan por el relé |

* El puerto Wi‑Fi se mantiene entre reinicios, así que los códigos QR impresos siguen funcionando. En macOS, permite las
  conexiones entrantes si el cortafuegos lo pide.
* El nombre de Internet lo eliges tú y lo puedes cambiar (**Cambiar** junto a la dirección). El relé reenvía solo
  `/s/…`, `/api/s/…` y recursos de página, descarta las cookies en ambas direcciones, y muestra una página «sin conexión» mientras la app está cerrada.
* ¿Quieres tu propio relé en lugar del de iroof.top? Consulta [Hub de relé](../reference/relay-hub).
* El **Modo sin conexión** desactiva y bloquea el interruptor de Internet; el Wi‑Fi sigue funcionando. Qué puede ver el relé:
  [Sin conexión y privacidad](../guide/offline#share-with-friends-safely).

## Protección

| Protección | Límite |
|---|---|
| PIN incorrectos desde una IP | tras 5: bloqueo de 1 min, luego 2, 4… hasta 1 h |
| PIN incorrectos en un enlace, todas las IP | 20 en 15 min: bloqueo de 5 min, duplicándose hasta 24 h |
| Mensajes por visitante | 30 por minuto, 10 respuestas por minuto |
| Conversaciones nuevas | 20 por hora por IP |

Los contadores viven en memoria. Un PIN de 6 dígitos no se puede adivinar en un tiempo razonable. Detrás de un proxy inverso, define
`ROOFTOP_TRUST_PROXY=true`, para que los contadores vean las IP reales de los clientes.

Las sesiones de visitante usan un token aleatorio de 26 caracteres en `/s/<nombre>/<token>`, que recuerda el navegador, y que
`Referrer-Policy: no-referrer` impide que se filtre. Los visitantes solo pueden cargar los medios que pueden ver.
