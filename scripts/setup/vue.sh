#!/usr/bin/env bash

set -x 
SCRIPT_DIR="$(dirname "$0")"
echo "2222222222222222222222222222222222222       vue.sh"
if ! command -v vue 2>/dev/null; then
  echo "Vue CLI required, please install it globally and try again."
  echo "npm i -g @vue/cli"
  exit 1;
fi

echo ""
echo "222222222222222222222222222222222 Installing Luigi with static files and basic configuration"
echo ""
if [[ "$1" = "" ]]; then
  read -p "Luigi project folder name: " folder
else
  folder=$1
  echo "Luigi project folder name: $folder"
fi

echo "22222222222222222222222222# create sample vue app"
vue create -d $folder && cd $folder

echo "22222222222222222222222222# install dependencies"
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/package.json > package.json
npm i

mkdir -p src/views src/router 

echo "22222222222222222222222222# cleanup default installation"
rm public/index.html src/app.vue # remove default index, will be replaced with example assets
rm -rf src/components

echo "22222222222222222222222222# set scripts"
echo "const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  chainWebpack: config => {
    config.resolve.symlinks(false)
  },
  pages: {
    sampleapp: {
      entry: 'src/main.js',
      template: 'public/sampleapp.html',
      filename: 'sampleapp.html'
    }
  },
  runtimeCompiler: true,
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            context: 'public',
            to: 'index.html',
            from: 'index.html'
          },
          {
            from: 'node_modules/@luigi-project/core',
            to: './luigi-core',
          }
        ]
      }),
    ]
  }
};" > vue.config.js


echo "22222222222222222222222222# fetch assets from vue example"
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/index.html > "$SCRIPT_DIR/index.html"
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/public/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/public/sampleapp.html > public/sampleapp.html
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/src/app.vue > src/app.vue
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/src/main.js > src/main.js
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/public/luigi-config.js > public/luigi-config.js

curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/src/router/index.js > src/router/index.js

curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/src/views/home.vue > src/views/home.vue
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/src/views/sample1.vue > src/views/sample1.vue
curl https://raw.githubusercontent.com/SAP/luigi/main/core/examples/luigi-example-vue/src/views/sample2.vue > src/views/sample2.vue

echo "22222222222222222222222222# generic assets"

npm run build
npm run serve

set +x 