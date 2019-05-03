#!/bin/bash

# We're considering this file is located in ~/Sites/kyma-project and
# luigi is in ~/Sites/kyma-project/luigi with the branch checked out
# that we want to test.

function showHelp {
  echo ""
  echo "DO NOT RUN THIS SCRIPT IN THIS FOLDER (./testComp...)!"
  echo ""
  echo "Be sure to stop all other running luigi or console related"
  echo "frontend projects (eg. port 4200 in use)"
  echo ""
  echo ""
  echo "Usage:"
  echo ""
  echo "./scripts/testCompatibility --tag latest --install"
  echo "or"
  echo "npm run test:compatibility -- --tag v4.4.0 "
  echo "npm run test:compatibility -- --tag latest"
  echo "npm run test:compatibility -- --tag v4.4.0 --install"
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

LUIGI_DIR="${PWD}"
LUIGI_FOLDERNAME="luigi-compatibility-testing"
LUIGI_DIR_TESTING="$LUIGI_DIR/../$LUIGI_FOLDERNAME"
EXAMPLE_DIR="$LUIGI_DIR_TESTING/core/examples/luigi-sample-angular"
EXAMPLE_NODE_MODULES=$EXAMPLE_DIR/node_modules/@kyma-project
TESTONLY=""

function echoe {
  # Reset
  Color_Off='\033[0m'       # Text Reset

  # Regular Colors
  Black='\033[0;30m'        # Black
  Red='\033[0;31m'          # Red
  Green='\033[0;32m'        # Green
  Yellow='\033[0;33m'       # Yellow
  Blue='\033[0;34m'         # Blue
  Purple='\033[0;35m'       # Purple
  Cyan='\033[0;36m'         # Cyan
  White='\033[0;37m'        # White

  # Bold High Intensity
  BIBlack='\033[1;90m'      # Black
  BIRed='\033[1;91m'        # Red
  BIGreen='\033[1;92m'      # Green
  BIYellow='\033[1;93m'     # Yellow
  BIBlue='\033[1;94m'       # Blue
  BIPurple='\033[1;95m'     # Purple
  BICyan='\033[1;96m'       # Cyan
  BIWhite='\033[1;97m'      # White

  # High Intensity backgrounds
  On_IBlack='\033[0;100m'   # Black
  On_IRed='\033[0;101m'     # Red
  On_IGreen='\033[0;102m'   # Green
  On_IYellow='\033[0;103m'  # Yellow
  On_IBlue='\033[0;104m'    # Blue
  On_IPurple='\033[0;105m'  # Purple
  On_ICyan='\033[0;106m'    # Cyan
  On_IWhite='\033[0;107m'   # White

  echo ""
  echo ""
  echo -e "${On_IYellow}${BIBlack}${1}${Color_Off}"
  echo ""
}


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


killWebServer() {
  # the [] is a workaround to prevent ps showing up itself
  # https://unix.stackexchange.com/questions/74185/how-can-i-prevent-grep-from-showing-up-in-ps-results
  SPAPID=`ps -A -ww | grep '[w]s --port 4200' | tr -s ' ' |  cut -d ' ' -f 1`
  if [ ! -z "$SPAPID" ]; then
    echoe "Stopping SPA webserver"
    kill -9 $SPAPID
  fi
}


# TESTONLY
if [ "" == "$TESTONLY" ]; then


# PROMPT FOR TAG
if [ "latest" = "$TAG" ]; then
  LATEST_LOCAL_TAG=`(git tag -l | tail -1)`
  TAG=$LATEST_LOCAL_TAG;
fi
if [ "" = "$TAG" ]; then
  # LATEST_LOCAL_TAG=`(git tag -l | tail -1)`
  echoe "No tag provided, pick one of the last releases;"
  echoe "Fetching current releases are being fetched from github."
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
      echoe "$count) $newName"
      releases[count]=$newName;
      count=`expr $count + 1`
    fi;
  done < <(echo $rawReleases | jq 'map(.tag_name)')

  echo ""
  read -p "Tag #: " selectedIndex
  echoe "Selected Tag: ${releases[selectedIndex]}"
  TAG=${releases[selectedIndex]};
fi

### VERIFY LOCAL CURRENT LUIGI
if [ "$INSTALL" == "true" ]; then
  echoe "Verifying current Luigi"
  cd "$LUIGI_DIR/core"
  npm i
  cd "$LUIGI_DIR/client"
  npm i
  echoe "Bundling current Luigi"
  npx lerna run bundle
fi

### CHECKOUT THE SELECTED VERSION

# check if lfolder exists, else only walk into it
if [ ! -d $LUIGI_DIR_TESTING ]; then
  echoe "Creating test folder"
  git clone git@github.com:kyma-project/luigi.git $LUIGI_DIR_TESTING
fi

if [ ! -d $LUIGI_DIR_TESTING ]; then
  echoe "There was an issue cloning the repository (github permissions?)"
  exit 2
fi

cd $LUIGI_DIR_TESTING
echoe "Checking out selected release tag $TAG"
git reset --hard HEAD
git checkout tags/$TAG

echoe "Installing selected Luigi example app"
cd $EXAMPLE_DIR
npm install

# remove installed 
echoe "Linking current Luigi to selected version"
# remove installed luigi versions and symlink with latest
rm -rf $EXAMPLE_NODE_MODULES/luigi*
ln -s $LUIGI_DIR/core/public $EXAMPLE_NODE_MODULES/luigi-core
ln -s $LUIGI_DIR/client $EXAMPLE_NODE_MODULES/luigi-client
ls -la $EXAMPLE_NODE_MODULES
ls $EXAMPLE_NODE_MODULES/luigi-core
ls $EXAMPLE_NODE_MODULES/luigi-client

if [ ! -f $EXAMPLE_NODE_MODULES/luigi-core/package.json ]; then
  echoe "There was an issue linking the luigi-core module"
  exit 2
fi
if [ ! -f $EXAMPLE_NODE_MODULES/luigi-client/package.json ]; then
  echoe "There was an issue linking the luigi-client module"
  exit 2
fi

echoe "Bundling example app"
cd $EXAMPLE_DIR
npm run build

fi # --test-only

if [ "true" == "$TESTONLY" ]; then
  echoe "Running bunded example and e2e tests"
fi

cd $EXAMPLE_DIR
echoe "Installing and running spa webserver"
npm i -g local-web-server
killWebServer
(cd dist && ws --port 4200 --spa index.html &)

echoe "Starting e2e test headless"
# start separately
npm run e2e:run

# Check and kill webserver
killWebServer
