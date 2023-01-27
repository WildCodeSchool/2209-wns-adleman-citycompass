# Getting started

- [Install Docker](https://www.docker.com/products/docker-desktop/)
- [Install expo and expo GO](https://expo.dev/tools)

## Run the project

### development environment (3 containers)

```sh
docker compose -f docker-compose.yml up --build
```

### test environment (3 others containers, including another DB)

```sh
docker compose -f docker-compose.integration-tests.yml up --build
```

### run tests locally (alternative to docker)

Into integration-tests file :

```sh
docker compose -f docker-compose.yml up --build
npm i
npm run test
```

### React Native App using Expo

Into mobile-client file

```sh
docker compose -f docker-compose.yml up --build
npx expo start
```
