const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fileMap = {
  'luigi-client': 'LuigiClient',
  'luigi-element': 'LuigiElement'
};

module.exports = {
  entry: {
    'luigi-client': './src/luigi-client.ts',
    'luigi-element': './src/luigi-element.ts'
  },
  output: {
    filename: '[name].js',
    library: {
      export: 'default',
      name: fileMap['[name]'],
      type: 'umd'
    },
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'luigi-client.d.ts',
          to: '.'
        },
        {
          from: 'luigi-element.d.ts',
          to: '.'
        }
      ]
    })
  ],
  devtool: 'source-map',
  stats: {
    errorDetails: true
  }
};
