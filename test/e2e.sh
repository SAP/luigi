#!/usr/bin/env bash

set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/../scripts/shared/bashHelpers.sh


# We assume, Angular example is ran with `npm run build`
# and root dependencies are installed
# npm i -g cypress@^3.4.1 cypress-plugin-retries sirv-cli
NG_EXAMPLE="$BASE_DIR/../test/e2e-test-application"
NG_MODULES="$NG_EXAMPLE/node_modules"
if [[ ! -L $NG_MODULES ]] && [[ ! -d $NG_MODULES ]]; then
  echo "Creating symlink for example node_modules";
  ln -s "$BASE_DIR/../node_modules" $NG_MODULES
fi

echo ""
echo "Angular App"
cd $NG_EXAMPLE
killWebserver 4200
runWebserver 4200 dist /luigi-core/luigi.js
WS_NG_PID=$PID

echo ""
echo "Fiddle App"
cd $BASE_DIR/../website/fiddle
killWebserver 8080
runWebserver 8080 public /bundle.js
WS_FID_PID=$PID

cd $NG_EXAMPLE
if [ "$USE_CYPRESS_DASHBOARD" == "true" ]; then
  echo "Running tests in parallel with recording"
  # obtain the key here: https://dashboard.cypress.io/#/projects/czq7qc/settings
  npm run e2e:run -- --record --parallel --key 4bf20f87-8352-47d5-aefa-1e684fab69cf
else
  echo "Running tests without parallelization"
  npm run e2e:run
fi
RV=$?
kill $WS_NG_PID
kill $WS_FID_PID
exit $RV
