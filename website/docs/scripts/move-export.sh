#!/usr/bin/env bash
set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
source $BASE_DIR/../../../scripts/shared/bashHelpers.sh

EXPORT_DIR=$BASE_DIR/../__sapper__/export
LUIGI_DIR=$BASE_DIR/../public

if [ -d $LUIGI_DIR ]; then
 rm -rf $LUIGI_DIR
fi

mkdir -p $LUIGI_DIR
mv $EXPORT_DIR/luigi/* $LUIGI_DIR

mkdir -p $LUIGI_DIR/docu-microfrontend
mv $EXPORT_DIR $LUIGI_DIR/docu-microfrontend

echo ""
echoe "Documentation was exported to $LUIGI_DIR"

if [ "$1" = "--serve" ]; then
  npm run export:serve
else
  echoe "Run: sirv public --single --dev --cors --port 4000"
fi