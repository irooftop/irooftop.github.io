# Responder pelo Telegram

Um link de compartilhamento pode postar as mensagens dos seus visitantes em um grupo do Telegram. Você responde ali mesmo, ou a IA responde quando
uma contagem regressiva termina. Os visitantes veem o mesmo "digitando…" nos dois casos e não conseguem saber quem respondeu: um jogo de "humano ou IA?", ou uma
central de suporte em que a IA resolve as perguntas óbvias.

```
 visitante ──▶ link de compartilhamento ──▶ 🤖 bot ──▶ seu grupo do Telegram
                                           ├─ ✍️ Responder          você responde
                                           └─ 🤖 Resposta da IA (10 s) a IA responde agora, ou quando a contagem termina
```

## Configuração

**Configurações → Telegram** mostra o bot, se ele está conectado, e cada grupo em que ele está.

| Modo | Configuração | As mensagens vão |
|---|---|---|
| **Bot compartilhado** | nenhuma | pelo relay (iroof.top), em texto simples como qualquer bot |
| **Bot próprio** | crie um com o [@BotFather](https://t.me/BotFather), cole o token e **Conectar** | direto entre o seu app e o Telegram |
| `TELEGRAM_BOT_TOKEN` | em um servidor; `TELEGRAM_CHAT_ID` limita os grupos | direto; tem prioridade sobre as Configurações |

Depois clique em **Adicionar a um grupo**:

1. Abra o link no **app do Telegram**, no **Telegram Web**, ou escaneie o QR code com o celular. Os dois links podem ser copiados.
2. Escolha um grupo (ou crie um) e confirme.
3. A janela fica verde, e o grupo aparece nas Configurações e em todos os links de compartilhamento.

Com o bot compartilhado, o link leva um código de uso único, válido por uma hora, que vincula o grupo apenas ao seu app.

Por fim, escolha o grupo em **Grupo do Telegram** em um link de compartilhamento, e defina depois de quantos segundos a IA responde
(`0` = só quando você clica em **Resposta da IA**).

::: tip Privacidade
Só as novas mensagens dos visitantes e as respostas da IA são postadas no grupo, nunca o histórico exportado. O modo offline desliga o
bot. Detalhes: [Offline e privacidade](../guide/offline#the-telegram-bot).
:::

::: tip Não é preciso um endereço público
Os dois tipos de bot usam long polling, então funciona de um notebook. Um token de bot funciona em um app por vez.
:::

## Três formas de responder

1. Responda ao aviso "✍️ … responda a esta mensagem" do bot.
2. Responda à mensagem do visitante (ou a uma resposta da IA) a qualquer momento, sem clicar em **Responder**.
3. Clique em **Responder**, e então escreva. Por 15 minutos, as suas mensagens vão para aquele visitante, e por mais 2 minutos após cada
   resposta, então uma resposta pode abranger várias mensagens.

A terceira forma exige que o bot veja as mensagens comuns do grupo: desative o modo de privacidade (@BotFather → `/setprivacy` → Disable, e depois
adicione o bot de novo) ou torne-o administrador. As formas 1 e 2 sempre funcionam.

::: warning Use um grupo em que você confie
Qualquer pessoa no grupo pode responder. Só as respostas de texto são repassadas, e as respostas da IA contam no limite do link.
:::
