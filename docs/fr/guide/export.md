# Exporter un chat

<div class="wide">

![Telegram Desktop : ouvrez le chat, cliquez sur ⋯ en haut à droite, choisissez Exporter l'historique du chat…, puis Exporter](/img/telegram-export.svg)

</div>

## Telegram

Dans **Telegram Desktop** (macOS, Windows, Linux) : ouvrez le chat → **⋯** → **Exporter l'historique du chat…** → **Exporter**.

* Gardez photos, vidéos, messages vocaux, stickers et GIF activés : le personnage les utilise.
* Les deux formats fonctionnent : **HTML** (`messages.html`) et **JSON** lisible par machine (`result.json`).
* Déposez le dossier d'export, ou un `.zip` de celui-ci, sur la page.

## WhatsApp

Sur le téléphone : ouvrez le chat → **⋮ → Plus → Exporter le chat** (iPhone : touchez le nom du contact → **Exporter le chat**) →
**Inclure les médias**. Envoyez le `.zip` à votre ordinateur et déposez-le sur la page.

Un chat exporté sans médias est un seul `.txt`, cela fonctionne aussi.

## Gros exports

Les exports de plus de 100 000 messages et de plusieurs gigaoctets fonctionnent de la même façon : déposez le dossier. La page indique ce qui se passe :

1. **Lecture du dossier…** compte les fichiers (le navigateur peut prendre un moment pour lister des dizaines de milliers de fichiers).
2. **Le chat passe en premier.** Les pages de messages (ou `result.json`, ou le `.txt` WhatsApp) sont envoyées et lues avant les médias. Si cet export est **déjà importé**, l'import s'arrête ici et l'ouvre, et aucun média n'est envoyé. Si les médias ne tiennent pas sur le disque, on vous indique l'espace nécessaire avant d'envoyer quoi que ce soit de volumineux.
3. **Envoi de 1,2 Go sur 3,4 Go (35 %) · 9 000 fichiers sur 30 905** : les médias suivent par petits lots, l'un après l'autre. Le navigateur ne construit jamais une seule requête géante, et un lot interrompu est réessayé seul. Il n'y a aucune limite de taille quand vous l'exécutez sur votre propre ordinateur.
4. **Lecture des messages : page 37 sur 121 · 36 000 messages** : toutes les pages sont lues une fois, en parallèle.
5. **Vérification des médias** et **Déplacement des médias** : les fichiers sont hachés pour repérer les doublons, puis déplacés (et non copiés deux fois) dans le dossier de données.
6. **Enregistrement**, puis la boîte de dialogue *Nouveau chat* s'ouvre.

Un seul import s'exécute à la fois ; une erreur reste visible dans la zone de dépôt et vous pouvez choisir à nouveau le dossier.

Dans l'[application de bureau](./desktop), cet envoi n'a pas lieu : l'application lit le dossier, le `.zip` ou le `.txt` là où ils se trouvent
(étapes 4 à 6), ce qui est plus rapide et n'est pas affecté par les problèmes de navigateur ci-dessous.

::: details Quand un fichier ne peut pas être envoyé (navigateur)
Un fichier que le navigateur ne peut plus lire (déplacé, modifié, ou un espace réservé iCloud/OneDrive non téléchargé) est repéré et ignoré, de même qu'un fichier unique qui fait toujours échouer son lot : le lot est découpé jusqu'à isoler ce fichier. Les médias ignorés apparaissent comme manquants dans le chat ; le message affiché après l'import en nomme un, et la console du navigateur les liste tous. Si le fichier de chat lui-même ne peut pas être envoyé, l'import s'arrête et le nomme. Les erreurs indiquent ce que le serveur a reçu, par exemple `le serveur a reçu 1 200 octets sur 4 096`, pour distinguer facilement un problème de connexion ou de navigateur.
:::

Pendant un import, rien ne quitte votre ordinateur et aucun modèle n'est appelé. Les médias ne sont décrits que lorsque vous appuyez sur **Décrire** dans la médiathèque.

Avec `rooftop --import <dossier>`, le dossier est lu sur place et ses fichiers sont copiés, jamais déplacés ; la progression est journalisée.
Pour un export énorme sur le même ordinateur, c'est le moyen le plus rapide : pas d'envoi, et pas de seconde copie dans un dossier temporaire.

## Ce qui est reconnu

| Source | Fichiers |
|---|---|
| Telegram HTML | `messages.html`, `messages2.html`, … |
| Telegram JSON | `result.json` (utilisé quand un dossier n'a pas de `messages.html`) |
| WhatsApp | `WhatsApp Chat with <nom>.txt` (Android) ou `_chat.txt` (iOS), dans un dossier, un `.zip` ou seul |

* **Telegram** : texte avec sauts de ligne, liens, citations et code ; réponses et citations partielles ; transferts ; modifications ; messages de service ;
  réactions ; aperçus de liens ; photo, vidéo, vidéo ronde, message vocal, audio, fichier, sticker (`.webp`, `.webm`,
  `.tgs`), GIF, position, contact, sondage et appel.
* **WhatsApp** : formats Android et iOS, horloges sur 12 et 24 heures et les deux ordres jour/mois, détectés par fichier.
  Les messages sur plusieurs lignes, les modifications et les pièces jointes sont conservés. Les messages supprimés et l'avis de chiffrement sont ignorés,
  et `<Media omitted>` est marqué comme indisponible.

Les fichiers médias sont hachés : un sticker envoyé cinq fois devient un seul élément de la médiathèque (`stk_…`, `gif_…`, `pho_…`).

::: info Réactions dans les exports HTML
Les exports HTML ne disent pas qui a réagi. Dans les chats à deux, une réaction est attribuée à l'autre participant, et aux deux lorsque le compte est de 2.
:::
