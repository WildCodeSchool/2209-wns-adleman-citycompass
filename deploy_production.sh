#!/bin/sh
git fetch origin && git reset --hard origin/main && git clean -f -d && \
docker compose -f docker-compose.production.yml down && \
    docker compose -f docker-compose.production.yml pull && \
    GATEWAY_PORT=8000 docker compose -f docker-compose.production.yml --env-file .env.production up -d;