#!/bin/bash
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

npm init -y

# add "start" command to the package.json file. This command is split into 2 lines on purpose!
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config.js -o .\/public\/assets\/luigi-config.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json

npm i -save @luigi-project/core @luigi-project/client fiori-fundamentals webpack webpack-cli @babel/core @babel/preset-env babel-loader 
mkdir -p public/assets
mkdir -p src

#download important files from GitHub
curl https://raw.githubusercontent.com/SAP/luigi/master/test/e2e-test-application/src/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/test/e2e-test-application/src/assets/sampleexternal.html > public/assets/basicexternal.html
curl https://raw.githubusercontent.com/SAP/luigi/master/test/e2e-test-application/src/luigi-config/basic/basicConfiguration.js > src/luigi-config.js

sed "s|extendedConfiguration.bundle.js|luigi-config.js|g" public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html

cp -r node_modules/\@luigi-project/* public
cp -r node_modules/fiori-fundamentals/dist public/fiori-fundamentals

npm run buildConfig
live-server --entry-file=index.html public