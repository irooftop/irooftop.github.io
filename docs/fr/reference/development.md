# Développement

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Les tests couvrent | |
|---|---|
| Analyseur et conversion | sur `examples/telegram` et `examples/whatsapp` |
| Liens de partage | isolement des visiteurs, blocage par PIN, liste blanche des médias, salons, noms, blocages, contournement d'authentification |
| Client MCP | serveurs simulés de chaque époque du protocole (HTTP, SSE hérité, stdio) |
| Relais | hub, noms, transfert |

Le crate de bureau est séparé : `cd desktop && cargo check`.

## Structure

```
src/        serveur (axum), analyseurs, agent LLM, client MCP, liens de partage, relais, Telegram
  server/     l'API HTTP du propriétaire, un fichier par domaine : ressources, envois, exports, chats,
              messages, paramètres, médias ; mod.rs construit les routeurs
  share_api/  liens de partage : owner.rs (gestion des liens et des visiteurs), visitor.rs (/s/…)
web/        l'interface : index.html, app.css et js/ (servi comme un seul app.js), intégré au binaire
  js/         un fichier par domaine de l'interface, numéroté dans l'ordre de chargement (un script, une portée)
desktop/    application Tauri autour du même serveur
deploy/     Caddy + Docker Compose
examples/   deux exports fictifs
```

La documentation et la page d'accueil d'iroof.top ne sont pas dans ce dépôt. Elles se trouvent dans
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) : `docs/` (ce site) et `landing/`.

## Documentation

La documentation se trouve dans [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Elle reprend les images
et la version de l'application depuis ce dépôt : clonez les deux côte à côte, puis construisez là-bas.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

Le site est publié sur [irooftop.github.io](https://irooftop.github.io) à chaque push sur `main` de ce dépôt qui modifie `docs/`. `demo.svg` est généré par `python3 scripts/demo-svg.py` dans le dépôt de l'application (SVG et CSS purs, donc GitHub l'affiche).

## Publier une version

```
 monter Cargo.toml ─▶ étiquette vX.Y.Z ─┬─▶ Release : crates.io + image ghcr.io (amd64 + arm64, runners natifs)
                                        └─▶ desktop : installeurs ─▶ publier la version (dernière) ─▶ Homebrew : formule + cask
```

1. Augmentez `version` dans `Cargo.toml` (et dans `desktop/`), committez, poussez une étiquette `vX.Y.Z`. L'étiquette doit être numérique pour
   le MSI Windows. Tout ce qui suit s'exécute ensuite sans autre clic.
2. *Release* publie le crate (secret `CARGO_REGISTRY_TOKEN`, environnement `crates-io`) et l'image Docker :
   un job par architecture sur un runner natif (`ubuntu-latest`, `ubuntu-24.04-arm`) pousse par empreinte, et un job
   `merge` crée les étiquettes multi-architectures. Lancez-le à la main avec `dry_run` pour vérifier la publication du crate.
3. *desktop* construit les installeurs pour macOS (arm64, x64), Windows et Linux dans une version brouillon. Quand tous sont
   joints, son job `publish` ajoute les notes de version générées, publie la version et la marque comme dernière.
4. Son job `homebrew` appelle ensuite *Homebrew*, qui pousse `Formula/rooftop.rb` et `Casks/irooftop.rb` vers
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Il lui faut le secret `HOMEBREW_TAP_TOKEN`
   (jeton à granularité fine, `irooftop/homebrew-tap`, Contents : lecture et écriture) ou `HOMEBREW_TAP_DEPLOY_KEY` ; sans l'un des deux,
   il passe avec un avertissement. (Une version publiée avec `GITHUB_TOKEN` ne déclenche pas `release: published`, d'où l'appel explicite ;
   publier une version à la main déclenche toujours Homebrew par cet événement.)

Pour relancer la mise à jour du tap d'une étiquette existante, par exemple après avoir ajouté le secret :

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <copie du tap>` produit les mêmes fichiers en local. Si les installeurs d'une étiquette
ont échoué, relancez les jobs *desktop* en échec : `publish` et `homebrew` suivent dès qu'ils réussissent.
