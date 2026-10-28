# Exportar um chat

<div class="wide">

![Telegram Desktop: abra o chat, clique em ⋯ no canto superior direito, escolha Exportar histórico do chat…, depois Exportar](/img/telegram-export.svg)

</div>

## Telegram

No **Telegram Desktop** (macOS, Windows, Linux): abra o chat → **⋯** → **Exportar histórico do chat…** → **Exportar**.

* Mantenha fotos, vídeos, mensagens de voz, figurinhas e GIFs ativados: a persona os usa.
* Os dois formatos funcionam: **HTML** (`messages.html`) e **JSON** legível por máquina (`result.json`).
* Solte a pasta da exportação, ou um `.zip` dela, na página.

## WhatsApp

No celular: abra o chat → **⋮ → Mais → Exportar conversa** (iPhone: toque no nome do contato → **Exportar conversa**) →
**Incluir mídia**. Envie o `.zip` para o seu computador e solte-o na página.

Um chat exportado sem mídia é um único `.txt`, e isso também funciona.

## Exportações grandes

Exportações com mais de 100.000 mensagens e muitos gigabytes funcionam do mesmo jeito: solte a pasta. A página mostra o que está acontecendo:

1. **Lendo a pasta…** conta os arquivos (o navegador pode demorar para listar dezenas de milhares).
2. **O chat vai primeiro.** As páginas de mensagens (ou `result.json`, ou o `.txt` do WhatsApp) são enviadas e lidas antes da mídia. Se esta exportação **já foi importada**, a importação termina aqui e a abre, e nenhuma mídia é enviada. Se a mídia não couber no disco, você é avisado de quanto espaço é necessário antes de enviar algo grande.
3. **Enviando 1,2 GB de 3,4 GB (35%) · 9.000 de 30.905 arquivos**: a mídia segue em pequenos lotes, um após o outro. O navegador nunca monta uma única requisição gigante, e um lote interrompido é tentado de novo sozinho. Não há limite de tamanho quando você executa no seu próprio computador.
4. **Lendo mensagens: página 37 de 121 · 36.000 mensagens**: todas as páginas são lidas uma vez, em paralelo.
5. **Verificando mídia** e **Movendo mídia**: os arquivos recebem um hash para encontrar duplicatas e são movidos (não copiados duas vezes) para a pasta de dados.
6. **Salvando**, e então abre a janela *Novo chat*.

Só uma importação roda por vez; um erro fica visível na área de soltar e você pode escolher a pasta de novo.

No [app de desktop](./desktop) nada disso é enviado: o app lê a pasta, o `.zip` ou o `.txt` de onde eles estão
(passos 4 a 6), o que é mais rápido e não sofre dos problemas do navegador abaixo.

::: details Quando um arquivo não pode ser enviado (navegador)
Um arquivo que o navegador não consegue mais ler (movido, alterado, ou um espaço reservado do iCloud/OneDrive que não foi baixado) é encontrado e pulado, assim como um único arquivo que continua quebrando o seu lote: o lote é dividido até isolá-lo. A mídia pulada aparece como ausente no chat; a mensagem após a importação nomeia uma delas, e o console do navegador lista todas. Quando o próprio arquivo do chat não pode ser enviado, a importação para e o nomeia. Os erros dizem o que o servidor recebeu, por exemplo `o servidor recebeu 1.200 de 4.096 bytes`, para distinguir facilmente um problema de conexão ou do navegador.
:::

Durante uma importação nada sai do seu computador e nenhum modelo é chamado. A mídia só é descrita quando você aperta **Descrever** na biblioteca de mídia.

Com `rooftop --import <pasta>`, a pasta é lida no lugar e seus arquivos são copiados, nunca movidos; o progresso é registrado no log.
Para uma exportação enorme no mesmo computador, é o caminho mais rápido: sem envio e sem uma segunda cópia em uma pasta temporária.

## O que é reconhecido

| Origem | Arquivos |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (usado quando a pasta não tem `messages.html`) |
| WhatsApp | `WhatsApp Chat with <nome>.txt` (Android) ou `_chat.txt` (iOS), em uma pasta, um `.zip` ou sozinho |

* **Telegram**: texto com quebras de linha, links, citações e código; respostas e citações parciais; encaminhamentos; edições; mensagens de serviço;
  reações; prévias de links; foto, vídeo, vídeo redondo, mensagem de voz, áudio, arquivo, figurinha (`.webp`, `.webm`,
  `.tgs`), GIF, localização, contato, enquete e chamada.
* **WhatsApp**: layouts do Android e do iOS, relógios de 12 e 24 horas e as duas ordens dia/mês, detectados por arquivo.
  Mensagens de várias linhas, edições e anexos são mantidos. Mensagens apagadas e o aviso de criptografia são ignorados,
  e `<Media omitted>` é marcado como indisponível.

Os arquivos de mídia recebem um hash, então uma figurinha enviada cinco vezes vira um único item da biblioteca (`stk_…`, `gif_…`, `pho_…`).

::: info Reações em exportações HTML
As exportações HTML não dizem quem reagiu. Em conversas individuais, uma reação é atribuída ao outro participante, e a ambos quando a contagem é 2.
:::
