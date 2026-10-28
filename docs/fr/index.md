---
layout: home

hero:
  name: iRoof.top
  text: Parlez avec les personnes qui vous manquent
  tagline: Exportez une conversation Telegram ou WhatsApp, et un LLM la poursuit dans le style d'une personne, avec ses bulles, ses autocollants, ses GIF, ses réactions et sa voix. Sur votre ordinateur, avec le modèle de votre choix, hors ligne si vous le souhaitez.
  actions:
    - theme: brand
      text: Premiers pas
      link: /guide/getting-started
    - theme: alt
      text: Télécharger l'application
      link: /guide/desktop
    - theme: alt
      text: Fonctionnement
      link: /features/how-it-works

features:
  - title: Son style, pas seulement ses mots
    details: Un profil de style tiré de tout l'export, et chaque bulle, autocollant, GIF, réponse et réaction est rejoué au modèle sous forme d'appel d'outil.
    link: /features/how-it-works
    linkText: Fonctionnement
  - title: Privé, et hors ligne si vous voulez
    details: Les conversations restent dans votre dossier de données. Avec un modèle local et le mode hors ligne activé, l'application refuse chaque requête qui quitterait votre ordinateur.
    link: /guide/offline
    linkText: Hors ligne et confidentialité
  - title: Des années de conversation, des gigaoctets de médias
    details: Plus de 120 000 messages et 30 000 fichiers s'importent avec une progression en direct. Une réimportation est repérée à partir des messages, avant tout envoi de médias.
    link: /guide/export#large-exports
    linkText: Gros exports
  - title: Photos, autocollants et voix
    details: Une bibliothèque de médias qui décrit ce qui a été envoyé et transcrit les messages vocaux, dans l'ordre que vous choisissez, et que vous pouvez arrêter à tout moment.
    link: /features/media
    linkText: Photos et voix
  - title: Liens de partage
    details: Laissez un ami parler au personnage sur /s/nom, avec un PIN et des limites, sur votre Wi‑Fi ou sur nom.iroof.top.
    link: /features/share-links
    linkText: Liens de partage
  - title: Répondre depuis Telegram
    details: Les messages des visiteurs arrivent dans votre groupe Telegram. Répondez vous-même, ou laissez l'IA répondre après un compte à rebours.
    link: /features/telegram
    linkText: Telegram
  - title: Tout modèle, tout serveur MCP
    details: OpenAI, OpenRouter, Gemini, Ollama, LM Studio, llama.cpp… et des outils MCP via Streamable HTTP ou stdio.
    link: /features/mcp
    linkText: Outils MCP
  - title: Rien de caché
    details: Le JSON exact envoyé au modèle est à un clic, avec sa taille, le budget d'historique et les jetons utilisés.
    link: /guide/getting-started#what-s-in-the-window
    linkText: Ce qu'il y a dans la fenêtre
  - title: Un petit binaire
    details: Un serveur Rust avec l'interface web intégrée, des applications de bureau pour macOS, Windows et Linux, Homebrew et une image Docker.
    link: /guide/getting-started
    linkText: Installer
---

<div class="home-demo">

