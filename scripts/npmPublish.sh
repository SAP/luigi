#!/bin/bash

# Publishes the current version

set -e # exit on errors

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

function setNpmToken {
  if [ "$TRAVIS" = "true" ]; then
    # setup token when running in travis
    echo "setNpmToken"
    echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" > ~/.npmrc
    npm whoami
  fi
}

function checkGithubRelease {
  cd $BASE_DIR/../client
  NAME=$(node -p "require('./package.json').name")
  VERSION=$(node -p "require('./package.json').version")

  # Check if it can be published (github release must exist)
  TAGS_GREP=`git ls-remote --tags origin | grep "v$VERSION$" | wc -l`
  if [[ "$TAGS_GREP" =~ "0" ]]; then
    echo "Tag (github release) does not exist, not going to publish $VERSION to npm"
    exit 0;
  fi
}

function publishPackage {
  FOLDER=$1

  cd $BASE_DIR/../$FOLDER
  # Check if was published already
  NPM_GREP=`npm info $NAME versions | grep "'$VERSION'" | wc -l`
  if [[ "$NPM_GREP" =~ "1" ]]; then
    echo "$NAME@$VERSION already published, skipping until next release."
  else

    echoe "Installing ..."
    npm ci
    echoe "Bundling ..."
    npm run bundle

    echoe "Publishing ..."
    npm publish --access public
    if [[ $VERSION != *"rc."* ]]; then
      echo "Tag $NAME@$VERSION with latest on npm"
      npm dist-tag add $NAME@$VERSION latest
    fi

  fi # end NPM_GREP
}

function removeNpmToken {
  if [ "$TRAVIS" = "true" ]; then
    # setup token when running in travis
    echo "" > ~/.npmrc
  fi
}


checkGithubRelease
setNpmToken
publishPackage "core/public"
publishPackage "client"
removeNpmToken