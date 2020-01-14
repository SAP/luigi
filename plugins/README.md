# OAuth2 - Authorization Plugin for Luigi Core

## Overview

This project contains a library that allows your application to extend the [Luigi framework](https://github.com/SAP/luigi/tree/master/core) with a OAuth2 authorization provider.

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
    }
  }
})
```

OAuth2 configuration details can be found in the main documentation: [authorization-configuration.md](https://github.com/SAP/luigi/blob/master/docs/authorization-configuration.md#oauth2-implicit-grant-configuration)