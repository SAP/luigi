#!/bin/bash

# Publishes the current version

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

source $BASE_DIR/shared/bashHelpers.sh

# @luigi-project npm token
function setLuigiNpmToken {
  if [ "$TRAVIS" = "true" ]; then
    if [ "$NPM_LUI_AUTH_TOKEN" = "" ]; then
     echoe "NPM_LUI_AUTH_TOKEN is not set, cannot continue publishing."
     exit 1
    fi

    # setup token when running in travis
    echo "setLuigiNpmToken"
    echo "//registry.npmjs.org/:_authToken=$NPM_LUI_AUTH_TOKEN" > ~/.npmrc
    npm whoami
  fi
}

function prepublishChecks {
  cd $BASE_DIR/../client/public
  CLIENT_VERSION=$(node -p "require('./package.json').version")
  cd $BASE_DIR/../core/public
  CORE_VERSION=$(node -p "require('./package.json').version")

  if [ "$CORE_VERSION" != "$CLIENT_VERSION" ]; then
    echoe "Version mismatch between Client and Core."
    exit 1
  fi

  # Check if it can be published (github release must exist)
  TAGS_GREP=`git ls-remote --tags origin | grep "v$CORE_VERSION$" | wc -l`
  if [[ "$TAGS_GREP" =~ "0" ]]; then
    echo "Tag (github release) does not exist, not going to publish $CORE_VERSION to npm"
    exit 0
  fi
}


function prepublishCheck {
  cd $BASE_DIR/../$1
  VERSION=$(node -p "require('./package.json').version")
  
  # Check if it can be published (github release must exist)
  TAGS_GREP=`git ls-remote --tags origin | grep "v$VERSION$" | wc -l`
  if [[ "$TAGS_GREP" =~ "0" ]]; then
    echo "Tag (github release) does not exist, not going to publish $VERSION to npm"
    exit 0
  fi
}

function publishPackage {
  BASE_FOLDER=$1
  PUBLISH_FOLDER=$2

  cd $BASE_DIR/../$PUBLISH_FOLDER
  NAME=$(node -p "require('./package.json').name")
  VERSION=$(node -p "require('./package.json').version")

  cd $BASE_DIR/../$BASE_FOLDER
  # travis already installed it
    # echoe "Running npm ci in $(pwd) ..."
    # npm ci

  # Check if was published already
  NPM_GREP=`npm info $NAME versions | grep "'$VERSION'" | wc -l`
  if [[ "$NPM_GREP" =~ "1" ]]; then
    echo "$NAME@$VERSION already published, skipping until next release."
  else
    # echoe "Bundling $NAME@$VERSION ..."
    # npm run bundle

    echoe "Publishing $NAME@$VERSION ..."

    npm publish $BASE_DIR/../$PUBLISH_FOLDER --access public
    if [[ $VERSION != *"rc."* ]] && [[ $VERSION != *"next."* ]]; then
      echo "Tag $NAME@$VERSION with latest on npm"
      npm dist-tag add $NAME@$VERSION latest
    else
      echo "Release/Next candidate $NAME@$VERSION NOT tagged as latest"
    fi

    echoe "Published $NAME@$VERSION"
  fi # end NPM_GREP
}

function removeNpmToken {
  if [ "$TRAVIS" = "true" ]; then
    # setup token when running in travis
    echo "" > ~/.npmrc
  fi
}


# Luigi Client & Core
setLuigiNpmToken
prepublishChecks
publishPackage "core" "core/public"
publishPackage "client" "client/public"
publishPackage "core" "core/public-ie11"
publishPackage "client" "client/public-ie11"

if ( prepublishCheck "plugins/auth/public/auth-oauth2" ); then
  publishPackage "plugins" "plugins/auth/public/auth-oauth2"
fi
if ( prepublishCheck "plugins/auth/public/auth-oidc" ); then
publishPackage "plugins" "plugins/auth/public/auth-oidc"
fi
removeNpmToken
