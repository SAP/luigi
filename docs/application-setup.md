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

<iframe width="560" height="315" src="https://www.youtube.com/embed/kEzTZ2U9KMM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

1. Use the following installer to create a directory for your application, install Luigi, make assets available, and start your local server:

```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/no-framework.sh)
```
or execute these commands manually to get the same result:
<!-- accordion:start -->
### Click to expand
```bash
mkdir my-new-app && cd my-new-app

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

```
<!-- accordion:end -->

2. Open the directory where Luigi is installed. Search for the `luigi-config.js` file which you can use to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-settings.md) and more.

## Application setup for Angular

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
```
<!-- accordion:end -->

3. Open the directory where Luigi is installed. Search for the `luigi-config.js` file which you can use to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-settings.md) and more.

## Application setup for SAPUI5/OpenUI5

1. Use the installer to create a directory for your application, install Luigi, make assets available, and start your local server:

```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/openui5.sh)
```
or execute these commands manually to get the same result:

<!-- accordion:start -->
### Click to expand
```bash
mkdir my-ui5-app && cd my-ui5-app
npm init -y
echo "Creating folders and downloading example assets"
mkdir -p ./webapp/home ./webapp/libs ./webapp/sample1 ./webapp/sample2 ./webapp/i18n

export UI5EX_REPO_URL="https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-openui5"

curl --silent $UI5EX_REPO_URL/webapp/sample2/Sample2.view.xml > ./webapp/sample2/Sample2.view.xml
curl --silent $UI5EX_REPO_URL/webapp/sample2/sample2.html > ./webapp/sample2/sample2.html
curl --silent $UI5EX_REPO_URL/webapp/sample2/index.js > ./webapp/sample2/index.js
curl --silent $UI5EX_REPO_URL/webapp/sample2/Sample2.controller.js > ./webapp/sample2/Sample2.controller.js
curl --silent $UI5EX_REPO_URL/webapp/home/Home.view.xml > ./webapp/home/Home.view.xml
curl --silent $UI5EX_REPO_URL/webapp/home/Home.controller.js > ./webapp/home/Home.controller.js
curl --silent $UI5EX_REPO_URL/webapp/favicon.ico > ./webapp/favicon.ico
curl --silent $UI5EX_REPO_URL/webapp/index.html > ./webapp/index.html
curl --silent $UI5EX_REPO_URL/webapp/luigi-config.js > ./webapp/luigi-config.js
curl --silent $UI5EX_REPO_URL/webapp/openui5.html > ./webapp/openui5.html
curl --silent $UI5EX_REPO_URL/webapp/libs/.gitignore > ./webapp/libs/.gitignore
curl --silent $UI5EX_REPO_URL/webapp/Component.js > ./webapp/Component.js
curl --silent $UI5EX_REPO_URL/webapp/sample1/index.js > ./webapp/sample1/index.js
curl --silent $UI5EX_REPO_URL/webapp/sample1/Sample1.controller.js > ./webapp/sample1/Sample1.controller.js
curl --silent $UI5EX_REPO_URL/webapp/sample1/sample1.html > ./webapp/sample1/sample1.html
curl --silent $UI5EX_REPO_URL/webapp/sample1/Sample1.view.xml > ./webapp/sample1/Sample1.view.xml
curl --silent $UI5EX_REPO_URL/webapp/logo.png > ./webapp/logo.png
curl --silent $UI5EX_REPO_URL/webapp/manifest.json > ./webapp/manifest.json
curl --silent $UI5EX_REPO_URL/webapp/i18n/i18n_en.properties > ./webapp/i18n/i18n_en.properties
curl --silent $UI5EX_REPO_URL/webapp/i18n/i18n.properties > ./webapp/i18n/i18n.properties
curl --silent $UI5EX_REPO_URL/ui5.yaml > ./ui5.yaml
curl --silent $UI5EX_REPO_URL/README.md > ./README.md
curl --silent $UI5EX_REPO_URL/.gitignore > ./.gitignore
curl --silent $UI5EX_REPO_URL/package-lock.json > ./package-lock.json
curl --silent $UI5EX_REPO_URL/package.json > ./package.json

