const { readFileSync } = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const babelSettings = JSON.parse(readFileSync('.babelrc'));
const commonRules = require('./webpack-common-rules');
const commonPlugins = require('./webpack-common-plugins');

module.exports = {
  entry: {
    luigi: [
      // './node_modules/fiori-fundamentals/dist/fiori-fundamentals.min.css',

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
      // './node_modules/fiori-fundamentals/dist/components/tabs.min.css',
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

      './src/main.js'
    ]
  },
  resolve: {
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.js', '.html']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.(html|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: babelSettings
        }
      },
      {
        test: /\.(js)$/,
        include: /node_modules\/svelte/,
        use: {
          loader: 'babel-loader',
          query: babelSettings
        }
      },
      commonRules.svelte,
      commonRules.css,
      commonRules.urls
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      exclude: [
        'package.json',
        'README.md',
        'luigi-legacy.css',
        'luigi-legacy.js'
      ],
      verbose: true
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    commonPlugins.copyWebpackPlugin
  ],
  mode: 'production',
  stats: {
    warnings: false
  }
};
