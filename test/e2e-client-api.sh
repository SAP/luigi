#!/usr/bin/env bash

set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh

echo ""
echo "Client API Test App"
cd "$BASE_DIR/e2e-client-api-test-app"
killWebserver 3000
npm run start &
WS_FID_PID=$!

NG_EXAMPLE="$BASE_DIR/../test/e2e-client-api-test-app"

cd $NG_EXAMPLE
if [ "$USE_CYPRESS_DASHBOARD" == "true" ]; then
  echo "Running tests in parallel with recording"
  # obtain the key here: https://dashboard.cypress.io/#/projects/czq7qc/settings
  npm run cypress-headless -- --record --parallel --key $CYPRESS_DASHBOARD_RECORD_KEY
else
  echo "Running tests without parallelization"
  npm run cypress-headless
fi

RV=$?
kill $WS_FID_PID
exit $RV
