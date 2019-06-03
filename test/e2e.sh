#!/usr/bin/env bash

set -e # exit on errors

echo "Installing base dependencies"
npm ci

echo "Bootstrapping Luigi"
lerna bootstrap --ci

echo "Bundle core and client"
lerna run bundle

echo "Install deps for example"
cd core/examples/luigi-sample-angular
NG_CLI_VERSION=$(node -p "require('./package.json').devDependencies['@angular/cli']")
npm install -D cypress@3.3.0 concurrently lerna @angular/cli@$NG_CLI_VERSION
lerna bootstrap --ci

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
