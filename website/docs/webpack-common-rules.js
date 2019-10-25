const { readFileSync } = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('node-sass');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  babel: {
    test: /\.(html|js)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: JSON.parse(readFileSync('.babelrc'))
    }
  },
  css: {
    test: /\.(sa|sc|c)ss$/,
    use: [
      /**
        * MiniCssExtractPlugin doesn't support HMR.
        * For developing, use 'style-loader' instead.
        * */
      prod ? MiniCssExtractPlugin.loader : 'style-loader',
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      // Compiles Sass to CSS
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ]
  },
  urls: {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'url-loader',
    options: {
      limit: 50000
    }
  }
};
