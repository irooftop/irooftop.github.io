# Abrir una app sin firmar

Los instaladores de escritorio aún no están firmados ni notarizados, así que el primer inicio muestra una advertencia en macOS y Windows.
Es un paso único: después de permitir la app una vez, se abre con normalidad, también tras las actualizaciones instaladas de la misma forma.

::: tip ¿Prefieres no hacerlo?
[Compila la app tú mismo](./desktop#build-it-yourself), o ejecuta el [servidor](./getting-started#install) y úsalo en
tu navegador: `brew install irooftop/tap/rooftop`, `cargo install rooftop` o [Docker](./docker).
:::

## macOS

![Abrir una app no verificada en macOS: la advertencia «No se ha abierto», Listo, Ajustes del Sistema, Privacidad y seguridad, Abrir igualmente, la contraseña, y la app se abre](/how-to-open-an-unsigned-app-on-macos.svg)

En macOS 15 Sequoia y posteriores:

1. Abre **iRoof.top**. macOS dice *«iRoof.top» no se ha abierto: Apple no pudo verificar…*. Haz clic en **Listo**.
2. Abre el **menú Apple → Ajustes del Sistema… → Privacidad y seguridad**.
3. Baja hasta **Seguridad**: *«iRoof.top» se ha bloqueado para proteger tu Mac*. Haz clic en **Abrir igualmente**.
4. Confirma con **Abrir igualmente**, e introduce tu contraseña o usa Touch ID.

El botón **Abrir igualmente** aparece solo después de que hayas intentado abrir la app, durante aproximadamente una hora. Si no está,
vuelve a abrir la app y regresa a Privacidad y seguridad.

En macOS 14 Sonoma y anteriores, haz clic derecho (o Control+clic) en la app en el Finder, elige **Abrir** y luego **Abrir** de nuevo.

### Desde la Terminal

Eliminar la marca de cuarentena que el navegador puso en la descarga también funciona:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

No siempre funciona: en macOS recientes, Terminal puede necesitar **Gestión de apps** (o **Acceso completo al disco**) en
Privacidad y seguridad para cambiar apps de `/Applications`, y falla con `Operation not permitted` sin ello. Los
pasos de arriba siempre funcionan.

::: details «iRoof.top está dañada y no se puede abrir»
Este mensaje también significa la marca de cuarentena, no una descarga rota. Haz clic en **Cancelar** (no en **Mover a la papelera**) y ejecuta
el comando `xattr` de arriba, o sigue los pasos de Ajustes del Sistema.
:::

## Windows

SmartScreen muestra **Windows protegió tu PC** para el instalador:

1. Haz clic en **Más información**.
2. Haz clic en **Ejecutar de todos modos**.

Si el navegador retiene la descarga (*no se descarga habitualmente*), abre la lista de descargas, elige **⋯ → Conservar**,
y luego **Mostrar más → Conservar de todos modos**. Para el `.msi`, también puedes hacer clic derecho → **Propiedades** → marcar **Desbloquear** →
**Aceptar** antes de ejecutarlo.

En Windows 11 con **Control inteligente de aplicaciones** activado, las apps sin firmar se bloquean sin un botón **Ejecutar de todos modos**. Usa el
[servidor](./getting-started#install) en su lugar, o desactiva el Control inteligente de aplicaciones en **Seguridad de Windows → Control de aplicaciones
y navegador → Configuración del Control inteligente de aplicaciones**.

## Linux

Linux no bloquea las apps sin firmar, pero un AppImage necesita permiso para ejecutarse:

```sh
chmod +x iRoof.top_amd64.AppImage    # o: Propiedades → Permisos → Permitir ejecutar el archivo como programa
./iRoof.top_amd64.AppImage
```

Si se queja de FUSE (`dlopen(): error loading libfuse.so.2`), instala `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) o ejecútalo con `--appimage-extract-and-run`.

Los paquetes se instalan con el gestor de paquetes, que acepta paquetes locales sin firmar:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
