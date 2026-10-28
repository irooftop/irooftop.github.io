# 開発

```sh
cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test
```

| テストの対象 | |
|---|---|
| パーサーと変換 | `examples/telegram` と `examples/whatsapp` を使用 |
| 共有リンク | 訪問者の分離、PIN のロックアウト、メディアの許可リスト、ルーム、名前、ブロック、認証のバイパス |
| MCP クライアント | 各プロトコル世代のモックサーバー（HTTP、旧 SSE、stdio） |
| リレー | ハブ、名前、転送 |

デスクトップのクレートは別です：`cd desktop && cargo check`。

## 構成

```
src/        サーバー（axum）、パーサー、LLM エージェント、MCP クライアント、共有リンク、リレー、Telegram
  server/     所有者の HTTP API。領域ごとに 1 ファイル：アセット、アップロード、エクスポート、チャット、
              メッセージ、設定、メディア。mod.rs がルーターを組み立てる
  share_api/  共有リンク：owner.rs（リンクと訪問者の管理）、visitor.rs（/s/…）
web/        UI：index.html、app.css、js/（1 つの app.js として提供され、バイナリに組み込まれる）
  js/         UI の領域ごとに 1 ファイル。読み込み順に番号付き（1 つのスクリプト、1 つのスコープ）
desktop/    同じサーバーを包む Tauri アプリ
deploy/     Caddy + Docker Compose
examples/   2 つの架空のエクスポート
```

ドキュメントと iroof.top のトップページは、このリポジトリにはありません。[irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) にあります。`docs/`（このサイト）と `landing/` です。

## ドキュメント

ドキュメントは [irooftop/irooftop.github.io](https://github.com/irooftop/irooftop.github.io) にあります。画像とアプリのバージョンは、このリポジトリから取得します。両方を並べてクローンし、そこでビルドしてください。

```sh
cd irooftop.github.io/docs
npm ci
ROOFTOP_SRC=../../rooftop npm run dev    # http://localhost:5173/
ROOFTOP_SRC=../../rooftop npm run build  # docs/.vitepress/dist
```

このサイトは、`docs/` を変更するそのリポジトリの `main` への push ごとに [irooftop.github.io](https://irooftop.github.io) へ公開されます。`demo.svg` はアプリのリポジトリで `python3 scripts/demo-svg.py` によって生成されます（GitHub で表示できるよう、純粋な SVG と CSS です）。

## リリース

```
 Cargo.toml を上げる ─▶ タグ vX.Y.Z ─┬─▶ Release：crates.io + ghcr.io のイメージ（amd64 + arm64、ネイティブのランナー）
                                     └─▶ desktop：インストーラー ─▶ リリースを公開（最新）─▶ Homebrew：フォーミュラ + cask
```

1. `Cargo.toml`（と `desktop/`）の `version` を上げ、コミットして、タグ `vX.Y.Z` を push します。タグは Windows の MSI のために数字だけである必要があります。以降はすべて、追加のクリックなしで実行されます。
2. *Release* がクレート（シークレット `CARGO_REGISTRY_TOKEN`、環境 `crates-io`）と Docker イメージを公開します。アーキテクチャごとに、ネイティブのランナー（`ubuntu-latest`、`ubuntu-24.04-arm`）で 1 つのジョブが digest でプッシュし、`merge` ジョブがマルチアーキテクチャのタグを作ります。クレートの公開を確認するには、`dry_run` を付けて手動で実行してください。
3. *desktop* が、macOS（arm64、x64）、Windows、Linux 向けのインストーラーをドラフトのリリースにビルドします。すべてが添付されると、その `publish` ジョブが生成されたリリースノートを追加し、リリースを公開して最新としてマークします。
4. その後、`homebrew` ジョブが *Homebrew* を呼び出し、`Formula/rooftop.rb` と `Casks/irooftop.rb` を [`irooftop/homebrew-tap`](https://github.com/irooftop/homebrew-tap) にプッシュします。これには、シークレット `HOMEBREW_TAP_TOKEN`（きめ細かいトークン、`irooftop/homebrew-tap`、Contents：読み取りと書き込み）か `HOMEBREW_TAP_DEPLOY_KEY` が必要です。どちらもなければ、通知とともにスキップされます。（`GITHUB_TOKEN` で公開されたリリースは `release: published` を発火させないので、呼び出しは明示的に行われています。リリースを手動で公開すると、そのイベントを通じて Homebrew が引き続き動きます。）

既存のタグで tap の更新をやり直すには（例：シークレットを追加したあとなど）：

```sh
gh workflow run homebrew.yml -f tag=v0.3.0
```

`scripts/homebrew-tap.sh vX.Y.Z <tap のチェックアウト>` は、同じファイルをローカルで生成します。あるタグのインストーラーが失敗した場合は、失敗した *desktop* のジョブを再実行してください。`publish` と `homebrew` は、それらが成功すると続きます。
