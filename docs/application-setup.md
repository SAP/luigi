# Application setup

Prior to start developing with Luigi, you need to set up your application. This document shows you how to set up a web application using the Luigi micro front-end framework.

Choose the framework to build your application:

[Application setup without a framework](#noframework) <br>
[Angular 6](#angular6)<br>
[SAPUI5/OpenUI5](#sapui5)<br>
[VUE.JS](#vuejs)

## Intitial steps

Follow these steps to build a web application based on Luigi:

1. Add Luigi npm packages to your project dependencies. 

````
npm install --save @kyma-project/luigi-core
npm install --save @kyma-project/luigi-client
````

2. Give Luigi exclusive control over the entry `index.html` file. If you have a single page application, transfer it to a two-page application. Your app should run  to make sure the existing router doesn't interfere.
3. Define your Luigi [navigation configuration](navigation-configuration.md).
4. Start your server to run the application.

## Command examples

The examples on this page demonstrate commands that perform each of the necessary steps to set up your application. Each set of commands is grouped by the framework on which you execute it.

<a name="noframework"></a> 
### Application setup for an application not using a framework 

>**NOTE:** You need a development server capable of hosting Single Page Applications. The recommended server is Live Server.

1. If you do not have Live Server installed, use this command to install it.

````
npm install -g live-server
````

2. Use the following installer to create a directory for your application, install Luigi, make assets available, and start your local server

```
bash <(curl -s https://raw.githubusercontent.com/kyma-project/Luigi/master/scripts/setup/no-framework.sh)
````
or execute these commands manually to get the same result:

```bash
mkdir my-new-app && cd my-new-app

npm init -y

sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config\/basic\/basicConfiguration.js -o .\/public\/assets\/sampleconfig.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json

npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals webpack webpack-cli @babel/core @babel/preset-env babel-loader 

mkdir -p public/assets

mkdir -p src/luigi-config/basic

curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html

curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html

curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > src/luigi-config/basic/basicConfiguration.js

sed "s|extendedConfiguration.bundle.js|sampleconfig.js|g" public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html

cp -r node_modules/\@kyma-project/luigi-* public

cp -r node_modules/fiori-fundamentals/dist public/fiori-fundamentals

npm run buildConfig

live-server --entry-file=index.html public
```

<a name="angular6"></a>

### Application setup for Angular 6

>**NOTE:** The Angular CLI is a prerequisite for this example.

1. If you do not have the Angular CLI installed, download and install it from [this URL](https://cli.angular.io/).

2. Use the installer to create your application, install Luigi, make assets available, and serve your application:

````
bash <(curl -s https://raw.githubusercontent.com/kyma-project/Luigi/master/scripts/setup/angular.sh)
````
or execute these commands manually to get the same result:
```bash
ng new my-angular-app --routing && cd my-angular-app

npm i -P @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals webpack webpack-cli @babel/core @babel/preset-env babel-loader 

sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config\/basic\/basicConfiguration.js -o .\/src\/assets\/sampleconfig.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json

mkdir -p src/luigi-config/basic

mv src/index.html src/angular.html

curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > src/index.html

curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > src/luigi-config/basic/basicConfiguration.js

curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > src/assets/basicexternal.html


sed 's/extendedConfiguration.bundle.js/sampleconfig.js/g' src/index.html > src/index.tmp.html && mv src/index.tmp.html src/index.html

sed 's#"src/index.html"#"src/angular.html"#g' angular.json > tmp.json && mv tmp.json angular.json

sed 's#"src/styles.css"#"src/styles.css", "node_modules/fiori-fundamentals/dist/fiori-fundamentals.min.css"#g' angular.json > tmp.json && mv tmp.json angular.json

sed 's#"src/assets"#"src/assets","src/index.html","src/logout.html",{"glob": "fiori-fundamentals.min.css","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "fonts/**","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "SAP-icons.*","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "**","input": "node_modules/@kyma-project/luigi-core","output": "/luigi-core"},{"glob": "luigi-client.js","input": "node_modules/@kyma-project/luigi-client","output": "/luigi-client"}#g' angular.json > tmp.json && mv tmp.json angular.json

npm run buildConfig

npm run start
```

<a name="sapui5"></a>

### Application setup for SAPUI5/OpenUI5 

>**NOTE:** Live Server must be installed as your development server.

1. If you do not have Live Server installed, use this command to install it.

````
npm install -g live-server
````

2. Use the following installer to create a directory for your application, install Luigi, make assets available, and start your local server

````
bash <(curl -s https://raw.githubusercontent.com/kyma-project/Luigi/master/scripts/setup/openui5.sh)
````
or execute these commands manually to get the same result:

````
$ mkdir my-ui5-app && cd my-ui5-app
$ npm init -y
$ npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals
$ mkdir -p public/assets
$ curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
$ sed 's/extendedConfiguration.bundle.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
$ curl https://raw.githubusercontent.com/SAP/openui5/master/src/sap.m/test/sap/m/demokit/tutorial/quickstart/01/webapp/index.html | sed 's/src="..\/..\/..\/..\/..\/..\/..\/..\/resources\/sap-ui-core.js"/src="https:\/\/openui5.hana.ondemand.com\/resources\/sap-ui-core.js"/g' > public/ui5.html
$ curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > public/assets/sampleconfig.js
$ curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html
$ cp -r node_modules/\@kyma-project/luigi-* public
$ live-server --entry-file=index.html public
````

<a name="vuejs"></a>

### Application setup for VUE.JS 

>**NOTE:** The VUE CLI is a prerequisite for this example.

1. If you do not have VUE CLI installed, use this command to install it.

````
npm install -g @vue/cli
````

2. Use the installer to create your application, install Luigi, make assets available, and serve your application:
````
bash <(curl -s https://raw.githubusercontent.com/kyma-project/Luigi/master/scripts/setup/vue.sh)
````
or execute these commands manually to get the same result:
````
$ vue create -d my-original-vue-app && cd my-original-vue-app
$ npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals
$ mkdir -p public/assets
$ mv public/index.html public/vue.html
$ curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
$ sed 's/extendedConfiguration.bundle.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
$ curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > public/assets/sampleconfig.js
$ curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html
$ echo "const webpack=require('webpack');const CopyWebpackPlugin=require('copy-webpack-plugin');module.exports={pages:{sampleapp:{entry:'src/main.js',template:'public/vue.html',filename:'vue.html'}},lintOnSave:true,runtimeCompiler:true,outputDir:'dist',configureWebpack:{plugins:[new CopyWebpackPlugin([{context:'public',to:'index.html',from:'index.html'},{context:'node_modules/@kyma-project/luigi-core',to:'./luigi-core',from:{glob:'**',dot:true}},{context:'node_modules/@kyma-project/luigi-client',to:'./luigi-client',from:{glob:'**',dot:true}}],{ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'})]}};" > vue.config.js
$ npm run serve
````