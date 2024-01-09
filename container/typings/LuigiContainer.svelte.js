/**
 * Use the functions and parameters to define the LuigiContainer.
 * @name LuigiContainer
 */
export default class LuigiContainer extends HTMLElement {
  /**
   * The URL of the microfrontend to be rendered
   */
  viewurl;

  /**
   * If set to true defers from initializing the microfronted automatically. In that case init() can be used
   */
  deferInit;

  /**
   * The context to be passed to the microfrontend
   */
  context;

  /**
   * Label information for the microfrontend
   */
  label;

  /**
   * Predicate that sets whether the microfrontend is to be rendered in a web component or not. It can also be an object with the following attributes:
   * @param {Object} [WebComponentSettings]
   * @param {string} WebComponentSettings.type: string, like module.
   * @param {boolean} WebComponentSettings.selfRegistered: if it is true, the web component bundle will be added via script tag.
   * @param {string} WebComponentSettings.tagName: tag name where web component is added to DOM.
   */
  webcomponent;

  /**
   * The locale to be passed to the web-component-based micro frontend
   */
  locale;

  /**
   * The theme to be passed to the  web-component-based micro frontend
   */
  theme;

  /**
   * The list of active feature toggles to be passed to the web-component-based micro frontend
   */
  activeFeatureToggleList;

  /**
   * If set to true, skips handshake and ready event is fired immediately 
   */
  skipInitCheck;

  /**
   * The parameters to be passed to the web-component-based micro frontend. Will not be passed to the compound children.
   */
  nodeParams;

  /**
   * The search parameters to be passed to the web-component-based micro frontend.
   */
  searchParams;

  /**
   * The path parameters to be passed to the web-component-based micro frontend.
   */
  pathParams;

  /**
   * The clientPermissions to be passed to the web-component-based micro frontend.
   */
  clientPermissions;

  /**
   * The user settings to be passed to the web-component-based micro frontend
   */
  userSettings;

  /**
   * The anchor value to be passed to the web-component-based micro frontend.
   */
  anchor;

  /**
   * Updates the context of the microfrontend
   * @param contextObj The context data
   * @param internal internal luigi legacy data used for iframes
   */
  updateContext(contextObj, internal){};

  /**
   * Send a custom message to the microfronted
   * @param id a string containing the message id
   * @param data data to be sent alongside the custom message
   */
  sendCustomMessage(id, data){};

  /**
   * Notifies the microfrontend that the opened alert has been closed
   * @param id the id of the opened alert
   * @param dismissKey the key specifying which dismiss link was clicked on the alert message
   */
  closeAlert(id, dismissKey){};

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   */
  init(){};
}
