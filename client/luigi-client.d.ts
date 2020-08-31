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

export declare interface SplitViewSettings {
  title?: string;
  size?: number;
  collapsed?: boolean;
}

export enum SplitViewEvents {
  'expand',
  'collapse',
  'resize',
  'close'
}

export declare interface SplitViewInstance {
  collapse: () => void;
  expand: () => void;
  setSize: (value: number) => void;
  on: (key: SplitViewEvents, callback: () => void) => string; //
  exists: () => boolean;
  getSize: () => number;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
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

export declare interface ClientPermissions {
  [key: string]: any;
}

export declare interface AlertSettings {
  text?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  links?: {
    [key: string]: { text: string; url: string };
  };
  closeAfter?: number;
}

export declare interface PathParams {
  [key: string]: string;
}

export declare interface UxManager {
  /**
   * Adds a backdrop to block the top and side navigation. It is based on the Fundamental UI Modal, which you can use in your micro frontend to achieve the same behavior.
   * @memberof uxManager
   */
  addBackdrop: () => void;

  /**
   * Removes the backdrop.
   * @memberof uxManager
   */
  removeBackdrop: () => void;

  /**
   * Adds a backdrop with a loading indicator for the micro frontend frame. This overrides the {@link navigation-parameters-reference.md#node-parameters loadingIndicator.enabled} setting.
   * @memberof uxManager
   */
  showLoadingIndicator: () => void;

  /**
   * Removes the loading indicator. Use it after calling {@link #showLoadingIndicator showLoadingIndicator()} or to hide the indicator when you use the {@link navigation-parameters-reference.md#node-parameters loadingIndicator.hideAutomatically: false} node configuration.
   * @memberof uxManager
   */
  hideLoadingIndicator: () => void;

  /**
   * Closes the currently opened micro frontend modal.
   * @memberof uxManager
   */
  closeCurrentModal: () => void;

  /**
   * This method informs the main application that there are unsaved changes in the current view in the iframe. For example, that can be a view with form fields which were edited but not submitted.
   * @param {boolean} isDirty indicates if there are any unsaved changes on the current page or in the component
   * @memberof uxManager
   */
  setDirtyStatus: (isDirty: boolean) => void;

  /**
   * Shows an alert.
   * @memberof uxManager
   * @param {Object} settings the settings for the alert
   * @param {string} settings.text the content of the alert. To add a link to the content, you have to set up the link in the `links` object. The key(s) in the `links` object must be used in the text to reference the links, wrapped in curly brackets with no spaces. If you don't specify any text, the alert is not displayed
   * @param {('info'|'success'|'warning'|'error')} settings.type sets the type of alert
   * @param {Object} settings.links provides links data
   * @param {Object} settings.links.LINK_KEY object containing the data for a particular link. To properly render the link in the alert message refer to the description of the **settings.text** parameter
   * @param {string} settings.links.LINK_KEY.text text which replaces the link identifier in the alert content
   * @param {string} settings.links.LINK_KEY.url url to navigate when you click the link. Currently, only internal links are supported in the form of relative or absolute paths
   * @param {number} settings.closeAfter (optional) time in milliseconds that tells Luigi when to close the Alert automatically. If not provided, the Alert will stay on until closed manually. It has to be greater than `100`
   * @returns {promise} which is resolved when the alert is dismissed
   * @example
   * import LuigiClient from '@luigi-project/client';
   * const settings = {
   *  text: "Ut enim ad minim veniam, {goToHome} quis nostrud exercitation ullamco {relativePath}. Duis aute irure dolor {goToOtherProject}",
   *  type: 'info',
   *  links: {
   *    goToHome: { text: 'homepage', url: '/overview' },
   *    goToOtherProject: { text: 'other project', url: '/projects/pr2' },
   *    relativePath: { text: 'relative hide side nav', url: 'hideSideNav' }
   *  },
   *  closeAfter: 3000
   * }
   * LuigiClient
   *  .uxManager()
   *  .showAlert(settings)
   *  .then(() => {
   *     // Logic to execute when the alert is dismissed
   *  });
   */
  showAlert: (settings: AlertSettings) => Promise<void>;

