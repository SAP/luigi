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

npm init -y > /dev/null

# add "start" command to the package.json file. This command is split into 2 lines on purpose!
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config\/luigi-config.es6.js -o .\/public\/assets\/luigi-config.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json
sed 's/"scripts": {/"scripts": {\
\   "start":"live-server --entry-file=index.html public",/1' package.json > p.tmp.json && mv p.tmp.json package.json

npm i -save @luigi-project/core @luigi-project/client fundamental-styles @sap-theming/theming-base-content live-server webpack webpack-cli @babel/core @babel/preset-env babel-loader 
mkdir -p public/assets
mkdir -p src/luigi-config

# download assets
curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/luigi-config.es6.js > src/luigi-config/luigi-config.es6.js
curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/basicMicroFrontend.html > public/assets/basicMicroFrontend.html


cp -r node_modules/\@luigi-project/core public/luigi-core
cp -r node_modules/\@luigi-project/client public/luigi-client
cp -r node_modules/fundamental-styles/dist public/fundamental-styles
cp -r node_modules/@sap-theming/theming-base-content public/theming-base-content

echo "Building config with command: npm run buildConfig"
npm run buildConfig

echo "Running live-server with command: npm run start"
npm run start
