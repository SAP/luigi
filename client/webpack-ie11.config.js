const path = require('path');
module.exports = {
  entry: {
    luigiClient: './src/luigi-client.js'
  },

  output: {
    filename: 'luigi-client-ie11.js',
    libraryExport: 'default',
    library: 'LuigiClientLegacy',
    libraryTarget: 'umd',
    path: path.resolve(__dirname)
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'root'
          }
        }
      }
    ]
  }
};
