# Ouvrir une application non signée

Les installeurs de bureau ne sont pas encore signés ni notariés : le premier lancement affiche donc un avertissement sous macOS et Windows.
C'est une étape unique : une fois l'application autorisée, elle s'ouvre normalement, y compris après les mises à jour installées de la même façon.

::: tip Vous préférez éviter ?
[Compilez l'application vous-même](./desktop#build-it-yourself), ou lancez le [serveur](./getting-started#install) et utilisez-le dans
votre navigateur : `brew install irooftop/tap/rooftop`, `cargo install rooftop` ou [Docker](./docker).
:::

## macOS

![Ouvrir une application non vérifiée sous macOS : l'avertissement « Non ouvert », OK, Réglages Système, Confidentialité et sécurité, Ouvrir quand même, le mot de passe, et l'application s'ouvre](/how-to-open-an-unsigned-app-on-macos.svg)

Sous macOS 15 Sequoia et ultérieur :

1. Ouvrez **iRoof.top**. macOS affiche « « iRoof.top » non ouvert : Apple n'a pas pu vérifier… ». Cliquez sur **OK**.
2. Ouvrez le **menu Pomme → Réglages Système… → Confidentialité et sécurité**.
3. Descendez jusqu'à **Sécurité** : « « iRoof.top » a été bloqué pour protéger votre Mac ». Cliquez sur **Ouvrir quand même**.
4. Confirmez avec **Ouvrir quand même**, et saisissez votre mot de passe ou utilisez Touch ID.

Le bouton **Ouvrir quand même** n'apparaît qu'après une tentative d'ouverture de l'application, pendant environ une heure. S'il n'est pas là,
rouvrez l'application puis revenez à Confidentialité et sécurité.

Sous macOS 14 Sonoma et antérieur, faites un clic droit (ou Control-clic) sur l'application dans le Finder, choisissez **Ouvrir**, puis **Ouvrir** à nouveau.

### Depuis le Terminal

Retirer l'attribut de quarantaine que le navigateur a mis sur le téléchargement fonctionne aussi :

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Cela ne marche pas toujours : sur les macOS récents, le Terminal peut avoir besoin de **Gestion des apps** (ou **Accès complet au disque**) dans
Confidentialité et sécurité pour modifier les apps de `/Applications`, et l'opération échoue avec `Operation not permitted` sans cela. Les étapes ci-dessus fonctionnent toujours.

::: details « iRoof.top est endommagé et ne peut pas être ouvert »
Ce message signifie aussi l'attribut de quarantaine, et non un téléchargement cassé. Cliquez sur **Annuler** (et non sur **Placer dans la corbeille**) et lancez
la commande `xattr` ci-dessus, ou suivez les étapes des Réglages Système.
:::

## Windows

SmartScreen affiche **Windows a protégé votre PC** pour l'installeur :

1. Cliquez sur **Plus d'infos**.
2. Cliquez sur **Exécuter quand même**.

Si le navigateur retient le téléchargement (*n'est pas couramment téléchargé*), ouvrez la liste des téléchargements, choisissez **⋯ → Conserver**,
puis **Afficher plus → Conserver quand même**. Pour le `.msi`, vous pouvez aussi faire un clic droit → **Propriétés** → cocher **Débloquer** →
**OK** avant de l'exécuter.

Sous Windows 11 avec **Contrôle intelligent des applications** activé, les applications non signées sont bloquées sans bouton **Exécuter quand même**. Utilisez le
[serveur](./getting-started#install) à la place, ou désactivez le Contrôle intelligent des applications dans **Sécurité Windows → Contrôle des applications
et du navigateur → Paramètres du Contrôle intelligent des applications**.

## Linux

Linux ne bloque pas les applications non signées, mais un AppImage a besoin de l'autorisation de s'exécuter :

```sh
chmod +x iRoof.top_amd64.AppImage    # ou : Propriétés → Permissions → Autoriser l'exécution du fichier comme programme
./iRoof.top_amd64.AppImage
```

S'il signale un problème avec FUSE (`dlopen(): error loading libfuse.so.2`), installez `libfuse2` (Ubuntu 24.04 :
`sudo apt install libfuse2t64`) ou lancez-le avec `--appimage-extract-and-run`.

Les paquets s'installent avec le gestionnaire de paquets, qui accepte les paquets locaux non signés :

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
