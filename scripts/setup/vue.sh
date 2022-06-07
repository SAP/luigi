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

# create sample vue app
vue create -d $folder && cd $folder

# install dependencies
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/package.json > package.json
npm i
# as soon as new package.json under vue example released this line can be removed
# npm i webpack-cli@4.2.0 node-sass@4.14.1

mkdir -p src/luigi-config src/assets/scss src/views public/assets

# cleanup default installation
rm public/index.html src/app.vue # remove default index, will be replaced with example assets
rm -rf src/components

echo "@import '~fundamental-styles/dist/fundamental-styles.css';
" > src/assets/scss/style.scss

# set scripts
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

echo "const path = require('path');
module.exports = {
    entry: './src/luigi-config/luigi-config.es6.js',
    output: {
        filename: 'luigi-config.js',
        path: path.resolve(__dirname, 'public'),
    },
};">webpack.config.js

sed 's/"scripts": {/"scripts": {\
\    "buildConfig":"webpack --config webpack.config.js",/1' package.json > p.tmp.json && mv p.tmp.json package.json

echo '{
    "globals": {
        "Luigi": "readonly"
    }
}'>.eslintrc.json

mkdir -p src/luigi-config

# fetch assets from vue example
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/public/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/public/sampleapp.html > public/sampleapp.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/app.vue > src/app.vue
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/main.js > src/main.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/public/luigi-config.js > src/luigi-config/luigi-config.es6.js

curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/router.js > src/router.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/store.js > src/store.js

curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/views/home.vue > src/views/home.vue
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/views/sample1.vue > src/views/sample1.vue
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-vue/src/views/sample2.vue > src/views/sample2.vue

# generic assets

npm run buildConfig
npm run serve
