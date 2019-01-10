mkdir my-ui5-app && cd my-ui5-app
npm init -y
npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals
mkdir -p public/assets
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
sed 's/extendedConfiguration.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
curl https://raw.githubusercontent.com/SAP/openui5/master/src/sap.m/test/sap/m/demokit/helloworld/index.html  | sed 's/src="..\/..\/..\/..\/..\/resources\/sap-ui-core.js"/src="https:\/\/openui5.hana.ondemand.com\/resources\/sap-ui-core.js"/g' > public/ui5.html
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/basicConfiguration.js > public/assets/sampleconfig.js
cp -r node_modules/\@kyma-project/luigi-* public
live-server --entry-file=index.html public