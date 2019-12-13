<!-- meta
{
  "node": {
    "label": "General settings",
    "category": {
      "label": "Luigi Core"
    },
    "metaData": {
      "categoryPosition": 2,
      "position": 6
    }
  }
}
meta -->

# General settings

<!-- add-attribute:class:success -->
>**TIP:** For learning and testing purposes, use the [Luigi Fiddle](https://fiddle.luigi-project.io) page where you can configure a sample Luigi application.

The configuration file contains a section called **Settings** in which you can configure additional Luigi options.

```javascript
settings: {
  hideNavigation: false
  backdropDisabled : false,
  header: {  object / function / Promise
    logo: 'path/to/image.png',
    title: 'Luigi Demo',
    favicon: 'path/to/favicon.ico'
  },
  sideNavFooterText: 'MyLovelyApp 1.0.0',
  sideNavCompactMode: false,
  customTranslationImplementation: () => {
    return {
      getTranslation: (key, interpolations, locale) => {
        return translatedText;
      }
    };
  },
  customSandboxRules: ['allow-downloads-without-user-activation'],
  allowRules: ['microphone'],
  appLoadingIndicator: {
    hideAutomatically: true
  }
}
```

* **hideNavigation** disables Luigi's default out-of-the-box navigation when set to `true`. This means that top, side, and tab navigation is no longer visible and you can implement your own navigation UI. By default, the parameter is set to `false`, which means the navigation is enabled.
* **backdropDisabled** prevents the backdrop layer from covering the top and left navigation when showing modal windows. By default, the backdrop is set to `true`.
* **header.logo** defines the top left navigation logo. It has a fixed height of 28px.
* **header.altText** adds the HTML `alt` attribute to the logo image.
* **header.title** defines the top left navigation title.
* **header.favicon** defines the favicon. It requires a standard favicon file with the `.ico` extension, and 16x16px or 32x32px dimensions.
* **responsiveNavigation** allows customizing the navigation display settings. For example, you can define a button which shows or completely hides the left navigation, or a button which collapses the navigation to only show the icons.
You can set the following values:
  * `simple` displays the button on the left side of the top navigation regardless of the browser window´s size.
  * `simpleMobileOnly` displays the button on the left side of the top navigation when the browser window is narrower than `600px`.
  * `semiCollapsible` displays the arrow button at the bottom of the left side navigation. Once you click the button, the navigation shows up or collapses.<br>
If you don't specify any value for  **responsiveNavigation**, the buttons remain hidden. The same applies when you enable **hideSideNav** for the currently active navigation node.
* **sideNavFooterText** is a string displayed in a sticky footer inside the side navigation. It is a good place to display the version of your application.
* **sideNavCompactMode** reduces the dimensions of the side navigation and allows you to display more information.
* **customTranslationImplementation** provides a custom localization implementation. It can be an Object or a Function returning an Object. This Object must provide the **getTranslation** Function as property:
```javascript
{
  getTranslation: (key, interpolations, locale) => {
    // should return translation of the 'key' in the 'locale' or current locale
  }
}
```
<!-- add-attribute:class:warning -->
> **NOTE:** You can translate Luigi internal messages by providing translation for [these keys](../core/src/utilities/defaultLuigiTranslationTable.js).

* **customSandboxRules** is an array of custom rules for the content in the iframe. You can extend the [Luigi default sandbox rules](https://github.com/SAP/luigi/blob/af1deebb392dcec6490f72576e32eb5853a894bc/core/src/utilities/helpers/iframe-helpers.js#L140) by adding further rules.
* **iframeCreationInterceptor** is a function called on iframe creation. It gives you full control over the created iframe DOM element. You can modify it to your needs just before it is added to the DOM tree.
This function is called with these parameters:
  * `iframe` is the iframe DOM element. It is not yet added to the DOM tree, but all attributes are already set.
  * `viewGroup` is the view group associated with this iframe, if applicable.
  * `navigationNode` is the navigation node associated with this iframe. NOTE: the interceptor is called only once per iframe creation. If two or more navigation nodes share the same iframe (because they belong to the same view group) the interceptor is called with the first navigated node only.
  * `microFrontendType`, which is `main`, `modal` or `split-view` depending on where it is going to be rendered.

For example, to allow 'fullscreen' for non-modal iframes:
```javascript
{
  iframeCreationInterceptor: (iframe, viewGroup, navigationNode, microFrontendType) => {
    if (microFrontendType !== 'modal')
      iframe.allowFullscreen = true;
  }
}
```
* **allowRules** is an array of rules for the content in the iframe, managed by the HTML **allow** attribute. You can use one or more rules by adding them to the array, for example `allowRules: ['microphone', 'camera']`. Be aware that this mechanism requires the browser to support [Feature Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy).
* **appLoadingIndicator.hideAutomatically** allows you to disable automatic hiding of the app loading indicator, which is enabled by default in case the app loading indicator is being used. Take a look at the [App loading indicator](luigi-ux-features.md#app-loading-indicator) section on how to use this feature.
