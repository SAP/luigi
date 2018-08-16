---
title: Getting Started with luigi
type: CLI reference
---

## Overview

Prior to the implementation of luigi, you need to set up your application. This document shows you how to set up a web application using the luigi microfrontend framework.

## Application setup steps

To integrate luigi into your web applications:

1. Add luigi npm packages to your project dependencies. 
2. Give luigi exclusive control over the entry file (index.html). This means that if you have a single page application, you should transfer it to a two page application. After that, make sure the existing router doesn't interfer.
3. Define your luigi configuration.
4. Start your server to run the application.

### Command examples

The examples on this page demonstrate commands that perform each of the necessary steps to set up your application. Each set of commands appears grouped by the framework on which you execute it.

### Application setup for an application not using a framework

> Note: Live Server must be installed as your development server.

1. If you do not have Live Server installed, use this command to install it.

````
npm install -g live-server
````

2. Use the following commands to create a directory for your application, install luigi, make assets available, and start your local server.

````
$ mkdir my-plain-app && cd my-plain-app
$ npm init -y
$ npm i -S @kyma-project/luigi-core@0.2.1 @kyma-project/luigi-client@0.2.1
$ mkdir -p public/assets
$ curl https://raw.githubusercontent.com/kyma-project/luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
$ curl https://raw.githubusercontent.com/kyma-project/luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/temp.html
$ echo "LuigiConfig={navigation: {nodes: () => [{pathSegment:'home',label:'Home',children:[{pathSegment:'hw',label:'Hello World\!',viewUrl:'/assets/temp.html'}]}]}}" > public/assets/sampleconfig.js
$ cp -r node_modules/\@kyma-project/luigi-* public
$ live-server --entry-file=index.html public

````

### Application setup for Angular 6

> The Angular CLI is a prerequisite for this example.

1. If you do not have the Angular CLI installed, download and install it from [this URL](https://cli.angular.io/).

2. Use the following commands to create your application, install luigi, make assets available, and serve your application.

````
$ ng new my-dream-app --routing && cd my-dream-app
$ npm i -S @kyma-project/luigi-core@0.2.1 @kyma-project/luigi-client@0.2.1
$ mv src/index.html src/angular.html
$ curl https://raw.githubusercontent.com/kyma-project/luigi/master/core/examples/luigi-sample-angular/src/index.html > src/index.html
$ echo "LuigiConfig={navigation: {nodes: () => [{pathSegment:'home',label:'Home',children:[{pathSegment:'hw',label:'Hello World\!',viewUrl:'/angular.html'}]}]}}" > src/assets/sampleconfig.js
$ sed 's/"src\/index.html"/"src\/angular.html"/g' angular.json > tmp.json && mv tmp.json angular.json
$ sed 's/"src\/assets"/"src\/assets","src\/index.html",{"glob": "**","input": "node_modules\/@kyma-project\/luigi-core", "output": "\/luigi-core"},{"glob": "**","input": "node_modules\/@kyma-project\/luigi-client","output": "\/luigi-client"}/g' angular.json > tmp.json && mv tmp.json angular.json
$ ng serve

````

### Application setup for SAPUI5/OpenUI5

> Note: Live Server must be installed as your development server.

1. If you do not have Live Server installed, use this command to install it.

````
npm install -g live-server
````

2. Use the following commands to create a directory for your application, install luigi, make assets available, and start your local server.

````
$ mkdir my-ui5-app && cd my-ui5-app
$ npm init -y
$ npm i -S @kyma-project/luigi-core@0.2.1 @kyma-project/luigi-client@0.2.1
$ mkdir -p public/assets
$ curl https://raw.githubusercontent.com/kyma-project/luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
$ curl https://raw.githubusercontent.com/SAP/openui5/master/src/sap.m/test/sap/m/demokit/helloworld/index.html  | sed 's/src="..\/..\/..\/..\/..\/resources\/sap-ui-core.js"/src="https:\/\/openui5.hana.ondemand.com\/resources\/sap-ui-core.js"/g' > public/ui5.html
$ echo "LuigiConfig={navigation: {nodes: () => [{pathSegment:'home',label:'Home',children:[{pathSegment:'hw',label:'Hello World\!',viewUrl:'/ui5.html'}]}]}}" > public/assets/sampleconfig.js
$ cp -r node_modules/\@kyma-project/luigi-* public
$ live-server --entry-file=index.html public

````

### Application setup for VUE.JS

> The VUE CLI is a prerequisite for this example.

1. If you do not have Live Server installed, use this command to install it.

````
npm install -g @vue/cli
````

2. Use the following commands to create a directory for your application, install luigi, make assets available, and start your local server.

````
$ vue create -d my-vue-app && cd my-vue-app
$ npm i -S @kyma-project/luigi-core@0.2.1 @kyma-project/luigi-client@0.2.1
$ mkdir -p public/assets
$ mv public/index.html public/vue.html
$ curl https://raw.githubusercontent.com/kyma-project/luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
$ echo "LuigiConfig={navigation: {nodes: () => [{pathSegment:'home',label:'Home',children:[{pathSegment:'hw',label:'Hello World\!',viewUrl:'/vue.html'}]}]}}" > public/assets/sampleconfig.js
$ echo "const webpack=require('webpack');const CopyWebpackPlugin=require('copy-webpack-plugin');module.exports={pages:{sampleapp:{entry:'src/main.js',template:'public/vue.html',filename:'vue.html'}},lintOnSave:true,runtimeCompiler:true,outputDir:'dist',configureWebpack:{plugins:[new CopyWebpackPlugin([{context:'public',to:'index.html',from:'index.html'},{context:'node_modules/@kyma-project/luigi-core',to:'./luigi-core',from:{glob:'**',dot:true}},{context:'node_modules/@kyma-project/luigi-client',to:'./luigi-client',from:{glob:'**',dot:true}}],{ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'})]}};" > vue.config.js
$ npm run serve
````