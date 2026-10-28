# Application de bureau

L'application de bureau ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) fait tourner le même serveur que `rooftop serve` sur un port
`127.0.0.1` aléatoire, et l'affiche dans une fenêtre native.

| Plateforme | Installation |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, ou le `.dmg` pour [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) ou [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 et 11 | [Installeur (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) ou [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (toute distribution), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) ou [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Les liens de téléchargement pointent toujours vers la version la plus récente.

::: warning Les versions ne sont pas encore signées
Sous macOS, ouvrez l'application une fois, puis **Réglages Système → Confidentialité et sécurité → Ouvrir quand même**. Sous Windows, choisissez
**Plus d'infos → Exécuter quand même** dans SmartScreen. Pas à pas, avec une animation : [Ouvrir une application non signée](./unsigned-apps).
:::

## Premier lancement

L'application ne lit ni votre shell ni votre `.env` ; elle vous accueille donc avec **Connecter un modèle** : ouvrez **Paramètres**, saisissez le
point d'accès, la clé et le modèle, puis appuyez sur **Tester**. Si `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` ou
`OPENAI_TEMPERATURE` sont définis, ils deviennent les valeurs initiales.

| | |
|---|---|
| Données | le dossier de données d'application du système, par ex. `~/Library/Application Support/top.iroof.desktop` sous macOS |
| Liens de partage | sur le même Wi‑Fi ou par Internet : [Ouvrir les liens sur d'autres appareils](../features/share-links#open-links-on-other-devices) |
| Autres sites | les liens comme `t.me` s'ouvrent dans votre navigateur |
| Fenêtre macOS | pas de barre de titre système : les en-têtes de l'application continuent sous les feux de signalisation et permettent de déplacer la fenêtre |
| Import | l'application lit elle-même l'export : **Choisir un dossier…** ouvre le sélecteur système, et un dossier, `.zip` ou `.txt` déposé est importé là où il se trouve. Rien n'est envoyé, l'original reste intact, et sur APFS les médias sont clonés plutôt que copiés, donc même un export de 13 Go ne prend presque pas de place supplémentaire |

## Compiler soi-même {#build-it-yourself}

Il vous faut Rust ≥ 1.95 et Node.js, et sous Linux les [prérequis Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # installeurs dans desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # seulement le binaire
```

Sous macOS, `npm run build` produit aussi le `.dmg`, et ignore le script AppleScript du Finder qui ne fait qu'arranger la fenêtre du DMG
(il échoue sans l'autorisation *Automatisation*). Définissez `ROOFTOP_DMG_FINDER=1` pour garder la mise en page du Finder, comme
dans les DMG publiés : le fond de `desktop/dmg/` avec une flèche de l'application vers *Applications*, et les fichiers cachés du volume
hors de vue. Après avoir modifié `desktop/dmg/background.svg`, lancez `desktop/dmg/make-background.sh`.
