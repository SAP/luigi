#!/bin/bash
echo ""
echo "Installing Luigi with static files and basic configuration"
echo ""
read -p "Luigi project folder name: " folder
# steps to execute line by line
echo ""
mkdir $folder && cd $folder
npm init -y
npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals
mkdir -p public/assets
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
sed 's/extendedConfiguration.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html

curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basicConfiguration.js > public/assets/sampleconfig.js
# curl http://localhost:8000/core/examples/luigi-sample-angular/src/luigi-config/basicConfiguration.js > public/assets/sampleconfig.js

cp -r node_modules/\@kyma-project/luigi-* public
cp -r node_modules/fiori-fundamentals/dist public/fiori-fundamentals
live-server --entry-file=index.html public