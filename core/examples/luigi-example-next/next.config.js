// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Modify the webpack configuration here
    if (isServer) {
      // Server-side webpack configuration
      console.log('Bundling in server');
    } else {
      // Client-side webpack configuration
      console.log('Bundling in client');
      config.externals = {
        // externalsType: 'umd',
        '@luigi-project/client': 'LuigiClient'
      };

      // config.output.libraryTarget = 'umd';
      // config.output.umdNamedDefine = true;
    }

    //   config.module.rules.push(
    //     {
    //         test: /\.(js|mjs|jsx|ts|tsx)$/,
    //         use: {
    //           loader: 'babel-loader',
    //           options: {
    //             presets: ['next/babel'],
    //           },
    //         },
    //     }

    // {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: [
    //           ['@babel/preset-env', { targets: 'defaults' }],
    //           ['@babel/preset-react', { runtime: 'automatic' }]
    //         ]
    //       }
    //     }
    //   }

    //   );

    return config;
  }
};
