#!/bin/bash

pwd

echo Installing lerna
npm install -g lerna

echo Bootstrap
lerna bootstrap

echo Bundle
cd core
lerna run bundle

echo Starting webserver
cd examples/luigi-sample-angular
npm install
npm run start &
WS_PID=$!
sleep 60

echo Running tests
npm run e2e:run
RV=$!
kill $WS_PID
exit $RV
