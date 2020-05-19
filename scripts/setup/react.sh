#!/usr/bin/env bash
echo ""
echo "Installing Luigi with React specification"
echo ""
if [[ "$1" = "" ]]; then
  read -p "Luigi project folder name: " folder
else
  folder=$1
  echo "Luigi project folder name: $folder"
fi

# create sample react app
npx create-react-app $folder && cd $folder

# eject project to customize webpack configs
echo yes | npm run eject

# install dependencies
npm i -P @luigi-project/core @luigi-project/client fundamental-styles @sap-theming/theming-base-content react-router-dom
npm i copy-webpack-plugin@5 webpack webpack-cli @babel/core @babel/preset-env babel-loader --save-dev

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