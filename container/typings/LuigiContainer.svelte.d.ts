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
   */
  viewurl: string;

  /**
   * The context to be passed to the microfrontend. It can be an object or a stringified object.
   * @param {Object} object to be passed to the microfrontend
   * @param {string} string must be a stringified JSON object.
   */
  context: object | string;

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
   * The parameters to be passed to the web-component-based micro frontend. Will not be passed to the compound children.
   */
  nodeParams: NodeParams;

  /**
   * The search parameters to be passed to the web-component-based micro frontend.
   */
  searchParams: any;

  /**
   * The path parameters to be passed to the web-component-based micro frontend.
   */
  pathParams: any;

  /**
   * The clientPermissions to be passed to the web-component-based micro frontend.
   */
  clientPermissions: any;

  /**
   * Updates the context of the microfrontend
   * @param contextObj The context object to be updated
   * @param internal internal microfrotend data
   */
  updateContext(contextObj: any, internal?: any): Function;

  /**
   * Notifies the microfrontend that the opened alert has been closed
   * @param id the id of the opened alert
   * @param dismissKey the key specifying which dismiss link was clicked on the alert message
   */
  closeAlert(id: any, dismissKey: any): Function;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   */
  init(): Function;

  /**
   * The user settings to be passed to the web-component-based micro frontend
   */
  userSettings: UserSettings;

  /**
   * The anchor value to be passed to the web-component-based micro frontend.
   */
  anchor: string;
}