  /**
   * Shows a confirmation modal.
   * @memberof uxManager
   * @param {Object} settings the settings of the confirmation modal. If you don't provide any value for any of the fields, a default value is used
   * @param {string} [settings.header="Confirmation"] the content of the modal header
   * @param {string} [settings.body="Are you sure you want to do this?"] the content of the modal body
   * @param {string} [settings.buttonConfirm="Yes"] the label for the modal confirm button
   * @param {string} [settings.buttonDismiss="No"] the label for the modal dismiss button
   * @returns {promise} which is resolved when accepting the confirmation modal and rejected when dismissing it
   * @example
   * import LuigiClient from '@kyma-project/luigi-client';
   * const settings = {
   *  header: "Confirmation",
   *  body: "Are you sure you want to do this?",
   *  buttonConfirm: "Yes",
   *  buttonDismiss: "No"
   * }
   * LuigiClient
   *  .uxManager()
   *  .showConfirmationModal(settings)
   *  .then(() => {
   *     // Logic to execute when the confirmation modal is dismissed
   *  });
   */
  showConfirmationModal: (settings: ConfirmationModalSettings) => Promise<void>;

  /**
   * Gets the current locale.
   * @returns {string} current locale
   * @memberof uxManager
   */
  getCurrentLocale: () => string;

  /**
   * Sets current locale to the specified one.
   *
   * **NOTE:** this must be explicitly allowed on the navigation node level by setting `clientPermissions.changeCurrentLocale` to `true`. (See {@link navigation-parameters-reference.md Node parameters}.)
   *
   * @param {string} locale locale to be set as the current locale
   * @memberof uxManager
   */
  setCurrentLocale: (locale: string) => void;

  /**
   * Checks if the current micro frontend is displayed inside a split view
   * @returns {boolean} indicating if it is loaded inside a split view
   * @memberof uxManager
   * @since 0.6.0
   */
  isSplitView: () => boolean;

  /**
   * Checks if the current micro frontend is displayed inside a modal
   * @returns {boolean} indicating if it is loaded inside a modal
   * @memberof uxManager
   * @since 0.6.0
   */
  isModal: () => boolean;
}

export declare interface LinkManager {
  /**
   * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
   */
  fromClosestContext: () => this;

  /**
   * Sets the current navigation context to that of a specific parent node which has the {@link navigation-configuration.md navigationContext} field declared in the navigation configuration. This navigation context is then used by the `navigate` function.
   * @memberof linkManager
   * @param {string} navigationContext
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromContext('project').navigate('/settings')
   */
  fromContext: (navigationContext: string) => this;

  /**
   * Enables navigating to sibling nodes without knowing the absolute path
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * LuigiClient.linkManager().fromParent().navigate('/sibling')
   */
  fromParent: () => this;

  /**
   * Sets the current navigation base to the parent node that is defined as virtualTree. This method works only when the currently active micro frontend is inside a virtualTree.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * LuigiClient.linkManager().fromVirtualTreeRoot().navigate('/users/groups/stakeholders')
   */
  fromVirtualTreeRoot: () => this;

  /**
   * Discards the active view and navigates back to the last visited view. Works with preserved views, and also acts as the substitute of the browser **back** button. **goBackContext** is only available when using preserved views.
   * @memberof linkManager
   * @param {any} goBackValue data that is passed in the **goBackContext** field to the last visited view when using preserved views
   * @example
   * LuigiClient.linkManager().goBack({ foo: 'bar' });
   * LuigiClient.linkManager().goBack(true);
   */
  goBack: (goBackValue: any) => void;

  /**
   * Checks if there is one or more preserved views. You can use it to show a **back** button.
   * @memberof linkManager
   * @returns {boolean} indicating if there is a preserved view you can return to
   */
  hasBack: () => boolean;

  /**
   * Navigates to the given path in the application hosted by Luigi. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
   * @memberof linkManager
   * @param {string} path path to be navigated to
   * @param {string} sessionId current Luigi **sessionId**
   * @param {boolean} preserveView preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as you use the standard {@link #navigate navigate()} function instead of {@link #goBack goBack()}
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] creates split view but leaves it closed initially
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

  /** @lends linkManager */
  /**
   * Checks if the path you can navigate to exists in the main application. For example, you can use this helper method conditionally to display a DOM element like a button.
   * @memberof linkManager
   * @param {string} path path which existence you want to check
   * @returns {promise} a promise which resolves to a Boolean variable specifying whether the path exists or not
   * @example
   *  let pathExists;
   *  LuigiClient
   *  .linkManager()
   *  .pathExists('projects/pr2')
   *  .then(
   *    (pathExists) => {  }
   *  );
   */
  pathExists: (path: string) => Promise<boolean>;

