# はじめに

## インストール {#install}

| | コマンド |
|---|---|
| **デスクトップアプリ**、macOS | `brew install --cask irooftop/tap/irooftop` |
| **デスクトップアプリ**、Windows | [インストーラー (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) または [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **デスクトップアプリ**、Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage)、[.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb)、または [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **サーバー**、macOS と Linux | `brew install irooftop/tap/rooftop`（その後 `brew services start rooftop`） |
| **サーバー**、Rust ≥ 1.88 があればどこでも | `cargo install rooftop` |
| **サーバー**、コンテナ | `docker pull ghcr.io/irooftop/rooftop` （[Docker](./docker)） |

デスクトップアプリはターミナルを必要としません。[デスクトップアプリ](./desktop)を参照してください。

## 実行

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # 既定値。OpenAI 互換の API なら何でも動きます
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # ツール呼び出しに対応している必要があります
rooftop                                               # http://127.0.0.1:8080
```

変数は `rooftop` を起動する場所にある `.env` ファイルに書くこともできますし、後から**設定**で設定することもできます。
設定の**テスト**は小さなリクエストを送り、何が問題かを平易な言葉で教えてくれます。例えば
「openrouter.ai が API キーを拒否しました (401)」といった具合です。

何も端末の外に出したくない場合は、ローカルのモデルと[オフラインモード](./offline)を使ってください。

## 最初のチャット

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. チャットを │ ──▶ │ 2. ページに        │ ──▶ │ 3. 新しいチャット：  │
 │    エクスポート│     │    ドロップ        │     │ AI が演じる相手を選ぶ │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. Telegram Desktop または WhatsApp から[チャットをエクスポート](./export)します。
2. フォルダ、`.zip`、または WhatsApp の `.txt` をページにドロップします（または `rooftop --import <フォルダ>` で開始します）。
3. **新しいチャット**を押して、ペルソナを選びます。相手か、自分自身（「自分のスタイルで自分自身と話す」）です。

::: tip 自分のチャットがなくても試せます
リポジトリには [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples) に架空のエクスポートが 2 つあります。
Telegram ではジョナスとプリヤがラザニアを作り、WhatsApp ではソフィアとダニエルが週末を過ごします。

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### エクスポートがない場合：メモから始める

**新しいチャット → メモから**では、相手の名前（あなたの名前は任意）と、その人についての数行だけで済みます。どんな人か、
何を共有しているか、どんな話し方をするか（「私を『ダーリン』と呼ぶ、短いイタリア語のメッセージ、❤️ が多い」など）。AI はこのメモだけをもとに、その人として書きます。
履歴がなければスタイルプロファイルもメディアライブラリもないので、メモが話し方を詳しく説明するほど、より近づきます。チャットではいつでもメモを編集でき（✎）、ほかのチャットと同じようにリンクで共有できます。チャットを削除すると、中身もすべて削除されます。

## ウィンドウの中身

| ボタン | 役割 |
|---|---|
| **共有** | 友人がペルソナと話せる[リンク](../features/share-links) |
| **メディアライブラリ** | すべてのスタンプ、GIF、写真、ボイスメッセージと、AI がそれについて把握していること |
| **メモ** | エクスポートには書かれていない、その人についてのこと。ペルソナは読みますが、訪問者は決して読めません |
| **`{ }`** | モデルに送られる正確な JSON と、使われたトークン |
| **書き直す** | ペルソナの最後の返信を捨てて、書き直します |
| **先に書いてもらう** | ペルソナが会話を始めます |
