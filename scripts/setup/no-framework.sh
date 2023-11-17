#!/usr/bin/env bash
echo ""
echo "Installing Luigi with static files and basic configuration"
echo ""

if [[ "$1" = "" ]]; then
  read -p "Luigi project folder name: " folder
else
  folder=$1
  echo "Luigi project folder name: $folder"
fi
# steps to execute line by line
echo ""

mkdir $folder && cd $folder

# npm init -y > /dev/null

# add "start" command to the package.json file. This command is split into 2 lines on purpose!
# sed 's/"scripts": {/"scripts": {\
# \   "start":"server public",/1' package.json > p.tmp.json && mv p.tmp.json package.json

curl https://raw.githubusercontent.com/SAP/luigi/0b3dff050f5808b8e7852fe9e757a87be3b87de7/core/examples/luigi-example-js/package.json > package.json


npm i 
mkdir -p public/
mkdir -p public/views

# download assets from core/examples folder
# UNCOMMENT after testing
# curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-js/public/index.html > public/index.html
# curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-js/public/luigi-config.js > public/luigi-config.js
# curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-js/public/views/home.html > public/views/home.html
# curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-js/public/views/sample1.html > public/views/sample1.html

curl https://raw.githubusercontent.com/SAP/luigi/0b3dff050f5808b8e7852fe9e757a87be3b87de7/core/examples/luigi-example-js/public/favicon.ico > public/favicon.ico
curl https://raw.githubusercontent.com/SAP/luigi/0b3dff050f5808b8e7852fe9e757a87be3b87de7/core/examples/luigi-example-js/public/logo.png > public/logo.png
curl https://raw.githubusercontent.com/SAP/luigi/0b3dff050f5808b8e7852fe9e757a87be3b87de7/core/examples/luigi-example-js/public/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/0b3dff050f5808b8e7852fe9e757a87be3b87de7/core/examples/luigi-example-js/public/luigi-config.js > public/luigi-config.js
curl https://raw.githubusercontent.com/SAP/luigi/0b3dff050f5808b8e7852fe9e757a87be3b87de7/core/examples/luigi-example-js/public/views/home.html > public/views/home.html
curl https://raw.githubusercontent.com/SAP/luigi/0b3dff050f5808b8e7852fe9e757a87be3b87de7/core/examples/luigi-example-js/public/views/sample1.html > public/views/sample1.html

echo "Running server with command: npm run start"
npm run start
