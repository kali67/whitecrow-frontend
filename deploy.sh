#!/usr/bin/env bash

set -eu

curl -n -X PATCH https://api.heroku.com/apps/$APP_NAME/formation \
  -d '{
  "updates": [
    {
      "type": "web",
      "docker_image": "'"$WEB_DOCKER_IMAGE_ID"'"
    }
  ]
}' \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
  -H "Authorization: Bearer $HEROKU_APP_KEY"