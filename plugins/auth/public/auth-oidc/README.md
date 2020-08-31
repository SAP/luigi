<!-- meta
{
  "node": {
    "label": "OpenID Connect",
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

# OpenID Connect - Authorization Plugin for Luigi Core

## Overview

This project contains a library that allows your application to extend the [Luigi framework](https://github.com/SAP/luigi/tree/master/core) with an OpenID Connect authorization provider. 
Further configuration details can be found in the [main documentation](https://docs.luigi-project.io/docs/authorization-configuration#openid-connect-configuration). We support Authorization Code with PKCE and Implicit Grant flow.

## Installation

Install the plugin in your project using npm:
```bash
npm install @luigi-project/plugin-auth-oidc
```

Import the plugin in places where you want to use it, depending on the environment of your choice:
```javascript
var OpenIdConnect = require('@luigi-project/plugin-auth-oidc');
```
or
```javascript
import OpenIdConnect from '@luigi-project/plugin-auth-oidc';
```

Then, integrate it as an authorization provider in your Luigi configuration file:
```javascript
Luigi.setConfig({
  auth: {
    use: 'myProviderConfig',
    myProviderConfig: {
      idpProvider: OpenIdConnect,
      authority: 'http://authority.server',
      logoutUrl: 'http://authority.server/connect/endsession',
      scope: 'openid profile email',

      // for PKCE flow
      client_id: 'authorisation-code-pkce-mock-client', // example oidc-mockserver client id
      response_type: "code", // for PKCE
      response_mode: "fragment", // change between `query` and `fragment`

      // for implicit grant flow
      // client_id: 'implicit-mock-client', // example oidc-mockserver client id

      // ... further configuration data comes here
    }
  }
})
```

If you want to use the silent token renewal feature, the `silent-callback.html` needs to be copied to a folder in your Luigi Core installation, which is the return path for the IdP provider, configured through the `redirect_uri` setting. The default location of `redirect_uri` is `/assets/auth-oidc/silent-callback.html`. This file also contains a reference to `/assets/auth-oidc/plugin.js` to make the OIDC client available.

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');

{
  plugins: [
    new CopyWebpackPlugin([{
      from: 'node_modules/@luigi-project/plugin-auth-oidc',
      to: 'src/assets/auth-oidc'
    }])
  ]
}
```
