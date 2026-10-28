# Hors ligne et confidentialité

iRoof.top garde vos chats sur votre ordinateur. Avec un modèle qui tourne aussi sur votre ordinateur, **rien n'a besoin d'en sortir**.
Le **mode hors ligne** fait de cela une règle que l'application impose, et non une habitude.

## Ce qui se passe en local

| Étape | Où elle s'exécute | Réseau |
|---|---|---|
| Import, analyse, profil de style | votre ordinateur | aucun |
| Stockage | fichiers JSON et médias dans le dossier de données | aucun |
| Recherche dans l'historique, PIN des liens, médiathèque | votre ordinateur | aucun |
| Décrire photos, stickers, GIF, vidéos | le **modèle média**, seulement quand vous appuyez sur **Décrire avec l'IA** | une requête par élément vers le point d'accès du modèle |
| Transcrire la voix | le modèle média, quand vous appuyez sur **Décrire avec l'IA** sur un message vocal, ou en enregistrez un | une requête vers le point d'accès du modèle |
| Une réponse | le **modèle de chat**, quand vous envoyez un message (ou qu'un visiteur le fait) | requêtes vers le point d'accès du modèle |
| Compacter un long historique | le modèle de chat, dans le cadre d'une réponse, quand l'historique dépasse le budget | une requête supplémentaire vers le point d'accès du modèle |

L'import n'appelle jamais de modèle. Le premier appel a lieu quand vous envoyez un message, appuyez sur **Décrire** ou enregistrez un
message vocal. Une réponse envoie au modèle votre historique exporté (jusqu'au [budget d'historique](../reference/configuration#settings-only)),
le profil de style et les descriptions des médias. **Donc l'endroit où tourne le modèle décide où va votre chat** : un point d'accès
dans le cloud le reçoit, un modèle sur votre ordinateur non.

## Fonctionner entièrement hors ligne

1. Installez [Ollama](https://ollama.com) ou [LM Studio](https://lmstudio.ai), ou lancez `llama-server` de llama.cpp.
2. Téléchargez un **modèle de chat qui prend en charge l'appel d'outils**, et un **modèle de vision** si vous voulez que les photos et stickers soient décrits.
3. Dans **Paramètres**, choisissez le point d'accès et le modèle, puis activez **Hors ligne** :

| Serveur | URL de base |
|---|---|
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |
| llama.cpp `llama-server` | `http://localhost:8081/v1` (son port par défaut `8080` est celui d'iRoof.top : lancez-le avec `llama-server --port 8081`) |

4. Appuyez sur **Tester**. Une petite requête est envoyée et le modèle et l'hôte qui ont répondu s'affichent. Vous pouvez couper le réseau et continuer à discuter.

L'**application de bureau** se configure dans les Paramètres. Elle ne lit ni votre shell ni un fichier `.env` (voir [Application de bureau](./desktop)),
mais elle respecte `ROOFTOP_OFFLINE` et `OPENAI_*` s'ils sont dans l'environnement avec lequel elle a été lancée. Un serveur
lit l'environnement (et `.env`) :

::: code-group

```sh [Homebrew / serveur cargo]
# --offline équivaut à ROOFTOP_OFFLINE=1
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

Dans Docker, `localhost` désigne le conteneur lui-même : utilisez `host.docker.internal` (l'option `--add-host` n'est nécessaire que sous Linux).
Si Ollama refuse la connexion, faites-le écouter sur toutes les interfaces (`OLLAMA_HOST=0.0.0.0`).

### Ce que le mode hors ligne impose

| | Mode hors ligne |
|---|---|
| Chat, résumé d'historique, description de médias, transcription vocale | refusés, sauf si le point d'accès est [local](#local-means) |
| Serveurs MCP joints en HTTP | refusés sauf s'ils sont locaux ; une erreur s'affiche dans les Paramètres |
| Partage sur Internet (`<nom>.iroof.top`) | désactivé : le client relais ne démarre pas et l'interrupteur est verrouillé |
| Bot Telegram, le vôtre ou le partagé | non démarré |
| GIF par URL | l'IA ne peut pas envoyer un GIF depuis une URL non locale |
| Liens Wi‑Fi | fonctionnent |

Une requête refusée échoue avant toute connexion, et le message en donne la raison : `Mode hors ligne : https://openrouter.ai
n'est pas un point d'accès local`. Une redirection depuis un point d'accès local vers un autre hôte est aussi refusée. Un petit badge **Hors ligne**
apparaît dans l'en-tête de la barre latérale tant que le mode est actif. Le réglage est enregistré. `--offline` / `ROOFTOP_OFFLINE=1`
l'activent quels que soient les Paramètres, et les Paramètres ne peuvent pas le désactiver.

#### Ce que « local » signifie {#local-means}

`localhost`, la boucle locale (`127.0.0.0/8`, `::1`), les adresses de réseau privé (`10/8`, `172.16/12`, `192.168/16`, `fc00::/7`),
les adresses lien-local, et les noms `*.local` et `*.internal` (comme `host.docker.internal`). Un modèle sur un autre
ordinateur de votre réseau domestique compte comme local, car il ne quitte jamais votre réseau. Les noms sont jugés à leur écriture,
ils ne sont pas résolus.

### Ce que le mode hors ligne ne peut pas vérifier

* Les **serveurs MCP stdio** sont des programmes de votre ordinateur. iRoof.top les lance, mais ne voit pas à quoi ils se connectent,
  n'en ajoutez donc que de confiance pour rester en local.
* La **transcription vocale** utilise l'API de chat (une partie `input_audio`), pas l'API Whisper `/audio/transcriptions`.
  Elle demande un serveur et un modèle locaux qui acceptent l'audio à cet endroit. Si le vôtre ne le fait pas, le message vocal est tout de même enregistré
  et envoyé ; seul son texte manque.
* La **génération d'images et de voix** n'existe que sous forme d'[outils MCP](../features/mcp). Hors ligne, utilisez un serveur MCP local pour cela.
* Les personnes avec qui vous partagez ouvrent vos liens Wi‑Fi dans leurs propres navigateurs. Le mode hors ligne régit cette application, pas leurs appareils.

## Partager en toute sécurité avec vos amis {#share-with-friends-safely}

| Lien | Ce qui se passe |
|---|---|
| **Wi‑Fi** `http://<votre IP>:8737/s/<nom>` | ne quitte jamais votre réseau local |
| **Internet** `https://<nom>.iroof.top/s/<nom>` | l'application ouvre une seule connexion WebSocket sortante vers le hub, qui y fait transiter les requêtes HTTP du visiteur et les réponses de votre application |

Avec un lien Internet, votre export, vos chats et le modèle restent sur votre ordinateur, et le hub n'en stocke aucun.
Le hub ne conserve qu'un enregistrement de compte : votre nom, un hachage de votre secret et la date de votre dernière connexion.

Soyez clair sur ce que cela ne vous garantit *pas*. Le hub termine le TLS : comme tout proxy inverse, il voit techniquement le trafic
qui transite : ce que tape le visiteur, les réponses du personnage et l'historique que le lien permet aux visiteurs de lire
(**Les visiteurs peuvent lire l'export**, par défaut **rien**). Il ne relaie que les pages visiteur (`/s/…`,
`/api/s/…`, ressources de page) et supprime les cookies dans les deux sens ; votre interface propriétaire et vos paramètres ne sont jamais accessibles par son intermédiaire. Si c'est trop de confiance, utilisez des liens Wi‑Fi, ou [exploitez votre propre hub relais](../reference/relay-hub).
[Plus d'informations sur les liens de partage](../features/share-links).

Avec le **mode hors ligne**, le relais iroof.top est désactivé. Les liens Wi‑Fi continuent de fonctionner.

## Le bot Telegram {#the-telegram-bot}

[Répondre depuis Telegram](../features/telegram) publie dans votre groupe :

* les nouveaux **messages des visiteurs** (nom, nom du lien, texte, ou une étiquette de média avec sa description ou sa transcription, et un court
  aperçu du message auquel ils répondent), et les **réponses** de l'IA ;
* jamais l'historique exporté. Les anciens messages ne sont pas transmis.

Les bots n'ont pas de chiffrement de bout en bout : le texte transite en clair par Telegram. Avec le **bot partagé**, il transite aussi
par le hub, qui ne retient que quel groupe appartient à quel compte. Un **bot à vous** parle directement à
Telegram, sans le hub. Le mode hors ligne désactive les deux.

## Où vont vos données

| Données | Où elles vont |
|---|---|
| Exports, chats, paramètres, clé API | le dossier de données de votre ordinateur |
| Import et profil de style | nulle part |
| Historique, profil de style, vos messages | le point d'accès du modèle choisi, à chaque réponse |
| Photos et voix | le point d'accès du modèle média, sur **Décrire** ou quand vous enregistrez un message vocal |
| Messages de visiteurs via un lien Wi‑Fi | votre ordinateur et votre point d'accès de modèle |
| Messages de visiteurs via un lien Internet | le hub (en transit), votre ordinateur, votre point d'accès de modèle |
| Messages de visiteurs avec Telegram | en plus, Telegram, et le hub pour le bot partagé |
| Mode hors ligne | uniquement le point d'accès de modèle local, uniquement les liens Wi‑Fi, pas de Telegram |
