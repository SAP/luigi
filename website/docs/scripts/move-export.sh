#!/usr/bin/env bash
set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

Color_Off='\033[0m'       # Text Reset
BIBlue='\033[1;34m'      # Light Blue, bold

PUBLIC_DIR=$BASE_DIR/../public

if [ -d $PUBLIC_DIR ]; then
 rm -rf $PUBLIC_DIR
fi

mkdir -p $PUBLIC_DIR


LUIGI_CORE=$PUBLIC_DIR/luigi-core
LUIGI_CLIENT=$PUBLIC_DIR/luigi-client

NODE_MODULES_CORE=$BASE_DIR/../node_modules/@luigi-project/core
NODE_MODULES_CLIENT=$BASE_DIR/../node_modules/@luigi-project/client

mkdir -p $LUIGI_CORE
mkdir -p $LUIGI_CLIENT

# copy luigi client and luigi core to public folder or wherever needed, to avoid using extra dependencies on vite side
cp $NODE_MODULES_CLIENT/* $LUIGI_CLIENT
cp $NODE_MODULES_CORE/* $LUIGI_CORE


# mkdir -p $PUBLIC_CLIENT_DIR



# mkdir -p $LUIGI_PUBLIC_DIR // already created

# mv $EXPORT_DIR/luigi/* $LUIGI_PUBLIC_DIR

# mkdir -p $LUIGI_PUBLIC_DIR/docu-microfrontend
# mv $EXPORT_DIR/* $LUIGI_PUBLIC_DIR/docu-microfrontend

# copy generated-json afterwards, since static files are only copied once by sapper in the beginning
# cp $BASE_DIR/../static/luigi/navigation-generated.json $LUIGI_PUBLIC_DIR/ 

# copy redirects file for netlify
# cp $LUIGI_PUBLIC_DIR/../src/_redirects $LUIGI_PUBLIC_DIR/

echo ""
echo "Documentation was exported to $PUBLIC_DIR"

echo ""
echo -e "Type ${BIBlue}npm run export:serve${Color_Off} to run Luigi with the docu micro-frontend."
echo ""