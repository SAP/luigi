#!/bin/bash

pwd

echo Installing lerna
npm install -g lerna
npm install -g concurrently
npm install -g @angular/cli

echo Installing Cypress
cd core/examples/luigi-sample-angular
npm install -D cypress
cd ../../..

echo Bootstrap
lerna bootstrap --ci

echo Bundle
cd core
lerna run bundle

echo Starting webserver
cd examples/luigi-sample-angular
lerna bootstrap --ci
npm run start &
WS_PID=$!
sleep 60

echo Running tests
npm run e2e:run
RV=$?
kill $WS_PID
exit $RV
