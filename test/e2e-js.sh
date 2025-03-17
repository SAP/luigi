#!/usr/bin/env bash

set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh

echo ""
echo "Js Test App"
cd "$BASE_DIR/e2e-js-test-application"
killWebserver 4500
npm run dev &
WS_FID_PID=$!

NG_EXAMPLE="$BASE_DIR/../test/e2e-test-application"

cd $NG_EXAMPLE
if [ "true" == "true" ] && [ -n "$CYPRESS_DASHBOARD_RECORD_KEY" ] ; then
  echo "Running tests in parallel with recording"
  # obtain the key here: https://dashboard.cypress.io/#/projects/czq7qc/settings
  npm run e2e:run:js -- --record --parallel --key $CYPRESS_DASHBOARD_RECORD_KEY
else
  echo "Running tests without parallelization"
  npm run e2e:run:js
fi

RV=$?
kill $WS_FID_PID
exit $RV
