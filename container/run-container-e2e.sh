#!/usr/bin/env bash

set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh

echo ""
echo "Container Test App"
cd "$BASE_DIR"
killWebserver 8080
npm run start &
WS_FID_PID=$!

sleep 10

if [ "$USE_CYPRESS_DASHBOARD" == "true" ]; then
  echo "Running tests in parallel with recording"
  # obtain the key here: https://dashboard.cypress.io/#/projects/czq7qc/settings
  npm run cypress-headless -- --record --parallel --key 4bf20f87-8352-47d5-aefa-1e684fab69cf
else
  echo "Running tests without parallelization"
  npm run cypress-headless
fi

RV=$?
kill $WS_FID_PID
exit $RV
