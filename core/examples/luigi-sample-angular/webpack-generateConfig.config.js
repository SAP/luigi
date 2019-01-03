const path = require('path');
const webpack = require('webpack');

module.exports = {
  watch: true,
  mode: 'production',
  entry: {
    generatedLuigiConfig: './src/assets/luigi-config/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/assets')
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Don't be afraid!
      This file was automatically generated and you should not modify it.
      Go to 'luigi-config' folder and modify Luigi configuration there with a pleasure.
      `
    })
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
