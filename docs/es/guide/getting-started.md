# Primeros pasos

## Instalar {#install}

| | Comando |
|---|---|
| **App de escritorio**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **App de escritorio**, Windows | [Instalador (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) o [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **App de escritorio**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) o [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Servidor**, macOS y Linux | `brew install irooftop/tap/rooftop` (después, `brew services start rooftop`) |
| **Servidor**, en cualquier equipo con Rust ≥ 1.88 | `cargo install rooftop` |
| **Servidor**, contenedor | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

La app de escritorio no necesita terminal: consulta [App de escritorio](./desktop).

## Ejecutar

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # el valor por defecto; sirve cualquier API compatible con OpenAI
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # debe admitir llamadas a herramientas
rooftop                                               # http://127.0.0.1:8080
```

Las variables también pueden estar en un archivo `.env` junto al lugar desde el que inicias `rooftop`, o configurarse
después en **Ajustes**.
**Probar** en Ajustes envía una petición pequeña y te explica con palabras sencillas qué falla, por ejemplo
«openrouter.ai rechazó la clave de API (401)».

¿Quieres que nada salga de tu equipo? Usa un modelo local y el [Modo sin conexión](./offline).

## Tu primer chat

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Exportar  │ ──▶ │ 2. Suéltalo en     │ ──▶ │ 3. Chat nuevo: elige│
 │ el chat      │     │    la página       │     │ quién hace la IA    │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Exporta un chat](./export) desde Telegram Desktop o WhatsApp.
2. Suelta la carpeta, el `.zip` o el `.txt` de WhatsApp en la página (o empieza con `rooftop --import <carpeta>`).
3. Pulsa **Chat nuevo** y elige la persona: la otra persona, o tú mismo («chatear conmigo mismo a su estilo»).

::: tip Pruébalo sin tus propios chats
El repositorio incluye dos exportaciones ficticias en [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas y Priya cocinan unos canelones por Telegram, Sofía y Daniel pasan un fin de semana por WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### ¿Sin exportación? Empieza desde notas

**Chat nuevo → Desde notas** solo necesita su nombre (el tuyo es opcional) y unas líneas sobre esa persona: quién es,
qué compartís, cómo escribe («me llama tesoro, mensajes cortos en italiano, muchos ❤️»). La IA escribe como ella solo
con esas notas. Sin historial no hay perfil de estilo ni biblioteca de medios, así que cuanto más digan las notas sobre
cómo escribe, más se parecerá. Puedes editar las notas en el chat cuando quieras (✎) y compartir el chat con un enlace
como cualquier otro. Al borrar el chat se borra todo lo que contenía.

## Qué hay en la ventana

| Botón | Qué hace |
|---|---|
| **Compartir** | [Enlaces](../features/share-links) para que los amigos hablen con la persona |
| **Biblioteca de medios** | Cada sticker, GIF, foto y mensaje de voz con lo que la IA sabe de ellos |
| **Notas** | Cosas sobre la persona que la exportación no dice. La persona las lee; los visitantes nunca |
| **`{ }`** | El JSON exacto que se envía al modelo, y los tokens usados |
| **Reescribir** | Descarta la última respuesta de la persona y la vuelve a escribir |
| **Que escriba primero** | La persona inicia la conversación |
