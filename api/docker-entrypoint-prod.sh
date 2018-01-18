#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z 10.0.0.45 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

# yarn run migrate

yarn run build-prod

# yarn run start-prod

pm2-runtime pm2.yml
