const path = require('path');
const webpack = require('webpack');

module.exports = {
  watch: true,
  mode: 'production',
  entry: {
    generatedExtendedConfig: './src/assets/luigi-config/extended/main.js',
    generatedBasicConfig:
      './src/assets/luigi-config/basic/basicConfiguration.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/assets')
  },
  plugins: [
    new webpack.BannerPlugin(
      `
      Don't be afraid!
      This file was automatically generated and you should not modify it.
      Go to 'luigi-config' folder and modify Luigi configuration there with a pleasure.
      `
    )
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          rootMode: 'root'
        }
      }
    ]
  }
};
