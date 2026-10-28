# Primeiros passos

## Instalação {#install}

| | Comando |
|---|---|
| **App de desktop**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **App de desktop**, Windows | [Instalador (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) ou [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **App de desktop**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) ou [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Servidor**, macOS e Linux | `brew install irooftop/tap/rooftop` (depois `brew services start rooftop`) |
| **Servidor**, em qualquer lugar com Rust ≥ 1.88 | `cargo install rooftop` |
| **Servidor**, contêiner | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

O app de desktop não precisa de terminal: veja [App de desktop](./desktop).

## Executar

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # o padrão; qualquer API compatível com OpenAI funciona
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # precisa suportar chamadas de ferramentas
rooftop                                               # http://127.0.0.1:8080
```

As variáveis também podem estar em um arquivo `.env` ao lado de onde você inicia o `rooftop`, ou ser definidas depois em **Configurações**.
**Testar** nas Configurações envia uma requisição pequena e explica em palavras simples o que está errado, por exemplo
"openrouter.ai rejeitou a chave de API (401)".

Quer que nada saia do seu computador? Use um modelo local e o [Modo offline](./offline).

## Seu primeiro chat

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Exportar  │ ──▶ │ 2. Soltar na       │ ──▶ │ 3. Novo chat: escolha│
 │ o chat       │     │    página          │     │ quem a IA interpreta │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Exporte um chat](./export) do Telegram Desktop ou do WhatsApp.
2. Solte a pasta, o `.zip` ou o `.txt` do WhatsApp na página (ou comece com `rooftop --import <pasta>`).
3. Clique em **Novo chat** e escolha a persona: a outra pessoa, ou você mesmo ("conversar comigo mesmo no meu estilo").

::: tip Experimente sem os seus próprios chats
O repositório traz duas exportações fictícias em [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples):
Jonas e Priya cozinham lasanha no Telegram, Sofia e Daniel passam um fim de semana no WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Sem exportação? Comece com notas

**Novo chat → A partir de notas** precisa apenas do nome dela (o seu é opcional) e de algumas linhas sobre ela: quem é,
o que vocês compartilham, como escreve ("me chama de tesoro, mensagens curtas em italiano, muitos ❤️"). A IA escreve como ela
só com essas notas. Sem histórico não há perfil de estilo nem biblioteca de mídia, então quanto mais as notas disserem sobre
como ela escreve, mais próximo fica. Você pode editar as notas no chat a qualquer momento (✎) e compartilhar o chat por link como qualquer outro. Excluir o chat exclui tudo o que ele tinha.

## O que há na janela

| Botão | O que faz |
|---|---|
| **Compartilhar** | [Links](../features/share-links) para os amigos conversarem com a persona |
| **Biblioteca de mídia** | Cada figurinha, GIF, foto e mensagem de voz com o que a IA sabe sobre eles |
| **Notas** | Coisas sobre a pessoa que a exportação não diz. A persona as lê; os visitantes nunca |
| **`{ }`** | O JSON exato enviado ao modelo, e os tokens usados |
| **Reescrever** | Descarta a última resposta da persona e a escreve de novo |
| **Deixar escrever primeiro** | A persona começa a conversa |