  /**
   * Sends node parameters to the route. The parameters are used by the `navigate` function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
   * @memberof linkManager
   * @param {Object} nodeParams
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().withParams({foo: "bar"}).navigate("path")
   *
   * // Can be chained with context setting functions such as:
   * LuigiClient.linkManager().fromContext("currentTeam").withParams({foo: "bar"}).navigate("path")
   */
  withParams: (nodeParams: NodeParams) => this;

  /**
   * Opens a view in a modal. You can specify the modal's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @example
   * LuigiClient.linkManager().openAsModal('projects/pr1/users', {title:'Users', size:'m'});
   */
  openAsModal: (nodepath: string, modalSettings?: ModalSettings) => void;

  /**
   * Opens a view in a split view. You can specify the split view's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty. The default size of the split view is `40`, which means 40% height of the split view.
   * @memberof linkManager
   * @param {string} path navigation path
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] opens split view in collapsed state
   * @returns {Object} instance of the SplitView. It provides Event listeners and you can use the available functions to control its behavior.
   * @see {@link splitView} for further documentation about the returned instance
   * @since 0.6.0
   * @example
   * const splitViewHandle = LuigiClient.linkManager().openAsSplitView('projects/pr1/logs', {title: 'Logs', size: 40, collapsed: true});
   */
  openAsSplitView: (
    path: string,
    splitViewSettings?: SplitViewSettings
  ) => SplitViewInstance;

