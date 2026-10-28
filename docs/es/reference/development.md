# Desarrollo

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Las pruebas cubren | |
|---|---|
| Analizador y conversión | con `examples/telegram` y `examples/whatsapp` |
| Enlaces para compartir | aislamiento de visitantes, bloqueo por PIN, lista de medios permitidos, salas, nombres, bloqueos, omisión de autenticación |
| Cliente MCP | servidores simulados de cada época del protocolo (HTTP, SSE heredado, stdio) |
| Relé | hub, nombres, reenvío |

El crate de escritorio es independiente: `cd desktop && cargo check`.

## Estructura

```
src/        servidor (axum), analizadores, agente LLM, cliente MCP, enlaces para compartir, relé, Telegram
  server/     la API HTTP del propietario, un archivo por área: recursos, subidas, exportaciones, chats,
              mensajes, ajustes, medios; mod.rs construye los routers
  share_api/  enlaces para compartir: owner.rs (gestión de enlaces y visitantes), visitor.rs (/s/…)
web/        la interfaz: index.html, app.css y js/ (servido como un único app.js), incrustado en el binario
  js/         un archivo por área de la interfaz, numerado en orden de carga (un script, un ámbito)
desktop/    app de Tauri alrededor del mismo servidor
deploy/     Caddy + Docker Compose
examples/   dos exportaciones ficticias
```

La documentación y la página de inicio de iroof.top no están en este repositorio. Están en
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (este sitio) y `landing/`.

## Documentación

La documentación está en [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Toma las imágenes
y la versión de la app de este repositorio: clona ambos uno junto al otro y compila allí.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

El sitio se publica en [irooftop.github.io](https://irooftop.github.io) en cada push a `main` de ese repositorio
que modifique `docs/`. `demo.svg` lo genera `python3 scripts/demo-svg.py` en el repositorio de la app (SVG y CSS puros, así que GitHub lo muestra).

## Publicar una versión

```
 subir Cargo.toml ─▶ etiqueta vX.Y.Z ─┬─▶ Release: crates.io + imagen en ghcr.io (amd64 + arm64, runners nativos)
                                      └─▶ desktop: instaladores ─▶ publicar la versión (última) ─▶ Homebrew: fórmula + cask
```

1. Sube `version` en `Cargo.toml` (y en `desktop/`), haz commit, y empuja una etiqueta `vX.Y.Z`. La etiqueta debe ser numérica para el
   MSI de Windows. Lo siguiente se ejecuta sin más clics.
2. *Release* publica el crate (secreto `CARGO_REGISTRY_TOKEN`, entorno `crates-io`) y la imagen Docker:
   un trabajo por arquitectura en un runner nativo (`ubuntu-latest`, `ubuntu-24.04-arm`) sube por digest, y un trabajo
   `merge` crea las etiquetas multiarquitectura. Ejecútalo a mano con `dry_run` para comprobar la publicación del crate.
3. *desktop* compila los instaladores para macOS (arm64, x64), Windows y Linux en una versión en borrador. Cuando todos están
   adjuntos, su trabajo `publish` añade las notas generadas, publica la versión y la marca como la última.
4. Su trabajo `homebrew` llama después a *Homebrew*, que sube `Formula/rooftop.rb` y `Casks/irooftop.rb` a
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Necesita el secreto `HOMEBREW_TAP_TOKEN`
   (token de grano fino, `irooftop/homebrew-tap`, Contents: lectura y escritura) o `HOMEBREW_TAP_DEPLOY_KEY`; sin ninguno
   se omite con un aviso. (Una versión publicada con `GITHUB_TOKEN` no dispara `release: published`, por eso la llamada es explícita;
   publicar una versión a mano sigue activando Homebrew por ese evento.)

Para volver a ejecutar la actualización del tap de una etiqueta existente, por ejemplo tras añadir el secreto:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <copia del tap>` genera los mismos archivos en local. Si fallaron los instaladores de una etiqueta,
vuelve a ejecutar los trabajos fallidos de *desktop*: `publish` y `homebrew` continúan cuando pasen.
