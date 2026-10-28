# Comment ça marche

<div class="wide">

![Comment fonctionne iRoof.top](/how-it-works.svg)

</div>

Chaque export devient les mêmes messages normalisés. Ensuite, chaque action du personnage est rejouée au modèle comme un
**appel d'outil**, pour qu'il apprenne *comment* la personne interagit, pas seulement ce qu'elle écrit, et qu'il réponde de la même façon.

## Les actions comme appels d'outils

| Ce que le personnage a fait | Appel d'outil dans l'historique et dans les réponses en direct |
|---|---|
| bulle de texte, éventuellement une réponse ou une citation partielle | `send_message {text, reply_to?, quote?}` |
| sticker | `send_sticker {sticker_id, reply_to?}` |
| GIF de la médiathèque, ou une URL d'un outil MCP | `send_gif {gif_id \| url, caption?}` |
| photo, vidéo, voix, audio, fichier | `send_media {media_id, caption?}` |
| publication transférée | `forward_message {message_id}` |
| réaction | `react {message_id, emoji}` |
| *(rappeler un historique ancien)* | `search_history {query}` |

Plusieurs appels dans un même tour deviennent plusieurs bulles. Les messages de l'autre côté deviennent des lignes compactes auxquelles les identifiants renvoient :

```text
#52108 19:08 ↩ réponse à #52107 (vous : « lasagnes de mamie 🍝 ») : Vous n'avez jamais fait de lasagnes, pas une seule fois.
<sticker stk_156dbb381a>: un chat avec un toque de cuisinier, qui remue une casserole
a réagi 😂 à #52107 (« lasagnes de mamie 🍝 »)
```

## Le prompt système

| Partie | |
|---|---|
| Qui incarner | estimer les connaissances et le style du personnage, sans jamais en savoir plus qu'il n'en saurait |
| Profil de style | à partir de l'export *entier* : longueur des messages, majuscules, ponctuation, usage des emoji et stickers, habitudes de réponse et de réaction, bulles par tour, exemples mot pour mot |
| Médiathèque | stickers, GIF et médias avec la façon dont ils ont été utilisés |
| Notes | ce que vous avez écrit sur la personne |

Le prompt est **statique** pour un chat : pas d'horloge, pas de compteurs. Le modèle lit l'heure dans les séparateurs `— jour —`
et les horodatages `HH:MM`, et chaque requête est un préfixe identique octet pour octet de la suivante, donc les caches de prompts des fournisseurs continuent de fonctionner.

## Les longs chats {#long-chats}

```
 budget d'historique ──────────────────────────────────────────▶
 ┌──────────────────────┬────────────────────────────────────────┐
 │ mémoire (≤ 350 mots) │ tours récents, coupés à 60 % du budget │
 └──────────────────────┴────────────────────────────────────────┘
   relation, faits,       le point de coupure reste fixe pendant
   sujets, blagues        longtemps, donc le préfixe en cache aussi
```

Quand l'historique rejoué dépasse le budget, la réponse suivante commence par résumer les tours les plus anciens (et la mémoire précédente)
en un court résumé. Rien n'est dépensé à l'import ni à l'ouverture d'un chat. Le profil de style vient toujours de tout
l'export, et `search_history` atteint chaque ancien message. L'`usage` des jetons (prompt, mis en cache, complétion) est affiché dans `{ }`.

## Médiathèque

Le modèle de chat lit du texte : un sticker n'est donc que `<sticker stk_…>` tant qu'il n'est pas décrit. **Décrire avec l'IA** envoie
les images des éléments manquants au modèle média, qui doit prendre en charge la vision.

* Les GIF, les stickers vidéo et les vidéos sont envoyés en **4 images dans l'ordre**, pour que le modèle voie le mouvement. Cela nécessite
  [ffmpeg](https://ffmpeg.org) (`brew install ffmpeg`, `apt install ffmpeg`, `winget install ffmpeg`), sinon la miniature est utilisée.
* **Refaire** décrit de nouveau un élément. Toute description peut être modifiée à la main.
* Les descriptions appartiennent à l'export et servent à tous ses chats.

Essayez vous-même avec la [CLI](../reference/cli) : `rooftop convert <export> --persona "Jonas Weber"`.