  /**
   * Disables the navigation handling for a single navigation request
   * It prevents Luigi Core from handling url change after `navigate()`.
   * Used for auto-navigation
   * @since 0.7.7
   * @example
   * LuigiClient.linkManager().withoutSync().navigate('/projects/xy/foobar');
   * LuigiClient.linkManager().withoutSync().fromClosestContext().navigate('settings');
   */
  withoutSync: () => this;
}

/**
 * Registers a listener called with the context object and the Luigi Core domain as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
 * @param {Lifecycle~initListenerCallback} initFn the function that is called once Luigi is initialized, receives current context and origin as parameters
 * @memberof Lifecycle
 */
export function addInitListener(
  initFn: (context: Context, origin?: string) => void
): number;
export type addInitListener = (
  initFn: (context: Context, origin?: string) => void
) => number;

/**
 * Callback of the addInitListener
 * @callback Lifecycle~initListenerCallback
 * @param {Object} context current context data
 * @param {string} origin Luigi Core URL
 */
/**
 * Removes an init listener.
 * @param {string} id the id that was returned by the `addInitListener` function.
 * @memberof Lifecycle
 */
export function removeInitListener(id: number): boolean;
export type removeInitListener = (id: number) => boolean;

/**
 * Registers a listener called with the context object when the URL is changed. For example, you can use this when changing environments in a context switcher in order for the micro frontend to do an API call to the environment picked.
 * @param {function} contextUpdatedFn the listener function called each time Luigi context changes
 * @memberof Lifecycle
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
 * @memberof Lifecycle
 */
export function removeContextUpdateListener(id: string): boolean;
export type removeContextUpdateListener = (id: string) => boolean;

/**
 * Registers a listener called upon micro frontend inactivity. This happens when a new micro frontend gets shown while keeping the old one cached.
 * Gets called when:
 * - navigating with **preserveView**
 * - navigating from or to a **viewGroup**
 *
 * Does not get called when navigating normally, or when `openAsModal` or `openAsSplitView` are used.
 * @param {function} inactiveFn the listener function called each time a micro frontend turns into an inactive state
 * @memberof Lifecycle
 */
export function addInactiveListener(inactiveFn: () => void): string;
export type addInactiveListener = (inactiveFn: () => void) => string;

/**
 * Removes a listener for inactive micro frontends.
 * @param {string} id the id that was returned by the `addInactiveListener` function
 * @memberof Lifecycle
 */
export function removeInactiveListener(id: string): boolean;
export type removeInactiveListener = (id: string) => boolean;

/**
 * Registers a listener called when the micro frontend receives a custom message.
 * @param {string} customMessageId the custom message id
 * @param {Lifecycle~customMessageListenerCallback} customMessageListener the function that is called when the micro frontend receives the corresponding event
 * @memberof Lifecycle
 * @since 0.6.2
 */
export function addCustomMessageListener(
  customMessageId: string,
  customMessageListener: (customMessage: Object, listenerId: string) => void
): string;
export type addCustomMessageListener = (
  customMessageId: string,
  customMessageListener: (customMessage: Object, listenerId: string) => void
) => string;

/**
 * Callback of the customMessageListener
 * @callback Lifecycle~customMessageListenerCallback
 * @param {Object} customMessage custom message object
 * @param {string} customMessage.id message id
 * @param {*} customMessage.MY_DATA_FIELD any other message data field
 * @param {string} listenerId custom message listener id to be used for unsubscription
 */
/**
 * Removes a custom message listener.
 * @param {string} id the id that was returned by the `addInitListener` function
 * @memberof Lifecycle
 * @since 0.6.2
 */
export function removeCustomMessageListener(id: string): boolean;
export type removeCustomMessageListener = (id: string) => boolean;

/**
 * Returns the currently valid access token.
 * @returns {string} current access token
 * @memberof Lifecycle
 */
export function getToken(): AuthData['accessToken'];
export type getToken = () => AuthData['accessToken'];

/**
 * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
 * @returns {Object} current context data
 * @memberof Lifecycle
 */
export function getEventData(): Context;
export type getEventData = () => Context;

/**
 * Returns the context object. It is an alias function for getEventData().
 * @returns {Object} current context data
 * @memberof Lifecycle
 */
export function getContext(): Context;
export type getContext = () => Context;

/**
 * Returns the node parameters of the active URL.
 * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro frontend view. The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
 * <!-- add-attribute:class:warning -->
 * > **NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in node parameters are HTML-encoded.
 * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
 * @memberof Lifecycle
 */
export function getNodeParams(): NodeParams;
export type getNodeParams = () => NodeParams;

/**
 * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
 * @memberof Lifecycle
 */
export function getActiveFeatureToggles(): Array<String>;
export type getActiveFeatureToggles = () => Array<String>;

/**
 * Returns the dynamic path parameters of the active URL.
 * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
 * All path parameters in the current navigation path (as defined by the active URL) are returned.
 * <!-- add-attribute:class:warning -->
 * > **NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in path parameters are HTML-encoded.
 * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`
 * @memberof Lifecycle
 */
export function getPathParams(): PathParams;
export type getPathParams = () => PathParams;

/**
 * Returns the current client permissions as specified in the navigation node or an empty object. For details, see [Node parameters](navigation-parameters-reference.md).
 * @returns {Object} client permissions as specified in the navigation node
 * @memberof Lifecycle
 */
export function getClientPermissions(): ClientPermissions;
export type getClientPermissions = () => ClientPermissions;

/**
 * When the micro frontend is not embedded in the Luigi Core application and there is no init handshake you can set the target origin that is used in postMessage function calls by Luigi Client.
 * @param {string} origin target origin
 * @memberof Lifecycle
 * @since 0.7.3
 */
export function setTargetOrigin(targetOrigin: string): void;
export type setTargetOrigin = (targetOrigin: string) => void;

/**
 * Sends a custom message to the Luigi Core application.
 * @param {Object} message an object containing data to be sent to the Luigi Core to process it further. This object is set as an input parameter of the custom message listener on the Luigi Core side
 * @param {string} message.id a string containing the message id
 * @param {*} message.MY_DATA_FIELD any other message data field
 * @example
 * import LuigiClient from '@luigi-project/client';
 * LuigiClient.sendCustomMessage({id: 'environment.created', production: false})
 * @memberof Lifecycle
 * @since 0.6.2
 */
export function sendCustomMessage(message: object): void;
export type sendCustomMessage = (message: object) => void;

/**
 * The Link Manager allows you to navigate to another route. Use it instead of an internal router to:
  - Provide routing inside micro frontends.
  - Reflect the route.
  - Keep the navigation state in Luigi.
  * @name linkManager
  */
export function linkManager(): LinkManager;
export type linkManager = () => LinkManager;

/**
 * Use the UX Manager to manage the appearance features in Luigi.
 * @name uxManager
 */
export function uxManager(): UxManager;
export type uxManager = () => UxManager;
