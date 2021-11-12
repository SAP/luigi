<!-- meta
{
  "node": {
    "label": "OAuth2",
    "category": {
      "label": "Authorization Plugins"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 12
    }
  }
}
meta -->
# OAuth2 - Authorization Plugin for Luigi Core

## Overview

This [authorization plugin](https://github.com/SAP/luigi/tree/master/plugins/auth/public/auth-oauth2) contains a library that allows your application to extend the [Luigi framework](https://github.com/SAP/luigi/tree/master/core) with an OAuth2 authorization provider.
Further configuration details can be found in the [main documentation](https://docs.luigi-project.io/docs/authorization-configuration#oauth2-implicit-grant-configuration).

## Installation

Install the plugin in your project using npm:
```bash
npm install @luigi-project/plugin-auth-oauth2
```

Import the plugin in places where you want to use it, depending on the environment of your choice:
```javascript
var oAuth2ImplicitGrant = require('@luigi-project/plugin-auth-oauth2');
```
or
```javascript
import oAuth2ImplicitGrant from '@luigi-project/plugin-auth-oauth2';
```

Then, integrate it as an authorization provider in your Luigi configuration file:
```javascript
Luigi.setConfig({
  auth: {
    use: 'myProviderConfig',
    myProviderConfig: {
      idpProvider: oAuth2ImplicitGrant,
      // ... configuration data comes here
      redirect_uri: '/assets/auth-oauth2/callback.html'
    }
  }
})
```

For **Angular-based** applications, the `callback.html` file can be copied using copy-webpack-plugin. Include the following in your webpack configuration file:

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');

{
  plugins: [
    new CopyWebpackPlugin([{
      from: 'node_modules/@luigi-project/plugin-auth-oauth2/callback.html',
      to: 'src/assets/auth-oauth2'
    }])
  ]
}
```

For more simple scenarios such as Luigi setup without a framework, you can use any copy plugin to copy the `callback.html` file. An example is given below using copyfiles:

```javascript
"buildConfig": "webpack --entry ./src/luigi-config/luigi-config.es6.js --output-path ./public/assets --output-filename luigi-config.js --mode production",
"build": "npm run buildConfig && npm run copyCallbackOAuth",
"copyCallbackOAuth": "copyfiles -f node_modules/@luigi-project/plugin-auth-oauth2/callback.html public/assets/auth-oauth2"
```

Running npm run build should then suffice to bundle the config and also copy the callback file.