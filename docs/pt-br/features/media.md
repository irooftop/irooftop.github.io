# Fotos e voz

Algumas pessoas mandam principalmente fotos, outras falam principalmente em mensagens de voz. O iRoof.top mantém os dois hábitos.

## Entendendo

Na biblioteca de mídia, **Descrever com IA** descreve figurinhas, GIFs e fotos e **transcreve mensagens de voz** com o
*modelo de mídia*, que precisa aceitar imagens e áudio. Configure nas Configurações ou com `OPENAI_MEDIA_MODEL`, por exemplo
`google/gemini-3.5-flash-lite` no OpenRouter. As descrições só são feitas quando você clica no botão, e com um modelo local e o
[modo offline](../guide/offline) as fotos nunca saem do seu computador.

```text
<mensagem de voz 0:05: «o que foi dito»>
```

Quando um tipo domina, o perfil de estilo diz isso, por exemplo "fala principalmente em mensagens de voz (10 de 10)".

### Bibliotecas grandes

Um chat longo pode ter dezenas de milhares de figurinhas, GIFs e fotos. A biblioteca de mídia ajuda a gastar os tokens do modelo
onde eles importam:

| Controle | O que faz |
|---|---|
| Abas por tipo | Todos, Faltando, Descritos, Figurinhas, GIFs, Fotos, Vídeos, Voz, com contagens |
| Ordem | mais usados (padrão), menos usados, usados recentemente, usados pela primeira vez |
| Número de usos | oculta itens usados menos de 2, 3, 5, 10 ou 25 vezes |
| Busca | nas descrições e nos ids |

**Descrever N com IA** descreve exatamente o que está sendo mostrado e ainda não foi descrito, **de cima para baixo na ordem escolhida**,
quatro por vez. Cada descrição é salva assim que chega. A linha de progresso mostra quantas estão prontas, as falhas,
a velocidade e o tempo restante. O mesmo botão vira **Parar**: você pode parar a qualquer momento, e a próxima execução continua
com o resto. Um bom começo para um chat grande: *Mais usados primeiro* e *Usados 3 ou mais vezes*.

## Suas mensagens de voz

Com o campo de digitação vazio, o botão de enviar vira um **microfone**, como no Telegram. A gravação é convertida para WAV no
navegador, enviada e transcrita. Visitantes dos links de compartilhamento também podem gravar.

::: info
Os navegadores só permitem gravar em `https://` ou `localhost`.
:::

## As fotos e a voz da persona

Conecte um servidor MCP que gere imagens e um que fale:

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

A persona então ganha mais duas ações:

| Ação | O que faz |
|---|---|
| `send_voice {text}` | chama a ferramenta de voz (WAV, tentando de novo em mp3) e envia uma mensagem de voz |
| `send_photo {prompt, caption?}` | chama a ferramenta de imagem e envia uma foto |

* Com uma ferramenta de voz conectada, as mensagens de voz transcritas da própria persona são reproduzidas como `send_voice`, para que o modelo veja
  o hábito na forma que ele consegue continuar.
* **Voz** em *Detalhes do chat* (por exemplo `Puck`) dá à persona a sua própria voz.
* Qualquer outra imagem ou áudio que uma ferramenta MCP devolver vira mídia do chat `gen_…` (verificada pelo conteúdo, até 25 MB, apagada
  com o chat).

::: tip Custos
Cada foto ou mensagem de voz é uma chamada paga extra: cerca de US$ 0,01 por imagem com `meta/muse-image`, e alguns segundos de TTS.
:::
