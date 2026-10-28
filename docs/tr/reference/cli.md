# CLI

```text
rooftop [serve] [SEÇENEKLER]        web sunucusunu çalıştırır (varsayılan)
rooftop parse <KLASÖR>              normalleştirilmiş dışa aktarımı JSON olarak yazdırır
rooftop convert [SEÇENEKLER] <KLASÖR>  bir dışa aktarımın {model, messages, tools} çıktısını verir
```

## `serve`

| Seçenek | Değişken | Varsayılan |
|---|---|---|
| `--addr` | `ROOFTOP_ADDR` | `127.0.0.1:8080` |
| `--data` | `ROOFTOP_DATA` | `./data` |
| `--import` | `ROOFTOP_IMPORT` | – |
| `--password` | `ROOFTOP_PASSWORD` | – |
| `--max-upload-mb` | `ROOFTOP_MAX_UPLOAD_MB` | `0` (sınırsız) |
| `--trust-proxy` | `ROOFTOP_TRUST_PROXY` | `false` |
| `--telegram-token` | `TELEGRAM_BOT_TOKEN` | – |
| `--telegram-chat` | `TELEGRAM_CHAT_ID` | botun katıldığı her grup |
| `--telegram-api` | `TELEGRAM_API_URL` | `https://api.telegram.org` |
| `--offline` | `ROOFTOP_OFFLINE` | kapalı |
| `--relay-domain` | `ROOFTOP_RELAY_DOMAIN` | – |
| `--relay-bot-token` | `ROOFTOP_RELAY_BOT_TOKEN` | – |
| `--relay-max-accounts` | `ROOFTOP_RELAY_MAX_ACCOUNTS` | `5000` |

`--offline`, yerel olmayan model ve MCP uç noktalarını reddeder ve internet üzerinden paylaşımı ile Telegram botunu kapatır
([Çevrimdışı mod ve gizlilik](../guide/offline)). `--relay-domain` ile birleştirilemez. Her birinin ne yaptığı: [Yapılandırma](./configuration).

## `parse` ve `convert`

```sh
rooftop parse   ./examples/telegram                          # normalleştirilmiş JSON
rooftop convert ./examples/telegram --persona "Jonas Weber"  # modelin aldığı şey
```

| `convert` seçeneği | Varsayılan | |
|---|---|---|
| `--persona` | sohbet başlığı / diğer kişi | LLM kimin adına konuşur |
| `--user` | diğer katılımcı | insanı kim oynar |
| `--budget` | `120000` | karakter cinsinden geçmiş bütçesi |

Uygulamada `{ }` düğmesi, geçerli sohbet için aynı JSON'u gösterir.
