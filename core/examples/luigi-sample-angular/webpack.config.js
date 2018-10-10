const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const postcssImports = require('postcss-import');

const {
  NoEmitOnErrorsPlugin,
  SourceMapDevToolPlugin,
  NamedModulesPlugin
} = require('webpack');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const entryPoints = [
  'inline',
  'polyfills',
  'sw-register',
  'styles',
  'vendor',
  'main'
];
const hashFormat = { chunk: '', extract: '', file: '.[hash:20]', script: '' };
const baseHref = '';
const deployUrl = '';
const projectRoot = process.cwd();
const maximumInlineSize = 10;
const postcssPlugins = function(loader) {
  return [
    postcssImports({
      resolve: (url, context) => {
        return new Promise((resolve, reject) => {
          let hadTilde = false;
          if (url && url.startsWith('~')) {
            url = url.substr(1);
            hadTilde = true;
          }
          loader.resolve(
            context,
            (hadTilde ? '' : './') + url,
            (err, result) => {
              if (err) {
                if (hadTilde) {
                  reject(err);
                  return;
                }
                loader.resolve(context, url, (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                });
              } else {
                resolve(result);
              }
            }
          );
        });
      },
      load: filename => {
        return new Promise((resolve, reject) => {
          loader.fs.readFile(filename, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            const content = data.toString();
            resolve(content);
          });
        });
      }
    }),
    postcssUrl({
      filter: ({ url }) => url.startsWith('~'),
      url: ({ url }) => {
        const fullPath = path.join(projectRoot, 'node_modules', url.substr(1));
        return path.relative(loader.context, fullPath).replace(/\\/g, '/');
      }
    }),
    postcssUrl([
      {
        // Only convert root relative URLs, which CSS-Loader won't process into require().
        filter: ({ url }) => url.startsWith('/') && !url.startsWith('//'),
        url: ({ url }) => {
          if (deployUrl.match(/:\/\//) || deployUrl.startsWith('/')) {
            // If deployUrl is absolute or root relative, ignore baseHref & use deployUrl as is.
            return `${deployUrl.replace(/\/$/, '')}${url}`;
          } else if (baseHref.match(/:\/\//)) {
            // If baseHref contains a scheme, include it as is.
            return (
              baseHref.replace(/\/$/, '') +
              `/${deployUrl}/${url}`.replace(/\/\/+/g, '/')
            );
          } else {
            // Join together base-href, deploy-url and the original URL.
            // Also dedupe multiple slashes into single ones.
            return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
          }
        }
      },
      {
        // TODO: inline .cur if not supporting IE (use browserslist to check)
        filter: asset => {
          return (
            maximumInlineSize > 0 &&
            !asset.hash &&
            !asset.absolutePath.endsWith('.cur')
          );
        },
        url: 'inline',
        // NOTE: maxSize is in KB
        maxSize: maximumInlineSize,
        fallback: 'rebase'
      },
      { url: 'rebase' }
    ]),
    autoprefixer({ grid: true })
  ];
};

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: true,
    modules: ['./src', './node_modules'],
    alias: rxPaths(),
    mainFields: ['browser', 'module', 'main']
  },
  resolveLoader: {
    modules: ['./node_modules', './node_modules/@angular/cli/node_modules'],
    alias: rxPaths()
  },
  entry: {
    main: ['./src/main.ts'],
    polyfills: ['./src/polyfills.ts'],
    styles: ['./src/styles.css']
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    crossOriginLoading: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:20].[ext]',
          limit: 10000
        }
      },
      {
        exclude: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.css$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          }
        ]
      },
      {
        exclude: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.scss$|\.sass$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        exclude: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.less$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        exclude: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.styl$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              paths: []
            }
          }
        ]
      },
      {
        include: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          }
        ]
      },
      {
        include: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.scss$|\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        include: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        include: [path.join(process.cwd(), 'src/styles.css')],
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'embedded',
              plugins: postcssPlugins,
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              paths: []
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [
        {
          context: 'src',
          to: '',
          from: {
            glob: 'assets/**/*',
            dot: true
          }
        },
        {
          context: 'src',
          to: '',
          from: {
            glob: 'favicon.ico',
            dot: true
          }
        },
        {
          context: 'src',
          to: '',
          from: {
            glob: 'index.html',
            dot: true
          }
        },
        {
          context: 'node_modules/@kyma-project/luigi-core',
          to: './luigi-core',
          from: {
            glob: '**',
            dot: true
          }
        },
        {
          context: 'node_modules/@kyma-project/luigi-client',
          to: './luigi-client',
          from: {
            glob: 'luigi-client.js'
          }
        }
      ],
      {
        ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
        debug: 'warning'
      }
    ),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: projectRoot
    }),
    new HtmlWebpackPlugin({
      template: './src/sampleapp.html',
      filename: './sampleapp.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      title: 'Webpack App',
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightIndex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightIndex) {
          return 1;
        } else if (leftIndex < rightIndex) {
          return -1;
        } else {
          return 0;
        }
      }
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
      sourceRoot: 'webpack:///'
    }),
    new NamedModulesPlugin({}),
    new AngularCompilerPlugin({
      mainPath: 'main.ts',
      platform: 0,
      hostReplacementPaths: {
        'environments/environment.ts': 'environments/environment.ts'
      },
      sourceMap: true,
      tsConfigPath: 'src/tsconfig.app.json',
      skipCodeGeneration: true,
      compilerOptions: {}
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  devServer: {
    // because of 404 issue, which redirected us to sampleapp.html instead of index.html
    // "historyApiFallback": true
    historyApiFallback: {
      rewrites: [{ from: /./, to: './src/index.html' }]
    }
  }
};
