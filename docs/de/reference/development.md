# Entwicklung

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Tests decken ab | |
|---|---|
| Parser und Konvertierung | gegen `examples/telegram` und `examples/whatsapp` |
| Share-Links | Besucherisolation, PIN-Sperre, Medien-Allowlist, Räume, Namen, Blockierung, Auth-Umgehung |
| MCP-Client | Mock-Server jeder Protokoll-Ära (HTTP, Legacy-SSE, stdio) |
| Relay | Hub, Namen, Weiterleitung |

Das Desktop-Crate ist separat: `cd desktop && cargo check`.

## Aufbau

```
src/        Server (axum), Parser, LLM-Agent, MCP-Client, Share-Links, Relay, Telegram
  server/     die HTTP-API des Eigentümers, eine Datei pro Bereich: Assets, Uploads, Exporte, Chats,
              Nachrichten, Einstellungen, Medien; mod.rs baut die Router
  share_api/  Share-Links: owner.rs (Links und Besucher verwalten), visitor.rs (/s/…)
web/        die Oberfläche: index.html, app.css und js/ (als eine app.js ausgeliefert), in das Binary eingebettet
  js/         eine Datei pro Bereich der Oberfläche, in Ladereihenfolge nummeriert (ein Skript, ein Gültigkeitsbereich)
desktop/    Tauri-App um denselben Server
deploy/     Caddy + Docker Compose
examples/   zwei fiktive Exporte
```

Die Dokumentation und die Startseite von iroof.top sind nicht in diesem Repository. Sie liegen in
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (diese Seite) und `landing/`.

## Dokumentation

Die Dokumentation liegt in [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Sie übernimmt die Bilder
und die App-Version aus diesem Repository: Klone beide nebeneinander und baue dort.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Die Seite wird bei jedem Push auf `main` dieses Repositorys, der `docs/` ändert, unter [irooftop.github.io](https://irooftop.github.io) veröffentlicht. `demo.svg` wird mit `python3 scripts/demo-svg.py` im App-Repository erzeugt (reines SVG und CSS, damit GitHub es anzeigt).

## Veröffentlichen

```
 Cargo.toml anheben ─▶ Tag vX.Y.Z ─┬─▶ Release: crates.io + ghcr.io-Image (amd64 + arm64, native Runner)
                                   └─▶ desktop: Installer ─▶ Release veröffentlichen (neueste) ─▶ Homebrew: Formel + Cask
```

1. Erhöhe `version` in `Cargo.toml` (und in `desktop/`), committe und push einen Tag `vX.Y.Z`. Der Tag muss numerisch sein, für das
   Windows-MSI. Alles Weitere läuft dann ohne weitere Klicks.
2. *Release* veröffentlicht das Crate (Secret `CARGO_REGISTRY_TOKEN`, Umgebung `crates-io`) und das Docker-Image:
   ein Job pro Architektur auf einem nativen Runner (`ubuntu-latest`, `ubuntu-24.04-arm`) pusht per Digest, und ein
   `merge`-Job erstellt die Multi-Arch-Tags. Manuell mit `dry_run` ausführen, um die Crate-Veröffentlichung zu prüfen.
3. *desktop* baut die Installer für macOS (arm64, x64), Windows und Linux in einen Entwurfs-Release. Wenn alle angehängt sind,
   füllt sein Job `publish` die generierten Release-Notizen ein, veröffentlicht den Release und markiert ihn als neueste.
4. Dann ruft sein Job `homebrew` *Homebrew* auf, das `Formula/rooftop.rb` und `Casks/irooftop.rb` nach
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap) pusht. Dafür braucht es das Secret `HOMEBREW_TAP_TOKEN`
   (Fine-grained-Token, `irooftop/homebrew-tap`, Contents: Lesen und Schreiben) oder `HOMEBREW_TAP_DEPLOY_KEY`; ohne eines
   überspringt es mit einem Hinweis. (Ein mit `GITHUB_TOKEN` veröffentlichter Release löst `release: published` nicht aus, deshalb ist der Aufruf explizit;
   wer einen Release von Hand veröffentlicht, löst Homebrew weiterhin über dieses Ereignis aus.)

Den Tap-Update für einen bestehenden Tag erneut ausführen, zum Beispiel nach dem Hinzufügen des Secrets:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <Tap-Checkout>` erzeugt dieselben Dateien lokal. Sind die Installer eines Tags
fehlgeschlagen, führe die fehlgeschlagenen *desktop*-Jobs erneut aus: `publish` und `homebrew` folgen, sobald sie bestehen.
