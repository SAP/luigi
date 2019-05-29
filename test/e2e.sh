#!/bin/bash

echo "Installing base dependencies"
npm ci

echo "Bootstrapping Luigi"
lerna bootstrap --ci

echo "Bundle"
lerna run bundle

cd core/examples/luigi-sample-angular

echo "Install extra deps"
npm install -D cypress

echo "Starting webserver"
npm run start &
WS_PID=$!
sleep 60

echo "Running tests"
npm run e2e:run
RV=$?
kill $WS_PID
exit $RV
