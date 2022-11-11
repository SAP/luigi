declare interface ConfirmationModalSettings {
  type?: string;
  header?: string;
  body?: string;
  buttonConfirm?: string | boolean;
  buttonDismiss?: string;
}

declare interface ModalSettings {
  title?: string;
  size?: 'fullscreen' | 'l' | 'm' | 's';
  width?: string;
  height?: string;
}

declare interface SplitViewSettings {
  title?: string;
  size?: number;
  collapsed?: boolean;
}

declare enum SplitViewEvents {
  'expand',
  'collapse',
  'resize',
  'close'
}

declare interface SplitViewInstance {
  collapse: () => void;
  expand: () => void;
  setSize: (value: number) => void;
  on: (key: SplitViewEvents, callback: () => void) => string; //
  exists: () => boolean;
  getSize: () => number;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
}

declare interface DrawerSettings {
  header?: any;
  size?: 'l' | 'm' | 's' | 'xs';
  backdrop?: boolean;
  overlap?: boolean;
}

declare interface AlertSettings {
  text?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  links?: {
    [key: string]: { text: string; url?: string; dismissKey?: string };
  };
  closeAfter?: number;
}

declare interface RouteChangingOptions {
  [key: string]: boolean;
}

declare interface NodeParams {
  [key: string]: string;
}

declare interface UxManager {
  /**
   * Hides the app loading indicator.
   * @memberof uxManager
   */
  hideAppLoadingIndicator: () => void;

  /**
   * Shows an alert.
   * @memberof uxManager
   * @param {Object} settings the settings for the alert
   * @param {string} settings.text the content of the alert. To add a link to the content, you have to set up the link in the `links` object. The key(s) in the `links` object must be used in the text to reference the links, wrapped in curly brackets with no spaces. If you don't specify any text, the alert is not displayed
   * @param {('info'|'success'|'warning'|'error')} settings.type sets the type of alert
   * @param {Object} settings.links provides links data
   * @param {Object} settings.links.LINK_KEY object containing the data for a particular link. To properly render the link in the alert message refer to the description of the **settings.text** parameter
   * @param {string} settings.links.LINK_KEY.text text which replaces the link identifier in the alert content
   * @param {string} settings.links.LINK_KEY.url URL to navigate when you click the link. Currently, only internal links are supported in the form of relative or absolute paths
   * @param {string} settings.links.LINK_KEY.dismissKey dismissKey which represents the key of the link.
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
   *    relativePath: { text: 'relative hide side nav', url: 'hideSideNav' },
   *    neverShowItAgain: { text: 'Never show it again', dismissKey: 'neverShowItAgain' }
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
  showAlert: (settings: AlertSettings) => Promise<Object>;

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
   * Set the document title
   * @memberof UX
   * @param {string} documentTitle
   * @since 1.4.0
   * @example Luigi.ux().setDocumentTitle('Luigi');
   */
  setDocumentTitle: (documentTitle: string) => void;

  /**
   * Get the document title
   * @memberof UX
   * @since 1.4.0
   * @returns a string, which is displayed in the tab.
   * @example Luigi.ux().getDocumentTitle();
   */
  getDocumentTitle: () => string;

  /**
   * Set the collapsed state of the left side navigation
   * @memberof UX
   * @param {boolean} state
   * @since 1.5.0
   */
  collapseLeftSideNav: (state: boolean) => void;

  /**
   * Open user settings dialog
   * @memberof UX
   * @since 1.7.1
   */
  openUserSettings: () => void;

  /**
   * Close user settings dialog
   * @memberof UX
   * @since 1.7.1
   */
  closeUserSettings: () => void;

  //TODO ??? it's private
  /**
   * Removes the backdrop.
   * @memberof uxManager
   */
  removeBackdrop: () => void;

  //TODO remove
  /**
   * Adds a backdrop to block the top and side navigation. It is based on the Fundamental UI Modal, which you can use in your micro frontend to achieve the same behavior.
   * @memberof uxManager
   */
  // addBackdrop: () => void;

  /**
   * Adds a backdrop with a loading indicator for the micro frontend frame. This overrides the {@link navigation-parameters-reference.md#node-parameters loadingIndicator.enabled} setting.
   * @memberof uxManager
   */
  //showLoadingIndicator: () => void;

  /**
   * Removes the loading indicator. Use it after calling {@link #showLoadingIndicator showLoadingIndicator()} or to hide the indicator when you use the {@link navigation-parameters-reference.md#node-parameters loadingIndicator.hideAutomatically: false} node configuration.
   * @memberof uxManager
   */
  //hideLoadingIndicator: () => void;

