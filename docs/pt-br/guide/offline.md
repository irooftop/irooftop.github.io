# Offline e privacidade

O iRoof.top mantém seus chats no seu computador. Com um modelo que também roda no seu computador, **nada precisa sair dele**.
O **modo offline** transforma isso em uma regra que o app aplica, e não em um hábito.

## O que acontece localmente

| Etapa | Onde roda | Rede |
|---|---|---|
| Importação, análise, o perfil de estilo | seu computador | nenhuma |
| Armazenamento | arquivos JSON e mídia na pasta de dados | nenhuma |
| Busca no histórico, PINs dos links, biblioteca de mídia | seu computador | nenhuma |
| Descrever fotos, figurinhas, GIFs, vídeos | o **modelo de mídia**, só quando você aperta **Descrever com IA** | uma requisição por item ao endpoint do modelo |
| Transcrever voz | o modelo de mídia, quando você aperta **Descrever com IA** em uma mensagem de voz, ou grava uma | uma requisição ao endpoint do modelo |
| Uma resposta | o **modelo de chat**, quando você envia uma mensagem (ou um visitante envia) | requisições ao endpoint do modelo |
| Compactar um histórico longo | o modelo de chat, como parte de uma resposta, quando o histórico passa do orçamento | uma requisição extra ao endpoint do modelo |

