# Yapılandırma

Ortam değişkenleri, çalışma dizinindeki bir `.env` dosyası ya da karşılık gelen `rooftop` seçenekleri
([CLI](./cli)). **Ayarlar**'da belirlenen değerler; LLM uç noktası, model, anahtar, sıcaklık, geçmiş bütçesi, araç adımları, MCP sunucuları, Telegram botu ve Çevrimdışı mod için ortamın önüne geçer. `TELEGRAM_BOT_TOKEN`, Ayarlar'ın önüne geçer.

## Model

| Değişken | Varsayılan | |
|---|---|---|
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | OpenAI uyumlu her API: OpenAI, OpenRouter, Gemini, Mistral, DeepSeek, Groq, Ollama (`http://localhost:11434/v1`), LM Studio (`http://localhost:1234/v1`), llama.cpp (`http://localhost:8080/v1`), vLLM… |
| `OPENAI_API_KEY` | – | taşıyıcı (bearer) belirteci |
| `OPENAI_MODEL` | `openai/gpt-6-luna` | araç çağrısını desteklemelidir |
| `OPENAI_TEMPERATURE` | sağlayıcının varsayılanı | |
| `OPENAI_MEDIA_MODEL` | `OPENAI_MODEL` | görüntüleri açıklar ve sesi döker, örneğin `xiaomi/mimo-v2.6-flash` |

## Çevrimdışı

| Değişken | Varsayılan | |
|---|---|---|
| `ROOFTOP_OFFLINE` | kapalı | `1`, `true`, `yes` ya da `on`: yalnızca yerel modeller ve MCP sunucuları (bu bilgisayar ya da ağ), internet üzerinden paylaşım yok, Telegram yok. Ayarlar'daki **Çevrimdışı** anahtarıyla aynıdır, ancak Ayarlar onu kapatamaz. Masaüstü uygulaması da buna uyar. [Çevrimdışı mod ve gizlilik](../guide/offline) |

## Sunucu

| Değişken | Varsayılan | |
|---|---|---|
| `ROOFTOP_ADDR` | `127.0.0.1:8080` (Docker'da `0.0.0.0:8080`) | `0.0.0.0:<bağlantı noktası>` ile günlük LAN adresini gösterir |
| `ROOFTOP_DATA` | `./data` (Docker'da `/data`) | dışa aktarımlar, sohbetler, ayarlar |
| `ROOFTOP_IMPORT` | – | başlangıçta içe aktarılacak dışa aktarımlar, `:` ile ayrılmış, idempotent |
| `ROOFTOP_PASSWORD` | – | sahip arayüzü için HTTP Basic kimlik doğrulaması (herhangi bir kullanıcı adı). **Herkese açık bir sunucuda ayarlayın** |
| `ROOFTOP_MAX_UPLOAD_MB` | `0` | sahip için MiB cinsinden yükleme sınırı; `0` sınır yok demektir (dışa aktarımlar birkaç GB'dır). Başkalarının erişebildiği bir sunucuda ayarlayın. Paylaşım bağlantılarının kendi 16 MiB sınırı vardır. Masaüstü uygulamasında sınır yoktur |
| `ROOFTOP_TRUST_PROXY` | `false` | `X-Forwarded-For` / `X-Real-IP`'den istemci IP'si, yalnızca bir ters vekilin arkasında |
| `ROOFTOP_FFMPEG` | `PATH` üzerindeki `ffmpeg`, sonra Homebrew, `/usr/local`, `/usr/bin` | GIF'lerin ve videoların kareleri (isteğe bağlı) |
| `TZ` | UTC | canlı mesajların saat dilimi |

## Telegram

| Değişken | Varsayılan | |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | – | [@BotFather](https://t.me/BotFather)'dan aldığınız bot ([Telegram'dan yanıtlama](../features/telegram)) |
| `TELEGRAM_CHAT_ID` | botun katıldığı her grup | izin verilen grup kimlikleri, virgülle ayrılmış |
| `TELEGRAM_API_URL` | `https://api.telegram.org` | örneğin kendi barındırdığınız bir Bot API sunucusu |

## Aktarıcı

| Değişken | Varsayılan | |
|---|---|---|
| `ROOFTOP_RELAY_URL` | `https://iroof.top` | **İnternet** üzerinden paylaşım ve paylaşılan bot için aktarıcı |
| `ROOFTOP_RELAY_DOMAIN` | – | bu alan adı için bir [aktarıcı merkezi](./relay-hub) çalıştırır |
| `ROOFTOP_RELAY_BOT_TOKEN` | – | merkezin paylaşılan botu; `TELEGRAM_BOT_TOKEN`'dan farklı olmalıdır |
| `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` | bir merkezin tutabileceği en fazla ad |

## Yalnızca Ayarlar {#settings-only}

| Ayar | Varsayılan | |
|---|---|---|
| Geçmiş bütçesi | `120000` karakter | [bellek](../features/how-it-works#long-chats) devreye girmeden önce ne kadar geçmişin yeniden oynatılacağı |
| En fazla araç adımı | `6` | yanıt başına LLM turu (arama, MCP aracı, yanıt…) |
