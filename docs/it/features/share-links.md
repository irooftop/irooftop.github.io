# Link di condivisione

**Condividi** nell'intestazione della chat crea link perché altre persone possano parlare con il personaggio, per esempio:

* un amico giudica quanto bene l'IA scrive **nel tuo stile**;
* un amico parla con **una copia di sé stesso**.

Un link è `https://<il tuo host>/s/<nome>`. I visitatori vedono solo la chat: niente barra laterale, impostazioni, note, descrizioni dei media,
prompt, uso dei token o altre chat.

## Opzioni

| Opzione | Predefinito | |
|---|---|---|
| Chi può aprirlo | questo computer | gli interruttori **Wi‑Fi** e **Internet**, direttamente nell'editor ([sotto](#open-links-on-other-devices)) |
| Link | casuale | scegli un nome come `alex` |
| Nome visualizzato | nome del personaggio | i nomi reali dell'esportazione non vengono mostrati |
| PIN | nessuno | 4–64 caratteri, memorizzato come hash Argon2id. ✨ genera 6 cifre |
| Conversazioni | private | **Privata**: una conversazione per visitatore. **Stanza condivisa**: tutti in un'unica conversazione |
| I visitatori possono leggere l'esportazione | nulla | nulla, gli ultimi *N* messaggi, oppure tutto |
| Limiti | 50 visitatori, 200 risposte ciascuno | ogni risposta costa token sulla tua chiave. `0` = illimitato |
| I visitatori possono farlo scrivere per primo | disattivato | mostra il pulsante 💬: il personaggio invia un messaggio senza che il visitatore ne scriva uno |
| I visitatori possono riscrivere una risposta | disattivato | mostra il pulsante ↻: l'ultima risposta del personaggio viene riscritta. Entrambi usano una risposta del limite, e il server li rifiuta finché sono disattivati |
| Scade / attivo | mai / sì | sospendi o fai scadere un link senza eliminarlo |
| Gruppo Telegram | disattivato | [rispondi da Telegram](./telegram) |

Nella finestra Condividi puoi **Leggere** ogni conversazione di visitatore, e **Terminare** una per revocarla. Ogni visitatore mostra
l'indirizzo da cui ha scritto per ultimo; terminando una conversazione, **Blocca anche** tiene quell'indirizzo lontano dal link
(la pagina iniziale, le nuove conversazioni e quelle già aperte) finché non lo **sblocchi**. Su una rete condivisa
un indirizzo può corrispondere a più persone. Gli indirizzi sono salvati con il link solo sul tuo computer.

## A chi parla il personaggio

Un visitatore non sei tu. Quando Mia apre il tuo link, il personaggio sa che sta scrivendo **Mia**, che il link
viene da te, e che la cronologia e le tue note riguardano te e loro, non Mia: la incontra
come qualcuno di nuovo. Senza nome, è solo un ospite.

| | Il personaggio vede |
|---|---|
| Link privato | una conversazione con il visitatore, con il nome che ha dato (o «Ospite») |
| Stanza condivisa | una chat di gruppo: ogni messaggio porta il nome del mittente, e le persone possono unirsi in qualsiasi momento |
| La tua cronologia di esportazione | i tuoi messaggi con il tuo nome, poi quelli del visitatore, così non si confondono mai |

Il prompt di sistema è fisso per ogni conversazione, quindi i fornitori lo mettono in cache: il nome del visitatore viene fissato
all'inizio della conversazione, e in una stanza i nomi viaggiano con i messaggi. Un visitatore che si chiama come il personaggio o come te
diventa per esempio «Alex (ospite)», e una seconda «Ann» in una stanza diventa «Ann 2».

## Inviti

| Link | Apre |
|---|---|
| `/s/alex` | la pagina iniziale |
| `/s/alex#pin=2468` | la chat subito. Il PIN sta dopo `#`, quindi non raggiunge mai il server né i log |
| `/s/alex#name=Greg&pin=2468` | lo stesso, con il nome del visitatore già compilato (funziona anche `?name=Greg`) |

Il pulsante **QR** di un link apre un codice da inquadrare con un telefono, per ogni indirizzo che funziona. Subito dopo il salvataggio,
**Copia invito con PIN** copia il link con il PIN.

## Aprire i link su altri dispositivi {#open-links-on-other-devices}

Su un server, i link usano semplicemente l'indirizzo del server. L'app desktop (e `rooftop` su `127.0.0.1`) gira solo sul
tuo computer, quindi la finestra Condividi e l'editor dei link hanno due interruttori. Ognuno indica se è **Attivo**,
**Connessione in corso** o **Non funziona**, e l'editor mostra subito l'indirizzo che avrà il link.

```
                    ┌──────────── il tuo computer ──────────┐
 telefono in Wi‑Fi ─▶│ :8737  solo pagine per i visitatori  │
                    │                                       │
 chiunque ──▶ nome.iroof.top ══ una WebSocket in uscita ══▶ app │
                    │                                       │
                    │ 127.0.0.1  interfaccia proprietario,  │
                    │            impostazioni e API         │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi e rete locale | Internet |
|---|---|---|
| Indirizzo | `http://<il tuo IP>:8737/s/<nome>` | `https://<nome>.iroof.top/s/<nome>` |
| Chi | dispositivi della stessa rete | chiunque, finché l'app è in esecuzione |
| Come | un secondo ascoltatore che serve solo le pagine per i visitatori | una WebSocket in uscita verso il relay; nulla ascolta su internet |
| I tuoi dati | restano sul tuo computer | restano sul tuo computer, ma i messaggi dei visitatori passano dal relay |

* La porta Wi‑Fi resta la stessa tra un riavvio e l'altro, quindi i codici QR stampati continuano a funzionare. Su macOS, consenti le
  connessioni in entrata se il firewall lo chiede.
* Il nome per Internet lo scegli tu e lo puoi cambiare (**Cambia** accanto all'indirizzo). Il relay inoltra solo
  `/s/…`, `/api/s/…` e le risorse della pagina, scarta i cookie in entrambe le direzioni e mostra una pagina «offline» mentre l'app è chiusa.
* Vuoi un tuo relay al posto di iroof.top? Vedi [Hub relay](../reference/relay-hub).
* La **Modalità offline** disattiva e blocca l'interruttore Internet; il Wi‑Fi continua a funzionare. Cosa può vedere il relay:
  [Offline e privacy](../guide/offline#share-with-friends-safely).

## Protezione

| Protezione | Limite |
|---|---|
| PIN sbagliati da un IP | dopo 5: bloccato per 1 min, poi 2, 4… fino a 1 h |
| PIN sbagliati su un link, tutti gli IP | 20 in 15 min: bloccato per 5 min, raddoppia fino a 24 h |
| Messaggi per visitatore | 30 al minuto, 10 risposte al minuto |
| Nuove conversazioni | 20 all'ora per IP |

I contatori sono in memoria. Un PIN a 6 cifre non si può indovinare in tempi ragionevoli. Dietro un reverse proxy imposta
`ROOFTOP_TRUST_PROXY=true`, così i contatori vedono gli IP reali dei client.

Le sessioni dei visitatori usano un token casuale di 26 caratteri in `/s/<nome>/<token>`, ricordato dal browser e protetto dalle fughe grazie a
`Referrer-Policy: no-referrer`. I visitatori possono caricare solo i media che possono vedere.
