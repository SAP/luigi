#!/usr/bin/env bash

set -e # exit on errors

CLI=$1
PORT=$2
TESTURL=$3
URL=$4

# Define Kill Webserver method
killWebserver() {
  PORT=$1
  SPAPID=`lsof -i :${PORT} | tail -n 1 | tr -s ' ' | cut -d ' ' -f 2`
  if [ "$SPAPID" == "" ]; then
    # Fallback
    # the [] is a workaround to prevent ps showing up itself
    # https://unix.stackexchange.com/questions/74185/how-can-i-prevent-grep-from-showing-up-in-ps-results
    SPAPID=$(eval "ps -A -ww | grep '[p]ort $PORT' | tr -s ' ' |  cut -d ' ' -f 1")
  fi

  if [ ! -z "$SPAPID" ]; then
    # echoe "Cleanup: Stopping webserver on port $PORT"
    RV=$?
    travis_terminate 0
    exit $RV
  fi
}

#Create new folder for setup
cd ..
mkdir setupTestFolder && cd setupTestFolder

#Install necessary dependencies
npm install -g $CLI cypress tar@latest

#Create Cypress Config
echo "{}" > cypress.json
mkdir cypress
mkdir cypress/integration
cp ../luigi/test/e2e-test-application/e2e/test3/0-setuptests/setup-test.spec.js ./cypress/integration/setup-test.spec.js

echo "{
  'integrationFolder': './cypress/integration',
  'pluginsFile': false,
  'chromeWebSecurity': false,
  'viewportWidth': 1250,
  'viewportHeight': 790,
  'baseUrl': 'http://localhost:4200/'
}" > setuptest.json

#Run acutal test
(sleep 300; cypress run --env configFile=setuptest.json,url=$TESTURL --browser chrome -c video=false && killWebserver $PORT) & (
curl -s $URL > ./setup.sh &&
printf '\n' | source ./setup.sh test)