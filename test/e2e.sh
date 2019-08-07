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

# # wait until example is built and running
# sleep 60
WAITCOUNT=0
until $(curl --output /dev/null --silent --head --fail http://localhost:4200); do
  printf '.'
  sleep 5
  WAITCOUNT=$(($WAITCOUNT + 5))
done
echo "Webserver was ready after $WAITCOUNT seconds."

echo "Running tests"
npm run e2e:run -- --record --key "$CYPRESS_KEY_LUIGI" --parallel --group 2x-chrome 
RV=$?
kill $WS_PID
exit $RV
