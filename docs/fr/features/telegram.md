# Répondre depuis Telegram

Un lien de partage peut publier les messages de ses visiteurs dans un groupe Telegram. Vous y répondez vous-même, ou l'IA répond quand
un compte à rebours se termine. Les visiteurs voient le même « en train d'écrire… » dans les deux cas et ne peuvent pas savoir qui a répondu : un jeu « humain ou IA ? », ou un
service d'assistance où l'IA traite les questions évidentes.

```
 visiteur ──▶ lien de partage ──▶ 🤖 bot ──▶ votre groupe Telegram
                                        ├─ ✍️ Répondre        vous répondez
                                        └─ 🤖 Réponse IA (10 s) l'IA répond maintenant, ou à la fin du compte à rebours
```

## Configuration

**Paramètres → Telegram** affiche le bot, s'il est connecté, et chaque groupe dans lequel il se trouve.

| Mode | Configuration | Les messages passent par |
|---|---|---|
| **Bot partagé** | aucune | le relais (iroof.top), en texte clair comme n'importe quel bot |
| **Bot à vous** | créez-en un avec [@BotFather](https://t.me/BotFather), collez le jeton, **Connecter** | directement entre votre application et Telegram |
| `TELEGRAM_BOT_TOKEN` | sur un serveur ; `TELEGRAM_CHAT_ID` limite les groupes | directement ; prime sur les Paramètres |

Appuyez ensuite sur **Ajouter à un groupe** :

1. Ouvrez le lien dans l'**application Telegram**, dans **Telegram Web**, ou scannez le code QR avec votre téléphone. Les deux liens peuvent être copiés.
2. Choisissez un groupe (ou créez-en un) et confirmez.
3. La boîte de dialogue devient verte, et le groupe apparaît dans les Paramètres et dans chaque lien de partage.

Avec le bot partagé, le lien porte un code à usage unique, valable une heure, qui n'associe le groupe qu'à votre application.

Enfin, choisissez le groupe sous **Groupe Telegram** dans un lien de partage, et réglez au bout de combien de secondes l'IA répond
(`0` = seulement quand vous appuyez sur **Réponse IA**).

::: tip Confidentialité
Seuls les nouveaux messages des visiteurs et les réponses de l'IA sont publiés dans le groupe, jamais l'historique exporté. Le mode hors ligne désactive le
bot. Détails : [Hors ligne et confidentialité](../guide/offline#the-telegram-bot).
:::

::: tip Aucune adresse publique nécessaire
Les deux types de bot utilisent le long polling, cela fonctionne donc depuis un ordinateur portable. Un jeton de bot ne fonctionne que dans une application à la fois.
:::

## Trois façons de répondre

1. Répondez à l'invite « ✍️ … répondre à ce message » du bot.
2. Répondez au message du visiteur (ou à une réponse de l'IA) à tout moment, sans appuyer sur **Répondre**.
3. Appuyez sur **Répondre**, puis écrivez. Pendant 15 minutes, vos messages vont à ce visiteur, et 2 minutes de plus après chaque
   réponse, donc une réponse peut s'étendre sur plusieurs messages.

La troisième façon exige que le bot voie les messages ordinaires du groupe : désactivez le mode confidentialité (@BotFather → `/setprivacy` → Disable, puis
rajoutez le bot) ou faites-en un administrateur. Les façons 1 et 2 fonctionnent toujours.

::: warning Utilisez un groupe de confiance
N'importe qui dans le groupe peut répondre. Seules les réponses textuelles sont relayées, et les réponses de l'IA comptent dans la limite du lien.
:::
