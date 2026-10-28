# Ontwikkeling

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Tests dekken | |
|---|---|
| Parser en conversie | tegen `examples/telegram` en `examples/whatsapp` |
| Sharelinks | isolatie van bezoekers, PIN-vergrendeling, mediatoegestane lijst, kamers, namen, blokkeren, omzeilen van authenticatie |
| MCP-client | mockservers van elk protocoltijdperk (HTTP, verouderde SSE, stdio) |
| Relay | hub, namen, doorsturen |

De desktop-crate is apart: `cd desktop && cargo check`.

## Indeling

```
src/        server (axum), parsers, LLM-agent, MCP-client, sharelinks, relay, Telegram
  server/     de HTTP-API van de eigenaar, één bestand per gebied: bestanden, uploads, exports, chats,
              berichten, instellingen, media; mod.rs bouwt de routers
  share_api/  sharelinks: owner.rs (links en bezoekers beheren), visitor.rs (/s/…)
web/        de interface: index.html, app.css en js/ (als één app.js geserveerd), ingebouwd in de binary
  js/         één bestand per gebied van de interface, genummerd in laadvolgorde (één script, één scope)
desktop/    Tauri-app rond dezelfde server
deploy/     Caddy + Docker Compose
examples/   twee fictieve exports
```

De documentatie en de startpagina van iroof.top staan niet in deze repository. Ze staan in
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (deze site) en `landing/`.

## Documentatie

De documentatie staat in [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Ze neemt de afbeeldingen
en de appversie uit deze repository: kloon beide naast elkaar en bouw daar.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

De site wordt gepubliceerd op [irooftop.github.io](https://irooftop.github.io) bij elke push naar `main` van die repository die `docs/` raakt. `demo.svg` wordt gemaakt met `python3 scripts/demo-svg.py` in de apprepository (zuivere SVG en CSS, zodat GitHub hem weergeeft).

## Uitgeven

```
 Cargo.toml ophogen ─▶ tag vX.Y.Z ─┬─▶ Release: crates.io + ghcr.io-image (amd64 + arm64, native runners)
                                   └─▶ desktop: installers ─▶ release publiceren (nieuwste) ─▶ Homebrew: formule + cask
```

1. Verhoog `version` in `Cargo.toml` (en in `desktop/`), commit en push een tag `vX.Y.Z`. De tag moet numeriek zijn voor de
   Windows-MSI. Al het andere draait daarna zonder verdere klikken.
2. *Release* publiceert de crate (secret `CARGO_REGISTRY_TOKEN`, omgeving `crates-io`) en de Docker-image:
   één job per architectuur op een native runner (`ubuntu-latest`, `ubuntu-24.04-arm`) pusht per digest, en een
   `merge`-job maakt de multi-architectuur-tags. Draai het met de hand met `dry_run` om de crate-publicatie te controleren.
3. *desktop* bouwt de installers voor macOS (arm64, x64), Windows en Linux in een concept-release. Wanneer ze allemaal
   zijn toegevoegd, vult de `publish`-job de gegenereerde releasenotities in, publiceert de release en markeert hem als nieuwste.
4. Zijn `homebrew`-job roept daarna *Homebrew* aan, dat `Formula/rooftop.rb` en `Casks/irooftop.rb` pusht naar
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Daarvoor is het secret `HOMEBREW_TAP_TOKEN`
   nodig (fine-grained token, `irooftop/homebrew-tap`, Contents: lezen en schrijven) of `HOMEBREW_TAP_DEPLOY_KEY`; zonder één van beide
   slaat het over met een melding. (Een release die met `GITHUB_TOKEN` is gepubliceerd, activeert `release: published` niet, daarom is de aanroep expliciet;
   een release met de hand publiceren activeert Homebrew nog steeds via die gebeurtenis.)

De tap-update voor een bestaande tag opnieuw draaien, bijvoorbeeld nadat je het secret hebt toegevoegd:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap-checkout>` maakt dezelfde bestanden lokaal. Als de installers van een tag zijn mislukt,
draai dan de mislukte *desktop*-jobs opnieuw: `publish` en `homebrew` volgen zodra ze slagen.
