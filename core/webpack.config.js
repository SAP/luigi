const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const commonRules = require('./webpack-common-rules');
const commonPlugins = require('./webpack-common-plugins');
const exec = require('child_process').exec;

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
    luigi: [
      './node_modules/fiori-fundamentals/dist/fonts.min.css',
      './node_modules/fiori-fundamentals/dist/icons.min.css',
      './node_modules/fiori-fundamentals/dist/core.min.css',
      './node_modules/fiori-fundamentals/dist/layout.min.css',

      //fiori fundamentals components
      './node_modules/fiori-fundamentals/dist/components/alert.min.css',
      './node_modules/fiori-fundamentals/dist/components/action-bar.min.css',
      // './node_modules/fiori-fundamentals/dist/components/badge.min.css',
      './node_modules/fiori-fundamentals/dist/components/button.min.css',
      // './node_modules/fiori-fundamentals/dist/components/breadcrumb.min.css',
      // './node_modules/fiori-fundamentals/dist/components/dropdown.min.css',
      './node_modules/fiori-fundamentals/dist/components/form.min.css',
      // './node_modules/fiori-fundamentals/dist/components/input-group.min.css',
      // './node_modules/fiori-fundamentals/dist/components/label.min.css',
      // './node_modules/fiori-fundamentals/dist/components/pagination.min.css',
      // './node_modules/fiori-fundamentals/dist/components/table.min.css',
      './node_modules/fiori-fundamentals/dist/components/tabs.min.css',
      './node_modules/fiori-fundamentals/dist/components/modal.min.css',
      // './node_modules/fiori-fundamentals/dist/components/tree.min.css',
      './node_modules/fiori-fundamentals/dist/components/list-group.min.css',
      // './node_modules/fiori-fundamentals/dist/components/inline-help.min.css',
      // './node_modules/fiori-fundamentals/dist/components/nav.min.css',
      './node_modules/fiori-fundamentals/dist/components/toggle.min.css',
      './node_modules/fiori-fundamentals/dist/components/spinner.min.css',
      // './node_modules/fiori-fundamentals/dist/components/image.min.css',
      './node_modules/fiori-fundamentals/dist/components/global-nav.min.css',
      './node_modules/fiori-fundamentals/dist/components/side-nav.min.css',
      // './node_modules/fiori-fundamentals/dist/components/link.min.css',
      './node_modules/fiori-fundamentals/dist/components/identifier.min.css',
      // './node_modules/fiori-fundamentals/dist/components/mega-menu.min.css',
      './node_modules/fiori-fundamentals/dist/components/menu.min.css',
      // './node_modules/fiori-fundamentals/dist/components/button-group.min.css',
      // './node_modules/fiori-fundamentals/dist/components/tile.min.css',
      // './node_modules/fiori-fundamentals/dist/components/product-tile.min.css',
      // './node_modules/fiori-fundamentals/dist/components/tile-grid.min.css',
      // './node_modules/fiori-fundamentals/dist/components/token.min.css',
      // './node_modules/fiori-fundamentals/dist/components/panel-grid.min.css',
      './node_modules/fiori-fundamentals/dist/components/panel.min.css',
      // './node_modules/fiori-fundamentals/dist/components/calendar.min.css',
      './node_modules/fiori-fundamentals/dist/components/status-label.min.css',
      './node_modules/fiori-fundamentals/dist/components/popover.min.css',
      // './node_modules/fiori-fundamentals/dist/components/date-picker.min.css',
      // './node_modules/fiori-fundamentals/dist/components/time.min.css',
      // './node_modules/fiori-fundamentals/dist/components/time-picker.min.css',
      // './node_modules/fiori-fundamentals/dist/components/localization-editor.min.css',
      // './node_modules/fiori-fundamentals/dist/components/combobox-input.min.css',
      // './node_modules/fiori-fundamentals/dist/components/search-input.min.css',
      // './node_modules/fiori-fundamentals/dist/components/multi-input.min.css',
      './node_modules/fiori-fundamentals/dist/components/product-switcher.min.css',
      './node_modules/fiori-fundamentals/dist/components/shellbar.min.css',
      './node_modules/fiori-fundamentals/dist/components/user-menu.min.css',
      './node_modules/fiori-fundamentals/dist/components/product-menu.min.css',
      './node_modules/fiori-fundamentals/dist/components/counter.min.css',

      './node_modules/fiori-fundamentals/dist/helpers.min.css',

      './node_modules/core-js/stable/index.js',
      './node_modules/regenerator-runtime/runtime.js',
      './src/main.js'
    ]
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
    commonPlugins.copyWebpackPlugin,
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
