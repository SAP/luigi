const path = require('path');
const { readFileSync } = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const babelSettings = JSON.parse(readFileSync('.babelrc'));

module.exports = {
  entry: {
    luigiClient: './src/luigi-client.js'
  },

  output: {
    filename: 'luigi-client.js',
    libraryExport: 'default',
    library: 'LuigiClient',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'public')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelSettings
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'luigi-client.d.ts',
        to: '.'
      },
      {
        from: 'luigi-element.d.ts',
        to: '.'
      },
      {
        from: 'src/luigi-element.js',
        to: '.'
      }
    ])
  ],
  devtool: 'source-map'
};
