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

vue create -d $folder && cd $folder
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
