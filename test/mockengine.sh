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

cd $BASE_DIR/../client-frameworks-support/testing-utilities
npm install

npm run bundle

lerna bootstrap --force-local

cd test
#Run acutal test
(set -e && waitForWebServer 8080) & (npm start)
