const path = require('path');
const glob = require('glob');
const { readFileSync } = require('fs');

const babelSettings = JSON.parse(readFileSync('.babelrc'));

module.exports = {
  entry: glob.sync('./src/**/index.js').reduce((acc, path) => {
    const entry = path.replace('/index.js', '').replace('./src/', '');
    acc[entry] = path;
    return acc;
  }, {}),

  output: {
    filename: './[name]/plugin.js',
    libraryExport: 'default',
    library: 'LuigiPlugin-[name]',
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
  }
};
