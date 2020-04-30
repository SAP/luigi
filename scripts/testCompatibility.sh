#!/usr/bin/env bash

# We're considering the branch checked out that we want to test against.

set -e # exit on errors

showHelp() {
  echo ""
  echo ""
  echo "Be sure to stop all other running luigi related"
  echo "frontend projects (ports 4200 and 8080 must not be in use)"
  echo ""
  echo ""
  echo "Usage:"
  echo ""
  echo "./scripts/testCompatibility --tag latest"
  echo "./scripts/testCompatibility --tag latest --install"
  echo "or"
  echo "npm run test:compatibility -- --tag latest"
  echo "npm run test:compatibility -- --tag v4.4.0"
  echo "npm run test:compatibility -- --tag v4.4.0 --install"
  echo ""
  echo "npm run test:compatibility -- --test-only"
  echo ""
  echo ""
  echo "--tag latest"
  echo "Run with latest tag to specify the latest released version to test"
  echo "against the currently checked out version."
  echo ""
  echo "--install"
  echo "Run with --install flag if current luigi installation requires "
  echo "install and bundling, eg. directly after CI checkout. By default"
  echo "we assume that luigi is installed and lerna run bundle was executed."
  echo ""
  echo "Test only usage:"
  echo "--test-only"
  echo "Runs only local webserver and test suite, it assumes the bundling and"
  echo "building has been done already"
  echo ""
  echo ""
}

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd $BASE_DIR/../

source $BASE_DIR/shared/bashHelpers.sh

declare -a APP_FOLDERS=(
  "/test/e2e-test-application"
  "/website/fiddle"
)

# Used for setting up webserver and killing them
declare -a APP_PORTS=(
  4200 # e2e-test-application
  8080 # fiddle
)

declare -a APP_PUBLIC_FOLDERS=(
  "dist" # e2e-test-application
  "public" # fiddle
)

declare -a APP_PATH_CHECK=(
  "/luigi-core/luigi.js" # e2e-test-application
  "/bundle.js" # fiddle
)

killWebServers() {
  for PORT in "${APP_PORTS[@]}"; do
    killWebserver $PORT
  done
}

promptForTag() {
  # PROMPT FOR TAG
  if [ "latest" = "$TAG" ]; then
    LATEST_LOCAL_TAG=`(git tag -l | tail -1)`
    TAG=$LATEST_LOCAL_TAG;
  fi
  if [ "" = "$TAG" ]; then
    # LATEST_LOCAL_TAG=`(git tag -l | tail -1)`
    echoe "Choose Luigi Version to test against"
    echo "No tag provided, pick one of the last releases;"
    echo "Fetching current releases are being fetched from github."
    echo ""
    rawReleases=`curl -s https://api.github.com/repos/SAP/luigi/releases`
    # rawReleases=`cat releases`

    count=1;
    showNumReleases=4
    releases=()
    while read name id; do
      if [ "$count" -gt "$showNumReleases" ]; then
        break
      fi
      newName=`echo $name | sed 's/\"//g' | sed 's/,//g'`
      if [[ "${newName:0:1}" == "v" ]]; then
        echo "$count) $newName"
        releases[count]=$newName;
        count=`expr $count + 1`
      fi;
    done < <(echo $rawReleases | jq 'map(.tag_name)')

    echo ""
    read -p "Tag #: " selectedIndex
    echo "Selected Tag: ${releases[selectedIndex]}"
    TAG=${releases[selectedIndex]};
  fi
}
  
verifyInstallation() {
  ### VERIFY LOCAL CURRENT LUIGI
  if [ "$INSTALL" == "true" ]; then
    echoe "Verifying current Luigi"

    echoe "Core"
    cd "$LUIGI_DIR/core"
    npm i

    echoe "Client"
    cd "$LUIGI_DIR/client"
    npm i

    echoe "Plugins"
    cd "$LUIGI_DIR/plugins"
    npm i

    echoe "Bundling current Luigi"
    lerna run bundle

    echoe "Luigi installation done"
  fi
}

### CHECKOUT THE SELECTED VERSION
checkoutLuigiToTestfolder() {
  # check if lfolder exists, else only walk into it
  if [ ! -d $LUIGI_DIR_TESTING ]; then
    echoe "Creating test folder"
    if [ "$USER" == "travis" ]; then
      # travis
      git clone https://github.com/SAP/luigi.git $LUIGI_DIR_TESTING
    else
      # osx localhost
      git clone git@github.com:SAP/luigi.git $LUIGI_DIR_TESTING
    fi
  fi

  if [ ! -d $LUIGI_DIR_TESTING ]; then
    echoe "There was an issue cloning the repository (github permissions?)"
    exit 2
  fi

  cd $LUIGI_DIR_TESTING
  echoe "Checking out selected release tag $TAG"
  git reset --hard HEAD
  git fetch --tags
  git checkout tags/$TAG

  for FOLDER in "${APP_FOLDERS[@]}"; do
    echoe "Installing app $FOLDER"
    cd $LUIGI_DIR_TESTING/$FOLDER
    npm i
  done
}

