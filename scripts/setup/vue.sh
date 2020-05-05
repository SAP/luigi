#!/usr/bin/env bash
if ! command -v vue 2>/dev/null; then
  echo "Vue CLI required, please install it globally and try again."
  echo "npm i -g @vue/cli"
  exit 1;
fi

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
vue create -d $folder && cd $folder

vue create -d my-original-vue-app && cd my-original-vue-app
npm i @luigi-project/core @luigi-project/client fundamental-styles
npm i -D @sap-theming/theming-base-content webpack webpack-cli @babel/core @babel/preset-env babel-loader
mkdir -p public/assets
mkdir -p src/luigi-config
mv public/index.html public/vue.html

# download assets
curl http://localhost:8000/assets/index.html > public/index.html
curl http://localhost:8000/assets/luigi-config.es6.js > src/luigi-config/luigi-config.es6.js
curl http://localhost:8000/assets/basicMicroFrontend.html > public/assets/basicMicroFrontend.html
# curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/index.html > public/index.html
# curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/luigi-config.es6.js > src/luigi-config/luigi-config.es6.js
# curl https://raw.githubusercontent.com/SAP/luigi/master/scripts/setup/assets/basicMicroFrontend.html > public/assets/basicMicroFrontend.html

echo "const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  pages: {
    sampleapp: {
      entry:'src/main.js',
      template:'public/vue.html',filename:'vue.html'
    }
  },
  lintOnSave:true,
  runtimeCompiler:true,
  outputDir:'dist',
  configureWebpack: {
    plugins:[
      new CopyWebpackPlugin(
        [
          {context:'public',to:'index.html',from:'index.html'},
          {context:'node_modules/@luigi-project/core',to:'./luigi-core',from:{glob:'**',dot:true}},
          {context:'node_modules/@luigi-project/client',to:'./luigi-client',from:{glob:'**',dot:true}}
        ],
        {ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'}
      )]
    }
  };" > vue.config.js

npm run serve
