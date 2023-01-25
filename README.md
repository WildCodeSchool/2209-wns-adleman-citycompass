# Getting started

[Install Docker](https://www.docker.com/products/docker-desktop/) and then :

```sh
Pour le docker de dev = docker compose -f docker-compose.yml up --build
Pour le docker de test = docker compose -f docker-compose.integration-tests.yml up --build
```

Pour pouvoir lancer les tests hors Docker -> lancer la commande du docker compose de dev, se mettre dans le dossier "integration-tests", installer les dépendances et lancer la commande "npm run test" ou "pnpm run test"

That's all folks !
