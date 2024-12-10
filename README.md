# EBIOS Risk Helper

Application web pour faciliter l'analyse des risques selon la méthode EBIOS RM (Risk Manager).

## 📋 Description

EBIOS Risk Helper est un outil qui simplifie la réalisation d'analyses de risques selon la méthode EBIOS RM. Il guide l'utilisateur à travers les différentes étapes de la méthode et génère automatiquement des rapports détaillés.

## 🚀 Démarrage rapide

### Prérequis

- Node.js (v18 ou supérieur)
- npm (v9 ou supérieur)
- Un projet Firebase

### Installation

1. Clonez le dépôt
bash
git clone https://github.com/votre-username/ebios_risk_helper.git
cd ebios_risk_helper

Installer les dépendances
npm install

2.Configurer l'environnement
cp .env.example .env
Remplir les variables Firebase dans .env

Lancer en développement
npm run dev

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite
- **Backend**: Firebase (Firestore, Auth)
- **Tests**: Vitest, Testing Library
- **Linting**: ESLint, Prettier

## 🎯 Fonctionnalités

- ✨ Interface utilisateur intuitive
- 📝 Gestion des parties prenantes
- 🎯 Évaluation des risques
- 📊 Visualisation des données
- 📄 Génération de rapports PDF
- 🌓 Thème clair/sombre
- 💾 Sauvegarde automatique

## 📁 Structure du projet

src/
├── components/     # Composants React réutilisables
├── context/       # Contextes React (thème, auth...)
├── hooks/         # Hooks personnalisés
├── services/      # Services (Firebase...)
├── types/         # Types TypeScript
└── utils/         # Fonctions utilitaires

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée la version de production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run test` - Lance les tests
- `npm run format` - Formate le code avec Prettier

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout de fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- ANSSI pour la méthode EBIOS Risk Manager
- La communauté open source
```

