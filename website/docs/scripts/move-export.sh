#!/usr/bin/env bash
set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

Color_Off='\033[0m'       # Text Reset
BIBlue='\033[1;34m'      # Light Blue, bold

LUIGI_PUBLIC_DIR=$BASE_DIR/../public/luigi-core
NODE_MODULES_CORE_DIR=$BASE_DIR/../node_modules/@luigi-project/core
NODE_MODULES_CLIENT_DIR=$BASE_DIR/../node_modules/@luigi-project/client

# SVELTEKIT_BASE=$BASE_DIR/../.svelte-kit/output/prerendered/dependencies
SVELTEKIT_BASE=$BASE_DIR/..


#  ON PUBLIC FOLDER
# PUBLIC_CORE_DIR=$LUIGI_PUBLIC_DIR/core
# PUBLIC_CLIENT_DIR=$LUIGI_PUBLIC_DIR/luigi-client

PUBLIC_CORE_DIR=$SVELTEKIT_BASE/core
PUBLIC_CLIENT_DIR=$SVELTEKIT_BASE/static/luigi-client

# EXPORT_DIR=$BASE_DIR/../__sapper__/export/docu-microfrontend


# if [ -d $LUIGI_PUBLIC_DIR ]; then
#  rm -rf $LUIGI_PUBLIC_DIR
# fi

# mkdir -p $LUIGI_PUBLIC_DIR // already created
mkdir -p $LUIGI_PUBLIC_DIR
mkdir -p $PUBLIC_CLIENT_DIR

# copy luigi client and luigi core to public folder or wherever needed, to avoid using extra dependencies on vite side
cp $NODE_MODULES_CLIENT_DIR/* $PUBLIC_CLIENT_DIR
cp $NODE_MODULES_CORE_DIR/* $LUIGI_PUBLIC_DIR

# mkdir -p $LUIGI_PUBLIC_DIR // already created

# mv $EXPORT_DIR/luigi/* $LUIGI_PUBLIC_DIR

# mkdir -p $LUIGI_PUBLIC_DIR/docu-microfrontend
# mv $EXPORT_DIR/* $LUIGI_PUBLIC_DIR/docu-microfrontend

# copy generated-json afterwards, since static files are only copied once by sapper in the beginning
# cp $BASE_DIR/../static/luigi/navigation-generated.json $LUIGI_PUBLIC_DIR/ 

# copy redirects file for netlify
# cp $LUIGI_PUBLIC_DIR/../src/_redirects $LUIGI_PUBLIC_DIR/

echo ""
echo "Documentation was exported to $LUIGI_PUBLIC_DIR"

echo ""
echo -e "Type ${BIBlue}npm run export:serve${Color_Off} to run Luigi with the docu micro-frontend."
echo ""