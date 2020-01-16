# OpenID Connect - Authorization Plugin for Luigi Core

## Overview

This project contains a library that allows your application to extend the [Luigi framework](https://github.com/SAP/luigi/tree/master/core) with a OpenID Connect authorization provider. 
Further configuration details can be found in the main documentation: [authorization-configuration](https://docs.luigi-project.io/docs/authorization-configuration#oauth2-implicit-grant-configuration)

## Installation

Install the client in your project using npm:
```bash
npm install @luigi-project/plugin-auth-oidc
```

Import the client in places where you want to use it, depending on the environment of your choice:
```javascript
var OpenIdConnect = require('@luigi-project/plugin-auth-oidc');
```
or
```javascript
import OpenIdConnect from '@luigi-project/plugin-auth-oidc';
```

Then integrating it as authorization provider:
```javascript
Luigi.setConfig({
  auth: {
    use: 'myProviderConfig',
    myProviderConfig: {
      idpProvider: OpenIdConnect,
      // ... configuration data comes here
      redirect_uri: '/assets/auth-oauth2/callback.html'
    }
  }
})
```

If you want to use the silent token renewal feature, the silent-callback.html needs to be copied to a folder in Luigi Core installation, which is the return path for idp provider, configured through the `redirect_uri` setting. Default location of `redirect_uri` is `/assets/auth-oidc/silent-callback.html`. This file contains also a reference to `/assets/auth-oidc/plugin.js` to make the OIDC client available.

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
