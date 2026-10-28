# Sin conexión y privacidad

iRoof.top guarda tus chats en tu equipo. Con un modelo que también se ejecuta en tu equipo, **nada tiene que salir de él**.
El **Modo sin conexión** convierte eso en una regla que la app aplica, no en un hábito.

## Qué ocurre en local

| Paso | Dónde se ejecuta | Red |
|---|---|---|
| Importación, análisis, el perfil de estilo | tu equipo | ninguna |
| Almacenamiento | archivos JSON y medios en el directorio de datos | ninguna |
| Búsqueda en el historial, PIN de los enlaces, biblioteca de medios | tu equipo | ninguna |
| Describir fotos, stickers, GIF, vídeos | el **modelo de medios**, solo cuando pulsas **Describir con IA** | una petición por elemento al endpoint del modelo |
| Transcribir voz | el modelo de medios, cuando pulsas **Describir con IA** en un mensaje de voz, o al grabar uno | una petición al endpoint del modelo |
| Una respuesta | el **modelo de chat**, cuando envías un mensaje (o lo envía un visitante) | peticiones al endpoint del modelo |
| Compactar un historial largo | el modelo de chat, como parte de una respuesta, cuando el historial supera el presupuesto | una petición extra al endpoint del modelo |

Importar nunca llama a un modelo. La primera llamada ocurre cuando envías un mensaje, pulsas **Describir** o grabas un
mensaje de voz. Una respuesta envía al modelo tu historial exportado (hasta el [presupuesto de historial](../reference/configuration#settings-only)),
el perfil de estilo y las descripciones de los medios. Así que **dónde se ejecuta el modelo decide adónde van tus chats**:
un endpoint en la nube los recibe; un modelo en tu equipo, no.

## Funcionar solo sin conexión

1. Instala [Ollama](https://ollama.com) o [LM Studio](https://lmstudio.ai), o ejecuta `llama-server` de llama.cpp.
2. Descarga un **modelo de chat que admita llamadas a herramientas**, y un **modelo de visión** si quieres que se describan fotos y stickers.
3. En **Ajustes** elige el endpoint y el modelo, y activa **Sin conexión**:

| Servidor | URL base |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| `llama-server` de llama.cpp | `http://localhost:8081/v1` (su puerto por defecto, `8080`, es el de iRoof.top: arráncalo con `llama-server --port 8081`) |

4. Pulsa **Probar**. Envía una petición pequeña y muestra el modelo y el host que respondieron. Puedes apagar la red y seguir chateando.

La **app de escritorio** se configura en Ajustes. No lee tu shell ni un archivo `.env` (consulta [App de escritorio](./desktop)),
aunque sí respeta `ROOFTOP_OFFLINE` y `OPENAI_*` si están en el entorno con el que se inició. Un servidor
lee el entorno (y `.env`):

::: code-group

```sh [Homebrew / servidor cargo]
# --offline equivale a ROOFTOP_OFFLINE=1
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=llama3.1 rooftop --offline
```

```sh [Docker]
docker run -p 8080:8080 -v rooftop-data:/data \
  --add-host=host.docker.internal:host-gateway \
  -e ROOFTOP_OFFLINE=1 \
  -e OPENAI_BASE_URL=http://host.docker.internal:11434/v1 -e OPENAI_MODEL=llama3.1 \
  ghcr.io/irooftop/rooftop
```

:::

En Docker, `localhost` es el propio contenedor, así que usa `host.docker.internal` (la opción `--add-host` solo hace falta en Linux).
Si Ollama rechaza la conexión, haz que escuche en todas las interfaces (`OLLAMA_HOST=0.0.0.0`).

### Qué aplica el Modo sin conexión

| | Modo sin conexión |
|---|---|
| Chat, resumen del historial, descripción de medios, transcripción de voz | rechazado salvo que el endpoint sea [local](#local-means) |
| Servidores MCP accedidos por HTTP | rechazado salvo que sea local; aparece como error en Ajustes |
| Compartir por internet (`<nombre>.iroof.top`) | desactivado: el cliente de relé no se inicia y el interruptor queda bloqueado |
| Bot de Telegram, propio o compartido | no se inicia |
| GIF por URL | la IA no puede enviar un GIF desde una URL que no sea local |
| Enlaces por Wi‑Fi | funcionan |

Una petición rechazada falla antes de abrir ninguna conexión, y el mensaje explica por qué: `Modo sin conexión: https://openrouter.ai
no es un endpoint local`. Una redirección desde un endpoint local a otro host también se rechaza. Mientras el modo está activo,
una pequeña insignia **Sin conexión** aparece en la cabecera de la barra lateral. El ajuste se guarda. `--offline` / `ROOFTOP_OFFLINE=1`
lo activan independientemente de Ajustes, y Ajustes no puede desactivarlo.

#### Local significa {#local-means}

`localhost`, loopback (`127.0.0.0/8`, `::1`), direcciones de red privada (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
direcciones link-local, y los nombres `*.local` y `*.internal` (como `host.docker.internal`). Un modelo en otro
equipo de tu red doméstica cuenta como local, porque nunca sale de tu red. Los nombres se juzgan por cómo están
escritos; no se resuelven.

### Lo que el Modo sin conexión no puede comprobar

* Los **servidores MCP por stdio** son programas de tu equipo. iRoof.top los inicia, pero no puede ver a qué se conectan,
  así que añade solo los que confíes en que se mantengan en local.
* La **transcripción de voz** usa la API de chat (una parte `input_audio`), no la API `/audio/transcriptions` de Whisper.
  Necesita un servidor y un modelo locales que acepten audio ahí. Si el tuyo no lo acepta, el mensaje de voz se guarda y se
  envía igualmente; solo falta su texto.
* La **generación de imágenes y voz** existe solo como [herramientas MCP](../features/mcp). Sin conexión, usa un servidor MCP local para ellas.
* Las personas con las que compartes abren tus enlaces Wi‑Fi en sus propios navegadores. El Modo sin conexión regula esta app, no sus dispositivos.

## Compartir con amigos de forma segura {#share-with-friends-safely}

| Enlace | Qué ocurre |
|---|---|
| **Wi‑Fi** `http://<tu IP>:8737/s/<nombre>` | nunca sale de tu red local |
| **Internet** `https://<nombre>.iroof.top/s/<nombre>` | la app abre una única conexión WebSocket saliente al hub, que reenvía por ella las peticiones HTTP del visitante y las respuestas de tu app |

Con un enlace de Internet, tu exportación, tus chats y el modelo se quedan en tu equipo, y el hub no guarda ninguno de ellos.
El hub guarda solo un registro de cuenta: tu nombre, un hash de tu secreto y la última vez que te vio.

Hay que ser claros sobre lo que esto *no* te da. El hub termina el TLS, así que, como cualquier proxy inverso, técnicamente ve
el tráfico que pasa por él: lo que escribe el visitante, las respuestas de la persona y el historial que el enlace permite
leer a los visitantes (**Los visitantes pueden leer la exportación**, por defecto **nada**). Solo reenvía las páginas de visitante (`/s/…`,
`/api/s/…`, recursos de página) y descarta las cookies en ambas direcciones, y tu interfaz de propietario y tus ajustes nunca
son accesibles a través de él. Si eso es demasiada confianza, usa enlaces Wi‑Fi, o [ejecuta tu propio hub de relé](../reference/relay-hub).
[Más sobre los enlaces para compartir](../features/share-links).

Con el **Modo sin conexión**, el relé de iroof.top está desactivado. Los enlaces Wi‑Fi siguen funcionando.

## El bot de Telegram {#the-telegram-bot}

[Responder desde Telegram](../features/telegram) publica en tu grupo:

* los **mensajes de visitantes** nuevos (nombre, nombre del enlace, texto, o una etiqueta de medio con su descripción o transcripción, y una vista previa corta
  del mensaje al que responden), y las **respuestas** de la IA;
* nunca el historial exportado. Los mensajes antiguos no se transmiten.

Los bots no tienen cifrado de extremo a extremo: el texto pasa por Telegram en texto plano. Con el **bot compartido**, también pasa
por el hub, que solo guarda qué grupo pertenece a qué cuenta. Un **bot propio** habla directamente con
Telegram, sin el hub. El Modo sin conexión desactiva ambos.

## Adónde van tus datos

| Datos | Adónde van |
|---|---|
| Exportaciones, chats, ajustes, clave de API | el directorio de datos de tu equipo |
| Importación y perfil de estilo | a ningún sitio |
| Historial, perfil de estilo, tus mensajes | el endpoint de modelo que elegiste, en cada respuesta |
| Fotos y voz | el endpoint del modelo de medios, al pulsar **Describir** o al grabar un mensaje de voz |
| Mensajes de visitantes en un enlace Wi‑Fi | tu equipo y tu endpoint de modelo |
| Mensajes de visitantes en un enlace de Internet | el hub (en tránsito), tu equipo, tu endpoint de modelo |
| Mensajes de visitantes con Telegram | además, Telegram, y el hub para el bot compartido |
| Modo sin conexión | solo el endpoint de modelo local, solo enlaces Wi‑Fi, sin Telegram |
