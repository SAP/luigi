#!/bin/bash
echo ""
echo "Installing Luigi with static files and basic configuration"
echo ""
read -p "Luigi project folder name: " folder
# steps to execute line by line
echo ""
vue create -d $folder && cd $folder

npm i -save @kyma-project/luigi-core @kyma-project/luigi-client fiori-fundamentals
mkdir -p public/assets
mv public/index.html public/vue.html
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/index.html > public/index.html
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/luigi-config/basic/basicConfiguration.js > public/assets/sampleconfig.js
curl https://raw.githubusercontent.com/kyma-project/Luigi/master/core/examples/luigi-sample-angular/src/assets/sampleexternal.html > public/assets/basicexternal.html
sed 's/extendedConfiguration.bundle.js/sampleconfig.js/g' public/index.html > public/index.tmp.html && mv public/index.tmp.html public/index.html
echo "const webpack=require('webpack');const CopyWebpackPlugin=require('copy-webpack-plugin');module.exports={pages:{sampleapp:{entry:'src/main.js',template:'public/vue.html',filename:'vue.html'}},lintOnSave:true,runtimeCompiler:true,outputDir:'dist',configureWebpack:{plugins:[new CopyWebpackPlugin([{context:'public',to:'index.html',from:'index.html'},{context:'node_modules/@kyma-project/luigi-core',to:'./luigi-core',from:{glob:'**',dot:true}},{context:'node_modules/@kyma-project/luigi-client',to:'./luigi-client',from:{glob:'**',dot:true}}],{ignore:['.gitkeep','**/.DS_Store','**/Thumbs.db'],debug:'warning'})]}};" > vue.config.js
npm run serve