# OAuth2 - Authorization Plugin for Luigi Core

## Overview

This project contains a library that allows your application to extend the [Luigi framework](https://github.com/SAP/luigi/tree/master/core) with a OAuth2 authorization provider. 
Further configuration details can be found in the main documentation: [authorization-configuration](https://docs.luigi-project.io/docs/authorization-configuration#oauth2-implicit-grant-configuration)

## Installation

Install the client in your project using npm:
```bash
npm install @luigi-project/plugin-auth-oauth2
```

Import the client in places where you want to use it, depending on the environment of your choice:
```javascript
var oAuth2ImplicitGrant = require('@luigi-project/plugin-auth-oauth2');
```
or
```javascript
import oAuth2ImplicitGrant from '@luigi-project/plugin-auth-oauth2';
```

Then integrating it as authorization provider:
```javascript
Luigi.setConfig({
  auth: {
    use: 'myProviderConfig',
    myProviderConfig: {
      customIdpProvider: oAuth2ImplicitGrant,
      // ... configuration data comes here
      redirect_uri: '/assets/auth-oauth2/callback.html'
    }
  }
})
```

The callback.html needs to be copied to a folder in Luigi Core installation, which is the return path for idp provider, configured through the `redirect_uri` setting. Default location of `redirect_uri` is `/assets/auth-oauth2/callback.html`.

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
