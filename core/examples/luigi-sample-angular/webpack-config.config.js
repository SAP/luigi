const path = require('path');

module.exports = {
  target: 'web',
  entry: {
    basicConfiguration: './src/luigi-config/basicConfiguration.js',
    extendedConfiguration: './src/luigi-config/extendedConfiguration.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src', 'assets')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
