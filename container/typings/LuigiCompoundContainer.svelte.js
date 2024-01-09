/**
 * Luigi Compound Container provides the possibility to insert multiple webcomponent-based microfrontends in one container
 * @name LuigiCompoundContainer
 */
export default class LuigiCompoundContainer extends HTMLElement {
  /**
   * The configuration for the compound microfrontend
   * Take a look at https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=compound
   *
   * @type {Object}
   */
  compoundConfig;

  /**
   * If set to true defers from initializing the microfronted automatically. In that case init() can be used
   * @type {boolean}
  */
  deferInit;

  /**
   * The search parameters to be passed to the compound micro frontend.
   * @type {Object}
   */
  searchParams;

  /**
   * The path parameters to be passed to the compound micro frontend.
   * @type {Object}
   */
  pathParams;

  /**
   * The context to be passed to the compound microfrontend
   * @type {Object}
   */
  context;

  /**
   * The clientPermissions to be passed to the compound micro frontend.
   * @type {Object}
   */
  clientPermissions;

  /**
   * The user settings to be passed to the compound micro frontend
   * @type {number | string | boolean}
   */
  userSettings;

  /**
   * The anchor value to be passed to the compound micro frontend.
   * @type {string}
   */
  anchor;

  /**
   * @typedef {Object} WebComponentSettings
   * @property {string} [type] string, like module.
   * @property {boolean} [selfRegistered] f it is true, the web component bundle will be added via script tag.
   * @property {string} [tagName] tag name where web component is added to DOM.
   */
  /**
   * The boolean if true for default webcomponen behavior or WebComponentSettings for more advanced setup.
   * @type {boolean | WebComponentSettings}
   */
  webcomponent;

  /**
   * Updates the context of the compound microfrontend
   * @param {Object} contextObj  The context data
   */
  updateContext(contextObj) {}

  /**
   * Manually triggers the micro frontend rendering process when using defer-init attribute
   */
  init() {}
}
