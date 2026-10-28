# Aprire un'app non firmata

I pacchetti desktop non sono ancora firmati né notarizzati, quindi il primo avvio mostra un avviso su macOS e Windows.
È un passaggio una tantum: dopo aver consentito l'app una volta, si apre normalmente, anche dopo gli aggiornamenti installati allo stesso modo.

::: tip Preferisci evitarlo?
[Compila l'app da solo](./desktop#build-it-yourself), oppure esegui il [server](./getting-started#install) e usalo nel
browser: `brew install irooftop/tap/rooftop`, `cargo install rooftop` o [Docker](./docker).
:::

## macOS

![Aprire un'app non verificata su macOS: l'avviso «Non aperto», Fine, Impostazioni di Sistema, Privacy e sicurezza, Apri comunque, la password, e l'app si apre](/how-to-open-an-unsigned-app-on-macos.svg)

Su macOS 15 Sequoia e successivi:

1. Apri **iRoof.top**. macOS dice *«iRoof.top» non aperto: Apple non ha potuto verificare…*. Clicca su **Fine**.
2. Apri il **menu Apple → Impostazioni di Sistema… → Privacy e sicurezza**.
3. Scorri fino a **Sicurezza**: *«iRoof.top» è stato bloccato per proteggere il tuo Mac*. Clicca su **Apri comunque**.
4. Conferma con **Apri comunque**, e inserisci la password o usa Touch ID.

Il pulsante **Apri comunque** compare solo dopo che hai provato ad aprire l'app, per circa un'ora. Se non c'è,
riapri l'app e torna in Privacy e sicurezza.

Su macOS 14 Sonoma e precedenti, fai clic destro (o Control-clic) sull'app nel Finder, scegli **Apri**, poi **Apri** di nuovo.

### Dal Terminale

Rimuovere il flag di quarantena che il browser ha messo sul download funziona anche:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Non sempre funziona: su macOS recenti, il Terminale può aver bisogno di **Gestione app** (o **Accesso completo al disco**) in
Privacy e sicurezza per modificare le app in `/Applications`, e senza di esso fallisce con `Operation not permitted`. I
passaggi sopra funzionano sempre.

::: details «iRoof.top è danneggiata e non può essere aperta»
Questo messaggio indica anch'esso il flag di quarantena, non un download rotto. Clicca su **Annulla** (non su **Sposta nel Cestino**) ed esegui
il comando `xattr` qui sopra, o segui i passaggi delle Impostazioni di Sistema.
:::

## Windows

SmartScreen mostra **Windows ha protetto il tuo PC** per l'installer:

1. Clicca su **Ulteriori informazioni**.
2. Clicca su **Esegui comunque**.

Se il browser trattiene il download (*non viene scaricato di frequente*), apri l'elenco dei download, scegli **⋯ → Conserva**,
poi **Mostra altro → Conserva comunque**. Per il `.msi`, puoi anche fare clic destro → **Proprietà** → spuntare **Sblocca** →
**OK** prima di eseguirlo.

Su Windows 11 con **Controllo app intelligente** attivo, le app non firmate vengono bloccate senza un pulsante **Esegui comunque**. Usa invece il
[server](./getting-started#install), oppure disattiva il Controllo app intelligente in **Sicurezza di Windows → Controllo app e browser →
Impostazioni del Controllo app intelligente**.

## Linux

Linux non blocca le app non firmate, ma un AppImage ha bisogno del permesso di esecuzione:

```sh
chmod +x iRoof.top_amd64.AppImage    # oppure: Proprietà → Permessi → Consenti l'esecuzione del file come programma
./iRoof.top_amd64.AppImage
```

Se segnala un problema con FUSE (`dlopen(): error loading libfuse.so.2`), installa `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) oppure avvialo con `--appimage-extract-and-run`.

I pacchetti si installano con il gestore dei pacchetti, che accetta pacchetti locali non firmati:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
