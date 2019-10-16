const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonPlugins = require('./webpack-common-plugins');
const commonRules = require('./webpack-common-rules');
const exec = require('child_process').exec;

const env = process.env.NODE_ENV;

class PatchLuigiPlugin {
  constructor() {}
  static execHandler(err, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
      process.stdout.write(stdout);
    }

    if (stderr) {
      console.error(stderr);
      process.stderr.write(stderr);
    }

    if (err) {
      throw err;
    }
  }
  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.afterEmit.tap('Luigi Patch', () =>
        exec(
          'babel public/luigi-ie11.js --out-file public/luigi-ie11.js --presets=@babel/preset-env --root . --root-mode upward --minified',
          PatchLuigiPlugin.execHandler
        )
      );
    }
  }
}

module.exports = {
  devtool: 'false',
  entry: {
    'luigi-ie11': [
      './node_modules/@babel/polyfill/dist/polyfill.js',
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
      './node_modules/fiori-fundamentals/dist/fiori-fundamentals-ie11.min.css',
      './src/main.js'
    ]
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.svelte', '.html']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      commonRules.svelte,
      commonRules.css,
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'postcss-loader'
          }
        ]
      },
      commonRules.urls
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      exclude: ['package.json', 'README.md', 'luigi.css', 'luigi.js'],
      verbose: true
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    commonPlugins.copyWebpackPlugin,
    new PatchLuigiPlugin()
  ],
  stats: {
    warnings: false
  }
};
