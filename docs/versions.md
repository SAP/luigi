<!-- meta
{
  "node": {
    "label": "Versions",
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

# Versions

Read about the versions of Luigi in this document.

* [Changelog](#changelog)
* [Important version 1.x upgrades](#luigi-1.x-upgrades)
* [Docs for earlier versions](#docs-for-earlier-versions)

## Changelog

Our [changelog](https://bit.ly/2W47Ewv) contains information on all the updates and features which were added to Luigi starting from its initial release.

## Luigi 1.x upgrades

Luigi versions 1.0 and above differ from earlier versions in some important ways. Luigi npm packages (previously under `kyma-project`) are under a new npm org. The new packages are:
- @luigi-project/client
- @luigi-project/client-ie11
- @luigi-project/core
- @luigi-project/core-ie11
- @luigi-project/plugin-auth-oauth2
- @luigi-project/plugin-auth-oidc

You can read more about the other changes below:

<!-- accordion:start -->

### Authorization Providers

We have excluded the default authorization providers from Luigi Core and published them as separate modules.
The property `customIdpProvider` has been renamed to `idpProvider`, since you now always need to define a provider.
Additionally, you need to copy callback assets to your Core application.

To install the plugins, follow these installation guides:

- [OAuth2 Implicit Grant](https://github.com/SAP/luigi/tree/master/plugins/auth/public/auth-oauth2)
- [OpenID Connect (OIDC)](https://github.com/SAP/luigi/tree/master/plugins/auth/public/auth-oidc)

<!-- add-attribute:class:warning -->
> **NOTE:** If you already had a custom provider defined, you only need to rename the provider key to `idpProvider`.

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

### Fundamental Library Styles

Following an upgrade from SAP Fundamentals to Fundamental Library Styles, there were changes in the HTML structure. Some classes were renamed or removed completely. You can find the full list of Fundamental Library Styles changes [here](https://github.com/SAP/fundamental-styles/wiki/Breaking-Changes).

Within Luigi, we renamed the `lui-tendant-menu__control` class to `lui-ctx-switch-menu`.

With the new v.0.10.0 of Fundamental Library Styles, there were breaking changes to the Luigi side navigation. You can see the updated layout [here](https://sap.github.io/fundamental-styles/components/side-navigation.html).

<!-- accordion:end -->


## Docs for earlier versions

<!-- add-attribute:class:warning -->
> **NOTE**: Always download the latest patch version!

The current documentation page describes the latest Luigi version. You can find the documentation for earlier versions of Luigi here:

* [0.7](https://github.com/SAP/luigi/tree/v0.7.7/docs)
* [0.6](https://github.com/SAP/luigi/tree/v0.6.6/docs)
* [0.5](https://github.com/SAP/luigi/tree/v0.5.4/docs)
* [0.4](https://github.com/SAP/luigi/tree/v0.4.12/docs)
* [0.3](https://github.com/SAP/luigi/blob/v0.3.8/docs)