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
  exit $?
}

echo ""
echo "INSTALL client-support-angular DEPS"
echo ""

# cd $BASE_DIR/../client-frameworks-support/client-support-angular
# npm install --force
# echo ""
# ls
# echo ""

# echo ""
# echo "INSTALL testing-utilities DEPS"
# echo ""

cd $BASE_DIR/../client-frameworks-support/testing-utilities
npm install
echo ""
ls
echo ""

# echo ""
# echo "INSTALL testing-utilities/test DEPS"
# echo ""

# cd $BASE_DIR/../client-frameworks-support/testing-utilities/test
# npm install
# echo ""
# ls
# echo ""

# cd $BASE_DIR/../client-frameworks-support/testing-utilities/test/node_modules/@luigi-project/client
# echo ""
# ls
# echo ""

cd $BASE_DIR/../client-frameworks-support/testing-utilities

npm run bundle

cd ..

lerna bootstrap --no-ci --force-local --include-dependents --include-dependencies --scope luigi-mock-module-test-mf
lerna bootstrap --no-ci --force-local --include-dependents --include-dependencies --scope @luigi-project/testing-utilities


cd $BASE_DIR/../client-frameworks-support/testing-utilities/test
#Run acutal test
(set -e && waitForWebServer 8080) & (npm start)
