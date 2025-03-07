#!/usr/bin/env bash

set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh

echo ""
echo "Container Test App"
cd "$BASE_DIR"

# Test-APP runs on 8080
killWebserver 8080 || true

# simple 'examples' app runs on 2222 port
killWebserver 2222 || true

# Instrument code for coverage
npm run nyc-instrument

# Start the first server for 'examples' app in the background (&=background)
npm run start-examples-test &
WS_FID_PID=$!

# Start the second server for 'test-app' in the background
npm run start &
EXAMPLES_FID_PID=$!

# sleep for 30 seconds to wait for both servers to be fired up
sleep 30

if [ "$USE_CYPRESS_DASHBOARD" == "true" ]; then
  echo "Running tests with recording"
  echo "Check the link https://dashboard.cypress.io/#/projects/czq7qc for the recording"
  # obtain the key here: https://dashboard.cypress.io/#/projects/czq7qc/settings
  npm run cypress-headless -- --record --key $CYPRESS_DASHBOARD_RECORD_KEY
else
  echo "Running tests without recording"
  npm run cypress-headless
fi

kill $WS_FID_PID
kill $EXAMPLES_FID_PID

exit $?
