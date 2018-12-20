#!/bin/bash
echo ""
echo "Installing Luigi with Angular and basic configuration"
echo ""
read -p "Luigi project folder name: " folder
# steps to execute line by line
echo ""
ng new $folder --routing && cd $folder
npm i # run install again, because ng new does not install all dependencies
npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals

# the following steps can be copy and pasted to the terminal at once
mv src/index.html src/angular.html
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > src/index.html
sed 's/extendedConfiguration.js/sampleconfig.js/g' src/index.html > src/index.tmp.html && mv src/index.tmp.html src/index.html
#curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basicConfiguration.js > src/assets/sampleconfig.js
curl http://localhost:8000/core/examples/luigi-sample-angular/src/luigi-config/basicConfiguration.js > src/assets/sampleconfig.js
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > src/assets/basicexternal.html
sed 's#"src/index.html"#"src/angular.html"#g' angular.json > tmp.json && mv tmp.json angular.json
sed 's#"src/styles.css"#"src/styles.css", "node_modules/fiori-fundamentals/dist/fiori-fundamentals.min.css"#g' angular.json > tmp.json && mv tmp.json angular.json
sed 's#"src/assets"#"src/assets","src/index.html","src/logout.html",{"glob": "fiori-fundamentals.min.css","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "fonts/**","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "SAP-icons.*","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "**","input": "node_modules/@kyma-project/luigi-core","output": "/luigi-core"},{"glob": "luigi-client.js","input": "node_modules/@kyma-project/luigi-client","output": "/luigi-client"}#g' angular.json > tmp.json && mv tmp.json angular.json
ng serve
