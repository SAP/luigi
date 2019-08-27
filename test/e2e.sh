#!/usr/bin/env bash

set -e # exit on errors

# echo "Installing base dependencies"
# npm ci

# echo "Bootstrapping Luigi"
# lerna bootstrap --ci --ignore "*luigi-sample-vue"

# echo "Bundle core and client"
# lerna run bundle --ignore "*luigi-sample-vue"

# echo "Install deps for example"
cd core/examples/luigi-sample-angular
# NG_CLI_VERSION=$(node -p "require('./package.json').devDependencies['@angular/cli']")
# npm install -D cypress concurrently lerna @angular/cli@$NG_CLI_VERSION
# lerna bootstrap --ci --ignore "*luigi-sample-vue"

npm i -g cypress@^3.4.1 cypress-plugin-retries sirv-cli
# ./node_modules/cypress/bin/cypress install

echo "Starting webserver"
# npm run start &
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

# docker run -it --network="host" -v $PWD:/e2e -w /e2e cypress/included:3.4.1 --browser chrome -c video=false
npm run e2e:run

# if [ "$USE_CYPRESS_DASHBOARD" == "true" ]; then
#   if [ [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$CIRCLE_PR_REPONAME" == "" ] ]; then
#     echo "Running tests in parallel with recording"
#     npm run e2e:run -- --record --parallel
#   else
#     # Cypress Dashboad does not support PR recording
#     echo "Running tests without parallelization"
#     npm run e2e:run
#   fi
# else
#   echo "Running tests without parallelization"
  # npm run e2e:run
# fi
RV=$?
kill $WS_PID
exit $RV
