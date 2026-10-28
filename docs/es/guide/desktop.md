# App de escritorio

La app de escritorio ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) ejecuta el mismo servidor que `rooftop serve` en un puerto
`127.0.0.1` aleatorio, y lo muestra en una ventana nativa.

| Plataforma | Instalación |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, o el `.dmg` para [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) o [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 y 11 | [Instalador (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) o [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (cualquier distribución), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) o [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Los enlaces de descarga siempre apuntan a la versión más reciente.

::: warning Los instaladores aún no están firmados
En macOS, abre la app una vez y ve a **Ajustes del Sistema → Privacidad y seguridad → Abrir igualmente**. En Windows, elige
**Más información → Ejecutar de todos modos** en SmartScreen. Paso a paso, con animación: [Abrir una app sin firmar](./unsigned-apps).
:::

## Primer inicio

La app no lee tu shell ni tu `.env`, así que te recibe con **Conectar un modelo**: abre **Ajustes**, introduce el
endpoint, la clave y el modelo, y pulsa **Probar**. Si `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` o
`OPENAI_TEMPERATURE` están definidas, se usan como valores iniciales.

| | |
|---|---|
| Datos | el directorio de datos de la app del sistema, p. ej. `~/Library/Application Support/top.iroof.desktop` en macOS |
| Enlaces para compartir | en la misma Wi‑Fi o por internet: [Abrir enlaces en otros dispositivos](../features/share-links#open-links-on-other-devices) |
| Otros sitios | enlaces como `t.me` se abren en tu navegador |
| Ventana de macOS | sin barra de título del sistema: las cabeceras de la app continúan bajo los semáforos y arrastran la ventana |
| Importar | la app lee la exportación por sí misma: **Elegir carpeta…** abre el selector del sistema, y una carpeta, `.zip` o `.txt` soltada se importa desde donde está. No se sube nada, el original no se toca, y en APFS los medios se clonan en lugar de copiarse, así que incluso una exportación de 13 GB apenas ocupa espacio extra |

## Compílala tú mismo {#build-it-yourself}

Necesitas Rust ≥ 1.95 y Node.js, y en Linux los [requisitos previos de Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # instaladores en desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # solo el binario
```

En macOS, `npm run build` también crea el `.dmg`, y omite el AppleScript de Finder que solo organiza la ventana del DMG
(falla sin el permiso *Automatización*). Define `ROOFTOP_DMG_FINDER=1` para conservar la disposición de Finder, como
en los DMG publicados: el fondo de `desktop/dmg/` con una flecha de la app a *Aplicaciones*, y los archivos ocultos del volumen
fuera de la vista. Después de editar `desktop/dmg/background.svg`, ejecuta `desktop/dmg/make-background.sh`.
