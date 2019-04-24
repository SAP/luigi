#!/bin/bash

pwd

cd core/examples/luigi-sample-angular
pwd

echo Installing Concurrently and @angular/cli
npm install concurrently
npm install @angular/cli

echo Installing Cypress

npm install -D cypress
cd ../../..

pwd

echo "install Lerna and do bootstrap"
npm install lerna
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
