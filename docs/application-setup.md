<!-- meta
{
  "node": {
    "label": "Installation",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 0
    }
  }
}
meta -->

# Luigi Core Installation

This document shows you how to set up a web application using the Luigi micro frontend framework. This involves a few basic steps:
* Adding Luigi's `npm` packages to your project dependencies.
* Giving Luigi exclusive control over your entry `index.html` file.
* Starting the server to run your application.

All those steps are achieved through a single **installer** script which sets up a Luigi application on your system. Keep in mind that if you have a single page application, you need to transfer it to a "two-page application". You should run your application to make sure the existing router doesn't interfere.

Choose the framework to build your application:

* [Application setup without a framework](#application-setup-without-a-framework)
* [Angular 6](#application-setup-for-angular-6)
* [SAPUI5/OpenUI5](#application-setup-for-sapui5openui5)
* [VUE.JS](#application-setup-for-vuejs)
* [React](#application-setup-for-react)

## Application setup without a framework

<!-- add-attribute:class:warning -->
> **NOTE:** You need a development server capable of hosting Single Page Applications. The recommended server is Live Server.

1. If you do not have Live Server installed, use this command to install it.

```bash
npm install -g live-server
```

2. Use the following installer to create a directory for your application, install Luigi, make assets available, and start your local server:

```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/no-framework.sh)
```
or execute these commands manually to get the same result:
<!-- accordion:start -->
### Click to expand
```bash
mkdir my-new-app && cd my-new-app
npm init -y
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config\/basic\/basicConfiguration.js -o .\/public\/assets\/sampleconfig.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json
npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals webpack webpack-cli @babel/core @babel/preset-env babel-loader
mkdir -p public/assets
mkdir -p src/luigi-config/basic
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > src/luigi-config/basic/basicConfiguration.js
sed "s|extendedConfiguration.bundle.js|sampleconfig.js|g" public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
cp -r node_modules/\@kyma-project/luigi-* public
cp -r node_modules/fiori-fundamentals/dist public/fiori-fundamentals
npm run buildConfig
live-server --entry-file=index.html public
```
<!-- accordion:end -->

3. Open the folder where Luigi is installed. Navigate to the `src/luigi-config` directory. The JavaScript file(s) in this folder can be used to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-setting.md) and more.

## Application setup for Angular 6

<!-- add-attribute:class:warning -->
> **NOTE:** The Angular CLI is a prerequisite for this example.

1. If you do not have the Angular CLI installed, download and install it from [here](https://cli.angular.io/).

2. Use the installer to create your application, install Luigi, make assets available, and serve your application:

```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/angular.sh)
```
or execute these commands manually to get the same result:
<!-- accordion:start -->
### Click to expand
```bash
ng new my-angular-app --routing && cd my-angular-app
npm i -P @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals webpack webpack-cli @babel/core @babel/preset-env babel-loader
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config\/basic\/basicConfiguration.js -o .\/src\/assets\/sampleconfig.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json
mkdir -p src/luigi-config/basic
mv src/index.html src/angular.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/index.html > src/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > src/luigi-config/basic/basicConfiguration.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > src/assets/basicexternal.html
sed 's/extendedConfiguration.bundle.js/sampleconfig.js/g' src/index.html > src/index.tmp.html && mv src/index.tmp.html src/index.html
sed 's#"src/index.html"#"src/angular.html"#g' angular.json > tmp.json && mv tmp.json angular.json
sed 's#"src/styles.css"#"src/styles.css", "node_modules/fiori-fundamentals/dist/fiori-fundamentals.min.css"#g' angular.json > tmp.json && mv tmp.json angular.json
sed 's#"src/assets"#"src/assets","src/index.html","src/logout.html",{"glob": "fiori-fundamentals.min.css","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "fonts/**","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "SAP-icons.*","input": "node_modules/fiori-fundamentals/dist","output": "/fiori-fundamentals"},{"glob": "**","input": "node_modules/@kyma-project/luigi-core","output": "/luigi-core"},{"glob": "luigi-client.js","input": "node_modules/@kyma-project/luigi-client","output": "/luigi-client"}#g' angular.json > tmp.json && mv tmp.json angular.json
npm run buildConfig
npm run start
```
<!-- accordion:end -->

3. Open the folder where Luigi is installed. Navigate to the `src/luigi-config` directory. The JavaScript file(s) in this folder can be used to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-setting.md) and more.

## Application setup for SAPUI5/OpenUI5

<!-- add-attribute:class:warning -->
> **NOTE:** Live Server must be installed as your development server.

1. If you do not have Live Server installed, use this command to install it.

```bash
npm install -g live-server
```

2. Use the installer to create a directory for your application, install Luigi, make assets available, and start your local server:

```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/openui5.sh)
```
or execute these commands manually to get the same result:

<!-- accordion:start -->
### Click to expand
```bash
$ mkdir my-ui5-app && cd my-ui5-app
$ npm init -y
$ npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals
$ mkdir -p public/assets
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
$ sed 's/extendedConfiguration.bundle.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
$ curl https://raw.githubusercontent.com/SAP/openui5/master/src/sap.m/test/sap/m/demokit/tutorial/quickstart/01/webapp/index.html | sed 's/src="..\/..\/..\/..\/..\/..\/..\/..\/resources\/sap-ui-core.js"/src="https:\/\/openui5.hana.ondemand.com\/resources\/sap-ui-core.js"/g' > public/ui5.html
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > public/assets/sampleconfig.js
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html
$ cp -r node_modules/\@kyma-project/luigi-* public
$ live-server --entry-file=index.html public
```
<!-- accordion:end -->

3. Open the folder where Luigi is installed. Navigate to the `public/assets` directory. The JavaScript file(s) in this folder can be used to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-setting.md) and more.


## Application setup for VUE.JS

<!-- add-attribute:class:warning -->
> **NOTE:** The VUE CLI is a prerequisite for this example.

1. If you do not have VUE CLI installed, use this command to install it.

```bash
npm install -g @vue/cli
```

2. Use the installer to create your application, install Luigi, make assets available, and serve your application:
```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/vue.sh)
```
or execute these commands manually to get the same result:

<!-- accordion:start -->
### Click to expand
```bash
$ vue create -d my-original-vue-app && cd my-original-vue-app
$ npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals
$ mkdir -p public/assets
$ mv public/index.html public/vue.html
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/public/index.html > public/index.html
$ sed 's/luigi-config.js/assets\/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > public/assets/sampleconfig.js
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html
$ echo "const webpack=require('webpack');const CopyWebpackPlugin=require('copy-webpack-plugin');module.exports={pages:{sampleapp:{entry:'src/main.js',template:'public/vue.html',filename:'vue.html'}},lintOnSave:true,runtimeCompiler:true,outputDir:'dist',configureWebpack:{plugins:[new CopyWebpackPlugin([{context:'public',to:'index.html',from:'index.html'},{context:'node_modules/@kyma-project/luigi-core',to:'./luigi-core',from:{glob:'**',dot:true}},{context:'node_modules/@kyma-project/luigi-client',to:'./luigi-client',from:{glob:'**',dot:true}}],{ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'})]}};" > vue.config.js
$ npm run serve
```
<!-- accordion:end -->

3. Open the folder where Luigi is installed. Navigate to the `my-original-vue-app/public/assets` directory. The JavaScript file(s) in this folder can be used to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-setting.md) and more.

## Application setup for React

1. Use the installer to create your application, install Luigi, make assets available, and serve your application:
```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/react.sh)
```
or execute these commands manually to get the same result:

<!-- accordion:start -->
### Click to expand
```bash
$ npx create-react-app my-react-app && cd my-react-app
$ echo yes | npm run eject
$ npm i -P @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals react-router-dom
$ npm i copy-webpack-plugin --save-dev
$ sed "s/const HtmlWebpackPlugin = require('html-webpack-plugin');/const HtmlWebpackPlugin = require('html-webpack-plugin');const CopyWebpackPlugin = require('copy-webpack-plugin');/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
$ sed "s/new HtmlWebpackPlugin(/new CopyWebpackPlugin([{context: 'public', to: 'index.html', from: 'index.html'  },{context: 'node_modules\/@kyma-project\/luigi-core',to: '.\/luigi-core',from: {glob: '**',dot: true}}],{ignore: ['.gitkeep', '**\/.DS_Store', '**\/Thumbs.db'],debug: 'warning'}),new HtmlWebpackPlugin(/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
$ sed "s/template: paths.appHtml,/template: paths.appHtml, filename: 'sampleapp.html',/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
$ sed "s/public\/index.html/public\/sampleapp.html/g" config/paths.js > config/paths.tmp.js && mv config/paths.tmp.js config/paths.js
$ sed "s/publicUrl + '\/index.html',/publicUrl + '\/sampleapp.html',/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
$ sed "s/const isWsl = require('is-wsl');//g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
$ sed "s/!isWsl/true/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
$ mv public/index.html public/react.html
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/index.html > public/index.html
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/logo.png > public/logo.png
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/sampleapp.html > public/sampleapp.html
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/luigi-config.js > public/luigi-config.js
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/index.js > src/index.js
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/index.css > src/index.css
$ mkdir src/views
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/home.js > src/views/home.js
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/sample1.js > src/views/sample1.js
$ curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/sample2.js > src/views/sample2.js
$ npm start
```
<!-- accordion:end -->

2. Open the directory where Luigi is installed. Navigate to the `public` folder. The JavaScript file(s) in this folder can be used to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-setting.md) and more.
