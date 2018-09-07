const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,

      use: [{
        loader: 'style-loader',

        options: {
          sourceMap: true
        }
      }, {
        loader: 'css-loader'
      }]
    }]
  },

  entry: './src/example.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  mode: 'development',
  plugins: [
    new CopyWebpackPlugin(
      [{from: 'src', ignore: ['!*.html']}]
    )],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*' //add this header to allow include locally hosted file in any website
    }
  }
}
