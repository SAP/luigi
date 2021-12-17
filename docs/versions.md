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

With Luigi version v1.3.0, the new v0.10.0 of Fundamental Library Styles were included. As a result, there were breaking changes to the Luigi side navigation. You can see the updated layout [here](https://sap.github.io/fundamental-styles/components/side-navigation.html).

With Luigi v1.4.0, the new v0.11.0 of Fundamental Library Styles were included. As a result, there were breaking changes to the Luigi Alerts. The classes `fd-overlay fd-overlay--message-strip` were removed from Fundamental Library Styles and we added a new class `luigi-alert--overlay` to keep the same look and feel as in the past. You can see all breaking changes of Fundamental Library Styles [here](https://github.com/SAP/fundamental-styles/wiki/Breaking-Changes#0110).

With Luigi v1.9.0, the new v0.14.0 of Fundamental Library Styles were included. Its previous v0.12.0 led to having breaking changes in the Luigi left side navigation and the shellbar. All icons were moved out from pseudo-classes into a dedicated tag `<i class="sap-icon sap-icon--{modifier}"></i>` under the button. You can see all breaking changes of Fundamental Library Styles v0.12.0 [here](https://github.com/SAP/fundamental-styles/releases?after=v0.12.1-rc.7).

With Luigi v1.13.0, the new v0.17.0 of Fundamental Library Styles were included. It led to having breaking changes in the Luigi Dialog/Modal layout and Shellbar Counter. New HTML attributes were added to those components to increase accesibility. You can see the new layout of these components here: [Dialog](https://sap.github.io/fundamental-styles/?path=/docs/components-dialog--default-dialog) and [Shellbar Counter](https://sap.github.io/fundamental-styles/?path=/docs/components-shellbar--primary)

In order to use TNT icons or businessSuiteInAppSymbols icons suite, it is recommended to add ```@font-face``` from [Fundamental Styles](https://sap.github.io/fundamental-styles/?path=/docs/introduction-overview--page#project-configuration) project configuration, to your _styles.css_.
<!-- accordion:end -->


## Docs for earlier versions

<!-- add-attribute:class:warning -->
> **NOTE**: Always download the latest patch version!

The current documentation page describes the latest Luigi version. You can find the documentation for earlier versions of Luigi here:

* [1.2](https://github.com/SAP/luigi/tree/v1.2.4/docs)
* [1.1](https://github.com/SAP/luigi/tree/v1.1.1/docs)
* [1.0](https://github.com/SAP/luigi/tree/v1.0.1/docs)
* [0.7](https://github.com/SAP/luigi/tree/v0.7.7/docs)
* [0.6](https://github.com/SAP/luigi/tree/v0.6.6/docs)
* [0.5](https://github.com/SAP/luigi/tree/v0.5.4/docs)
* [0.4](https://github.com/SAP/luigi/tree/v0.4.12/docs)
* [0.3](https://github.com/SAP/luigi/blob/v0.3.8/docs)
