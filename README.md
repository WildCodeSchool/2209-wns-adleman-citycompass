# Getting started

- [Install Docker](https://www.docker.com/products/docker-desktop/)
- [Install expo and expo GO](https://expo.dev/tools)

## Run the project

### development environment (3 dockers containers)

```sh
npm run start
```

### test environment (3 others containers, including another DB)

1. create and configure .env
2. Run

```sh
npm run integration-test
```

### run tests locally (alternative to docker)

1. create and configure .env
2. in your terminal, in integration-tests file, run:

```sh
npm run start
npm i
npm run test
```

### React Native App using Expo

1. create and configure .env
2. in your terminal, in mobile-client file

```sh
docker compose -f docker-compose.yml up --build
npx expo start
```

## Work on project

### CodeGen

This is a GraphQL app using codeGen.
To run CodeGen and generate schemas automatically on client, run :

```sh
npm run codegen
```

- [CodeGen-doc](https://the-guild.dev/graphql/codegen/docs/getting-started)

### Database :

To insert data into city's table, category's table and place's table :

```sh
cd server
npm run generalSeed
```

Warning : this command clean all tables !!

COMMENTAIRE POUR LE PACKAGE.JSON GLOBAL :
Changer le nom d'username dans les script par scrip (essai local pour le moment).
