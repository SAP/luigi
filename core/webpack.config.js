const { readFileSync } = require('fs');
const babelSettings = JSON.parse(readFileSync('.babelrc'));
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sass = require('node-sass');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/main.js']
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
                      includePaths: ['src', 'node_modules/fundamental-ui/scss'],
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
        use: ExtractTextPlugin.extract({
          fallback: 'file-loader',
          use: [{ loader: 'css-loader', options: { url: false } }]
        })
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
    new ExtractTextPlugin('luigi.css'),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/oidc-client/dist/oidc-client.min.js',
        to: 'auth/oidc/'
      },
      {
        context: 'node_modules/fundamental-ui/dist',
        to: 'fundamental-ui',
        from: {
          glob: 'SAP-icons.*'
        }
      },
      {
        from: 'node_modules/fundamental-ui/dist/fundamental-ui.min.css',
        to: 'fundamental-ui'
      },
      {
        context: 'node_modules/fundamental-ui/dist/',
        to: 'fundamental-ui',
        from: {
          glob: 'fonts'
        }
      }
    ])
  ],
  mode: 'production',
  stats: {
    warnings: false
  }
};
