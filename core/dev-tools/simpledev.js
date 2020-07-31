const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const fs = require('fs-extra');
const webpackConfig = require('../webpack.config');
webpackConfig.mode = 'development';
const webpack_compiler = webpack(webpackConfig);

let logo_ascii = `
                              //
                        /////   /////
                   /////             /////
              /////                       /////
         ////                                   ////
      //                                            *//
     //                        ////                   //
     //                     ////////                  //
    //                    ////////   ///               //
    //                 ////////   ////////             //
   //                ////////   ////////   //           //
  //              ////////   ////////    ///////        ///
  //            ////////   ////////   ////////           //
 //          ////////   ////////    ////////              //
 //            ////////   ////   ////////                 //
 //              ////////      ////////                   //
  ///               ////////   /////                    ///
    ///               ////////                         ///
      ///                //////                     ///
        ///                //                     ///
          ///                                   ///
            ///                               ///
              ///                           ///
                /////////////////////////////




        ///                    ///               ///
        ///
        ///        ///    ///  ///   ////////    ///
        ///        ///    ///  ///   ///   ///   ///
        ///        ///    ///  ///    /////      ///
        /////////  ////// ///  ///   /////////   ///
                                    ///     ///
                                      //////

`;
console.log('\x1b[32m', logo_ascii, '\x1b[0m');

const rootPath = './dev-tools/simple-app';
const indexPath = rootPath + '/index.html';
try {
  if (fs.existsSync(indexPath)) {
    console.log('\x1b[32mFound ' + indexPath, '\x1b[0m');
  } else {
    console.log(
      '\x1b[33mCould not find ' + indexPath,
      '\nInitializing new minimalistic Luigi app from template...',
      '\x1b[0m'
    );
    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath);
    }
    fs.copy('./dev-tools/templates/simple', rootPath);
    console.log('\x1b[32mNew Luigi app created under ' + rootPath, '\x1b[0m');
  }
} catch (err) {
  console.error(err);
}

webpack_compiler.hooks.watchRun.tap('CLI output', () => {
  console.log(
    '\x1b[33mWebpack [' + new Date().toLocaleTimeString() + ']: ',
    ' Rebuild in progress...',
    '\x1b[0m'
  );
});

let webpackServer = new webpackDevServer(webpack_compiler, {
  publicPath: '/public',
  contentBase: path.join(__dirname, 'simple-app'),
  contentBasePublicPath: '/',
  compress: true,
  port: 4100,
  historyApiFallback: true,
  host: '0.0.0.0',
  liveReload: true,
  watchContentBase: true,
  writeToDisk: true
});
webpackServer.listen(4100);

// liveServer.start(params);
console.log(
  '\x1b[32mStarting server at',
  '\x1b[36m',
  'http://0.0.0.0:4100',
  '\x1b[0m'
);
