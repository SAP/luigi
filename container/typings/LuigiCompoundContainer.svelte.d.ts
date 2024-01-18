export declare interface WebComponentSettings {
  type?: string;
  selfRegistered?: boolean;
  tagName?: string;
}

export default class LuigiCompoundContainer extends HTMLElement {
  /**
   * The URL used for the renderer
   */
  viewurl: string;

  /**
   * The configuration for the compound microfrontend
   * Take a look at https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=compound
   * 
   */
  compoundConfig: Object;

  /**
   * If set to true defers from initializing the microfronted automatically. In that case init() can be used
   */
  deferInit: boolean;

  /**
   * The search parameters to be passed to the compound micro frontend.
   */
  searchParams: Object;

  /**
   * The path parameters to be passed to the compound micro frontend.
   */
  pathParams: Object;

  /**
   * The stringified context to be passed to the compound microfrontend
   */
  context: string;

  /**
   * The clientPermissions to be passed to the compound micro frontend.
   */
  clientPermissions: Object;

  /**
   * The user settings to be passed to the compound micro frontend
   */
  userSettings: Object;

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
   * @param {string} string must be a stringified JSON object from type `WebComponentSettings`.
   */
  webcomponent: boolean | WebComponentSettings | string;

  /**
   * Function that updates the context of the compound microfrontend
   * @param contextObj The context data
   * 
   * @example
   * containerElement.updateContext({newContextData: 'some data'})
   */
  updateContext(contextObj: Object): void;

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   */
  init();
}
