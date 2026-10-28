# Desenvolvimento

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| Os testes cobrem | |
|---|---|
| Analisador e conversão | com `examples/telegram` e `examples/whatsapp` |
| Links de compartilhamento | isolamento de visitantes, bloqueio por PIN, lista de mídia permitida, salas, nomes, bloqueios, contorno de autenticação |
| Cliente MCP | servidores simulados de cada era do protocolo (HTTP, SSE legado, stdio) |
| Relay | hub, nomes, encaminhamento |

O crate de desktop é separado: `cd desktop && cargo check`.

## Estrutura

```
src/        servidor (axum), analisadores, agente LLM, cliente MCP, links de compartilhamento, relay, Telegram
  server/     a API HTTP do proprietário, um arquivo por área: recursos, envios, exportações, chats,
              mensagens, configurações, mídia; mod.rs monta os roteadores
  share_api/  links de compartilhamento: owner.rs (gerenciar links e visitantes), visitor.rs (/s/…)
web/        a interface: index.html, app.css e js/ (servido como um único app.js), embutido no binário
  js/         um arquivo por área da interface, numerado na ordem de carregamento (um script, um escopo)
desktop/    app Tauri em torno do mesmo servidor
deploy/     Caddy + Docker Compose
examples/   duas exportações fictícias
```

A documentação e a página inicial do iroof.top não estão neste repositório. Elas ficam em
[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io): `docs/` (este site) e `landing/`.

## Documentação

A documentação fica em [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io). Ela usa as imagens
e a versão do app deste repositório: clone os dois lado a lado e compile por lá.

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

O site é publicado em [irooftop.github.io](https://irooftop.github.io) a cada push para `main` desse repositório que altere `docs/`. O `demo.svg` é gerado por `python3 scripts/demo-svg.py` no repositório do app (SVG e CSS puros, para o GitHub exibir).

## Publicar uma versão

```
 subir Cargo.toml ─▶ tag vX.Y.Z ─┬─▶ Release: crates.io + imagem ghcr.io (amd64 + arm64, runners nativos)
                                 └─▶ desktop: instaladores ─▶ publicar a release (mais recente) ─▶ Homebrew: fórmula + cask
```

1. Suba o `version` em `Cargo.toml` (e em `desktop/`), faça commit e envie uma tag `vX.Y.Z`. A tag precisa ser numérica para o
   MSI do Windows. Tudo o que vem depois roda sem mais cliques.
2. *Release* publica o crate (segredo `CARGO_REGISTRY_TOKEN`, ambiente `crates-io`) e a imagem Docker:
   um job por arquitetura em um runner nativo (`ubuntu-latest`, `ubuntu-24.04-arm`) envia por digest, e um job
   `merge` cria as tags multiarquitetura. Execute manualmente com `dry_run` para verificar a publicação do crate.
3. *desktop* gera os instaladores para macOS (arm64, x64), Windows e Linux em uma release rascunho. Quando todos estão
   anexados, o job `publish` preenche as notas de release geradas, publica a release e a marca como mais recente.
4. O job `homebrew` então chama o *Homebrew*, que envia `Formula/rooftop.rb` e `Casks/irooftop.rb` para
   [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap). Ele precisa do segredo `HOMEBREW_TAP_TOKEN`
   (token de granularidade fina, `irooftop/homebrew-tap`, Contents: leitura e escrita) ou `HOMEBREW_TAP_DEPLOY_KEY`; sem nenhum dos dois
   ele pula com um aviso. (Uma release publicada com `GITHUB_TOKEN` não dispara `release: published`, por isso a chamada é explícita;
   publicar uma release manualmente ainda aciona o Homebrew por esse evento.)

Para repetir a atualização do tap de uma tag existente, por exemplo depois de adicionar o segredo:

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <cópia do tap>` gera os mesmos arquivos localmente. Se os instaladores de uma tag
falharam, execute de novo os jobs *desktop* que falharam: `publish` e `homebrew` seguem assim que passarem.