  /**
   * Closes the currently opened micro frontend modal.
   * @memberof uxManager
   */
  //closeCurrentModal: () => void;

  /**
   * This method informs the main application that there are unsaved changes in the current view in the iframe. For example, that can be a view with form fields which were edited but not submitted.
   * @param {boolean} isDirty indicates if there are any unsaved changes on the current page or in the component
   * @memberof uxManager
   */
  //setDirtyStatus: (isDirty: boolean) => void;

  /**
   * Gets the current locale.
   * @returns {string} current locale
   * @memberof uxManager
   */
  //getCurrentLocale: () => string;

  /**
   * Gets the current theme.
   * @returns {*} current themeObj
   * @memberof uxManager
   */
  //getCurrentTheme: () => any;

  /**
   * Sets current locale to the specified one.
   *
   * **NOTE:** this must be explicitly allowed on the navigation node level by setting `clientPermissions.changeCurrentLocale` to `true`. (See {@link navigation-parameters-reference.md Node parameters}.)
   *
   * @param {string} locale locale to be set as the current locale
   * @memberof uxManager
   */
  //setCurrentLocale: (locale: string) => void;

  /**
   * Checks if the current micro frontend is displayed inside a split view
   * @returns {boolean} indicating if it is loaded inside a split view
   * @memberof uxManager
   * @since 0.6.0
   */
  //isSplitView: () => boolean;

  /**
   * Checks if the current micro frontend is displayed inside a modal
   * @returns {boolean} indicating if it is loaded inside a modal
   * @memberof uxManager
   * @since 0.6.0
   */
  //isModal: () => boolean;
}

declare interface LinkManager {
  /**
   * Refreshes top navigation badge counters by rendering the navigation again.
   * @memberof LuigiNavigation
   * @example
   * Luigi.navigation().updateTopNavigation();
   */
  updateTopNavigation: () => void;

  /**
   * Navigates to the given path in the application. It contains either a full absolute path or a relative path without a leading slash that uses the active route as a base. This is the standard navigation.
   * @memberof LuigiNavigation
   * @param {string} path path to be navigated to
   * @param {boolean} preserveView preserve a view by setting it to `true`. It keeps the current view opened in the background and opens the new route in a new frame. Use the {@link #goBack goBack()} function to navigate back. You can use this feature across different levels. Preserved views are discarded as soon as you use the standard {@link #navigate navigate()} function instead of {@link #goBack goBack()}
   * @param {Object} modalSettings opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('fullscreen'|'l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {string} modalSettings.width lets you specify a precise width for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {string} modalSettings.height lets you specify a precise height for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] opens split view in collapsed state
   * @param {Object} drawerSettings opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. The default title is the node label, but the header could also be an object with a `title` attribute allowing you to specify your own title.  An 'x' icon is displayed to close the drawer view.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @example
   * Luigi.navigation().navigate('/overview')
   * Luigi.navigation().navigate('users/groups/stakeholders')
   * Luigi.navigation().navigate('/settings', null, true) // preserve view
   */
  navigate: (
    path: string,
    preserveView?: boolean,
    modalSettings?: ModalSettings,
    splitViewSettings?: SplitViewSettings,
    drawerSettings?: DrawerSettings
  ) => void;

  /**
   * Opens a view in a modal. You can specify the modal's title and size. If you do not specify the title, it is the node label. If there is no node label, the title remains empty.  The default size of the modal is `l`, which means 80%. You can also use `m` (60%) and `s` (40%) to set the modal size. Optionally, use it in combination with any of the navigation functions.
   * @memberof LuigiNavigation
   * @param {string} path navigation path
   * @param {Object} [modalSettings] opens a view in a modal. Use these settings to configure the modal's title and size
   * @param {string} modalSettings.title modal title. By default, it is the node label. If there is no label, it is left empty
   * @param {('fullscreen'|'l'|'m'|'s')} [modalSettings.size="l"] size of the modal
   * @param {string} modalSettings.width lets you specify a precise width for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @param {string} modalSettings.height lets you specify a precise height for the modal. Allowed units are 'px', '%', 'rem', 'em', 'vh' and 'vw'.
   * @example
   * Luigi.navigation().openAsModal('projects/pr1/users', {title:'Users', size:'m'});
   */
  openAsModal: (nodepath: string, modalSettings?: ModalSettings) => void;

