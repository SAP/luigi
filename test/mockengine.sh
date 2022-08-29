#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh


waitForWebServer() {
  PORT=$1

  while [`lsof -i :${PORT} | tail -n 1 | tr -s ' ' | cut -d ' ' -f 2` == ""]
  do
    sleep 5
  done

  npm run e2e:run
  killWebserver $PORT
}

echo ""
echo "INSTALL client-support-angular DEPS"
echo ""

ls

echo ""

cd $BASE_DIR/../client-frameworks-support/client-support-angular
npm install --force

echo ""
echo "INSTALL testing-utilities DEPS"
echo ""

ls

echo ""
cd $BASE_DIR/../client-frameworks-support/testing-utilities
npm install

echo ""
echo "INSTALL testing-utilities/test DEPS"
echo ""

ls

echo ""
cd $BASE_DIR/../client-frameworks-support/testing-utilities/test
npm install

rm -r node_modules

cd ..

npm run bundle

cd .. 

lerna bootstrap --ci --force-local

cd $BASE_DIR/../client-frameworks-support/testing-utilities/test
#Run acutal test
(set -e && waitForWebServer 8080) & (npm start)
