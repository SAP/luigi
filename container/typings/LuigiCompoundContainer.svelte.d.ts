export declare interface UserSettings {
  [key: string]: number | string | boolean;
}

export declare interface WebComponentSettings {
  type?: string;
  selfRegistered?: boolean;
  tagName?: string;
}
export default class LuigiCompoundContainer extends HTMLElement {
  compoundConfig: any;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   */
  init(): Function;

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
   * The user settings to be passed to the web-component-based micro frontend
   */
  userSettings: UserSettings;

  /**
   * The anchor value to be passed to the web-component-based micro frontend.
   */
  anchor: string;

  /**
   * The following properties can be set for the web component object. By default, the web component is set to true.
   * @param {Object} [WebComponentSettings]
   * @param {string} WebComponentSettings.type: string, like module.
   * @param {boolean} WebComponentSettings.selfRegistered: if it is true, the web component bundle will be added via script tag.
   * @param {string} WebComponentSettings.tagName: tag name where web component is added to DOM.
   */
  webcomponent: boolean | WebComponentSettings;
}
