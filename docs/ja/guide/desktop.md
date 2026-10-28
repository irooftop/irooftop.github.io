# デスクトップアプリ

デスクトップアプリ（[Tauri](https://v3.tauri.app) `3.0.0-alpha.5`）は、`rooftop serve` と同じサーバーを、ランダムな `127.0.0.1` のポートで動かし、ネイティブのウィンドウに表示します。

| プラットフォーム | インストール |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`、または [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) 用か [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) 用の `.dmg` |
| Windows 10 と 11 | [インストーラー (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) または [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage)（どのディストリビューションでも）、[.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb)（Debian、Ubuntu）、または [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm)（Fedora） |

ダウンロードのリンクは、常に最新のリリースを指します。

::: warning ビルドはまだ署名されていません
macOS では、アプリを一度開いてから、**システム設定 → プライバシーとセキュリティ → このまま開く**を選びます。Windows では、SmartScreen で**詳細情報 → 実行**を選びます。アニメーション付きの手順は[署名されていないアプリを開く](./unsigned-apps)を参照してください。
:::

## 初回起動

アプリはシェルや `.env` を読まないので、**モデルに接続**という画面で迎えられます。**設定**を開き、エンドポイント、キー、モデルを入力して、**テスト**を押してください。`OPENAI_BASE_URL`、`OPENAI_API_KEY`、`OPENAI_MODEL`、`OPENAI_TEMPERATURE` が設定されていれば、それが初期値になります。

| | |
|---|---|
| データ | OS のアプリデータフォルダ。例えば macOS では `~/Library/Application Support/top.iroof.desktop` |
| 共有リンク | 同じ Wi‑Fi 上、またはインターネット経由で：[別のデバイスでリンクを開く](../features/share-links#open-links-on-other-devices) |
| その他のサイト | `t.me` などのリンクはブラウザで開きます |
| macOS のウィンドウ | システムのタイトルバーはありません。アプリのヘッダーが信号ボタンの下まで続き、ウィンドウをドラッグできます |
| インポート | アプリがエクスポートを自分で読み込みます。**フォルダを選択…**でシステムのピッカーが開き、ドロップされたフォルダ、`.zip`、`.txt` は、その場所から直接インポートされます。何もアップロードされず、元のファイルはそのままです。APFS では、メディアはコピーではなくクローンされるので、13 GB のエクスポートでもほとんど余分な容量を使いません |

## 自分でビルドする {#build-it-yourself}

Rust ≥ 1.95 と Node.js が必要です。Linux では、[Tauri の前提条件](https://v3.tauri.app/start/prerequisites/)も必要です。

```sh
cd desktop
npm ci
npm run build                          # インストーラーは desktop/target/release/bundle/ に
npm run build -- --debug --no-bundle   # バイナリだけ
```

macOS では、`npm run build` は `.dmg` も作成します。DMG ウィンドウを整えるだけの Finder の AppleScript はスキップされます（*オートメーション*の許可がないと失敗します）。リリース済みの DMG と同じ Finder のレイアウトを保つには、`ROOFTOP_DMG_FINDER=1` を設定してください。`desktop/dmg/` の背景に、アプリから*アプリケーション*へ向かう矢印が付き、ボリュームの隠しファイルは見えないところに移されます。`desktop/dmg/background.svg` を編集したあとは、`desktop/dmg/make-background.sh` を実行してください。
