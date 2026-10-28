---
layout: home

hero:
  name: iRoof.top
  text: 会いたい人と話そう
  tagline: TelegramやWhatsAppのチャットを書き出すと、LLMがその人の話し方で続きを書きます。吹き出し、スタンプ、GIF、リアクション、声まで。お使いのパソコンで、好きなモデルを使って。必要ならオフラインでも。
  actions:
    - theme: brand
      text: はじめる
      link: /guide/getting-started
    - theme: alt
      text: アプリをダウンロード
      link: /guide/desktop
    - theme: alt
      text: 仕組み
      link: /features/how-it-works

features:
  - title: 言葉だけでなく、話し方まで
    details: 書き出し全体から作られるスタイルプロフィールと、一つひとつの吹き出し、スタンプ、GIF、返信、リアクションを、ツール呼び出しとしてモデルに再現します。
    link: /features/how-it-works
    linkText: 仕組み
  - title: プライベート、必要ならオフラインでも
    details: チャットはデータフォルダに残ります。ローカルのモデルとオフラインモードを使えば、パソコンの外へ出るリクエストはすべて拒否されます。
    link: /guide/offline
    linkText: オフラインとプライバシー
  - title: 何年分ものチャット、ギガバイト単位のメディア
    details: 12万件以上のメッセージと3万ファイルを、進捗表示つきで取り込めます。再インポートは、メディアをアップロードする前にメッセージから見分けられます。
    link: /guide/export#large-exports
    linkText: 大きな書き出し
  - title: 写真、スタンプ、音声
    details: 送られたものを説明し、音声を文字に起こすメディアライブラリ。順番は選べ、いつでも止められます。
    link: /features/media
    linkText: 写真と音声
  - title: 共有リンク
    details: 友だちが /s/名前 でペルソナと話せます。PIN と上限つき。Wi‑Fi 上でも、name.iroof.top からでも。
    link: /features/share-links
    linkText: 共有リンク
  - title: Telegram から返信
    details: 訪問者のメッセージは、あなたの Telegram グループに届きます。自分で返信するか、カウントダウンの後に AI に答えさせられます。
    link: /features/telegram
    linkText: Telegram
  - title: どのモデルも、どの MCP サーバーも
    details: OpenAI、OpenRouter、Gemini、Ollama、LM Studio、llama.cpp…… そして Streamable HTTP や stdio 経由の MCP ツール。
    link: /features/mcp
    linkText: MCP ツール
  - title: 隠しごとなし
    details: モデルに送られた正確な JSON を一クリックで確認できます。サイズ、履歴の予算、使ったトークン数も分かります。
    link: /guide/getting-started#what-s-in-the-window
    linkText: ウィンドウの中身
  - title: 小さな一つのバイナリ
    details: Web UI を内蔵した Rust サーバー。macOS、Windows、Linux 向けのデスクトップアプリ、Homebrew、Docker イメージがあります。
    link: /guide/getting-started
    linkText: インストール
---

<div class="home-demo">

![本物の人のような話し方でチャットが続き、友人がスマホで共有リンクを開く](/img/demo.svg)

</div>

## 一分で始める

::: code-group

```sh [デスクトップアプリ]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [完全オフライン]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

あとは三つのステップです。Telegram Desktop か WhatsApp から **[チャットを書き出し](/ja/guide/export)**、フォルダ、`.zip`、`.txt` のいずれかをページに**ドロップ**して、**New chat** で AI の役を選びます。相手役にするか、自分にするかです。
手元にチャットがなければ、架空のサンプルを試せます: `rooftop --import ./examples/telegram`。
（アプリのボタン名は英語のままです。アプリ自体が英語のためです。）

## 仕組み

<div class="wide">

![Telegram や WhatsApp の書き出しが iRoof.top に入り、LLM が返信を書き、チャットが続いていく](/how-it-works.svg)

</div>

書き出しは、あなたのパソコンで一度だけ読み込まれます。返信ごとに、モデルはスタイルプロフィール、メモ、メディアの説明を含むシステムプロンプトを受け取り、続いて[履歴の予算](/ja/reference/configuration#settings-only)に収まる最新のチャット部分を受け取ります。古い部分は短い記憶にまとめられ、ペルソナはそれも検索できます。モデルはツール呼び出し（`send_message`、`send_sticker`、`react`…）で応答し、それが吹き出し、スタンプ、リアクションになります。[詳しく →](/ja/features/how-it-works)

## チャットの行き先

| | ネットワーク |
|---|---|
| 取り込み、スタイルプロフィール、検索、保存 | なし：すべてあなたのパソコンで行われます |
| 一回の返信、記憶の要約 | 選んだモデルのエンドポイントだけ |
| メディアの説明、音声の文字起こし | メディアモデル。**Describe** を押したときだけ |
| インターネット経由の共有リンク、Telegram | 有効にした場合のみ。[オフラインモード](/ja/guide/offline)でオフにできます |

## よくある質問

::: details どのモデルを使えばいいですか？
OpenAI 互換の `/chat/completions` エンドポイントの背後にある、**ツール呼び出し**に対応したチャットモデルです。大きなモデルほど文体を真似るのが上手です。メディアライブラリの **Describe** には、メディアモデルが画像に対応している必要があります（ボイスメッセージには音声にも）。設定の **Test** は、キーが拒否された、モデルが不明などの問題を平易な言葉で伝えます。
:::

::: details 費用はいくらですか？
ローカルのモデルなら無料です。クラウドのモデルでは、トークンごとにプロバイダーに支払います。一回の返信の入力は、おおよそ履歴の予算一つ分です（既定では 12 万文字 ≈ 3.4 万トークン。プロンプトはキャッシュできる構造になっているため、プロンプトキャッシュに対応するプロバイダーでは大部分がキャッシュ料金になります）。短いツール呼び出しも少し加わります。返信あたりの費用を抑えるには、設定で予算を下げてください。
:::

::: details 書き出しは小さくないといけませんか？
いいえ。12 万件以上のメッセージや 13 GB のメディアを含む書き出しも、ブラウザから、または `rooftop --import <フォルダ>` で取り込めます。検索と履歴の予算により、チャットがどれほど長くても、返信ごとのプロンプトの大きさは同じに保たれます。
:::

::: details 友だちはペルソナと話せますか？
はい。[共有リンク](/ja/features/share-links)で可能です。Wi‑Fi 上、またはインターネット上の `name.iroof.top` から、PIN とメッセージ数の上限つきで使えます。訪問者が見られるのはチャットだけです。設定、メモ、プロンプト、ほかのチャットは見えません。
:::

::: tip 大切にすることについて
これは、遠くにいる人と近くにいるための道具です。ペルソナは役を保ちますが、本当に AI と話しているのかと真剣に尋ねられたら正直に答えます。つらそうに見えるときは、思いやりをもって応じます。
:::
