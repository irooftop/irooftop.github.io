# Liens de partage

**Partager** dans l'en-tête du chat crée des liens pour que d'autres personnes puissent parler au personnage, par exemple :

* un ami juge à quel point l'IA écrit **dans votre style** ;
* un ami parle à **une copie de lui-même**.

Un lien est `https://<votre hôte>/s/<nom>`. Les visiteurs ne voient que le chat : ni barre latérale, ni paramètres, ni notes, ni descriptions de médias,
ni prompt, ni utilisation de jetons, ni autres chats.

## Options

| Option | Par défaut | |
|---|---|---|
| Qui peut l'ouvrir | cet ordinateur | les interrupteurs **Wi‑Fi** et **Internet**, directement dans l'éditeur ([ci-dessous](#open-links-on-other-devices)) |
| Lien | aléatoire | choisissez un nom comme `alex` |
| Nom affiché | nom du personnage | les vrais noms de l'export ne sont pas affichés |
| PIN | aucun | 4 à 64 caractères, stocké sous forme de hachage Argon2id. ✨ génère 6 chiffres |
| Conversations | privées | **Privées** : une conversation par visiteur. **Salon partagé** : tout le monde dans une même conversation |
| Les visiteurs peuvent lire l'export | rien | rien, les *N* derniers messages, ou tout |
| Limites | 50 visiteurs, 200 réponses chacun | chaque réponse coûte des jetons sur votre clé. `0` = illimité |
| Les visiteurs peuvent faire écrire en premier | désactivé | affiche le bouton 💬 : le personnage envoie un message sans que le visiteur en écrive un |
| Les visiteurs peuvent réécrire une réponse | désactivé | affiche le bouton ↻ : la dernière réponse du personnage est réécrite. Les deux utilisent une réponse de la limite, et le serveur les refuse tant qu'ils sont désactivés |
| Expire / actif | jamais / oui | suspendre ou faire expirer un lien sans le supprimer |
| Groupe Telegram | désactivé | [répondre depuis Telegram](./telegram) |

Dans la boîte de dialogue Partager, vous pouvez **Lire** chaque conversation de visiteur, et **Terminer** une conversation pour la révoquer. Chaque visiteur affiche
l'adresse depuis laquelle il a écrit en dernier ; lorsque vous terminez une conversation, **Bloquer aussi** écarte cette adresse du lien
(la page d'accueil, les nouvelles conversations et celles déjà ouvertes) jusqu'à ce que vous la **débloquiez**. Sur un réseau partagé,
une adresse peut correspondre à plusieurs personnes. Les adresses sont stockées avec le lien, uniquement sur votre ordinateur.

## À qui le personnage parle

Un visiteur n'est pas vous. Quand Mia ouvre votre lien, le personnage sait que **Mia** écrit, que le lien
vient de vous, et que l'historique et vos notes concernent vous et eux, pas Mia : il la rencontre
comme quelqu'un de nouveau. Sans nom, elle n'est qu'une invitée.

| | Le personnage voit |
|---|---|
| Lien privé | une conversation avec le visiteur, sous le nom qu'il a donné (ou « Invité ») |
| Salon partagé | une discussion de groupe : chaque message porte le nom de son auteur, et les gens peuvent rejoindre à tout moment |
| Votre historique d'export | vos messages sous votre nom, puis ceux du visiteur, pour qu'ils ne se mélangent jamais |

Le prompt système est fixe pour chaque conversation, pour que les fournisseurs le gardent en cache : le nom du visiteur est fixé
au début de la conversation, et dans un salon les noms voyagent avec les messages. Un visiteur qui s'appelle comme le personnage ou comme vous
devient par exemple « Alex (invité) », et une deuxième « Ann » dans un salon devient « Ann 2 ».

## Invitations

| Lien | Ouvre |
|---|---|
| `/s/alex` | la page d'accueil |
| `/s/alex#pin=2468` | le chat tout de suite. Le PIN vient après `#`, il n'atteint donc jamais le serveur ni les journaux |
| `/s/alex#name=Greg&pin=2468` | la même chose, avec le nom du visiteur déjà rempli (`?name=Greg` fonctionne aussi) |

Le bouton **QR** d'un lien ouvre un code à scanner avec un téléphone, pour chaque adresse qui fonctionne. Juste après l'enregistrement,
**Copier l'invitation avec PIN** copie le lien avec le PIN.

## Ouvrir les liens sur d'autres appareils {#open-links-on-other-devices}

Sur un serveur, les liens utilisent simplement l'adresse du serveur. L'application de bureau (et `rooftop` sur `127.0.0.1`) ne tourne que sur
votre ordinateur, donc la boîte de dialogue Partager et l'éditeur de liens ont deux interrupteurs. Chacun indique s'il est **Actif**,
**Connexion en cours** ou **Ne fonctionne pas**, et l'éditeur affiche tout de suite l'adresse qu'aura le lien.

```
                    ┌──────────── votre ordinateur ─────────┐
 téléphone en Wi‑Fi ─▶│ :8737  pages visiteur uniquement      │
                    │                                       │
 n'importe qui ──▶ nom.iroof.top ══ une WebSocket sortante ══▶ app │
                    │                                       │
                    │ 127.0.0.1  interface propriétaire,    │
                    │            paramètres, API            │
                    └───────────────────────────────────────┘
```

| | Wi‑Fi et réseau local | Internet |
|---|---|---|
| Adresse | `http://<votre IP>:8737/s/<nom>` | `https://<nom>.iroof.top/s/<nom>` |
| Qui | les appareils du même réseau | n'importe qui, tant que l'application tourne |
| Comment | un second écouteur qui ne sert que les pages visiteur | une WebSocket sortante vers le relais ; rien n'écoute sur Internet |
| Vos données | restent sur votre ordinateur | restent sur votre ordinateur, mais les messages des visiteurs transitent par le relais |

* Le port Wi‑Fi reste le même d'un redémarrage à l'autre, donc les codes QR imprimés continuent de fonctionner. Sous macOS, autorisez les
  connexions entrantes si le pare-feu le demande.
* Le nom Internet, vous le choisissez et le modifiez (**Changer** à côté de l'adresse). Le relais ne transmet que
  `/s/…`, `/api/s/…` et les ressources de page, supprime les cookies dans les deux sens, et affiche une page « hors ligne » pendant que l'application est fermée.
* Vous voulez votre propre relais à la place d'iroof.top ? Voir [Hub relais](../reference/relay-hub).
* Le **mode hors ligne** désactive et verrouille l'interrupteur Internet ; le Wi‑Fi continue de fonctionner. Ce que le relais peut voir :
  [Hors ligne et confidentialité](../guide/offline#share-with-friends-safely).

## Protection

| Garde | Limite |
|---|---|
| Mauvais PIN depuis une IP | après 5 : verrouillé 1 min, puis 2, 4… jusqu'à 1 h |
| Mauvais PIN sur un lien, toutes IP | 20 en 15 min : verrouillé 5 min, doublé jusqu'à 24 h |
| Messages par visiteur | 30 par minute, 10 réponses par minute |
| Nouvelles conversations | 20 par heure et par IP |

Les compteurs sont en mémoire. Un PIN à 6 chiffres ne peut pas être deviné dans un délai raisonnable. Derrière un proxy inverse, définissez
`ROOFTOP_TRUST_PROXY=true`, pour que les compteurs voient les vraies IP des clients.

Les sessions visiteur utilisent un jeton aléatoire de 26 caractères dans `/s/<nom>/<jeton>`, mémorisé par le navigateur, et que
`Referrer-Policy: no-referrer` empêche de fuiter. Les visiteurs ne peuvent charger que les médias qu'ils ont le droit de voir.
