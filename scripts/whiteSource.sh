#!/usr/bin/env bash

set -e # exit on errors

BASE_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

# Folders in which whitesource has to be run
declare -a FOLDERS=("client"
                    "core"
                    "website/landingpage/dev"
                    "website/fiddle"
                    "plugins"
                    "container"
                    "client-frameworks-support/client-support-ui5"                  
                    "client-frameworks-support/client-support-angular"
                    "client-frameworks-support/testing-utilities"
                   )

# Project tokens for corresponding folders
declare -a PROJECT_TOKENS=("a63fd5aaaa2343199327aac6d3e2b5346e930927d66441bf92111f111ecfc8ad"
                           "dd9b33e88b684129b325ef1c3510f52712f26167f06c432ab84fd4452cd353d9"
                           "0bc00859083a4cf98e1246c91cabc56a4623fb69f1f24cdd8ca10f9f0d3dfbb4"
                           "8b3ce944979d49c8b1d2917533199aeb4e73a993843f4820a509a33932e18a29"
                           "56eb623145264763a82330025e4f11efd538074a3cd04791ab6ab87293174aca"
                           "9bbbcde5bec3443b872ca3ceab2d223576b63221f437432fa182e9a57c684d02"
                           "e24f24fa43fc4a47974d2691f39012e04cbd76efa77d4d0db0b3c82c42f0ee58"
                           "314e91b6c0864db09077ab4af1c802ffce5af09c2c314065bb8868f8b0393ce1"
                           "ba242462d46e4d98870ae5d00b95ec3c4782cf2647da44868be0fc3a0803caca"
                          )

CACHED_WHITESOURCE_UA=~/.cache/whitesource/wss-unified-agent.jar
if [ -f "$CACHED_WHITESOURCE_UA" ]; then
    echo "$CACHED_WHITESOURCE_UA exists. Take from Cache."
else 
    mkdir -p ~/.cache/whitesource
    cd ~/.cache/whitesource
    echo "$CACHED_WHITESOURCE_UA does not exist."
    echo "Start download.."
    curl -LJO https://github.com/whitesource/unified-agent-distribution/releases/latest/download/wss-unified-agent.jar
    echo "Downloaded"
fi

for ((i=0;i<${#FOLDERS[@]};++i)); do
  cd $BASE_DIR/../${FOLDERS[i]}
  echo "Create config File:"
  echo $'apiKey='${WHITESOURCE_APIKEY}$'\nuserKey='$WHITESOURCE_USER_TOKEN$'\nproductName='$WHITESOURCE_PRODUCT_TOKEN$'\nprojectToken='${PROJECT_TOKENS[i]}$'\ndevDep=false\nforceUpdate=true\ncheckPolicies=true\nwss.url=https://sap.whitesourcesoftware.com/agent' > wss-generated-file.config
  java -jar ~/.cache/whitesource/wss-unified-agent.jar -c wss-generated-file.config -d . -scanComment "$(date)"
  
  RV=$?
  echo "Exit code: $RV"

done

exit 0






