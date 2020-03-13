#!/usr/bin/env bash
set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

# We assume, Angular example is ran with `npm run build`
# and root dependencies are installed
# npm i -g cypress@^3.4.1 cypress-plugin-retries sirv-cli
NG_EXAMPLE="$BASE_DIR/../test/e2e-test-application"
NG_MODULES="$NG_EXAMPLE/node_modules"
if [[ ! -L $NG_MODULES ]] && [[ ! -d $NG_MODULES ]]; then
  echo "Creating symlink for example node_modules";
  ln -s "$BASE_DIR/../node_modules" $NG_MODULES
fi

cd $NG_EXAMPLE

echo "Starting Angular webserver"
sirv start dist --single --cors --port 4200 --silent &
WS_NG_PID=$!

echo "Starting Fiddle webserver"
sirv start $BASE_DIR/../website/fiddle/public --single --cors --port 8080 --silent &
WS_FID_PID=$!

# wait until example is built and running
SLEEPSECS=1 # sleep time between webserver availability check
WAITCOUNT=0
until $(curl --output /dev/null --silent --head --fail http://localhost:4200); do
  printf '.'
  sleep $SLEEPSECS
  WAITCOUNT=$(($WAITCOUNT + $SLEEPSECS))
done
echo "Angular Webserver was ready after $WAITCOUNT seconds."

SLEEPSECS=1 # sleep time between webserver availability check
WAITCOUNT=0
until $(curl --output /dev/null --silent --head --fail http://localhost:8080); do
  printf '.'
  sleep $SLEEPSECS
  WAITCOUNT=$(($WAITCOUNT + $SLEEPSECS))
done
echo "Fiddle Webserver was ready after $WAITCOUNT seconds."

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
