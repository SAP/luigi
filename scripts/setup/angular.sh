#!/usr/bin/env bash
set -e
echo ""
echo "Installing Luigi with Angular and basic configuration"
echo ""
if [[ "$1" = "" ]]; then
  read -p "Luigi project folder name: " folder
else
  folder=$1
  echo "Luigi project folder name: $folder"
fi
# steps to execute line by line
echo ""
ng new $folder --routing && cd $folder

npm i -P @luigi-project/core @luigi-project/client fundamental-styles @sap-theming/theming-base-content webpack webpack-cli @babel/core @babel/preset-env babel-loader 
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config\/luigi-config.es6.js -o .\/src\/assets\/luigi-config.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json
mkdir -p src/luigi-config

 # the following steps can be copy and pasted to the terminal at once
mv src/index.html src/angular.html

# download assets
curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/index.html > src/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/luigi-config.es6.js > src/luigi-config/luigi-config.es6.js
curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/basicMicroFrontend.html > src/assets/basicMicroFrontend.html

# string replacements in some files
sed 's#"src/index.html"#"src/angular.html"#g' angular.json > tmp.json && mv tmp.json angular.json

sed 's#"src/styles.css"#"src/styles.css",\
              "node_modules/fundamental-styles/dist/fundamental-styles.css"#g' angular.json > tmp.json && mv tmp.json angular.json
sed 's#"src/assets"#"src/assets",\
              "src/index.html",\
              "src/logout.html",\
              {"glob": "fundamental-styles.css","input": "node_modules/fundamental-styles/dist","output": "/fundamental-styles"},\
              {"glob": "*","input": "node_modules/@sap-theming/theming-base-content","output": "/fonts"},\
              {"glob": "**","input": "node_modules/@luigi-project/core","output": "/luigi-core"},\
              {"glob": "luigi-client.js","input": "node_modules/@luigi-project/client","output": "/luigi-client"}#g' angular.json > tmp.json && mv tmp.json angular.json

npm run buildConfig
npm run start