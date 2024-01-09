<!-- meta
{
  "node": {
    "label": "Luigi Container API",
    "category": {
      "label": "API Reference",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 6,
      "position": 3
    }
  }
}
meta -->

## Luigi Container API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### LuigiContainer

Use the functions and parameters to define the LuigiContainer.

#### viewurl

The URL of the microfrontend to be rendered

#### deferInit

If set to true defers from initializing the microfronted automatically. In that case init() can be used

#### context

The context to be passed to the microfrontend

#### label

Label information for the microfrontend

#### webcomponent

Predicate that sets whether the microfrontend is to be rendered in a web component or not. It can also be an object with the following attributes:

##### Parameters

-   `WebComponentSettings` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
    -   `WebComponentSettings.type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** : string, like module.
    -   `WebComponentSettings.selfRegistered` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** : if it is true, the web component bundle will be added via script tag.
    -   `WebComponentSettings.tagName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** : tag name where web component is added to DOM.

#### locale

The locale to be passed to the web-component-based micro frontend

#### theme

The theme to be passed to the  web-component-based micro frontend

#### activeFeatureToggleList

The list of active feature toggles to be passed to the web-component-based micro frontend

#### skipInitCheck

If set to true, skips handshake and ready event is fired immediately

#### nodeParams

The parameters to be passed to the web-component-based micro frontend. Will not be passed to the compound children.

#### searchParams

The search parameters to be passed to the web-component-based micro frontend.

#### pathParams

The path parameters to be passed to the web-component-based micro frontend.

#### clientPermissions

The clientPermissions to be passed to the web-component-based micro frontend.

#### userSettings

The user settings to be passed to the web-component-based micro frontend

#### anchor

The anchor value to be passed to the web-component-based micro frontend.

#### updateContext

Updates the context of the microfrontend

##### Parameters

-   `contextObj`  The context data
-   `internal`  internal luigi legacy data used for iframes

#### sendCustomMessage

Send a custom message to the microfronted

##### Parameters

-   `id`  a string containing the message id
-   `data`  data to be sent alongside the custom message

#### closeAlert

Notifies the microfrontend that the opened alert has been closed

##### Parameters

-   `id`  the id of the opened alert
-   `dismissKey`  the key specifying which dismiss link was clicked on the alert message

#### init

Manually triggers the micro frontend rendering process when using defer-init attribute