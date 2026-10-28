# Premiers pas

## Installation {#install}

| | Commande |
|---|---|
| **Application de bureau**, macOS | `brew install --cask irooftop/tap/irooftop` |
| **Application de bureau**, Windows | [Installeur (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) ou [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| **Application de bureau**, Linux | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) ou [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) |
| **Serveur**, macOS et Linux | `brew install irooftop/tap/rooftop` (puis `brew services start rooftop`) |
| **Serveur**, partout avec Rust ≥ 1.88 | `cargo install rooftop` |
| **Serveur**, conteneur | `docker pull ghcr.io/irooftop/rooftop` ([Docker](./docker)) |

L'application de bureau n'a pas besoin de terminal : voir [Application de bureau](./desktop).

## Lancer

```sh
export OPENAI_BASE_URL=https://openrouter.ai/api/v1   # la valeur par défaut ; toute API compatible OpenAI convient
export OPENAI_API_KEY=…
export OPENAI_MODEL=openai/gpt-6-luna                 # doit prendre en charge l'appel d'outils
rooftop                                               # http://127.0.0.1:8080
```

Les variables peuvent aussi figurer dans un fichier `.env` placé là où vous lancez `rooftop`, ou être définies plus tard dans **Paramètres**.
**Tester** dans les Paramètres envoie une petite requête et vous explique en clair ce qui ne va pas, par exemple
« openrouter.ai a refusé la clé API (401) ».

Vous ne voulez rien faire sortir de votre ordinateur ? Utilisez un modèle local et le [mode hors ligne](./offline).

## Votre premier chat

```
 ┌──────────────┐     ┌────────────────────┐     ┌──────────────────────┐
 │ 1. Exporter  │ ──▶ │ 2. Le déposer sur  │ ──▶ │ 3. Nouveau chat :    │
 │ le chat      │     │    la page         │     │ qui joue l'IA        │
 └──────────────┘     └────────────────────┘     └──────────────────────┘
```

1. [Exportez un chat](./export) depuis Telegram Desktop ou WhatsApp.
2. Déposez le dossier, le `.zip` ou le `.txt` WhatsApp sur la page (ou lancez `rooftop --import <dossier>`).
3. Appuyez sur **Nouveau chat** et choisissez le personnage : l'autre personne, ou vous-même (« discuter avec moi-même dans mon style »).

::: tip Essayez sans vos propres chats
Le dépôt contient deux exports fictifs dans [`examples/`](https://github.com/irooftop/rooftop/tree/main/examples) :
Jonas et Priya cuisinent des lasagnes sur Telegram, Sofia et Daniel passent un week-end sur WhatsApp.

```sh
git clone https://github.com/irooftop/rooftop && cd rooftop
rooftop --import ./examples/telegram
```
:::

### Pas d'export ? Partez de notes

**Nouveau chat → À partir de notes** n'a besoin que de son prénom (le vôtre est facultatif) et de quelques lignes sur cette personne : qui elle est,
ce que vous partagez, sa façon d'écrire (« m'appelle tesoro, messages courts en italien, beaucoup de ❤️ »). L'IA écrit comme elle
à partir de ces notes seules. Sans historique, il n'y a ni profil de style ni médiathèque, donc plus les notes décrivent sa façon d'écrire,
plus cela lui ressemble. Vous pouvez modifier les notes dans le chat à tout moment (✎) et partager le chat par lien comme les autres. Supprimer le chat supprime tout ce qu'il contenait.

## Ce qu'il y a dans la fenêtre

| Bouton | Ce qu'il fait |
|---|---|
| **Partager** | [Liens](../features/share-links) pour que des amis parlent au personnage |
| **Médiathèque** | Chaque sticker, GIF, photo et message vocal avec ce que l'IA en sait |
| **Notes** | Ce que l'export ne dit pas sur la personne. Le personnage les lit, jamais les visiteurs |
| **`{ }`** | Le JSON exact envoyé au modèle, et les jetons utilisés |
| **Réécrire** | Supprime la dernière réponse du personnage et la réécrit |
| **Laisser écrire en premier** | Le personnage lance la conversation |
