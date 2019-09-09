#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

declare -a FOLDERS=("client" "core" "website/landingpage/dev")

## now loop through the above array
for i in "${FOLDERS[@]}"
do
  cd $BASE_DIR/../$i

  echo $(printf '{"apiKey": "%s","userKey": "%s","productName": "%s","devDep": "false","forceUpdate": true,"checkPolicies": true}' "$WHITESOURCE_APIKEY" "$WHITESOURCE_USER_TOKEN" "$WHITESOURCE_PRODUCT_TOKEN" ) > $BASE_DIR/../$i/whitesource.config.json

  # WHITE SOURCE
  # Exit Code
  # Starting version 1.1.1 and later, the following exit codes are displayed upon scan completion:

  # SUCCESS: 0,
  # ERROR: -1,
  # POLICY_VIOLATION: -2,
  # CLIENT_FAILURE: -3,
  # CONNECTION_FAILURE: -4,
  # SERVER_FAILURE: -5

  # Exit Codes in Bash
  # The exit codes WhiteSource returns in the Bash command language should be treated as 'x' modulo 256: 

  # Exit code 0 is equivalent to code 0 (0 mod 256 = 0)
  # Exit code -1 is equivalent to code 255 (-1 mod 256 = 255)
  # Exit code -2 is equivalent to code 254 (-2 mod 256 = 254)
  # Exit code -3 is equivalent to code 253 (-3 mod 256 = 253)
  # Exit code -4 is equivalent to code 252 (-4 mod 256 = 252)
  # Exit code -5 is equivalent to code 251 (-5 mod 256 = 251)

  whitesource run

  RV=$?
  echo "Exit code: $RV"

  if [ $RV == 254 ]; then 
    echo "Policy Violation";
    exit $RV
  fi

done

exit 0