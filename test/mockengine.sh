#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh


runApp() {
  local PORT=$1

  echo ""
  echo "Starting webserver on port $PORT"
  pwd
  npm run start &
  PID=$!

  echo "Webserver running with PID $PID"
  # wait until example is built and running
  local SLEEPSECS=1 # sleep time between webserver availability check
  local WAITCOUNT=0
  until $(curl --output /dev/null --silent --head --fail http://localhost:$PORT); do
    if [ $WAITCOUNT -gt 15 ]; then
      echo "Starting Webserver on $PORT timed out."
      exit 1;
    fi
    printf '.'
    sleep $SLEEPSECS
    WAITCOUNT=$(($WAITCOUNT + $SLEEPSECS))
  done
  echo ""
  echo "Webserver was ready after $WAITCOUNT seconds"
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
PORT=8181
runApp $PORT
npm run e2e:run
killWebserver $PORT
# (set -e && waitForWebServer 8080) & (npm start)

echo "Exiting script with 0.................."
