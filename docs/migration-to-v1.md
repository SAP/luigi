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

### Authorization Providers

We have excluded the default authorization providers from Luigi Core and published them as separate modules.
The property `customIdpProvider` has been renamed to `idpProvider`, since you now always need to define a provider.
Additionally you need to copy callback assets to your Core application.

Follow the installation guide on the plugin's readme:

- [OAuth2 Implicit Grant](https://github.com/SAP/luigi/tree/master/plugins/public/oauth2/README.md)
- [OpenID Connect (OIDC)](https://github.com/SAP/luigi/tree/master/plugins/public/oidc/README.md)

<!-- add-attribute:class:warning -->
> **NOTE:** If you already had a custom provider defined, you only need to rename the provider key to `idpProvider`.

<!-- accordion:end -->
