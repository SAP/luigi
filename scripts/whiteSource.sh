#!/bin/bash

echo $(printf '{"apiKey": "%s","userKey": "%s","productName": "%s","devDep": "false","forceUpdate": true,"checkPolicies": true}' "$WHITESOURCE_APIKEY" "$WHITESOURCE_USER_TOKEN" "$WHITESOURCE_PRODUCT_TOKEN" ) > whitesource.config.json
whitesource run