# Sviluppo

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| I test coprono | |
|---|---|
| Parser e conversione | su `examples/telegram` e `examples/whatsapp` |
| Link di condivisione | isolamento dei visitatori, blocco per PIN, lista consentita dei media, stanze, nomi, blocchi, bypass dell'autenticazione |
| Client MCP | server simulati di ogni epoca del protocollo (HTTP, SSE legacy, stdio) |
| Relay | hub, nomi, inoltro |

Il crate desktop è separato: `cd desktop && cargo check`.

## Struttura

```
src/        server (axum), parser, agente LLM, client MCP, link di condivisione, relay, Telegram
  server/     l'API HTTP del proprietario, un file per area: risorse, caricamenti, esportazioni, chat,
              messaggi, impostazioni, media; mod.rs costruisce i router
  share_api/  link di condivisione: owner.rs (gestione di link e visitatori), visitor.rs (/s/…)
web/        l'interfaccia: index.html, app.css e js/ (servito come un unico app.js), incorporato nel binario
  js/         un file per area dell'interfaccia, numerato nell'ordine di caricamento (uno script, un unico ambito)
desktop/    app Tauri attorno allo stesso server
deploy/     Caddy + Docker Compose
examples/   due esportazioni fittizie
```

La documentazione e la pagina iniziale di iroof.top non sono in questo repository. Si trovano in
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (questo sito) e `landing/`.

## Documentazione

La documentazione è in [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Prende le immagini
e la versione dell'app da questo repository: clona entrambi uno accanto all'altro, poi compila lì.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Il sito viene pubblicato su [irooftop.github.io](https://irooftop.github.io) a ogni push su `main` di quel repository che modifica `docs/`. `demo.svg` è generato da `python3 scripts/demo-svg.py` nel repository dell'app (SVG e CSS puri, così GitHub lo mostra).

## Pubblicare una versione

```
 aumentare Cargo.toml ─▶ tag vX.Y.Z ─┬─▶ Release: crates.io + immagine ghcr.io (amd64 + arm64, runner nativi)
                                     └─▶ desktop: installer ─▶ pubblica la release (ultima) ─▶ Homebrew: formula + cask
```

1. Aumenta `version` in `Cargo.toml` (e in `desktop/`), fai commit e push di un tag `vX.Y.Z`. Il tag deve essere numerico per
   l'MSI di Windows. Tutto il resto viene eseguito senza altri clic.
2. *Release* pubblica il crate (segreto `CARGO_REGISTRY_TOKEN`, ambiente `crates-io`) e l'immagine Docker:
   un job per architettura su un runner nativo (`ubuntu-latest`, `ubuntu-24.04-arm`) esegue il push per digest, e un job
   `merge` crea i tag multi-architettura. Eseguilo a mano con `dry_run` per verificare la pubblicazione del crate.
3. *desktop* compila gli installer per macOS (arm64, x64), Windows e Linux in una release bozza. Quando tutti sono
   allegati, il suo job `publish` aggiunge le note di rilascio generate, pubblica la release e la marca come ultima.
4. Il suo job `homebrew` chiama poi *Homebrew*, che esegue il push di `Formula/rooftop.rb` e `Casks/irooftop.rb` in
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Serve il segreto `HOMEBREW_TAP_TOKEN`
   (token a grana fine, `irooftop/homebrew-tap`, Contents: lettura e scrittura) o `HOMEBREW_TAP_DEPLOY_KEY`; senza nessuno dei due
   viene saltato con un avviso. (Una release pubblicata con `GITHUB_TOKEN` non attiva `release: published`, per questo la chiamata è esplicita;
   pubblicare una release a mano attiva ancora Homebrew tramite quell'evento.)

Per ripetere l'aggiornamento del tap per un tag esistente, per esempio dopo aver aggiunto il segreto:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <copia del tap>` genera gli stessi file in locale. Se gli installer di un tag
sono falliti, riesegui i job *desktop* non riusciti: `publish` e `homebrew` seguono appena passano.
