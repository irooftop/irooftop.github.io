# Primi passi

## Installazione {#install}

| | Comando |
|---|---|
| **App desktop**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **App desktop**, Windows | [Installer (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) oppure [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **App desktop**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) oppure [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Server**, macOS e Linux | `brew install irooftop/tap/rooftop` (poi `brew services start rooftop`) |
| **Server**, ovunque con Rust ≥ 1.88 | `cargo install rooftop` |
| **Server**, container | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

L'app desktop non richiede il terminale: vedi [App desktop](./desktop).

## Avvio

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # il valore predefinito; funziona qualsiasi API compatibile con OpenAI
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # deve supportare le chiamate agli strumenti
rooftop                                               # http://127.0.0.1:8080
```

Le variabili possono anche stare in un file `.env` nella cartella da cui avvii `rooftop`, oppure essere impostate in seguito in **Impostazioni**.
**Prova** nelle Impostazioni invia una piccola richiesta e ti spiega in parole semplici cosa non va, per esempio
«openrouter.ai ha rifiutato la chiave API (401)».

Vuoi che nulla lasci il tuo computer? Usa un modello locale e la [Modalità offline](./offline).

## La tua prima chat

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Esporta   │ ──▶ │ 2. Trascinala      │ ──▶ │ 3. Nuova chat: scegli│
 │ la chat      │     │    nella pagina    │     │ chi interpreta l'IA  │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Esporta una chat](./export) da Telegram Desktop o WhatsApp.
2. Trascina la cartella, il `.zip` o il `.txt` di WhatsApp nella pagina (oppure avvia con `rooftop --import <cartella>`).
3. Premi **Nuova chat** e scegli il personaggio: l'altra persona, o te stesso («chatta con me stesso nel mio stile»).

::: tip Provalo senza le tue chat
Il repository contiene due esportazioni fittizie in [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas e Priya cucinano le lasagne su Telegram, Sofia e Daniel passano un weekend su WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Nessuna esportazione? Parti dalle note

**Nuova chat → Da note** richiede solo il suo nome (il tuo è facoltativo) e alcune righe su di lei: chi è,
cosa condividete, come scrive («mi chiama tesoro, messaggi brevi in italiano, tanti ❤️»). L'IA scrive come lei
solo da quelle note. Senza cronologia non ci sono profilo di stile né libreria di media, quindi più le note descrivono come scrive, più le somiglierà. Puoi modificare le note in chat in qualsiasi momento (✎) e condividere la chat con un link come le altre. Eliminare la chat elimina tutto ciò che conteneva.

## Cosa c'è nella finestra

| Pulsante | Cosa fa |
|---|---|
| **Condividi** | [Link](../features/share-links) perché gli amici parlino con il personaggio |
| **Libreria media** | Ogni sticker, GIF, foto e messaggio vocale con ciò che l'IA sa di loro |
| **Note** | Cose sulla persona che l'esportazione non dice. Il personaggio le legge, i visitatori mai |
| **`{ }`** | Il JSON esatto inviato al modello, e i token usati |
| **Riscrivi** | Scarta l'ultima risposta del personaggio e la riscrive |
| **Fallo scrivere per primo** | Il personaggio inizia la conversazione |
