const path = require('path');
module.exports = {
  entry: {
    luigiClient: './src/luigi-client.js'
  },

  output: {
    filename: 'luigi-client.bundle.js',
    libraryExport: 'default',
    library: 'LuigiClient',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'public')
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
