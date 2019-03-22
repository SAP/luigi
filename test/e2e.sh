#!/bin/bash

pwd

echo Installing lerna
npm install -g lerna
npm install -g concurrently
npm install -g @angular/cli
npm install -g cypress

echo Bootstrap
lerna bootstrap --no-ci

echo Bundle
cd core
lerna run bundle

echo Starting webserver
cd examples/luigi-sample-angular
lerna bootstrap
npm run start &
WS_PID=$!
sleep 60

echo Running tests
npm run e2e:run
RV=$?
kill $WS_PID
exit $RV
