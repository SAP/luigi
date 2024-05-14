#!/usr/bin/env bash

set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh

echo ""
echo "Container Test App"
cd "$BASE_DIR"

# main example in port 8080
killWebserver 8080 || true

# simple examples on 2222 port
killWebserver 2222 || true

# Start the first server in the background
npm run start-examples-test &
WS_FID_PID=$!


# Start the second server in the background
npm run start&
EXAMPLES_FID_PID=$!

# in seconds careful!
sleep 3

# if [ "$USE_CYPRESS_DASHBOARD" == "true" ]; then
  echo "Running tests in parallel with recording"
  # obtain the key here: https://dashboard.cypress.io/#/projects/czq7qc/settings
  npm run cypress-headless -- --record --parallel --key 4bf20f87-8352-47d5-aefa-1e684fab69cf
# else
#   echo "Running tests without parallelization"
#   npm run cypress-headless
# fi

# RV=$?
kill $WS_FID_PID
kill $EXAMPLES_FID_PID
# exit $RV
exit $?

