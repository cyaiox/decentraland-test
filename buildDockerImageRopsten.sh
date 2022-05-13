#!/bin/bash

docker build . \
    --no-cache \
    --pull \
    --build-arg REACT_APP_TOKEN_ADDRESS=0xA8a16e22ec7cEF817512f2F7AC08913177BA7e08 \
    -f docker/prod/Dockerfile \
    -t decentraland/webapp:ropsten