#!/usr/bin/env bash

CLI=$1
PORT=$2
TESTURL=$3
URL=$4

# Define Kill Webserver method
killWebserver() {
  PORT=$1
  # Use netstat to find the process ID for the given port instead of lsof, because lsof doesn't work on windows? --> change back later"
  SPAPID=$(netstat -ano | findstr ":$PORT" | awk '{print $5}' | head -n 1)

  if [ ! -z "$SPAPID" ]; then
    echo "Stopping webserver on port $PORT"
    kill $SPAPID;
    exit 0
  fi
}

waitForWebServer() {
  PORT=$1
  TESTURL=$2

  while true
  do
    SPAPID=$(netstat -ano | findstr ":$PORT" | awk '{print $5}' | head -n 1)
    if [ ! -z "$SPAPID" ]; then
      echo "1111 BREAK BREAK BREAK BREAK BREAK BREAK BREAK BREAK BREAK BREAK BREAK BREAK"
      break
    fi
    sleep 15
  done

  cypress run --env configFile=setuptest.json,url=$TESTURL --browser chrome -c video=false
  killWebserver $PORT
}

# Create new folder for setup
cd ..
mkdir setupTestFolder && cd setupTestFolder

# Install necessary dependencies
npm install -g $CLI cypress@5.3.0 tar@latest

# Create Cypress Config
echo "{}" > cypress.json
mkdir cypress
mkdir cypress/integration
cp ../../test/e2e-test-application/cypress/e2e/test3/0-setuptests/setup-test.cy.js ./cypress/integration/setup-test.spec.js

#Run actual test
(set -e && waitForWebServer $PORT $TESTURL) & (
curl -s $URL > ./setup.sh &&
printf '\n' | source ./setup.sh test)