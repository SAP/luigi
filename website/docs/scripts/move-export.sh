#!/usr/bin/env bash
set -e # exit on errors
BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"
source $BASE_DIR/../../../scripts/shared/bashHelpers.sh


EXPORT_DIR=$BASE_DIR/../__sapper__/export
LUIGI_DIR=$BASE_DIR/../__sapper__/custom-export

if [ -d $LUIGI_DIR ]; then
 rm -rf $LUIGI_DIR
fi

mkdir -p $LUIGI_DIR
mv $EXPORT_DIR/luigi/* $LUIGI_DIR

mkdir -p $LUIGI_DIR/documentation
mv $EXPORT_DIR $LUIGI_DIR/documentation

echo ""
echoe "Documentation was exported to $EXPORT_DIR"
echoe "Run: sirv __sapper__/custom-export --single --dev --cors --port 4000"