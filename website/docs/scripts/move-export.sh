#!/usr/bin/env bash
set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

Color_Off='\033[0m'       # Text Reset
BIBlue='\033[1;34m'      # Light Blue, bold

EXPORT_DIR=$BASE_DIR/../__sapper__/export/docu-microfrontend
LUIGI_DIR=$BASE_DIR/../public

if [ -d $LUIGI_DIR ]; then
 rm -rf $LUIGI_DIR
fi

mkdir -p $LUIGI_DIR
mv $EXPORT_DIR/luigi/* $LUIGI_DIR

mkdir -p $LUIGI_DIR/docu-microfrontend
mv $EXPORT_DIR/* $LUIGI_DIR/docu-microfrontend

echo ""
echo "Documentation was exported to $LUIGI_DIR"

echo ""
echo -e "Type ${BIBlue}npm run export:serve${Color_Off} to run Luigi with the docu micro-frontend."
echo ""