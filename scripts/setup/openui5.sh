#!/bin/bash
echo ""
echo "Installing Luigi with static files and basic configuration"
echo ""
read -p "Luigi project folder name: " folder
# steps to execute line by line
echo ""
mkdir $folder && cd $folder
npm init -y
npm i -save @luigi-project/core @luigi-project/client fiori-fundamentals
mkdir -p public/assets
curl https://raw.githubusercontent.com/SAP/luigi/master/test/e2e-test-application/src/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/openui5/master/src/sap.m/test/sap/m/demokit/tutorial/quickstart/01/webapp/index.html | sed 's/src="..\/..\/..\/..\/..\/..\/..\/..\/resources\/sap-ui-core.js"/src="https:\/\/openui5.hana.ondemand.com\/resources\/sap-ui-core.js"/g' > public/ui5.html
curl https://raw.githubusercontent.com/SAP/luigi/master/test/e2e-test-application/src/luigi-config/basic/basicConfiguration.js > public/assets/sampleconfig.js
curl https://raw.githubusercontent.com/SAP/luigi/master/test/e2e-test-application/src/assets/sampleexternal.html > public/assets/basicexternal.html
sed 's/extendedConfiguration.bundle.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
cp -r node_modules/\@luigi-project/* public
live-server --entry-file=index.html public