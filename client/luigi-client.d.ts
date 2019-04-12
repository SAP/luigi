// Type definitions for Luigi Client

export as namespace LuigiClient;

export declare interface AuthData {
  accessToken?: string;
  accessTokenExpirationDate?: number;
  idToken?: string;
  [key: string]: any;
}

export declare interface ConfirmationModalSettings {
  header?: string;
  body?: string;
  buttonConfirm?: string;
  buttonDismiss?: string;
}

export declare interface ModalSettings {
  title?: string;
  size?: 'l' | 'm' | 's';
}

export declare interface Context {
  authData?: AuthData;
  context?: { parentNavigationContext?: string[] };
  internal?: any;
  nodeParams?: NodeParams;
  pathParams?: PathParams;
  [key: string]: any;
}

export declare interface NodeParams {
  [key: string]: string;
}

export declare interface AlertSettings {
  text?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  links?: {
    [key: string]: { text: string; url: string };
  };
  id?:string
}

export declare interface PathParams {
  [key: string]: string;
}

export declare interface UxManager {
  /**
   * Adds a backdrop to block the top and side navigation. It is based on the Fundamental UI Modal, which you can use in your micro front-end to achieve the same behavior.
   */
  addBackdrop: () => void;

  /**
   * Removes the backdrop.
   */
  removeBackdrop: () => void;

  /**
   * Adds a backdrop with a loading indicator for the micro front-end frame. This overrides the {@link navigation-configuration.md#nodes loadingIndicator.enabled} setting.
   */
  showLoadingIndicator: () => void;

  /**
   * Removes the loading indicator. Use it after calling {@link #showLoadingIndicator showLoadingIndicator()} or to hide the indicator when you use the {@link navigation-configuration.md#nodes loadingIndicator.hideAutomatically: false} node configuration.
   */
  hideLoadingIndicator: () => void;

  /**
   * This method informs the main application that there are unsaved changes in the current view in the iframe. For example, that can be a view with form fields which were edited but not submitted.
   * @param {boolean} isDirty indicates if there are any unsaved changes on the current page or in the component
   */
  setDirtyStatus: (isDirty: boolean) => void;

  /**
   * Shows an alert.
   * @param {Object} settings the settings for the alert
   * @param {string} settings.text the content of the alert. To add a link to the content, you have to set up the link in the `links` object. The key(s) in the `links` object must be used in the text to reference the links, wrapped in curly brackets with no spaces. If you don't specify any text, the alert is not displayed.
   * @param {('info'|'success'|'warning'|'error')} settings.type sets the type of the alert
   * @param {Object} settings.links provides links data
   * @param {Object} settings.links.LINK_KEY object containing the data for a particular link. To properly render the link in the alert message refer to the description of the **settings.text** parameter.
   * @param {string} settings.links.LINK_KEY.text text which replaces the link identifier in the alert content
   * @param {string} settings.links.LINK_KEY.url url to navigate when you click the link. Currently, only internal links are supported in the form of relative or absolute paths.
   * @returns {promise} which is resolved when the alert is dismissed
   * @example
   * import LuigiClient from '@kyma-project/luigi-client';
   * const settings = {
   *  text: Ut enim ad minim veniam, {goToHome} quis nostrud exercitation ullamco {relativePath} laboris nisi ut aliquip ex ea commodo consequat.
   *    Duis aute irure dolor {goToOtherProject},
   *  type: 'info',
   *  links: {
   *    goToHome: { text: 'homepage', url: '/overview' },
   *    goToOtherProject: { text: 'other project', url: '/projects/pr2' },
   *    relativePath: { text: 'relative hide side nav', url: 'hideSideNav' }
   *  }
   * }
   * LuigiClient
   *  .uxManager()
   *  .showAlert(settings)
   *  .then(() => {
   *     // Logic to execute when the alert is dismissed
   * });
   */
  showAlert: (settings: AlertSettings) => Promise<void>;

  /**
   * Shows a confirmation modal.
   * @param {Object} settings the settings the confirmation modal. If no value is provided for any of the fields, a default value is set for it.
   * @param {string} settings.header the content of the modal header
   * @param {string} settings.body the content of the modal body
   * @param {string} settings.buttonConfirm the label for the modal confirm button
   * @param {string} settings.buttonDismiss the label for the modal dismiss button
   * @returns {promise} which is resolved when accepting the confirmation modal and rejected when dismissing it.
   */
  showConfirmationModal: (settings: ConfirmationModalSettings) => Promise<void>;
}

export declare interface LinkManager {
  /**
   * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
   * @returns {linkManager} link manager instance.
   * @example
   * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
   */
  fromClosestContext: () => this;

  /**
   * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
   * @param {string} navigationContext
   * @returns {linkManager} link manager instance.
   * @example
   * LuigiClient.linkManager().fromContext('project').navigate('/settings')
   */
  fromContext: (navigationContext: string) => this;

  /**
   * Discards the active view and navigates back to the last visited view (preserved view), if a preserved view was set before.
   * @param {any} goBackValue data that is passed in the `goBackContext` field to the last visited view
   * @example
   * LuigiClient.linkManager().goBack({ foo: 'bar' });
   * LuigiClient.linkManager().goBack(true);
   */
  goBack: (goBackValue: any) => void;

