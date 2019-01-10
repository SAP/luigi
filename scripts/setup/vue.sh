#!/bin/bash
echo ""
echo "Installing Luigi with Vue and basic configuration"
echo ""
read -p "Luigi project folder name: " folder
# steps to execute line by line
echo ""


vue create -d $folder && cd $folder
npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals webpack webpack-cli @babel/core @babel/preset-env babel-loader sass-loader

# add "start" command to the package.json file. This command is split into 2 lines on purpose!
sed 's/"scripts": {/"scripts": {\
\   "buildConfig":"webpack --entry .\/src\/luigi-config\/basic\/basicConfiguration.js -o .\/public\/assets\/sampleconfig.js --mode production",/1' package.json > p.tmp.json && mv p.tmp.json package.json

mkdir -p public/assets
mkdir -p src/luigi-config/basic

mv public/index.html public/vue.html
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
sed 's/extendedConfiguration.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/basicConfiguration.js > public/assets/sampleconfig.js
echo "const CopyWebpackPlugin=require('copy-webpack-plugin');module.exports={pages:{sampleapp:{entry:'src/main.js',template:'public/vue.html',filename:'vue.html'}},lintOnSave:true,runtimeCompiler:true,outputDir:'dist',configureWebpack:{plugins:[new CopyWebpackPlugin([{context:'public',to:'index.html',from:'index.html'},{context:'node_modules/@kyma-project/luigi-core',to:'./luigi-core',from:{glob:'**',dot:true}},{context:'node_modules/@kyma-project/luigi-client',to:'./luigi-client',from:{glob:'**',dot:true}}],{ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'})]}};" > vue.config.js

#curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-vue/src/app.vue > src/app.vue
#curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-vue/src/main.js > src/main.js
#sed 's/extendedConfiguration.js/sampleconfig.js/g' src/index.html > src/index.tmp.html && mv src/index.tmp.html src/index.html
#sed "s|import router from './router';||g" src/main.js > src/main.js.tmp && mv src/main.js.tmp src/main.js
#sed "s|import store from './store';||g" src/main.js > src/main.js.tmp && mv src/main.js.tmp src/main.js
#sed "s|import router from './router';||g" src/main.js > src/main.js.tmp && mv src/main.js.tmp src/main.js
#sed "s|import store from './store';||g" src/main.js > src/main.js.tmp && mv src/main.js.tmp src/main.js
#curl https://raw.githubusercontent.com/parostatkiem/luigi/Luigi-config-meets-ES6/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > src/luigi-config/basic/basicConfiguration.js
#echo "const webpack=require('webpack');const CopyWebpackPlugin=require('copy-webpack-plugin');module.exports={pages:{sampleapp:{entry:'src/main.js',template:'public/vue.html',filename:'vue.html'}},lintOnSave:true,runtimeCompiler:true,outputDir:'dist',configureWebpack:{plugins:[new CopyWebpackPlugin([{context:'public',to:'index.html',from:'index.html'},{context:'node_modules/@kyma-project/luigi-core',to:'./luigi-core',from:{glob:'**',dot:true}},{context:'node_modules/@kyma-project/luigi-client',to:'./luigi-client',from:{glob:'**',dot:true}}],{ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'})]}};" > vue.config.js

npm run serve