  /**
   * Opens a view in a split view. You can specify the split view's title and size. If you don't specify the title, it is the node label. If there is no node label, the title remains empty. The default size of the split view is 40, which means 40% height of the split view.
   * @memberof LuigiNavigation
   * @param {string} path navigation path
   * @param {Object} splitViewSettings opens a view in a split view. Use these settings to configure the split view's behaviour
   * @param {string} splitViewSettings.title split view title. By default, it is the node label. If there is no label, it is left empty
   * @param {number} [splitViewSettings.size=40] height of the split view in percent
   * @param {boolean} [splitViewSettings.collapsed=false] opens split view in collapsed state
   * @returns {Object} an instance of the SplitView. It provides functions to control its behavior.
   * @see {@link https://docs.luigi-project.io/docs/luigi-client-api?section=splitview|SplitView Client} for further documentation. These methods from the Client SplitView are also implemented for Luigi Core: `close`, `collapse`, `expand`, `isCollapsed`, `isExpanded`, `exists`
   *
   * @since 0.7.6
   * @example
   * LuigiClient.linkManager().openAsSplitView('projects/pr1/users', {title:'Users', size:'40'});
   */
  openAsSplitView: (path: string, splitViewSettings?: SplitViewSettings) => SplitViewInstance;

  /**
   * Opens a view in a drawer. You can specify if the drawer has a header, if a backdrop is active in the background and configure the size of the drawer. By default the header is shown. The backdrop is not visible and has to be activated. The size of the drawer is by default set to `s` which means 25% of the micro frontend size. You can also use `l`(75%), `m`(50%) or `xs`(15.5%). Optionally, use it in combination with any of the navigation functions.
   * @memberof LuigiNavigation
   * @param {string} path navigation path
   * @param {Object} [drawerSettings] opens a view in a drawer. Use these settings to configure if the drawer has a header, backdrop and size.
   * @param {any} drawerSettings.header By default, the header is visible. Title is node label and 'x' is displayed to close the drawer view. The header could also be an object with a `title` attribute to specify an own title for the drawer component.
   * @param {boolean} drawerSettings.backdrop By default, it is set to `false`. If it is set to `true` the rest of the screen has a backdrop.
   * @param {('l'|'m'|'s'|'xs')} [drawerSettings.size="s"] size of the drawer
   * @since 1.6.0
   * @example
   * Luigi.navigation().openAsDrawer('projects/pr1/drawer', {header:true, backdrop:true, size:'s'});
   * Luigi.navigation().openAsDrawer('projects/pr1/drawer', {header:{title:'My drawer component'}, backdrop:true, size:'xs'});
   */
  openAsDrawer: (nodepath: string, drawerSettings?: DrawerSettings) => void;

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
   * Sets the current navigation context which is then used by the `navigate` function. This has to be a parent navigation context, it is not possible to use the child navigation contexts.
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @example
   * LuigiClient.linkManager().fromClosestContext().navigate('/users/groups/stakeholders')
   */
  fromClosestContext: () => this;

  /**
   * Sets the current navigation base to the parent node that is defined as virtualTree. This method works only when the currently active micro frontend is inside a virtualTree.
   * @memberof LuigiNavigation
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * LuigiClient.linkManager().fromVirtualTreeRoot().navigate('/users/groups/stakeholders')
   */
  fromVirtualTreeRoot: () => this;

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
   * Discards the active view and navigates back to the last visited view. Works with preserved views, and also acts as the substitute of the browser **back** button. **goBackContext** is only available when using preserved views.
   * @memberof LuigiNavigation
   * @param {any} goBackValue data that is passed in the **goBackContext** field to the last visited view when using preserved views
   * @example
   * Luigi.navigation().goBack({ foo: 'bar' });
   * Luigi.navigation().goBack(true);
   */
  goBack: (goBackValue: any) => this;

  /**
   * Checks if there is one or more preserved views. You can use it to show a **back** button.
   * @memberof linkManager
   * @returns {boolean} indicating if there is a preserved view you can return to
   */
  hasBack: () => boolean;

  /**
   * Enables navigating to sibling nodes without knowing the absolute path
   * @memberof linkManager
   * @returns {linkManager} link manager instance
   * @since 1.0.1
   * @example
   * LuigiClient.linkManager().fromParent().navigate('/sibling')
   */
  //fromParent: () => this;

  /**
   * Offers an alternative way of navigating with intents. This involves specifying a semanticSlug and an object containing
   * parameters.
   * This method internally generates a URL of the form `#?intent=<semantic object>-<action>?<param_name>=<param_value>` through the given
   * input arguments. This then follows a call to the original `linkManager.navigate(...)` function.
   * Consequently, the following calls shall have the exact same effect:
   * - linkManager().navigateToIntent('Sales-settings', {project: 'pr2', user: 'john'})
   * - linkManager().navigate('/#?intent=Sales-settings?project=pr2&user=john')
   * @param {string} semanticSlug concatenation of semantic object and action connected with a dash (-), i.e.: `<semanticObject>-<action>`
   * @param {Object} params an object representing all the parameters passed, i.e.: `{param1: '1', param2: 2, param3: 'value3'}`.
   * @example
   * LuigiClient.linkManager().navigateToIntent('Sales-settings', {project: 'pr2', user: 'john'})
   * LuigiClient.linkManager().navigateToIntent('Sales-settings')
   */
  //navigateToIntent: (semanticSlug: string, params?: Object) => void;

