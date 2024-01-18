export declare interface WebComponentSettings {
  type?: string;
  selfRegistered?: boolean;
  tagName?: string;
}

export default class LuigiContainer extends HTMLElement {
  /**
   * The URL of the microfrontend to be rendered
   */
  viewurl: string;

  /**
   * If set to true defers from initializing the microfronted automatically. In that case init() can be used
   */
  deferInit: boolean;

  /**
   * The stringified context object to be passed to the microfrontend
   */
  context: string;

  /**
   * Label information for the microfrontend
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
   */
  webcomponent: boolean | WebComponentSettings | string;

  /**
   * The locale to be passed to the web-component-based micro frontend
   */
  locale: string;

  /**
   * The theme to be passed to the  web-component-based micro frontend
   */
  theme: string;

  /**
   * The list of active feature toggles to be passed to the web-component-based micro frontend
   */
  activeFeatureToggleList: string[];

  /**
   * If set to true, skips handshake and ready event is fired immediately 
   */
  skipInitCheck: boolean;

  /**
   * The parameters to be passed to the web-component-based micro frontend. Will not be passed to the compound children.
   */
  nodeParams: Object;

  /**
   * The search parameters to be passed to the web-component-based micro frontend.
   */
  searchParams: Object;

  /**
   * The path parameters to be passed to the web-component-based micro frontend.
   */
  pathParams: Object;

  /**
   * The clientPermissions to be passed to the web-component-based micro frontend.
   */
  clientPermissions: Object;

  /**
   * The user settings to be passed to the web-component-based micro frontend
   */
  userSettings: Object;

  /**
   * The anchor value to be passed to the web-component-based micro frontend.
   */
  anchor: string;

  /**
   * Function that updates the context of the microfrontend
   * @param {Object} contextObj The context data
   * @param {Object} internal internal luigi legacy data used for iframes
   * 
   * @example
   * containerElement.updateContext({newContextData: 'some data'})
   */
  updateContext(contextObj: Object, internal?: Object): void;

  /**
   * Send a custom message to the microfronted
   * @param id a string containing the message id
   * @param data data to be sent alongside the custom message
   * 
   * @example
   * containerElement.sendCustomMessage('my-message-id', {dataToSend: 'some data'})
   */
  sendCustomMessage(id: string, data?: Object): void;

  /**
   * A function that notifies the microfrontend that the opened alert has been closed
   * @param id the id of the opened alert
   * @param dismissKey the key specifying which dismiss link was clicked on the alert message
   * 
   * @example
   * containerElement.closeAlert('my-alert-id', 'my-dismiss-key')
   */
  closeAlert(id: string, dismissKey: string): void;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   * 
   * @example
   * containerElement.init()
   */
  init(): void;
}
