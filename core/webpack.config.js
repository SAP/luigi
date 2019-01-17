const { readFileSync } = require('fs');
const babelSettings = JSON.parse(readFileSync('.babelrc'));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('node-sass');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: [
      './node_modules/fiori-fundamentals/dist/fiori-fundamentals.min.css',
      './src/main.js'
    ]
  },
  resolve: {
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.js', '.html']
  },
  output: {
    path: __dirname + '/public',
    filename: 'luigi.js',
    chunkFilename: 'luigi.[id].js'
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
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            name: 'Luigi',
            preprocess: {
              style: ({ content, attributes }) => {
                if (attributes.type !== 'text/scss') return;
                return new Promise((fulfil, reject) => {
                  sass.render(
                    {
                      data: content,
                      includePaths: ['src'],
                      sourceMap: true,
                      outFile: 'x' // this is necessary, but is ignored
                    },
                    (err, result) => {
                      if (err) return reject(err);

                      fulfil({
                        code: result.css.toString(),
                        map: result.map.toString()
                      });
                    }
                  );
                });
              }
            }
          }
        }
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 50000
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      exclude: ['package.json', 'README.md'],
      verbose: true
    }),
    new MiniCssExtractPlugin({ filename: 'luigi.css' }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/oidc-client/dist/oidc-client.min.js',
        to: 'auth/oidc/'
      },
      {
        from: 'src/auth/oauth2/callback.html',
        to: 'auth/oauth2/callback.html'
      },
      {
        from: 'src/auth/oidc/silent-callback.html',
        to: 'auth/oidc/silent-callback.html'
      }
    ])
  ],
  mode: 'production',
  stats: {
    warnings: false
  }
};
