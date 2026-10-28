# App desktop

L'app desktop ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) esegue lo stesso server di `rooftop serve` su una porta
`127.0.0.1` casuale, e lo mostra in una finestra nativa.

| Piattaforma | Installazione |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, oppure il `.dmg` per [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) o [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 e 11 | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) oppure [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (qualsiasi distribuzione), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) oppure [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

I link di download puntano sempre alla versione più recente.

::: warning I pacchetti non sono ancora firmati
Su macOS apri l'app una volta, poi **Impostazioni di Sistema → Privacy e sicurezza → Apri comunque**. Su Windows scegli
**Ulteriori informazioni → Esegui comunque** in SmartScreen. Passo passo, con un'animazione: [Aprire un'app non firmata](./unsigned-apps).
:::

## Primo avvio

L'app non legge la tua shell né il tuo `.env`, quindi ti accoglie con **Collega un modello**: apri **Impostazioni**, inserisci
endpoint, chiave e modello, e premi **Prova**. Se `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` o
`OPENAI_TEMPERATURE` sono impostate, diventano i valori iniziali.

| | |
|---|---|
| Dati | la cartella dei dati dell'app del sistema, per esempio `~/Library/Application Support/top.iroof.desktop` su macOS |
| Link di condivisione | sulla stessa Wi‑Fi o via internet: [Aprire i link su altri dispositivi](../features/share-links#open-links-on-other-devices) |
| Altri siti | link come `t.me` si aprono nel browser |
| Finestra su macOS | nessuna barra del titolo di sistema: le intestazioni dell'app continuano sotto i semafori e trascinano la finestra |
| Importazione | l'app legge da sola l'esportazione: **Scegli cartella…** apre il selettore di sistema, e una cartella, uno `.zip` o un `.txt` trascinato viene importato da dove si trova. Non si carica nulla, l'originale resta intatto, e su APFS i media vengono clonati invece che copiati, quindi anche un'esportazione da 13 GB occupa quasi nessuno spazio in più |

## Compilala tu stesso {#build-it-yourself}

Ti servono Rust ≥ 1.95 e Node.js, e su Linux i [prerequisiti di Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # installer in desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # solo il binario
```

Su macOS, `npm run build` crea anche il `.dmg`, e salta lo script AppleScript del Finder che si limita a sistemare la finestra del DMG
(fallisce senza il permesso *Automazione*). Imposta `ROOFTOP_DMG_FINDER=1` per mantenere la disposizione del Finder, come
nei DMG pubblicati: lo sfondo da `desktop/dmg/` con una freccia dall'app ad *Applicazioni*, e i file nascosti del volume
fuori vista. Dopo aver modificato `desktop/dmg/background.svg`, esegui `desktop/dmg/make-background.sh`.
