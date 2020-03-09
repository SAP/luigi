<!-- meta
{
  "node": {
    "label": "Migration to 1.x",
    "category": {
      "label": "Basics"
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 4
    }
  }
}
meta -->

# Migration Guides for Luigi 0.x to 1.x

<!-- accordion:start -->

### Internet Explorer 11 (IE11)

IE11-related content is now in a separate package.

If you want to support IE11, install the client in your project using npm:
```bash
npm install @luigi-project/client-ie11
npm install @luigi-project/core-ie11
```

Import the client in places where you want to use it, depending on the environment of your choice:
```javascript
var LuigiClient = require('@luigi-project/client-ie11');
var LuigiCore = require('@luigi-project/core-ie11');
```
or
```javascript
import LuigiClient from '@luigi-project/client-ie11';
import LuigiCore from '@luigi-project/core-ie11';
```
or, if you are not using any bundler, Luigi is still available as a global object:
```javascript
window.LuigiClient
window.Luigi
```

### Authorization Providers

We have excluded the default authorization providers from Luigi Core and published them as separate modules.
The property `customIdpProvider` has been renamed to `idpProvider`, since you now always need to define a provider.
Additionally, you need to copy callback assets to your Core application.

To install the plugins, follow these installation guides:

- [OAuth2 Implicit Grant](https://github.com/SAP/luigi/tree/master/plugins/auth/public/auth-oauth2/README.md)
- [OpenID Connect (OIDC)](https://github.com/SAP/luigi/tree/master/plugins/auth/public/auth-oidc/README.md)

<!-- add-attribute:class:warning -->
> **NOTE:** If you already had a custom provider defined, you only need to rename the provider key to `idpProvider`.

### Fundamental Library Styles

Following an upgrade from SAP Fundamentals to Fundamental Library Styles, there were changes in the HTML structure. Some classes were renamed or removed completely. You can find the full list of Fundamental Library Styles changes [here](https://github.com/SAP/fundamental-styles/wiki/Breaking-Changes). 

On Luigi side we renamed `lui-tendant-menu__control` class into `lui-ctx-switch-menu`.

<!-- accordion:end -->
