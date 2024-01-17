export declare interface NodeParams {
  [key: string]: string;
}

export declare interface UserSettings {
  [key: string]: number | string | boolean;
}

export declare interface WebComponentSettings {
  type?: string;
  selfRegistered?: boolean;
  tagName?: string;
}

export default class LuigiContainer extends HTMLElement {
  /**
   * The URL of the microfrontend to be rendered
   * 
   * @since NEXTRELEASE
   */
  viewurl: string;

  /**
   * If set to true defers from initializing the microfronted automatically. In that case init() can be used
   * 
   * @since NEXTRELEASE
   */
  deferInit: boolean;

  /**
   * The context to be passed to the microfrontend. It can be an object or a stringified object.
   * @param {Object} object to be passed to the microfrontend
   * @param {string} string must be a stringified JSON object.
   * @since NEXTRELEASE
   */
  context: object | string;

  /**
   * Label information for the microfrontend
   * @since NEXTRELEASE
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
   * @since NEXTRELEASE
   */
  webcomponent: boolean | WebComponentSettings | string;

  /**
   * The locale to be passed to the web-component-based micro frontend
   * @since NEXTRELEASE
   */
  locale: string;

  /**
   * The theme to be passed to the  web-component-based micro frontend
   * @since NEXTRELEASE
   */
  theme: string;

  /**
   * The list of active feature toggles to be passed to the web-component-based micro frontend
   * @since NEXTRELEASE
   */
  activeFeatureToggleList: string[];

  /**
   * If set to true, skips handshake and ready event is fired immediately 
   * @since NEXTRELEASE
   */
  skipInitCheck: boolean;

  /**
   * The parameters to be passed to the web-component-based micro frontend. Will not be passed to the compound children.
   * @since NEXTRELEASE
   */
  nodeParams: NodeParams;

  /**
   * The search parameters to be passed to the web-component-based micro frontend.
   * @since NEXTRELEASE
   */
  searchParams: any;

  /**
   * The path parameters to be passed to the web-component-based micro frontend.
   * @since NEXTRELEASE
   */
  pathParams: any;

  /**
   * The clientPermissions to be passed to the web-component-based micro frontend.
   * @since NEXTRELEASE
   */
  clientPermissions: any;

  /**
   * The user settings to be passed to the web-component-based micro frontend
   * @since NEXTRELEASE
   */
  userSettings: UserSettings;

  /**
   * The anchor value to be passed to the web-component-based micro frontend.
   * @since NEXTRELEASE
   */
  anchor: string;

  /**
   * Updates the context of the microfrontend
   * @param contextObj The context data
   * @param internal internal luigi legacy data used for iframes
   * @since NEXTRELEASE
   */
  updateContext(contextObj: any, internal?: any): void;

  /**
   * Send a custom message to the microfronted
   * @param id a string containing the message id
   * @param data data to be sent alongside the custom message
   * @since NEXTRELEASE
   */
  sendCustomMessage(id: string, data?: any): void;

  /**
   * Notifies the microfrontend that the opened alert has been closed
   * @param id the id of the opened alert
   * @param dismissKey the key specifying which dismiss link was clicked on the alert message
   * @since NEXTRELEASE
   */
  closeAlert(id: any, dismissKey: any): Function;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   * @since NEXTRELEASE
   */
  init(): Function;
}
