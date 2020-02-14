const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const commonRules = require('./webpack-common-rules');
const commonPlugins = require('./webpack-common-plugins');
const exec = require('child_process').exec;
const fundamentalStyles = require('./fundamentalStyleClasses');

const luigifiles = [
  ...fundamentalStyles,
  './node_modules/core-js/stable/index.js',
  './node_modules/regenerator-runtime/runtime.js',
  './src/main.js'
];

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
      compiler.hooks.afterEmit.tap('Luigi Patch babel + terser', () =>
        exec(
          [
            'babel public/luigi.js --out-file public/luigi.babel.js --presets=@babel/preset-env --root . --root-mode upward --source-maps inline',
            `terser --compress --mangle --output public/luigi.js --source-map "content=inline" -- public/luigi.babel.js`,
            'rm -f public/luigi.babel.js'
          ].join(' && '),
          PatchLuigiPlugin.execHandler
        )
      );
    }
  }
}

module.exports = {
  entry: {
    luigi: luigifiles
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte', ',html'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    sourceMapFilename: '[name].svelte.map.js'
  },
  module: {
    rules: [commonRules.svelte, commonRules.css, commonRules.urls]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      exclude: ['package.json', 'README.md', 'luigi-ie11.css', 'luigi-ie11.js'],
      verbose: true
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new PatchLuigiPlugin(),
    process.env.ANALYZE == 'true' &&
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
        generateStatsFile: true
      })
  ].filter(f => !!f), // filter out disabled plugins (eg ANALYZE returns undefined if not active)
  stats: {
    warnings: false
  },
  devtool: 'inline'
};
