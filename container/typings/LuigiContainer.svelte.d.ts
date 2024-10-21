export declare interface WebComponentSettings {
  type?: string;
  selfRegistered?: boolean;
  tagName?: string;
}

export default class LuigiContainer extends HTMLElement {
  /**
   * The URL of the microfrontend to be rendered
   * @since 1.0.0
   * 
   * ```js
   * myContainer.viewUrl = "/index.html"
   * ```
   *
   * ```HTML
   * <luigi-container viewurl="/index.html"></luigi-container>
   * ```
   */
  viewurl: string;

  /**
   * If set to true defers from initializing the microfronted automatically. In that case init() can be used
   * @since 1.0.0
   * ```js
myContainer.deferInit = true
```

```HTML
<luigi-container viewUrl="/index.html" defer-init="true"></luigi-container>
```
   */
  deferInit: boolean;

  /**
   * The stringified context object to be passed to the microfrontend
   * @since 1.0.0
   */
  context: string;

  /**
   * Label information for the microfrontend
   * @since 1.0.0
   */
  label: string;

  /**
   * Predicate that sets whether the microfrontend is to be rendered in a web component or not. It can also be an object with the following attributes:
   * @param {boolean} specifies if a microfrontend is a webcomponent or not without any other settings.
   * @param {Object} [WebComponentSettings] specifies that the microfrontend is a webcomponent with addtional settings.
   * @param {string} WebComponentSettings.type: string, like module.
   * @param {boolean} WebComponentSettings.selfRegistered: if it is true, the web component bundle will be added via script tag.
   * @param {string} WebComponentSettings.tagName: tag name where web component is added to DOM.
   * @param {string} string must be a stringified boolean or JSON object from type `WebComponentSettings`.
   *
   * </br></br>
   * <blockquote class="warning">
   * <p>
   * <strong>Note:</strong> If you have to use the mechanism of `selfRegistered`, we recommend using the following code in your web component:
   * </p>
   * </blockquote>
   * <pre><code>
   * window.Luigi._registerWebcomponent(new URL(document.currentScript?.getAttribute('src'), location), <YOUR_WEBCOMPONENT_CLASS>);
   * </code></pre>
   * The advantage of this line of code is: you don't have to specify a tag name, thus avoiding the duplication of self-defined tag names.
   * </br>
   * @since 1.0.0
   */
  webcomponent: boolean | WebComponentSettings | string;

  /**
   * The locale to be passed to the web-component-based micro frontend
   * @since 1.0.0
   */
  locale: string;

  /**
   * The theme to be passed to the  web-component-based micro frontend
   * @since 1.0.0
   */
  theme: string;

  /**
   * The list of active feature toggles to be passed to the web-component-based micro frontend
   * @since 1.0.0
   */
  activeFeatureToggleList: string[];

  /**
   * If set to true, skips third party cookie check
   * @since NEXT_RELEASE_CONTAINER
   */
  skipCookieCheck: 'false' | 'true';

  /**
   * If set to true, skips handshake and ready event is fired immediately
   * @since 1.0.0
   */
  skipInitCheck: boolean;

  /**
   * The parameters to be passed to the web-component-based micro frontend.
   * @since 1.0.0
   */
  nodeParams: Object;

  /**
   * If set to true, the Luigi container webcomponent will not use the shadow DOM for rendering.
   * @since 1.2.0
   */
  noShadow: boolean;

  /**
   * The search parameters to be passed to the web-component-based micro frontend.
   * @since 1.0.0
   */
  searchParams: Object;

  /**
   * The path parameters to be passed to the web-component-based micro frontend.
   * @since 1.0.0
   */
  pathParams: Object;

  /**
   * The clientPermissions to be passed to the web-component-based micro frontend.
   * @since 1.0.0
   */
  clientPermissions: Object;

  /**
   * The user settings to be passed to the web-component-based micro frontend
   * @since 1.0.0
   */
  userSettings: Object;

  /**
   * The anchor value to be passed to the web-component-based micro frontend.
   * @since 1.0.0
   */
  anchor: string;

  /**
   * The list of rules for the content in the iframe, managed by the HTML `allow` attribute.
   * You can use one or more rules by adding them to the array, for example allowRules: ["microphone", "camera"].
   * @example <luigi-container viewUrl="/index.html" allow-rules='["microphone", "camera"]'></luigi-container>
   * @example containerElement.allowRules = ['microphone', 'camera']
   * @since 1.2.0
   */
  allowRules: string[];

  /**
   * The list of rules for the content in the iframe, managed by the HTML `sandbox` attribute.
   * You can use one or more rules by adding them to the array, for example sandboxRules: ["allow-scripts", "allow-same-origin"].
   * @example <luigi-container viewUrl="/index.html" sandbox-rules='["allow-scripts", "allow-same-origin"]'></luigi-container>
   * @example containerElement.sandboxRules = ['allow-modals', 'allow-popups']
   * @since 1.2.0
   */
  sandboxRules: string[];

  /**
   * The document title value to be passed to the web-component-based micro frontend.
   * @since 1.2.0
   */
  documentTitle: string;

  /**
   * The hasBack value to be passed to the web-component-based micro frontend.
   * It indicates that there is one or more preserved views. Useful when you need to show a back button.
   * @since 1.2.0
   */
  hasBack: string;

  /**
   * The dirty status value to be passed to the web-component-based micro frontend.
   * It's used to indicate that there are unsaved changes when navigating away.
   * @since 1.2.0
   */
  dirtyStatus: boolean;

  /**
   * Function that updates the context of the microfrontend
   * @param {Object} contextObj The context data
   * @param {Object} internal internal luigi legacy data used for iframes
   * @example
   * containerElement.updateContext({newContextData: 'some data'})
   * @since 1.0.0
   */
  updateContext(contextObj: Object, internal?: Object): void;

  /**
   * Send a custom message to the microfronted
   * @param id a string containing the message id
   * @param data data to be sent alongside the custom message
   * @example
   * containerElement.sendCustomMessage('my-message-id', {dataToSend: 'some data'})
   * @since 1.0.0
   */
  sendCustomMessage(id: string, data?: Object): void;

  /**
   * A function that notifies the microfrontend that the opened alert has been closed
   * @param id the id of the opened alert
   * @param dismissKey the key specifying which dismiss link was clicked on the alert message
   * @example
   * containerElement.closeAlert('my-alert-id', 'my-dismiss-key')
   * @since 1.0.0
   */
  closeAlert(id: string, dismissKey: string): void;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   * @example
   * containerElement.init()
   * @since 1.0.0
   */
  init(): void;

  /**
   * The authData value to be passed to the iframe-based micro frontend.
   * @since 1.2.0
   */
  authData: Object;
}
