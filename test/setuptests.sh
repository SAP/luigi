#!/usr/bin/env bash

CLI=$1
PORT=$2
TESTURL=$3
URL=$4

source ./scripts/shared/bashHelpers.sh

#Create new folder for setup
cd ..
mkdir setupTestFolder && cd setupTestFolder

#Install necessary dependencies
npm install -g $CLI cypress

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
(sleep 150; cypress run --env configFile=setuptest.json,url=$TESTURL --browser chrome -c video=false && exit 0) & (
curl -s $URL > ./setup.sh &&
printf '\n' | source ./setup.sh test)