#!/bin/bash
echo ""
echo "Installing Luigi with React specification"
echo ""
read -p "Luigi project folder name: " folder
echo "Creating luigified react app: " $folder

# create sample react app
npx create-react-app $folder && cd $folder

# eject project to customize webpack configs
echo yes | npm run eject

#install dependencies
npm i -P @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals react-router-dom
npm i copy-webpack-plugin --save-dev

# replace strings in some places
sed "s/const HtmlWebpackPlugin = require('html-webpack-plugin');/const HtmlWebpackPlugin = require('html-webpack-plugin');const CopyWebpackPlugin = require('copy-webpack-plugin');/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/new HtmlWebpackPlugin(/new CopyWebpackPlugin([{context: 'public', to: 'index.html', from: 'index.html'  },{context: 'node_modules\/@kyma-project\/luigi-core',to: '.\/luigi-core',from: {glob: '**',dot: true}}],{ignore: ['.gitkeep', '**\/.DS_Store', '**\/Thumbs.db'],debug: 'warning'}),new HtmlWebpackPlugin(/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/template: paths.appHtml,/template: paths.appHtml, filename: 'sampleapp.html',/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/public\/index.html/public\/sampleapp.html/g" config/paths.js > config/paths.tmp.js && mv config/paths.tmp.js config/paths.js
sed "s/publicUrl + '\/index.html',/publicUrl + '\/sampleapp.html',/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/const isWsl = require('is-wsl');//g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js
sed "s/!isWsl/true/g" config/webpack.config.js > config/webpack.config.tmp.js && mv config/webpack.config.tmp.js config/webpack.config.js

# downloads
mv public/index.html public/react.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/index.html > public/index.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/logo.png > public/logo.png
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/sampleapp.html > public/sampleapp.html
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/public/luigi-config/luigi-config.js > public/luigi-config/luigi-config.js

# add index.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/index.js > src/index.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/index.css > src/index.css

#add views
mkdir src/views
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/home.js > src/views/home.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/sample1.js > src/views/sample1.js
curl https://raw.githubusercontent.com/SAP/luigi/master/core/examples/luigi-example-react/src/views/sample2.js > src/views/sample2.js

npm i
npm start