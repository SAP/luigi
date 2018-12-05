const path = require('path');

module.exports = {
  target: 'web',
  entry: './config/extendedConfiguration.js',
  // mode: 'development',
  mode: 'production',
  output: {
    filename: 'extendedConfiguration.bundle.js',
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
            presets: [
              // "es2015",
              '@babel/preset-env'
            ]
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
