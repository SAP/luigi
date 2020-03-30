#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

# Folders in which whitesource has to be run
declare -a FOLDERS=("client"
                    "core"
                    "website/landingpage/dev"
                    "website/fiddle"
                    "plugins"
                   )

# Project tokens for corresponding folders
declare -a PROJECT_TOKENS=("a63fd5aaaa2343199327aac6d3e2b5346e930927d66441bf92111f111ecfc8ad"
                           "dd9b33e88b684129b325ef1c3510f52712f26167f06c432ab84fd4452cd353d9"
                           "0bc00859083a4cf98e1246c91cabc56a4623fb69f1f24cdd8ca10f9f0d3dfbb4"
                           "8b3ce944979d49c8b1d2917533199aeb4e73a993843f4820a509a33932e18a29"
                           "56eb623145264763a82330025e4f11efd538074a3cd04791ab6ab87293174aca"
                          )

for ((i=0;i<${#FOLDERS[@]};++i)); do
  cd $BASE_DIR/../${FOLDERS[i]}

  echo $(printf '{"apiKey": "%s","userKey": "%s","productName": "%s", "projectToken": "%s", "devDep": "false","forceUpdate": true,"checkPolicies": true}' "$WHITESOURCE_APIKEY" "$WHITESOURCE_USER_TOKEN" "$WHITESOURCE_PRODUCT_TOKEN" "${PROJECT_TOKENS[i]}" ) > $BASE_DIR/../${FOLDERS[i]}/whitesource.config.json

  whitesource run

  RV=$?
  echo "Exit code: $RV"

done

exit 0






