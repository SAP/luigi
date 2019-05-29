#!/usr/bin/env bash

set -e # exit on errors

echo "Installing base dependencies"
npm ci

echo "Bootstrapping Luigi"
lerna bootstrap --ci

echo "Bundle"
lerna run bundle

cd core/examples/luigi-sample-angular

echo "Install deps for example"
lerna bootstrap --ci
npm install -D cypress concurrently

echo "Starting webserver"
npm run start &
WS_PID=$!

# wait until example is built and running
sleep 60

echo "Running tests"
npm run e2e:run
RV=$?
kill $WS_PID
exit $RV
