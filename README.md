## 📒 Sommaire

- [À propos](#🔰-à-propos)
- [Technologies](#🛠️-technologies)
- [Fonctionnalités](#✨-fonctionnalités)
- [Installation et fonctionnement](#⚙️-installation-et-fonctionnement)

## 🔰 À propos

Cette application est un TP de fin de module sur du développement React Native.

## 🛠️ Technologies

- **React Native** – Développement mobile multiplateforme
- **Expo** – Outils pour simplifier le développement et le déploiement

## ✨ Fonctionnalités

- **Changement de fond d'écran selon la batterie**

  - Bleu clair si la batterie > 50%
  - Saumon si la batterie ≤ 50%

- **Menu principal avec options**

  - **Chat** : affiche un chat et joue un son de chat
  - **Dog** : appelle une API pour afficher une image de chien et prépare un SMS avec le texte "Je n'aime pas les chats" pour le numéro 06 06 06 06 06
  - **Quit** : ferme l'application

- **Carte**

  - Affiche votre position
  - Affiche au minimum Toulon et Paris sans avoir besoin de dézoomer

- **Clicker**
  - Compte le nombre de clics sur **Chat** et **Dog**
  - Affiche les compteurs dans un menu dédié
  - Bouton pour réinitialiser les compteurs
  - Les compteurs sont sauvegardés entre les lancements de l'application

## ⚙️ Installation et fonctionnement

### Fichier APK

Prebuild de l'app : [télécharger le fichier .apk](https://expo.dev/accounts/lo_ouiiz/projects/app-finale-react-native/builds/283ef352-ff62-46b7-a9d8-28a63c4f807e)

Si le lien ne fonctionne pas, voir dans les releases du repo

### Installation via APK (sans compilation)

> ⚠️ **Important :** l'APK ici est un **(prébuild pour le développement)**, il permet de scanner un QR code généré par `expo start` pour charger le code en local.

1. Télécharger le fichier APK depuis le lien fourni ou depuis l’onglet **Releases** du repo depuis un appareil Android.
2. Ouvrir le fichier `.apk` sur l’appareil et autoriser l’installation depuis une source inconnue si nécessaire.
3. Lancer l’application installée.

### Démarrage en mode développement (connexion via QR)

1. Cloner le projet

```bash
git clone https://github.com/Lo-ouiiz/app-finale-react-native.git
cd app-finale-react-native
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Démarrer l'application**

```bash
npm start
```

Ou :

```bash
expo start --tunnel
```

4. **Tester l'application via le scan du QR code (depuis l’APK)**
