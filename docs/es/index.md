---
layout: home

hero:
  name: iRoof.top
  text: Habla con las personas que echas de menos
  tagline: Exporta un chat de Telegram o WhatsApp. Un LLM lo continúa al estilo de una persona, con sus burbujas, stickers, GIF, reacciones y voz. En tu ordenador, con cualquier modelo, y sin conexión si quieres.
  actions:
    - theme: brand
      text: Empezar
      link: /es/guide/getting-started
    - theme: alt
      text: Descargar la app
      link: /es/guide/desktop
    - theme: alt
      text: Cómo funciona
      link: /es/features/how-it-works

features:
  - title: Su estilo, no solo sus palabras
    details: Un perfil de estilo de toda la exportación, y cada burbuja, sticker, GIF, respuesta y reacción se reproduce ante el modelo como una llamada a herramienta.
    link: /es/features/how-it-works
    linkText: Cómo funciona
  - title: Privado, y sin conexión si quieres
    details: Los chats se quedan en tu carpeta de datos. Con un modelo local y el modo sin conexión activado, la app rechaza cada solicitud que saldría de tu ordenador.
    link: /es/guide/offline
    linkText: Sin conexión y privacidad
  - title: Años de chat, gigabytes de medios
    details: Importa más de 120.000 mensajes y 30.000 archivos con progreso en vivo. Una reimportación se detecta por los mensajes, antes de subir ningún medio.
    link: /es/guide/export#large-exports
    linkText: Exportaciones grandes
  - title: Fotos, stickers y voz
    details: Una biblioteca de medios que describe lo enviado y transcribe la voz, en el orden que elijas, y que puedes detener en cualquier momento.
    link: /es/features/media
    linkText: Fotos y voz
  - title: Enlaces para compartir
    details: Deja que un amigo hable con el personaje en /s/nombre, con PIN y límites, en tu Wi‑Fi o en nombre.iroof.top.
    link: /es/features/share-links
    linkText: Enlaces para compartir
  - title: Responder desde Telegram
    details: Los mensajes de los visitantes llegan a tu grupo de Telegram. Responde tú, o deja que la IA conteste tras una cuenta atrás.
    link: /es/features/telegram
    linkText: Telegram
  - title: Cualquier modelo, cualquier servidor MCP
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… y herramientas MCP por Streamable HTTP o stdio.
    link: /es/features/mcp
    linkText: Herramientas MCP
  - title: Nada oculto
    details: El JSON exacto que se envía al modelo está a un clic, con su tamaño, el presupuesto del historial y los tokens usados.
    link: /es/guide/getting-started#what-s-in-the-window
    linkText: Qué hay en la ventana
  - title: Un binario pequeño
    details: Un servidor en Rust con la interfaz web dentro, apps de escritorio para macOS, Windows y Linux, Homebrew y una imagen de Docker.
    link: /es/guide/getting-started
    linkText: Instalar
---

<div class="home-demo">

![Un chat continúa al estilo de una persona real; después, un amigo abre el enlace compartido en el móvil](/img/demo.svg)

</div>

## Empieza en un minuto

::: code-group

```sh [App de escritorio]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [Sin conexión]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Luego, tres pasos: **[exporta un chat](/es/guide/export)** desde Telegram Desktop o WhatsApp, **arrastra** la carpeta, el `.zip`
o el `.txt` a la página y pulsa **New chat** para elegir quién hace de IA: la otra persona, o tú mismo.
¿No tienes un chat a mano? Prueba los ficticios: `rooftop --import ./examples/telegram`.
(Los nombres de los botones de la app están en inglés, como la propia app.)

## Cómo funciona

<div class="wide">

![Un export de Telegram o WhatsApp entra en iRoof.top, un LLM escribe las respuestas y la conversación continúa](/how-it-works.svg)

</div>

El export se lee una sola vez, en tu ordenador. En cada respuesta el modelo recibe un prompt del sistema con el perfil de
estilo, tus notas y las descripciones de los medios, y después la parte más reciente del chat que cabe en el
[presupuesto de historial](/es/reference/configuration#settings-only). Las partes antiguas se pliegan en un resumen breve, y el
personaje sigue pudiendo buscarlas. El modelo responde con llamadas a herramientas (`send_message`, `send_sticker`, `react`…), que se convierten en burbujas, stickers y reacciones. [Más →](/es/features/how-it-works)

## Adónde va tu chat

| | Red |
|---|---|
| Importar, el perfil de estilo, la búsqueda y el almacenamiento | ninguna: todo ocurre en tu ordenador |
| Una respuesta, un resumen de memoria | el endpoint del modelo que elijas, y nada más |
| Describir medios, transcribir voz | el modelo de medios, solo cuando pulsas **Describe** |
| Enlaces para compartir por internet, Telegram | solo si los activas; el [modo sin conexión](/es/guide/offline) los desactiva |

## Preguntas

::: details ¿Qué modelo debo usar?
Cualquier modelo de chat con **llamadas a herramientas** detrás de un endpoint `/chat/completions` compatible con OpenAI. Los modelos más grandes imitan mejor un estilo. Para **Describe** en la biblioteca de medios, el modelo de medios también debe aceptar imágenes (y audio para los mensajes de voz). **Test** en Ajustes te dice con palabras sencillas qué falla, por ejemplo una clave rechazada o un modelo desconocido.
:::

::: details ¿Cuánto cuesta?
Nada con un modelo local. Con un modelo en la nube pagas a tu proveedor por token: una respuesta cuesta aproximadamente un presupuesto de historial de entrada (120.000 caracteres ≈ 34 k tokens por defecto; el prompt está pensado para ser cacheable, así que los proveedores con caché de prompts cobran la mayor parte a la tarifa cacheada) más unas pocas llamadas cortas a herramientas. Reduce el presupuesto en Ajustes para pagar menos por respuesta.
:::

::: details ¿Mi exportación tiene que ser pequeña?
No. Las exportaciones de más de 120.000 mensajes y 13 GB de medios se importan bien, desde el navegador o con `rooftop --import <carpeta>`. La búsqueda y el presupuesto de historial mantienen igual de grande el prompt de cada respuesta, por largo que sea el chat.
:::

::: details ¿Puede un amigo hablar con el personaje?
Sí, con un [enlace para compartir](/es/features/share-links): en tu Wi‑Fi, o por internet en `nombre.iroof.top`, con PIN y límites de mensajes. Los visitantes solo ven el chat: nada de ajustes, notas, prompts ni otros chats.
:::

::: tip Una nota sobre el cuidado
Esto sirve para estar cerca de personas que están lejos. El personaje se mantiene en su papel, pero responde con honestidad si preguntas sinceramente si hablas con una IA, y responde con cuidado si parece que estás en apuros.
:::
