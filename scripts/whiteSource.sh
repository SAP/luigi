#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd $BASE_DIR/..
echo "product token: $WHITESOURCE_PRODUCT_TOKEN"

echo $(printf '{"apiKey": "%s","userKey": "%s","productName": "%s","devDep": "false","forceUpdate": true,"checkPolicies": true}' "$WHITESOURCE_APIKEY" "$WHITESOURCE_USER_TOKEN" "$WHITESOURCE_PRODUCT_TOKEN" ) > $BASE_DIR/../whitesource.config.json
whitesource run