#!/bin/bash

# Publishes the current version
#
# TODO: check if we want to publish last TAG and how we handle RC releases then

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

echoe() {
  # find all colors here: https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux#5947802
  # Reset
  Color_Off='\033[0m'       # Text Reset

  # Bold High Intensity
  BIBlack='\033[1;90m'      # Black
  
  # High Intensity backgrounds
  On_IYellow='\033[0;103m'  # Yellow

  echo ""
  echo ""
  echo -e "${On_IYellow}${BIBlack}${1}${Color_Off}"
  echo ""
}

if [ "$TRAVIS" = "true" ]; then
  # setup token when running in travis
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN_MAXMARKUS}" > ~/.npmrc
fi


#### LUIGI CLIENT
echoe "Installing and bundling Luigi Client"
cd $BASE_DIR/../client
npm ci
npm run bundle

echoe "Publishing Luigi Client"
cd $BASE_DIR/../client
npm publish --access public

NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")
if [[ $VERSION != *"rc."* ]]; then
  echo "Tag $VERSION with latest"
  npm dist-tag add $NAME@$VERSION latest
fi


#### LUIGI CORE
echoe "Installing and bundling Luigi Core"
cd $BASE_DIR/../core
npm ci
npm run bundle

echoe "Publishing Luigi Core"
cd $BASE_DIR/../core/public
npm publish --access public

cd $BASE_DIR/../core
NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")
if [[ $VERSION != *"rc."* ]]; then
  echo "Tag $VERSION with latest"
  npm dist-tag add $NAME@$VERSION latest
fi

if [ "$TRAVIS" = "true" ]; then
  # setup token when running in travis
  echo "" > ~/.npmrc
fi