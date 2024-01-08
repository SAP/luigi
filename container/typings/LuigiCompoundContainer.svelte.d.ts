export declare interface UserSettings {
  [key: string]: number | string | boolean;
}

export declare interface WebComponentSettings {
  type?: string;
  selfRegistered?: boolean;
  tagName?: string;
}
/**
 * Luigi Compound Container provides the possibility to insert multiple webcomponent-based microfrontends in one container
 */
export default class LuigiCompoundContainer extends HTMLElement {
  /**
   * The configuration for the compound microfrontend
   * Take a look at https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=compound
   * 
   */
  compoundConfig: any;

  /**
   * If set to true defers from initializing the microfronted automatically. In that case init() can be used
   */
  deferInit: boolean;

  /**
   * The search parameters to be passed to the compound micro frontend.
   */
  searchParams: any;

  /**
   * The path parameters to be passed to the compound micro frontend.
   */
  pathParams: any;

  /**
   * The context to be passed to the compound microfrontend
   */
  context: any;

  /**
   * The clientPermissions to be passed to the compound micro frontend.
   */
  clientPermissions: any;

  /**
   * The user settings to be passed to the compound micro frontend
   */
  userSettings: UserSettings;

  /**
   * The anchor value to be passed to the compound micro frontend.
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

  /**
   * Updates the context of the compound microfrontend
   * @param contextObj The context data
   */
  updateContext(contextObj: any): void;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   */
  init(): Function;
}
