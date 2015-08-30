#!/bin/bash -e

docker run \
  --rm \
  -v $(which docker):/usr/local/bin/docker \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd):/var/app \
  -e "BUILD_NUMBER=$BUILD_NUMBER" \
  -e "TARGET_ENV=$TARGET_ENV" \
  dockerregistry.seekinfra.com/rolerequirements/node-build-container /var/app/build.sh "$@"
