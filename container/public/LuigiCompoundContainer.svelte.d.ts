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
}