  /**
   * Sets options to customise route changing behaviour. The parameters are used by the `navigate` function. Use it optionally in combination with any of the navigation functions and receive it as part of the context object in Luigi Client.
   * @memberof linkManager
   * @param {Object} options navigation options
   * @param {boolean} options.preventHistoryEntry By default, it is set to `false`. If it is set to `true`, there is no browser history being kept.
   * @param {boolean} options.preventContextUpdate By default, it is set to `false`. If it is set to `true`, there is no context update being triggered.
   * @returns {linkManager} link manager instance
   * @since 1.25.0
   * @example
   * LuigiClient.linkManager().withOptions(
   * { preventContextUpdate:true, preventHistoryEntry: true }
   * ).navigate('/overview')
   */
  //withOptions: (options: RouteChangingOptions) => this;

  /**
   * Update current title and size of a modal.
   * @memberof linkManager
   * @param {Object} updatedModalSettings possibility to update the active modal.
   * @param {Object} updatedModalSettings.title update the `title` of the active modal.
   * @param {Object} updatedModalSettings.size update the `size` of the active modal.
   * @example
   * LuigiClient.linkManager().updateModalSettings({title:'LuigiModal', size:'l'});
   */
  //updateModalSettings: (updatedModalSettings: Object) => void;

  /**
   * Disables the navigation handling for a single navigation request
   * It prevents Luigi Core from handling url change after `navigate()`.
   * Used for auto-navigation
   * @since 0.7.7
   * @example
   * LuigiClient.linkManager().withoutSync().navigate('/projects/xy/foobar');
   * LuigiClient.linkManager().withoutSync().fromClosestContext().navigate('settings');
   */
  //withoutSync: () => this;

  /**
   * Updates path of the modalPathParam when internal navigation occurs
   * @since 1.21.0
   * @example
   * LuigiClient.linkManager().withoutSync().updateModalPathInternalNavigation('/projects/xy/foobar');
   */
  //updateModalPathInternalNavigation: (path: string, modalSettings?: Object, addHistoryEntry?: boolean) => void;

  /**
   * Enables navigating to a new tab.
   * @since 1.16.0
   * @example
   * LuigiClient.linkManager().newTab().navigate('/projects/xy/foobar');
   */
  //newTab: () => this;

  /**
   * Keeps the URL's query parameters for a navigation request.
   * @param {boolean} preserve By default, it is set to `false`. If it is set to `true`, the URL's query parameters will be kept after navigation.
   * @since 1.19.0
   * @example
   * LuigiClient.linkManager().preserveQueryParams(true).navigate('/projects/xy/foobar');
   * LuigiClient.linkManager().preserveQueryParams(false).navigate('/projects/xy/foobar');
   */
  //preserveQueryParams: (preserve: boolean) => this;

  /**
   * Gets the luigi route associated with the current micro frontend.
   * @returns {promise} a promise which resolves to a String value specifying the current luigi route
   * @since 1.23.0
   * @example
   * LuigiClient.linkManager().getCurrentRoute();
   * LuigiClient.linkManager().fromContext('project').getCurrentRoute();
   * LuigiClient.linkManager().fromVirtualTreeRoot().getCurrentRoute();
   */
  //getCurrentRoute: () => Promise<string>;
}

export declare class LuigiElement extends HTMLElement {
  /**
   *
   * @param options if `true` shadowRoot mode is "open" otherwise shadowRoot mode is "closed".
   */
  constructor(options?: Options);
  render(ctx?: Object): string;
  update(): void;
  onContextUpdate(ctx: Object): void;
  afterInit(ctx: Object): void;
  querySelector(selector: string): any;
  LuigiClient: LuigiClient;
}

declare interface Options {
  openShadow: boolean;
}

export declare const html: (strings: TemplateStringsArray, ...values: unknown[]) => string;

export interface LuigiClient {
  /**
   * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
   * @memberof LuigiClient
   */
  getActiveFeatureToggles: () => Array<String>;
  /**
   * Gets the current locale.
   * @returns {string} current locale
   * @memberof LuigiClient
   */
  getCurrentLocale: () => string;
  linkManager: () => LinkManager;
  uxManager: () => UxManager;
  publishEvent: (event: Event) => void;
}
