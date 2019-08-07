#!/usr/bin/env bash

set -e # exit on errors

echo "Installing base dependencies"
npm ci

echo "Bootstrapping Luigi"
lerna bootstrap --ci --ignore "*luigi-sample-vue"

echo "Bundle core and client"
lerna run bundle --ignore "*luigi-sample-vue"

echo "Install deps for example"
cd core/examples/luigi-sample-angular
NG_CLI_VERSION=$(node -p "require('./package.json').devDependencies['@angular/cli']")
npm install -D cypress concurrently lerna @angular/cli@$NG_CLI_VERSION
lerna bootstrap --ci --ignore "*luigi-sample-vue"

echo "Starting webserver"
npm run start &
WS_PID=$!

# wait until example is built and running
sleep 60

echo "Running tests"
if [ -z "$TRAVIS_BUILD_ID" ]; then
  echo "Not running in travis. TRAVIS_BUILD_ID is not set."
fi

npm run e2e:run -- --record --key "$CYPRESS_KEY_LUIGI" --parallel --group 2x-chrome --ci-build-id "$TRAVIS_BUILD_ID"
RV=$?
kill $WS_PID
exit $RV
