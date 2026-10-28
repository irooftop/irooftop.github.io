# Photos et voix

Certaines personnes envoient surtout des photos, d'autres parlent surtout en messages vocaux. iRoof.top conserve les deux habitudes.

## Les comprendre

Dans la médiathèque, **Décrire avec l'IA** décrit les stickers, GIF et photos et **transcrit les messages vocaux** avec le
*modèle média*, qui doit accepter les images et l'audio. Réglez-le dans les Paramètres ou avec `OPENAI_MEDIA_MODEL`, par exemple
`google/gemini-3.5-flash-lite` sur OpenRouter. Les descriptions ne sont produites que lorsque vous appuyez sur le bouton, et avec un modèle local et le
[mode hors ligne](../guide/offline), les photos ne quittent jamais votre ordinateur.

```text
<message vocal 0:05 : « ce qui a été dit »>
```

Quand un type domine, le profil de style le dit, par ex. « parle surtout par messages vocaux (10 sur 10) ».

### Grandes médiathèques

Un long chat peut contenir des dizaines de milliers de stickers, GIF et photos. La médiathèque vous aide à dépenser les jetons du modèle
là où ils comptent :

| Contrôle | Ce qu'il fait |
|---|---|
| Onglets de type | Tous, Manquants, Décrits, Stickers, GIF, Photos, Vidéos, Voix, avec le nombre |
| Tri | les plus utilisés (par défaut), les moins utilisés, utilisés récemment, premiers utilisés |
| Nombre d'utilisations | masque les éléments utilisés moins de 2, 3, 5, 10 ou 25 fois |
| Recherche | dans les descriptions et les identifiants |

**Décrire N avec l'IA** décrit exactement ce qui est affiché et pas encore décrit, **de haut en bas dans l'ordre choisi**,
quatre à la fois. Chaque description est enregistrée dès son arrivée. La ligne de progression indique combien sont faits, les échecs,
le débit et le temps restant. Le même bouton devient **Arrêter** : vous pouvez arrêter à tout moment, et le prochain lancement reprend
avec le reste. Un bon départ pour un gros chat : *Les plus utilisés d'abord* et *Utilisés 3 fois ou plus*.

## Vos messages vocaux

Avec le champ de saisie vide, le bouton d'envoi devient un **microphone**, comme dans Telegram. L'enregistrement est converti en WAV dans
le navigateur, envoyé et transcrit. Les visiteurs des liens de partage peuvent aussi enregistrer.

::: info
Les navigateurs n'autorisent l'enregistrement que sur `https://` ou `localhost`.
:::

## Les photos et la voix du personnage

Connectez un serveur MCP qui génère des images et un qui parle :

```json
{
  "img": {"command": "npx", "args": ["-y", "@dtst/img"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}", "OPENAI_MODEL": "meta/muse-image"}},
  "tts": {"command": "npx", "args": ["-y", "@dtst/tts"],
          "env": {"OPENAI_BASE_URL": "https://openrouter.ai/api/v1", "OPENAI_API_KEY": "${OPENAI_API_KEY}",
                  "OPENAI_MODEL": "google/gemini-3.8-flash-lite-tts", "OPENAI_VOICE": "Laomedeia"}}
}
```

Le personnage reçoit alors deux actions de plus :

| Action | Ce qu'elle fait |
|---|---|
| `send_voice {text}` | appelle l'outil vocal (WAV, réessayé en mp3) et envoie un message vocal |
| `send_photo {prompt, caption?}` | appelle l'outil d'images et envoie une photo |

* Avec un outil vocal connecté, les messages vocaux transcrits du personnage sont rejoués sous forme de `send_voice`, pour que le modèle voie
  l'habitude sous la forme qu'il peut continuer.
* **Voix** dans *Détails du chat* (par exemple `Puck`) donne au personnage sa propre voix.
* Toute autre image ou audio renvoyé par un outil MCP devient un média du chat `gen_…` (vérifié par contenu, jusqu'à 25 Mo, supprimé
  avec le chat).

::: tip Coûts
Chaque photo ou message vocal est un appel payant supplémentaire : environ 0,01 $ par image avec `meta/muse-image`, et quelques secondes de synthèse vocale.
:::
