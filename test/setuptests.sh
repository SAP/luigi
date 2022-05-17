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
echo "describe('Navigation', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('url'));
  });
  describe('iFrame check', () => {
    it('Check if iFrame exists in running application.', () => {
      cy.wait(5000);
      cy.get('iframe');
    });
  });
})
" > ./cypress/integration/setup-test.spec.js

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