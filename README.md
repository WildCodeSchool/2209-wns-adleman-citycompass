# Getting started

- [Install Docker](https://www.docker.com/products/docker-desktop/)
- [Install expo and expo GO](https://expo.dev/tools)

## Run the project

### development environment (3 containers)

```sh
docker compose -f docker-compose.yml up --build
```

### test environment (3 others containers, including another DB)

1. create and configure .env
2. Run

```sh
docker compose -f docker-compose.integration-tests.yml up --build
```

### run tests locally (alternative to docker)

1. create and configure .env
2. in your terminal, in integration-tests file, run:

```sh
docker compose -f docker-compose.yml up --build
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
