# Configuração

Variáveis de ambiente, um arquivo `.env` no diretório de trabalho, ou as opções correspondentes do `rooftop`
([CLI](./cli)). Valores definidos em **Configurações** têm prioridade sobre o ambiente para o endpoint do LLM, o modelo, a chave, a temperatura,
o orçamento do histórico, os passos de ferramentas, os servidores MCP, o bot do Telegram e o modo offline. `TELEGRAM_BOT_TOKEN` tem prioridade sobre as Configurações.

## Modelo

| Variável | Padrão | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | qualquer API compatível com OpenAI: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | token bearer |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | precisa suportar chamadas de ferramentas |
| `OPENAI_TEMPERATURE` | padrão do provedor | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | descreve imagens e transcreve voz, por exemplo `xiaomi/mimo-v2.6-flash` |

## Offline

| Variável | Padrão | |
|---|---|---|
| `ROOFTOP_OFFLINE` | desligado | `1`, `true`, `yes` ou `on`: só modelos e servidores MCP locais (este computador ou a rede), sem compartilhamento pela internet, sem Telegram. O mesmo que o interruptor **Offline** das Configurações, mas as Configurações não conseguem desligá-lo. O app de desktop também respeita. [Offline e privacidade](../guide/offline) |

## Servidor

| Variável | Padrão | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (`0.0.0.0:8080` no Docker) | com `0.0.0.0:<porta>` o log mostra a URL da LAN |
| `ROOFTOP_DATA` | `./data` (`/data` no Docker) | exportações, chats, configurações |
| `ROOFTOP_IMPORT` | – | exportações a importar ao iniciar, separadas por `:`, idempotente |
| `ROOFTOP_PASSWORD` | – | autenticação HTTP Basic para a interface do proprietário (qualquer nome de usuário). **Defina em um servidor público** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | limite de envio para o proprietário em MiB; `0` significa nenhum (exportações têm muitos GB). Defina em um servidor que outros possam acessar. Os links de compartilhamento mantêm o próprio limite de 16 MiB. O app de desktop não tem limite |
| `ROOFTOP_TRUST_PROXY` | `false` | IP do cliente a partir de `X-Forwarded-For` / `X-Real-IP`, só atrás de um proxy reverso |
| `ROOFTOP_FFMPEG` | `ffmpeg` no `PATH`, depois Homebrew, `/usr/local`, `/usr/bin` | quadros de GIFs e vídeos (opcional) |
| `TZ` | UTC | fuso horário das mensagens ao vivo |

## Telegram

| Variável | Padrão | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | seu bot do [@BotFather](https://t.me/BotFather) ([Responder pelo Telegram](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | todo grupo em que o bot entrar | ids de grupos permitidos, separados por vírgula |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | por exemplo, um servidor Bot API próprio |

## Relay

| Variável | Padrão | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | relay para o compartilhamento pela **Internet** e o bot compartilhado |
| `ROOFTOP_RELAY_DOMAIN` | – | executa um [hub de relay](./relay-hub) para este domínio |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | o bot compartilhado do hub; deve ser diferente de `TELEGRAM_BOT_TOKEN` |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | o máximo de nomes que um hub guarda |

## Somente nas Configurações {#settings-only}

| Configuração | Padrão | |
|---|---|---|
| Orçamento do histórico | `120000` caracteres | quanto histórico é reproduzido antes que entre a [memória](../features/how-it-works#long-chats) |
| Máximo de passos de ferramentas | `6` | rodadas do LLM por resposta (busca, ferramenta MCP, resposta…) |
