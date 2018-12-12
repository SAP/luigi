#!/bin/bash

echo Installing lerna
npm install -g lerna

echo Bootstrap
lerna bootstrap

echo Bundle
cd core
lerna run bundle

echo Starting webserver
cd examples/luigi-sample-angular
npm run start &
sleep 60

echo Running tests
npm run e2e:run