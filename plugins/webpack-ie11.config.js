const path = require('path');
const glob = require('glob');
const { readFileSync } = require('fs');

const babelSettings = JSON.parse(readFileSync('.babelrc-ie11'));

module.exports = {
  entry: glob.sync('./auth/**/index.js').reduce((acc, path) => {
    const entry = path.replace('/index.js', '').replace('./auth/src/', '');
    acc[entry] = path;
    return acc;
  }, {}),

  output: {
    filename: './[name]/plugin-ie11.js',
    libraryExport: 'default',
    library: 'LuigiPlugin-[name]-IE11',
    libraryTarget: 'umd',
    path: path.join(path.resolve(__dirname), 'auth', 'public')
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
  }
};