A importação nunca chama um modelo. A primeira chamada acontece quando você envia uma mensagem, aperta **Descrever** ou grava uma
mensagem de voz. Uma resposta envia ao modelo o seu histórico exportado (até o [orçamento de histórico](../reference/configuration#settings-only)),
o perfil de estilo e as descrições de mídia. Então **onde o modelo roda decide para onde vai o seu chat**: um endpoint na nuvem o recebe; um modelo no seu computador, não.

## Executar só offline

1. Instale o [Ollama](https://ollama.com) ou o [LM Studio](https://lmstudio.ai), ou rode o `llama-server` do llama.cpp.
2. Baixe um **modelo de chat que suporte chamadas de ferramentas**, e um **modelo de visão** se quiser que fotos e figurinhas sejam descritas.
3. Em **Configurações**, escolha o endpoint e o modelo, e ative o **Offline**:

| Servidor | URL base |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| `llama-server` do llama.cpp | `http://localhost:8081/v1` (a porta padrão dele, `8080`, é a do iRoof.top: inicie com `llama-server --port 8081`) |

4. Clique em **Testar**. Ele envia uma requisição pequena e mostra o modelo e o host que responderam. Você pode desligar a rede e continuar conversando.

O **app de desktop** é configurado nas Configurações. Ele não lê seu shell nem um arquivo `.env` (veja [App de desktop](./desktop)),
embora respeite `ROOFTOP_OFFLINE` e `OPENAI_*` se estiverem no ambiente em que foi iniciado. Um servidor
lê o ambiente (e o `.env`):

::: code-group

```sh [Homebrew / servidor cargo]
# --offline é o mesmo que ROOFTOP_OFFLINE=1
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=llama3.1 rooftop --offline
```

```sh [Docker]
docker run -p 8080:8080 -v rooftop-data:/data \
  --add-host=host.docker.internal:host-gateway \
  -e ROOFTOP_OFFLINE=1 \
  -e OPENAI_BASE_URL=http://host.docker.internal:11434/v1 -e OPENAI_MODEL=llama3.1 \
  ghcr.io/irooftop/rooftop
```

:::

No Docker, `localhost` é o próprio contêiner, então use `host.docker.internal` (a opção `--add-host` só é necessária no Linux).
Se o Ollama recusar a conexão, faça-o escutar em todas as interfaces (`OLLAMA_HOST=0.0.0.0`).

### O que o modo offline impõe

| | Modo offline |
|---|---|
| Chat, resumo do histórico, descrição de mídia, transcrição de voz | recusados, a menos que o endpoint seja [local](#local-means) |
| Servidores MCP acessados por HTTP | recusados, exceto locais; aparece como erro nas Configurações |
| Compartilhamento pela internet (`<nome>.iroof.top`) | desligado: o cliente de relay não inicia e o interruptor fica travado |
| Bot do Telegram, próprio ou compartilhado | não iniciado |
| GIFs por URL | a IA não pode enviar um GIF de uma URL que não seja local |
| Links de Wi‑Fi | funcionam |

Uma requisição recusada falha antes de qualquer conexão ser feita, e a mensagem diz o motivo: `Modo offline: https://openrouter.ai
não é um endpoint local`. Um redirecionamento de um endpoint local para outro host também é recusado. Um pequeno selo **Offline**
aparece no cabeçalho da barra lateral enquanto o modo está ativo. A configuração é salva. `--offline` / `ROOFTOP_OFFLINE=1`
o ativam independentemente das Configurações, e as Configurações não conseguem desativá-lo.

#### O que significa "local" {#local-means}

`localhost`, loopback (`127.0.0.0/8`, `::1`), endereços de rede privada (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
endereços link-local, e os nomes `*.local` e `*.internal` (como `host.docker.internal`). Um modelo em outro
computador da sua rede doméstica conta como local, porque nunca sai da sua rede. Os nomes são avaliados pela forma como
estão escritos; não são resolvidos.

### O que o modo offline não consegue verificar

* Os **servidores MCP stdio** são programas do seu computador. O iRoof.top os inicia, mas não consegue ver a que eles se conectam,
  então adicione apenas os que você confia que ficarão locais.
* A **transcrição de voz** usa a API de chat (uma parte `input_audio`), não a API Whisper `/audio/transcriptions`.
  Ela precisa de um servidor e modelo locais que aceitem áudio ali. Se o seu não aceitar, a mensagem de voz ainda é salva e
  enviada; só falta o texto dela.
* A **geração de imagens e voz** existe só como [ferramentas MCP](../features/mcp). Offline, use um servidor MCP local para elas.
* As pessoas com quem você compartilha abrem seus links de Wi‑Fi em seus próprios navegadores. O modo offline controla este app, não os dispositivos delas.

## Compartilhar com amigos com segurança {#share-with-friends-safely}

| Link | O que acontece |
|---|---|
| **Wi‑Fi** `http://<seu IP>:8737/s/<nome>` | nunca sai da sua rede local |
| **Internet** `https://<nome>.iroof.top/s/<nome>` | o app abre uma única conexão WebSocket de saída com o hub, que encaminha por ela as requisições HTTP do visitante e as respostas do seu app |

Com um link da Internet, sua exportação, seus chats e o modelo ficam no seu computador, e o hub não guarda nenhum deles.
O hub guarda apenas um registro de conta: seu nome, um hash do seu segredo e quando ele te viu pela última vez.

Seja claro sobre o que isso *não* oferece. O hub termina o TLS, então, como qualquer proxy reverso, tecnicamente vê o tráfego que passa
por ele: o que o visitante digita, as respostas da persona e o histórico que o link permite que os visitantes leiam
(**Visitantes podem ler a exportação**, padrão **nada**). Ele encaminha apenas as páginas de visitante (`/s/…`,
`/api/s/…`, recursos de página) e descarta cookies nos dois sentidos; sua interface de proprietário e suas configurações nunca são acessíveis por ele. Se isso for confiança demais, use links de Wi‑Fi, ou [rode seu próprio hub de relay](../reference/relay-hub).
[Mais sobre links de compartilhamento](../features/share-links).

Com o **modo offline**, o relay do iroof.top fica desligado. Os links de Wi‑Fi continuam funcionando.

## O bot do Telegram {#the-telegram-bot}

[Responder pelo Telegram](../features/telegram) posta no seu grupo:

* as novas **mensagens dos visitantes** (nome, nome do link, texto, ou um rótulo de mídia com sua descrição ou transcrição, e uma pequena
  prévia da mensagem a que elas respondem) e as **respostas** da IA;
* nunca o histórico exportado. Mensagens antigas não são transmitidas.

Bots não têm criptografia ponta a ponta: o texto passa pelo Telegram em texto simples. Com o **bot compartilhado**, ele também passa
pelo hub, que guarda apenas qual grupo pertence a qual conta. Um **bot próprio** fala diretamente com o
Telegram, sem o hub. O modo offline desliga os dois.

## Para onde vão seus dados

| Dados | Para onde vão |
|---|---|
| Exportações, chats, configurações, chave de API | a pasta de dados do seu computador |
| Importação e perfil de estilo | para lugar nenhum |
| Histórico, perfil de estilo, suas mensagens | o endpoint de modelo que você escolheu, a cada resposta |
| Fotos e voz | o endpoint do modelo de mídia, ao **Descrever** ou quando você grava uma mensagem de voz |
| Mensagens de visitantes em um link de Wi‑Fi | seu computador e seu endpoint de modelo |
| Mensagens de visitantes em um link da Internet | o hub (em trânsito), seu computador, seu endpoint de modelo |
| Mensagens de visitantes com o Telegram | além disso, o Telegram, e o hub para o bot compartilhado |
| Modo offline | só o endpoint de modelo local, só links de Wi‑Fi, sem Telegram |
