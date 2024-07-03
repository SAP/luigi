const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'luigi-client': './src/luigi-client.ts',
    'luigi-element': './src/luigi-element.ts'
  },
  output: {
    filename: '[name].js',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'public')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
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
      }
    ])
  ],
  devtool: 'source-map',
  stats: {
    errorDetails: true
  }
};