![Une conversation se poursuit dans le style d'une vraie personne, puis un ami ouvre le lien partagé sur son téléphone](/img/demo.svg)

</div>

## Démarrer en une minute

::: code-group

```sh [Application de bureau]
brew install --cask irooftop/tap/irooftop   # macOS
# Windows and Linux: direct downloads under "Download the app" above
# Open the app, then Settings → model and key → Test
```

```sh [Homebrew]
brew install irooftop/tap/rooftop
export OPENAI_API_KEY=…    # OpenRouter by default, any OpenAI-compatible API works
rooftop                    # http://127.0.0.1:8080, then drop an export onto the page
```

```sh [Docker]
docker run -d -p 8080:8080 -e OPENAI_API_KEY=… \
  -v rooftop-data:/data ghcr.io/irooftop/rooftop
```

```sh [Cargo]
cargo install rooftop      # Rust ≥ 1.88
OPENAI_API_KEY=… rooftop
```

```sh [Entièrement hors ligne]
ollama pull qwen3          # any local model with tool calling
OPENAI_BASE_URL=http://localhost:11434/v1 OPENAI_MODEL=qwen3 rooftop --offline
```

:::

Ensuite, trois étapes : **[exportez une conversation](/fr/guide/export)** depuis Telegram Desktop ou WhatsApp, **déposez** le dossier, le `.zip` ou le `.txt` sur la page, puis appuyez sur **New chat** pour choisir qui joue l'IA : l'autre personne, ou vous-même.
Pas de conversation sous la main ? Essayez les fictives : `rooftop --import ./examples/telegram`.
(Les libellés de l'application sont en anglais, comme l'application elle-même.)

## Fonctionnement

<div class="wide">

![Un export Telegram ou WhatsApp entre dans iRoof.top, un LLM écrit les réponses et la conversation continue](/how-it-works.svg)

</div>

L'export est lu une seule fois, sur votre ordinateur. À chaque réponse, le modèle reçoit une invite système avec le profil de style, vos notes et les descriptions des médias, puis la partie la plus récente de la conversation qui tient dans le [budget d'historique](/fr/reference/configuration#settings-only). Les parties anciennes sont résumées en une courte mémoire, que le personnage peut toujours consulter. Le modèle répond par des appels d'outils (`send_message`, `send_sticker`, `react`…), qui deviennent des bulles, des autocollants et des réactions. [Plus →](/fr/features/how-it-works)

## Où va votre conversation

| | Réseau |
|---|---|
| Importation, profil de style, recherche, stockage | aucun : tout se passe sur votre ordinateur |
| Une réponse, un résumé de mémoire | le point d'accès du modèle de votre choix, rien d'autre |
| Décrire les médias, transcrire la voix | le modèle de médias, uniquement quand vous appuyez sur **Describe** |
| Liens de partage sur Internet, Telegram | seulement si vous les activez ; le [mode hors ligne](/fr/guide/offline) les coupe |

## Questions

::: details Quel modèle utiliser ?
Tout modèle de conversation avec **appels d'outils**, derrière un point d'accès `/chat/completions` compatible OpenAI. Les modèles plus grands imitent mieux un style. Pour **Describe** dans la bibliothèque de médias, le modèle de médias doit aussi accepter les images (et l'audio pour les messages vocaux). **Test** dans les réglages indique en termes simples ce qui ne va pas, par exemple une clé refusée ou un modèle inconnu.
:::

::: details Combien ça coûte ?
Rien avec un modèle local. Avec un modèle en ligne, vous payez votre fournisseur au jeton : une réponse coûte à peu près un budget d'historique en entrée (120 000 caractères ≈ 34 000 jetons par défaut ; l'invite est conçue pour être mise en cache, donc les fournisseurs qui gèrent le cache facturent la plus grande partie au tarif mis en cache) plus quelques courts appels d'outils. Réduisez le budget dans les réglages pour payer moins par réponse.
:::

::: details Mon export doit-il être petit ?
Non. Les exports de plus de 120 000 messages et 13 Go de médias s'importent sans problème, depuis le navigateur ou avec `rooftop --import <dossier>`. La recherche et le budget d'historique gardent l'invite de chaque réponse de la même taille, quelle que soit la longueur de la conversation.
:::

::: details Un ami peut-il parler au personnage ?
Oui, avec un [lien de partage](/fr/features/share-links) : sur votre Wi‑Fi, ou sur Internet à l'adresse `nom.iroof.top`, avec un PIN et des limites de messages. Les visiteurs ne voient que la conversation : ni réglages, ni notes, ni invites, ni autres conversations.
:::

::: tip Une note sur la bienveillance
Ceci sert à rester proche de personnes qui sont loin. Le personnage reste dans son rôle, mais il répond honnêtement si vous demandez sincèrement s'il s'agit d'une IA, et il répond avec attention si vous semblez en détresse.
:::
