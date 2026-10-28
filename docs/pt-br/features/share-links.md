# Links de compartilhamento

**Compartilhar** no cabeçalho do chat cria links para que outras pessoas possam conversar com a persona, por exemplo:

* um amigo avalia o quão bem a IA escreve **no seu estilo**;
* um amigo conversa com **uma cópia de si mesmo**.

Um link é `https://<seu host>/s/<nome>`. Os visitantes veem só o chat: sem barra lateral, configurações, notas, descrições de mídia,
prompt, uso de tokens ou outros chats.

## Opções

| Opção | Padrão | |
|---|---|---|
| Quem pode abrir | este computador | os interruptores **Wi‑Fi** e **Internet**, direto no editor ([abaixo](#open-links-on-other-devices)) |
| Link | aleatório | escolha um nome como `alex` |
| Nome exibido | nome da persona | os nomes reais da exportação não são mostrados |
| PIN | nenhum | 4–64 caracteres, armazenado como hash Argon2id. ✨ gera 6 dígitos |
| Conversas | privadas | **Privada**: uma conversa por visitante. **Sala compartilhada**: todos em uma mesma conversa |
| Visitantes podem ler a exportação | nada | nada, as últimas *N* mensagens, ou tudo |
| Limites | 50 visitantes, 200 respostas cada | cada resposta custa tokens da sua chave. `0` = ilimitado |
| Visitantes podem fazer a persona escrever primeiro | desligado | mostra o botão 💬: a persona envia uma mensagem sem que o visitante escreva nada |
| Visitantes podem reescrever uma resposta | desligado | mostra o botão ↻: a última resposta da persona é escrita de novo. Ambos usam uma resposta do limite, e o servidor os recusa enquanto estiverem desligados |
| Expira / ativo | nunca / ligado | pausar ou expirar um link sem apagá-lo |
| Grupo do Telegram | desligado | [responder pelo Telegram](./telegram) |

Na janela Compartilhar você pode **Ler** cada conversa de visitante, e **Encerrar** uma para revogá-la. Cada visitante mostra o
endereço do qual escreveu por último; ao encerrar uma conversa, **Bloquear também** mantém esse endereço fora do link
(a página inicial, novas conversas e as já abertas) até você **Desbloquear**. Em uma rede compartilhada,
um endereço pode ser várias pessoas. Os endereços ficam guardados com o link, apenas no seu computador.

## Com quem a persona conversa

Um visitante não é você. Quando a Mia abre o seu link, a persona sabe que **Mia** está escrevendo, que o link
veio de você, e que o histórico e as suas notas são sobre você e sobre elas, não sobre a Mia: ela a recebe
como alguém novo. Sem nome, ela é apenas uma convidada.

| | A persona vê |
|---|---|
| Link privado | uma conversa com o visitante, com o nome que ele deu (ou "Convidado") |
| Sala compartilhada | um chat em grupo: cada mensagem traz o nome do remetente, e as pessoas podem entrar a qualquer momento |
| Seu histórico de exportação | as suas mensagens com o seu nome, depois as do visitante, para que nunca se misturem |

O prompt do sistema é fixo para cada conversa, para que os provedores o mantenham em cache: o nome do visitante é definido
quando a conversa começa, e em uma sala os nomes viajam com as mensagens. Um visitante que se chame como a persona ou como você
vira, por exemplo, "Alex (convidado)", e uma segunda "Ann" em uma sala vira "Ann 2".

## Convites

| Link | Abre |
|---|---|
| `/s/alex` | a página inicial |
| `/s/alex#pin=2468` | o chat na hora. O PIN fica depois do `#`, então nunca chega ao servidor nem aos logs |
| `/s/alex#name=Greg&pin=2468` | o mesmo, com o nome do visitante já preenchido (`?name=Greg` também funciona) |

O botão **QR** de um link abre um código para escanear com o celular, para cada endereço que funcione. Logo após salvar,
**Copiar convite com PIN** copia o link com o PIN.

## Abrir links em outros dispositivos {#open-links-on-other-devices}

Em um servidor, os links simplesmente usam o endereço do servidor. O app de desktop (e o `rooftop` em `127.0.0.1`) roda só no
seu computador, então a janela Compartilhar e o editor de links têm dois interruptores. Cada um indica se está **Ativo**,
**Conectando** ou **Não funciona**, e o editor mostra de imediato o endereço que o link terá.

```
                    ┌──────────── seu computador ───────────┐
 celular no Wi‑Fi ──▶│ :8737  só páginas de visitante        │
                    │                                       │
 qualquer pessoa ──▶ nome.iroof.top ══ um WebSocket de saída ══▶ app │
                    │                                       │
                    │ 127.0.0.1  interface do proprietário, │
                    │            configurações e API        │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi e rede local | Internet |
|---|---|---|
| Endereço | `http://<seu IP>:8737/s/<nome>` | `https://<nome>.iroof.top/s/<nome>` |
| Quem | dispositivos na mesma rede | qualquer pessoa, enquanto o app estiver rodando |
| Como | um segundo ouvinte que serve só páginas de visitante | um WebSocket de saída para o relay; nada escuta na internet |
| Seus dados | ficam no seu computador | ficam no seu computador, mas as mensagens dos visitantes passam pelo relay |

* A porta do Wi‑Fi continua a mesma entre reinicializações, então QR codes impressos seguem funcionando. No macOS, permita
  conexões de entrada se o firewall perguntar.
* O nome da Internet você escolhe e pode trocar (**Alterar** ao lado do endereço). O relay encaminha apenas
  `/s/…`, `/api/s/…` e recursos de página, descarta cookies nos dois sentidos e mostra uma página "offline" enquanto o app está fechado.
* Quer o seu próprio relay em vez do iroof.top? Veja [Hub de relay](../reference/relay-hub).
* O **modo offline** desliga e trava o interruptor da Internet; o Wi‑Fi continua funcionando. O que o relay pode ver:
  [Offline e privacidade](../guide/offline#share-with-friends-safely).

## Proteção

| Proteção | Limite |
|---|---|
| PINs errados de um IP | após 5: bloqueado por 1 min, depois 2, 4… até 1 h |
| PINs errados em um link, todos os IPs | 20 em 15 min: bloqueado por 5 min, dobrando até 24 h |
| Mensagens por visitante | 30 por minuto, 10 respostas por minuto |
| Novas conversas | 20 por hora por IP |

Os contadores ficam na memória. Um PIN de 6 dígitos não pode ser adivinhado em um tempo razoável. Atrás de um proxy reverso, defina
`ROOFTOP_TRUST_PROXY=true`, para que os contadores vejam os IPs reais dos clientes.

As sessões de visitante usam um token aleatório de 26 caracteres em `/s/<nome>/<token>`, lembrado pelo navegador e protegido contra
vazamento pelo `Referrer-Policy: no-referrer`. Os visitantes só podem carregar a mídia que têm permissão de ver.
