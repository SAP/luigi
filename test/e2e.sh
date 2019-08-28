#!/usr/bin/env bash
set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
# We assume, Angular example is ran with `npm run build`
# and root dependencies are installed
# npm i -g cypress@^3.4.1 cypress-plugin-retries sirv-cli
NG_EXAMPLE="$BASE_DIR/../core/examples/luigi-sample-angular"
NG_MODULES="$NG_EXAMPLE/node_modules"
if [[ ! -L $NG_MODULES ]] && [[ ! -d $NG_MODULES ]]; then
  echo "Creating symlink for example node_modules";
  ln -s "$BASE_DIR/../node_modules" $NG_MODULES
fi

cd $NG_EXAMPLE

# ./node_modules/cypress/bin/cypress install

echo "Starting webserver"
sirv start dist --cors --port 4200 &
WS_PID=$!

# # wait until example is built and running
# sleep 60
WAITCOUNT=0
until $(curl --output /dev/null --silent --head --fail http://localhost:4200); do
  printf '.'
  sleep 5
  WAITCOUNT=$(($WAITCOUNT + 5))
done
echo "Webserver was ready after $WAITCOUNT seconds."


if [ "$USE_CYPRESS_DASHBOARD" == "true" ]; then
  echo "Running tests in parallel with recording"
  npm run e2e:run -- --record --parallel --key 8c693a90-b747-48af-b3dc-2bab84927657
else
  echo "Running tests without parallelization"
  npm run e2e:run
fi
RV=$?
kill $WS_PID
exit $RV
