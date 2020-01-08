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
      './node_modules/fundamental-styles/dist/root.css',
      './node_modules/fundamental-styles/dist/fonts.css',
      './node_modules/fundamental-styles/dist/icon.css',
      './node_modules/fundamental-styles/dist/layout.css',
      './node_modules/fundamental-styles/dist/alert.css',
      './node_modules/fundamental-styles/dist/action-bar.css',
      //'./node_modules/fundamental-styles/dist/asset-upload.css',
      //'./node_modules/fundamental-styles/dist/badge.css',
      './node_modules/fundamental-styles/dist/popover.css',
      //'./node_modules/fundamental-styles/dist/busy-indicator.css',
      './node_modules/fundamental-styles/dist/button.css',
      //'./node_modules/fundamental-styles/dist/button-group.css',
      //'./node_modules/fundamental-styles/dist/button-split.css',
      //'./node_modules/fundamental-styles/dist/breadcrumb.css',
      //'./node_modules/fundamental-styles/dist/calendar.css',
      // './node_modules/fundamental-styles/dist/checkbox.css',
      // './node_modules/fundamental-styles/dist/radio.css',
      './node_modules/fundamental-styles/dist/counter.css',
      //'./node_modules/fundamental-styles/dist/dropdown.css',
      //'./node_modules/fundamental-styles/dist/fieldset.css',
      //'./node_modules/fundamental-styles/dist/form-group.css',
      //'./node_modules/fundamental-styles/dist/form-item.css',
      //'./node_modules/fundamental-styles/dist/form-label.css',
      //'./node_modules/fundamental-styles/dist/form-message.css',
      //'./node_modules/fundamental-styles/dist/form-select.css',
      './node_modules/fundamental-styles/dist/identifier.css',
      //'./node_modules/fundamental-styles/dist/image.css',
      //'./node_modules/fundamental-styles/dist/inline-help.css',
      //'./node_modules/fundamental-styles/dist/input.css',
      // './node_modules/fundamental-styles/dist/textarea.css',
      //'./node_modules/fundamental-styles/dist/label.css',
      //'./node_modules/fundamental-styles/dist/layout-grid.css',
      //'./node_modules/fundamental-styles/dist/link.css',
      //'./node_modules/fundamental-styles/dist/list.css',
      //'./node_modules/fundamental-styles/dist/list-group.css',
      //'./node_modules/fundamental-styles/dist/localization-editor.css',
      './node_modules/fundamental-styles/dist/menu.css',
      './node_modules/fundamental-styles/dist/modal.css',
      //'./node_modules/fundamental-styles/dist/multi-input.css',
      //'./node_modules/fundamental-styles/dist/nav.css',
      //'./node_modules/fundamental-styles/dist/notification.css',
      './node_modules/fundamental-styles/dist/page.css',
      //'./node_modules/fundamental-styles/dist/pagination.css',
      //'./node_modules/fundamental-styles/dist/panel.css',
      //'./node_modules/fundamental-styles/dist/tile.css',
      //'./node_modules/fundamental-styles/dist/product-tile.css',
      './node_modules/fundamental-styles/dist/product-switch.css',
      //'./node_modules/fundamental-styles/dist/section.css',
      // './node_modules/fundamental-styles/dist/select.css',
      './node_modules/fundamental-styles/dist/side-nav.css',
      './node_modules/fundamental-styles/dist/spinner.css',
      // './node_modules/fundamental-styles/dist/status-label.css',
      //'./node_modules/fundamental-styles/dist/table.css',
      //'./node_modules/fundamental-styles/dist/tree.css',
      './node_modules/fundamental-styles/dist/tabs.css',
      //'./node_modules/fundamental-styles/dist/time.css',
      // './node_modules/fundamental-styles/dist/toggle.css',
      //'./node_modules/fundamental-styles/dist/token.css',
      //'./node_modules/fundamental-styles/dist/input-group.css',
      './node_modules/fundamental-styles/dist/shellbar.css',
      './node_modules/fundamental-styles/dist/helpers.css',

      './node_modules/@babel/polyfill/dist/polyfill.js',
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
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