  /**
   * Checks if there is one or more preserved views. You can use it to show a **back** button.
   * @returns {boolean} indicating if there is a preserved view you can return to.
   */
  hasBack: () => boolean;

  /**
   * Navigates to the given path in the application hosted by Luigi. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
   * @param {string} path path to be navigated to
   * @param {string} sessionId current Luigi **sessionId**
   * @param {boolean} preserveView Preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as the standard {@link #navigate navigate()} function is used instead of {@link #goBack goBack()}.
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size.
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty.
   * @param {('l'|'m'|'s')} [modalSettings.size=l] size of the modal (optional, default `l`)
   * @example
   * LuigiClient.linkManager().navigate('/overview')
   * LuigiClient.linkManager().navigate('users/groups/stakeholders')
   * LuigiClient.linkManager().navigate('/settings', null, true) // preserve view
   */
  navigate: (
    path: string,
    sessionId?: string,
    preserveView?: boolean,
    modalSettings?: ModalSettings
  ) => void;

  /**
   * Checks if the path you can navigate to exists in the main application. For example, you can use this helper method conditionally to display a DOM element like a button.
   * @param {string} path path which existence you want to check
   * @returns {promise} A promise which resolves to a Boolean variable specifying whether the path exists or not.
   * @example
   *  let pathExists;
   *  this.luigiClient
   *  .linkManager()
   *  .pathExists('projects/pr2')
   *  .then(
   *    (pathExists) => {  }
   *  );
   */
  pathExists: (path: string) => Promise<boolean>;

  /**
   * Sends node parameters to the route. The parameters are used by the `navigate` function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
   * @param {Object} nodeParams
   * @returns {linkManager} link manager instance.
   * @example
   * LuigiClient.linkManager.withParams({foo: "bar"}).navigate("path")
   *
   * // Can be chained with context setting functions such as:
   * LuigiClient.linkManager.fromContext("currentTeam").withParams({foo: "bar"}).navigate("path")
   */
  withParams: (nodeParams: NodeParams) => this;

  /**
   * Opens a view in a modal. You can specify the modal's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
   * @param {string} path navigation path
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size.
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty.
   * @param {('l'|'m'|'s')} [modalSettings.size=l] size of the modal (optional, default `l`)
   * @example
   * LuigiClient.linkManager().openAsModal('projects/pr1/users', {title:'Users', size:'m'});
   */
  openAsModal: (nodepath: string, modalSettings?: ModalSettings) => void;
}

/**
 * Registers a listener called with the context object as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
 * @param {function} initFn the function that is called once Luigi is initialized
 * @memberof lifecycle
 */
export function addInitListener(initFn: (context: Context) => void): number;
export type addInitListener = (initFn: (context: Context) => void) => number;

/**
 * Removes an init listener.
 * @param {string} id the id that was returned by the `addInitListener` function
 * @memberof lifecycle
 */
export function removeInitListener(id: number): boolean;
export type removeInitListener = (id: number) => boolean;

/**
 * Registers a listener called with the context object upon any navigation change.
 * @param {function} contextUpdatedFn the listener function called each time Luigi context changes
 * @memberof lifecycle
 */
export function addContextUpdateListener(
  contextUpdatedFn: (context: Context) => void
): string;
export type addContextUpdateListener = (
  contextUpdatedFn: (context: Context) => void
) => string;

/**
 * Removes a context update listener.
 * @param {string} id the id that was returned by the `addContextUpdateListener` function
 * @memberof lifecycle
 */
export function removeContextUpdateListener(id: string): boolean;
export type removeContextUpdateListener = (id: string) => boolean;

/**
 * @returns {string} the authorization token
 */
export function getToken(): AuthData['accessToken'];
export type getToken = () => AuthData['accessToken'];

/**
 * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
 * @returns {Object} current context data.
 * @memberof lifecycle
 */
export function getEventData(): Context;
export type getEventData = () => Context;

/**
 * Returns the node parameters of the active URL.
 * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro front-end view.  The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
 * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in node parameters are HTML-encoded.
 * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`.
 * @memberof lifecycle
 */
export function getNodeParams(): NodeParams;
export type getNodeParams = () => NodeParams;

/**
 * Returns the dynamic path parameters of the active URL.
 * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
 * All path parameters in the current navigation path (as defined by the active URL) are returned.
 * >**NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in path parameters are HTML-encoded.
 * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`.
 * @memberof lifecycle
 */
export function getPathParams(): PathParams;
export type getPathParams = () => PathParams;

/**
 * The Link Manager allows you to navigate to another route. Use it instead of an internal router to:
  - Route inside micro front-ends.
  - Reflect the route.
  - Keep the navigation state in Luigi.
*/
/** @name linkManager */
export function linkManager(): LinkManager;
export type linkManager = () => LinkManager;

/**
 * Use the UX Manager to manage the appearance features in Luigi.
 */
/** @name uxManager */
export function uxManager(): UxManager;
export type uxManager = () => UxManager;
