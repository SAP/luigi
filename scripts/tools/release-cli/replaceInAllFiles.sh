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

FOLDERS=(
  "core/src",
  "client/src",
  "client/luigi-client.d.ts",
  "plugins/src",
  "docs"
)

if [[ "$OSTYPE" == "linux-gnu" ]]; then
  # Linux Syntax
  echo "Linux replacing $SEARCH with $REPLACE"
  # find /usr/share/nginx/public -type f -name '*.js' -exec sed -i "s@REPLACE_ME_API@$BACKEND_URL@g" {} \;
elif [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Mac OS X replacing $SEARCH with $REPLACE"
  # Mac OSX
  for i in "${FOLDERS[@]}"; do
    if [ -d "$LUIGI_ROOT_DIR$i" ]; then # if directory
      echo "is dir: $LUIGI_ROOT_DIR$i"
    elif [ -f "$LUIGI_ROOT_DIR$i" ]; then # if directory
      echo "is file: $LUIGI_ROOT_DIR$i"
    fi
  done
  # sed -ie 's@http://localhost:8080@$BACKEND_URL@' ./dist/prod/js/app.js
  # find dist/. -type f -name '*.*' -exec sed -i '' s@http://localhost:8080@$BACKEND_URL@ {} +
fi