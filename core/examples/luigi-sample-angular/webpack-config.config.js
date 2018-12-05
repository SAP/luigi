const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const {
  NoEmitOnErrorsPlugin,
  SourceMapDevToolPlugin,
  NamedModulesPlugin
} = require('webpack');

const entryPoints = ['extendedConfiguration'];

// const projectRoot = process.cwd() + '/config';
const projectRoot = path.resolve(__dirname, 'config');

// module.exports = {
//   resolve: {
//     extensions: ['.js'],
//     symlinks: true,
//     modules: ['./config', './node_modules'],
//     // alias: rxPaths(),
//     mainFields: ['browser', 'module', 'main']
//   },
//   resolveLoader: {
//     modules: ['./node_modules'],
//     // alias: rxPaths()
//   },
//   entry: {
//     main: ['./config/extendedConfiguration.ts'],
//     // polyfills: ['./src/polyfills.ts'],
//     styles: cssFiles
//   },
//   output: {
//     path: path.join(process.cwd(), 'dist'),
//     filename: '[name].extended.js',
//     chunkFilename: '[id].chunk.js',
//     crossOriginLoading: false
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
//         loader: 'url-loader',
//         options: {
//           name: '[name].[hash:20].[ext]',
//           limit: 10000
//         }
//       }
//     ]
//   },
//   plugins: [
//     new NoEmitOnErrorsPlugin(),
//     // new CopyWebpackPlugin(
//     //   [
//     //     {
//     //       context: 'src',
//     //       to: '',
//     //       from: {
//     //         glob: 'assets/**/*',
//     //         dot: true
//     //       }
//     //     }
//     //   ],
//     //   {
//     //     ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
//     //     debug: 'warning'
//     //   }
//     // ),
//     new ProgressPlugin(),
//     new CircularDependencyPlugin({
//       exclude: /(\\|\/)node_modules(\\|\/)/,
//       failOnError: false,
//       onDetected: false,
//       cwd: projectRoot
//     }),
//     new SourceMapDevToolPlugin({
//       filename: '[file].map[query]',
//       moduleFilenameTemplate: '[resource-path]',
//       fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
//       sourceRoot: 'webpack:///'
//     }),
//     new NamedModulesPlugin({})
//   ],
//   optimization: {
//     splitChunks: {
//       chunks: 'all'
//     }
//   },
//   node: {
//     fs: 'empty',
//     global: true,
//     crypto: 'empty',
//     tls: 'empty',
//     net: 'empty',
//     process: true,
//     module: false,
//     clearImmediate: false,
//     setImmediate: false
//   }
// };

// const path = require('path');

// module.exports = {
//   target: 'es5',
//   entry: {
//     app: [
//       'babel-polyfill',
//       './config/extendedConfiguration.ts'
//     ]
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'extendedConfig.bundle.js'
//   },
//   plugins: [
//     new NoEmitOnErrorsPlugin(),
//     new ProgressPlugin(),
//     new CircularDependencyPlugin({
//       exclude: /(\\|\/)node_modules(\\|\/)/,
//       failOnError: false,
//       onDetected: false,
//       cwd: projectRoot
//     }),
//     new SourceMapDevToolPlugin({
//       filename: '[file].map[query]',
//       moduleFilenameTemplate: '[resource-path]',
//       fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
//       sourceRoot: 'webpack:///'
//     }),
//     new NamedModulesPlugin({})
//   ],
//   module: {
//     loaders: [{
//       test: /\.js?$/,
//       exclude: /node_modules/,
//       loader: 'babel-loader',
//       query: {
//         presets: ['env']
//       }
//     }]
//   },
//   optimization: {
//     splitChunks: {
//       chunks: 'all'
//     }
//   },
//   node: {
//     fs: 'empty',
//     global: true,
//     crypto: 'empty',
//     tls: 'empty',
//     net: 'empty',
//     process: true,
//     module: false,
//     clearImmediate: false,
//     setImmediate: false
//   }
// };

module.exports = {
  target: 'web',
  entry: './config/extendedConfiguration.js',
  // mode: 'development',
  mode: 'production',
  output: {
    filename: 'extendedConfiguration.bundle.js',
    path: path.resolve(__dirname, 'src', 'assets')
  }
  // plugins: [
  //   new NoEmitOnErrorsPlugin()
  // ]
};