npm i
npm run build
npm run start
```
<!-- accordion:end -->

2. Open the directory where Luigi is installed. Open the `webapp/luigi-config.js` file which you can use to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-settings.md) and more.


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
vue create -d my-vue-app && cd my-vue-app
npm i vue-router vuex @luigi-project/core @luigi-project/client fundamental-styles @sap-theming/theming-base-content
npm i -D sass-loader node-sass webpack webpack-cli @babel/core @babel/preset-env babel-loader

mkdir -p src/luigi-config src/assets/scss src/views public/assets

# cleanup default installation
rm public/index.html src/app.vue # remove default index, will be replaced with example assets
rm -rf src/components

echo "@import '~fundamental-styles/dist/fundamental-styles.css';
" > src/assets/scss/style.scss

# fetch assets from vue example
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/public/sampleapp.html > public/sampleapp.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/app.vue > src/app.vue
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/main.js > src/main.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/router.js > src/router.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/store.js > src/store.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/views/home.vue > src/views/home.vue
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/views/sample1.vue > src/views/sample1.vue
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/views/sample2.vue > src/views/sample2.vue
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/public/luigi-config.js > src/luigi-config/luigi-config.es6.js

# generic assets
curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/index.html > public/index.html


# set scripts
sed 's/"scripts": {/"scripts": {\
  \  "buildConfig":"webpack --entry .\/src\/luigi-config\/luigi-config.es6.js -o .\/public\/assets\/luigi-config.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json


echo "const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  pages: {
    sampleapp: {
      entry: 'src/main.js',
      template: 'public/sampleapp.html',
      filename: 'sampleapp.html'
    }
  },
  lintOnSave:true,
  runtimeCompiler: true,
  outputDir: 'dist',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['css-loader']
        },
        {
          test: /\.scss$/,
          use: ['sass-loader']
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin(
        [
          {context:'public',to:'index.html',from:'index.html'},
          {context:'node_modules/@luigi-project/core',to:'./luigi-core',from:{glob:'**',dot:true}},
          {context:'node_modules/@luigi-project/client',to:'./luigi-client',from:{glob:'**',dot:true}},
          {
            from: 'node_modules/fundamental-styles/dist',
            to: './fundamental-styles'
          },
          {
            from: 'node_modules/@sap-theming/theming-base-content',
            to: './fonts'
          }
        ],
        {ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'}
      )]
    }
  };" > vue.config.js

npm run buildConfig

npm run serve
```
<!-- accordion:end -->

3. Open the directory where Luigi is installed. Search for the `luigi-config.js` file you can use to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-settings.md) and more.

## Application setup for React

1. Use the installer to create your application, install Luigi, make assets available, and serve your application:
```bash
bash <(curl -s https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/react.sh)
```
or execute these commands manually to get the same result:

<!-- accordion:start -->
### Click to expand
```bash
npx create-react-app my-react-app && cd my-react-app

# eject project to customize webpack configs
echo yes | npm run eject


# install dependencies
npm i -P @luigi-project/core @luigi-project/client fundamental-styles @sap-theming/theming-base-content react-router-dom
npm i copy-webpack-plugin webpack webpack-cli @babel/core @babel/preset-env babel-loader --save-dev

# replace strings in some places
sed "s/const HtmlWebpackPlugin = require('html-webpack-plugin');/const HtmlWebpackPlugin = require('html-webpack-plugin');const CopyWebpackPlugin = require('copy-webpack-plugin');/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/new HtmlWebpackPlugin(/new CopyWebpackPlugin([\
  {context: 'public', to: 'index.html', from: 'index.html'  },\
  {context: 'node_modules\/@luigi-project\/core',to: '.\/luigi-core',from: {glob: '**',dot: true}}],\
  {ignore: ['.gitkeep', '**\/.DS_Store', '**\/Thumbs.db'],debug: 'warning'\
  }),\
  new HtmlWebpackPlugin(/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/template: paths.appHtml,/template: paths.appHtml,\
  filename: 'sampleapp.html',/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/public\/index.html/public\/sampleapp.html/g" config/paths.js > config/paths.tmp.js && mv config/paths.tmp.js config/paths.js
sed "s/publicUrl + '\/index.html',/publicUrl + '\/sampleapp.html',/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/const isWsl = require('is-wsl');//g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/!isWsl/true/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js

sed 's/"scripts": {/"scripts": {\
\    "buildConfig":"webpack --entry .\/src\/luigi-config\/luigi-config.es6.js -o .\/public\/luigi-config.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json

# downloads
mkdir -p src/luigi-config
mv public/index.html public/react.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/sampleapp.html > public/sampleapp.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/luigi-config.js > src/luigi-config/luigi-config.es6.js


# add index.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/index.js > src/index.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/index.css > src/index.css

# add views
mkdir src/views
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/home.js > src/views/home.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/sample1.js > src/views/sample1.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/sample2.js > src/views/sample2.js

npm i
npm run buildConfig
npm start
```
<!-- accordion:end -->

2. Open the directory where Luigi is installed. Search for the `luigi-config.js` file which you can use to configure Luigi [navigation](navigation-configuration.md), [authorization](authorization-configuration.md), [general settings](general-settings.md) and more.