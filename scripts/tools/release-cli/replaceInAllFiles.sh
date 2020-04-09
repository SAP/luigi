#!/usr/bin/env bash

# Replaces a string in all source and doc files

set -e # exit on errors

LUIGI_ROOT_DIR="$( cd "$(dirname "$0")" ; pwd -P )/../../../"

if [ "$1" == "" ]; then
  echo "No parameters defined. Usage: ./replaceInAllFiles.sh SEARCH REPLACE"
  exit 1;
fi
if [ "$2" == "" ]; then
  echo "Not enough parameters defined. Usage: ./replaceInAllFiles.sh SEARCH REPLACE"
  exit 1;
fi

SEARCH=$1
REPLACE=$2

SOURCES=(
  "core/src"
  "client/src"
  "client/luigi-client.d.ts"
  "plugins/auth/src"
)

# Mac OSX implementation done yet
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Replacing $SEARCH with $REPLACE"
  LC_CTYPE="C"
  LANG="C"
  # Iterate over Sources
  for i in "${SOURCES[@]}"; do
    # On directories find matches and replace only matches
    # it could be also done a one-liner but it might lead to false-positive
    # git changes (because files are touched)
    FIND_FILES=`find $LUIGI_ROOT_DIR$i -type f -name '*.js' -o -name '*.ts'`
    FIND_RESULTS=`echo $FIND_FILES | xargs grep -l $SEARCH`
    FIND_COUNT=`echo $FIND_RESULTS | wc -l | xargs`

    # Execute replace only if there were findings
    if [ "$FIND_COUNT" -gt 0 ]; then
      for i in "${FIND_RESULTS[@]}"; do
        if [ ! "$i" = "" ]; then
          sed -i '' "s@$SEARCH@$REPLACE@" "$i"
        fi
      done
    fi
  done
  exit 0
fi

echo "Unknown OS, this script requires Mac OS X"
exit 1