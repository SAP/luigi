#!/bin/bash

# We're considering this file is located in ~/Sites/kyma-project and
# luigi is in ~/Sites/kyma-project/luigi with the branch checked out
# that we want to test.

function showHelp {
  echo ""
  echo "Usage:"
  echo ""
  echo "npm run test:compatibility -- --tag v4.4.0 "
  echo "npm run test:compatibility -- --tag latest"
  echo "npm run test:compatibility -- --tag v4.4.0 --install"
  echo ""
  echo "./scripts/testCompatibility --tag latest --install"
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
}

LUIGI_DIR="${PWD}"
LUIGI_FOLDERNAME="luigi-compatibility-testing"
LUIGI_DIR_TESTING="$LUIGI_DIR/../$LUIGI_FOLDERNAME"
EXAMPLE_DIR="$LUIGI_DIR_TESTING/core/examples/luigi-sample-angular"
EXAMPLE_NODE_MODULES=$EXAMPLE_DIR/node_modules/@kyma-project

while [ "$#" -gt 0 ]; do
  case "$1" in
    # commands with input value, shift 2
    -t|--tag) TAG="$2"; shift 2;;
    # validity check for argumenst with input value
    -t|--tag) echo "$1 requires an argument" >&2; exit 1;;

    # commands without input value, shift 1
    -i|--install) INSTALL="true"; shift 1;;

    -*) echo "unknown argument: $1" >&2; showHelp; exit 1;;
    *) handle_argument "$1"; shift 1;;
  esac
done

# PROMPT FOR TAG
if [ "latest" = "$TAG" ]; then
  LATEST_LOCAL_TAG=`(git tag -l | tail -1)`
  TAG=$LATEST_LOCAL_TAG;
fi
if [ "" = "$TAG" ]; then
  # LATEST_LOCAL_TAG=`(git tag -l | tail -1)`
  echo "No tag provided, pick one of the last releases;"
  echo "Fetching current releases are being fetched from github."
  echo ""
  rawReleases=`curl -s https://api.github.com/repos/kyma-project/luigi/releases`
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

killWebServer() {
  # the [] is a workaround to prevent ps showing up itself
  # https://unix.stackexchange.com/questions/74185/how-can-i-prevent-grep-from-showing-up-in-ps-results
  SPAPID=`ps -A -ww | grep '[w]s --port 4200' | tr -s ' ' |  cut -d ' ' -f 1`
  if [ ! -z "$SPAPID" ]; then
    echo "Stopping SPA webserver"
    kill -9 $SPAPID
  fi
}

### VERIFY LOCAL CURRENT LUIGI
if [ "$INSTALL" == "true" ]; then
  echo "Verifying current Luigi"
  cd "$LUIGI_DIR/core"
  npm i
  cd "$LUIGI_DIR/client"
  npm i
  echo "Bundling current Luigi"
  npx lerna run bundle
fi

### CHECKOUT THE SELECTED VERSION

# check if lfolder exists, else only walk into it
if [ ! -d $LUIGI_DIR_TESTING ]; then
  echo "Creating test folder"
  git clone git@github.com:kyma-project/luigi.git $LUIGI_DIR_TESTING
fi

if [ ! -d $LUIGI_DIR_TESTING ]; then
  echo "There was an issue cloning the repository (github permissions?)"
  exit 2
fi

cd $LUIGI_DIR_TESTING
echo "Checking out selected release tag $TAG"
git reset --hard HEAD
git checkout tags/$TAG

echo "Installing selected Luigi example app"
cd $EXAMPLE_DIR
npm install

# remove installed 
echo "Linking current Luigi to selected version"
# remove installed luigi versions and symlink with latest
rm -rf $EXAMPLE_NODE_MODULES/luigi*
ln -s $LUIGI_DIR/core/public $EXAMPLE_NODE_MODULES/luigi-core
ln -s $LUIGI_DIR/client $EXAMPLE_NODE_MODULES/luigi-client
ls -la $EXAMPLE_NODE_MODULES
ls $EXAMPLE_NODE_MODULES/luigi-core
ls $EXAMPLE_NODE_MODULES/luigi-client

if [ ! -f $EXAMPLE_NODE_MODULES/luigi-core/package.json ]; then
  echo "There was an issue linking the luigi-core module"
  exit 2
fi
if [ ! -f $EXAMPLE_NODE_MODULES/luigi-client/package.json ]; then
  echo "There was an issue linking the luigi-client module"
  exit 2
fi

echo "Bundling example app"
npm run build

echo "Installing and running spa webserver"
npm i -g local-web-server
killWebServer
(cd dist && ws --port 4200 --spa index.html &)

echo "Starting e2e test headless"
# start separately
npm run e2e:run

# Check and kill webserver
killWebServer