linkLuigi() {
  for FOLDER in "${APP_FOLDERS[@]}"; do
    NODE_MODULES=$LUIGI_DIR_TESTING/$FOLDER/node_modules/@luigi-project
    echoe "Linking current Luigi to selected version in $FOLDER"
    # remove installed luigi versions and symlink with latest
    mkdir -p $NODE_MODULES
    rm -rf $NODE_MODULES/*
    ln -s $LUIGI_DIR/core/public $NODE_MODULES/core
    ln -s $LUIGI_DIR/client/public $NODE_MODULES/client
    ln -s $LUIGI_DIR/plugins/auth/public/auth-oauth2 $NODE_MODULES/plugin-auth-oauth2
    ln -s $LUIGI_DIR/plugins/auth/public/auth-oidc $NODE_MODULES/plugin-auth-oidc
    ls -la $NODE_MODULES
    ls $NODE_MODULES/core
    ls $NODE_MODULES/client
    ls $NODE_MODULES/plugin-auth-oauth2
    ls $NODE_MODULES/plugin-auth-oidc

    if [ ! -f $NODE_MODULES/core/package.json ]; then
      echoe "There was an issue linking the core module"
      exit 2
    fi
    if [ ! -f $NODE_MODULES/client/package.json ]; then
      echoe "There was an issue linking the client module"
      exit 2
    fi
    if [ ! -f $NODE_MODULES/plugin-auth-oauth2/package.json ]; then
      echoe "There was an issue linking the auth-oauth2 module"
      exit 2
    fi
    if [ ! -f $NODE_MODULES/plugin-auth-oidc/package.json ]; then
      echoe "There was an issue linking the auth-oidc module"
      exit 2
    fi
  done
}

bundleApps() {
  for FOLDER in "${APP_FOLDERS[@]}"; do
    echoe "Bundling app $FOLDER"
    cd $LUIGI_DIR_TESTING/$FOLDER
    npm run build
  done
}

verifyAndStartWebserver() {
  killWebServers

  for i in "${!APP_FOLDERS[@]}"; do 
    echoe "Run app webserver on ${APP_PORTS[$i]}"
    cd $LUIGI_DIR_TESTING/${APP_FOLDERS[$i]}
    runWebserver ${APP_PORTS[$i]} ${APP_PUBLIC_FOLDERS[$i]} ${APP_PATH_CHECK[$i]}
  done
}

startE2eTestrunner() {
  echoe "Starting e2e test headless"
  cd $LUIGI_DIR_TESTING/${APP_FOLDERS[0]}

  npm run e2e:run

  # Check and kill webservers again
  killWebServers
}


# Script

LUIGI_DIR="${BASE_DIR}/.."
LUIGI_FOLDERNAME="luigi-compatibility-testing"
LUIGI_DIR_TESTING="$LUIGI_DIR/../$LUIGI_FOLDERNAME"

EXAMPLE_DIR="$LUIGI_DIR_TESTING"
NODE_MODULES=$EXAMPLE_DIR/node_modules/@luigi-project

TESTONLY=""

while [ "$#" -gt 0 ]; do
  case "$1" in
    # commands with input value, shift 2
    -t|--tag) TAG="$2"; shift 2;;
    # validity check for argumenst with input value
    -t|--tag) echoe "$1 requires an argument" >&2; exit 1;;

    # commands without input value, shift 1
    -i|--install) INSTALL="true"; shift 1;;

    -to|--test-only) TESTONLY="true"; shift 1;;

    -*) echoe "unknown argument: $1" >&2; showHelp; exit 1;;
    *) handle_argument "$1"; shift 1;;
  esac
done


if [ "" == "$TESTONLY" ]; then
  promptForTag
  verifyInstallation
  checkoutLuigiToTestfolder
  linkLuigi
  ls -lah $LUIGI_DIR_TESTING/test/e2e-test-application/node_modules/@luigi-project
  cd $LUIGI_DIR_TESTING/test/e2e-test-application/node_modules/@luigi-project
  ls *
  bundleApps
else
  echoe "Running bunded example and e2e tests"
fi

verifyAndStartWebserver
startE2eTestrunner

echoe "Compatibility tests finished successfully"